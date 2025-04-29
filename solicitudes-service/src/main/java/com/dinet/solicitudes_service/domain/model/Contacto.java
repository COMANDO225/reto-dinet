package com.dinet.solicitudes_service.domain.model;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Contacto {
    private UUID id;
    private UUID solicitudId;
    private String nombreContacto;
    private String numeroContacto;
}
