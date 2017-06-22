<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr data-id="<%= item.KeyId %>">
        <td>
            <%= i %>
        </td>
        <td class="ellipsis" title="<%= item.AreaName %>">
            <%= item.AreaName %>
        </td>
        <td title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td class="ellipsis" title="<%= item.OrgName %>">
            <%= item.OrgName %>
        </td>
        <td class="ellipsis" title="<%= item.Location %>">
            <%= item.Location %>
        </td>
        <td title="<%= item.Radius %>">
            <%= item.Radius %>
        </td>
        <td class="ellipsis" title="<%= item.Alarm %>">
            <%= item.Alarm %>
        </td>
        <td title="<%= geofenceStatus(item.Enabled) %>">
            <%= geofenceStatus(item.Enabled) %>
        </td>
        <td class="ellipsis" title="<%= item.Remark %>">
            <%= item.Remark %>
        </td>
        <td>
            <a class="td-operator js_list_edit">编 辑</a>
            <a class="td-operator js_list_delete">删 除</a>
            <% 
                var status= geofenceStatus(item.Enabled);
                    if(status=='Open'){
            %>
                <a class="td-operator js_list_changeStatus" data-status="0">关 闭</a>
                <% }else if(status=='Close'){ %>
                    <a class="td-operator js_list_changeStatus" data-status="1">打 开</a>
                    <% } %>
        </td>
    </tr>
    <% } } %>