<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr data-id="<%= item.RoleId%>">
        <td>
            <input type="checkbox" name="checkItem" />
        </td>
        <td title="<%= item.RoleName %>">
            <%= item.RoleName %>
        </td>
        <td title="<%= formateDate(item.UpdateTime,'yyyy/MM/dd hh:mm') %>">
            <%= formateDate(item.UpdateTime,'yyyy/MM/dd hh:mm') %>
        </td>
        <td title="<%= item.Remark %>">
            <%= item.Remark %>
        </td>
        <td>
            <a class="td-operator js_list_edit">
                <i class="fa fa-pencil-square-o"></i> Edit
            </a>
            <a class="td-operator js_list_delete">
                <i class="fa fa-times"></i> Delete
            </a>
        </td>
    </tr>
    <% } } %>