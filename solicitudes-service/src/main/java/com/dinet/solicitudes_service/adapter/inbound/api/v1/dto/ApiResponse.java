package com.dinet.solicitudes_service.adapter.inbound.api.v1.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponse<T> {
    private String status;
    private String message;
    private T data;
}