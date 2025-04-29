package com.dinet.solicitudes_service.application.usecase.contacto;

import java.util.UUID;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoRequest;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoResponse;
import com.dinet.solicitudes_service.domain.model.Contacto;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ContactoCommandUseCase {
    Mono<ContactoResponse> agregarContacto(UUID solicitudId, ContactoRequest request);

    Flux<ContactoResponse> crearContactos(Flux<Contacto> contactos);

    Mono<ContactoResponse> actualizarContacto(UUID solicitudId, UUID contactoId, ContactoRequest request);

    Mono<Void> eliminarContacto(UUID solicitudId, UUID contactoId);
}
