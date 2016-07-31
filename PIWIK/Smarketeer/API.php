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
 	$sql="SELECT
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
                piwik_log_conversion.idgoal 
        FROM piwik_log_visit
        INNER JOIN piwik_log_conversion 
            ON piwik_log_visit.idvisitor=piwik_log_conversion.idvisitor
        WHERE (piwik_log_visit.idvisitor) NOT IN (SELECT idvisitor FROM piwik_log_conversion where
            piwik_log_conversion.idgoal=2
            AND idSite =$idSite
            GROUP BY idvisitor
        )
        AND piwik_log_visit.idSite=$idSite
        GROUP BY piwik_log_visit.idvisitor
        ORDER BY piwik_log_visit.visit_last_action_time DESC
    LIMIT $filter_offset,$filter_limit";
	$value = Db::fetchAll($sql);	
	return $value;
    }

    /**
     * Returns a custom object.
     * API format conversion will fail for this custom object.
     * If used internally, the data structure can be returned untouched by using
     * the API parameter 'format=originals'
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
    public function updateId($email,$userId,$idSite){

        Db::get();
        set_time_limit(35);
        $idvisitor="";
        $query=""; 
        //GET THE NEW
        while($idvisitor==null||$idvisitor==""||!$idvisitor){

            $query="SELECT hex(idvisitor) AS idvisitor
                    FROM piwik_log_visit 
                    WHERE user_id = '$email' 
                    AND idSite = $idSite"; 
            $idvisitor = Db::fetchOne($query); 
        } 
        //GET THE OLD
        $query="SELECT  hex(idvisitor) AS oldVisit
                from piwik_log_visit 
                WHERE custom_var_v1 = '$email' 
                AND idSite = $idSite";
        $oldVisit=Db::fetchOne($query);    

        //UPDATE visit
        $query="UPDATE piwik_log_visit
                SET idvisitor      = UNHEX('$idvisitor'),
                    user_id        = '$email'
                WHERE idvisitor=UNHEX('$oldVisit')
                AND idSite=$idSite";

        $value=Db::exec($query); 


        //UPDATE conversion
        $query="UPDATE piwik_log_conversion
                SET idvisitor      = UNHEX('$idvisitor')
                WHERE idvisitor=UNHEX('$oldVisit')
                AND idSite=$idSite";
        $value=Db::exec($query); 


         return $value;
         die();
        /*
                $query= " UPDATE piwik_log_visit
                    SET user_id= '$email',
                    idvisitor= CONV(hex($idvisitor, 10, 16),
                    custom_var_v1='$email'
                    WHERE (user_id='$userId'  
                    OR  user_id='$email' OR custom_var_v1=$userId  ) AND idSite=$idSite";


        $value=Db::exec($query);  
             */  

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
