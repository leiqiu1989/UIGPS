<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title" data-localize="UserManagement.User">组织用户</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label" data-localize="UserManagement.KeyWord">关键字</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-300" name="landMarkName" placeholder="组织名称、用户名、联系人、联系电话搜索" value="<%= searchValue.Condition %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label" data-localize="UserManagement.Subordinate">所属机构</label>
                    <div class="layui-input-block">
                        <input type="hidden" name="OnlyOrgNo" value="<%= searchValue.OnlyOrgNo %>" />
                        <input type="text" class="layui-input w-200" name="orgName" placeholder="至少输入3个字符搜索" value="<%= searchValue.orgName%>" />
                        <ul class="ul-select hidden"></ul>
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search" data-localize="button.Query">查 询</button>
                    <button class="layui-btn layui-btn-primary js_list_reset" data-localize="button.Reset">重 置</button>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-toolbar">
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_add">
            <i class="fa fa-plus"></i>
            <span data-localize="button.Add">新 增</span>
        </button>
    </div>
    <div class="panel-body grow no-padding">
        <div class="panel full no-margin flexbox">
            <div class="grid ">
                <div class="table-head ">
                    <div class="table-head-warp ">
                        <table class="grid-table ">
                            <colgroup>
                                <col width="50px" />
                                <col width="12%" />
                                <col width="15%" />
                                <col width="12%" />
                                <col width="12%" />
                                <col width="12%" />
                                <col width="24%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" name="checkAll" />
                                    </th>
                                    <th data-localize="UserManagement.OrganizationName">组织名称</th>
                                    <th data-localize="UserManagement.Subordinate">所属机构</th>
                                    <th data-localize="UserManagement.Administrator">管理员</th>
                                    <th data-localize="UserManagement.ContactPerson">联系人</th>
                                    <th data-localize="UserManagement.ContactNumber">联系电话</th>
                                    <th data-localize="UserManagement.UserName">用 户</th>
                                    <th data-localize="UserManagement.Operation">操 作</th>
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
                            <col width="50px" />
                            <col width="12%" />
                            <col width="15%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="24%" />
                            <col width="10%" />
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