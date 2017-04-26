<div class="p15">
    <fieldset class="layui-elem-field layui-field-title">
        <legend>Base Info.</legend>
    </fieldset>
    <div class="layui-form auto-label-width">
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">License</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.PlateNo %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">Color</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.ColorString %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">Vehicle Brand</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.BrandString %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">Vehicle Type</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.VehicleTypeString %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">Purchase Date</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.BuyDate %>" />
                </div>
            </div>
        </div>

    </div>
    <fieldset class="layui-elem-field layui-field-title">
        <legend>司机信息</legend>
    </fieldset>
    <div class="layui-form auto-label-width">
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">Driver Name</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.DriverName %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">Contact Number</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.PhoneNo %>" />
                </div>
            </div>
        </div>

        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">Emergency Contact Number</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.UrgencyContactPhone %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">ID Card NO.</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.IDCard %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Family Address</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.HomeAddress %>" />
            </div>
        </div>

    </div>
    <fieldset class="layui-elem-field layui-field-title">
        <legend>GPS设备信息</legend>
    </fieldset>
    <div class="layui-form auto-label-width">
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">Device NO.</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Equipment.EquipmentNo %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">Device Type</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Equipment.EquipmentType %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">Device Name</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Equipment.DeviceName %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">SIM Card NO.</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Simcard.SimCardNo %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">Service Time</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Simcard.STime %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">Expiration Time</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Simcard.ETime %>" />
                </div>
            </div>
        </div>
    </div>
</div>