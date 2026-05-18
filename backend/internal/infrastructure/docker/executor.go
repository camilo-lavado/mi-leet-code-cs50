package docker

import (
	"archive/tar"
	"bytes"
	"context"
	"io"
	"log"
	"strings"
	"time"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
	"github.com/docker/docker/pkg/stdcopy"
	"localcode/internal/domain"
)

type DockerExecutor struct {
	cli *client.Client
}

func NewDockerExecutor() (*DockerExecutor, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}
	return &DockerExecutor{
		cli: cli,
	}, nil
}

func (e *DockerExecutor) Execute(snippet domain.CodeSnippet, testCase domain.TestCase) domain.ExecutionResult {
	ctx := context.Background()
	var img string
	var cmd []string
	var filename string

	if strings.ToLower(snippet.Language) == "c" {
		img = "gcc:latest"
		filename = "code.c"
		cmd = []string{"sh", "-c", "gcc -O3 code.c -o solution && ./solution < input.txt"}
	} else if strings.ToLower(snippet.Language) == "python" {
		img = "python:3.11-alpine"
		filename = "code.py"
		cmd = []string{"sh", "-c", "python code.py < input.txt"}
	} else {
		return domain.ExecutionResult{
			Stderr:   "Unsupported language",
			ExitCode: -1,
		}
	}

	// 1. Pull image if not exists (non-blocking in background normally, but here we do it to be safe)
	_, _, err := e.cli.ImageInspectWithRaw(ctx, img)
	if err != nil {
		log.Printf("Pulling image %s...", img)
		reader, pullErr := e.cli.ImagePull(ctx, img, image.PullOptions{})
		if pullErr == nil {
			io.Copy(io.Discard, reader)
			reader.Close()
		}
	}

	// 2. Create container
	resp, err := e.cli.ContainerCreate(ctx, &container.Config{
		Image:           img,
		Cmd:             cmd,
		WorkingDir:      "/workspace",
		NetworkDisabled: true, // No network access for security
		Tty:             false,
	}, &container.HostConfig{
		Resources: container.Resources{
			Memory: 128 * 1024 * 1024, // 128 MB
		},
		AutoRemove: false,
	}, nil, nil, "")
	
	if err != nil {
		log.Printf("Error creating container: %v", err)
		return domain.ExecutionResult{Stderr: err.Error(), ExitCode: -1}
	}

	containerID := resp.ID
	defer e.cli.ContainerRemove(ctx, containerID, container.RemoveOptions{Force: true})

	// 3. Copy files to container using tar
	var tarBuf bytes.Buffer
	tw := tar.NewWriter(&tarBuf)

	// code file
	hdr := &tar.Header{Name: filename, Mode: 0600, Size: int64(len(snippet.Code))}
	tw.WriteHeader(hdr)
	tw.Write([]byte(snippet.Code))

	// input file
	hdrIn := &tar.Header{Name: "input.txt", Mode: 0600, Size: int64(len(testCase.InputData))}
	tw.WriteHeader(hdrIn)
	tw.Write([]byte(testCase.InputData))
	tw.Close()

	err = e.cli.CopyToContainer(ctx, containerID, "/workspace", &tarBuf, container.CopyToContainerOptions{})
	if err != nil {
		return domain.ExecutionResult{Stderr: "Failed to copy files: " + err.Error(), ExitCode: -1}
	}

	// 4. Start container
	start := time.Now()
	if err := e.cli.ContainerStart(ctx, containerID, container.StartOptions{}); err != nil {
		return domain.ExecutionResult{Stderr: "Failed to start container: " + err.Error(), ExitCode: -1}
	}

	// 5. Wait for completion with timeout
	waitCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	statusCh, errCh := e.cli.ContainerWait(waitCtx, containerID, container.WaitConditionNotRunning)
	var exitCode int
	select {
	case err := <-errCh:
		if err != nil {
			return domain.ExecutionResult{Stderr: "Execution timeout or error", ExitCode: -1}
		}
	case status := <-statusCh:
		exitCode = int(status.StatusCode)
	case <-waitCtx.Done():
		return domain.ExecutionResult{Stderr: "Execution timeout (5 seconds exceeded)", ExitCode: 124}
	}

	duration := time.Since(start)

	// 6. Read logs
	out, err := e.cli.ContainerLogs(ctx, containerID, container.LogsOptions{ShowStdout: true, ShowStderr: true})
	if err != nil {
		return domain.ExecutionResult{Stderr: "Failed to read logs: " + err.Error(), ExitCode: -1}
	}
	defer out.Close()

	var stdoutBuf, stderrBuf bytes.Buffer
	stdcopy.StdCopy(&stdoutBuf, &stderrBuf, out)

	return domain.ExecutionResult{
		Stdout:   stdoutBuf.String(),
		Stderr:   stderrBuf.String(),
		ExitCode: exitCode,
		TimeMs:   int(duration.Milliseconds()),
		MemoryKb: 0, // Memory tracking needs container stats, simplified for now
	}
}
