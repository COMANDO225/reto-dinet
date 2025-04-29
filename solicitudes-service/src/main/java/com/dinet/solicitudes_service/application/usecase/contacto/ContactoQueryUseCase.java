package com.dinet.solicitudes_service.application.usecase.contacto;

import java.util.UUID;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoResponse;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ContactoQueryUseCase {
    Flux<ContactoResponse> listarContactos(UUID solicitudId);

    Mono<ContactoResponse> obtenerContacto(UUID solicitudId, UUID contactoId);
}
