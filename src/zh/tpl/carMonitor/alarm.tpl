<div class="panel panel-transparent flexbox no-margin">
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">车牌号码</label>
                    <div class="layui-input-block">
                        <select id="selPlateNumber" name="selPlateNumber">
                            <option value="">请选择</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">警情</label>
                    <div class="layui-input-block">
                        <select id="selAlarm" name="selAlarm">
                            <option value="">请选择</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_alarm_search">查 询</button>
                    <button class="layui-btn layui-btn-primary js_alarm_reset">重 置</button>
                    <button class="layui-btn layui-btn-primary js_alarm_allDispose">全部处理</button>
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
                                    <th>序号</th>
                                    <th>车牌号码</th>
                                    <th>警情</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>操作</th>
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
                数据：<span class="js_alarm_total">0</span>&nbsp;条
            </div>
        </div>
    </div>
</div>