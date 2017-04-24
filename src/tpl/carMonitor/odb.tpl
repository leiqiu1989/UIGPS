<ul>
    <li>
        <span data-localize="VehicleMonitor.TheNumberOfFault">故障数量</span>
        <span><%= odbNull(FaultCodeCount) %></span>
    </li>
    <li><span data-localize="VehicleMonitor.FaultCode">故障码</span>
        <span><%= odbNull(FaultCode) %></span></li>
</ul>
<div class="obd-group" data-localize="VehicleMonitor.Vehicle">
    车辆
</div>
<ul>
    <li>
        <span data-localize="VehicleMonitor.BatteryVoltage">电瓶电压(v)</span>
        <span><%= odbNull(Voltage) %></span>
    </li>
    <li><span data-localize="VehicleMonitor.EngineLoad">发动机负荷(%)</span>
        <span><%= odbNull(Fdjfh) %></span></li>
    <li><span data-localize="VehicleMonitor.EngineSpeed">发动机转数(RPM)</span>
        <span><%= odbNull(EngineSpeed) %></span></li>
    <li><span data-localize="VehicleMonitor.CoolantTemperature">冷却液温度(℃)</span>
        <span><%= odbNull(CoolantTmp) %></span></li>
    <li><span data-localize="VehicleMonitor.TotalMileage">里程统计(KM)</span>
        <span><%= odbNull(Bcxslc) %></span></li>
    <li><span data-localize="VehicleMonitor.EngineRunningTime">发动机运行时间(S)</span>
        <span><%= odbNull(Fdjyxsj) %></span></li>
    <li><span data-localize="VehicleMonitor.EnvironmentalTemperature">车外环境温度(℃)</span>
        <span><%= odbNull(Cwhjwd) %></span></li>
    <li><span data-localize="VehicleMonitor.AdvanceAngleofIgnition">点火提前角(°)</span>
        <span><%= odbNull(Dhtqj) %></span></li>
    <li><span data-localize="VehicleMonitor.ThrottlePedalPosition">油门踏板位置(%)</span>
        <span><%= odbNull(Ymtbwz) %></span></li>
    <li><span data-localize="VehicleMonitor.AtmosphericPressure">车外大气压力(kPa)</span>
        <span><%= odbNull(Cwdqyl) %></span></li>
    <li><span data-localize="VehicleMonitor.IntakePressure">进气压力(kPa)</span>
        <span><%= odbNull(Jqyl) %></span></li>
    <li><span data-localize="VehicleMonitor.ThrottlePosition">节气门位置(%)</span>
        <span><%= odbNull(Jqmwz) %></span></li>
    <li><span data-localize="VehicleMonitor.FuelPressure">燃油压力(kPa)</span>
        <span><%= odbNull(Ryyl) %></span></li>
    <li><span data-localize="VehicleMonitor.IntakeAirTemperature">进气温度(℃)</span>
        <span><%= odbNull(InletTemp) %></span></li>
    <li><span data-localize="VehicleMonitor.AirMassFlow">空气流量(g/a)</span>
        <span><%= odbNull(Kqll) %></span></li>
    <li><span data-localize="VehicleMonitor.Long-termFuelCorrection">长期燃油修正(%)</span>
        <span><%= odbNull(Cqryxz) %></span></li>
</ul>
<div class="obd-group" data-localize="VehicleMonitor.Fuel">
    燃油
</div>
<ul>
    <li>
        <span data-localize="VehicleMonitor.AverageFuelConsumption">平均油耗(L/KM)</span>
        <span><%= odbNull(Pjyh) %></span>
    </li>
    <li><span data-localize="VehicleMonitor.FuelAmount">本次燃油量(L)</span>
        <span><%= odbNull(Bcryl) %></span></li>
    <li><span data-localize="VehicleMonitor.AccumulativeFuelAmount">累计燃油量(RTM)</span>
        <span><%= odbNull(Ljryl) %></span></li>
    <li><span data-localize="VehicleMonitor.RemaningFuel">剩余油量(RTM)</span>
        <span><%= odbNull(Syyl) %></span></li>
</ul>
<div class="obd-group" data-localize="VehicleMonitor.DrivingData">
    驾驶数据
</div>
<ul>
    <li>
        <span data-localize="VehicleMonitor.DrivingMileage">本次行驶里程(KM)</span>
        <span><%= odbNull(Bcxslc) %></span>
    </li>
    <li><span data-localize="VehicleMonitor.SuddenBrake">本次急刹车</span>
        <span><%= odbNull(Bcjsc) %></span></li>
    <li><span data-localize="VehicleMonitor.SharpTurn">本次急转弯</span>
        <span><%= odbNull(Bcjzw) %></span></li>
    <li><span data-localize="VehicleMonitor.RapidDeceleration">本次急减速</span>
        <span><%= odbNull(Bcjijian) %></span></li>
    <li><span data-localize="VehicleMonitor.HighestSpeed">本次最高车速(KM)</span>
        <span><%= odbNull(Bczgcs) %></span></li>
    <li><span data-localize="VehicleMonitor.HighestEngineSpeed">本次最高转速(RPM)</span>
        <span><%= odbNull(Bczgzs) %></span></li>
    <li><span data-localize="VehicleMonitor.DrivingMileageAfterFaultsHappened">故障后行驶里程(KM)</span>
        <span><%= odbNull(Gzhxslc) %></span></li>
    <li><span data-localize="VehicleMonitor.CurrentSpeed">当前车速(KM/H)</span>
        <span><%= odbNull(Speed) %></span></li>
</ul>