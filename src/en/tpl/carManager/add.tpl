<form id="frmaddCar" class="full">
    <div class="panel panel-transparent no-margin">
        <div class="panel-heading">
            <h3 class="panel-title">
                <%= title ? title : 'Add Vehicle' %>
            </h3>
        </div>
        <div class="panel-body">
            <div class="layui-form auto-label-width">
                <div class="panel panel-transparent">
                    <div class="panel-heading">
                        <h3 class="panel-title"> <i class="fa fa-comment"></i>Vehicle Info.
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">License</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" maxlength="20" name="PlateNo" required type="text" value="<%= data.Vehicle.PlateNo%>" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Color</label>
                                    <div class="layui-input-block">
                                        <select name="Color" required>
									</select>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Vehicle Brand</label>
                                    <div class="layui-input-block">
                                        <select name="Brand"></select>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Vehicle Type</label>
                                    <div class="layui-input-block">
                                        <select required name="VehicleType"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Purchase Date</label>
                                    <div class="layui-input-block">
                                        <input type="text" value="<%= data.Vehicle.BuyDate%>" class="layui-input" name="BuyDate" readonly />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Time Zone</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Vehicle.Navigation%>" maxlength="20" name="Navigation" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Subordinate</label>
                                    <div class="layui-input-block">
                                        <input type="text" class="layui-input" value="<%= data.Vehicle.OrgName%>" required name="orgName" data-nosubmit="true" placeholder="please input at least 3 characters to search" />
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
                            <i class="fa fa-user-plus" aria-hidden="true"></i>Driver Info.
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Driver Name</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Driver.DriverName%>" required maxlength="10" name="DriverName" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">ID Card No.</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" data-type="idcard" value="<%= data.Driver.IDCard%>" required maxlength="20" name="IDCard" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Contact Number</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" data-type="tel" value="<%= data.Driver.PhoneNo%>" required maxlength="20" name="PhoneNo" data-type="tel" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label ellipsis" title="Emergency Contact Number">Emergency Contact Number</label>
                                    <div class="layui-input-block">
                                        <input type="text" data-type="tel" value="<%= data.Driver.UrgencyContactPhone%>" class="layui-input" maxlength="20" name="UrgencyContactPhone" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Family Address</label>
                                    <div class="layui-input-block">
                                        <textarea placeholder="Please input Family Address" maxlength="50" name="HomeAddress" class="layui-textarea">
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
                            <i class="fa fa-wifi" aria-hidden="true"></i> GPS Info.
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Device IMEI</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Equipment.EquipmentNo%>" required name="EquipmentNo" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Device Type</label>
                                    <div class="layui-input-block">
                                        <select name="EquipmentTypeId" required>
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Device Name</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Equipment.DeviceName%>" maxlength="10" name="DeviceName" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required ellipsis" title="SIM Card Number">SIM Card Number</label>
                                    <div class="layui-input-block">
                                        <input type="text" maxlength="20" value="<%= data.Simcard.SimCardNo%>" class="layui-input" name="SimCardNo" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Service Time</label>
                                    <div class="layui-input-block">
                                        <input type="text" value="<%= data.Simcard.STime%>" class="layui-input" readonly name="STime" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Expiration Time</label>
                                    <div class="layui-input-block">
                                        <input type="text" value="<%= data.Simcard.ETime%>" class="layui-input" readonly name="ETime" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class='col-sm-6'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Remark</label>
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
                                        <button type="button" class="layui-btn layui-btn-normal js_add_save">Save</button>
                                        <button type="button" class="layui-btn layui-btn-primary js_add_cancel">Cancel</button>
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