package com.example.blog.dto;

import lombok.Data;
import java.io.Serializable;

@Data
public class UserDto implements Serializable {
    private String email;
    private String password;
    private String username;
    private String role;
}