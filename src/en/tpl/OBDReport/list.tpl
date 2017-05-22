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
        <td title="<%= item.EquipmentNo %>">
            <%= item.EquipmentNo %>
        </td>
        <td title="<%= item.Brand %>">
            <%= item.Brand %>
        </td>
        <td title="<%= item.ModelYear %>">
            <%= item.ModelYear %>
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
        <td title="<%= item.OilConsumption %>">
            <%= item.OilConsumption %>
        </td>
        <td title="<%= item.AverageOilConsumption %>">
            <%= item.AverageOilConsumption %>
        </td>
        <td title="<%= item.AverageOilConsumption * 100 %>">
            <%= item.AverageOilConsumption * 100 %>
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
            <%= item.TotalRapidCorner %>
        </td>
        <td title="<%= item.TotalRapidBrake %>">
            <%= item.TotalRapidBrake %>
        </td>
    </tr>
    <% } } %>