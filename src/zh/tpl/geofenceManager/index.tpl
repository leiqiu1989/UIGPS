<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">区域管理</h3>
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
                    <label class="layui-form-label">围栏名称</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input" id="AreaName" name="AreaName" placeholder="" value="<%= searchValue.AreaName %>" />
                    </div>
                </div>
            </div>
            <div class="layui-form-item mt10">
                <div class="layui-inline">
                    <label class="layui-form-label">车辆</label>
                    <div class="layui-input-block">
                        <select id="selPlateNumber" name="selPlateNumber">
                            <option value="">请选择</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">状态</label>
                    <div class="layui-input-block">
                        <select id="selStatus" name="selStatus">
                            <option value="-1">全部</option>
                            <option value="1">打开</option>
                            <option value="0">关闭</option>
                        </select>
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
                                    <th>序号</th>
                                    <th>围栏名称</th>
                                    <th>车辆</th>
                                    <th>所属机构</th>
                                    <th>围栏地址</th>
                                    <th>围栏半径</th>
                                    <th>围栏警情</th>
                                    <th>状态</th>
                                    <th>备注</th>
                                    <th>操作</th>
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