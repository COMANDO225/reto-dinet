package com.dinet.solicitudes_service.domain.repository;

import java.util.UUID;

import com.dinet.solicitudes_service.domain.model.Contacto;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ContactoRepository {
    Flux<Contacto> saveAll(Flux<Contacto> contactos);

    Flux<Contacto> findBySolicitudId(UUID solicitudId);

    Mono<Contacto> save(Contacto contacto);

    Mono<Contacto> findById(UUID id);

    Mono<Void> deleteById(UUID id);

    Mono<Contacto> agregarContacto(UUID solicitudId, Contacto contacto);

    Mono<Contacto> actualizarContacto(UUID solicitudId, UUID contactoId, Contacto contacto);

    Mono<Void> eliminarContacto(UUID solicitudId, UUID contactoId);

    Mono<Contacto> obtenerContacto(UUID solicitudId, UUID contactoId);
}
