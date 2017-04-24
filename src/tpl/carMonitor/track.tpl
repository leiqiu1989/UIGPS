<div class="track-container">
    <div id="trackMap" class="full"></div>
    <div id="trackToolBar">
        <div class="track-back js-track-back" data-localize="button.Back">返 回</div>
        <div class="track-search">
            <div class="inline-block">
                <span data-localize="VehicleMonitor.LicensePlateNumber">车牌号码</span>
                <input type="hidden" name="Vid" />
                <select class="form-control w-200" name="selectCarList" data-placeholder="请选择...">
                </select>
            </div>
            <div class="inline-block ml10">
                <span data-localize="time.StartTime">开始时间</span>
                <input type="text" class="normalText" id="startDate" readonly />
            </div>
            <div class="inline-block ml10">
                <span data-localize="time.EndTime">结束时间</span>
                <input type="text" class="normalText" id="endDate" readonly />
            </div>
            <div class="inline-block ml10">
                <button class="layui-btn layui-btn-small layui-btn-normal js-search-history" data-localize="button.Query">查 询</button>
            </div>
        </div>
    </div>
    <div class="track-list">
        <div class="track-range">
            <div class="track-process">
                <div class="track-range-point"></div>
            </div>
        </div>
        <div class="track-play">
            <span class="trackPlay-btn"></span>
            <span class="track-time"></span>
            <span class="track-speed-slow" data-localize="VehicleMonitor.Slow">慢</span>
            <span class="track-speed-side">
                    <span class="track-speed-width">
                        <span class="track-speed-point" id="speed_point" name="run_point"></span>
            </span>
            </span>
            <span class="track-speed-fast" data-localize="VehicleMonitor.Fast">快</span>
        </div>
        <div class="track-list-info">
            <div class="track-list-info-choice">
                <span class="track-list-info-choice-point" name="list_point" data-localize="VehicleMonitor.TrackingPoint">
                    轨迹点
                </span>
                <span class="track-list-info-toggle js-toggle-list"></span>
            </div>
            <div class="track-list-data">
                <div class="panel full no-margin flexbox">
                    <div class="grid ">
                        <div class="table-head ">
                            <div class="table-head-warp ">
                                <table class="grid-table ">
                                    <colgroup>
                                        <col width="50px">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <col width="22%">
                                        <col width="35%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th data-localize="VehicleMonitor.SerialNumber">序号</th>
                                            <th data-localize="VehicleMonitor.GPStime">GPS时间</th>
                                            <th data-localize="VehicleMonitor.Speed">速度(Km/h)</th>
                                            <th data-localize="VehicleMonitor.VehicleStatus">状态</th>
                                            <th data-localize="VehicleMonitor.Mileage">里程</th>
                                            <th data-localize="VehicleMonitor.Alarm">警情</th>
                                            <th data-localize="VehicleMonitor.Location">位置</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body no-padding grow ">
                        <div id="track-history-list" class="grid-content">
                            <table class="grid-table ">
                                <colgroup>
                                    <col width="50px">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="22%">
                                    <col width="35%">
                                </colgroup>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>