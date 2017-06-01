<ul>
    <li>
        <span>故障数量</span>
        <span><%= odbNull(data.FaultCodeCount) %></span>
    </li>
    <li><span>故障码</span>
        <span><%= odbNull(data.FaultCode) %></span></li>
</ul>
<div class="obd-group">
    车辆
</div>
<ul>
    <li>
        <span>电瓶电压(v)</span>
        <span><%= odbNull(data.Voltage) %></span>
    </li>
    <li><span>发动机负荷(%)</span>
        <span><%= odbNull(data.Fdjfh) %></span></li>
    <li><span>发动机转数(RPM)</span>
        <span><%= odbNull(data.EngineSpeed) %></span></li>
    <li><span>冷却液温度(℃)</span>
        <span><%= odbNull(data.CoolantTmp) %></span></li>
    <li><span>里程统计(KM)</span>
        <span><%= odbNull(data.Bcxslc) %></span></li>
    <li><span>发动机运行时间(S)</span>
        <span><%= odbNull(data.Fdjyxsj) %></span></li>
    <li><span>车外环境温度(℃)</span>
        <span><%= odbNull(data.Cwhjwd) %></span></li>
    <li><span>点火提前角(°)</span>
        <span><%= odbNull(data.Dhtqj) %></span></li>
    <li><span>油门踏板位置(%)</span>
        <span><%= odbNull(data.Ymtbwz) %></span></li>
    <li><span>车外大气压力(kPa)</span>
        <span><%= odbNull(data.Cwdqyl) %></span></li>
    <li><span>进气压力(kPa)</span>
        <span><%= odbNull(data.Jqyl) %></span></li>
    <li><span>节气门位置(%)</span>
        <span><%= odbNull(data.Jqmwz) %></span></li>
    <li><span>燃油压力(kPa)</span>
        <span><%= odbNull(data.Ryyl) %></span></li>
    <li><span>进气温度(℃)</span>
        <span><%= odbNull(data.InletTemp) %></span></li>
    <li><span>空气流量(g/a)</span>
        <span><%= odbNull(data.Kqll) %></span></li>
    <li><span>长期燃油修正(%)</span>
        <span><%= odbNull(data.Cqryxz) %></span></li>
</ul>
<div class="obd-group">
    燃油
</div>
<ul>
    <li>
        <span>平均油耗(L/KM)</span>
        <span><%= odbNull(data.Pjyh) %></span>
    </li>
    <li><span>本次燃油量(L)</span>
        <span><%= odbNull(data.Bcryl) %></span></li>
    <li>
        <span>累计燃油量(RTM)</span>
        <span><%= odbNull(data.Ljryl) %></span></li>
    <li><span>剩余油量(RTM)</span>
        <span><%= odbNull(data.Syyl) %></span></li>
</ul>
<div class="obd-group">
    驾驶数据
</div>
<ul>
    <li>
        <span>本次行驶里程(KM)</span>
        <span><%= odbNull(data.Bcxslc) %></span>
    </li>
    <li><span>本次急刹车</span>
        <span><%= odbNull(data.Bcjsc) %></span></li>
    <li><span>本次急转弯</span>
        <span><%= odbNull(data.Bcjzw) %></span></li>
    <li><span>本次急减速</span>
        <span><%= odbNull(data.Bcjijian) %></span></li>
    <li><span>本次最高车速(KM)</span>
        <span><%= odbNull(data.Bczgcs) %></span></li>
    <li><span>本次最高转速(RPM)</span>
        <span><%= odbNull(data.Bczgzs) %></span></li>
    <li><span>故障后行驶里程(KM)</span>
        <span><%= odbNull(data.Gzhxslc) %></span></li>
    <li><span>当前车速(KM/H)</span>
        <span><%= odbNull(data.Speed) %></span></li>
</ul>