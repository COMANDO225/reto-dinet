package com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.dinet.solicitudes_service.infrastructure.db.entity.TipoSolicitudMarcaEntity;

import reactor.core.publisher.Mono;

@Repository
public interface R2dbcTipoSolicitudMarcaRepository extends ReactiveCrudRepository<TipoSolicitudMarcaEntity, UUID> {
    // busca si existe un tipo de solicitud para una marca
    // se usa para validar si el tipo de solicitud es valido para la marca
    @Query("""
                SELECT EXISTS(
                    SELECT 1
                    FROM tipo_solicitud_marca tsm
                    JOIN tipo_solicitud ts ON tsm.tipo_solicitud_id = ts.id
                    JOIN marca m ON tsm.marca_id = m.id
                    WHERE m.nombre = :marcaNombre
                        AND ts.nombre = :tipoNombre
                )
            """)
    Mono<Boolean> existsByMarcaNombreAndTipoNombre(String marcaNombre, String tipoNombre);
}
