<% if(data && data.length >	0) {
            for(var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
        %>
    <tr>
        <td>
            <%= i+1 %>
        </td>
        <td>
            <%= item.GpsTime %>
        </td>
        <td>
            <%= item.Speed %>
        </td>
        <td>
            <% if(item.Status.indexOf('ACC开')){ %>
                <span class="engine">发动机</span>&nbsp;<span class="carOpen">开</span>
                <% } else if(item.Status.indexOf('ACC关')){ %>
                    <span class="engine">发动机</span>&nbsp;<span class="carClose">关</span>
                    <% } else{ %>
                        <span class="engine">未知状态</span>
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