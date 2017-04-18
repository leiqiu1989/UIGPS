<div class="panel panel-transparent full">
    <div class="panel-body">
        <div class="row">
            <div class="col-sm-7">
                <div id="frmSeat" class="layui-form auto-label-width">
                    <div class="layui-form-item">
                        <label class="layui-form-label">编号</label>
                        <div class="layui-input-block">
                            <input type="text" disabled class="layui-input no-border" id="seatNo" />
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label required">姓名</label>
                        <div class="layui-input-block">
                            <input type="text" name="Name" maxlength="20" required class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label required">内网IP</label>
                        <div class="layui-input-block">
                            <input type="text" data-type="ipaddress" name="Ip" required class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">密码</label>
                        <div class="layui-input-block">
                            <input type="password" maxlength="20" name="Pwd" required class="layui-input" />
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <button class="layui-btn layui-btn-normal js_save">保 存</button>
                            <button class="layui-btn layui-btn-primary js_cancel">取 消</button>
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