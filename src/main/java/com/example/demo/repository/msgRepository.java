package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.msg;

public interface msgRepository extends JpaRepository<msg,Integer>{
    
}
