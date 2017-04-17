<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">投诉管理</h3>
    </div>
    <div class="panel-toolbar">
        <div class="layui-form auto-label-width">
            <div class="layui-form-item mb5">
                <div class="layui-inline">
                    <label class="layui-form-label">订单编号</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" name="OrderNum" placeholder="请输入订单编号查询" value="<%= searchValue.OrderNum %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">投诉人</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" name="From" placeholder="请输入投诉人查询" value="<%= searchValue.From %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">投诉时间</label>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input inline-block" name="Start" value="<%= searchValue.Start %>" readonly="readonly" />
                    </div>
                    <div class="layui-form-mid">-</div>
                    <div class="layui-input-inline">
                        <input type="text" class="layui-input inline-block" name="End" value="<%= searchValue.End %>" readonly="readonly" />
                    </div>
                </div>
            </div>
            <div class="layui-form-item mb0">
                <div class="layui-inline">
                    <label class="layui-form-label">投诉类型</label>
                    <div class="layui-input-block">
                        <select id="Feature" name="Feature">
                        	<option value="0">所有</option>
							<option value="3">客户投诉</option>
							<option value="2">司机投诉</option>
							<option value="1">抢单投诉</option>
						</select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">被投诉人</label>
                    <div class="layui-input-block">
                        <input type="text" class="layui-input w-200" name="To" placeholder="请输入被投诉人查询" value="<%= searchValue.To %>" />
                    </div>
                </div>
                <div class="layui-inline">
                    <button class="layui-btn layui-btn-normal js_search">查 询</button>
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
                                <col width="15%" />
                                <col width="15%" />
                                <col width="15%" />
                                <col width="15%" />
                                <col width="25%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>订单编号</th>
                                    <th>投诉类型</th>
                                    <th>投诉时间</th>
                                    <th>投诉人</th>
                                    <th>被投诉人</th>
                                    <th>投诉原因</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div id="complaintList" class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col width="15%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="25%" />
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