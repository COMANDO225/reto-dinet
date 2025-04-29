# 📦 Reto DINET - Aplicación Full Stack para Gestión de Solicitudes

Este repositorio contiene el código fuente del reto técnico solicitado por DINET para el puesto de **Desarrollador Full Stack Java**. La solución se implementa utilizando:

-   🧠 **Frontend**: Next.js 15, TypeScript, TailwindCSS, Zustand
-   ⚙️ **Backend**: Spring Boot WebFlux (reactivo), Java 21, PostgreSQL

---

![Vista previa](https://res.cloudinary.com/dro4ur0kq/image/upload/v1745945542/Captura_de_pantalla_2025-04-29_105406_hd0ilw.png)

---

## 🚀 Tecnologías clave

| Parte           | Stack principal                                                         |
| --------------- | ----------------------------------------------------------------------- |
| Frontend        | Next.js 15 + TypeScript + TailwindCSS + Zustand + Zod                   |
| Backend         | Spring Boot 3 + WebFlux + Java 21 + R2DBC + PostgreSQL                  |
| Infraestructura | Separación por entornos con `.env.local`, `application-local.yml`, etc. |

---

## ⚙️ Backend - MicroServicio de Solicitudes (Spring WebFlux)

Este módulo corresponde al **backend reactivo** de la aplicación de solicitudes para el reto técnico de DINET. Está desarrollado con **Java 21**, **Spring Boot 3** y **WebFlux**, utilizando **arquitectura hexagonal** (puertos y adaptadores).

---

## 🚀 Tecnologías utilizadas

### Backend

-   Java 21
-   Spring Boot 3
-   Spring WebFlux (programación reactiva)
-   R2DBC (acceso no bloqueante a PostgreSQL)
-   PostgreSQL 14+
-   Gradle (Kotlin DSL)
-   MapStruct (mapeo de entidades)
-   Swagger OpenAPI 3 (documentación de endpoints)

### Frontend

-   Next.js 15 con App Router y Server Actions
-   Tailwind CSS para estilos
-   Zod para validaciones de formularios
-   Zustand para estado global
-   TanStack Table para la visualización y exportación de datos
-   Exportación a CSV sin librerías externas
-   QRCodeSVG para generación de QR por solicitud

---

## 📁 Estructura del proyecto (Arquitectura Hexagonal)

```
solicitudes_service/
├── adapter/               # Adaptadores entrantes/salientes (API, persistencia)
│   ├── inbound/           # Controladores REST (API)
│   └── outbound/          # Adaptadores de salida (repositorios, exportadores)
├── application/           # Casos de uso (lógica de negocio)
│   └── usecase/           # Dividido por agregado: contacto, solicitud, etc.
├── config/                # Configuraciones generales de Spring Boot
├── domain/                # Modelo de dominio y contratos
│   ├── model/             # Entidades y objetos de dominio
│   ├── repository/        # Interfaces de persistencia (puertos salientes)
│   ├── service/           # Lógica de dominio
│   └── valueobject/       # Tipos de datos inmutables
├── infrastructure/        # Infraestructura específica (DB, exportadores)
│   ├── db/                # Repositorios implementados con R2DBC
│   └── exporter/          # Exportador CSV
└── SolicitudesServiceApplication.java  # Clase principal
```

---

## 🛠️ Levantar el backend localmente

### 1. Crear archivo de configuración local

En `src/main/resources` crea el archivo `application-local.yml` con:

```yaml
spring:
    r2dbc:
        url: r2dbc:postgresql://localhost:5432/dinetdb
        username: postgres
        password: 123456

server:
    port: 8080

springdoc:
    api-docs:
        path: /swagger-docs
    swagger-ui:
        path: /swagger-ui.html
```

### 2. Configurar perfil activo

En `application.yml`:

```yaml
spring:
    profiles:
        active: local
```

### 3. Ejecutar el proyecto

```bash
./gradlew bootRun
```

El backend estará disponible en: [http://localhost:8080](http://localhost:8080)

Swagger UI estará disponible en: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 📊 Endpoints principales

-   `POST /api/v1/solicitudes` → crear solicitud
-   `GET /api/v1/solicitudes` → listar solicitudes con filtros
-   `GET /api/v1/solicitudes/codigo/{codigo}` → detalle por código
-   `POST /api/v1/solicitudes/{id}/contactos` → agregar contacto a solicitud
-   `PUT /api/v1/solicitudes/{id}` → actualizar solicitud
-   `DELETE /api/v1/solicitudes/{id}` → eliminar solicitud

---

## ⚖️ Arquitectura Hexagonal (Ports and Adapters)

El backend sigue la arquitectura hexagonal (o "clean architecture"):

-   **Domain**: contiene el corazón del sistema (entidades, interfaces y reglas de negocio).
-   **Application**: implementa los casos de uso. Cada acción (crear, listar, actualizar) tiene su interface y su implementación.
-   **Adapters**:
    -   **Inbound**: controladores REST que exponen la lógica al exterior.
    -   **Outbound**: adaptadores que comunican con PostgreSQL via R2DBC.
-   **Infrastructure**: implementaciones concretas (bases de datos, exportadores, configuraciones).

Esto permite alta mantenibilidad, pruebas independientes y menor acoplamiento entre tecnologías y dominio.

---

## ✨ Funcionalidades del sistema

-   📋 Registro de solicitudes con contactos adicionales
-   🔍 Búsqueda y filtros por marca, tipo de solicitud y fecha de envío
-   👁️ Vista detallada de cada solicitud
-   📤 Exportación de datos a CSV
-   📱 Código QR para ver solicitud específica desde móvil
-   💡 Validaciones con Zod en frontend y WebFlux en backend

---

## 📁 Estructura del frontend (Next.js 15)

```
solicitudes-frontend/
├── app/                  # Rutas y páginas con App Router
├── components/           # Componentes reutilizables
├── schemas/              # Validaciones Zod
├── actions/              # Funciones de fetch con Server Actions
├── store/                # Estados globales en stores
├── helper-lib/           # Funciones de ayuda y utilidades
└── .env.local            # Variables de entorno (API backend y frontend)
```

---

## 🛠️ Levantar el frontend localmente

### 1. Ingresar a la carpeta del frontend

```bash
cd solicitudes-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env.local`

```env
API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## 📋 Funcionalidades del frontend

-   Formulario para registrar solicitudes con contactos opcionales
-   Validación con Zod y form reactivo
-   Tabla con filtros dinámicos (marca, tipo, fecha)
-   Exportación CSV basada en TanStack Table
-   Vista detallada por código
-   Generación de código QR para compartir la URL de la solicitud
-   Diseño responsivo con Tailwind y experiencia moderna

---

## 👨‍💼 Autor

Desarrollado por **[Tu Nombre o Usuario de GitHub]** como parte del reto técnico de DINET.

---

## 📖 Licencia

Sin licencia específica. Uso personal y educativo permitido.
