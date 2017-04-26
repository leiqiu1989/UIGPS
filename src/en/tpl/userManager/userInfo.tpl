<div class='row'>
    <div class='col-sm-2'>
        <div class="layui-form-item">
            <label class="layui-form-label required">真实姓名</label>
            <div class="layui-input-block">
                <input class="layui-input" required name="RealName" type="text" />
            </div>
        </div>
    </div>
    <div class='col-sm-2'>
        <div class="layui-form-item">
            <label class="layui-form-label required">用户名</label>
            <div class="layui-input-block">
                <input class="layui-input" required name="UserName" type="text" />
            </div>
        </div>
    </div>
    <div class='col-sm-2'>
        <div class="layui-form-item">
            <label class="layui-form-label required">密 码</label>
            <div class="layui-input-block">
                <input class="layui-input" name="Pwd" type="password" required />
            </div>
        </div>
    </div>
    <div class='col-sm-2'>
        <div class="layui-form-item">
            <label class="layui-form-label required">联系电话</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" data-type="tel" required name="Phone" />
            </div>
        </div>
    </div>
    <div class='col-sm-2'>
        <div class="layui-form-item">
            <label class="layui-form-label required">角 色</label>
            <div class="layui-input-block">
                <select name="RoleId" required>
                    <% for (var i=0;i< roles.length;i++) { %>
                        <option value="<%= roles[i].RoleId %>"><%= roles[i].RoleName %></option>
                    <% } %>
                </select>
            </div>
        </div>
    </div>
    <div class='col-sm-2'>
        <a class="pointer no-border js_delete" style="position: absolute;top: 12px;">
            <i class="fa fa-times"></i>
        </a>
    </div>
</div>