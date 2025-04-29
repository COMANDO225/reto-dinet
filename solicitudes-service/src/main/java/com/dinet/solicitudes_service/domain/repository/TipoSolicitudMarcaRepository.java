package com.dinet.solicitudes_service.domain.repository;

import reactor.core.publisher.Mono;

public interface TipoSolicitudMarcaRepository {
    /**
     * Verifica si existe una relación entre una marca y un tipo de solicitud.
     *
     * @param marcaNombre el nombre de la marca
     * @param tipoNombre  el nombre del tipo de solicitud
     * @return Mono<Boolean> true si existe la relación, false en caso contrario
     */
    Mono<Boolean> existsByMarcaNombreAndTipoNombre(String marcaNombre, String tipoNombre);
}
