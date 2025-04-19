# URL Shortener

This is a simple url shortener app which can shorten the long URL's instantly.

## Tech Stack Used
- [React.js + Typescript + Vite (Frontend)](https://vite.dev/guide/)
- [Express.js + Typescript (Backend)](https://expressjs.com/)
- [Redis (In-memory Key-Value Store)](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Kubernetes (For Autoscaling & Load Balancing)](https://kubernetes.io/)
- [minikube](https://minikube.sigs.k8s.io/docs/)

## Getting Started
### i) Testing the web apps locally

#### &nbsp;&nbsp; 1) Frontend
- Navigate to frontend folder <br>
```
cd ./frontend
```
- Install all required npm packages <br>
```
npm ci
```
- Start the vite app <br>
```
npm run dev
```
#### &nbsp;&nbsp; 2) Backend
- Navigate to backend folder <br>
```
cd ./backend
```
- Install all required npm packages <br>
```
npm ci
```
- Start Redis database server<br>
```
docker run -p 6379:6379 redis
```
- Create a ```.env``` file with following contents:
```
REDIS_URI=<redis url here>
```
- Start the express app <br>
```
npm start
```

- Now access the website running on [http://localhost:5173](http://localhost:5173)

<br>

### ii) Containerizing the application
#### &nbsp;&nbsp; 1) Frontend
- Navigate to frontend folder <br>
```
cd ./frontend
```
- Build the docker image using this command <br>
```
docker build -t url-shortener:frontend .
```
- Push the image to docker container registry using this command <br>
```
docker tag url-shortener:frontend <tag-name>
docker push <tag-name>
```
#### &nbsp;&nbsp; 2) Backend
- Navigate to backend folder <br>
```
cd ./backend
```
- Build the docker image using this command <br>
```
docker build -t url-shortener:backend .
```
- Push the image to docker container registry using this command <br>
```
docker tag url-shortener:backend <tag-name>
docker push <tag-name>
```

<br>

### iii) Deploying it to the Kubernetes
- Navigate to kubernetes folder <br>
```
cd ./k8
```
- Replace the image names in following files <br>
```
./k8/backend/deployment.yaml
./k8/frontend/deployment.yaml
```
- Replace the environment variables in config maps accordingly <br>
```
./k8/config/configMap.yaml
```
- Now start minikube using the following command <br>
```
minikube start
```

- Enable required addons in minikube <br>
```
minikube addons enable ingress
minikube addons enable metrics-server
minikube addons enable dashboard
```

- Run this command to add DNS entry
```
sudo echo "$(minikube ip) url-shortener.com" >> /etc/hosts
```

- Start deploying the app
```
chmod +x deploy.sh
./deploy.sh
```

- Open a new terminal and enter the following command to access minikube dashboard and view the autoscaling
```
minikube dashboard
```

- Start locust in a new terminal and open [http://localhost:8089](http://localhost:8089) on browser
```
locust -H http://url-shortener.com
```

- After successful testing cleanup the deployments 
```
chmod +x delete.sh
./delete.sh
minikube stop
minikube delete --all
```

The docker containers for this app are publicly available [here](https://hub.docker.com/r/shanbhagsohan/url-shortener)
