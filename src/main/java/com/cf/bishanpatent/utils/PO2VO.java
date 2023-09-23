package com.cf.bishanpatent.utils;


import com.cf.bishanpatent.pojo.Company;
import com.cf.bishanpatent.pojo.Patent;
import com.cf.bishanpatent.pojo.Town;
import com.cf.bishanpatent.vo.CompanyVO;
import com.cf.bishanpatent.vo.HighValuePatent;
import com.cf.bishanpatent.vo.TownVO;

import java.util.ArrayList;
import java.util.List;

public class PO2VO {
    public static HighValuePatent patent2HighValuePatent(Patent patent) {
        HighValuePatent highValuePatent = new HighValuePatent();
        highValuePatent.setId(patent.getId());
        highValuePatent.setTitle(patent.getTitle());
        highValuePatent.setApplicant_country(patent.getApplicant_country_code());
        highValuePatent.setApplicant_county(patent.getApplicant_county());
        highValuePatent.setValue_score(patent.getValue_score());
        highValuePatent.setDigest(patent.getDigest());
        return highValuePatent;
    }

    public static List<HighValuePatent> patents2HighValuePatents(List<Patent> patentList) {
        List<HighValuePatent> list = new ArrayList<>();
        for (Patent patent : patentList) {
            list.add(patent2HighValuePatent(patent));
        }
        return list;
    }

    public static CompanyVO company2VO(Company company) {
        return new CompanyVO(company.getName(), company.getFirst_claim());
    }

    public static List<CompanyVO> companys2VOs(List<Company> companies) {
        List<CompanyVO> rets = new ArrayList<>();
        for (Company company : companies) {
            rets.add(company2VO(company));
        }
        return rets;
    }

    public static TownVO town2VO(Town town) {
        return new TownVO(town.getTown(), town.getFive_num(), town.getFour_num());
    }

    public static List<TownVO> towns2VOs(List<Town> towns) {
        List<TownVO> rets = new ArrayList<>();
        for (Town town : towns) {
            rets.add(town2VO(town));
        }
        return rets;
    }
}
