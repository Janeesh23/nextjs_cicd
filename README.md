## Local Setup & Running the Application

Follow the steps below to set up and run the application on your local machine.

### Local Development

Use this setup if you want to run the app in **development mode** (with hot reload and debug tools).

```bash
# Install all project dependencies
npm install

# Start the Next.js development server
npm run dev
```
### Production Build

Use this setup if you want to run the app in **prodcution mode**.

```bash
# Clean install for a reproducible build 
npm ci

# Generate the optimized production build
npm run build

# Start the production server
npm start
```
## Docker Setup

This project includes a multi-stage **Dockerfile** optimized for small image size, build performance, and production efficiency.

### Dockerfile Overview

```dockerfile
# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```
### Build and Run Locally

```bash
# Build the Docker image
docker build -t nextjs-app:latest .

# Run the container
docker run -p 3000:3000 nextjs-app:latest
```
## Deploying on Minikube 

This section describes how to deploy the Next.js application to a **Minikube Kubernetes cluster** using the manifests provided in the `kubernetes/` directory.

---

### 1. Start Minikube

First, start your local Minikube cluster:

```bash
minikube start

# Create the namespace
kubectl create namespace application

# Apply the Kubernetes Manifests
kubectl apply -f kubernetes/ -n application

# Start Minikube Tunnel
minikube tunnel

#Get the External IP
#Open a new terminal window (while the tunnel is still running) and execute:
kubectl get svc -n application

#Access the Application
#Copy the EXTERNAL-IP from the output above and open it in your browser:
http://<external-ip>

# For context: My Minikube cluster was running on an Ubuntu WSL
```

## CI/CD Pipeline (GitHub Actions)

This project uses **GitHub Actions** to automate the process of building and deploying the Next.js application.


### Overview

The CI/CD pipeline is triggered **whenever code is pushed to the `main` branch**, particularly when files related to the application, Docker, or Kubernetes configuration are modified.

It performs the following steps:

1. **Checkout the Repository**  
   - Retrieves the latest version of the code from the `main` branch.

2. **Set Up Node.js Environment**  
   - Configures Node.js version **20** and caches dependencies for faster builds.

3. **Build the Docker Image**  
   - Builds a new Docker image for the Next.js application using the `Dockerfile`.  
   - Tags the image with the current GitHub Actions run number.

4. **Log in to GitHub Container Registry (GHCR)**  
   - Authenticates using a **Personal Access Token (GHCR_PAT)** stored in GitHub Secrets.

5. **Push Docker Image to GHCR**  
   - Pushes the built image to the GitHub Container Registry under:
     ```
     ghcr.io/janeesh23/nextjs-app
     ```

6. **Update Kubernetes Manifest**  
   - Automatically updates the `deployment.yaml` file with the new image tag.

7. **Deploy to Minikube**  
   - Applies the updated Kubernetes manifests to the **Minikube** cluster.  
   - Waits until the deployment rollout completes successfully.

