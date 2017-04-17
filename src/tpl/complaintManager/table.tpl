<% if(data && data.length >	0) {
    for(var i = 0 , len = data.length; i < len; i++) {
                var item = data[i];
                var reason = item.Style + (item.Info ? '&nbsp;('+item.Info+')' : ''); 
%>
    <tr>
        <td title="<%= item.OrderNum %>">
            <%= item.OrderNum %>
        </td>
        <td title="<%= item.ComplaintType %>">
            <%= item.ComplaintType %>
        </td>
        <td title="<%= item.CreateTime %>">
            <%= item.CreateTime %>
        </td>
        <td title="<%= item.From %>">
            <%= item.From %>
        </td>
        <td title="<%= item.To %>">
            <%= item.To %>
        </td>
        <td title="<%= reason %>">
            <%= reason %>
        </td>
    </tr>
    <% } } %>