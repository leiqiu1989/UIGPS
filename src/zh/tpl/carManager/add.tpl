<form id="frmaddCar" class="full">
    <div class="panel panel-transparent no-margin">
        <div class="panel-heading">
            <h3 class="panel-title">
                <%= title ? title : '新增车辆' %>
            </h3>
        </div>
        <div class="panel-body">
            <div class="layui-form auto-label-width">
                <div class="panel panel-transparent">
                    <div class="panel-heading">
                        <h3 class="panel-title"> <i class="fa fa-comment"></i>车辆资料
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">车牌号码</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" maxlength="20" name="PlateNo" required type="text" value="<%= data.Vehicle.PlateNo%>" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">车牌颜色</label>
                                    <div class="layui-input-block">
                                        <select name="Color" required>
									</select>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">车辆品牌</label>
                                    <div class="layui-input-block">
                                        <select name="Brand"></select>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">车辆类型</label>
                                    <div class="layui-input-block">
                                        <select required name="VehicleType"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">购车日期</label>
                                    <div class="layui-input-block">
                                        <input type="text" value="<%= data.Vehicle.BuyDate%>" class="layui-input" name="BuyDate" readonly />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">导航屏</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Vehicle.Navigation%>" maxlength="20" name="Navigation" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">所属机构</label>
                                    <div class="layui-input-block">
                                        <input type="text" class="layui-input" value="<%= data.Vehicle.OrgName%>" required name="orgName" data-nosubmit="true" placeholder="至少输入3个字符搜索" />
                                        <input type="hidden" name="OnlyOrgNo" value="<%= data.Vehicle.OrgNo%>" />
                                        <ul class="ul-select hidden"></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="driveInfo" class="panel panel-transparent">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            <i class="fa fa-user-plus" aria-hidden="true"></i>司机资料
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">司机姓名</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Driver.DriverName%>" required maxlength="10" name="DriverName" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">身份证号码</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" data-type="idcard" value="<%= data.Driver.IDCard%>" required maxlength="20" name="IDCard" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">联系电话</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" data-type="tel" value="<%= data.Driver.PhoneNo%>" required maxlength="20" name="PhoneNo" data-type="tel" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">紧急联系电话</label>
                                    <div class="layui-input-block">
                                        <input type="text" data-type="tel" value="<%= data.Driver.UrgencyContactPhone%>" class="layui-input" maxlength="20" name="UrgencyContactPhone" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">家庭住址</label>
                                    <div class="layui-input-block">
                                        <textarea placeholder="请输入家庭住址" maxlength="50" name="HomeAddress" class="layui-textarea">
										<%= data.Driver.HomeAddress%>
									</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            <i class="fa fa-wifi" aria-hidden="true"></i> GPS设备资料
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">设备编号</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Equipment.EquipmentNo%>" required name="EquipmentNo" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">设备类型</label>
                                    <div class="layui-input-block">
                                        <select name="EquipmentTypeId" required>
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">设备名称</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Equipment.DeviceName%>" maxlength="10" name="DeviceName" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">SIM卡号码</label>
                                    <div class="layui-input-block">
                                        <input type="text" maxlength="20" value="<%= data.Simcard.SimCardNo%>" class="layui-input" name="SimCardNo" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">入网时间</label>
                                    <div class="layui-input-block">
                                        <input type="text" value="<%= data.Simcard.STime%>" class="layui-input" readonly name="STime" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">到期时间</label>
                                    <div class="layui-input-block">
                                        <input type="text" value="<%= data.Simcard.ETime%>" class="layui-input" readonly name="ETime" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class='col-sm-6'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">备注</label>
                                    <div class="layui-input-block">
                                        <textarea placeholder="" maxlength="100" name="Remark" class="layui-textarea">
										<%= data.Vehicle.Remark%>
									</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="layui-form-item">
                                    <div class="layui-input-block">
                                        <button type="button" class="layui-btn layui-btn-normal js_add_save">保 存</button>
                                        <button type="button" class="layui-btn layui-btn-primary js_add_cancel">取 消</button>
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