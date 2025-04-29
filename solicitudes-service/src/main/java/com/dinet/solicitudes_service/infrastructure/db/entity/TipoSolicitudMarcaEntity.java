package com.dinet.solicitudes_service.infrastructure.db.entity;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tipo_solicitud_marca")
public class TipoSolicitudMarcaEntity {
    @Id
    @Column("id")
    private UUID id;

    @Column("tipo_solicitud_id")
    private UUID tipoSolicitudId;

    @Column("marca_id")
    private UUID marcaId;
}
