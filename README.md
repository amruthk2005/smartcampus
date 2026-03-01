# Smart Campus Management System

demo link - https://drive.google.com/file/d/13eoqgEiLDM9wXbCLXdwe3BUAQfvr5Cdm/view?usp=sharing

An integrated web application designed to automate campus operations, featuring a modular architecture and a fully automated CI/CD pipeline.

## 👥 Team Members & Roles
*   **Amruth ([@amruthk2005](https://github.com/amruthk2005)):** Frontend Development,dockerization for frontend.
*   **Deepak ([@deepakdncr](https://github.com/Deepakdncr)):** Backend Development & Database Management,dockerization for backend.
*   **Kanigai([@kanigai2005](https://github.com/kanigai2005)):** DevOps Engineer - Dockerization, CI/CD Pipeline & Orchestration.

---

## User Stories (Requirement 1)
- **US1:** As a Student, I want to view my dashboard so that I can see my course schedule and grades.
- **US2:** As a Faculty Member, I want to update student records through the backend API.
- **US3:** As an admin , I want to resolve and track all the problems.

---

## Modular Architecture (Requirement 3)
The repository is structured by architectural layers to ensure separation of concerns:
- `/frontend`: React and Web user interface.
- `/backend`: Node.js and server-side logic.
- `/.github/workflows`: CI/CD pipeline configuration (GitHub Actions).
- `Dockerfile`: Containerization instructions for both frontend and backend.
- `docker-compose.yml`: Local orchestration of all services.

---

## CI/CD Pipeline (Requirement 9, 10, 11)
We have implemented an automated pipeline using **GitHub Actions**. The pipeline is triggered on every push to the `main` branch and consists of **3 mandatory stages**:

1.  **Stage 1: Clone (Checkout)**
    - The pipeline clones the latest source code from the repository into the runner environment.
2.  **Stage 2: Build**
    - The pipeline builds Docker images for both the Frontend and Backend modules using their respective Dockerfiles.
3.  **Stage 3: Push (Deploy to Registry)**
    - The finalized images are tagged and pushed to our public repository on **Docker Hub**.

---

## Docker Hub Repository (Requirement 13)
The container images for this project are publicly hosted on Docker Hub:
*   **Frontend Image:** [kanigai/smartcampus-frontend](https://hub.docker.com/r/kanigai/smartcampus-frontend)
*   **Backend Image:** [kanigai/smartcampus-backend](https://hub.docker.com/r/kanigai/smartcampus-backend)

---

## Execution Instructions (Requirement 14)

To run this application locally using the images from Docker Hub, execute the following commands in your terminal:

### 1. Run the Backend Module
```bash
docker pull kanigai/smartcampus-backend:latest
docker run -d -p 5000:5000 --name campus-backend kanigai/smartcampus-backend:latest```

### 2. Run the Frontend Module
```Bash
docker pull kanigai/smartcampus-frontend:latest
docker run -d -p 3000:3000 --name campus-frontend kanigai/smartcampus-frontend:latest```
