package com.dinet.solicitudes_service.domain.model;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Solicitud {
    private UUID id;
    private String codigo;
    private String marca;
    private String tipoSolicitud;
    private LocalDate fechaEnvio;
    private String numeroContacto;
    private String nombreContacto;
    private List<Contacto> contactos;
}
