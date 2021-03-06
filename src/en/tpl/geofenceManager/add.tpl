<div class="panel panel-transparent no-margin full">
    <div class="panel-heading">
        <h3 class="panel-title">
            <%= title %>
        </h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <div class="col-sm-4">
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Basic Info
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div id="frmGeofenceAdd" autocomplete="off" class="layui-form auto-label-width">
                            <div class="layui-form-item">
                                <label class="layui-form-label required">Geofence Name</label>
                                <div class="layui-input-block">
                                    <input type="text" autocomplete="off" name="AreaName" value="<%= data.AreaName %>" required class="layui-input" maxlength="20" />
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">Geofence Radius</label>
                                <div class="layui-input-block">
                                    <select id="Radius" name="Radius">
                                        <option value="200">200meter</option>
                                        <option value="500">500meter</option>
                                        <option value="1000">1000meter</option>
                                        <option value="1500">1500meter</option>
                                        <option value="2000">2000meter</option>
                                        <option value="3000">3000meter</option>
						            </select>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">Subordinate</label>
                                <div class="layui-input-block">
                                    <div class="layui-unselect layui-form-select js-Subordinate">
                                        <div class="layui-select-title">
                                            <input type="text" placeholder="Select" id="txtSubordinate" value="<%= data.OrgName %>" name="txtSubordinate" readonly class="layui-input layui-unselect" />
                                            <i class="layui-edge"></i>
                                        </div>
                                        <dl id="orgTree" class="layui-anim layui-anim-upbit ztree">
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">Vehicle</label>
                                <div class="layui-input-block">
                                    <select id="selPlateNumber" name="selPlateNumber">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">Geofence Alarm</label>
                                <div class="layui-input-block">
                                    <input type="checkbox" title="In geofence" name="AreaIn" lay-skin="primary" />
                                    <input type="checkbox" title="Out of geofence" name="AreaOut" lay-skin="primary" />
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">Status</label>
                                <div class="layui-input-block">
                                    <select id="status" name="status">
                                        <option value="1">Open</option>
                                        <option value="0">Close</option>
						            </select>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">Remark</label>
                                <div class="layui-input-block">
                                    <textarea placeholder="" name="Reamrk" class="layui-textarea">
                                        <%= data.Remark %>
                                    </textarea>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-block">
                                    <button type="button" class="layui-btn layui-btn-normal js_geofence_save">Save</button>
                                    <button type="button" class="layui-btn layui-btn-primary js_geofence_cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="mapToolbar">
                    <input type="text" class="mapText" name="searchTxt" id="searchTxt" placeholder="Enter a location" autocomplete="off" />
                    <a href="javascript:" class="mapBtn mapBtnText js_mark_point_clear">Remove</a>
                </div>
                <div id="geofenceMap" style="width:100%;height:600px;"></div>
            </div>
        </div>
    </div>
</div>