<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
    <tr data-orgid="<%= item.OrgId %>">
        <td title="<%= item.OrganizationName %>">
            <%= item.OrganizationName %>
        </td>
        <td title="<%= item.ParentOrgName %>">
            <%= item.ParentOrgName %>
        </td>
        <td title="<%= item.Principal %>">
            <%= item.Principal %>
        </td>
        <td title="<%= item.PrincipalPhone %>">
            <%= item.PrincipalPhone %>
        </td>
        <td title="<%= item.Principal %>">
            <%= item.Principal %>
        </td>
        <td title="<%= item.PrincipalPhone %>">
            <%= item.PrincipalPhone %>
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