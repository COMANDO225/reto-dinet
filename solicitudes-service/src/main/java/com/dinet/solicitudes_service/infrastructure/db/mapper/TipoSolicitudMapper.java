package com.dinet.solicitudes_service.infrastructure.db.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.TipoSolicitudResponse;
import com.dinet.solicitudes_service.domain.model.TipoSolicitud;
import com.dinet.solicitudes_service.infrastructure.db.entity.TipoSolicitudEntity;

@Mapper(componentModel = "spring")
public interface TipoSolicitudMapper {
    TipoSolicitudMapper INSTANCE = Mappers.getMapper(TipoSolicitudMapper.class);

    TipoSolicitudEntity toEntity(TipoSolicitud tipoSolicitud);

    TipoSolicitud toDomain(TipoSolicitudEntity tipoSolicitudEntity);

    TipoSolicitudResponse toResponse(TipoSolicitud tipoSolicitud);
}
