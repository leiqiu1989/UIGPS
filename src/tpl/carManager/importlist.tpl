<table class="table table-hover no-margin">
	<colgroup>
	<col width="150px"/>
	<col width="100px"/>
	<col width="80px"/>
	<col width="100px"/>
	<col width="80px"/>
	<col width="80px"/>
	<col width="80px"/>
	<col width="130px"/>
	<col width="100px"/>
	<col width="80px"/>
	<col width="130px"/>
	<col width="100px"/>
	<col width="100px"/>
</colgroup>
<tbody>
	<% if(data && data.length >
	0) {
			for(var i = 0 , len = data.length; i
	< len; i++) {
				var item = data[i];
				var stopCls = item.status == 0 ? 'red' :'';
		%>
		<tr>
			<td title="<%= item.errorMsg %>
				">
					<%= item.errorMsg %>
			</td>
			<td title="<%= item.plateNumber %>
				">
				<%= item.plateNumber %></td>
			<td title="<%= item.plateNumberColor %>
				">
				<%= item.plateNumberColor %></td>
			<td title="<%= item.orgName %>
				">
				<%= item.orgName %></td>
			<td title="<%= item.vehicleBrand %>
				">
				<%= item.vehicleBrand %></td>
			<td title="<%= item.truckType %>
				">
				<%= item.truckType %></td>
			<td title="<%= item.masterName %>
				">
				<%= item.masterName %></td>
			<td title="<%= item.masterIdCard %>
				">
				<%= item.masterIdCard %></td>
			<td title="<%= item.masterTelephone %>
				">
				<%= item.masterTelephone %></td>
				<td title="<%= item.copilotName %>
				">
				<%= item.copilotName %></td>
				<td title="<%= item.copilotIdCard %>">
				<%= item.copilotIdCard %></td>
				<td title="<%= item.copilotTelephone %>">
				<%= item.copilotTelephone %></td>
				<td title="<%= item.uniqueId %>
				">
				<%= item.uniqueId %></td>
		</tr>
		<% } } %>
</tbody>
</table>