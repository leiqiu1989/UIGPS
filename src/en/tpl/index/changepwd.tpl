<form id="frmChangePwd" class="form-horizontal form-horizontal-lg form-horizontal-patch w-500 p15">
    <div class='form-group'>
        <label class="col-sm-3 control-label required">Old Password</label>
        <div class="col-sm-9">
            <input type="password" class="form-control" name="oldpwd" required />
        </div>
    </div>
    <div class='form-group'>
        <label class="col-sm-3 control-label required">NewPassword</label>
        <div class="col-sm-9">
            <input type="password" class="form-control" name="newpwd" id="newpwd" maxlength="16" required data-type='letternum' />
        </div>        
    </div>
    <div class='form-group'>
        <label class="col-sm-3 control-label required">Confirm Password</label>
        <div class="col-sm-9">
            <input type="password" class="form-control" name="confirmpwd" maxlength="16" equals="newpwd" required data-type='letternum' />
        </div>        
    </div>
    <div class="form-group no-margin">
        <div class="col-sm-offset-3 col-sm-9">
            <a class="btn-basic-default mr10" id="btnOK">OK</a>
            <a class="btn-basic-default" id="btnCancel">Cancel</a>
        </div>
    </div>
</form>
