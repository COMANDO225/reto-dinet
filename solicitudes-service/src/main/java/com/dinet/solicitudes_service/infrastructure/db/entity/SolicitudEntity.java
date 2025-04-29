package com.dinet.solicitudes_service.infrastructure.db.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
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
@Table(name = "solicitud")
public class SolicitudEntity {

    @Id
    @Column("id")
    private UUID id;

    @Column("codigo")
    private String codigo;

    @Column("marca")
    private String marca;

    @Column("tipo_solicitud")
    private String tipoSolicitud;

    @Column("fecha_envio")
    private LocalDate fechaEnvio;

    @Column("numero_contacto")
    private String numeroContacto;

    @Column("nombre_contacto")
    private String nombreContacto;

    @Transient
    private List<ContactoEntity> contactos;
}
