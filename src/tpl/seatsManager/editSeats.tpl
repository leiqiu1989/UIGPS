<div  class="full" style="width:700px;height:400px;">
    <div class="row-container full">
        <div class="row-container-left">
            <div class="panel-body">
            <form id="frmSeat">
            <!-- //用于阻止 chrome表单自动填充的占位符 -->
            <input class='hide' type="text" />
            <input class='hide' type="password" />
            <!-- //用于阻止 chrome表单自动填充的占位符 -->
                <div class="panel panel-transparent">
                    <div class="panel-body">
                        <div class='row'>
                            <div class='form-group'>
                                <label>编号：</label>
                                <label class="form-control" id="js_editSeats_no"></label>
                            </div>
                            <div class='form-group'>
                                <label for="vehicle_Brand" class="required">姓 名</label>
                                <input type="text" autocomplete="off" name="Name" maxlength="20" required class="form-control" />
                            </div>
                            <div class='form-group'>
                                <label for="truck_Type" class="required">内网IP</label>
                                <input type="text" autocomplete="off" data-type="ipaddress" name="Ip" required class="form-control" />
                            </div>
                            <div class='form-group'>
                                <label for="truck_Type" class="required">密 码</label>
                                <input type="password" autocomplete="off"  maxlength="20" name="Pwd" required class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer panel-footer-patch">
                        <a class="btn btn-primary mr10 js_save">
                            <i class="fa fa-check"></i>
                            保 存
                        </a>
                        <a class="btn btn-default js_cancel">
                            <i class="fa fa-ban"></i>
                            取 消
                        </a>
                    </div>  
                </div>
                </form>
            </div>
        </div>
        <div class="row-container-right">
            <div id="vehicleTree" class="ztree" style="overflow:auto;width:300px;height:320px;"></div>
        </div>
    </div>
</div>