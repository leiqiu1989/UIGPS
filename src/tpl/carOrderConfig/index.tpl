<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">订单配置</h3>
	</div>
	<div class="panel-toolbar">
		<table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
			<tbody>
				<tr>
					<td>
						<label class="control-label">可接订单</label>
						<input type="hidden" name="hi_acceptOrder" value="<%= searchValue.acceptOrderStr %>" />
						<select class="form-control w-200" multiple name="acceptOrder" data-placeholder="请选择...">
							<option value="WxFlag">微信订单</option>
							<option value="PositionFlag">位置订单</option>							
							<option value="VoiceFlag">语音订单</option>
							<option value="ControlFlag">调度屏信息</option>
						</select>
					</td>
					<td>
						<label class="control-label">车牌号</label>
						<input type="text" class="form-control w-150" name="PlateNo" placeholder=""
							value="<%= searchValue.PlateNo %>" />
					</td>
				</tr>
				<tr>
					<td>
						<label class="control-label">更新时间</label>						
						<input type="text" class="form-control w-150 inline-block" name="StartTime" value="<%= searchValue.StartTime %>" readonly="readonly" />
						<span class="p15-lr">至</span>
						<input type="text" class="form-control w-150 inline-block" name="EndTime" value="<%= searchValue.EndTime %>" readonly="readonly"  />
					</td>
					<td class="pl20">
						<a href="javascript:" class="btn btn-primary js_list_search mr10">查 询</a>
						<a href="javascript:" class="btn btn-primary js_list_reset mr10">重 置</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="panel-toolbar form-inline">
		<div class="form-group btn-toolbar">
			<a class="btn btn-primary js_list_export">
				<i class="fa fa-download"></i>
				导 出
			</a>
		</div>
	</div>
	<div class="panel-body row-container grow">
		<div class="row row-static">
			<div class="col-static col-xs-12 no-padding">
				<div class="panel no-margin flexbox">
					<div class="panel-heading no-padding datatable-header">
						<table class="table no-margin">
							<colgroup>
							<col width="10%" />
							<col width="12%" />
							<col width="12%%" />
							<col width="15%%" />
							<col width="15%" />
							<col width="21%" />
							<col width="12%" />
						</colgroup>
						<thead class="thin-border-bottom">
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
				<div id="carList" class="datatable-content panel-body no-padding grow"></div>
				<div class="panel-footer clearfix">
					<div id="page" class="pull-right"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>