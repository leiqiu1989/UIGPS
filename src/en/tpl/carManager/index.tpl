<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">Vehicle Info</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">Subordinate</label>
                    <div class="layui-input-block">
                        <div class="layui-unselect layui-form-select js-Subordinate">
                            <div class="layui-select-title">
                                <input type="text" placeholder="Select" id="txtSubordinate" value="<%= searchValue.orgName %>" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                <i class="layui-edge"></i>
                            </div>
                            <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">Key Word</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-300" name="Condition" placeholder="Search by organization name, user, contact, phone number" value="<%= searchValue.plateNumber %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">Vehicle Type</label>
                    <div class="layui-input-block">
                        <select id="vehicleType" name="VehicleType">
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search">Query</button>
                    <button class="layui-btn layui-btn-primary js_list_reset">Reset</button>
                </div>
            </div>
        </div>
    </div>
    <% if(addPermission){ %>
        <div class="panel-toolbar">
            <button class="layui-btn layui-btn-small layui-btn-normal js_list_add">
                <i class="fa fa-plus"></i>
                Add
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
                                        <col width="7%" />
                                        <col width="7%" />
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
                                            <th class="sortable string asc" data-sortfield="plateNumber">License</th>
                                            <th>Color</th>
                                            <th>Subordinate</th>
                                            <th>GPS Device NO.</th>
                                            <th>SIM Card NO.</th>
                                            <th>Driver Name</th>
                                            <th>Contact Number</th>
                                            <th>Vehicle Type</th>
                                            <th>Expiration Time</th>
                                            <th>Remark</th>
                                            <th>Operation</th>
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
                                    <col width="7%" />
                                    <col width="7%" />
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