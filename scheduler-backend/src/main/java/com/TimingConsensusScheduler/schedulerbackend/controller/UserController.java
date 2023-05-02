package com.TimingConsensusScheduler.schedulerbackend.controller;

import com.TimingConsensusScheduler.schedulerbackend.model.User;
import com.TimingConsensusScheduler.schedulerbackend.model.UserInfo;
import com.TimingConsensusScheduler.schedulerbackend.repository.UserInfoRepository;
import com.TimingConsensusScheduler.schedulerbackend.repository.UserRepository;
import com.TimingConsensusScheduler.schedulerbackend.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

//@Controller
//@CrossOrigin("http://localhost:3000")
//class HomeController {
//
//    @GetMapping("loginsuccess")
//    public RedirectView redirectToDashboard() {
//        return new RedirectView("/users/all");
//    }
//
//}

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/users")
public class UserController {


        @GetMapping("/login")
        public ResponseEntity<String> login() throws IOException {
            ClassPathResource htmlFile = new ClassPathResource("templates/login.html");
            String htmlContent = new String(htmlFile.getInputStream().readAllBytes());
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_HTML)
                    .body(htmlContent);
        }
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository repository;
    @Autowired
    private UserInfoService service;

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") String id) {
        try {
            repository.deleteByEmail(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserInfo>> getAllUsersInfo() {
        try {
            List<UserInfo> users = new ArrayList<UserInfo>();
            repository.findAll().forEach(users::add);
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInfo> getUserInfoById(@PathVariable("id") String id) {
        Optional<UserInfo> userData = repository.findByEmail(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/new")
    public ResponseEntity<UserInfo> createUserInfo(@RequestBody UserInfo user) {
        try {
            if (repository.existsByEmail(user.getEmail())) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            UserInfo _user = repository
                    .save(new UserInfo(user.getName(),user.getEmail(),user.getPassword(),user.getRole()));
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<UserInfo> updateUserInfo(@PathVariable("id") String id, @RequestBody UserInfo user) {
        Optional<UserInfo> userData = repository.findByEmail(id);
        if (userData.isPresent()) {
            UserInfo _user = userData.get();
            _user.setEmail(user.getEmail());
            _user.setName(user.getName());
            _user.setPassword(user.getPassword());
            _user.setRole(user.getRole());
            _user.setSlots_taken(user.getSlots_taken());
            return new ResponseEntity<>(repository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//
//    @PostMapping("/logout")
//    public ResponseEntity<String> logout(HttpSession session) {
//        session.invalidate();
//        return new ResponseEntity<>("Logout successful", HttpStatus.OK);
//    }


}
