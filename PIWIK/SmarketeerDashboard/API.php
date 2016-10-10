<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */
namespace Piwik\Plugins\SmarketeerDashboard;

use Piwik\Piwik;
use Piwik\Version;
use Piwik\Db;
use Piwik\Common;
use Piwik\DataTable;
use Piwik\DataTable\BaseFilter;
use Piwik\DataTable\Row;
use Piwik\Db\AdapterInterface;
/**
 * The ExampleAPI is useful to developers building a custom Piwik plugin.
 *
 * Please see the <a href='https://github.com/piwik/piwik/blob/master/plugins/ExampleAPI/API.php' rel='noreferrer' target='_blank'>source code in in the file plugins/ExampleAPI/API.php</a> for more documentation.
 * @method static \Piwik\Plugins\ExampleAPI\API getInstance()
 */
class API extends \Piwik\Plugin\API
{

    /**
     * Gets the leads necesary for the table
     * @return integer
     */
    public function getLeads($idSite,$filter_offset,$filter_limit)
    {
	 Db::get();
 	  $sql="
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
                    AND idSite =$idSite
                    GROUP BY custom_var_v1

        )
        AND piwik_log_visit.idSite=$idSite
        GROUP BY piwik_log_visit.custom_var_v1
	LIMIT $filter_offset,$filter_limit";
	$value = Db::fetchAll($sql);	
	return $value;
    }


    /**
    * Returns the referrer based in all the visits
    */
    public function getLeadsReferrerByAllVisits($from,$to,$idSite){
        $query="SELECT piwik_log_visit.campaign_source,
                SUM(CASE WHEN piwik_log_visit.campaign_source IS NULL THEN 1 ELSE 1 END) AS Total
                FROM piwik_log_visit
                INNER JOIN piwik_log_conversion
                ON piwik_log_visit.idvisitor=piwik_log_conversion.idvisitor
                WHERE piwik_log_visit.idsite=92
               AND (piwik_log_visit.visit_last_action_time BETWEEN $from AND $to)
                GROUP BY piwik_log_visit.campaign_source";
        return $value;
    } 
    /**
    * Returns the referrer based in the first visits
    */
    public function getLeadsReferrerByFirstVisit($from,$to,$idSite){
        $query="SELECT campaign_source,
                SUM(CASE WHEN piwik_log_conversion.campaign_source IS NULL THEN 1 ELSE 1 END) AS Total
                FROM piwik_log_conversion
                WHERE piwik_log_conversion.idSite= $idSite
                AND (piwik_log_conversion.server_time BETWEEN $from AND $to)
                GROUP BY piwik_log_conversion.campaign_source";
        return $value;
    }

    /**
    * Returns the referrer based in the last visit
    */
    public function getLeadsReferrerByLastVisit(){

        return $value;
    } 

}
