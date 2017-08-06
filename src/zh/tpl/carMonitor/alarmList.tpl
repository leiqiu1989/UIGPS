<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr data-id="<%= item.Id %>">
        <td>
            <%= i+1 %>
        </td>
        <td class="ellipsis" title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td title="<%= item.Alarm %>">
            <%= item.Alarm %>
        </td>
        <td class="ellipsis" title="<%= item.STime %>">
            <%= item.STime %>
        </td>
        <td class="ellipsis" title="<%= item.ETime %>">
            <%= item.ETime %>
        </td>
        <td>
            <a class="td-operator js_alarm_dispose">Dispose</a>
        </td>
    </tr>
    <% } } %>