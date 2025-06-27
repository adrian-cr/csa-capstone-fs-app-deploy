# Capstone Project: Deploying a Scalable Web Application on AWS

For this project I have developed a full-stack task tracker app built with `React` and hosted it on AWS by implementing a wide array of AWS technologies, including `S3`, `API Gateway`, `Lambda`, `DynamoDB`. I have also implemented a CD system using `GitHub`, `CodeBuild`, and `CodePipeline`.
## Project Overview
* **Frontend:** `React` + `Styled Components` + `React Router`
* **Backend:** `API Gateway` + `Lambda` + `DynamoDB`
* **Hosting:** `S3`
* **CI/CD:** `GitHub` + `CodeBuild` + `CodePipeline`

## Frontend

### Features
* Create, list, and delete tasks.
* `React Router` for routing.
* `Styled Components` for styling.
* Fetches data from `API Gateway` endpoints.

## Backend

### `API Gateway`
* Resource paths: `/`, `/add-task`, `/task/{id}`.
* Methods: GET, POST, DELETE, OPTIONS.
* Lambda Proxy Integration enabled.
* CORS configured via:
  * OPTIONS methods for each resource (mock integration)
  * Lambda responses include headers:
    ```json
    {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
    ```

### `Lambda`
Lambda functions are:
* `getAllTasks` → Scan `DynamoDB` table.
* `getTaskById` → Get task by ID.
* `createTask` → Insert task.
* `deleteTaskById` → Delete task.

### `DynamoDB`

* Table: `Tasks`.
* Partition key: `TaskID` (string).

## Hosting

### `S3`
* Bucket: `csa-capstone-frontend`.
* Public access: Allowed (via bucket policy).
* Static website hosting enabled.
* Index document: `index.html`.
* Error document: `index.html`.

### Bucket policy:
```json
{
  "Effect": "Allow",
  "Principal": "*",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::my-task-tracker-frontend/*"
}
```

## CI/CD
### `CodeBuild`

* Runtime: `Node 18`.
* Buildspec:
```yaml
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      * npm install
  build:
    commands:
      * npm run build
artifacts:
  files:
    * '**/*'
  base-directory: build
```

### `CodePipeline`
* Source: `GitHub` repository.
* Build: `CodeBuild` project.
* Deploy: `S3` sync to `csa-capstone-frontend`.
* Bucket policy updated to allow `CodePipeline` and `CodeBuild` access.

## Demo Video
You can get an more in-depth overview of this project by watching this comprehensive demo video:


https://github.com/user-attachments/assets/97482899-feb7-4713-b9c6-ad0bbbb681eb

