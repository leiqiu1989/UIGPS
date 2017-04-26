<div class="track-container">
    <div id="trackMap" class="full"></div>
    <div id="trackToolBar">
        <div class="track-back js-track-back">Back</div>
        <div class="track-search">
            <div class="inline-block">
                <span>License</span>
                <input type="hidden" name="Vid" />
                <select class="form-control w-200" name="selectCarList" data-placeholder="Select...">
                </select>
            </div>
            <div class="inline-block ml10">
                <span>Start Time</span>
                <input type="text" class="normalText" id="startDate" readonly />
            </div>
            <div class="inline-block ml10">
                <span>EndTime</span>
                <input type="text" class="normalText" id="endDate" readonly />
            </div>
            <div class="inline-block ml10">
                <button class="layui-btn layui-btn-small layui-btn-normal js-search-history">Query</button>
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
            <span class="track-speed-slow">Slow</span>
            <span class="track-speed-side">
                    <span class="track-speed-width">
                        <span class="track-speed-point" id="speed_point" name="run_point"></span>
            </span>
            </span>
            <span class="track-speed-fast">Fast</span>
        </div>
        <div class="track-list-info">
            <div class="track-list-info-choice">
                <span class="track-list-info-choice-point" name="list_point">
                    tracking point
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
                                            <th>Serial</th>
                                            <th>GPS Time</th>
                                            <th>Speed(Km/h)</th>
                                            <th>Status</th>
                                            <th>Mileage</th>
                                            <th>Alarm</th>
                                            <th>Location</th>
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