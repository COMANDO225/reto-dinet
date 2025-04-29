package com.dinet.solicitudes_service.adapter.inbound.api.v1.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SolicitudRequest {
    @NotBlank
    private String marca;

    @NotBlank
    private String tipoSolicitud;

    @NotNull
    private LocalDate fechaEnvio;

    @NotBlank
    private String numeroContacto;

    @NotBlank
    private String nombreContacto;

    private List<ContactoRequest> contactos;
}
