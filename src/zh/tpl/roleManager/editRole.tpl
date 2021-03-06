<div class="panel panel-transparent full">
    <div class="panel-body">
        <div class="row">
            <div class="col-sm-7">
                <div id="frmaddRole" class="layui-form auto-label-width">
                    <div class="layui-form-item">
                        <label class="layui-form-label required">角色名称</label>
                        <div class="layui-input-block">
                            <input type="text" name="RoleName" maxlength="50" required class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">备 注</label>
                        <div class="layui-input-block">
                            <textarea placeholder="请输入内容" name="Remark" class="layui-textarea"></textarea>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <button class="layui-btn layui-btn-normal js_add_save">保 存</button>
                            <button class="layui-btn layui-btn-primary js_add_cancel">取 消</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-5">
                <div id="vehicleTree" class="ztree" style="overflow:auto;width:300px;height:320px;"></div>
            </div>
        </div>
    </div>
</div>