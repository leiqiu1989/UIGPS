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
                    <div class="panel-heading clearfix">
                        <h3 class="panel-title">
                            Base Info.
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class="layui-form auto-label-width">
                            <div class="layui-form-item">
                                <label class="layui-form-label required">Name</label>
                                <div class="layui-input-block">
                                    <input type="text" class="layui-input" name="LandMarkName" value="<%= data.LandMarkName %>" placeholder="The maximum length is 20 characters" />
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label required">Longitude</label>
                                <div class="layui-input-block">
                                    <input type="text" autocomplete="off" class="layui-input js-lng" disabled value="<%= data.Lng %>" />
                                </div>
                            </div>

                            <div class="layui-form-item">
                                <label class="layui-form-label required">Latitude</label>
                                <div class="layui-input-block">
                                    <input type="text" autocomplete="off" class="layui-input js-lat" disabled value="<%= data.Lat %>" />
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">Remark</label>
                                <div class="layui-input-block">
                                    <textarea placeholder="Please input something" name="Remark" class="layui-textarea">
                                            <%= data.Remark %>
                                        </textarea>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-block">
                                    <button class="layui-btn layui-btn-normal js-save">Save</button>
                                    <button class="layui-btn layui-btn-primary js-cancel">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="mapToolbar">
                    <input type="text" class="mapText" name="searchTxt" id="searchTxt" placeholder="Enter a location" />
                </div>
                <div id="landMarkPointMap" style="width:100%;height:600px;" class="full">
                </div>
            </div>
        </div>
    </div>
</div>