# Etapa 1: build usando Gradle del sistema (sin wrapper)
FROM gradle:8.4.0-jdk21 AS builder
WORKDIR /app
COPY . .
RUN gradle clean build -x test

# Etapa 2: imagen final con solo el jar ejecutable
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

# Comando para correr la app Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
