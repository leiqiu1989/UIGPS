<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">User Management</h3>
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
                    <label class="layui-form-label">User</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-400" id="txtUserName" name="txtUserName" value="<%= searchValue.UserName %>" />
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
    </div>
    <div class="panel-body grow no-padding">
        <div class="panel full no-margin flexbox">
            <div class="grid ">
                <div class="table-head ">
                    <div class="table-head-warp ">
                        <table class="grid-table ">
                            <colgroup>
                                <col width="12%" />
                                <col width="15%" />
                                <col width="12%" />
                                <col width="12%" />
                                <col width="12%" />
                                <col width="20%" />
                                <col width="14%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Subordinate</th>
                                    <th>Real Name</th>
                                    <th>Contact Number</th>
                                    <th>Role</th>
                                    <th>Remark</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="userManagerList" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col width="12%" />
                            <col width="15%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="20%" />
                            <col width="14%" />
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