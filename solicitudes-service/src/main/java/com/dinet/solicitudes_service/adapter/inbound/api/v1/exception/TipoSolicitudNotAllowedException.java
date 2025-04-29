package com.dinet.solicitudes_service.adapter.inbound.api.v1.exception;

public class TipoSolicitudNotAllowedException extends RuntimeException {
    public TipoSolicitudNotAllowedException(String tipoSolicitud, String marca) {
        super("El tipo de solicitud '" + tipoSolicitud + "' no está permitido para la marca '" + marca + "'.");
    }
}