<div class="panel panel-transparent no-margin full">
    <div class="panel-heading">
        <h3 class="panel-title">指定发送</h3>
    </div>
    <div class="panel-body pb0">
        <div class="row-container-left">
            <div class="panel panel-transparent no-margin">
                <div class="panel-body">
                    <form class="form-horizontal">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label required">回传间隔</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control w-200 pull-left" name="txtInterval" placeholder="单位：秒" />
                                        <a class="btn-basic-default relative t6 ml10 js-setInterval">设置</a>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label required">短消息</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" placeholder="最多只能输入50个字符" name="txtMessage" maxlength="50" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <a class="btn-basic-default js-setMessage">设 置</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row-container-right">
            <div id="vehicleTree" class="ztree" style="overflow-y:auto;width:300px;height:500px;"></div>
        </div>
    </div>
</div>