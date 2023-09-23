package com.cf.bishanpatent.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author ChenweiLin
 * @create 2021-09-20 21:14
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patent {
    private int id;
    private String title;
    private String digest;
    private String applicant;
    private String publication_num;
    private String publication_day;
    private String application_num;
    private String application_day;
    private String type;
    private String publication_country;
    private String ipc_catalog;
    private String ipc;
    private String national_industries_classification;
    private String applicant_en;
    private String applicants_num;
    private String applicant_type;
    private String applicant_country_code;
    private String applicant_address;
    private String applicant_address_other;
    private String applicant_province_country;
    private String applicant_province_city;
    private String applicant_county;
    private String business_alias;
    private String business_en;
    private String business_address;
    private String business_type;
    private String inventor;
    private String inventor_other;
    private String first_inventor;
    private String inventor_num;
    private String agency;
    private String agent;
    private String doc_type_code;
    private String share_value;
    private String tech_stability;
    private String tech_advancement;
    private String scope_of_protection;
    private float value_score;
}
