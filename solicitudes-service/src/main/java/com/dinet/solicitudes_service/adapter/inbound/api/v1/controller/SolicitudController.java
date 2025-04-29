package com.dinet.solicitudes_service.adapter.inbound.api.v1.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoRequest;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoResponse;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudListItemResponse;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudRequest;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudResponse;
import com.dinet.solicitudes_service.application.usecase.contacto.ContactoQueryUseCase;
import com.dinet.solicitudes_service.application.usecase.contacto.ContactoCommandUseCase;
import com.dinet.solicitudes_service.application.usecase.solicitud.SolicitudCommandUseCase;
import com.dinet.solicitudes_service.application.usecase.solicitud.SolicitudQueryUseCase;
import com.dinet.solicitudes_service.config.ApiPaths;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(ApiPaths.SOLICITUDES_V1)
@RequiredArgsConstructor
public class SolicitudController {

        private final SolicitudCommandUseCase solicitudUseCase;
        private final SolicitudQueryUseCase solicitudQueryUseCase;
        private final ContactoCommandUseCase contactoUseCase;
        private final ContactoQueryUseCase contactoQueryUseCase;

        @Operation(summary = "Crear una nueva solicitud")
        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        public Mono<SolicitudResponse> crearSolicitud(@Valid @RequestBody SolicitudRequest body) {
                return solicitudUseCase.crear(body);
        }

        @Operation(summary = "Listar solicitudes con filtros")
        @GetMapping
        public Flux<SolicitudListItemResponse> listarSolicitudes(
                        @RequestParam(required = false) String marca,
                        @RequestParam(required = false) String tipoSolicitud,
                        @RequestParam(required = false) String fechaEnvio) {
                return solicitudQueryUseCase.listar(tipoSolicitud, fechaEnvio, marca);
        }

        @Operation(summary = "Buscar solicitud por código")
        @GetMapping("/codigo/{codigo}")
        public Mono<SolicitudResponse> buscarPorCodigo(@PathVariable String codigo) {
                return solicitudQueryUseCase.buscarPorCodigo(codigo);
        }

        @Operation(summary = "Actualizar una solicitud")
        @PutMapping("/{id}")
        public Mono<SolicitudResponse> actualizarSolicitud(
                        @PathVariable UUID id,
                        @Valid @RequestBody SolicitudRequest body) {
                return solicitudUseCase.actualizar(id, body);
        }

        @Operation(summary = "Eliminar una solicitud")
        @DeleteMapping("/{id}")
        @ResponseStatus(HttpStatus.NO_CONTENT)
        public Mono<Void> eliminarSolicitud(@PathVariable UUID id) {
                return solicitudUseCase.eliminar(id);
        }

        // RUTAS REST PARA CONTACTOS

        @Operation(summary = "Agregar contacto a una solicitud")
        @PostMapping("/{solicitudId}/contactos")
        public Mono<ContactoResponse> agregarContacto(
                        @PathVariable UUID solicitudId,
                        @Valid @RequestBody ContactoRequest contactoRequest) {
                return contactoUseCase.agregarContacto(solicitudId, contactoRequest);
        }

        @Operation(summary = "Listar contactos de una solicitud")
        @GetMapping("/{solicitudId}/contactos")
        public Flux<ContactoResponse> listarContactos(@PathVariable UUID solicitudId) {
                return contactoQueryUseCase.listarContactos(solicitudId);
        }

        @Operation(summary = "Obtener un contacto específico")
        @GetMapping("/{solicitudId}/contactos/{contactoId}")
        public Mono<ContactoResponse> obtenerContacto(
                        @PathVariable UUID solicitudId,
                        @PathVariable UUID contactoId) {
                return contactoQueryUseCase.obtenerContacto(solicitudId, contactoId);
        }

        @Operation(summary = "Actualizar un contacto de una solicitud")
        @PutMapping("/{solicitudId}/contactos/{contactoId}")
        public Mono<ContactoResponse> actualizarContacto(
                        @PathVariable UUID solicitudId,
                        @PathVariable UUID contactoId,
                        @Valid @RequestBody ContactoRequest request) {
                return contactoUseCase.actualizarContacto(solicitudId, contactoId, request);
        }

        @Operation(summary = "Eliminar un contacto de una solicitud")
        @DeleteMapping("/{solicitudId}/contactos/{contactoId}")
        @ResponseStatus(HttpStatus.NO_CONTENT)
        public Mono<Void> eliminarContacto(
                        @PathVariable UUID solicitudId,
                        @PathVariable UUID contactoId) {
                return contactoUseCase.eliminarContacto(solicitudId, contactoId);
        }
}
