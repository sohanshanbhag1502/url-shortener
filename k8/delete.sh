#!/bin/bash

kubectl delete -f ./config/configMap.yaml -n default
kubectl delete -f ./config/secret.yaml -n default
kubectl delete -f ./config/ingress.yaml -n default

kubectl delete -f ./redis/deployment.yaml -n default
kubectl delete -f ./redis/service.yaml -n default

kubectl delete -f ./backend/deployment.yaml -n default
kubectl delete -f ./backend/service.yaml -n default
kubectl delete -f ./backend/autoscaling.yaml -n default

kubectl delete -f ./frontend/deployment.yaml -n default
kubectl delete -f ./frontend/service.yaml -n default
kubectl delete -f ./frontend/autoscaling.yaml -n default