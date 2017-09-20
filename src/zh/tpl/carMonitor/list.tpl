<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];

	%>
    <tr data-flag="tr_monitor_<%= item.PlateNo %>" plateno="<%= item.PlateNo %>" data-vid="<%= item.Vid %>">
        <td>
            <%= i+1 %>
        </td>
        <td>
            <a class="td-a js_car_info" data-id="<%= item.Vid %>">资料</a> |
            <a class="td-a js_track_replay" data-id="<%= item.Vid %>" data-plate="<%= item.PlateNo %>">轨迹</a> |
            <a class="td-a js_directive" data-id="<%= item.Vid %>">指令</a>
        </td>
        <td title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td title="<%= item.GpsTime %>">
            <%= item.GpsTime %>
        </td>
        <td title="<%= item.Speed %>">
            <%= item.Speed %>
        </td>
        <td>
            <%
				if(item.VehicleStatus === '离线'){ 
			%>
                <span class="engine" style="display: inline-block;padding: 3px 15px;line-height:20px;border: 1px dashed #808080;"><%= item.VehicleStatus %></span>
                <% } else if(item.VehicleStatus.indexOf('ACC开')){ %>
                    <span class="engine">发动机</span>&nbsp;<span class="carOpen">开</span>
                    <% } else if(item.VehicleStatus.indexOf('ACC关')){ %>
                        <span class="engine">发动机</span>&nbsp;<span class="carClose">关</span>
                        <% } else{ %>
                            <span class="engine">未知状态</span>
                            <% } %>
        </td>
        <td title="<%= directForm(item.Direction) %>">
            <%= directForm(item.Direction) %>
        </td>
        <td title="<%= item.Location %>">
            <%= item.Location %>
        </td>
    </tr>
    <% } } %>