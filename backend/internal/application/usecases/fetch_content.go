package usecases

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
)

type WeekContent struct {
	Week        int    `json:"week"`
	Lectura     string `json:"lectura"`
	Complemento string `json:"complemento"`
	Glosario    string `json:"glosario"`
}

type FetchContentUseCase struct {
	BaseDir string
}

func NewFetchContentUseCase(baseDir string) *FetchContentUseCase {
	return &FetchContentUseCase{
		BaseDir: baseDir,
	}
}

func (uc *FetchContentUseCase) Execute(week int) (*WeekContent, error) {
	weekDir := filepath.Join(uc.BaseDir, fmt.Sprintf("semana-%d", week))

	lectura, err := readFileIfExists(filepath.Join(weekDir, "lectura.md"))
	if err != nil {
		return nil, fmt.Errorf("error reading lecture: %w", err)
	}

	complemento, err := readFileIfExists(filepath.Join(weekDir, "complemento.md"))
	if err != nil {
		return nil, fmt.Errorf("error reading complement: %w", err)
	}

	glosario, err := readFileIfExists(filepath.Join(weekDir, "glosario.md"))
	if err != nil {
		return nil, fmt.Errorf("error reading glossary: %w", err)
	}

	return &WeekContent{
		Week:        week,
		Lectura:     lectura,
		Complemento: complemento,
		Glosario:    glosario,
	}, nil
}

func readFileIfExists(path string) (string, error) {
	bytes, err := ioutil.ReadFile(path)
	if err != nil {
		// If file doesn't exist, return empty string without failing
		return "", nil
	}
	return string(bytes), nil
}
