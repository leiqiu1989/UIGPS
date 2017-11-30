<div class="panel panel-transparent full">
    <div id="monitorMap" class="full"></div>
    <!--车辆列表-->
    <div class="monitorList">
        <div class="monitorBar clearfix ">
            <div class="monitorOrganizationIcon pull-left js-origin"></div>
            <div class="monitorCarSummary pull-left ">
                <span class="active">Loading Vehicles<span class="js-carTotal">0</span></span>
                <span class="online">Online<span class="js-onLineTotal">0</span></span>
                <span class="offline">Offline<span class="js-offLineTotal">0</span></span>
            </div>
            <div class="pull-right ">
                <a class="foldUp js-foldToggle "></a>
            </div>
        </div>
        <div class="monitorBody">
            <div class="panel full no-margin flexbox">
                <div class="grid ">
                    <div class="table-head ">
                        <div class="table-head-warp ">
                            <table class="grid-table ">
                                <colgroup>
                                    <col width="60px " />
                                    <col width="15% " />
                                    <col width="10% " />
                                    <col width="8% " />
                                    <col width="8% " />
                                    <col width="10% " />
                                    <col width="8% " />
                                    <col />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Serial</th>
                                        <th>Operation</th>
                                        <th>License</th>
                                        <th>GPSTime
                                            <span class="sort" data-field="GpsTime">
                                                <i class="asc" data-sort="1"></i>
                                                <i class="desc" data-sort="0"></i>
                                            </span>
                                        </th>
                                        <th>Speed(Km/h)</th>
                                        <th>Status</th>
                                        <th>Direction</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel-body no-padding grow ">
                    <div id="carMonitorList" class="grid-content">
                        <table class="grid-table ">
                            <colgroup>
                                <col width="60px " />
                                <col width="15% " />
                                <col width="10% " />
                                <col width="8% " />
                                <col width="8% " />
                                <col width="10% " />
                                <col width="8% " />
                                <col />
                            </colgroup>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--组织列表-->
    <div class="vehicle-box">
        <div class="panel panel-transparent full no-margin">
            <div class="panel-heading clearfix">
                <h4 class="pull-left">Group list</h4>
                <div class="pull-right vehicle-close">
                    X
                </div>
            </div>
            <div class="panel-toolbar">
                <input type="text" class="normalText w-300" name="searchTreeText" id="searchTreeText" placeholder="Please enter the License or Organization" />
            </div>
            <div class="panel-body">
                <div id="vehicleTree" class="vehicle-tree ztree">
                </div>
                <div class="vehicleOK">
                    <button class="layui-btn layui-btn-small layui-btn-normal w-200 js-vehicle-ok">OK</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 地图搜索 -->
    <div class="mapTools">
        <div class="mapInputSearch relative">
            <span>License</span>
            <input type="text" name="txtCarPlateNo" />
            <a href="javascript:void(0)" class="js-search-car"></a>
        </div>
        <div class="mapOBD js-toggleOBD">
            OBD Info
        </div>
        <!-- <div class="mapAlarm js-mapAlarm">
            Alarm <span class="alarmCount js_alarmCount">0</span>
        </div> -->
    </div>
    <!-- OBD信息列表 -->
    <div id="obdList" class="OBDInfo hidden">
        <div class="obd-Title">
            <span>OBD Info</span>
            <div class="pull-right odb-close">X</div>
        </div>
        <ul class="ul-tab clearfix">
            <li class="active" data-target="obdInfo">OBD Data</li>
            <li data-target="obdStatus">OBD Status</li>
        </ul>
        <div class="obd-Content">
        </div>
    </div>
</div>