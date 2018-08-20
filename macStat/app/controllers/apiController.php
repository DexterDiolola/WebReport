<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\mac;
use App\mac_track_info;

class apiController extends Controller
{
    //ADD NEW STAT
    public function addStat(Request $request){
        $query = $request->all();
        $mac = $query['mac'];
        $active = $query['active'];
        $utiltx = $query['utiltx'];
        $utilrx = $query['utilrx'];
        $usagetx = $query['usagetx'];
        $usagerx = $query['usagerx'];
        
        $query['ccq'] == null || $query['ccq'] == '' ? $ccq = 0 : $ccq = $query['ccq'];

        $lease = $query['lease'];
        $uptime = $query['uptime'];
        $freeMem = $query['FreeMem'];
        $cpuFreq = $query['cpuFreq'];
        $cpuLoad = $query['cpuLoad'];
        $freeHDD = $query['freeHDD'];
        $badBlock = $query['badBlock'];

        
        $request->query->has('version') ? $version = $query['version'] : $version = 0;
        $request->query->has('appVersion') ? $appVersion = $query['appVersion'] : $appVersion = 0;
        $request->query->has('gps') ? $gps = $query['gps'] : $gps = 0;
        $request->query->has('dispense') ? $dispense = $query['dispense'] : $dispense = 0;
        $request->query->has('packages') ? $packages = $query['packages'] : $packages = 0;
        $request->query->has('vpnaddr') ? $vpnaddr = $query['vpnaddr'] : $vpnaddr = 0;


        $macs = mac::all('mac')->where('mac', '=', $mac);

       if(count($macs)>0){
            $addexist = DB::select("call ADD_MAC_ENTRY('$mac', 
                                   '$active', '$utiltx', '$utilrx', 
                                   '$usagetx', '$usagerx', '$ccq', '$lease',
                                   '$uptime', '$freeMem', '$cpuFreq',
                                   '$cpuLoad', '$freeHDD', '$badBlock', '$version',
                                   '$appVersion', '$gps', '$dispense', '$packages',
                                   '$vpnaddr', 'existed')");
            
        }
        else{
            $addnotexist = DB::select("call ADD_MAC_ENTRY('$mac',
                                    '$active', '$utiltx', '$utilrx', 
                                    '$usagetx', '$usagerx', '$ccq', '$lease',
                                    '$uptime', '$freeMem', '$cpuFreq',
                                    '$cpuLoad', '$freeHDD', '$badBlock', '$version',
                                    '$appVersion', '$gps', '$dispense', '$packages',
                                    '$vpnaddr', 'not_existing')");
            
        }

    }

    public function addViews(Request $request){
        $query = $request->all();
        $routerMac = $query['routerMac'];
        $userMac = $query['userMac'];
        $loginType = $query['logintype'];
        $loginValue = $query['loginvalue'];


        /* 
        This ternary condition was made in order to bypass the error data that has been input during REST API
        Because the data returned has a value of routerMac = $(identity) and $userMac = undefinedundefinedundefined. . .
        which is too long and greater than 255 characters
        To debug, just assign a new value to $userMac 
        
        If the length of $userMac variable is greater than 50 then no insertion will be happened
        */
        strlen($userMac) > 50 ? $userMac =  'DATA_TOO_LONG_ERROR' : true;

        $add = DB::select("call VIEWS('insert', '$routerMac', '$userMac', '$loginType', '$loginValue')");
    }

    public function getActiveMacs(Request $request){
        $query = $request->all();
        $trend = $query['trend'];
        $get = $query['get'];
        $created = $query['created'];

        $response = DB::select("call GET_ACTIVE_MACS('$trend', '$get', '$created')");
        return response()->json($response,200);
    }

    public function macsPerTrend(Request $request){
        $query = $request->all();
        $trend = $query['trend'];

        $response = DB::select("call MACS_PER_TREND('$trend')");
        return response()->json($response,200);
    }

    public function maxPerTrend(Request $request){
        $query = $request->all();
        $trend = $query['trend'];
        $get = $query['get'];
        $created = $query['created'];

        $response = DB::select("call MAX_PER_TREND('$trend', '$get', '$created')");
        return response()->json($response,200);
    }

    public function permacActivity(Request $request){
        $query = $request->all();
        $trend = $query['trend'];
        $mac = $query['mac'];

        $response = DB::select("call PERMAC_ACTIVITY('$trend', '$mac')");
        return response()->json($response,200);
    }

    public function searchMac($mac){
        $response = DB::select("call testsearchmac('$mac')");
        return response()->json($response,200);
    }

    public function addMacLabel(Request $request){
        $query = $request->all();
        $cond = $query['cond'];
        $mac = $query['mac'];
        $label = $query['label'];

        $response = DB::select("call ADD_MAC_LABEL('$cond', '$mac', '$label')");
        return response()->json($response,200);
    }

    public function macAdministration(Request $request){
        $query = $request->all();
        $cond = $query['cond'];
        $owner = $query['owner'];
        $mac = $query['mac'];

        $response = DB::select("call MAC_ADMINISTRATION('$cond', '$owner', '$mac')");
        return response()->json($response,200);
    }

    public function getViews(Request $request){
        $query = $request->all();
        $cond = $query['cond'];
        $routerMac = $query['routerMac'];
        $userMac = $query['userMac'];

        $response = DB::select("call VIEWS('$cond', '$routerMac', '$userMac', '', '')");
        return response()->json($response,200);
    }
    









    public function packageSummary(Request $request){
        $query = $request->all();
        $trend = $query['trend'];
        $mac = $query['mac'];
        $nthDay = $query['nthDay'];

        $response = DB::select("call PACKAGE_SUMMARY('$trend', '$mac', '$nthDay')");
        return response()->json($response,200);
    }

    public function modPackages(Request $request){
        $arr = $request->all();
        $len = count($arr);

        $response = DB::select("call MOD_PACKAGES('truncate', '', '', '', '', '', '', 
                                                  '', '', '', '', '', '')");

        for($x=0; $x<$len; $x++){
            $mac = $arr[$x]['mac'];
            $label = $arr[$x]['label'];
            $packages = $arr[$x]['packages'];
            $dateCreated = $arr[$x]['dateCreated'];

            $xxxmins = $arr[$x]['30mins'];
            $ihr = $arr[$x]['1hr'];
            $iihrs = $arr[$x]['2hrs'];
            $vhrs = $arr[$x]['5hrs'];
            $iday = $arr[$x]['1day'];
            $iidays = $arr[$x]['2days'];
            $ivdays = $arr[$x]['4days'];
            $iweek = $arr[$x]['1week'];

            $response2 = DB::select("call MOD_PACKAGES('insert', '$mac', '$label', '$packages',
                                    '$dateCreated', '$xxxmins', '$ihr', '$iihrs', '$vhrs',
                                    '$iday', '$iidays', '$ivdays', '$iweek')");
        }
        
    }

    public function maxOfPackages(Request $request){
        $query = $request->all();
        $cond = $query['cond'];

        $response = DB::select("call MAX_OF_PACKAGES('$cond')");
        return response()->json($response,200);
    }

    //Testing Function (processing the package chart in backend approach)
    public function packageChart(){
        $ampd = DB::select("call GET_ACTIVE_MACS('countActivePD', 'getMac', '')");
        $ampd = json_decode(json_encode($ampd), true);

        $packageDispense = array();

        for($x=0; $x<count($ampd); $x++){
            for($y=0; $y<30; $y++){
                $activeDevice = $ampd[$x]['activeDevice'];
                $ps = DB::select("call PACKAGE_SUMMARY('perDay', '$activeDevice', '$y')");
                $ps = json_decode(json_encode($ps), true);

                $lastIdx = count($ps) - 1;
                if(count($ps) != 0){
                    $first = $ps[0]['packages'];
                    $last = $ps[$lastIdx]['packages'];
                }
                else
                    false;
                

            }
        }

        echo "Hello Dext";

    }
    









    public function alerts(Request $request){
        $query = $request->all();
        $cond = $query['cond'];

        if($cond=='getMax'){
            $response = DB::select("call ALERTS('getMax', '', '', '', '', '', '')");
            return response()->json($response,200);
        }
        else if($cond=='getAlert'){
            $response = DB::select("call ALERTS('getAlert', '', '', '', '', '', '')");
            return response()->json($response,200);
        }
        else
            return false;

    }

    public function sendAlerts(Request $request){
        $arr = $request->all();
        $len = count($arr);

        $response = DB::select("call ALERTS('truncate', '', '', '', '', '', '')");

        for($x=0; $x<$len; $x++){
            $mac = $arr[$x]['mac'];
            $label = $arr[$x]['label'];
            $owner = $arr[$x]['owner'];
            $alertMsg = $arr[$x]['alertMsg'];
            $alertType = $arr[$x]['alertType'];
            $dateCreated = $arr[$x]['dateCreated'];

            $response2 = DB::select("call ALERTS('sendAlert', '$mac', '$label', '$owner', '$alertType', '$alertMsg',
                                    '$dateCreated')");
        }
    }

    public function setAlertValues(Request $request){
        $arr = $request->all();
        $ccq = $arr[0]['ccq'];
        $cpuLoad = $arr[0]['cpuLoad'];
        $freeMem = $arr[0]['freeMem'];

        $response2 = DB::select("call SET_ALERT_VALUES('$ccq', '$cpuLoad', '$freeMem')");
        
    }





    ///////////////////////////////////////////////////////////////////////

    public function getActiveMacsUser(Request $request){
        $query = $request->all();
        $trend = $query['trend'];
        $get = $query['get'];
        $created = $query['created'];
        $owner = $query['owner'];

        $response = DB::select("call GET_ACTIVE_MACS_USER('$trend', '$get', '$created', '$owner')");
        return response()->json($response,200);
    }
    public function macsPerTrendUser(Request $request){
        $query = $request->all();
        $trend = $query['trend'];
        $owner = $query['owner'];

        $response = DB::select("call MACS_PER_TREND_USER('$trend', '$owner')");
        return response()->json($response,200);
    }
    public function maxPerTrendUser(Request $request){
        $query = $request->all();
        $trend = $query['trend'];
        $get = $query['get'];
        $created = $query['created'];
        $owner = $query['owner'];

        $response = DB::select("call MAX_PER_TREND_USER('$trend', '$get', '$created', '$owner')");
        return response()->json($response,200);
    }

    
}
