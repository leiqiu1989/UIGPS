<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr>
        <td>
            <%= item.KeyId %>
        </td>
        <td title="<%= item.UserName %>">
            <%= item.UserName %>
        </td>
        <td title="<%= item.OrgName %>">
            <%= item.OrgName %>
        </td>
        <td title="<%= item.CreateTime %>">
            <%= item.CreateTime %>
        </td>
        <td title="<%= item.LogTypeString %>">
            <%= item.LogTypeString %>
        </td>
        <td title="<%= item.LogInfo %>">
            <%= item.LogInfo %>
        </td>
    </tr>
    <% } } %>