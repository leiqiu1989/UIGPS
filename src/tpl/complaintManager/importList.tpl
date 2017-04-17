<table class="table table-hover no-margin">
	<colgroup>
		<col width="80px" />
		<col width="300px" />
		<col width="150px" />
		<col width="150px" />
		<col width="200px" />
		<col width="200px" />
	</colgroup>
	<tbody>
		<%if(content && content.length >0) {
			var data = content;
			for(var i = 0 , len = data.length; i< len; i++) {
				var item = data[i];
		%>
		<tr>
			<td>
				<%= i+1%>
			</td>
			<td title="<%= item.errorMsg %>">
				<%= item.errorMsg %>
			</td>
			<td title="<%= item.uniqueId %>">
				<%= item.uniqueId %>
			</td>
			<td title="<%= item.name %>">
				<%= item.name %>
			</td>
			<td title="<%= item.simcard %>">
				<%= item.simcard %>
			</td>
			<td title="<%= item.outStockTime %>">
				<%= item.outStockTime %>
			</td>
		</tr>
		<% } } %>
	</tbody>
</table>