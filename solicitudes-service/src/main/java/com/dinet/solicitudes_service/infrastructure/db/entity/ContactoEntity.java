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
@Table(name = "contacto")
public class ContactoEntity {

    @Id
    @Column("id")
    private UUID id;

    @Column("solicitud_id")
    private UUID solicitudId;

    @Column("nombre_contacto")
    private String nombreContacto;

    @Column("numero_contacto")
    private String numeroContacto;
}
