package com.example.blog.service.impl;

import com.example.blog.dto.UserDto;
import com.example.blog.entity.User;
import com.example.blog.repository.UserRepository;
import com.example.blog.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(UserDto userDto) throws IllegalAccessException {
        if (userDto == null) {
            throw new IllegalAccessException("UserDto cannot be null");
        }
        if (userDto.getEmail() == null || userDto.getEmail().trim().isEmpty()) {
            throw new IllegalAccessException("Email is required");
        }
        if (userDto.getUsername() == null || userDto.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }
        if (!validatePassword(userDto.getPassword())) {
            throw new IllegalArgumentException("Invalid password format");
        }

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User();
        user.setEmail(userDto.getEmail().trim());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setUsername(userDto.getUsername().trim());

        String role = (userDto.getRole() != null && !userDto.getRole().trim().isEmpty())
                ? userDto.getRole().trim()
                : "USER";
        user.setRole(role);

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error creating user: " + e.getMessage());
        }
    }

    @Override
    public Optional<User> findByUserName(String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }
        return userRepository.findByUsername(username.trim());
    }

    @Override
    public Optional<User> findByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        return userRepository.findByEmail(email.trim());
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(Long id, UserDto userDto) {
        if (id == null || userDto == null) {
            throw new IllegalArgumentException("Id and UserDto cannot be null");
        }

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (userDto.getUsername() != null && !userDto.getUsername().trim().isEmpty()) {
            existingUser.setUsername(userDto.getUsername().trim());
        }

        if (userDto.getPassword() != null && !userDto.getPassword().trim().isEmpty()) {
            if (!validatePassword(userDto.getPassword())) {
                throw new IllegalArgumentException("Invalid password format");
            }
            existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }

        if (userDto.getEmail() != null && !userDto.getEmail().trim().isEmpty()
                && !userDto.getEmail().equals(existingUser.getEmail())) {
            if (userRepository.existsByEmail(userDto.getEmail())) {
                throw new RuntimeException("Email is already taken");
            }
            existingUser.setEmail(userDto.getEmail().trim());
        }

        try {
            return userRepository.save(existingUser);
        } catch (Exception e) {
            throw new RuntimeException("Error updating user: " + e.getMessage());
        }
    }

    @Override
    public void deleteUser(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Id cannot be null");
        }

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }

        try {
            userRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user: " + e.getMessage());
        }
    }

    @Override
    public boolean emailExists(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        return userRepository.existsByEmail(email.trim());
    }

    @Override
    public boolean validatePassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            return false;
        }
        // Password must be at least 8 characters long and contain:
        // - At least one digit
        // - At least one uppercase letter
        // - At least one lowercase letter
        // - At least one special character
        return password.length() >= 8 &&
                password.matches(".*\\d.*") &&
                password.matches(".*[A-Z].*") &&
                password.matches(".*[a-z].*") &&
                password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*");
    }
}