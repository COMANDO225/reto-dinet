package com.dinet.solicitudes_service.adapter.inbound.api.v1.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SolicitudNotFoundException extends ResponseStatusException {
    public SolicitudNotFoundException(String codigo) {
        super(HttpStatus.NOT_FOUND, "Solicitud con código '" + codigo + "' no encontrada");
    }
}
