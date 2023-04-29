package com.TimingConsensusScheduler.schedulerbackend.model;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "users", uniqueConstraints=
@UniqueConstraint(columnNames={"member_id", "email"}))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long member_id;
    @Column(name = "member_name")
    private String member_name;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "role")
    private boolean role;

    @Column(name = "slots_taken")
    boolean[][] slots_taken;

    public User(String member_name, String email, String password, boolean role) {
        this.member_name = member_name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.slots_taken = new boolean[7][8];
    }

    public User() {
        this.member_name = "";
        this.email = "";
        this.password = "";
        this.role = false;
        this.slots_taken = new boolean[7][8];
    }

    public boolean[][] getSlots_taken() {
        return slots_taken;
    }

    public void setSlots_taken(boolean[][] slots_taken) {
        this.slots_taken = slots_taken;
    }

    public Long getMember_id() {
        return member_id;
    }

    public void setMember_id(Long member_id) {
        this.member_id = member_id;
    }

    public String getMember_name() {
        return member_name;
    }

    public void setMember_name(String member_name) {
        this.member_name = member_name;
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

    public boolean isRole() {
        return role;
    }

    public void setRole(boolean role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "member_id=" + member_id +
                ", member_name='" + member_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", slots_taken=" + Arrays.toString(slots_taken) +
                '}';
    }
}
