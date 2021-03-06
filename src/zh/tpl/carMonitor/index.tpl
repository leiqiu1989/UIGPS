<div class="panel panel-transparent full">
    <div id="monitorMap" class="full"></div>
    <!--车辆列表-->
    <div class="monitorList">
        <div class="monitorBar clearfix ">
            <div class="monitorOrganizationIcon pull-left js-origin"></div>
            <div class="monitorCarSummary pull-left ">
                <span class="active">加载车辆<span class="js-carTotal">0</span></span>
                <span class="online">在线<span class="js-onLineTotal">0</span></span>
                <span class="offline">离线<span class="js-offLineTotal">0</span></span>
            </div>
            <div class="pull-right ">
                <a class="foldUp js-foldToggle "></a>
            </div>
        </div>
        <div class="monitorBody">
            <div class="panel full no-margin flexbox">
                <div class="grid ">
                    <div class="table-head ">
                        <div class="table-head-warp">
                            <table class="grid-table ">
                                <colgroup>
                                    <col width="50px " />
                                    <col width="10% " />
                                    <col width="8% " />
                                    <col width="12% " />
                                    <col width="7% " />
                                    <col width="12% " />
                                    <col width="7% " />
                                    <col />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>序号</th>
                                        <th>操作</th>
                                        <th>车牌号码</th>
                                        <th>GPS时间
                                            <span class="sort" data-field="GpsTime">
                                                <i class="asc" data-sort="1"></i>
                                                <i class="desc" data-sort="0"></i>
                                            </span>
                                        </th>
                                        <th>速度(Km/h)</th>
                                        <th>车辆状态</th>
                                        <th>行驶方向</th>
                                        <th>位置</th>
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
                                <col width="50px " />
                                <col width="10% " />
                                <col width="8% " />
                                <col width="12% " />
                                <col width="7% " />
                                <col width="12% " />
                                <col width="7% " />
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
                <h4 class="pull-left">组织列表</h4>
                <div class="pull-right vehicle-close">
                    X
                </div>
            </div>
            <div class="panel-toolbar">
                <input type="text" class="normalText w-300" name="searchTreeText" id="searchTreeText" placeholder="请输入车牌号或组织名查找" />
            </div>
            <div class="panel-body">
                <div id="vehicleTree" class="vehicle-tree ztree">
                </div>
                <div class="vehicleOK">
                    <button class="layui-btn layui-btn-small layui-btn-normal w-200 js-vehicle-ok">确 定</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 地图搜索 -->
    <div class="mapTools">
        <div class="mapInputSearch relative">
            <span>车牌号码</span>
            <input type="text" name="txtCarPlateNo" />
            <a href="javascript:void(0)" class="js-search-car"></a>
        </div>
        <div class="mapOBD js-toggleOBD">
            OBD信息
        </div>
        <!-- <div class="mapAlarm js-mapAlarm">
            报 警 <span class="alarmCount js_alarmCount">0</span>
        </div> -->
    </div>
    <!-- OBD信息列表 -->
    <div id="obdList" class="OBDInfo hidden">
        <div class="obd-Title">
            <span>OBD信息</span>
            <div class="pull-right odb-close">X</div>
        </div>
        <ul class="ul-tab clearfix">
            <li class="active" data-target="obdInfo">OBD数据</li>
            <li data-target="obdStatus">OBD状态</li>
        </ul>
        <div class="obd-Content">
        </div>
    </div>
</div>