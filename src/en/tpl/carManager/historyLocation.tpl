<table class="table table-hover no-margin">
	<colgroup>
	<col width="150px" />
	<col width="80px" />
	<col width="80px" />
	<col width="80px" />
	<col width="120px"/>
	<col width="200px"/>
	<col width="100px"/>
</colgroup>
<tbody>
		<% if(data && data.length >
	0) {
			for(var i = 0 , len = data.length; i
	< len; i++) {
				var item = data[i];
		%>
		<tr>
			<td title="<%= item.gpsTime %>">
				<%= item.gpsTime %></td>
			<td title="<%= item.speed %>">
				<%= item.speed %></td>
			<td title="<%= item.directionName %>">
				<%= item.directionName %></td>
			<td title="<%= item.status %>">
				<%= item.status %></td>
			<td title="<%= item.alarmDesc %>">
				<%= item.alarmDesc %></td>
			<td title="<%= item.location %>">
				<%= item.location %></td>
			<td title="<%= item.distance.toFixed(2) %>">
				<%= item.distance.toFixed(2) %></td>
		</tr>
		<% } } %>
</tbody>
</table>