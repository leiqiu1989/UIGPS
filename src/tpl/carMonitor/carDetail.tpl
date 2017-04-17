<div class="p15">
    <fieldset class="layui-elem-field layui-field-title">
        <legend>基本信息</legend>
    </fieldset>
    <div class="layui-form">
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">车牌号码</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.PlateNo %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">车牌颜色</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.ColorString %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">车辆品牌</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.BrandString %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">车辆类型</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.VehicleTypeString %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">购车日期</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Vehicle.BuyDate %>" />
                </div>
            </div>
        </div>

    </div>
    <fieldset class="layui-elem-field layui-field-title">
        <legend>司机信息</legend>
    </fieldset>
    <div class="layui-form">
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">司机姓名</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.DriverName %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">联系电话</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.PhoneNo %>" />
                </div>
            </div>
        </div>

        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">紧急电话</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.UrgencyContactPhone %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">身份证</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.IDCard %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">家庭住址</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Driver.HomeAddress %>" />
            </div>
        </div>

    </div>
    <fieldset class="layui-elem-field layui-field-title">
        <legend>GPS设备信息</legend>
    </fieldset>
    <div class="layui-form">
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">设备编号</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Equipment.EquipmentNo %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">设备类型</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Equipment.EquipmentType %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">设备名称</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Equipment.DeviceName %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">SIM卡号</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Simcard.SimCardNo %>" />
                </div>
            </div>
        </div>
        <div class="layui-form-row clearfix">
            <div class="layui-form-item">
                <label class="layui-form-label">入网时间</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Simcard.STime %>" />
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">到期时间</label>
                <div class="layui-input-block">
                    <input type="text" autocomplete="off" class="layui-input no-border" disabled value="<%= data.Simcard.ETime %>" />
                </div>
            </div>
        </div>
    </div>
</div>