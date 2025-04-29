package com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc;

import com.dinet.solicitudes_service.infrastructure.db.entity.MarcaEntity;

import reactor.core.publisher.Mono;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import java.util.UUID;

public interface R2dbcMarcaRepository extends ReactiveCrudRepository<MarcaEntity, UUID> {
    // busca una marca por su nombre
    Mono<MarcaEntity> findByNombre(String nombre);
}
