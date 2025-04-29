package com.dinet.solicitudes_service.infrastructure.db.repository;

import org.springframework.stereotype.Repository;

import com.dinet.solicitudes_service.domain.repository.TipoSolicitudMarcaRepository;
import com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc.R2dbcTipoSolicitudMarcaRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class TipoSolicitudMarcaRepositoryImpl implements TipoSolicitudMarcaRepository {

    private final R2dbcTipoSolicitudMarcaRepository r2dbcTipoSolicitudMarcaRepository;

    @Override
    public Mono<Boolean> existsByMarcaNombreAndTipoNombre(String marcaNombre, String tipoNombre) {
        return r2dbcTipoSolicitudMarcaRepository.existsByMarcaNombreAndTipoNombre(marcaNombre, tipoNombre);
    }

}
