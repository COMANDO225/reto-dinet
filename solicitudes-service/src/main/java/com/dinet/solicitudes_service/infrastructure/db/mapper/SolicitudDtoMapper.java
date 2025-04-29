package com.dinet.solicitudes_service.infrastructure.db.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudListItemResponse;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudRequest;
import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.SolicitudResponse;
import com.dinet.solicitudes_service.domain.model.Solicitud;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SolicitudDtoMapper {
    SolicitudDtoMapper INSTANCE = Mappers.getMapper(SolicitudDtoMapper.class);

    Solicitud toDomain(SolicitudRequest solicitudRequest);

    SolicitudResponse toResponse(Solicitud solicitud);

    @Mapping(target = "contactos", expression = "java(solicitud.getContactos() == null ? null : solicitud.getContactos().size())")
    SolicitudListItemResponse toListItem(Solicitud solicitud);
}
