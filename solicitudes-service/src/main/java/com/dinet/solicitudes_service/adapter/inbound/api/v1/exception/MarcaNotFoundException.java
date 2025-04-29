package com.dinet.solicitudes_service.adapter.inbound.api.v1.exception;

public class MarcaNotFoundException extends RuntimeException {
    public MarcaNotFoundException(String marca) {
        super("La marca '" + marca + "' no existe.");
    }
}