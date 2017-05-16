<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr>
        <td>
            <%= item.Index %>
        </td>
        <td title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td title="<%= item.Vid %>">
            <%= item.Vid %>
        </td>
        <td title="<%= item.OrgName %>">
            <%= item.OrgName %>
        </td>
        <td title="<%= formateDate(item.Stime,'yyyy/MM/dd hh:mm') %>">
            <%= formateDate(item.Stime,'yyyy/MM/dd hh:mm') %>
        </td>
        <td title="<%= formateDate(item.Etime,'yyyy/MM/dd hh:mm') %>">
            <%= formateDate(item.Etime,'yyyy/MM/dd hh:mm') %>
        </td>
        <td>
            <%= item.Index %>
        </td>
        <td title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td title="<%= item.Vid %>">
            <%= item.Vid %>
        </td>
        <td title="<%= item.OrgName %>">
            <%= item.OrgName %>
        </td>
        <td title="<%= formateDate(item.Stime,'yyyy/MM/dd hh:mm') %>">
            <%= formateDate(item.Stime,'yyyy/MM/dd hh:mm') %>
        </td>
    </tr>
    <% } } %>