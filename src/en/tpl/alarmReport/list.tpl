<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr>
        <td>
            <%= item.Id %>
        </td>
        <td title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td title="<%= item.EquipmentNo %>">
            <%= item.EquipmentNo %>
        </td>
        <td title="<%= item.OrgName %>">
            <%= item.OrgName %>
        </td>
        <td title="<%= item.AlarmInfo %>">
            <%= item.AlarmInfo %>
        </td>
        <td title="<%= item.Stime %>">
            <%= item.Stime %>
        </td>
        <td title="<%= item.Etime %>">
            <%= item.Etime %>
        </td>
        <td title="<%= item.Speed %>">
            <%= item.Speed %>
        </td>
        <td title="<%= item.Processor %>">
            <%= item.Processor %>
        </td>
        <td title="<%= item.ProcessTime %>">
            <%= item.ProcessTime %>
        </td>
        <td title="<%= item.ProcessResult %>">
            <%= item.ProcessResult %>
        </td>
        <td>
            <a class="td-operator js_list_detail">
                <i class="fa fa-pencil-square-o"></i> Detail
            </a>
        </td>
    </tr>
    <% } } %>