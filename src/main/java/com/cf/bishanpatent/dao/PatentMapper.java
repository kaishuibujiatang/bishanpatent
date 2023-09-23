package com.cf.bishanpatent.dao;


import com.cf.bishanpatent.pojo.Patent;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatentMapper {
    Patent getPatentById(Integer id);

    //左上角图标，显示高价值专利
    List<Patent> queryHighValuePatent();
}
