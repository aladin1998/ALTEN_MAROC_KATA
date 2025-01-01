package com.example.back_products.dto;

public record ProductDTO(
        Long id,
        String code,
        String name,
        String description,
        String image,
        String category,
        double price,
        int quantity,
        String inventoryStatus,
        int rating
) {
}
