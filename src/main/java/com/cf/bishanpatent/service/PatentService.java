package com.cf.bishanpatent.service;


import com.cf.bishanpatent.pojo.Patent;
import com.cf.bishanpatent.vo.CompanyVO;
import com.cf.bishanpatent.vo.HighValuePatent;
import com.cf.bishanpatent.vo.TownVO;

import java.util.List;

public interface PatentService {
    Patent getPatentById(Integer id);

    //左上角图标，显示高价值专利
    List<HighValuePatent> queryHighValuePatent();

    List<CompanyVO> getHighValueCompany();

    List<TownVO> getTownCounts();
}
