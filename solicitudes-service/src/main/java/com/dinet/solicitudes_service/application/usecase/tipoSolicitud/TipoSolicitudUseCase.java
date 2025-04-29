package com.dinet.solicitudes_service.application.usecase.tipoSolicitud;

import java.util.UUID;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.TipoSolicitudResponse;

import reactor.core.publisher.Flux;

public interface TipoSolicitudUseCase {
    Flux<TipoSolicitudResponse> listarTodos();

    Flux<TipoSolicitudResponse> listarPorMarca(UUID marcaId);
}
