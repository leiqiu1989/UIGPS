<div class="panel panel-transparent flexbox no-margin">
    <div class="panel-toolbar">
        <div class="layui-form layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">License</label>
                    <div class="layui-input-block">
                        <select id="selPlateNumber" name="selPlateNumber">
                            <option value="">Select</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">Alarm</label>
                    <div class="layui-input-block">
                        <select id="selAlarm" name="selAlarm">
                            <option value="">Select</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_alarm_search">Query</button>
                    <button class="layui-btn layui-btn-primary js_alarm_reset">Reset</button>
                    <button class="layui-btn layui-btn-primary js_alarm_dispose">All Dispose</button>
                </div>
            </div>
        </div>
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
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>License</th>
                                    <th>Alarm</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <tbody id="tbAlarmList">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="panel-footer clearfix">
                data：<span class="js_alarm_total">0</span>&nbsp;piece
            </div>
        </div>
    </div>
</div>