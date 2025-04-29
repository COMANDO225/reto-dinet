package com.dinet.solicitudes_service.adapter.inbound.api.v1.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class TipoSolicitudResponse {
    private UUID id;
    private String nombre;
}
