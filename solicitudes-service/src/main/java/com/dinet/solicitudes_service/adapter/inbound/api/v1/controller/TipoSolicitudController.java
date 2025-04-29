package com.dinet.solicitudes_service.adapter.inbound.api.v1.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.TipoSolicitudResponse;
import com.dinet.solicitudes_service.application.usecase.tipoSolicitud.TipoSolicitudUseCase;
import com.dinet.solicitudes_service.config.ApiPaths;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping(ApiPaths.TIPOS_SOLICITUD_V1)
@RequiredArgsConstructor
public class TipoSolicitudController {

    private final TipoSolicitudUseCase tipoSolicitudUseCase;

    @Operation(summary = "Lista todos los tipos de solicitud")
    @GetMapping
    public Flux<TipoSolicitudResponse> listarTiposSolicitudes() {
        return tipoSolicitudUseCase.listarTodos();
    }
}
