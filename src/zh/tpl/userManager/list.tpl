<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr data-uid="<%= item.Uid %>">
        <td title="<%= item.UserName %>">
            <%= item.UserName %>
        </td>
        <td title="<%= item.OrgName %>">
            <%= item.OrgName %>
        </td>
        <td title="<%= item.RealName %>">
            <%= item.RealName %>
        </td>
        <td title="<%= item.Phone %>">
            <%= item.Phone %>
        </td>
        <td title="<%= item.RoleName %>">
            <%= item.RoleName %>
        </td>
        <td title="<%= item.Remark %>">
            <%= item.Remark %>
        </td>
        <td>
            <a class="td-operator js_list_edit">
                <i class="fa fa-pencil-square-o"></i> 编 辑
            </a>
            <a class="td-operator js_list_delete">
                <i class="fa fa-times"></i> 删 除
            </a>
            <!--<a class="td-operator js_list_delete">
                <i class="fa fa-times"></i> 重置密码
            </a>-->
        </td>
    </tr>
    <% } } %>