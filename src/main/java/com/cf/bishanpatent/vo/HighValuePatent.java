package com.cf.bishanpatent.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HighValuePatent {
    private int id;
    private String title;
    private String applicant_country;
    private String applicant_county;
    private float value_score;
    private String digest;
}
