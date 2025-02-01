package com.example.blog.service;

import com.example.blog.dto.UserDto;
import com.example.blog.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByUserName(String username);
    Optional<User> findByEmail(String email);
    List<User> findAllUsers();
    User createUser(UserDto userDto) throws IllegalAccessException;
    User updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    boolean emailExists(String email);
    boolean validatePassword(String password);
}