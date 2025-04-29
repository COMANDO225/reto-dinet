package com.dinet.solicitudes_service.adapter.inbound.api.v1.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContactoRequest {
    @NotBlank
    private String nombreContacto;

    @NotBlank
    private String numeroContacto;
}
