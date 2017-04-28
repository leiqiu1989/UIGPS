<div class="p15">
    <div class="layui-form label-width-100">
        <div class="layui-form-item">
            <label class="layui-form-label">里程设置</label>
            <div class="layui-input-inline">
                <input type="text" autocomplete="off" class="layui-input" name="txtMilage" value="<%= data.Mileage %>" />
            </div>
            <div class="layui-input-inline w-70">
                <button class="layui-btn layui-btn-normal js-setMilage">设 置</button>
            </div>
            <div class="layui-form-mid layui-word-aux">
                车速怠慢情况下设置有效
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">灵敏度设置</label>
            <div class="layui-input-inline">
                <select name="sensitivity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="layui-input-inline w-70">
                <button class="layui-btn layui-btn-normal js-sensitivity">设 置</button>
            </div>
            <div class="layui-form-mid layui-word-aux">
                灵敏度1-5,1为最高灵敏度
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">超速设置</label>
            <div class="layui-input-inline">
                <input type="text" autocomplete="off" class="layui-input" name="txtSpeeding" value="<%= data.MaxSpeed %>" />
            </div>
            <div class="layui-input-inline w-70">
                <button class="layui-btn layui-btn-normal js-speeding">设 置</button>
            </div>
            <div class="layui-form-mid layui-word-aux">
                单位km/h,小于150km/h,大于40km/h
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">车辆安防</label>
            <div class="layui-input-block layui-input-block-button">
                <button class="layui-btn layui-btn-normal w-100 js-arm" data-enable="1">设 防</button>
                <button class="layui-btn layui-btn-normal w-100 js-arm" data-enable="0">撤 防</button>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">油电控制</label>
            <div class="layui-input-block layui-input-block-button">
                <button class="layui-btn layui-btn-normal w-100 js-fuel" data-enable="0">断开油电</button>
                <button class="layui-btn layui-btn-normal w-100 js-fuel" data-enable="1">恢复油电</button>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">围栏控制</label>
            <div class="layui-input-block layui-input-block-button">
                <button class="layui-btn layui-btn-normal w-100 js-fence" data-enable="1">打 开</button>
                <button class="layui-btn layui-btn-normal w-100 js-fence" data-enable="0">关 闭</button>
            </div>
        </div>
    </div>
    <fieldset class="layui-elem-field layui-field-title">
        <legend>设置报警电话</legend>
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
                    <label class="layui-form-label">姓 名</label>
                    <div class="layui-input-block">
                        <input type="text" autocomplete="off" class="layui-input" value="<%= item.FullName %>" name="FullName" />
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">电 话</label>
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
                            <label class="layui-form-label">姓 名</label>
                            <div class="layui-input-block">
                                <input type="text" autocomplete="off" class="layui-input" name="FullName" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">电 话</label>
                            <div class="layui-input-block">
                                <input type="text" autocomplete="off" class="layui-input" name="Phone" />
                            </div>
                        </div>
                    </div>
                    <% } }%>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button class="layui-btn layui-btn-normal js-alarmPhone w-100">设 置</button>
                            </div>
                        </div>
    </div>
</div>