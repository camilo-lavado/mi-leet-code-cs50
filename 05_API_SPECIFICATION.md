Markdown
# RESTful API Contracts

### GET /api/v1/problems

#### Response
```json
{
  "data": [
    {
      "id": "c85b5e67-1234-4b56-a789-abcdef123456",
      "title": "Mario",
      "difficulty": "Easy",
      "language": "C"
    }
  ]
}
GET /api/v1/problems/{id}
Response
JSON
{
  "id": "c85b5e67-1234-4b56-a789-abcdef123456",
  "title": "Mario",
  "description": "Implement a program that prints out a half-pyramid of a specified height.",
  "language": "C",
  "test_cases": [
    {
      "id": "d96c6f78-1234-4b56-a789-abcdef123456",
      "input_data": "4",
      "is_hidden": false
    }
  ]
}
POST /api/v1/submissions
Request
JSON
{
  "problem_id": "c85b5e67-1234-4b56-a789-abcdef123456",
  "language": "c",
  "code": "#include <stdio.h>\nint main() {\nprintf(\"hello, world\\n\");\nreturn 0;\n}"
}
Response
JSON
{
  "submission_id": "e07d7g89-1234-4b56-a789-abcdef123456",
  "status": "Accepted",
  "passed_tests": 5,
  "total_tests": 5,
  "metrics": {
    "time_ms": 12,
    "memory_kb": 1024
  }
}