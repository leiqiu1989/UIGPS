<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">里程报表</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">所属机构</label>
                    <div class="layui-input-block">
                        <div class="layui-unselect layui-form-select js-Subordinate">
                            <div class="layui-select-title">
                                <input type="text" placeholder="请选择" id="txtSubordinate" value="<%= searchValue.SubordinateName %>" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                <i class="layui-edge"></i>
                            </div>
                            <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">车牌号码</label>
                    <div class="layui-input-block">
                        <select id="selPlateNumber" name="selPlateNumber">
                            <option value="">请选择</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label border-right">时间</label>
                    <div class="layui-input-inline w-150">
                        <span class="time-area" data-type="week">本周</span>
                        <span class="time-area" data-type="month">本月</span>
                        <span class="time-area active" data-type="custom">自定义</span>
                    </div>
                    <div class="layui-input-inline w-100">
                        <input type="text" id="startTime" name="startTime" value="<%= searchValue.STime %>" readonly autocomplete="off" class="layui-input" />
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline w-100">
                        <input type="text" id="endTime" name="endTime" value="<%= searchValue.ETime %>" readonly autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search">查 询</button>
                    <button class="layui-btn layui-btn-primary js_list_reset">重 置</button>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-toolbar">
        <a class="layui-btn layui-btn-small layui-btn-normal js_list_export">
            <i class="fa fa-export"></i> 导出
        </a>
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
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>车牌号码</th>
                                    <th>所属机构</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>行驶时长</th>
                                    <th>行驶里程(km)</th>
                                    <th>平均速度(km/h)</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="mileageReportList" class="grid-content">
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