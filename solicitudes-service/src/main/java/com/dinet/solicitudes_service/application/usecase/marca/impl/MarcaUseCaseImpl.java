package com.dinet.solicitudes_service.application.usecase.marca.impl;

import org.springframework.stereotype.Service;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.MarcaResponse;
import com.dinet.solicitudes_service.application.usecase.marca.MarcaUseCase;
import com.dinet.solicitudes_service.domain.repository.MarcaRepository;
import com.dinet.solicitudes_service.infrastructure.db.mapper.MarcaMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class MarcaUseCaseImpl implements MarcaUseCase {

    private final MarcaRepository marcaRepository;
    private final MarcaMapper marcaMapper;

    @Override
    public Flux<MarcaResponse> listarMarcas() {
        return marcaRepository.findAll()
                .map(marcaMapper::toResponse);
    }

}
