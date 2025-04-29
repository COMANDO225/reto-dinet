package com.dinet.solicitudes_service.application.usecase.contacto.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoResponse;
import com.dinet.solicitudes_service.application.usecase.contacto.ContactoQueryUseCase;
import com.dinet.solicitudes_service.domain.repository.ContactoRepository;
import com.dinet.solicitudes_service.infrastructure.db.mapper.ContactoMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ContactoQueryUseCaseImpl implements ContactoQueryUseCase {

    private final ContactoRepository contactoRepository;
    private final ContactoMapper contactoMapper;

    @Override
    public Flux<ContactoResponse> listarContactos(UUID solicitudId) {
        return contactoRepository.findBySolicitudId(solicitudId)
                .map(contactoMapper::toResponse);
    }

    @Override
    public Mono<ContactoResponse> obtenerContacto(UUID solicitudId, UUID contactoId) {
        return contactoRepository.obtenerContacto(solicitudId, contactoId)
                .map(contactoMapper::toResponse);
    }

}
