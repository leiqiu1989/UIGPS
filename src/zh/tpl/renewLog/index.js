define(function(){return '<div class="panel panel-transparent flexbox"> <div class="panel-heading"> <h3 class="panel-title">续费记录</h3> </div> <div class="panel-toolbar"> <div class="layui-form auto-label-width layui-form-inline"> <div class="layui-form-item"> <div class="layui-inline"> <label class="layui-form-label">所属机构</label> <div class="layui-input-block"> <input type="hidden" name="OnlyOrgNo" value="<%= searchValue.OnlyOrgNo %>" /> <input type="text" class="layui-input w-200" name="orgName" placeholder="至少输入3个字符搜索" value="<%= searchValue.orgName%>" /> <ul class="ul-select hidden"></ul> </div> </div> <div class="layui-inline"> <label class="layui-form-label">设备编号</label> <div class="layui-input-block"> <select id="vehicleType" name="VehicleType"> </select> </div> </div> <div class="layui-inline"> <label class="layui-form-label">车牌号码</label> <div class="layui-input-block"> <select id="vehicleType" name="VehicleType"> </select> </div> </div> <div class="layui-inline"> <label class="layui-form-label">SIM</label> <div class="layui-input-block"> <select id="vehicleType" name="VehicleType"> </select> </div> </div> <div class="layui-inline"> <label class="layui-form-label border-right">续费时间</label> <div class="layui-input-inline w-150"> <span class="time-area" data-type="week">本周</span> <span class="time-area" data-type="month">本月</span> <span class="time-area" data-type="custom" class="active">自定义</span> </div> <div class="layui-input-inline w-100"> <input type="text" name="startTime" readonly autocomplete="off" class="layui-input" /> </div> <div class="layui-form-mid">-</div> <div class="layui-input-inline w-100"> <input type="text" name="endTime" readonly autocomplete="off" class="layui-input"> </div> </div> <div class="layui-inline"> <button class="layui-btn layui-btn-normal js_list_search">查 询</button> <button class="layui-btn layui-btn-primary js_list_reset">重 置</button> </div> </div> </div> </div> <div class="panel-toolbar"> <button class="layui-btn layui-btn-small layui-btn-normal js_list_export"> <i class="fa fa-export"></i> 导 出 </button> </div> <div class="panel-body no-padding grow"> <div class="panel full no-margin flexbox"> <div class="grid "> <div class="table-head "> <div class="table-head-warp "> <table class="grid-table "> <colgroup> <col /> <col /> <col /> <col /> <col /> <col /> <col /> <col /> <col /> </colgroup> <thead> <tr> <th>序号</th> <th>用户编号</th> <th>所属机构</th> <th>车牌号码</th> <th>设备编号</th> <th>SIM</th> <th>续费时间</th> <th>续费年限</th> <th>金额</th> </tr> </thead> </table> </div> </div> </div> <div class="panel-body no-padding grow "> <div id="renewLogList" class="grid-content"> <table class="grid-table "> <colgroup> <col /> <col /> <col /> <col /> <col /> <col /> <col /> <col /> <col /> </colgroup> <tbody> </tbody> </table> </div> </div> <div class="panel-footer clearfix"> <div id="page" class="pull-right"></div> </div> </div> </div> </div>'});