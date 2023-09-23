package com.cf.bishanpatent.dao;


import com.cf.bishanpatent.pojo.Company;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CompanyMapper {
    List<Company> getHighValueCompany();
}
