<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">Geofence Management</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">Subordinate</label>
                    <div class="layui-input-block">
                        <div class="layui-unselect layui-form-select js-Subordinate">
                            <div class="layui-select-title">
                                <input type="text" placeholder="Select" id="txtSubordinate" value="<%= searchValue.SubordinateName %>" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                <i class="layui-edge"></i>
                            </div>
                            <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">Geofence Name</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" id="AreaName" name="AreaName" placeholder="" value="<%= searchValue.AreaName %>" />
                    </div>
                </div>
            </div>
            <div class="layui-form-item mt10">
                <div class="layui-inline">
                    <label class="layui-form-label">License</label>
                    <div class="layui-input-block">
                        <select id="selPlateNumber" name="selPlateNumber">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">Status</label>
                    <div class="layui-input-block">
                        <select id="selStatus" name="selStatus">
                            <option value="-1">All</option>
                            <option value="1">Open</option>
                            <option value="0">Close</option>
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
    <div class="panel-toolbar">
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_add">
            <i class="fa fa-plus"></i>
            Add
        </button>
        <!--<button class="layui-btn layui-btn-small layui-btn-normal js_list_export">
            <i class="fa fa-export"></i>
            Export
        </button>-->
    </div>
    <div class="panel-body no-padding grow">
        <div class="panel full no-margin flexbox">
            <div class="grid ">
                <div class="table-head ">
                    <div class="table-head-warp ">
                        <table class="grid-table ">
                            <colgroup>
                                <col width="60px" />
                                <col />
                                <col width="120px" />
                                <col width="120px" />
                                <col />
                                <col width="140px" />
                                <col width="140px" />
                                <col width="100px" />
                                <col />
                                <col width="170px" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>Geofence Name</th>
                                    <th>Vehicle</th>
                                    <th>Subordinate</th>
                                    <th>Geofence Location</th>
                                    <th>Geofence Radius</th>
                                    <th>Geofence Alarm</th>
                                    <th>Status</th>
                                    <th>Remark</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="geofenceManagerList" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col width="60px" />
                            <col />
                            <col width="120px" />
                            <col width="120px" />
                            <col />
                            <col width="140px" />
                            <col width="140px" />
                            <col width="100px" />
                            <col />
                            <col width="170px" />
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