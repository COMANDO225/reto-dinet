package com.dinet.solicitudes_service.application.usecase.solicitud;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudListItemResponse;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudResponse;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SolicitudQueryUseCase {
    Flux<SolicitudListItemResponse> listar(String tipoSolicitud, String fechaEnvio, String marca);

    Mono<SolicitudResponse> buscarPorCodigo(String codigo);
}
