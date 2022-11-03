package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.msg;
import com.example.demo.repository.msgRepository;

@Service
public class msgStorageService {
    @Autowired
    private msgRepository msgRepository;

    public msg saveMessage(String text) {
        String cont = text;
        try {
            msg msg = new msg(text, cont.getBytes());
            return msgRepository.save(msg);
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Optional<msg> getMessage(Integer msgId) {
        return msgRepository.findById(msgId);
    }

    public List<msg> getMessages(){
        return msgRepository.findAll();
    }
    
}
