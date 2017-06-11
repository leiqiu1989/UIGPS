<div id="obdInfo">
    <ul>
        <li>
            <span>Lamp Status(high beam)</span>
            <span><%= odbNull(data.Voltage) %></span>
        </li>
        <li><span>Lamp Status(low beam)</span>
            <span><%= odbNull(data.Fdjfh) %></span></li>
        <li><span>Lamp Status(width lamp)</span>
            <span><%= odbNull(data.EngineSpeed) %></span></li>
        <li><span>Lamp Status(foglight)</span>
            <span><%= odbNull(data.CoolantTmp) %></span></li>
        <li><span>Lamp Status(foglight)</span>
            <span><%= odbNull(data.CoolantTmp) %></span></li>
        <li><span>Lamp Status(left-turn signal)</span>
            <span><%= odbNull(data.Bcxslc) %></span></li>
        <li><span>Lamp Status(right-turn signal)</span>
            <span><%= odbNull(data.Fdjyxsj) %></span></li>
        <li><span>Lamp Status(hazard light)</span>
            <span><%= odbNull(data.Cwhjwd) %></span></li>
        <li><span>Door Status(left front door)</span>
            <span><%= odbNull(data.Dhtqj) %></span></li>
        <li><span>Door Status(right front door)</span>
            <span><%= odbNull(data.Ymtbwz) %></span></li>
        <li><span>Door Status(left rear door)</span>
            <span><%= odbNull(data.Cwdqyl) %></span></li>
        <li><span>Door Status(right rear door)</span>
            <span><%= odbNull(data.Jqyl) %></span></li>
        <li><span>Door Status(trunk)</span>
            <span><%= odbNull(data.Jqmwz) %></span></li>
        <li><span>Door Lock(whole car)</span>
            <span><%= odbNull(data.Ryyl) %></span></li>
        <li><span>Door Lock(left front door)</span>
            <span><%= odbNull(data.InletTemp) %></span></li>
        <li><span>Door Lock(right front door)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>Door Lock(left rear door)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Door Lock(right rear door)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Door Lock(trunk)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Window Status(left front window)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Window Status(right front window)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Window Status(left rear window)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Window Status(right rear window)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Window Status(skylight)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Fault Signal(ECM)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Fault Signal(ABS)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Fault Signal(SRS)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Alarm Signal(engine oil)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Alarm Signal(tire pressure)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Alarm Signal(maintenance)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span> SRS Status</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Hand Brake Status</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Foot Brake Status</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Safety Belt(driver)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Safety Belt(copilot)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>ACC Signal</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Key Status</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Remote Status</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Wiper Status</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Air Conditioner Swtich</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>Gear</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>accelerator pedal status</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>steering wheel angle status</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
    </ul>
</div>
<div id="obdStatus" class="hidden">
    <ul>
        <li>
            <span>The Number of Fault</span>
            <span><%= odbNull(data.FaultCodeCount) %></span>
        </li>
        <li><span>Fault Code</span>
            <span><%= odbNull(data.FaultCode) %></span></li>
    </ul>
    <div class="obd-group">
        Vehicle
    </div>
    <ul>
        <li>
            <span>Total Mileage(km)</span>
            <span><%= odbNull(data.Voltage) %></span>
        </li>
        <li><span>Driving Mileage(km)</span>
            <span><%= odbNull(data.Fdjfh) %></span></li>
        <li><span>Water Temperature(engine coolant℃)</span>
            <span><%= odbNull(data.EngineSpeed) %></span></li>
        <li><span>engine intake air temperature(℃)</span>
            <span><%= odbNull(data.CoolantTmp) %></span></li>
        <li><span>Air-condition temperature(℃)</span>
            <span><%= odbNull(data.Bcxslc) %></span></li>
        <li><span>battery current voltage(V)</span>
            <span><%= odbNull(data.Fdjyxsj) %></span></li>
        <li><span>left front wheel speed(km/h)</span>
            <span><%= odbNull(data.Cwhjwd) %></span></li>
        <li><span>right front wheel speed(km/h)</span>
            <span><%= odbNull(data.Dhtqj) %></span></li>
        <li><span>left rear wheel speed(km/h)</span>
            <span><%= odbNull(data.Ymtbwz) %></span></li>
        <li><span>right rear wheel speed(km/h)</span>
            <span><%= odbNull(data.Cwdqyl) %></span></li>
        <li><span>speed(km/h)</span>
            <span><%= odbNull(data.Jqyl) %></span></li>
        <li><span>RPM(rpm)</span>
            <span><%= odbNull(data.Jqmwz) %></span></li>
        <li><span>Oil Life Time(%)</span>
            <span><%= odbNull(data.Ryyl) %></span></li>
        <li><span>Oil Pressure(kPa)</span>
            <span><%= odbNull(data.InletTemp) %></span></li>
        <li><span>air flow(g/s)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>intake manifold absolute pressure(kPa)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>fuel injection pulse width(ms)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>accelerator pedal relative position(%)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>steering wheel angle of rotation(°)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
    </ul>
    <div class="obd-group">
        Fuel
    </div>
    <ul>
        <li>
            <span>Fuel Remain(L)</span>
            <span><%= odbNull(data.Pjyh) %></span>
        </li>
        <li>
            <span>Fuel Remain(%)</span>
            <span><%= odbNull(data.Pjyh) %></span>
        </li>
        <li>
            <span>single fuel consumption(ml)</span>
            <span><%= odbNull(data.Pjyh) %></span>
        </li>
        <li><span>Average fuel consumption(L/100KM)</span>
            <span><%= odbNull(data.Bcryl) %></span></li>
        <li>
            <span>instantaneous fuel consumption (L/100KM)</span>
            <span><%= odbNull(data.Ljryl) %></span></li>
        <li>
            <span>instantaneous fuel consumption(L/H)</span>
            <span><%= odbNull(data.Ljryl) %></span></li>
    </ul>
    <div class="obd-group">
        Driving Data
    </div>
    <ul>
        <li>
            <span>Driving Mileage(KM)</span>
            <span><%= odbNull(data.Bcxslc) %></span>
        </li>
        <li><span>Sudden Brake</span>
            <span><%= odbNull(data.Bcjsc) %></span></li>
        <li><span>Sharp Turn</span>
            <span><%= odbNull(data.Bcjzw) %></span></li>
        <li><span>本次急加速</span>
            <span><%= odbNull(data.Bcjijian) %></span></li>
        <li><span>Rapid Acceleration</span>
            <span><%= odbNull(data.Bcjijian) %></span></li>
        <li><span>Highest Speed(KM)</span>
            <span><%= odbNull(data.Bczgcs) %></span></li>
        <li><span>Highest Engine Speed(RPM)</span>
            <span><%= odbNull(data.Bczgzs) %></span></li>
        <li><span>Driving Mileage After Faults Happened(KM)</span>
            <span><%= odbNull(data.Gzhxslc) %></span></li>
        <li><span>Current Speed(KM/H)</span>
            <span><%= odbNull(data.Speed) %></span></li>
    </ul>
</div>