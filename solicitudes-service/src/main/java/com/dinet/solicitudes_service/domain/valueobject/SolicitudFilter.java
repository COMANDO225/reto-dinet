package com.dinet.solicitudes_service.domain.valueobject;

import java.time.LocalDate;

import io.micrometer.common.lang.Nullable;

public record SolicitudFilter(
        @Nullable String tipoSolicitud,
        @Nullable LocalDate fechaEnvio,
        @Nullable String marca) {
}