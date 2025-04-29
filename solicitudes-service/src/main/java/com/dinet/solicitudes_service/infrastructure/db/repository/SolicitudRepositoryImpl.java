package com.dinet.solicitudes_service.infrastructure.db.repository;

import java.util.UUID;

import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.stereotype.Repository;
import org.springframework.data.relational.core.query.Query;

import com.dinet.solicitudes_service.domain.model.Solicitud;
import com.dinet.solicitudes_service.domain.repository.SolicitudRepository;
import com.dinet.solicitudes_service.domain.valueobject.SolicitudFilter;
import com.dinet.solicitudes_service.infrastructure.db.entity.SolicitudEntity;
import com.dinet.solicitudes_service.infrastructure.db.mapper.SolicitudMapper;
import com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc.R2dbcSolicitudRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class SolicitudRepositoryImpl implements SolicitudRepository {

    private final R2dbcSolicitudRepository crudRepo;
    private final R2dbcEntityTemplate template;
    private final SolicitudMapper mapper;

    @Override
    public Mono<Solicitud> save(Solicitud s) {
        return crudRepo.save(mapper.toEntity(s))
                .map(mapper::toDomain);
    }

    @Override
    public Flux<Solicitud> findAll() {
        return crudRepo.findAll()
                .map(mapper::toDomain);
    }

    @Override
    public Mono<Solicitud> findByCodigo(String codigo) {
        return crudRepo.findByCodigo(codigo)
                .map(mapper::toDomain);
    }

    @Override
    public Flux<Solicitud> buscar(SolicitudFilter f) {

        Criteria criteria = Criteria.empty();

        if (f.tipoSolicitud() != null)
            criteria = criteria.and("tipo_solicitud").is(f.tipoSolicitud());
        if (f.fechaEnvio() != null)
            criteria = criteria.and("fecha_envio").is(f.fechaEnvio());
        if (f.marca() != null)
            criteria = criteria.and("marca").is(f.marca());

        return template
                .select(Query.query(criteria), SolicitudEntity.class)
                .map(mapper::toDomain);
    }

    @Override
    public Mono<Solicitud> findById(UUID id) {
        return crudRepo.findById(id)
                .map(mapper::toDomain);
    }

}
