<div class="panel panel-transparent full">
    <div class="panel-heading">
        <h3 class="panel-title">Commands Sent</h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <div class="col-sm-4">
                <div class="p15">
                    <div class="layui-form auto-label-width">
                        <div class="layui-form-row clearfix">
                            <div class="layui-form-item">
                                <label class="layui-form-label required">Return interval</label>
                                <div class="layui-input-block">
                                    <input type="text" autocomplete="off" class="layui-input" name="txtInterval" placeholder="unit:second" />
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label"></label>
                            <div class="layui-input-block">
                                <button class="layui-btn layui-btn-small layui-btn-normal js-setInterval">Setting</button>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label required">Short message</label>
                            <div class="layui-input-block">
                                <textarea placeholder="You can only enter a maximum of 50 characters" maxlength="50" name="txtMessage" class="layui-textarea"></textarea>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label"></label>
                            <div class="layui-input-block">
                                <button class="layui-btn layui-btn-small layui-btn-normal js-setMessage">Setting</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div id="vehicleTree" class="ztree" style="overflow:auto;width:300px;height:500px;"></div>
            </div>
        </div>
    </div>
</div>