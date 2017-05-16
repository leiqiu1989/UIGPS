<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr>
        <td>
            <%= i %>
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
        <td title="<%= item.Alarm %>">
            <%= item.Alarm %>
        </td>
        <td title="<%= formateDate(item.Stime,'yyyy/MM/dd hh:mm') %>">
            <%= formateDate(item.Stime,'yyyy/MM/dd hh:mm') %>
        </td>
        <td title="<%= formateDate(item.Etime,'yyyy/MM/dd hh:mm') %>">
            <%= formateDate(item.Etime,'yyyy/MM/dd hh:mm') %>
        </td>
        <td title="<%= item.Speed %>">
            <%= item.Speed %>
        </td>
        <td title="<%= item.Processor %>">
            <%= item.Processor %>
        </td>
        <td title="<%= formateDate(item.ProcessTime,'yyyy/MM/dd hh:mm') %>">
            <%= formateDate(item.ProcessTime,'yyyy/MM/dd hh:mm') %>
        </td>
        <td title="<%= item.ProcessResult %>">
            <%= item.ProcessResult %>
        </td>
        <td>
            <a class="td-operator js_list_edit">
                <i class="fa fa-pencil-square-o"></i> 详 情
            </a>
        </td>
    </tr>
    <% } } %>