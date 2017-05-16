<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">Service Due</h3>
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
                    <label class="layui-form-label">Device NO</label>
                    <div class="layui-input-block">
                        <select id="vehicleType" name="VehicleType">
						</select>
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
                    <label class="layui-form-label">Status</label>
                    <div class="layui-input-block">
                        <select>
                            <option value="0">All</option>
                            <option value="1">Normal</option>
                            <option value="2">Expiration</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label border-right">Expiration Time</label>
                    <div class="layui-input-inline w-150">
                        <span class="time-area" data-type="week">Week</span>
                        <span class="time-area" data-type="month">Month</span>
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
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>Device NO</th>
                                    <th>License</th>
                                    <th>Subordinate</th>
                                    <th>Expiration Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="serviceDueList" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
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