package com.TimingConsensusScheduler.schedulerbackend.service;

import com.TimingConsensusScheduler.schedulerbackend.model.User;
import com.TimingConsensusScheduler.schedulerbackend.model.UserInfo;
import com.TimingConsensusScheduler.schedulerbackend.repository.UserInfoRepository;
import com.TimingConsensusScheduler.schedulerbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserInfo> userInfo = repository.findByEmail(email);
        return userInfo.map(UserInfoUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + email));

    }
}
