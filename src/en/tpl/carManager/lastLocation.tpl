<form class="form-horizontal">
	<div class="row">
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">GPS Time</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap" title="<%= location.locationTime %>">
						<%= location.locationTime %>
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">Speed</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.speed %>Km/h
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">Direction</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.directionName %>
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">Status</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.status %>
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">Alarm</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap" title="<%= location.alarmDesc %>">
						<%= location.alarmDesc %>
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">Day mileage</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.mileage %>Km
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">Accumulating mileage</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.totalMileage %>Km
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">Location</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap" title="<%= location.location %>">
						<%= location.location %>
					</label>
				</div>
			</div>
		</div>
	</div>
</form>