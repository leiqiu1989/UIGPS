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
                            基本信息
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class="layui-form auto-label-width">
                            <div class="layui-form-item">
                                <label class="layui-form-label required">名 称</label>
                                <div class="layui-input-block">
                                    <input type="text" class="layui-input" name="LandMarkName" value="<%= data.LandMarkName %>" placeholder="最大长度为20个字符" />
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label required">经 度</label>
                                <div class="layui-input-block">
                                    <input type="text" autocomplete="off" class="layui-input js-lng" disabled value="<%= data.Lng %>" />
                                </div>
                            </div>

                            <div class="layui-form-item">
                                <label class="layui-form-label required">纬 度</label>
                                <div class="layui-input-block">
                                    <input type="text" autocomplete="off" class="layui-input js-lat" disabled value="<%= data.Lat %>" />
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <label class="layui-form-label">备 注</label>
                                <div class="layui-input-block">
                                    <textarea placeholder="请输入内容" name="Remark" class="layui-textarea">
                                            <%= data.Remark %>
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
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="mapToolbar">
                    <input type="text" class="mapText" name="searchTxt" placeholder="输入地址定位" />
                    <a href="javascript:" class="mapBtn mapBtnText js_mark_point_clear">清除标注</a>
                    <a href="javascript:" class="mapBtn mapBtnText js_mark_point">标注地标点</a>
                    <a href="javascript:" class="mapBtn mapBtnSearch js_search_map"></a>
                </div>
                <div id="landMarkPointMap" style="width:100%;height:600px;" class="full">
                </div>
            </div>
        </div>
    </div>
</div>