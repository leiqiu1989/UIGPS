<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
            var statusDesc = item.IsExpire == 0 ? 'Normal' : item.IsExpire ==1 ? 'Expiration' : '';
	%>
    <tr>
        <td>
            <%= i %>
        </td>
        <td title="<%= item.EquipmentNo %>">
            <%= item.EquipmentNo %>
        </td>
        <td title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td title="<%= item.OrganizationName %>">
            <%= item.OrganizationName %>
        </td>
        <td title="<%= item.EndTime %>">
            <%= item.EndTime %>
        </td>
        <td title="<%= statusDesc %>">
            <%= statusDesc %>
        </td>
    </tr>
    <% } } %>