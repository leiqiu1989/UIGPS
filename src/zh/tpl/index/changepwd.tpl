<form id="frmChangePwd" class="form-horizontal form-horizontal-lg form-horizontal-patch w-500 p15">
    <div class='form-group'>
        <label class="col-sm-3 control-label required">旧密码</label>
        <div class="col-sm-9">
            <input type="password" class="form-control" name="oldpwd" required />
        </div>
    </div>
    <div class='form-group'>
        <label class="col-sm-3 control-label required">新密码</label>
        <div class="col-sm-9">
            <input type="password" class="form-control" name="newpwd" id="newpwd" maxlength="16" required data-type='letternum' />
        </div>        
    </div>
    <div class='form-group'>
        <label class="col-sm-3 control-label required">确认密码</label>
        <div class="col-sm-9">
            <input type="password" class="form-control" name="confirmpwd" maxlength="16" equals="newpwd" required data-type='letternum' />
        </div>        
    </div>
    <div class="form-group no-margin">
        <div class="col-sm-offset-3 col-sm-9">
            <a class="btn-basic-default mr10" id="btnOK">确 定</a>
            <a class="btn-basic-default" id="btnCancel">取 消</a>
        </div>
    </div>
</form>
