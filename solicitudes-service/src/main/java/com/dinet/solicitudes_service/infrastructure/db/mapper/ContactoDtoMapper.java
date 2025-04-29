package com.dinet.solicitudes_service.infrastructure.db.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.ContactoRequest;
import com.dinet.solicitudes_service.domain.model.Contacto;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContactoDtoMapper {

    ContactoDtoMapper INSTANCE = Mappers.getMapper(ContactoDtoMapper.class);

    Contacto toDomain(ContactoRequest contactoRequest);

}
