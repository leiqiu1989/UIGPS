<div class="panel panel-transparent full">
    <div class="panel-body">
        <div class="row">
            <div class="col-sm-7">
                <div id="frmaddRole" class="layui-form auto-label-width">
                    <div class="layui-form-item">
                        <label class="layui-form-label required">Role Name</label>
                        <div class="layui-input-block">
                            <input type="text" name="RoleName" maxlength="50" required class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">Remark</label>
                        <div class="layui-input-block">
                            <textarea placeholder="Please input something" name="Remark" class="layui-textarea"></textarea>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <button class="layui-btn layui-btn-normal js_add_save">Save</button>
                            <button class="layui-btn layui-btn-primary js_add_cancel">Cancel</button>
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