package com.dinet.solicitudes_service.infrastructure.db.repository;

import java.util.UUID;
import org.springframework.stereotype.Repository;
import com.dinet.solicitudes_service.domain.model.TipoSolicitud;
import com.dinet.solicitudes_service.domain.repository.TipoSolicitudRepository;
import com.dinet.solicitudes_service.infrastructure.db.mapper.TipoSolicitudMapper;
import com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc.R2dbcTipoSolicitudRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Repository
@RequiredArgsConstructor
public class TipoSolicitudRepositoryImpl implements TipoSolicitudRepository {

    private final R2dbcTipoSolicitudRepository r2dbcTipoSolicitudRepository;
    private final TipoSolicitudMapper tipoSolicitudMapper;

    @Override
    public Flux<TipoSolicitud> findByMarcaId(UUID marcaId) {
        return r2dbcTipoSolicitudRepository.findByMarcaId(marcaId)
                .map(tipoSolicitudMapper::toDomain);
    }

    @Override
    public Flux<TipoSolicitud> findAll() {
        return r2dbcTipoSolicitudRepository.findAll()
                .map(tipoSolicitudMapper::toDomain);
    }

}
