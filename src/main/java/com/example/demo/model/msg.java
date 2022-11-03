package com.example.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="messages")
public class msg {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private Integer id;
	public String message;
	@Lob
	private byte[] data;
		
	public msg() {}

    public msg(String message,byte[] data) {
		super();
		this.message = message;
		this.data = data;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

    public String getmsg() {
		return message;
	}

	public void setmsg(String message) {
		this.message = message;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}
