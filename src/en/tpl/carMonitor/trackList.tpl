<% if(data && data.length >	0) {
            for(var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
        %>
    <tr>
        <td class="align-center">
            <%= i+1 %>
        </td>
        <td>
            <%= item.GpsTime %>
        </td>
        <td>
            <%= item.Speed %>
        </td>
        <td>
            <% if(item.Status.indexOf('ACC ON')){ %>
                <span class="engine">Engine Start</span>
                <% } else if(item.Status.indexOf('ACC OFF')){ %>
                    <span class="engine">Engine Stop</span>
                    <% } else{ %>
                        <span class="engine">Unknown state</span>
                        <% } %>
        </td>
        <td>
            <%= item.TotalDistance %>
        </td>
        <td>
            <%= item.AlarmInfo %>
        </td>
        <td>
            <%= item.Location %>
        </td>
    </tr>
    <% } } %>