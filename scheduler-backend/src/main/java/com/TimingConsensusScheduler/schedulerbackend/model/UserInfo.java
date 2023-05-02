package com.TimingConsensusScheduler.schedulerbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String password;
    private String role;
    private boolean[][] slots_taken;

    public UserInfo(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.slots_taken = new boolean[7][8];
    }
    public UserInfo() {
        this.name = "";
        this.email = "";
        this.password = "";
        this.role = "USER";
        this.slots_taken = new boolean[7][8];
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean[][] getSlots_taken() {
        return slots_taken;
    }

    public void setSlots_taken(boolean[][] slots_taken) {
        this.slots_taken = slots_taken;
    }
}

