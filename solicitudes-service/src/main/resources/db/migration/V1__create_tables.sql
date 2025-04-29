CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE solicitud (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(30) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    tipo_solicitud VARCHAR(50) NOT NULL,
    fecha_envio DATE NOT NULL,
    numero_contacto VARCHAR(20) NOT NULL,
    nombre_contacto VARCHAR(100) NOT NULL
);

CREATE TABLE contacto (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solicitud_id UUID NOT NULL,
    nombre_contacto VARCHAR(100) NOT NULL,
    numero_contacto VARCHAR(20) NOT NULL,
    CONSTRAINT fk_solicitud
        FOREIGN KEY (solicitud_id)
        REFERENCES solicitud(id)
        ON DELETE CASCADE
);
