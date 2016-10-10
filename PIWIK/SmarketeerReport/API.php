<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */
namespace Piwik\Plugins\SmarketeerReport;

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
    public function getRevenueByFirstVisit($idSite,$source)
    {  
        Db::get();
       $source = "piwik_log_conversion.".$source; 
 	      $sql="SELECT $source AS nsource,
               SUM(revenue) AS revenue,
               piwik_log_conversion.referer_name as secondSource
        FROM bitnami_piwik.piwik_log_conversion
        WHERE piwik_log_conversion.idgoal=2
        AND piwik_log_conversion.idSite=$idSite
        GROUP BY $source";
  	$value = Db::fetchAll($sql); 
  	return $value;
    }

    public function getCustomersByFirstVisit($idSite,$source){ 
        Db::get();
          $source = "piwik_log_conversion.".$source; 
          $sql="SELECT $source AS nsource,
          piwik_log_conversion.referer_name as secondSource,
        count(distinct piwik_log_visit.idvisitor) AS Clientes
        FROM bitnami_piwik.piwik_log_conversion
        INNER JOIN piwik_log_visit 
        ON piwik_log_visit.idvisitor=piwik_log_conversion.idvisitor
        WHERE piwik_log_conversion.idgoal=2
        AND piwik_log_conversion.idSite=$idSite
        GROUP BY $source";
        $value = Db::fetchAll($sql);
        return $value;
    }

    public function getRevenueByLinealVisit($idSite,$source){ 
    Db::get();
         $source = ($source=="url") ? "piwik_log_action.name" : "piwik_log_visit.".$source; 


          $sql="SELECT  $source  AS nsource,
                    SUM(piwik_log_conversion.revenue) AS revenue,
                    piwik_log_visit.referer_name as secondSource
                FROM piwik_log_visit
                INNER JOIN piwik_log_conversion
                    ON piwik_log_visit.idvisitor=piwik_log_conversion.idvisitor
                INNER JOIN piwik_log_action
                  ON piwik_log_action.idaction= piwik_log_visit.visit_entry_idaction_url
                WHERE piwik_log_visit.idsite=$idSite
                AND piwik_log_conversion.revenue>-1
                AND piwik_log_conversion.idgoal=2
                GROUP BY  $source";

      $value = Db::fetchAll($sql);
        return $value;

    }

    public function getCustomersByLinealVisit($idSite,$source){
         Db::get();
         $source = ($source=="url") ? "piwik_log_action.name" : "piwik_log_visit.".$source;

        $sql="SELECT  $source  AS nsource,
                    COUNT(distinct piwik_log_visit.user_id) AS Clientes,
                    piwik_log_visit.referer_name as secondSource
              FROM piwik_log_visit
              INNER JOIN piwik_log_conversion
                ON piwik_log_visit.idvisitor=piwik_log_conversion.idvisitor
              INNER JOIN piwik_log_action
                ON piwik_log_action.idaction= piwik_log_visit.visit_entry_idaction_url
              WHERE piwik_log_visit.idsite=$idSite 
              AND piwik_log_conversion.idgoal=2
              GROUP BY  $source";
      $value = Db::fetchAll($sql);
        return $value;
    }


}
