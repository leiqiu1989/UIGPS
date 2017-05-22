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
        <td title="<%= item.OrgName %>">
            <%= item.OrgName %>
        </td>
        <td title="<%= item.Stime %>">
            <%= item.Stime %>
        </td>
        <td title="<%= item.Etime %>">
            <%= item.Etime %>
        </td>
        <td title="<%= item.DrivingTimeString %>">
            <%= item.DrivingTimeString %>
        </td>
        <td title="<%= item.Distance %>">
            <%= item.Distance %>
        </td>
        <td title="<%= item.AverageSpeed %>">
            <%= item.AverageSpeed %>
        </td>
    </tr>
    <% } } %>