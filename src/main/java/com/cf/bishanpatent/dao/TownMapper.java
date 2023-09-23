package com.cf.bishanpatent.dao;

import com.cf.bishanpatent.pojo.Town;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TownMapper {
    public List<Town> getTownCounts();
}
