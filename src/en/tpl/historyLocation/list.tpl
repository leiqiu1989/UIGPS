<table class="table table-hover no-margin">
	<colgroup>
    <col width="10%" />
    <col width="20%" />
    <col width="30%" />
    <col width="30%" />
    <col width="10%" />
</colgroup>
<tbody>
    <% if(data && data.length >	0) {
            for(var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
        %>
        <tr>
            <td>
                <%= i+1 %>
            </td>
            <td>
                <%= item.PlateNo %>
            </td>
            <td>
                <%= item.FGpsTime %>
            </td>
            <td>
               <%= item.TGpsTime %>
            </td>
            <td>
                <a class="td-a js_track_replay" data-id="<%= item.Vid %>" 
                    data-ftime="<%= item.FGpsTime %>" data-ttime="<%= item.TGpsTime %>" data-plate="<%= item.PlateNo %>">History Playback</a>
            </td>	
        </tr>
        <% } } %>
</tbody>
</table>