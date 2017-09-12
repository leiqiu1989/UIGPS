<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
			var stopCls = item.status == 0 ? 'red' :'';
			var endTimeCls= dateTimeCls(item.gpsEndTime);
			var carStatusDesc = (item.stateDesc ? item.stateDesc + ';' : '') +''+ (item.accStatus ? item.accStatus : '');
	%>
    <tr data-truckid="<%= item.Vid %>" data-orgno="<%= item.OrgNo %>" data-uniqueids="<%= item.uniqueId %>">
        <td title="<%= item.PlateNo %>">
            <%= item.PlateNo %>
        </td>
        <td title="<%= item.ColorString %>">
            <%= item.ColorString %>
        </td>
        <td title="<%= item.OrgName %>">
            <%= item.OrgName %>
        </td>
        <td title="<%= item.EquipmentNo %>" class="ellipsis">
            <%= item.EquipmentNo %>
        </td>
        <td title="<%= item.SimCardNo %>" class="ellipsis">
            <%= item.SimCardNo %>
        </td>
        <td title="<%= item.DriverName %>" class="ellipsis">
            <%= item.DriverName %>
        </td>
        <td title="<%= item.PhoneNo %>" class="ellipsis">
            <%= item.PhoneNo %>
        </td>
        <td title="<%= item.VehicleTypeString %>" class="<%= stopCls %>">
            <%= item.VehicleTypeString %>
        </td>
        <td title="<%= formateDate(item.ETime) %>" class="<%= endTimeCls %">
            <%= formateDate(item.ETime) %>
        </td>
        <td title="<%= item.Remark %>" class="ellipsis">
            <%= item.Remark %>
        </td>
        <td>
            <% if(editPermission){ %>
                <a class="td-operator js_list_edit">
                    <i class="fa fa-pencil-square-o"></i> 编 辑
                </a>
                <% } %>
                    <% if(delPermission){ %>
                        <a class="td-operator js_list_delete">
                            <i class="fa fa-times"></i> 删 除
                        </a>
                        <% } %>
        </td>
    </tr>
    <% } } %>