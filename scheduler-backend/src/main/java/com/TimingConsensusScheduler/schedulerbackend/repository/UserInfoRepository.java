package com.TimingConsensusScheduler.schedulerbackend.repository;


import com.TimingConsensusScheduler.schedulerbackend.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByName(String username);

}