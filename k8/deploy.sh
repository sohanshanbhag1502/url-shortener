#!/bin/bash

kubectl create namespace url-shortener

kubectl apply -f ./config/configMap.yaml -n url-shortener
kubectl apply -f ./config/ingress.yaml -n url-shortener

kubectl apply -f ./redis/deployment.yaml -n url-shortener
kubectl apply -f ./redis/service.yaml -n url-shortener

kubectl apply -f ./backend/deployment.yaml -n url-shortener
kubectl apply -f ./backend/service.yaml -n url-shortener
kubectl apply -f ./backend/autoscaling.yaml -n url-shortener

kubectl apply -f ./frontend/deployment.yaml -n url-shortener
kubectl apply -f ./frontend/service.yaml -n url-shortener
kubectl apply -f ./frontend/autoscaling.yaml -n url-shortener