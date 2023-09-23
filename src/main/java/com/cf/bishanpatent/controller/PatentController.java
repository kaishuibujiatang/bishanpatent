package com.cf.bishanpatent.controller;


import com.cf.bishanpatent.service.PatentService;
import com.cf.bishanpatent.vo.CompanyVO;
import com.cf.bishanpatent.vo.HighValuePatent;
import com.cf.bishanpatent.vo.TownVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PatentController {

    @Autowired
    private PatentService patentService;

    @GetMapping("/HighPatent")
    public List<HighValuePatent> getHighPatent() {
        return patentService.queryHighValuePatent();
    }

    @GetMapping("/CompanyOutput")
    public List<CompanyVO> getHighValueCompany() {
        return patentService.getHighValueCompany();
    }

    @GetMapping("/TownOutput")
    public List<TownVO> getTownCounts() {
        return patentService.getTownCounts();
    }
}
