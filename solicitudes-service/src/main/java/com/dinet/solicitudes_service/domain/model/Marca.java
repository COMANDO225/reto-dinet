package com.dinet.solicitudes_service.domain.model;

import java.util.UUID;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Marca {
    private UUID id;
    private String nombre;
}
