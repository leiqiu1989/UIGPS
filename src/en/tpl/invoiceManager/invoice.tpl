<form id="frmInvoice" class="full overflow-y-auto">
    <div class="panel panel-transparent no-margin">
        <div class="panel-body">
            <div class="layui-form auto-label-width">
                <div class="panel panel-transparent">
                    <div class="panel-body">
                        <div class='row'>
                            <div class="layui-form auto-label-width">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">License</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input no-border" disabled value="<%= plateNo %>" type="text" />

                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Device NO</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input no-border" disabled value="<%= equipmentNo %>" type="text" />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Consumption Time</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input no-border" disabled value="<%= payTime %>" type="text" />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Money</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input no-border" disabled value="￥<%= fee %>" type="text" />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Invoice Title</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" maxlength="30" name="txtInvoiceTitle" type="text" />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <div class="layui-input-block">
                                        <button type="button" class="layui-btn layui-btn-normal js_Inovice">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>