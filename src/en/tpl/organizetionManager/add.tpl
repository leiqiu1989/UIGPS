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
                            <label class="layui-form-label required ellipsis" title="Organization Name">Organization Name</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.OrganizationName %>" required name="OrganizationName" maxlength="20" type="text" placeholder="Can not be empty, and the length must be within 20 characters!" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">Higher Organizetion</label>
                            <div class="layui-input-block">
                                <div class="layui-unselect layui-form-select js-Subordinate">
                                    <div class="layui-select-title">
                                        <input type="text" placeholder="Select" id="txtSubordinate" value="<%= data.ParentOrgName %>" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                        <i class="layui-edge"></i>
                                    </div>
                                    <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">Contact Person</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.Principal %>" maxlength="20" placeholder="The maximum length is 20 characters" name="Principal" type="text" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">Contact Number</label>
                            <div class="layui-input-block">
                                <input class="layui-input" value="<%= data.PrincipalPhone %>" maxlength="15" placeholder="The maximum length is 15 characters" data-type="tel" name="PrincipalPhone" type="text" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label ellipsis" title="Organization Address">Address</label>
                            <div class="layui-input-block">
                                <input class="layui-input" type="text" value="<%= data.Address %>" maxlength="100" placeholder="The maximum length is 100 characters" name="Address" />
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">Remark</label>
                            <div class="layui-input-block">
                                <textarea class="layui-textarea" maxlength="255" placeholder="The maximum length is 255 characters" name="Remark">
							<%= data.Remark %>
						</textarea>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div class="layui-input-block">
                                <button type="button" class="layui-btn layui-btn-normal js_save">Save</button>
                                <button type="button" class="layui-btn layui-btn-primary js_cancel">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>