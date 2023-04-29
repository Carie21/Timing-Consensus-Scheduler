package com.TimingConsensusScheduler.schedulerbackend.controller;

import com.TimingConsensusScheduler.schedulerbackend.exception.UserNotFoundException;
import com.TimingConsensusScheduler.schedulerbackend.model.User;
import com.TimingConsensusScheduler.schedulerbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

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

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            User _user = userRepository
                    .save(new User(user.getMember_name(),user.getEmail(),user.getPassword(),user.isRole()));
            return new ResponseEntity<>(_user, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/user")
//    User newUser(@RequestBody User newUser){
////        Schedule _schedule = new Schedule(newUser.getMember_id());
//        scheduleRepository.save(new Schedule(newUser.getMember_id()));
//        return userRepository.save(newUser);
//    }

//    @GetMapping("/users")
//    List<User> getAllUsers(){
//        return userRepository.findAll();
//    }

//    @GetMapping("/user/{id}")
//    User getUserById(@PathVariable Long id){
//        return userRepository.findById(id).orElseThrow(()->new UserNotFoundException(id));
//    }

//    @PutMapping("/users/{id}")
//    User updateUser(@RequestBody User newUser, @PathVariable Long id){
//        return userRepository.findById(id).map(user->{
//            user.setMember_name(newUser.getMember_name());
//            user.setPassword(newUser.getPassword());
//            user.setEmail(newUser.getEmail());
//            return userRepository.save(user);
//        }).orElseThrow(()->new UserNotFoundException(id));
//    }
//
//    @DeleteMapping("/user/{id}")
//    String deleteUser(@PathVariable Long id){
//        if(!userRepository.existsById(id)){
//            throw new UserNotFoundException(id);
//        }
//        userRepository.deleteById(id);
//        return  "User with id "+id+" has been deleted successfully.";
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
}
