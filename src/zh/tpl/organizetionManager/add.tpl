<div id="frmOrgUser" class="full">
    <div class="panel panel-transparent no-margin">
        <div class="panel-heading">
            <h3 class="panel-title">
                <%= title %>
            </h3>
        </div>
        <div class="panel-body">
            <div id="frmOrgInfo" autocomplete="off" class="layui-form auto-label-width">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="layui-form-item">
                            <label class="layui-form-label required ellipsis" title="Organization Name">组织名称</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.OrganizationName %>" required name="OrganizationName" maxlength="20" type="text" placeholder="不能为空，最大长度为20个字符" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">上级组织</label>
                            <div class="layui-input-block">
                                <div class="layui-unselect layui-form-select js-Subordinate">
                                    <div class="layui-select-title">
                                        <input type="text" placeholder="请选择" id="txtSubordinate" value="<%= data.ParentOrgName %>" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                        <i class="layui-edge"></i>
                                    </div>
                                    <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">联系人</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.Principal %>" maxlength="20" placeholder="最大长度为20个字符" name="Principal" type="text" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">联系电话</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.PrincipalPhone %>" maxlength="15" placeholder="最大长度为15个字符" data-type="tel" name="PrincipalPhone" type="text" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label ellipsis" title="Organization Address">地址</label>
                            <div class="layui-input-block">
                                <input class="layui-input" type="text" value="<%= data.Address %>" maxlength="100" placeholder="最大长度为100个字符" name="Address" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">备注</label>
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