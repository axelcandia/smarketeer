SELECT
                piwik_log_visit.user_id,
                piwik_log_visit.custom_var_v1,
                piwik_log_visit.campaign_name,
                piwik_log_visit.campaign_keyword,
                piwik_log_visit.campaign_source,
                piwik_log_visit.campaign_medium,
                piwik_log_visit.campaign_content,
                piwik_log_visit.referer_name,
                piwik_log_visit.referer_type,
                piwik_log_visit.referer_url,
                piwik_log_visit.custom_dimension_2,
                piwik_log_visit.visit_last_action_time,
                piwik_log_visit.visit_total_actions,
                piwik_log_conversion.url,
                piwik_log_conversion.idgoal,
                piwik_log_visit.referer_url 
        FROM piwik_log_visit
        INNER JOIN piwik_log_conversion 
            ON piwik_log_visit.idvisitor=piwik_log_conversion.idvisitor
        WHERE piwik_log_visit.custom_var_v1 NOT IN (SELECT custom_var_v1 FROM piwik_log_conversion where
            piwik_log_conversion.idgoal=2
            AND idSite =89
            GROUP BY custom_var_v1

        )
        AND piwik_log_visit.idSite=89
        GROUP BY piwik_log_visit.custom_var_v1;
        /*
        INNER JOIN (
            SELECT idvisitor,custom_var_v1,idgoal,url
                FROM piwik_log_conversion                        
                WHERE piwik_log_conversion.idgoal NOT IN  
                (
                  select idgoal
                  from piwik_log_conversion
                  where idgoal=2 
                  AND idSite=89
                  GROUP BY custom_var_v1 
                )
                AND idSite=89
                GROUP BY custom_var_v1 
            ) AS conversion
        ON piwik_log_visit.custom_var_v1=conversion.custom_var_v1
        WHERE piwik_log_visit.idSite=89
        AND piwik_log_visit.custom_var_v1 !=''*/
        GROUP BY piwik_log_visit.custom_var_v1;




SELECT DISTINCT piwik_log_visit.custom_var_v1, 
                piwik_log_visit.campaign_name,
                piwik_log_visit.campaign_keyword,
                piwik_log_visit.campaign_source,
                piwik_log_visit.campaign_medium,
                piwik_log_visit.campaign_content,
                piwik_log_visit.referer_name,
                piwik_log_visit.referer_type,
                piwik_log_visit.referer_url,
                piwik_log_visit.custom_dimension_2,
                piwik_log_visit.visit_last_action_time,
                piwik_log_visit.visit_total_actions,
                piwik_log_conversion.url,
                piwik_log_conversion.idgoal,
                piwik_log_visit.referer_url
FROM piwik_log_visit
INNER JOIN piwik_log_conversion
ON piwik_log_visit.custom_var_v1=piwik_log_conversion.custom_var_v1
WHERE NOT EXISTS(
    SELECT * FROM piwik_log_conversion
    WHERE piwik_log_visit.idvisitor = piwik_log_conversion.idvisitor
    AND piwik_log_conversion.idgoal = 2)
AND piwik_log_visit.idSite=89
GROUP BY piwik_log_visit.custom_var_v1;






TODO
1- 


SELECT idvisitor,custom_var_v1
FROM piwik_log_conversion                        
WHERE piwik_log_conversion.idgoal not in 
(
  select idgoal
  from piwik_log_conversion
  where idgoal=2 
)
AND idSite=89
GROUP BY custom_var_v1 ;