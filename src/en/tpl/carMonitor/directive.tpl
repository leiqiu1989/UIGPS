<div class="p15">
    <div class="layui-form auto-label-width">
        <div class="layui-form-item">
            <label class="layui-form-label">Mileage Setting</label>
            <div class="layui-input-inline">
                <input type="text" autocomplete="off" class="layui-input" name="txtMilage" value="<%= data.Mileage %>" />
            </div>
            <div class="layui-input-inline">
                <button class="layui-btn layui-btn-normal js-setMilage">Setting</button>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label"></label>
            <div class="layui-input-block">
                The setting is only effective when the vehicle is in idle state,unit:km
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label ellipsis" title="Shock Sensitivity Setting">Shock Sensitivity Setting</label>
            <div class="layui-input-inline">
                <select name="sensitivity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="layui-input-inline">
                <button class="layui-btn layui-btn-normal js-sensitivity">Setting</button>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label"></label>
            <div class="layui-input-block">
                Sensitivity level 1-5, 1 is the highest sensitivity level.
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label ellipsis" title="Overspeed Value Setting">Overspeed Value Setting</label>
            <div class="layui-input-inline">
                <input type="text" autocomplete="off" class="layui-input" name="txtSpeeding" value="<%= data.MaxSpeed %>" />
            </div>
            <div class="layui-input-inline">
                <button class="layui-btn layui-btn-normal js-speeding">Setting</button>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label"></label>
            <div class="layui-input-block">
                Unit:km/h,Less than 150km/h,More than 40km/h
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Vehicle Safety</label>
            <div class="layui-input-block layui-input-block-button">
                <button class="layui-btn layui-btn-normal js-arm" data-enable="1">Arm</button>
                <button class="layui-btn layui-btn-normal js-arm" data-enable="0">Disarm</button>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Fuel Control</label>
            <div class="layui-input-block layui-input-block-button">
                <button class="layui-btn layui-btn-normal js-fuel" data-enable="0">Fuel Cut</button>
                <button class="layui-btn layui-btn-normal js-fuel" data-enable="1">Fuel Recovery</button>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">Geofence</label>
            <div class="layui-input-block layui-input-block-button">
                <button class="layui-btn layui-btn-normal js-fence" data-enable="1">Open</button>
                <button class="layui-btn layui-btn-normal js-fence" data-enable="0">Close</button>
            </div>
        </div>
    </div>
    <fieldset class="layui-elem-field layui-field-title">
        <legend>Alarm Center Number Setting</legend>
    </fieldset>
    <div id="setAlarmPhone" class="layui-form auto-label-width">
        <% 
            var noticeCenterLen= data.NoticeCenter.length;
            var count = 5 - noticeCenterLen;
            if ( noticeCenterLen > 0 ) { 
                for(var i=0;i< noticeCenterLen; i++){
                    var item = data.NoticeCenter[i];
         %>
            <div class="layui-form-row" keyId="<%= item.KeyId %>">
                <div class="layui-form-item">
                    <label class="layui-form-label">Name</label>
                    <div class="layui-input-block">
                        <input type="text" autocomplete="off" class="layui-input" value="<%= item.FullName %>" name="FullName" />
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">Phone Number</label>
                    <div class="layui-input-block">
                        <input type="text" autocomplete="off" class="layui-input" value="<%= item.Phone %>" name="Phone" />
                    </div>
                </div>
            </div>
            <% } }%>
                <% 
                if ( count > 0 ) { 
                    for(var i=0;i< count; i++){
            %>
                    <div class="layui-form-row" keyId="0">
                        <div class="layui-form-item">
                            <label class="layui-form-label">Name</label>
                            <div class="layui-input-block">
                                <input type="text" autocomplete="off" class="layui-input" name="FullName" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">Phone Number</label>
                            <div class="layui-input-block">
                                <input type="text" autocomplete="off" class="layui-input" name="Phone" />
                            </div>
                        </div>
                    </div>
                    <% } }%>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button class="layui-btn layui-btn-normal js-alarmPhone">Setting</button>
                            </div>
                        </div>
    </div>
</div>