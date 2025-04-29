package com.dinet.solicitudes_service.infrastructure.db.entity;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tipo_solicitud")
public class TipoSolicitudEntity {
    @Id
    @Column("id")
    private UUID id;

    @Column("nombre")
    private String nombre;
}