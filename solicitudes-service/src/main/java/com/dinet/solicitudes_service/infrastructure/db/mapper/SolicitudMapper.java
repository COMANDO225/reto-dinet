package com.dinet.solicitudes_service.infrastructure.db.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.dinet.solicitudes_service.domain.model.Solicitud;
import com.dinet.solicitudes_service.infrastructure.db.entity.SolicitudEntity;

@Mapper(componentModel = "spring", uses = ContactoMapper.class)
public interface SolicitudMapper {
    SolicitudMapper INSTANCE = Mappers.getMapper(SolicitudMapper.class);

    SolicitudEntity toEntity(Solicitud solicitud);

    Solicitud toDomain(SolicitudEntity entity);
}
