package com.TimingConsensusScheduler.schedulerbackend.controller;

import com.TimingConsensusScheduler.schedulerbackend.exception.UserNotFoundException;
import com.TimingConsensusScheduler.schedulerbackend.model.User;
import com.TimingConsensusScheduler.schedulerbackend.model.UserInfo;
import com.TimingConsensusScheduler.schedulerbackend.repository.UserRepository;
import com.TimingConsensusScheduler.schedulerbackend.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;


    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = new ArrayList<User>();
            userRepository.findAll().forEach(users::add);
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @PostMapping("/register")
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        try {
//            User _user = userRepository
//                    .save(new User(user.getMember_name(),user.getEmail(),user.getPassword(),user.isRole()));
//            return new ResponseEntity<>(_user, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @PostMapping("/register")
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        try {
//            // Check if user already exists
//            if (userRepository.existsByEmail(user.getEmail())) {
//                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
//            }
//            // Hash password
//            String encodedPassword = passwordEncoder.encode(user.getPassword());
//            user.setPassword(encodedPassword);
//            User _user = userRepository.save(user);
//            return new ResponseEntity<>(_user, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @PostMapping("/login")
//    public ResponseEntity<User> loginUser(@RequestBody User user, HttpSession session) {
//        try {
//            User existingUser = userRepository.findByEmail(user.getEmail());
//            if (existingUser == null) {
//                throw new UserNotFoundException("User not found.");
//            }
//            if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
//                throw new Exception("Incorrect password.");
//            }
//            session.setAttribute("userId", existingUser.getMember_id());
//            return new ResponseEntity<>(existingUser, HttpStatus.OK);
//        } catch (UserNotFoundException e) {
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//        }
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<String> logout(HttpSession session) {
//        session.invalidate();
//        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
//    }


    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()) {
            User _user = userData.get();
            _user.setEmail(user.getEmail());
            _user.setMember_name(user.getMember_name());
            _user.setPassword(user.getPassword());
            _user.setRole(user.isRole());
            _user.setSlots_taken(user.getSlots_taken());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/login2")
    public String loginEndpoint() {
        return "Login!";
    }

    @GetMapping("/admin")
    public String adminEndpoint() {
        return "Admin!";
    }

    @GetMapping("/user")
    public String userEndpoint() {
        return "User!";
    }

    @GetMapping("/all")
    public String allRolesEndpoint() {
        return "All Roles!";
    }

    @DeleteMapping("/delete")
    public String deleteEndpoint(@RequestBody String s) {
        return "I am deleting " + s;
    }

    @Autowired
    private UserInfoService service;

    @PostMapping("/new")
    public String addNewUser(@RequestBody UserInfo userInfo){

        return service.addUser(userInfo);
    }

}
