<div id="obdInfo">
    <ul>
        <li>
            <span>灯状态(远光灯)</span>
            <span><%= odbNull(data.Voltage) %></span>
        </li>
        <li><span>灯状态(近光灯)</span>
            <span><%= odbNull(data.Fdjfh) %></span></li>
        <li><span>灯状态(示宽灯)</span>
            <span><%= odbNull(data.EngineSpeed) %></span></li>
        <li><span>灯状态(雾灯)</span>
            <span><%= odbNull(data.CoolantTmp) %></span></li>
        <li><span>灯状态(雾灯)</span>
            <span><%= odbNull(data.CoolantTmp) %></span></li>
        <li><span>灯状态(左转向)</span>
            <span><%= odbNull(data.Bcxslc) %></span></li>
        <li><span>灯状态(右转向)</span>
            <span><%= odbNull(data.Fdjyxsj) %></span></li>
        <li><span>灯状态(危险灯)</span>
            <span><%= odbNull(data.Cwhjwd) %></span></li>
        <li><span>灯状态(左前门)</span>
            <span><%= odbNull(data.Dhtqj) %></span></li>
        <li><span>灯状态(右前门)</span>
            <span><%= odbNull(data.Ymtbwz) %></span></li>
        <li><span>灯状态(左后门)</span>
            <span><%= odbNull(data.Cwdqyl) %></span></li>
        <li><span>灯状态(右后门)</span>
            <span><%= odbNull(data.Jqyl) %></span></li>
        <li><span>门状态(后备箱\尾箱)</span>
            <span><%= odbNull(data.Jqmwz) %></span></li>
        <li><span>门锁(全车)</span>
            <span><%= odbNull(data.Ryyl) %></span></li>
        <li><span>门锁(左前门)</span>
            <span><%= odbNull(data.InletTemp) %></span></li>
        <li><span>门锁(右前门)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>门锁(左后门)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>门锁(右后门)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>门锁(后备箱\尾箱)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>窗状态(左前窗)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>窗状态(右前窗)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>窗状态(左后窗)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>窗状态(右后窗)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>窗状态(天窗)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>故障信号(ECM)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>故障信号(ABS)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>故障信号(SRS)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>报警信号(机油)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>报警信号(胎压)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>报警信号(保养)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>安全气囊状态</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>手刹状态</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>刹车状态(脚刹)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>安全带(驾驶员)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>安全带(副驾)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>ACC信号</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>钥匙状态</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>遥控信号</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>雨刮状态</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>空调开关</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>档位</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>油门踏板状态</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
        <li><span>方向盘转向角状态</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
    </ul>
</div>
<div id="obdStatus" class="hidden">
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
            <span>总里程(km)</span>
            <span><%= odbNull(data.Voltage) %></span>
        </li>
        <li><span>续航里程(km)</span>
            <span><%= odbNull(data.Fdjfh) %></span></li>
        <li><span>水温(发动机冷却液℃)</span>
            <span><%= odbNull(data.EngineSpeed) %></span></li>
        <li><span>发动机进气温度(℃)</span>
            <span><%= odbNull(data.CoolantTmp) %></span></li>
        <li><span>空调车内温度(℃)</span>
            <span><%= odbNull(data.Bcxslc) %></span></li>
        <li><span>电池当前电压(V)</span>
            <span><%= odbNull(data.Fdjyxsj) %></span></li>
        <li><span>左前轮轮速(km/h)</span>
            <span><%= odbNull(data.Cwhjwd) %></span></li>
        <li><span>右前轮轮速(km/h)</span>
            <span><%= odbNull(data.Dhtqj) %></span></li>
        <li><span>左后轮轮速(km/h)</span>
            <span><%= odbNull(data.Ymtbwz) %></span></li>
        <li><span>右后轮轮速(km/h)</span>
            <span><%= odbNull(data.Cwdqyl) %></span></li>
        <li><span>车速(km/h)</span>
            <span><%= odbNull(data.Jqyl) %></span></li>
        <li><span>转速(rpm)</span>
            <span><%= odbNull(data.Jqmwz) %></span></li>
        <li><span>机油寿命(%)</span>
            <span><%= odbNull(data.Ryyl) %></span></li>
        <li><span>机油压力(kPa)</span>
            <span><%= odbNull(data.InletTemp) %></span></li>
        <li><span>空气流量(g/s)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>进气歧管绝对压力(kPa)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>喷油脉宽(ms)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>油门踏板相对位置(%)</span>
            <span><%= odbNull(data.Kqll) %></span></li>
        <li><span>方向盘转角(°)</span>
            <span><%= odbNull(data.Cqryxz) %></span></li>
    </ul>
    <div class="obd-group">
        燃油
    </div>
    <ul>
        <li>
            <span>剩余油量(L)</span>
            <span><%= odbNull(data.Pjyh) %></span>
        </li>
        <li>
            <span>剩余油量(%)</span>
            <span><%= odbNull(data.Pjyh) %></span>
        </li>
        <li>
            <span>单次用油量(ml)</span>
            <span><%= odbNull(data.Pjyh) %></span>
        </li>
        <li><span>平均油耗(L/100KM)</span>
            <span><%= odbNull(data.Bcryl) %></span></li>
        <li>
            <span>瞬时油耗(L/100KM)</span>
            <span><%= odbNull(data.Ljryl) %></span></li>
        <li>
            <span>瞬时油耗(L/H)</span>
            <span><%= odbNull(data.Ljryl) %></span></li>
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
        <li><span>本次急加速</span>
            <span><%= odbNull(data.Bcjijian) %></span></li>
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
</div>