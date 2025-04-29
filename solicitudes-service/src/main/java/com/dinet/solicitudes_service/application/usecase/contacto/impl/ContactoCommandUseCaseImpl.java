package com.dinet.solicitudes_service.application.usecase.contacto.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoRequest;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoResponse;
import com.dinet.solicitudes_service.application.usecase.contacto.ContactoCommandUseCase;
import com.dinet.solicitudes_service.domain.model.Contacto;
import com.dinet.solicitudes_service.domain.repository.ContactoRepository;
import com.dinet.solicitudes_service.domain.repository.SolicitudRepository;
import com.dinet.solicitudes_service.infrastructure.db.mapper.ContactoDtoMapper;
import com.dinet.solicitudes_service.infrastructure.db.mapper.ContactoMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ContactoCommandUseCaseImpl implements ContactoCommandUseCase {

    private final ContactoRepository contactoRepository;
    private final SolicitudRepository solicitudRepository;
    private final ContactoMapper contactoMapper;
    private final ContactoDtoMapper contactoDtoMapper;

    @Override
    public Mono<ContactoResponse> agregarContacto(UUID solicitudId, ContactoRequest request) {
        return solicitudRepository.findById(solicitudId)
                .switchIfEmpty(Mono.error(new RuntimeException("Solicitud no encontrada")))
                .flatMap(solicitud -> {
                    Contacto contacto = contactoDtoMapper.toDomain(request);
                    contacto.setSolicitudId(solicitudId); // asignar vínculo
                    return contactoRepository.agregarContacto(solicitudId, contacto);
                })
                .map(contactoMapper::toResponse);
    }

    @Override
    public Flux<ContactoResponse> crearContactos(Flux<Contacto> contactos) {
        return contactoRepository.saveAll(contactos)
                .map(contactoMapper::toResponse);
    }

    @Override
    public Mono<ContactoResponse> actualizarContacto(UUID solicitudId, UUID contactoId, ContactoRequest request) {
        return contactoRepository.obtenerContacto(solicitudId, contactoId)
                .switchIfEmpty(Mono.error(new RuntimeException("Contacto no encontrado o no pertenece a la solicitud")))
                .flatMap(contactoExistente -> {
                    contactoExistente.setNombreContacto(request.getNombreContacto());
                    contactoExistente.setNumeroContacto(request.getNumeroContacto());
                    return contactoRepository.actualizarContacto(solicitudId, contactoId, contactoExistente);
                })
                .map(contactoMapper::toResponse);
    }

    @Override
    public Mono<Void> eliminarContacto(UUID solicitudId, UUID contactoId) {
        return contactoRepository.obtenerContacto(solicitudId, contactoId)
                .switchIfEmpty(Mono.error(new RuntimeException("Contacto no encontrado o no pertenece a la solicitud")))
                .flatMap(c -> contactoRepository.eliminarContacto(solicitudId, contactoId));
    }

}
