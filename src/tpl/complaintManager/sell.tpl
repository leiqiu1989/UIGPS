<form id="frm-addCar">
	<div id="carAdd" class="panel panel-transparent">
	<div class="panel-heading">
		<h3 class="panel-title">
			<ol class="breadcrumb no-padding no-margin bg-white">
				<li>GPS设备信息</li>
				<li class="active">售卖GPS设备</li>
			</ol>
		</h3>
	</div>
	<div class="panel-toolbar form-inline">
			<div class="form-group btn-toolbar">
				<a class="btn btn-default js_back"> <i class="fa fa-reply"></i>
					返 回
				</a>
			</div>
		</div>
	<div class="panel-body">
		<div class="panel panel-transparent">
			<div class="panel-heading">
				<h3 class="panel-title"> <i class="fa fa-shopping-cart" aria-hidden="true"></i>
					售卖
				</h3>
			</div>
			<div class="panel-body">
				<form>
					<div class='row'>
						<div class='col-sm-6'>
							<label>GPS设备编号</label>
							<label class="form-control"><%= uniqueids.toString() %></label>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<input type="hidden" name="orgId" id="orgId">
								<label for="orgName" class="required">所属机构</label>
								<input type="text" required class="form-control" name="orgName" placeholder="至少输入3个字符搜索" id="orgName">
								<ul class="ul-select hidden"></ul>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="package" class="required">服务套餐</label>
								<input class="form-control" required id="package" type="text" />
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="sellDate" class="required">销售日期</label>
								<input type="text" required class="form-control form-control" readonly="readonly" id="sellDate" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="endDate" class="required">服务套餐到期日期</label>
								<input type="text" required class="form-control form-control" readonly="readonly" id="endDate" />
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="needFee">应收费用</label>
								<div class="input-group">
									<input class="form-control" id="needFee" type="text" />
									<div class="input-group-addon">元</div>
								</div>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="realFee">实收费用</label>
								<div class="input-group">
									<input class="form-control" id="realFee" type="text" />
									<div class="input-group-addon">元</div>
								</div>
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-6'>
							<div class='form-group'>
								<label for="remark">备注</label>
								<textarea class="form-control" rows="5" id="remark"></textarea>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="panel panel-transparent">
			<div class="panel-footer panel-footer-patch">
				<a class="btn btn-primary mr10 js_save">
					<i class="fa fa-check"></i>
					保 存
				</a>
				<a class="btn btn-default js_cancel">
					<i class="fa fa-ban"></i>
					取 消
				</a>
			</div>
		</div>
	</div>
	</div>
</form>