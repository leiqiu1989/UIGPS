<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">角色信息</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">角色名称</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" name="RoleName" placeholder="请输入角色名称" value="<%= searchValue.RoleName %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_search">查 询</button>
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
    <div class="panel-body no-padding grow">
        <div class="panel full no-margin flexbox">
            <div class="grid ">
                <div class="table-head ">
                    <div class="table-head-warp ">
                        <table class="grid-table ">
                            <colgroup>
                                <col width="50px" />
                                <col width="25%" />
                                <col width="25%" />
                                <col width="30%" />
                                <col width="17%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" name="checkAll" />
                                    </th>
                                    <th>角色名称</th>
                                    <th>更新时间</th>
                                    <th>备注</th>
                                    <th>操 作</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="rolelist" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col width="50px" />
                            <col width="25%" />
                            <col width="25%" />
                            <col width="30%" />
                            <col width="17%" />
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