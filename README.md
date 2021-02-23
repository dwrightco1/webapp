# Nodeapp is a Node.Js application that uses a MySQL database
Nodeapp is a simple application used for testing

## To Build
```
docker build -t webapp .
```

## To Run on Docker
```
docker-compose up [-d]
```

## To Run on Kubernetes (or OpenShift)
```
kubectl apply -f https://raw.githubusercontent.com/dwrightco1/webapp/master/kubernetes/webapp-backend.yaml
kubectl apply -f https://raw.githubusercontent.com/dwrightco1/webapp/master/kubernetes/webapp-frontend.yaml
```
