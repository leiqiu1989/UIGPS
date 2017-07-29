<div id="obdStatus" class="hidden">
    <ul>
        <li>
            <span>灯状态(远光灯)</span>
            <span><%= odbNull(obdStatus.highBeam) %></span>
        </li>
        <li><span>灯状态(近光灯)</span>
            <span><%= odbNull(obdStatus.lowBeam) %></span></li>
        <li><span>灯状态(示宽灯)</span>
            <span><%= odbNull(obdStatus.widthLamp) %></span></li>
        <li><span>灯状态(雾灯)</span>
            <span><%= odbNull(obdStatus.foglight) %></span></li>
        <li><span>灯状态(左转向)</span>
            <span><%= odbNull(obdStatus.leftTurnSignal) %></span></li>
        <li><span>灯状态(右转向)</span>
            <span><%= odbNull(obdStatus.rightTurnSignal) %></span></li>
        <li><span>灯状态(危险灯)</span>
            <span><%= odbNull(obdStatus.hazardLight) %></span></li>
        <li><span>灯状态(左前门)</span>
            <span><%= odbNull(obdStatus.leftFrontDoor) %></span></li>
        <li><span>灯状态(右前门)</span>
            <span><%= odbNull(obdStatus.rightFrontDoor) %></span></li>
        <li><span>灯状态(左后门)</span>
            <span><%= odbNull(obdStatus.leftRearDoor) %></span></li>
        <li><span>灯状态(右后门)</span>
            <span><%= odbNull(obdStatus.rightRearDoor) %></span></li>
        <li><span>门状态(后备箱\尾箱)</span>
            <span><%= odbNull(obdStatus.trunk) %></span></li>
        <li><span>门锁(全车)</span>
            <span><%= odbNull(obdStatus.wholeCar) %></span></li>
        <li><span>门锁(左前门)</span>
            <span><%= odbNull(obdStatus.lockLeftFrontDoor) %></span></li>
        <li><span>门锁(右前门)</span>
            <span><%= odbNull(obdStatus.lockRightFrontDoor) %></span></li>
        <li><span>门锁(左后门)</span>
            <span><%= odbNull(obdStatus.lockLeftRearDoor) %></span></li>
        <li><span>门锁(右后门)</span>
            <span><%= odbNull(obdStatus.lockRightRearDoor) %></span></li>
        <li><span>门锁(后备箱\尾箱)</span>
            <span><%= odbNull(obdStatus.LockTrunk) %></span></li>
        <li><span>窗状态(左前窗)</span>
            <span><%= odbNull(obdStatus.leftFrontWindow) %></span></li>
        <li><span>窗状态(右前窗)</span>
            <span><%= odbNull(obdStatus.rightFrontWindow) %></span></li>
        <li><span>窗状态(左后窗)</span>
            <span><%= odbNull(obdStatus.leftRearWindow) %></span></li>
        <li><span>窗状态(右后窗)</span>
            <span><%= odbNull(obdStatus.rightRearWindow) %></span></li>
        <li><span>窗状态(天窗)</span>
            <span><%= odbNull(obdStatus.skylight) %></span></li>
        <li><span>故障信号(ECM)</span>
            <span><%= odbNull(obdStatus.ECM) %></span></li>
        <li><span>故障信号(ABS)</span>
            <span><%= odbNull(obdStatus.ABS) %></span></li>
        <li><span>故障信号(SRS)</span>
            <span><%= odbNull(obdStatus.SRS) %></span></li>
        <li><span>报警信号(机油)</span>
            <span><%= odbNull(obdStatus.engineOil) %></span></li>
        <li><span>报警信号(胎压)</span>
            <span><%= odbNull(obdStatus.tirePressure) %></span></li>
        <li><span>报警信号(保养)</span>
            <span><%= odbNull(obdStatus.mastringenance) %></span></li>
        <li><span>安全气囊状态</span>
            <span><%= odbNull(obdStatus.srsStatus) %></span></li>
        <li><span>手刹状态</span>
            <span><%= odbNull(obdStatus.handBrakeStatus) %></span></li>
        <li><span>刹车状态(脚刹)</span>
            <span><%= odbNull(obdStatus.footBrakeStatus) %></span></li>
        <li><span>安全带(驾驶员)</span>
            <span><%= odbNull(obdStatus.safetyBeltDriver) %></span></li>
        <li><span>安全带(副驾)</span>
            <span><%= odbNull(obdStatus.safetyBeltCopilot) %></span></li>
        <li><span>ACC信号</span>
            <span><%= odbNull(obdStatus.ACC) %></span></li>
        <li><span>钥匙状态</span>
            <span><%= odbNull(obdStatus.keyStatus) %></span></li>
        <li><span>遥控信号</span>
            <span><%= odbNull(obdStatus.remoteStatus) %></span></li>
        <li><span>雨刮状态</span>
            <span><%= odbNull(obdStatus.wiperStatus) %></span></li>
        <li><span>空调开关</span>
            <span><%= odbNull(obdStatus.airConditionerSwtich) %></span></li>
        <li><span>档位</span>
            <span><%= odbNull(obdStatus.Gear) %></span></li>
        <li><span>油门踏板状态</span>
            <span><%= odbNull(obdStatus.acceleratorPedalStatus) %></span></li>
        <li><span>方向盘转向角状态</span>
            <span><%= odbNull(obdStatus.steeringWheelAngleStatus) %></span></li>
    </ul>
</div>
<div id="obdInfo">
    <ul>
        <li>
            <span>故障数量</span>
            <span><%= odbNull(obdInfo.theNumberOfFault) %></span>
        </li>
        <li><span>故障码</span>
            <span><%= odbNull(obdInfo.faultCode) %></span></li>
    </ul>
    <div class="obd-group">
        车辆
    </div>
    <ul>
        <li>
            <span>总里程(km)</span>
            <span><%= odbNull(obdInfo.totalMileage) %></span>
        </li>
        <li><span>续航里程(km)</span>
            <span><%= odbNull(obdInfo.drivingMileageKM) %></span></li>
        <li><span>水温(发动机冷却液℃)</span>
            <span><%= odbNull(obdInfo.waterTemperature) %></span></li>
        <li><span>发动机进气温度(℃)</span>
            <span><%= odbNull(obdInfo.enginestringakeAirTemperature) %></span></li>
        <li><span>空调车内温度(℃)</span>
            <span><%= odbNull(obdInfo.airConditionTemperature) %></span></li>
        <li><span>电池当前电压(V)</span>
            <span><%= odbNull(obdInfo.batteryCurrentVoltage) %></span></li>
        <li><span>左前轮轮速(km/h)</span>
            <span><%= odbNull(obdInfo.leftFrontWheelSpeed) %></span></li>
        <li><span>右前轮轮速(km/h)</span>
            <span><%= odbNull(obdInfo.rightFrontWheelSpeed) %></span></li>
        <li><span>左后轮轮速(km/h)</span>
            <span><%= odbNull(obdInfo.leftRearWheelSpeed) %></span></li>
        <li><span>右后轮轮速(km/h)</span>
            <span><%= odbNull(obdInfo.rightRearWheelSpeed) %></span></li>
        <li><span>车速(km/h)</span>
            <span><%= odbNull(obdInfo.speed) %></span></li>
        <li><span>转速(rpm)</span>
            <span><%= odbNull(obdInfo.RPM) %></span></li>
        <li><span>机油寿命(%)</span>
            <span><%= odbNull(obdInfo.oilLifeTime) %></span></li>
        <li><span>机油压力(kPa)</span>
            <span><%= odbNull(obdInfo.oilPressure) %></span></li>
        <li><span>空气流量(g/s)</span>
            <span><%= odbNull(obdInfo.airFlow) %></span></li>
        <li><span>进气歧管绝对压力(kPa)</span>
            <span><%= odbNull(obdInfo.stringakeManifoldAbsolutePressure) %></span></li>
        <li><span>喷油脉宽(ms)</span>
            <span><%= odbNull(obdInfo.fuelInjectionPulseWidth) %></span></li>
        <li><span>油门踏板相对位置(%)</span>
            <span><%= odbNull(obdInfo.acceleratorPedalRelativePosition) %></span></li>
        <li><span>方向盘转角(°)</span>
            <span><%= odbNull(obdInfo.steeringWheelAngleOfRotation) %></span></li>
    </ul>
    <div class="obd-group">
        燃油
    </div>
    <ul>
        <li>
            <span>剩余油量(L)</span>
            <span><%= odbNull(obdInfo.fuelRemainL) %></span>
        </li>
        <li>
            <span>剩余油量(%)</span>
            <span><%= odbNull(obdInfo.fuelRemain) %></span>
        </li>
        <li>
            <span>单次用油量(ml)</span>
            <span><%= odbNull(obdInfo.singleFuelConsumption) %></span>
        </li>
        <li><span>平均油耗(L/100KM)</span>
            <span><%= odbNull(obdInfo.AverageFuelConsumption) %></span></li>
        <li>
            <span>瞬时油耗(L/100KM)</span>
            <span><%= odbNull(obdInfo.instantaneousFuelconsumption) %></span></li>
        <li>
            <span>瞬时油耗(L/H)</span>
            <span><%= odbNull(obdInfo.instantaneousFuelConsumptionLH) %></span></li>
    </ul>
    <div class="obd-group">
        驾驶数据
    </div>
    <ul>
        <li>
            <span>本次行驶里程(KM)</span>
            <span><%= odbNull(obdInfo.drivingMileage) %></span>
        </li>
        <li><span>本次急刹车</span>
            <span><%= odbNull(obdInfo.suddenBrake) %></span></li>
        <li><span>本次急转弯</span>
            <span><%= odbNull(obdInfo.sharpTurn) %></span></li>
        <li><span>本次急加速</span>
            <span><%= odbNull(obdInfo.quickAcceleration) %></span></li>
        <li><span>本次急减速</span>
            <span><%= odbNull(obdInfo.sharpDeceleration) %></span></li>
        <li><span>本次最高车速(KM)</span>
            <span><%= odbNull(obdInfo.highestSpeed) %></span></li>
        <li><span>本次最高转速(RPM)</span>
            <span><%= odbNull(obdInfo.highestEngineSpeed) %></span></li>
        <li><span>故障后行驶里程(KM)</span>
            <span><%= odbNull(obdInfo.drivingMileageAfterFaultsHappened) %></span></li>
        <li><span>当前车速(KM/H)</span>
            <span><%= odbNull(obdInfo.currentSpeed) %></span></li>
    </ul>
</div>