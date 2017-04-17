<nav class="main-menu">
    <ul>
        <% 
            for(var i=0;i< data.length;i++) {
                var subMenus= data[i];
                if(subMenus.length > 0) {
                var icon= subMenus[0].icon;
                var groupname= subMenus[0].groupname;
        %>
            <li>
                <a href="javascript:void(0);" class="link">
                <i class="<%= icon %>"></i>
                <span class="nav-text">
                        <%= groupname %>
                </span>
                <i class="fa fa-chevron-down"></i>
            </a>
                <ul class="submenu">
                    <% 
                    for(var j=0;j < subMenus.length;j++) {
                        var item= subMenus[j];
                %>
                        <li>
                            <a href="<%= item.url %>">
                                <%= item.name %>
                            </a>
                        </li>
                        <% } %>
                </ul>
            </li>
            <% } }%>
    </ul>
</nav>