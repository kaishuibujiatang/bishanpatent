package com.cf.bishanpatent;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = {"com.cf.bishanpatent"})
@MapperScan("com.cf.bishanpatent.dao")
public class BishanpatentApplication {

    public static void main(String[] args) {
        SpringApplication.run(BishanpatentApplication.class, args);
    }

}
