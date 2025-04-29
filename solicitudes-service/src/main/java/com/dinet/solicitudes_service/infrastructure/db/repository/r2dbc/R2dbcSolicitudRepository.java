package com.dinet.solicitudes_service.infrastructure.db.repository.r2dbc;

import com.dinet.solicitudes_service.infrastructure.db.entity.SolicitudEntity;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface R2dbcSolicitudRepository extends ReactiveCrudRepository<SolicitudEntity, UUID> {
        /**
         * Busca una solicitud por su código.
         * 
         * @param codigo el código de la solicitud
         * @return la solicitud encontrada o un Mono vacío si no se encuentra
         */
        Mono<SolicitudEntity> findByCodigo(String codigo);

        /**
         * Busca todas las solicitudes que coinciden con el tipo de solicitud, la fecha
         * de envío o la marca.
         * 
         * @param tipoSolicitud el tipo de solicitud (puede ser nulo)
         * @param fechaEnvio    la fecha de envío (puede ser nula)
         * @param marca         la marca (puede ser nula)
         * @return una lista de solicitudes que coinciden con los criterios de búsqueda
         */
        @Query("""
                        SELECT *
                        FROM solicitud
                        WHERE (:tipoSolicitud IS NULL OR tipo_solicitud ILIKE :tipoSolicitud)
                        AND (:fechaEnvio IS NULL OR fecha_envio = CAST(:fechaEnvio AS DATE))
                        AND (:marca IS NULL OR marca ILIKE :marca)
                            """)
        Flux<SolicitudEntity> findByTipoSolicitudAndFechaEnvioAndMarca(String tipoSolicitud, String fechaEnvio,
                        String marca);
}
