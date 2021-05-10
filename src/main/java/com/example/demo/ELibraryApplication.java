package com.example.demo;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition
@SpringBootApplication
// Service
public class ELibraryApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookRESTController.class, args);
    }
}