package com.dinet.solicitudes_service.domain.service;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

// util para generar codigos nanoIDs
public class SolicitudCodeGenerator {

    private static final int DEFAULT_SIZE = 10;

    public static String generate() {
        return NanoIdUtils.randomNanoId(
                NanoIdUtils.DEFAULT_NUMBER_GENERATOR,
                NanoIdUtils.DEFAULT_ALPHABET,
                DEFAULT_SIZE);
    }
}
