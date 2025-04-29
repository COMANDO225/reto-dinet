package com.dinet.solicitudes_service.domain.repository;

import com.dinet.solicitudes_service.domain.model.Marca;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface MarcaRepository {
    Flux<Marca> findAll();

    Mono<Marca> findByNombre(String nombre);
}
