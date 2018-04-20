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
        
        /*
        if(count($macs)>0){
            $addexist = DB::select("call ADD_MAC_ENTRY('$mac', 
                                   '$active', '$utiltx', '$utilrx', 
                                   '$usagetx', '$usagerx', '$ccq', '$lease',
                                   '$uptime', '$freeMem', '$cpuFreq',
                                   '$cpuLoad', '$freeHDD', '$badBlock', '$version',
                                   '$appVersion', '$gps', '$dispense', '$packages',
                                   'existed')");
            
        }
        else{
            $addnotexist = DB::select("call ADD_MAC_ENTRY('$mac',
                                    '$active', '$utiltx', '$utilrx', 
                                    '$usagetx', '$usagerx', '$ccq', '$lease',
                                    '$uptime', '$freeMem', '$cpuFreq',
                                    '$cpuLoad', '$freeHDD', '$badBlock', '$version',
                                    '$appVersion', '$gps', '$dispense', '$packages',
                                    'not_existing')");
            
        }
        */

    }
    public function addTrackInfo(Request $request){
        $query = $request->all();
        $routerMac = $query['routerMac'];
        $userMac = $query['userMac'];
        $longGps = $query['longGps'];
        $latGps = $query['latGps'];
        $versionUserDevice = $query['versionUserDevice'];
        $freeMem = $query['freeMem'];
        
        $mti = mac_track_info::all('routerMac')->where('routerMac', '=', $routerMac);

        if(count($mti)>0){
            $addexist = DB::select("call ADD_MAC_TRACK_INFO('existed', '$routerMac', 
                                   '$userMac', '$longGps', '$latGps', 
                                   '$versionUserDevice', '$freeMem')");
            
        }
        else{
            $addnotexist = DB::select("call ADD_MAC_TRACK_INFO('not_existing', '$routerMac', 
                                   '$userMac', '$longGps', '$latGps', 
                                   '$versionUserDevice', '$freeMem')");
            
        }
        
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
