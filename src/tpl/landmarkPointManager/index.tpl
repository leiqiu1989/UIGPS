<div class="panel panel-transparent flexbox full">
    <div class="panel-heading">
        <h3 class="panel-title">地标点管理</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">地标名称</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" name="landMarkName" placeholder="请输入地标名称" value="<%= searchValue.landMarkName %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search">查 询</button>
                    <button class="layui-btn layui-btn-primary js_list_reset">重置</button>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-toolbar">
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_add">
            <i class="fa fa-plus"></i>
            新增
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
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="20%" />
                                <col width="17%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th class="align-center">
                                        <input type="checkbox" name="checkAll" />
                                    </th>
                                    <th>地标名称</th>
                                    <th>经度</th>
                                    <th>维度</th>
                                    <th>备注</th>
                                    <th>操 作</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="landMarkPontList" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col width="50px" />
                            <col width="20%" />
                            <col width="20%" />
                            <col width="20%" />
                            <col width="20%" />
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