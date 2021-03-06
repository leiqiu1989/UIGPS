<div class="panel panel-transparent flexbox no-margin">
    <div class="panel-body no-padding grow">
        <div class="panel full no-margin flexbox">
            <div class="grid ">
                <div class="table-head ">
                    <div class="table-head-warp ">
                        <table class="grid-table ">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>License</th>
                                    <th>Alarm Time</th>
                                    <th>Alarm</th>
                                    <th>Alarm Info</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="panel-body no-padding grow ">
                <div class="grid-content">
                    <table class="grid-table ">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <tbody>
                            <% 
                                for(var i=0,len=data.length;i < len;i++){
                                    var item= data[i];
                            %>
                                <tr>
                                    <td>
                                        <%= item.KeyId %>
                                    </td>
                                    <td>
                                        <%= item.PlateNo %>
                                    </td>
                                    <td>
                                        <%= item.AlarmTime %>
                                    </td>
                                    <td>
                                        <%= item.Alarm %>
                                    </td>
                                    <td>
                                        <%= item.Speed + ','+ item.Additional %>
                                    </td>
                                    <td>
                                        <%= item.Position %>
                                    </td>
                                    <td>
                                        <%= item.Status %>
                                    </td>
                                </tr>
                                <% } %>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>