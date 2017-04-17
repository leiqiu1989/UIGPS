<div class="layui-form auto-label-width p15" id="configForm">
    <div class="layui-form-item">
        <label class="layui-form-label">可接订单类型</label>
        <div class="layui-input-block">
            <input type="checkbox" name="WxFlag" <%=data.WxFlag==1? 'checked': ''%> lay-skin="primary" title="微信订单" />
            <input type="checkbox" name="PositionFlag" <%=data.PositionFlag==1? 'checked': ''%> lay-skin="primary" title="位置订单" />
            <input type="checkbox" name="VoiceFlag" <%=data.VoiceFlag==1? 'checked': ''%> lay-skin="primary" title="语音订单" />
            <input type="checkbox" name="ControlFlag" <%=data.ControlFlag==1? 'checked': ''%> lay-skin="primary" title="调度屏信息" />
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
            <textarea placeholder="允许填写50字以内" name="remark" maxlength="50" class="layui-textarea">
                <%= data.SettingRemark %>
            </textarea>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn layui-btn-normal js-save">保 存</button>
            <button class="layui-btn layui-btn-primary js-cancel">取 消</button>
        </div>
    </div>
</div>