package com.dinet.solicitudes_service.domain.repository;

import java.util.UUID;

import com.dinet.solicitudes_service.domain.model.Solicitud;
import com.dinet.solicitudes_service.domain.valueobject.SolicitudFilter;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SolicitudRepository {
    Mono<Solicitud> save(Solicitud solicitud);

    Flux<Solicitud> findAll();

    Mono<Solicitud> findByCodigo(String codigo);

    Flux<Solicitud> buscar(SolicitudFilter filter);

    Mono<Solicitud> findById(UUID id);
}
