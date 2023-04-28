package com.TimingConsensusScheduler.schedulerbackend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.TimingConsensusScheduler.schedulerbackend.model.Schedule;
import com.TimingConsensusScheduler.schedulerbackend.model.Tutorial;
import com.TimingConsensusScheduler.schedulerbackend.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ScheduleController {
    @Autowired
    ScheduleRepository scheduleRepository;

    @GetMapping("/schedules")
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        try {
            List<Schedule> schedules = new ArrayList<Schedule>();
            scheduleRepository.findAll().forEach(schedules::add);

            if (schedules.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(schedules, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/schedules/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable("id") long id) {
        Optional<Schedule> scheduleData = scheduleRepository.findById(id);
        if (scheduleData.isPresent()) {
            return new ResponseEntity<>(scheduleData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/schedules/{id}/{date}")
    public ResponseEntity<boolean[]> getScheduleByIdAndDate(@PathVariable("id") long id,@PathVariable("date") int date) {
        Optional<Schedule> scheduleData = scheduleRepository.findById(id);
        if (scheduleData.isPresent()) {
            return new ResponseEntity<>(scheduleData.get().getSlots_taken()[date], HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/schedules")
    public ResponseEntity<Schedule> createSchedule() {
        try {
            Schedule _schedule = new Schedule();
            scheduleRepository.save(_schedule);
            return new ResponseEntity<>(_schedule, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/schedules/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable("id") long id, @RequestBody Schedule schedule) {
        Optional<Schedule> scheduleData = scheduleRepository.findById(id);

        if (scheduleData.isPresent()) {
            Schedule _schedule = scheduleData.get();
            _schedule.setSlots_taken(schedule.getSlots_taken());
            return new ResponseEntity<>(scheduleRepository.save(_schedule), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<HttpStatus> deleteSchedule(@PathVariable("id") long id) {
        try {
            scheduleRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
