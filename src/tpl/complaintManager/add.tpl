<form id="frmAddDevice">
	<input type="hidden" name="id" value="<%= id %>" />
	<div class="panel panel-transparent">
	<div class="panel-heading">
		<h3 class="panel-title">
			<ol class="breadcrumb no-padding no-margin bg-white">
				<li>GPS设备信息</li>
				<li class="active"><%= title %></li>
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
				<h3 class="panel-title"> <i class="fa fa-comment" aria-hidden="true"></i>
					GPS设备信息
				</h3>
			</div>
			<div class="panel-body">
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="_uniqueId" class="required" >GPS设备编号</label>
								<input class="form-control" required id="_uniqueId" name="uniqueId" type="text" maxlength="15"
								onkeyup="this.value=this.value.replace(/\D/g,'')"
								onafterpaste="this.value=this.value.replace(/\D/g,'')" value="<%= uniqueId %>" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="_name" class="required">GPS设备类型</label>
								<select class="form-control" required id="_name" name="name">
									<option value="ET-08S">ET-08S</option>
									<option value="ET-08K">ET-08K</option>
									<option value="ET-08BD">ET-08BD</option>
									<option value="ET-08B">ET-08B</option>
									<option value="ET-15S">ET-15S</option>
									<option value="ET-15K">ET-15K</option>
								</select>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="_simcard" class="required">绑定SIM卡号码</label>
								<input class="form-control" required id="_simcard" name="simcard"  type="text" maxlength="15"
								onkeyup="this.value=this.value.replace(/\D/g,'')"
								onafterpaste="this.value=this.value.replace(/\D/g,'')" value="<%= simcard %>"/>
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<% if(!isEdit) { %>
									<label for="_outStockTime" class="required">出库日期</label>
									<input type="text" required class="form-control form-control" readonly="readonly" name="outStockTime"
										id="_outStockTime" value="<%= outStockTime %>" />
								<% }else { %>
									<label>出库日期</label>
									<label class="form-control"><%= formateDate(outStockTime) %></label>
								<% } %>
							</div>
						</div>
						<% if(isEdit) { %>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label>设备状态</label>
								<label class="form-control"><%= status %></label>
							</div>
						</div>
						<% } %>
					</div>
			</div>
		</div>
		<!-- gpsStatus:0 在库，1已售，2解绑 -->
		<% if(gpsStatus && isEdit){ %>
		<div class="panel panel-transparent">
			<div class="panel-heading">
				<h3 class="panel-title">
					<i class="fa fa-shopping-cart"></i>
					销售信息
				</h3>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class='col-sm-3'>
						<div class='form-group'>
							<label>车牌号码</label>
							<label class="form-control"><%=plateNumber%></label>
						</div>
					</div>
					<div class='col-sm-3'>
						<div class='form-group'>
							<label>所属机构</label>
							<label class="form-control"><%=orgName%></label>
						</div>
					</div>
					<div class='col-sm-3'>
						<div class='form-group'>
							<label>销售渠道</label>
							<label class="form-control"><%= sellChannel(channel) %></label>
						</div>
					</div>
					<div class='col-sm-3'>
						<div class='form-group'>
							<label>销售人员</label>
							<label class="form-control"><%= createUserName %></label>
						</div>
					</div>
				</div>
				<div class="row">
					<div class='col-sm-3'>
						<div class='form-group'>
							<label for="_salesTime" class="required">销售时间</label>
							<input type="text" required class="form-control" required readonly="readonly" name="salesTime" 
							id="_salesTime" value="<%= formateDate(salesTime) %>" />
						</div>
					</div>
					<div class='col-sm-3'>
						<div class='form-group'>
							<label for="_serviceEndTime" class="required">套餐到期时间</label>
							<input type="text" required class="form-control" required readonly="readonly" name="serviceEndTime" 
							id="_serviceEndTime" value="<%= formateDate(serviceEndTime) %>" />
						</div>
					</div>
					<div class='col-sm-3'>
						<div class='form-group'>
							<label for="_servicePackage" class="required">销售套餐</label>
							<input class="form-control" required id="_servicePackage" name="servicePackage"  type="text" maxlength="15"
								value="<%= servicePackage %>"/>
						</div>
					</div>
					<div class='col-sm-3'>
						<div class='form-group'>
							<label for="_needFee">应收费用</label>
							<div class="input-group">
								<input class="form-control" id="_needFee" name="needFee"  type="text" maxlength="15"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									onafterpaste="this.value=this.value.replace(/\D/g,'')" value="<%= needFee %>"/>
							<div class="input-group-addon">元</div> </div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class='col-sm-3'>
						<div class='form-group'>
							<label for="_realFee">实收费用</label>
							<div class="input-group">
							<input class="form-control" id="_realFee" name="realFee" type="text" maxlength="15"
								onkeyup="this.value=this.value.replace(/\D/g,'')"
								onafterpaste="this.value=this.value.replace(/\D/g,'')" value="<%= realFee %>"/>
							<div class="input-group-addon">元</div> </div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class='col-sm-3'>
						<div class='form-group'>
							<label for="_remark">备注</label>
							<textarea class="form-control" name="remark" rows="5" id="_remark"><%= remark %></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
		<% } %>
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