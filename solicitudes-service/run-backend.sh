#!/bin/bash

# Nombre de la imagen
IMAGE_NAME=solicitudes-service

echo "Construyendo imagen..."
docker build -t $IMAGE_NAME .

echo "Levantando el contenedor..."
docker run -e SPRING_PROFILES_ACTIVE=local -p 8080:8080 $IMAGE_NAME
