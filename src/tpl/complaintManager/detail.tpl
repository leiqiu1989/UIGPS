<div id="carDetail" class="full">
	<div class="row-container">
		<div class="row row-static">
			<div class="no-padding">
				<!-- col-static border-r overflow-h -->
				<div class="panel panel-transparent">
					<!-- flexbox -->
					<div class="panel-heading">
						<h3 class="panel-title">
							<ol class="breadcrumb no-padding no-margin bg-white">
				               <li>GPS设备信息</li>
				               <li class="active"><%=unbind?'GPS设备解绑':uniqueId%></li>
				            </ol>
						</h3>
					</div>
					<div class="panel-toolbar form-inline">
						<div class="form-group btn-toolbar">
							<a class="btn btn-default js_back"> <i class="fa fa-reply"></i> 返 回
							</a>
						</div>
					</div>
					<div class="panel-body grow overflow-h">
						<div class="panel panel-transparent no-margin">
							<!-- flexbox -->
							<div class="panel-body no-padding grow">
								<div class="tab-content full">
									<!-- bt0 -->
									<div id="nav-GPSInfo" class="tab-pane active">
										<div class="panel panel-transparent">
											<div class="panel-heading">
												<h3 class="panel-title">
													<i class="fa fa-comment" aria-hidden="true"></i>
													GPS设备信息
												</h3>
											</div>
											<div class="panel-body">
												<form class="form-horizontal">
													<div class="row">
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">GPS设备编号</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= uniqueId %>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">GPS设备类型</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= name %>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">绑定SIM卡号码</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= simcard %>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">出库日期</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= sliceDate(outStockTime) %>
																	</label>
																</div>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">设备状态</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= avlStatus %>
																	</label>
																</div>
															</div>
														</div>
													</div>
                								</form>
											</div>
										</div>
										<!-- saleStatus:0 未售，1已售 -->
										<% if(saleStatus){ %>
										<div class="panel panel-transparent">
											<div class="panel-heading">
												<h3 class="panel-title">
													<i class="fa fa-shopping-cart"></i>
													销售信息
												</h3>
											</div>
											<div class="panel-body">
												<form class="form-horizontal">
													<div class="row">
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">车牌号码</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= plateNumber %>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">所属机构</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= orgName %>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">销售时间</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= sliceDate(salesTime) %>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">套餐到期时间</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= sliceDate(serviceEndTime) %>
																	</label>
																</div>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">销售渠道</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%=sellChannel(channel)%>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">销售套餐</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= servicePackage %>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">应收费用</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%=needFee%>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">实收费用</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%=realFee%>
																	</label>
																</div>
															</div>
														</div>
													</div>
													<div class="row">
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">销售人员</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%= createUserName %>
																	</label>
																</div>
															</div>
														</div>
														<div class="col-sm-3">
															<div class="form-group">
																<label class="col-sm-3 control-label">备注</label>
																<div class="col-sm-9">
																	<label class="control-label-text-bootstrap">
																		<%=remark%>
																	</label>
																</div>
															</div>
														</div>
													</div>
                								</form>
											</div>
										</div>
										<% } %>
										<!-- 解绑 -->
										<%if(unbind){%>
										<div class="panel panel-transparent">
											<div class="panel-footer panel-footer-patch"> 
												<a class="btn btn-primary js_unbind">
													<i class="fa fa-check"></i> 
													解 绑
												</a>												
											</div>											
										</div>
										<%}%>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>