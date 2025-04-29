package com.dinet.solicitudes_service.adapter.inbound.api.v1.dto;

import java.time.LocalDate;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SolicitudListItemResponse {

    @Schema(description = "Identificador único UUID", example = "3010ea03-add2-4f40-9fc4-03241f3b54a6")
    private UUID id;

    @Schema(description = "Código de la solicitud NanoID (10)", example = "a1b2c3d4e5")
    private String codigo;

    @Schema(description = "Marca de la empresa", example = "Alicorp")
    private String marca;

    @Schema(description = "Tipo de solicitud", example = "Distribución")
    private String tipoSolicitud;

    @Schema(description = "Fecha de envío de la solicitud", example = "2025-07-25")
    private LocalDate fechaEnvio;

    @Schema(description = "Número de contacto principal", example = "927974418")
    private String numeroContacto;

    @Schema(description = "Nombre del contacto principal", example = "Anderson Almeyda")
    private String nombreContacto;

    @Schema(description = "Número de contactos adicionales", example = "5")
    private Integer contactos;
}