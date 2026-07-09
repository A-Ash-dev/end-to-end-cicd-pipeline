# End-to-End CI/CD Pipeline

A fully automated CI/CD pipeline for a containerized Node.js app — built entirely
with free tooling (no paid cloud account required). It demonstrates the full
lifecycle a production pipeline needs: build, test, code quality, security
scanning, containerization, and Infrastructure-as-Code driven deployment to
Kubernetes.

## Architecture

```
 ┌─────────────┐   ┌──────────────┐   ┌────────────────┐   ┌───────────────┐   ┌────────────────┐
 │  Push code  │──▶│ Build & Test │──▶│ Code Quality    │──▶│ Build, Scan &  │──▶│ Terraform +    │
 │  to GitHub  │   │ (Jest)       │   │ (SonarCloud)    │   │ Push (Trivy,   │   │ kubectl deploy │
 │             │   │              │   │                 │   │ Docker Hub)    │   │ to Kind cluster│
 └─────────────┘   └──────────────┘   └────────────────┘   └───────────────┘   └────────────────┘
```

## Tech stack

| Stage              | Tool                          |
|--------------------|--------------------------------|
| CI/CD engine        | GitHub Actions                |
| App                | Node.js + Express             |
| Testing            | Jest, Supertest               |
| Code quality       | SonarCloud                    |
| Containerization   | Docker (multi-stage build)    |
| Security scanning  | Trivy (CVE scanning of images)|
| Container registry | Docker Hub                    |
| Infrastructure     | Terraform (`tehcyx/kind` provider) |
| Orchestration      | Kubernetes (Kind cluster)     |

## Repository structure

```
.
├── app/                    # Express application + tests + Dockerfile
├── k8s/                    # Kubernetes Deployment & Service manifests
├── terraform/              # Provisions a local Kind cluster
└── .github/workflows/      # GitHub Actions pipeline definition
```

## Pipeline stages

1. **Build & Test** — installs dependencies and runs the Jest unit test suite.
2. **Code Quality** — runs a SonarCloud static analysis scan.
3. **Build, Scan & Push** — builds the Docker image, scans it for known
   vulnerabilities with Trivy, then pushes it to Docker Hub tagged with the
   commit SHA.
4. **Deploy** — uses Terraform to provision a local Kind (Kubernetes-in-Docker)
   cluster, then applies the Kubernetes manifests and verifies the rollout.

## Running it yourself

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js 20+](https://nodejs.org/)
- [Terraform](https://developer.hashicorp.com/terraform/install)
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

### Run the app locally
```bash
cd app
npm install
npm test
npm start        # app available at http://localhost:3000
```

### Build and run the container
```bash
cd app
docker build -t end-to-end-cicd-app .
docker run -p 3000:3000 end-to-end-cicd-app
```

### Provision the cluster and deploy manually
```bash
cd terraform
terraform init
terraform apply

export KUBECONFIG=$(terraform output -raw kubeconfig_path)
kubectl apply -f ../k8s/deployment.yaml
kubectl apply -f ../k8s/service.yaml
kubectl get pods
```

### Run the pipeline yourself (fork this repo)
Add the following repository secrets under **Settings → Secrets and variables → Actions**:

| Secret               | Purpose                             |
|----------------------|--------------------------------------|
| `DOCKERHUB_USERNAME`  | Your Docker Hub username            |
| `DOCKERHUB_TOKEN`     | Docker Hub access token             |
| `SONAR_TOKEN`         | Token from sonarcloud.io (free tier)|

Push to `main` and watch the pipeline run under the **Actions** tab.

## Why this project

This was built to demonstrate practical, hands-on CI/CD pipeline design —
covering the same principles used in production environments (build
automation, quality gates, security scanning, IaC-driven provisioning, and
automated Kubernetes deployment) using entirely free, reproducible tooling.

## Author

**Ashok A** — Senior DevOps Engineer
[LinkedIn](https://www.linkedin.com/in/ashok012394)
