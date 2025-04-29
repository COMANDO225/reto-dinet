package com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc;

import java.util.UUID;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.dinet.solicitudes_service.infrastructure.db.entity.ContactoEntity;

import reactor.core.publisher.Flux;

@Repository
public interface R2dbcContactoRepository extends ReactiveCrudRepository<ContactoEntity, UUID> {
    // busca todos los contactos que pertenecen a una solicitud
    Flux<ContactoEntity> findAllBySolicitudId(UUID solicitudId);
}
