#!/bin/bash

kubectl create namespace default

kubectl apply -f ./config/configMap.yaml -n default
kubectl apply -f ./config/secret.yaml -n default
kubectl apply -f ./config/ingress.yaml -n default

kubectl apply -f ./redis/deployment.yaml -n default
kubectl apply -f ./redis/service.yaml -n default

kubectl apply -f ./backend/deployment.yaml -n default
kubectl apply -f ./backend/service.yaml -n default

kubectl apply -f ./frontend/deployment.yaml -n default
kubectl apply -f ./frontend/service.yaml -n default