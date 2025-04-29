INSERT INTO marca (id, nombre) VALUES
    (gen_random_uuid(), 'Alicorp'),
    (gen_random_uuid(), 'Backus'),
    (gen_random_uuid(), 'Sodimac'),
    (gen_random_uuid(), 'Falabella'),
    (gen_random_uuid(), 'Pfizer'),
    (gen_random_uuid(), 'Antamina'),
    (gen_random_uuid(), 'Gloria'),
    (gen_random_uuid(), 'Ripley'),
    (gen_random_uuid(), 'Nestlé'),
    (gen_random_uuid(), 'AJE Group')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO tipo_solicitud (id, nombre) VALUES
    (gen_random_uuid(), 'Transporte'),
    (gen_random_uuid(), 'Almacenaje'),
    (gen_random_uuid(), 'Distribución'),
    (gen_random_uuid(), 'Recolección'),
    (gen_random_uuid(), 'Devolución'),
    (gen_random_uuid(), 'Cross-Docking'),
    (gen_random_uuid(), 'Consolidación de Carga'),
    (gen_random_uuid(), 'Etiquetado'),
    (gen_random_uuid(), 'Carga Masiva'),
    (gen_random_uuid(), 'Carga Refrigerada'),
    (gen_random_uuid(), 'Control de Temperatura'),
    (gen_random_uuid(), 'Servicio Especial'),
    (gen_random_uuid(), 'Entrega Same-Day'),
    (gen_random_uuid(), 'Custodia 24/7'),
    (gen_random_uuid(), 'Entrega Hospitalaria'),
    (gen_random_uuid(), 'Refrigeración Lácteos'),
    (gen_random_uuid(), 'Suministro de Repuestos')
ON CONFLICT (nombre) DO NOTHING;

/* ───────────────────────────────────────────────────────────────
        Tipos de Solicitud – Especializados por Marca
 ─────────────────────────────────────────────────────────────── */

-- Alicorp
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Alicorp'
    AND ts.nombre IN (
        'Transporte', 
        'Almacenaje', 
        'Distribución', 
        'Carga Refrigerada', 
        'Control de Temperatura', 
        'Carga Masiva'
    );

-- Backus
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Backus'
    AND ts.nombre IN (
        'Transporte', 
        'Distribución', 
        'Carga Masiva', 
        'Cross-Docking'
    );

-- Sodimac
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Sodimac'
    AND ts.nombre IN (
        'Servicio Especial', 
        'Cross-Docking', 
        'Entrega Same-Day'
    );

-- Pfizer
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Pfizer'
    AND ts.nombre IN (
        'Custodia 24/7', 
        'Entrega Hospitalaria', 
        'Transporte'
    );

-- Antamina
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Antamina'
    AND ts.nombre IN (
        'Suministro de Repuestos', 
        'Transporte', 
        'Carga Masiva'
    );

-- Gloria
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Gloria'
    AND ts.nombre IN (
        'Refrigeración Lácteos', 
        'Almacenaje', 
        'Distribución', 
        'Carga Masiva'
    );

-- Ripley
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Ripley'
    AND ts.nombre IN (
        'Entrega Same-Day', 
        'Cross-Docking',
        'Recolección',
        'Servicio Especial'
    );

-- Nestlé
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Nestlé'
    AND ts.nombre IN ('Cross-Docking', 'Almacenaje', 'Distribución');

-- AJE Group
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'AJE Group'
    AND ts.nombre IN ('Distribución', 'Transporte', 'Cross-Docking');

-- Falabella
INSERT INTO tipo_solicitud_marca (id, tipo_solicitud_id, marca_id)
SELECT gen_random_uuid(), ts.id, m.id
FROM tipo_solicitud ts, marca m
WHERE m.nombre = 'Falabella'
    AND ts.nombre IN ('Transporte', 'Almacenaje', 'Distribución', 'Carga Masiva');
