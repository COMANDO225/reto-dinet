package com.dinet.solicitudes_service.adapter.inbound.api.v1.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ContactoResponse {
    @Schema(description = "Identificador único UUID", example = "3010ea03-add2-4f40-9fc4-03241f3b54a6")
    private String id;
    @Schema(description = "Nombre del contacto", example = "Anderson Almeyda")
    private String nombreContacto;
    @Schema(description = "Número de contacto principal", example = "927974418")
    private String numeroContacto;
}
