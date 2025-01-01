package com.example.back_products.controller;

import com.example.back_products.dto.AuthRequestDto;
import com.example.back_products.entity.User;
import com.example.back_products.service.JwtService;
import com.example.back_products.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;

import java.util.Optional;

@Tag(name = "auth", description = "Authentication API")
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Operation(summary = "Create Account", description = "Create a new user account.")
    @PostMapping("/account")
    public User createAccount(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @Operation(summary = "Get Token", description = "Generate a JWT token for the user.")
    @PostMapping("/token")
    public ResponseEntity<String> getToken(@RequestBody AuthRequestDto authRequest) {
        Optional<User> user = userService.findByEmail(authRequest.email());

        if (user.isPresent() && user.get().getPassword().equals(authRequest.password())) {
            return ResponseEntity.ok(jwtService.generateToken(authRequest.email()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}