<div id="frmOrgUser" class="full">
    <div class="panel panel-transparent no-margin">
        <div class="panel-heading">
            <h3 class="panel-title">
                <%= title %>
            </h3>
        </div>
        <div class="panel-body">
            <div class="panel panel-transparent">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <i class="fa fa-comment"></i> Organization
                    </h3>
                </div>
                <div class="panel-body">
                    <div id="frmOrgInfo" autocomplete="off" class="layui-form auto-label-width">
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Subordinate</label>
                                    <div class="layui-input-block">
                                        <input type="text" class="layui-input" required value="<%= data.ParentOrgName %>" name="orgName" data-nosubmit="true" placeholder="please input at least 3 characters to search" />
                                        <input type="hidden" name="ParentOrgNo" value="<%= data.ParentOrgNo %>" />
                                        <input type="hidden" name="OrgId" value="<%= data.OrgId %>" />
                                        <ul class="ul-select hidden"></ul>
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required ellipsis" title="Organization Name">Organization Name</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.OrganizationName %>" required name="OrganizationName" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Contact Person</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.Principal %>" name="Principal" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">Contact Number</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" value="<%= data.PrincipalPhone %>" data-type="tel" name="PrincipalPhone" type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Administrator</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" type="text" value="<%= data.Manager %>" autocomplete="off" required name="Manager" />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Password</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" name="ManagePwd" type="password" value="<%= data.ManagePwd %>" autocomplete="off" data-type="pwd" required />
                                    </div>
                                </div>
                            </div>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label ellipsis" title="Organization Address">Organization Address</label>
                                    <div class="layui-input-block">
                                        <input class="layui-input" type="text" value="<%= data.Address %>" name="Address" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-3'>
                                <div class="layui-form-item">
                                    <label class="layui-form-label required">Remark</label>
                                    <div class="layui-input-block">
                                        <textarea class="layui-textarea" name="Remark">
										<%= data.Remark %>
									</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-transparent">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <i class="fa fa-user-plus"></i> User Info.
                        <span class="ml10 user-remind">（It can bound 5 users at most）</span>
                        <span class="ml10"><a class="user-remind-add js-addUser">Add User</a></span>
                    </h3>
                </div>
                <div class="panel-body">
                    <div id="frmUserList" class="layui-form auto-label-width" autocomplete="off">
                        <% 
							if(isEdit) { 
								for(var i=0;i< data.Users.length;i++) {
									var item= data.Users[i];
						%>
                            <div class='row'>
                                <div class='col-sm-2'>
                                    <div class="layui-form-item">
                                        <label class="layui-form-label required">Real Name</label>
                                        <div class="layui-input-block">
                                            <input class="layui-input" value="<%= item.RealName %>" required name="RealName" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class='col-sm-2'>
                                    <div class="layui-form-item">
                                        <label class="layui-form-label required">User</label>
                                        <div class="layui-input-block">
                                            <input class="layui-input" value="<%= item.UserName %>" required name="UserName" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div class='col-sm-2'>
                                    <div class="layui-form-item">
                                        <label class="layui-form-label required">Password</label>
                                        <div class="layui-input-block">
                                            <input class="layui-input" name="Pwd" type="password" data-type="pwd" value="<%= item.Pwd %>" required />
                                        </div>
                                    </div>
                                </div>
                                <div class='col-sm-2'>
                                    <div class="layui-form-item">
                                        <label class="layui-form-label required ellipsis" title="Contact Number">Contact Number</label>
                                        <div class="layui-input-block">
                                            <input type="text" class="layui-input" data-type="tel" required value="<%= item.Phone %>" name="Phone" />
                                        </div>
                                    </div>
                                </div>
                                <div class='col-sm-2'>
                                    <div class="layui-form-item">
                                        <label class="layui-form-label required">Role</label>
                                        <div class="layui-input-block">
                                            <select name="RoleId"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <% } } else { %>
                                <div class='row'>
                                    <div class='col-sm-2'>
                                        <div class="layui-form-item">
                                            <label class="layui-form-label required">Real Name</label>
                                            <div class="layui-input-block">
                                                <input class="layui-input" value="<%= data.RealName %>" required name="RealName" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-sm-2'>
                                        <div class="layui-form-item">
                                            <label class="layui-form-label required">User</label>
                                            <div class="layui-input-block">
                                                <input class="layui-input" value="<%= data.UserName %>" required name="UserName" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-sm-2'>
                                        <div class="layui-form-item">
                                            <label class="layui-form-label required">Password</label>
                                            <div class="layui-input-block">
                                                <input class="layui-input" name="Pwd" type="password" data-type="pwd" value="<%= data.Pwd %>" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-sm-2'>
                                        <div class="layui-form-item">
                                            <label class="layui-form-label required ellipsis" title="Contact Number">Contact Number</label>
                                            <div class="layui-input-block">
                                                <input type="text" class="layui-input" data-type="tel" required value="<%= data.Phone %>" name="Phone" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-sm-2'>
                                        <div class="layui-form-item">
                                            <label class="layui-form-label required">Role</label>
                                            <div class="layui-input-block">
                                                <select name="RoleId">
													<option value="0">写作</option>
        											<option value="1">阅读</option>
												</select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <% } %>
                                    <div class="row operator-row">
                                        <div class="col-sm-2">
                                            <div class="layui-form-item">
                                                <div class="layui-input-block">
                                                    <button class="layui-btn layui-btn-normal js_add_save">Save</button>
                                                    <button class="layui-btn layui-btn-primary js_add_back">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>