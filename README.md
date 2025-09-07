# 🚀 Sample MERN with Microservices – Deployment on AKS

This project demonstrates deploying a **MERN (MongoDB, Express, React, Node.js) application** with microservices architecture on **Azure Kubernetes Service (AKS)**.

The application is divided into:

* **helloService** (simple Express microservice)
* **profileService** (Express + MongoDB microservice)
* **frontend** (React application)

---

## 📂 Repository

[GitHub – SampleMERNwithMicroservices](https://github.com/UnpredictablePrashant/SampleMERNwithMicroservices)

---

## 🛠️ Prerequisites

Before starting, ensure you have the following installed and configured:

* [Node.js (>=14)](https://nodejs.org/en/)
* [Docker](https://docs.docker.com/get-docker/)
* [kubectl](https://kubernetes.io/docs/tasks/tools/)
* [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
* [Helm (optional)](https://helm.sh/docs/intro/install/)
* An **Azure Subscription** with permissions to create AKS and Azure Container Registry (ACR)

---

## 🧪 Step 1: Local Testing with Docker

Before deploying to Kubernetes, the services were tested locally with Docker.

### 1️⃣ Clone Repository

```bash
git clone https://github.com/UnpredictablePrashant/SampleMERNwithMicroservices.git
cd SampleMERNwithMicroservices
```

### 2️⃣ Setup Environment Files

For `helloService` → create `.env` file:

```bash
PORT=3001
```

For `profileService` → create `.env` file:

```bash
PORT=3002
MONGO_URL="mongodb://localhost:27017/sampledb"
```

### 3️⃣ Install Dependencies

```bash
cd helloService && npm install && cd ..
cd profileService && npm install && cd ..
cd frontend && npm install && cd ..
```

### 4️⃣ Run Locally with Docker Compose

```bash
docker-compose up --build
```

✅ Open `http://localhost:3000` for the frontend.
✅ `helloService` → `http://localhost:3001`
✅ `profileService` → `http://localhost:3002`

📸 *\[Insert Docker local testing screenshots here]*

---

## ☸️ Step 2: Deploying to Azure Kubernetes Service (AKS)

### 1️⃣ Create AKS Cluster & ACR

```bash
# Login to Azure
az login

# Create resource group
az group create --name mern-rg --location eastus

# Create Azure Container Registry
az acr create --resource-group mern-rg --name mernacr123 --sku Basic

# Create AKS Cluster and attach ACR
az aks create --resource-group mern-rg --name mern-aks \
  --node-count 2 --enable-addons monitoring --generate-ssh-keys \
  --attach-acr mernacr123
```

### 2️⃣ Get AKS Credentials

```bash
az aks get-credentials --resource-group mern-rg --name mern-aks
```

### 3️⃣ Build & Push Docker Images to ACR

```bash
# Login to ACR
az acr login --name mernacr123

# Build and push each service
docker build -t mernacr123.azurecr.io/hello-service:v1 ./helloService
docker push mernacr123.azurecr.io/hello-service:v1

docker build -t mernacr123.azurecr.io/profile-service:v1 ./profileService
docker push mernacr123.azurecr.io/profile-service:v1

docker build -t mernacr123.azurecr.io/frontend:v1 ./frontend
docker push mernacr123.azurecr.io/frontend:v1
```

📸 *\[Insert screenshot of successful Docker push to ACR]*

---

## 🗂️ Step 3: Kubernetes Manifests

Inside `k8s/` folder (you can create it), include the following YAML files:

### `hello-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      labels:
        app: hello
    spec:
      containers:
        - name: hello
          image: mernacr123.azurecr.io/hello-service:v1
          ports:
            - containerPort: 3001
---
apiVersion: v1
kind: Service
metadata:
  name: hello-service
spec:
  selector:
    app: hello
  ports:
    - protocol: TCP
      port: 3001
      targetPort: 3001
```

### `profile-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: profile-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: profile
  template:
    metadata:
      labels:
        app: profile
    spec:
      containers:
        - name: profile
          image: mernacr123.azurecr.io/profile-service:v1
          env:
            - name: MONGO_URL
              value: "mongodb://mongo-service:27017/sampledb"
          ports:
            - containerPort: 3002
---
apiVersion: v1
kind: Service
metadata:
  name: profile-service
spec:
  selector:
    app: profile
  ports:
    - protocol: TCP
      port: 3002
      targetPort: 3002
```

### `frontend-deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: mernacr123.azurecr.io/frontend:v1
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```

📸 *\[Insert screenshots of deployed pods & services]*

---

## 🌐 Step 4: Access Application

1. Check services:

```bash
kubectl get svc
```

2. Copy the **EXTERNAL-IP** of `frontend-service`.
3. Open in browser → `http://<EXTERNAL-IP>`

📸 *\[Insert screenshot of running app on AKS]*

---

## ✅ Verification

* `helloService` works → returns JSON response
* `profileService` works → connects to MongoDB
* `frontend` integrates both services

---

## 📸 Screenshots to Add

* Local Docker Compose run
* Docker image push to ACR
* AKS pods & services (`kubectl get all`)
* Application running on AKS external IP

---

## 📖 Conclusion

This project successfully demonstrates:

* Local Docker testing of microservices
* Building & pushing Docker images to Azure Container Registry
* Deploying MERN microservices on AKS with Kubernetes manifests
* Exposing services with LoadBalancer for external access

---
