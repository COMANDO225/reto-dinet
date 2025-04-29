package com.dinet.solicitudes_service.application.usecase.tipoSolicitud.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.TipoSolicitudResponse;
import com.dinet.solicitudes_service.application.usecase.tipoSolicitud.TipoSolicitudUseCase;
import com.dinet.solicitudes_service.domain.repository.TipoSolicitudRepository;
import com.dinet.solicitudes_service.infrastructure.db.mapper.TipoSolicitudMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class TipoSolicitudUseCaseImpl implements TipoSolicitudUseCase {

    private final TipoSolicitudRepository tipoSolicitudMarcaRepository;
    private final TipoSolicitudMapper tipoSolicitudMapper;

    @Override
    public Flux<TipoSolicitudResponse> listarTodos() {
        return tipoSolicitudMarcaRepository.findAll()
                .map(tipoSolicitudMapper::toResponse);
    }

    @Override
    public Flux<TipoSolicitudResponse> listarPorMarca(UUID marcaId) {
        return tipoSolicitudMarcaRepository.findByMarcaId(marcaId)
                .map(tipoSolicitudMapper::toResponse); // Implemented method to list by brand
    }

}
