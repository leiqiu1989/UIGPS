<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr>
        <td>
            <%= item.Id %>
        </td>
        <td title="<%= item.Vid %>">
            <%= item.Vid %>
        </td>
        <td title="<%= item.OrganizationName %>">
            <%= item.OrganizationName %>
        </td>
        <td title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td title="<%= item.EquipmentNo %>">
            <%= item.EquipmentNo %>
        </td>
        <td title="<%= item.SimcardNo %>">
            <%= item.SimcardNo %>
        </td>
        <td title="<%= item.PayTime %>">
            <%= item.PayTime %>
        </td>
        <td title="<%= item.AddYear %>">
            <%= item.AddYear %>
        </td>
        <td title="<%= item.Fee %>">
            <%= item.Fee %>
        </td>
    </tr>
    <% } } %>