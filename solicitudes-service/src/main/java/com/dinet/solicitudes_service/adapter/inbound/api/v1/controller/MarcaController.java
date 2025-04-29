package com.dinet.solicitudes_service.adapter.inbound.api.v1.controller;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.MarcaResponse;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.TipoSolicitudResponse;
import com.dinet.solicitudes_service.application.usecase.marca.MarcaUseCase;
import com.dinet.solicitudes_service.application.usecase.tipoSolicitud.TipoSolicitudUseCase;
import com.dinet.solicitudes_service.config.ApiPaths;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping(ApiPaths.MARCAS_V1)
@RequiredArgsConstructor
public class MarcaController {

    private final MarcaUseCase marcaUseCase;
    private final TipoSolicitudUseCase tipoSolicitudUseCase;

    @Operation(summary = "Lista todas las marcas")
    @GetMapping
    public Flux<MarcaResponse> listarMarcas() {
        return marcaUseCase.listarMarcas();
    }

    @Operation(summary = "Lista los tipos de solicitud de una marca")
    @GetMapping("/{marcaId}/tipos")
    public Flux<TipoSolicitudResponse> listarTiposPorMarca(@PathVariable UUID marcaId) {
        return tipoSolicitudUseCase.listarPorMarca(marcaId);
    }
}