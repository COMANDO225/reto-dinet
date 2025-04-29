package com.dinet.solicitudes_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Solicitudes-Service API")
                .version("v1")
                .description("API reactiva de solicitudes para DINET")
                .contact(new Contact()
                        .name("Anderson Almeyda | Fullstack Developer")
                        .email("anderson.almeydat@gmail.com")));
    }
}