package com.dinet.solicitudes_service.application.usecase.marca;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.MarcaResponse;

import reactor.core.publisher.Flux;

public interface MarcaUseCase {
    Flux<MarcaResponse> listarMarcas();
}
