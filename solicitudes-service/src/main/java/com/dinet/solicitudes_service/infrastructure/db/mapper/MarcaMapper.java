package com.dinet.solicitudes_service.infrastructure.db.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.dinet.solicitudes_service.adapter.inbound.api.v1.dto.MarcaResponse;
import com.dinet.solicitudes_service.domain.model.Marca;
import com.dinet.solicitudes_service.infrastructure.db.entity.MarcaEntity;

@Mapper(componentModel = "spring")
public interface MarcaMapper {
    MarcaMapper INSTANCE = Mappers.getMapper(MarcaMapper.class);

    MarcaEntity toEntity(Marca marca); // para persistencia

    Marca toDomain(MarcaEntity entity); // para convertir de entity a dominio

    MarcaResponse toResponse(Marca marca); // para convertir de dominio a response masna
}
