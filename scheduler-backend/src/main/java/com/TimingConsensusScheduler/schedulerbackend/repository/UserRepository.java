package com.TimingConsensusScheduler.schedulerbackend.repository;

import com.TimingConsensusScheduler.schedulerbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
