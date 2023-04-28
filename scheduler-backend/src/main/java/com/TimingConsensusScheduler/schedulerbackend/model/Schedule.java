package com.TimingConsensusScheduler.schedulerbackend.model;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "schedules")
public class Schedule {
    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "slots_taken")
    boolean[][] slots_taken;

    public Schedule(boolean[][] slots_taken) {
        this.slots_taken = slots_taken;
    }
    public Schedule() {
        this.slots_taken = new boolean[2][2];
    }
    public Schedule(long id) {
        this.id=id;
        this.slots_taken = new boolean[2][2];
    }

    public boolean[][] getSlots_taken() {
        return slots_taken;
    }

    public void setSlots_taken(boolean[][] slots_taken) {
        this.slots_taken = slots_taken;
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "id=" + id +
                ", slots_taken=" + Arrays.toString(slots_taken) +
                '}';
    }
}
