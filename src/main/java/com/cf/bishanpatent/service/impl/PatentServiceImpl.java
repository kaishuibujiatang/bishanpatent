package com.cf.bishanpatent.service.impl;

import com.cf.bishanpatent.dao.CompanyMapper;
import com.cf.bishanpatent.dao.PatentMapper;
import com.cf.bishanpatent.dao.TownMapper;
import com.cf.bishanpatent.pojo.Patent;
import com.cf.bishanpatent.service.PatentService;
import com.cf.bishanpatent.utils.PO2VO;
import com.cf.bishanpatent.vo.CompanyVO;
import com.cf.bishanpatent.vo.HighValuePatent;
import com.cf.bishanpatent.vo.TownVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatentServiceImpl implements PatentService {

    @Autowired
    private PatentMapper patentMapper;

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private TownMapper townMapper;

    @Override
    public Patent getPatentById(Integer id) {
        return patentMapper.getPatentById(id);
    }

    @Override
    public List<HighValuePatent> queryHighValuePatent() {
        return PO2VO.patents2HighValuePatents(patentMapper.queryHighValuePatent());
    }

    @Override
    public List<CompanyVO> getHighValueCompany() {
        return PO2VO.companys2VOs(companyMapper.getHighValueCompany());
    }

    @Override
    public List<TownVO> getTownCounts() {
        return PO2VO.towns2VOs(townMapper.getTownCounts());
    }
}
