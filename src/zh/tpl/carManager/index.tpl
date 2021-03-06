<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">车辆信息</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">所属机构</label>
                    <div class="layui-input-block">
                        <div class="layui-unselect layui-form-select js-Subordinate">
                            <div class="layui-select-title">
                                <input type="text" placeholder="请选择" id="txtSubordinate" value="<%= searchValue.orgName %>" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                <i class="layui-edge"></i>
                            </div>
                            <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">关键字</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-300" name="Condition" placeholder="车牌、司机、SIM卡号、设备编号搜索" value="<%= searchValue.plateNumber %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">车辆类型</label>
                    <div class="layui-input-block">
                        <select id="vehicleType" name="VehicleType">
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search">查 询</button>
                    <button class="layui-btn layui-btn-primary js_list_reset">重 置</button>
                </div>
            </div>
        </div>
    </div>
    <% if(addPermission){ %>
        <div class="panel-toolbar">
            <button class="layui-btn layui-btn-small layui-btn-normal js_list_add">
                <i class="fa fa-plus"></i>
                新 增
            </button>
        </div>
        <% } %>
            <div class="panel-body no-padding grow">
                <div class="panel full no-margin flexbox">
                    <div class="grid ">
                        <div class="table-head ">
                            <div class="table-head-warp ">
                                <table class="grid-table ">
                                    <colgroup>
                                        <col width="9%" />
                                        <col width="9%" />
                                        <col width="9%" />
                                        <col />
                                        <col />
                                        <col width="8%" />
                                        <col width="8%" />
                                        <col width="8%" />
                                        <col width="9%" />
                                        <col width="12%" />
                                        <col width="9%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="sortable string asc" data-sortfield="plateNumber">车牌号码</th>
                                            <th>车牌颜色</th>
                                            <th>所属机构</th>
                                            <th>GPS设备编号</th>
                                            <th>SIM卡号码</th>
                                            <th>司机姓名</th>
                                            <th>联系电话</th>
                                            <th>车辆类型</th>
                                            <th>到期时间</th>
                                            <th>备注</th>
                                            <th>操 作</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body no-padding grow ">
                        <div id="carList" class="grid-content">
                            <table class="grid-table ">
                                <colgroup>
                                    <col width="9%" />
                                    <col width="9%" />
                                    <col width="9%" />
                                    <col />
                                    <col />
                                    <col width="8%" />
                                    <col width="8%" />
                                    <col width="8%" />
                                    <col width="9%" />
                                    <col width="12%" />
                                    <col width="9%" />
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