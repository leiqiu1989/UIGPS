<div id="frmUser" class="full">
    <div class="panel panel-transparent no-margin">
        <div class="panel-heading">
            <h3 class="panel-title">
                <%= title %>
            </h3>
        </div>
        <div class="panel-body">
            <div id="frmUser" autocomplete="off" class="layui-form auto-label-width">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="layui-form-item">
                            <label class="layui-form-label required ellipsis">用户名</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.UserName %>" required name="UserName" autocomplete="off" maxlength="20" type="text" placeholder="不能为空，最大长度为20个字符" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label required ellipsis">密 码</label>
                            <div class="layui-input-block">
                                <input type="password" name="pwdTemp" data-nosubmit="true" style="width: 0; height: 0; position: absolute; border: 0;" />
                                <!-- 禁用表单默认填充 -->
                                <input class="layui-input" value="<%= data.Pwd %>" required name="Pwd" data-type="regPwd" autocomplete="off" maxlength="12" type="password" placeholder="不能为空，长度为6-12位数字和字母" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">所属机构</label>
                            <div class="layui-input-block">
                                <div class="layui-unselect layui-form-select js-Subordinate">
                                    <div class="layui-select-title">
                                        <input type="text" placeholder="请选择" id="txtSubordinate" value="<%= data.OrgName %>" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                        <i class="layui-edge"></i>
                                    </div>
                                    <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">真实姓名</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.RealName %>" maxlength="20" placeholder="最大长度为20个字符" name="RealName" type="text" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">联系电话</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.Phone %>" maxlength="15" placeholder="最大长度为15个字符" data-type="tel" name="Phone" type="text" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">角 色</label>
                            <div class="layui-input-block">
                                <select name="RoleId"></select>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">备 注</label>
                            <div class="layui-input-block">
                                <textarea class="layui-textarea" maxlength="255" placeholder="最大长度为255个字符" name="Remark">
							        <%= data.Remark %>
						        </textarea>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button type="button" class="layui-btn layui-btn-normal js_save">保 存</button>
                                <button type="button" class="layui-btn layui-btn-primary js_cancel">取 消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>