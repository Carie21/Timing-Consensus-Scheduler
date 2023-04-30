package com.TimingConsensusScheduler.schedulerbackend.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message){
        super("Could not find a user with id "+message);
    }

//    public UserNotFoundException(Long id){
//        super("Could not find a user with id "+id);
//    }
}
