CREATE TABLE tipo_solicitud (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE marca (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tipo_solicitud_marca (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo_solicitud_id UUID NOT NULL,
    marca_id UUID NOT NULL,
    CONSTRAINT fk_tipo FOREIGN KEY (tipo_solicitud_id) REFERENCES tipo_solicitud(id) ON DELETE CASCADE,
    CONSTRAINT fk_marca FOREIGN KEY (marca_id) REFERENCES marca(id) ON DELETE CASCADE,
    CONSTRAINT uk_tipo_marca UNIQUE (tipo_solicitud_id, marca_id)
);
