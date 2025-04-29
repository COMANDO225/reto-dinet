package com.dinet.solicitudes_service.infrastructure.db.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoResponse;
import com.dinet.solicitudes_service.domain.model.Contacto;
import com.dinet.solicitudes_service.infrastructure.db.entity.ContactoEntity;

@Mapper(componentModel = "spring")
public interface ContactoMapper {
    ContactoMapper INSTANCE = Mappers.getMapper(ContactoMapper.class);

    ContactoEntity toEntity(Contacto contacto);

    Contacto toDomain(ContactoEntity entity);

    ContactoResponse toResponse(Contacto contacto);
}
