package com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.dinet.solicitudes_service.infrastructure.db.entity.TipoSolicitudEntity;

import reactor.core.publisher.Flux;

@Repository
public interface R2dbcTipoSolicitudRepository extends ReactiveCrudRepository<TipoSolicitudEntity, UUID> {
    // lista todos los tipos de solicitud que pertenecen a una marca
    // se usa para mostrar los tipos de solicitud en el formulario de solicitud
    @Query("""
                SELECT ts.*
                FROM tipo_solicitud ts
                INNER JOIN tipo_solicitud_marca tsm ON tsm.tipo_solicitud_id = ts.id
                WHERE tsm.marca_id = :marcaId
                ORDER BY ts.nombre
            """)
    Flux<TipoSolicitudEntity> findByMarcaId(UUID marcaId);
}
