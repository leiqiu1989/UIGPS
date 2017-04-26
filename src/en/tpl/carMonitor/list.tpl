<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];

	%>
    <tr data-flag="tr_monitor_<%= item.PlateNo %>" plateno="<%= item.PlateNo %>" data-vid="<%= item.Vid %>">
        <td class="align-center">
            <%= i+1 %>
        </td>
        <td>
            <a class="td-a js_car_info" data-id="<%= item.Vid %>">View Info.</a> |
            <a class="td-a js_track_replay" data-id="<%= item.Vid %>" data-plate="<%= item.PlateNo %>">History Playback</a> |
            <a class="td-a js_directive" data-id="<%= item.Vid %>">Commands</a>
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
				if(item.VehicleStatus === 'Offline'){ 
			%>
                <span class="engine" style="display: inline-block;padding: 3px 15px;line-height:20px;border: 1px dashed #808080;"><%= item.VehicleStatus %></span>
                <% } else if(item.VehicleStatus.indexOf('ACC ON')){ %>
                    <span class="engine">Engine Start</span>
                    <% } else if(item.VehicleStatus.indexOf('ACC OFF')){ %>
                        <span class="engine">Engine Stop</span>
                        <% } else{ %>
                            <span class="engine">Unknown state</span>
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