package com.dinet.solicitudes_service.domain.repository;

import java.util.UUID;

import com.dinet.solicitudes_service.domain.model.TipoSolicitud;

import reactor.core.publisher.Flux;

public interface TipoSolicitudRepository {
    Flux<TipoSolicitud> findByMarcaId(UUID marcaId);

    Flux<TipoSolicitud> findAll();
}
