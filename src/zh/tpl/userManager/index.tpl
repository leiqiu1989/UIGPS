<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">用户管理</h3>
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
                    <label class="layui-form-label">用户</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-400" id="txtUserName" name="txtUserName" value="<%= searchValue.UserName %>" />
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
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_add">
            <i class="fa fa-plus"></i>
            新 增
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
                                    <th>用户名</th>
                                    <th>所属机构</th>
                                    <th>真实姓名</th>
                                    <th>联系电话</th>
                                    <th>角色</th>
                                    <th>备注</th>
                                    <th>操作</th>
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