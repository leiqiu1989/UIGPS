<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">订单信息</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width">
            <div class="layui-form-item mb5">
                <div class="layui-inline">
                    <label class="layui-form-label">订单编号</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" name="OrderNum" placeholder="" value="<%= searchValue.OrderNum %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">接单车辆</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" name="plateNo" placeholder="" value="<%= searchValue.plateNo %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">接单时间</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input inline-block" name="start" value="<%= searchValue.start %>" readonly="readonly" />
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input inline-block" name="end" value="<%= searchValue.end %>" readonly="readonly" />
                    </div>
                </div>
            </div>
            <div class="layui-form-item mb0">
                <div class="layui-inline">
                    <label class="layui-form-label">订单类型</label>
                    <div class="layui-input-block">
                        <select id="OrderType" name="OrderType">
                        <option value="0">全部</option>
                        <option value="1">位置订单</option>
                        <option value="2">语音订单</option>
                        <option value="4">微信订单</option>
					</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">客户手机</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" maxlength="11" name="phone" placeholder="" value="<%= searchValue.phone %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_list_search">查 询</button>
                    <button class="layui-btn layui-btn-primary js_list_reset">重置</button>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-body no-padding grow">
        <div class="panel full no-margin flexbox">
            <div class="grid ">
                <div class="table-head ">
                    <div class="table-head-warp ">
                        <table class="grid-table ">
                            <colgroup>
                                <col width="15%" />
                                <col width="12%" />
                                <col width="12%" />
                                <col width="9%" />
                                <col width="9%" />
                                <col width="9%" />
                                <col width="12%" />
                                <col width="12%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>订单编号</th>
                                    <th>客户手机</th>
                                    <th>订单时间</th>
                                    <th>订单类型</th>
                                    <th>订单内容</th>
                                    <th>接单车辆</th>
                                    <th>接单时间</th>
                                    <th>接单地点</th>
                                    <th>订单结果</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="orderList" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col width="15%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="9%" />
                            <col width="9%" />
                            <col width="9%" />
                            <col width="12%" />
                            <col width="12%" />
                            <col width="10%" />
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