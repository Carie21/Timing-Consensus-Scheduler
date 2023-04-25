package com.TimingConsensusScheduler.schedulerbackend.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("Could not find a user with id "+id);
    }
}
