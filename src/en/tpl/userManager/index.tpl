<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">User</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">Key Word</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-400" name="landMarkName" placeholder="Search by organization name, user, contact, phone number" value="<%= searchValue.Condition %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">Subordinate</label>
                    <div class="layui-input-block">
                        <input type="hidden" name="OnlyOrgNo" value="<%= searchValue.OnlyOrgNo %>" />
                        <input type="text" class="layui-input w-300" name="orgName" placeholder="please input at least 3 characters to search" value="<%= searchValue.orgName%>" />
                        <ul class="ul-select hidden"></ul>
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
                                    <th>Organization Name</th>
                                    <th>Subordinate</th>
                                    <th>Administrator</th>
                                    <th>Contact Person</th>
                                    <th>Contact Number</th>
                                    <th>User</th>
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