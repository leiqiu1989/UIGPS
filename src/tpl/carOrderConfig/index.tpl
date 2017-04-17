<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">订单配置</h3>
    </div>
    <div class="panel-toolbar">
        <div class="auto-label-width">
            <div class="layui-form-item mb5">
                <div class="layui-inline">
                    <label class="layui-form-label">可接订单</label>
                    <div class="layui-input-block">
                        <input type="hidden" name="hi_acceptOrder" value="<%= searchValue.acceptOrderStr %>" />
                        <select class="w-300" multiple name="acceptOrder" data-placeholder="请选择...">
							<option value="WxFlag">微信订单</option>
							<option value="PositionFlag">位置订单</option>							
							<option value="VoiceFlag">语音订单</option>
							<option value="ControlFlag">调度屏信息</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">车牌号</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-150" name="PlateNo" placeholder="" value="<%= searchValue.PlateNo %>" />
                    </div>
                </div>
            </div>
            <div class="layui-form-item mb0">
                <div class="layui-inline">
                    <label class="layui-form-label">更新时间</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input inline-block" name="StartTime" value="<%= searchValue.StartTime %>" readonly="readonly" />
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input inline-block" name="EndTime" value="<%= searchValue.EndTime %>" readonly="readonly" />
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search">查 询</button>
                    <button class="layui-btn layui-btn-primary js_list_reset">重置</button>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-toolbar">
        <button class="layui-btn layui-btn-small layui-btn-normal js_list_export">
            <i class="fa fa-download"></i> 
			导 出
        </button>
    </div>
    <div class="panel-body no-padding grow">
        <div class="panel full no-margin flexbox">
            <div class="grid ">
                <div class="table-head ">
                    <div class="table-head-warp ">
                        <table class="grid-table ">
                            <colgroup>
                                <col width="10%" />
                                <col width="12%" />
                                <col width="12%%" />
                                <col width="15%%" />
                                <col width="15%" />
                                <col width="21%" />
                                <col width="12%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>车牌号码</th>
                                    <th>微信订单</th>
                                    <th>位置订单</th>
                                    <th>语音订单</th>
                                    <th>调度屏消息</th>
                                    <th>备注</th>
                                    <th>操 作</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="orderConfigList" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col width="10%" />
                            <col width="12%" />
                            <col width="12%%" />
                            <col width="15%%" />
                            <col width="15%" />
                            <col width="21%" />
                            <col width="12%" />
                        </colgroup>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="panel-footer clearfix">
                <div id="page" class="pull-right"></div>
            </div>
        </div>
    </div>
</div>