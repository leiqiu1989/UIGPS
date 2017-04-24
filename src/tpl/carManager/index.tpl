<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title" data-localize="VehicleManagement.VechileInfo">车辆信息</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label" data-localize="VehicleManagement.Subordinate">所属机构</label>
                    <div class="layui-input-block">
                        <input type="hidden" name="OnlyOrgNo" value="<%= searchValue.OnlyOrgNo %>" />
                        <input type="text" class="layui-input w-200" name="orgName" placeholder="至少输入3个字符搜索" value="<%= searchValue.orgName%>" />
                        <ul class="ul-select hidden"></ul>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label" data-localize="VehicleManagement.KeyWord">关键字</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-300" name="Condition" placeholder="车牌、司机、SIM卡号、设备编号搜索" value="<%= searchValue.plateNumber %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label" data-localize="VehicleManagement.VehicleType">车辆类型</label>
                    <div class="layui-input-block">
                        <select id="vehicleType" name="VehicleType">
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search" data-localize="button.Query">查 询</button>
                    <button class="layui-btn layui-btn-primary js_list_reset" data-localize="button.Reset">重 置</button>
                </div>
            </div>
        </div>
    </div>
    <% if(addPermission){ %>
        <div class="panel-toolbar">
            <button class="layui-btn layui-btn-small layui-btn-normal js_list_add">
                <i class="fa fa-plus"></i>
                <span data-localize="button.Add">新 增</span>
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
                                        <col width="50px" />
                                        <col width="9%" />
                                        <col width="9%" />
                                        <col width="9%" />
                                        <col width="8%" />
                                        <col width="8%" />
                                        <col width="8%" />
                                        <col width="8%" />
                                        <col width="8%" />
                                        <col width="9%" />
                                        <col width="12%" />
                                        <col width="9%" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" name="checkAll" />
                                            </th>
                                            <th class="sortable string asc" data-sortfield="plateNumber" data-localize="VehicleManagement.LicensePlateNumber">车牌号码</th>
                                            <th data-localize="VehicleManagement.LicensePlateColor">车牌颜色</th>
                                            <th data-localize="VehicleManagement.Subordinate">所属机构</th>
                                            <th data-localize="VehicleManagement.GPSDeviceIMEI">GPS设备编号</th>
                                            <th data-localize="VehicleManagement.SIMCardNumber">SIM卡号码</th>
                                            <th data-localize="VehicleManagement.DriverName">司机姓名</th>
                                            <th data-localize="VehicleManagement.ContactNumber">联系电话</th>
                                            <th data-localize="VehicleManagement.VehicleType">车辆类型</th>
                                            <th data-localize="VehicleManagement.ExpirationTime">到期时间</th>
                                            <th data-localize="common.Remark">备注</th>
                                            <th data-localize="VehicleManagement.Operation">操 作</th>
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
                                    <col width="50px" />
                                    <col width="9%" />
                                    <col width="9%" />
                                    <col width="9%" />
                                    <col width="8%" />
                                    <col width="8%" />
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