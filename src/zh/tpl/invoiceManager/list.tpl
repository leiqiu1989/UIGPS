<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
            var statusDesc= item.IsOpen == 1 ? 'Make Out an Invoice' : 'Not Invoiced';
	%>
    <tr data-plateNo="<%= item.PlateNo %>" data-id="<%= item.Id %>" data-equipmentNo="<%= item.EquipmentNo %>" data-payTime="<%= item.PayTime %>" data-fee="<%= item.Fee %>">
        <td>
            <%= item.Id %>
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
        <td title="<%= item.PayTime %>">
            <%= item.PayTime %>
        </td>
        <td title="<%= item.Fee %>">
            <%= item.Fee %>
        </td>
        <td title="<%= statusDesc %>">
            <%= statusDesc %>
        </td>
        <td title="<%= item.InvoiceTime %>">
            <%= item.InvoiceTime %>
        </td>
        <td title="<%= item.Title %>">
            <%= item.Title %>
        </td>
        <td title="<%= item.Drawer %>">
            <%= item.Drawer %>
        </td>
        <td>
            <% if(item.IsOpen !==1 ){ %>
                <a class="td-operator js_list_invoice">开 票</a>
                <% } %>
        </td>
    </tr>
    <% } } %>