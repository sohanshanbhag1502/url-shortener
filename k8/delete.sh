#!/bin/bash

kubectl delete -f ./config/configMap.yaml -n url-shortener
kubectl delete -f ./config/ingress.yaml -n url-shortener

kubectl delete -f ./redis/deployment.yaml -n url-shortener
kubectl delete -f ./redis/service.yaml -n url-shortener

kubectl delete -f ./backend/deployment.yaml -n url-shortener
kubectl delete -f ./backend/service.yaml -n url-shortener
kubectl delete -f ./backend/autoscaling.yaml -n url-shortener

kubectl delete -f ./frontend/deployment.yaml -n url-shortener
kubectl delete -f ./frontend/service.yaml -n url-shortener
kubectl delete -f ./frontend/autoscaling.yaml -n url-shortener

kubectl delete namespace url-shortener