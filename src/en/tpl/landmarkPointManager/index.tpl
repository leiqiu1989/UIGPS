<div class="panel panel-transparent flexbox full">
    <div class="panel-heading">
        <h3 class="panel-title">Punctuation Management</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width layui-form-inline">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">Punctuation Name</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" name="landMarkName" placeholder="" value="<%= searchValue.landMarkName %>" />
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
                                    <th>Punctuation Name</th>
                                    <th>Longitude</th>
                                    <th>Latitude</th>
                                    <th>Remark</th>
                                    <th>Operation</th>
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