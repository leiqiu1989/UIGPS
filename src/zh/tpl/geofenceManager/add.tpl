<div class="panel panel-transparent no-margin full">
    <div class="panel-heading">
        <h3 class="panel-title">
            新增围栏
        </h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <div class="col-sm-4">
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            基础信息
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div id="frmGeofenceAdd" class="layui-form auto-label-width">
                            <div class="layui-form-item">
                                <label class="layui-form-label required">围栏名称</label>
                                <div class="layui-input-block">
                                    <input type="text" autocomplete="off" required class="layui-input" maxlength="20" />
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">围栏半径</label>
                                <div class="layui-input-block">
                                    <select id="vehicleType" name="VehicleType">
                                        <option value="200">200米</option>
                                        <option value="500">500米</option>
                                        <option value="1000">1000米</option>
                                        <option value="1500">1500米</option>
                                        <option value="2000">2000米</option>
                                        <option value="3000">3000米</option>
						            </select>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">所属机构</label>
                                <div class="layui-input-block">
                                    <div class="layui-unselect layui-form-select js-Subordinate">
                                        <div class="layui-select-title">
                                            <input type="text" placeholder="Select" id="txtSubordinate" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                            <i class="layui-edge"></i>
                                        </div>
                                        <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">车辆</label>
                                <div class="layui-input-block">
                                    <select id="selPlateNumber" name="selPlateNumber">
                                        <option value="">请选择</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">围栏警情</label>
                                <div class="layui-input-block">
                                    <input type="checkbox" title="进围栏" lay-skin="primary" />
                                    <input type="checkbox" title="出围栏" lay-skin="primary" />
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-block">
                                    <select id="status" name="status">
                                        <option value="1">打开</option>
                                        <option value="2">关闭</option>
						            </select>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">备注</label>
                                <div class="layui-input-block">
                                    <textarea placeholder="请输入内容" class="layui-textarea"></textarea>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-block">
                                    <button type="button" class="layui-btn layui-btn-normal js_geofence_save">保 存</button>
                                    <button type="button" class="layui-btn layui-btn-primary js_geofence_cancel">取 消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="mapToolbar">
                    <input type="text" class="mapText" name="searchTxt" placeholder="输入地址定位" />
                    <a href="javascript:" class="mapBtn mapBtnText js_mark_point_clear">清除标注</a>
                    <a href="javascript:" class="mapBtn mapBtnText js_mark_point">标注地标点</a>
                    <a href="javascript:" class="mapBtn mapBtnSearch js_search_map"></a>
                </div>
                <div id="geofenceMap" style="width:100%;height:600px;"></div>
            </div>
        </div>
    </div>
</div>