package com.dinet.solicitudes_service.application.usecase.solicitud.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudListItemResponse;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudResponse;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.exception.SolicitudNotFoundException;
import com.dinet.solicitudes_service.application.usecase.solicitud.SolicitudQueryUseCase;
import com.dinet.solicitudes_service.domain.model.Contacto;
import com.dinet.solicitudes_service.domain.model.Solicitud;
import com.dinet.solicitudes_service.domain.repository.ContactoRepository;
import com.dinet.solicitudes_service.domain.repository.SolicitudRepository;
import com.dinet.solicitudes_service.domain.valueobject.SolicitudFilter;
import com.dinet.solicitudes_service.infrastructure.db.mapper.SolicitudDtoMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class SolicitudQueryUseCaseImpl implements SolicitudQueryUseCase {

    private final SolicitudRepository solicitudRepository;
    private final ContactoRepository contactoRepository;
    private final SolicitudDtoMapper solicitudDtoMapper;

    @Override
    public Flux<SolicitudListItemResponse> listar(String tipoSolicitud, String fechaEnvio, String marca) {
        SolicitudFilter f = new SolicitudFilter(
                emptyToNull(tipoSolicitud),
                emptyToNull(fechaEnvio) == null ? null : LocalDate.parse(fechaEnvio),
                emptyToNull(marca));

        return solicitudRepository.buscar(f)
                .flatMap(solicitud -> contactoRepository.findBySolicitudId(solicitud.getId())
                        .collectList()
                        .map(contactos -> {
                            solicitud.setContactos(contactos);
                            return solicitud;
                        }))
                .map(solicitudDtoMapper::toListItem);
    }

    private static String emptyToNull(String s) {
        return (s == null || s.isBlank()) ? null : s;
    }

    @Override
    public Mono<SolicitudResponse> buscarPorCodigo(String codigo) {
        Mono<Solicitud> monoSolicitud = solicitudRepository.findByCodigo(codigo);

        Mono<List<Contacto>> monoContactos = monoSolicitud
                .flatMapMany(sol -> contactoRepository.findBySolicitudId(sol.getId()))
                .collectList();

        return Mono.zip(monoSolicitud, monoContactos)
                .switchIfEmpty(Mono.error(new SolicitudNotFoundException(codigo)))
                .map(tuple -> {
                    Solicitud sol = tuple.getT1();
                    sol.setContactos(tuple.getT2());
                    return solicitudDtoMapper.toResponse(sol);
                });
    }

}
