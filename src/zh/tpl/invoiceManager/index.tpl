<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">发票管理</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">所属机构</label>
                    <div class="layui-input-block">
                        <input type="hidden" name="OnlyOrgNo" value="<%= searchValue.OnlyOrgNo %>" />
                        <input type="text" class="layui-input w-200" name="orgName" placeholder="至少输入3个字符搜索" value="<%= searchValue.orgName%>" />
                        <ul class="ul-select hidden"></ul>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">设备编号</label>
                    <div class="layui-input-block">
                        <select id="vehicleType" name="VehicleType">
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">车牌号码</label>
                    <div class="layui-input-block">
                        <select id="vehicleType" name="VehicleType">
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">状态</label>
                    <div class="layui-input-block">
                        <select>
                            <option value="0">全部</option>
                            <option value="1">正常</option>
                            <option value="2">已过期</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label border-right">消费时间</label>
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
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_invoice">
            <i class="fa fa-export"></i>
            开 票
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
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>设备编号</th>
                                    <th>车牌号码</th>
                                    <th>所属机构</th>
                                    <th>消费时间</th>
                                    <th>金额</th>
                                    <th>状态</th>
                                    <th>开票时间</th>
                                    <th>发票抬头</th>
                                    <th>开票人</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="invoiceManagerList" class="grid-content">
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