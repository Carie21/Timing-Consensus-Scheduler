package com.TimingConsensusScheduler.schedulerbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.TimingConsensusScheduler.schedulerbackend.model.Schedule;
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

//    List<Schedule> findById(long id);
}
