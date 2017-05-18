<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">OBD Report</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">Subordinate</label>
                    <div class="layui-input-block">
                        <input type="hidden" name="OnlyOrgNo" value="<%= searchValue.OnlyOrgNo %>" />
                        <input type="text" class="layui-input w-200" name="orgName" placeholder="至少输入3个字符搜索" value="<%= searchValue.orgName%>" />
                        <ul class="ul-select hidden"></ul>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label border-right">Time</label>
                    <div class="layui-input-inline w-150">
                        <span class="time-area" data-type="week">Month</span>
                        <span class="time-area" data-type="month">Week</span>
                        <span class="time-area" data-type="custom" class="active">Custom</span>
                    </div>
                    <div class="layui-input-inline w-100">
                        <input type="text" name="startTime" readonly autocomplete="off" class="layui-input" />
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline w-100">
                        <input type="text" name="endTime" readonly autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">License</label>
                    <div class="layui-input-block">
                        <select id="vehicleType" name="VehicleType">
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">Device IMEI</label>
                    <div class="layui-input-block">
                        <select id="vehicleType" name="VehicleType">
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search">Query</button>
                    <button class="layui-btn layui-btn-primary js_list_reset">Reset</button>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-toolbar">
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_export">
            <i class="fa fa-export"></i>
            Export
        </button>
    </div>
    <div class="panel-body no-padding grow">
        <div class="panel full no-margin flexbox">
            <div class="grid ">
                <div class="table-head ">
                    <div class="table-head-warp ">
                        <table class="grid-table ">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>License</th>
                                    <th>Device NO</th>
                                    <th>Vehicle Brand</th>
                                    <th>Model Year</th>
                                    <th>Subordinate</th>
                                    <th>Start TIme</th>
                                    <th>End TIme</th>
                                    <th>Driving Time</th>
                                    <th>Mileage(km)</th>
                                    <th>Average Speed(km/h)</th>
                                    <th>Oil Consumption(L)</th>
                                    <th>Oil Consumption(L/km)</th>
                                    <th>Oil Consumption(L/100km)</th>
                                    <th>The Number of Fault</th>
                                    <th>Rapid Acceleration</th>
                                    <th>Rapid Deceleration</th>
                                    <th>Sharp Turn</th>
                                    <th>Sudden Brake</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="obdReportList" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="panel-footer clearfix">
                <div id="page" class="pull-right"></div>
            </div>
        </div>
    </div>
</div>