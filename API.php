<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */
namespace Piwik\Plugins\Smarketeer;

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
     * Returns a custom object.
     * API format conversion will fail for this custom object.
     * If used internally, the data structure can be returned untouched by using
     * the API parameter 'format=original'
     *
     * @return MagicObject Will return a standard Piwik error when called from the Web APIs
     */
    public function getSales($idSite,$filter_offset,$filter_limit)
    {
	Db::get();
        $sql="SELECT
		piwik_log_action.name,
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
		SUM(piwik_log_conversion.revenue) AS total
        FROM piwik_log_visit
        INNER JOIN piwik_log_conversion
        ON piwik_log_visit.idvisitor=piwik_log_conversion.idvisitor
        INNER JOIN piwik_log_action
        ON piwik_log_visit.visit_entry_idaction_url=piwik_log_action.idaction
        WHERE  piwik_log_visit.idSite=$idSite 
        AND    piwik_log_conversion.idgoal=2
        AND     piwik_log_visit.visit_entry_idaction_url>0
        GROUP BY piwik_log_visit.user_id
        LIMIT $filter_offset,$filter_limit";
        $value = Db::fetchAll($sql);
        return $value;
    }

   /**
     * Sums two floats and returns the result.
     * The paramaters are set automatically from the GET request
     * when the API function is called. You can also use default values
     * as shown in this example.
     *
     * @param float|int $a
     * @param float|int $b
     * @return float
     */
    public function getVisits($idSite,$filter_offset,$filter_limit){
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
                piwik_log_visit.visitor_returning AS status,
                piwik_log_action.name AS url
        FROM piwik_log_visit
        INNER JOIN piwik_log_action
        ON piwik_log_visit.visit_entry_idaction_url=piwik_log_action.idaction
        WHERE  piwik_log_visit.idSite=$idSite 
        ORDER BY visit_last_action_time DESC
        LIMIT $filter_offset,$filter_limit";
        $value = Db::fetchAll($sql);
        return $value;

	}

    /**
     * Updates every UserId to the email once we receive it
     */
    public function updateId($email,$userId)
    {
	Db::get();
    $sql= "SELECT    idivisitor
              FROM piwik_log_visit
              WHERE user_id='$userId' 
              ORDER By visitor_localtime ASC LIMIT 1
              ";
              $value = Db::fetchAll($sql);
        return $value;

		/*$query="UPDATE piwik_log_visit,piwik_option 
	SET user_id= '$email'
	WHERE user_id='$userId'";
 
	$value = Db::segmentedQuery($query);//Db::query($query,array(23));*/



    return $value;
    }

    
    public function GetUserTotalVisits($userId,$idSite){
        Db::get();
        $query="SELECT count(user_id) AS visitas
                FROM  piwik_log_visit
                WHERE user_id= '$userId'
                AND idSite=$idSite
                AND visit_total_actions>0";


        $value = Db::fetchAll($query);
        return $value;
    }
}
