<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">投诉管理</h3>
	</div>
	<div class="panel-toolbar">
		<table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
			<tbody>
				<tr>
					<td>
						<label class="control-label">订单编号</label>
						<input type="text" class="form-control w-200" name="OrderNum" placeholder="请输入订单编号查询"
							value="<%= searchValue.OrderNum %>" />
					</td>
					<td>
						<label class="control-label">投诉人</label>
						<input type="text" class="form-control w-200" name="From" placeholder="请输入投诉人查询"
							value="<%= searchValue.From %>" />
					</td>
					<td>
						<label class="control-label">投诉时间</label>
						<input type="text" name="Start" class="form-control w-150 inline-block" value="<%= searchValue.Start %>" readonly="readonly" id="startDate" />
						<span class="p15-lr">至</span>
						<input type="text" name="End" class="form-control w-150 inline-block" value="<%= searchValue.End %>" readonly="readonly" id="endDate" />
					</td>					
				</tr>
				<tr>
					<td>
						<label class="control-label">投诉类型</label>
						<select class="form-control w-200" name="Feature">
							<option value="0">所有</option>
							<option value="3">客户投诉</option>
							<option value="2">司机投诉</option>
							<option value="1">抢单投诉</option>
						</select>
					</td>
					<td>
						<label class="control-label">被投诉人</label>
						<input type="text" class="form-control w-200" name="To" placeholder="请输入被投诉人查询"
							value="<%= searchValue.To %>" />
					</td>
					<td class="pl20">
						<a href="javascript:" class="btn btn-primary mr10 js_search">查 询</a>
						<a href="javascript:" class="btn btn-primary js_list_reset">重 置</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="panel-body row-container grow">
		<div class="row row-static">
			<div id="complaintList" class="col-static col-xs-12 no-padding">
		</div>
	</div>
</div>
</div>