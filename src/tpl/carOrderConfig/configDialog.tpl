<form id="js_configDialog_form" class="form-horizontal form-horizontal-lg form-horizontal-patch w-500 p15">
    <div class='form-group col-sm-12'>
        <label class="control-label">可接订单类型</label>
        <div class="checkbox">
			<label><input type="checkbox" <%= data.WxFlag==1?'checked=checked':''%>  name="WxFlag">微信订单</label>
			<label><input type="checkbox" <%= data.PositionFlag==1?'checked=checked':''%>  name="PositionFlag">位置订单</label>
			<label><input type="checkbox" <%= data.VoiceFlag==1?'checked=checked':''%> name="VoiceFlag">语音订单</label>
			<label><input type="checkbox" <%= data.ControlFlag==1?'checked=checked':''%>  name="ControlFlag">调度屏信息</label>
		</div>
    </div>
    <div class='form-group col-sm-12'>
        <label class="control-label">备注</label>
        <div>
           <textarea class="form-control" placeholder="允许填写50字以内" maxlength="50" rows="3" id="_remark">
           <%= data.SettingRemark%></textarea>
        </div>        
    </div>
    <div class="form-group no-margin">
        <div class="col-sm-offset-3 col-sm-9">
            <a class="btn btn-primary mr10" id="btnOK">
                <i class="fa fa-check"></i>
                保 存
            </a>
            <a class="btn btn-default" id="btnCancel">
                <i class="fa fa-ban"></i>
                取 消
            </a>
        </div>
    </div>
</form>
