<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">报警报表</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">所属机构</label>
                    <div class="layui-input-block">
                        <input type="hidden" name="OnlyOrgNo" value="<%= searchValue.OnlyOrgNo %>" />
                        <input type="text" class="layui-input layui-input-text" name="orgName" placeholder="至少输入3个字符搜索" value="<%= searchValue.orgName%>" />
                        <ul class="ul-select hidden"></ul>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">车牌号码</label>
                    <div class="layui-input-block">
                        <select name="alarmStatus">
                            <option value="0">全部</option>
                            <option value="1">已处理</option>
                            <option value="2">未处理</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">设备编号</label>
                    <div class="layui-input-block">
                        <select name="alarmStatus">
                            <option value="0">全部</option>
                            <option value="1">已处理</option>
                            <option value="2">未处理</option>
						</select>
                    </div>
                </div>
            </div>
            <div class="layui-form-item mt10">
                <div class="layui-inline">
                    <label class="layui-form-label">报警类型</label>
                    <div class="layui-input-block">
                        <select name="alarmStatus">
                            <option value="0">全部</option>
                            <option value="1">已处理</option>
                            <option value="2">未处理</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">报警状态</label>
                    <div class="layui-input-block">
                        <select name="alarmStatus">
                            <option value="0">全部</option>
                            <option value="1">已处理</option>
                            <option value="2">未处理</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label border-right">时间</label>
                    <div class="layui-input-inline w-150">
                        <span class="time-area" data-type="week">本周</span>
                        <span class="time-area" data-type="month">本月</span>
                        <span class="time-area" data-type="custom" class="active">自定义</span>
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
                    <button class="layui-btn layui-btn-normal js_list_search">查 询</button>
                    <button class="layui-btn layui-btn-primary js_list_reset">重 置</button>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-toolbar">
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_export">
            <i class="fa fa-export"></i>
            导 出
        </button>
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_export">
            <i class="fa fa-export"></i>
            导出明细
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
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>车牌号码</th>
                                    <th>设备编号</th>
                                    <th>报警</th>
                                    <th>所属机构</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>最高速度(km/h)</th>
                                    <th>处理人</th>
                                    <th>处理时间</th>
                                    <th>处理方式</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="alarmReportList" class="grid-content">
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