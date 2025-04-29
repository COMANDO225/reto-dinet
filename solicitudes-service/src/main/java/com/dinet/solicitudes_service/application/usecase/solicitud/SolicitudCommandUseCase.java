package com.dinet.solicitudes_service.application.usecase.solicitud;

import java.util.UUID;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudRequest;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudResponse;

import reactor.core.publisher.Mono;

public interface SolicitudCommandUseCase {
    Mono<SolicitudResponse> crear(SolicitudRequest request);

    Mono<SolicitudResponse> actualizar(UUID id, SolicitudRequest request);

    Mono<Void> eliminar(UUID id);
}
