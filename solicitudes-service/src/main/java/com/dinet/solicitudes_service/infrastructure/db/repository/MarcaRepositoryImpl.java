package com.dinet.solicitudes_service.infrastructure.db.repository;

import org.springframework.stereotype.Repository;

import com.dinet.solicitudes_service.domain.model.Marca;
import com.dinet.solicitudes_service.domain.repository.MarcaRepository;
import com.dinet.solicitudes_service.infrastructure.db.mapper.MarcaMapper;
import com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc.R2dbcMarcaRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class MarcaRepositoryImpl implements MarcaRepository {

    private final R2dbcMarcaRepository r2dbcMarcaRepository;
    private final MarcaMapper marcaMapper;

    @Override
    public Flux<Marca> findAll() {
        return r2dbcMarcaRepository.findAll()
                .map(marcaMapper::toDomain);
    }

    @Override
    public Mono<Marca> findByNombre(String nombre) {
        return r2dbcMarcaRepository.findByNombre(nombre)
                .map(marcaMapper::toDomain);
    }

}
