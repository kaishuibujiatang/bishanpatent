package com.cf.bishanpatent.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Town {
    private int id;
    private String town;
    private int five_num;
    private int four_num;
}
