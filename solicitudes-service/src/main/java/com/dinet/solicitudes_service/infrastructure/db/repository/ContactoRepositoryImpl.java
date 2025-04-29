package com.dinet.solicitudes_service.infrastructure.db.repository;

import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.dinet.solicitudes_service.domain.model.Contacto;
import com.dinet.solicitudes_service.domain.repository.ContactoRepository;
import com.dinet.solicitudes_service.infrastructure.db.mapper.ContactoMapper;
import com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc.R2dbcContactoRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class ContactoRepositoryImpl implements ContactoRepository {
    private final R2dbcContactoRepository r2dbcContactoRepository;
    private final ContactoMapper contactoMapper;

    @Override
    public Flux<Contacto> saveAll(Flux<Contacto> contactos) {
        return contactos.map(contactoMapper::toEntity)
                .collectList()
                .flatMapMany(r2dbcContactoRepository::saveAll)
                .map(contactoMapper::toDomain);
    }

    @Override
    public Flux<Contacto> findBySolicitudId(UUID solicitudId) {
        return r2dbcContactoRepository.findAllBySolicitudId(solicitudId)
                .map(contactoMapper::toDomain);
    }

    @Override
    public Mono<Contacto> save(Contacto contacto) {
        return r2dbcContactoRepository.save(contactoMapper.toEntity(contacto))
                .map(contactoMapper::toDomain);
    }

    @Override
    public Mono<Contacto> findById(UUID id) {
        return r2dbcContactoRepository.findById(id)
                .map(contactoMapper::toDomain);
    }

    @Override
    public Mono<Void> deleteById(UUID id) {
        return r2dbcContactoRepository.deleteById(id);
    }

    @Override
    public Mono<Contacto> agregarContacto(UUID solicitudId, Contacto contacto) {
        return r2dbcContactoRepository.save(contactoMapper.toEntity(contacto))
                .map(contactoMapper::toDomain);
    }

    @Override
    public Mono<Contacto> actualizarContacto(UUID solicitudId, UUID contactoId, Contacto contacto) {
        return r2dbcContactoRepository.findById(contactoId)
                .flatMap(entity -> {
                    entity.setNombreContacto(contacto.getNombreContacto());
                    entity.setNumeroContacto(contacto.getNumeroContacto());
                    return r2dbcContactoRepository.save(entity);
                })
                .map(contactoMapper::toDomain);
    }

    @Override
    public Mono<Void> eliminarContacto(UUID solicitudId, UUID contactoId) {
        return r2dbcContactoRepository.deleteById(contactoId);
    }

    @Override
    public Mono<Contacto> obtenerContacto(UUID solicitudId, UUID contactoId) {
        return r2dbcContactoRepository.findById(contactoId)
                .map(contactoMapper::toDomain);
    }
}
