package com.example.back_products.controller;

import com.example.back_products.entity.Cart;
import com.example.back_products.entity.CartItem;
import com.example.back_products.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Tag(name = "cart", description = "Cart API")
@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Operation(summary = "Get Cart", description = "Retrieve the cart of the current user.")
    @GetMapping
    public Cart getCart(Principal principal) {
        return cartService.getCartByUsername(principal.getName()).orElse(null);
    }

    @Operation(summary = "Add Item to Cart", description = "Add a new item to the cart of the current user.")
    @PostMapping("/add")
    public Cart addItemToCart(Principal principal, @RequestBody CartItem item) {
        return cartService.addItemToCart(principal.getName(), item);
    }

    @Operation(summary = "Remove Item from Cart", description = "Remove an item from the cart of the current user.")
    @DeleteMapping("/remove/{itemId}")
    public Cart removeItemFromCart(Principal principal, @PathVariable Long itemId) {
        return cartService.removeItemFromCart(principal.getName(), itemId);
    }

    @Operation(summary = "Clear Cart", description = "Clear the cart of the current user.")
    @PostMapping("/clear")
    public void clearCart(Principal principal) {
        cartService.clearCart(principal.getName());
    }
}