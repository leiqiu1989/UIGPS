<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">Invoice Management</h3>
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
                    <label class="layui-form-label">Device NO</label>
                    <div class="layui-input-block">
                        <select id="selDevice" name="selDevice">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">License</label>
                    <div class="layui-input-block">
                        <select id="selPlateNumber" name="selPlateNumber">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="layui-form-item mt10">
                <div class="layui-inline">
                    <label class="layui-form-label">Status</label>
                    <div class="layui-input-block">
                        <select id="selStatus" name="selStatus">
                            <option value="2">All</option>
                            <option value="1">Make Out an Invoice</option>
                            <option value="0">Not Invoiced</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label border-right">Consumption Time</label>
                    <div class="layui-input-inline w-150">
                        <span class="time-area" data-type="week">Week</span>
                        <span class="time-area" data-type="month">Month</span>
                        <span class="time-area active" data-type="custom">Custom</span>
                    </div>
                    <div class="layui-input-inline w-100">
                        <input type="text" id="startTime" name="startTime" value="<%= searchValue.StartTime %>" readonly autocomplete="off" class="layui-input" />
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline w-100">
                        <input type="text" id="endTime" name="endTime" value="<%= searchValue.EndTime %>" readonly autocomplete="off" class="layui-input">
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
        <a class="layui-btn layui-btn-small layui-btn-normal js_list_export">
            <i class="fa fa-export"></i> Export
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
                                    <th>Consumption Time</th>
                                    <th>Money</th>
                                    <th>Status</th>
                                    <th>Invoice Time</th>
                                    <th>Invoice Title</th>
                                    <th>Drawer</th>
                                    <th>Operation</th>
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