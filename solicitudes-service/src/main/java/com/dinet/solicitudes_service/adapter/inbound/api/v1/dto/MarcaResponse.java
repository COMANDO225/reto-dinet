package com.dinet.solicitudes_service.adapter.inbound.api.v1.dto;

import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class MarcaResponse {
    @Schema(description = "Identificador único UUID", example = "3010ea03-add2-4f40-9fc4-03241f3b54a6")
    private UUID id;
    @Schema(description = "Nombre de la marca o entidad", example = "Alicorp")
    private String nombre;
}
