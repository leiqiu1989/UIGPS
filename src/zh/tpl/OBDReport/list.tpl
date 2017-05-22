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
        <td title="<%= item.Remark %>">
            <%= item.Remark %>
        </td>
        <td title="<%= item.Vid %>">
            <%= item.Vid %>
        </td>
        <td title="<%= item.ModelYear %>">
            <%= item.ModelYear %>
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
        <td title="<%= item.DrivingTimeString %>">
            <%= item.DrivingTimeString %>
        </td>
        <td title="<%= item.Distance %>">
            <%= item.Distance %>
        </td>
        <td title="<%= item.AverageSpeed %>">
            <%= item.AverageSpeed %>
        </td>
        <td title="<%= item.OilConsumption %>">
            <%= item.OilConsumption %>
        </td>
        <td title="<%= item.AverageOilConsumption %>">
            <%= item.AverageOilConsumption %>
        </td>
        <td title="<%= 0 %>">
            <%= 0 %>
        </td>
        <td title="<%= item.TotalFaultCodeCount %>">
            <%= item.TotalFaultCodeCount %>
        </td>
        <td title="<%= item.TotalRapidUp %>">
            <%= item.TotalRapidUp %>
        </td>
        <td title="<%= item.TotalRapidDown %>">
            <%= item.TotalRapidDown %>
        </td>
        <td title="<%= item.TotalRapidCorner %>">
            <%= item.TotalRapidDown %>
        </td>
        <td title="<%= item.TotalRapidBrake %>">
            <%= item.TotalRapidBrake %>
        </td>
    </tr>
    <% } } %>