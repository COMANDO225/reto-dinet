package com.dinet.solicitudes_service.application.usecase.solicitud.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudRequest;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudResponse;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.exception.MarcaNotFoundException;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.exception.TipoSolicitudNotAllowedException;
import com.dinet.solicitudes_service.application.usecase.solicitud.SolicitudCommandUseCase;
import com.dinet.solicitudes_service.domain.model.Contacto;
import com.dinet.solicitudes_service.domain.model.Solicitud;
import com.dinet.solicitudes_service.domain.repository.ContactoRepository;
import com.dinet.solicitudes_service.domain.repository.MarcaRepository;
import com.dinet.solicitudes_service.domain.repository.SolicitudRepository;
import com.dinet.solicitudes_service.domain.repository.TipoSolicitudMarcaRepository;
import com.dinet.solicitudes_service.domain.service.SolicitudCodeGenerator;
import com.dinet.solicitudes_service.infrastructure.db.mapper.ContactoDtoMapper;
import com.dinet.solicitudes_service.infrastructure.db.mapper.SolicitudDtoMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class SolicitudCommandUseCaseImpl implements SolicitudCommandUseCase {

    private final SolicitudRepository solicitudRepository;
    private final ContactoRepository contactoRepository;
    private final MarcaRepository marcaRepository;
    private final TipoSolicitudMarcaRepository tipoSolicitudMarcaRepository;

    private final SolicitudDtoMapper solicitudDtoMapper;
    private final ContactoDtoMapper contactoDtoMapper;

    @Override
    public Mono<SolicitudResponse> crear(SolicitudRequest request) {
        Solicitud nuevaSolicitud = solicitudDtoMapper.toDomain(request);
        nuevaSolicitud.setCodigo(SolicitudCodeGenerator.generate());

        return validarMarcaYTipoSolicitud(nuevaSolicitud)
                .then(solicitudRepository.save(nuevaSolicitud))
                .flatMap(savedSolicitud -> guardarContactosSiExisten(request, savedSolicitud)
                        .thenReturn(savedSolicitud))
                .map(solicitudDtoMapper::toResponse);
    }

    private Mono<Void> validarMarcaYTipoSolicitud(Solicitud solicitud) {
        return marcaRepository.findByNombre(solicitud.getMarca())
                .switchIfEmpty(Mono.error(new MarcaNotFoundException(solicitud.getMarca())))
                .flatMap(marca -> tipoSolicitudMarcaRepository.existsByMarcaNombreAndTipoNombre(
                        solicitud.getMarca(), solicitud.getTipoSolicitud())
                        .flatMap(exists -> {
                            if (Boolean.TRUE.equals(exists)) {
                                return Mono.<Void>empty();
                            } else {
                                return Mono.<Void>error(
                                        new TipoSolicitudNotAllowedException(
                                                solicitud.getTipoSolicitud(),
                                                solicitud.getMarca()));
                            }
                        }))
                .then();
    }

    private Mono<Void> guardarContactosSiExisten(SolicitudRequest solicitudRequest, Solicitud savedSolicitud) {
        if (solicitudRequest.getContactos() != null && !solicitudRequest.getContactos().isEmpty()) {
            Flux<Contacto> contactosFlux = Flux.fromIterable(solicitudRequest.getContactos())
                    .map(contactoReq -> {
                        Contacto contacto = contactoDtoMapper.toDomain(contactoReq);
                        contacto.setSolicitudId(savedSolicitud.getId());
                        return contacto;
                    });

            return contactoRepository.saveAll(contactosFlux)
                    .then();
        } else {
            return Mono.empty();
        }
    }

    @Override
    public Mono<SolicitudResponse> actualizar(UUID id, SolicitudRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'actualizar'");
    }

    @Override
    public Mono<Void> eliminar(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'eliminar'");
    }
}
