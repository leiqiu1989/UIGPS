<div id="obdStatus" class="hidden">
    <ul>
        <li>
            <span>Lamp Status(high beam)</span>
            <span><%= odbNull(obdStatus.highBeam) %></span>
        </li>
        <li><span>Lamp Status(low beam)</span>
            <span><%= odbNull(obdStatus.lowBeam) %></span></li>
        <li><span>Lamp Status(width lamp)</span>
            <span><%= odbNull(obdStatus.widthLamp) %></span></li>
        <li><span>Lamp Status(foglight)</span>
            <span><%= odbNull(obdStatus.foglight) %></span></li>
        <li><span>Lamp Status(left-turn signal)</span>
            <span><%= odbNull(obdStatus.leftTurnSignal) %></span></li>
        <li><span>Lamp Status(right-turn signal)</span>
            <span><%= odbNull(obdStatus.rightTurnSignal) %></span></li>
        <li><span>Lamp Status(hazard light)</span>
            <span><%= odbNull(obdStatus.hazardLight) %></span></li>
        <li><span>Door Status(left front door)</span>
            <span><%= odbNull(obdStatus.leftFrontDoor) %></span></li>
        <li><span>Door Status(right front door)</span>
            <span><%= odbNull(obdStatus.rightFrontDoor) %></span></li>
        <li><span>Door Status(left rear door)</span>
            <span><%= odbNull(obdStatus.leftRearDoor) %></span></li>
        <li><span>Door Status(right rear door)</span>
            <span><%= odbNull(obdStatus.rightRearDoor) %></span></li>
        <li><span>Door Status(trunk)</span>
            <span><%= odbNull(obdStatus.trunk) %></span></li>
        <li><span>Door Lock(whole car)</span>
            <span><%= odbNull(obdStatus.wholeCar) %></span></li>
        <li><span>Door Lock(left front door)</span>
            <span><%= odbNull(obdStatus.lockLeftFrontDoor) %></span></li>
        <li><span>Door Lock(right front door)</span>
            <span><%= odbNull(obdStatus.lockRightFrontDoor) %></span></li>
        <li><span>Door Lock(left rear door)</span>
            <span><%= odbNull(obdStatus.lockLeftRearDoor) %></span></li>
        <li><span>Door Lock(right rear door)</span>
            <span><%= odbNull(obdStatus.lockRightRearDoor) %></span></li>
        <li><span>Door Lock(trunk)</span>
            <span><%= odbNull(obdStatus.LockTrunk) %></span></li>
        <li><span>Window Status(left front window)</span>
            <span><%= odbNull(obdStatus.leftFrontWindow) %></span></li>
        <li><span>Window Status(right front window)</span>
            <span><%= odbNull(obdStatus.rightFrontWindow) %></span></li>
        <li><span>Window Status(left rear window)</span>
            <span><%= odbNull(obdStatus.leftRearWindow) %></span></li>
        <li><span>Window Status(right rear window)</span>
            <span><%= odbNull(obdStatus.rightRearWindow) %></span></li>
        <li><span>Window Status(skylight)</span>
            <span><%= odbNull(obdStatus.skylight) %></span></li>
        <li><span>Fault Signal(ECM)</span>
            <span><%= odbNull(obdStatus.ECM) %></span></li>
        <li><span>Fault Signal(ABS)</span>
            <span><%= odbNull(obdStatus.ABS) %></span></li>
        <li><span>Fault Signal(SRS)</span>
            <span><%= odbNull(obdStatus.SRS) %></span></li>
        <li><span>Alarm Signal(engine oil)</span>
            <span><%= odbNull(obdStatus.engineOil) %></span></li>
        <li><span>Alarm Signal(tire pressure)</span>
            <span><%= odbNull(obdStatus.tirePressure) %></span></li>
        <li><span>Alarm Signal(maintenance)</span>
            <span><%= odbNull(obdStatus.mastringenance) %></span></li>
        <li><span> SRS Status</span>
            <span><%= odbNull(obdStatus.srsStatus) %></span></li>
        <li><span>Hand Brake Status</span>
            <span><%= odbNull(obdStatus.handBrakeStatus) %></span></li>
        <li><span>Foot Brake Status</span>
            <span><%= odbNull(obdStatus.footBrakeStatus) %></span></li>
        <li><span>Safety Belt(driver)</span>
            <span><%= odbNull(obdStatus.safetyBeltDriver) %></span></li>
        <li><span>Safety Belt(copilot)</span>
            <span><%= odbNull(obdStatus.safetyBeltCopilot) %></span></li>
        <li><span>ACC Signal</span>
            <span><%= odbNull(obdStatus.ACC) %></span></li>
        <li><span>Key Status</span>
            <span><%= odbNull(obdStatus.keyStatus) %></span></li>
        <li><span>Remote Status</span>
            <span><%= odbNull(obdStatus.remoteStatus) %></span></li>
        <li><span>Wiper Status</span>
            <span><%= odbNull(obdStatus.wiperStatus) %></span></li>
        <li><span>Air Conditioner Swtich</span>
            <span><%= odbNull(obdStatus.airConditionerSwtich) %></span></li>
        <li><span>Gear</span>
            <span><%= odbNull(obdStatus.Gear) %></span></li>
        <li><span>accelerator pedal status</span>
            <span><%= odbNull(obdStatus.acceleratorPedalStatus) %></span></li>
        <li><span>steering wheel angle status</span>
            <span><%= odbNull(obdStatus.steeringWheelAngleStatus) %></span></li>
    </ul>
</div>
<div id="obdInfo">
    <ul>
        <li>
            <span>The Number of Fault</span>
            <span><%= odbNull(obdInfo.theNumberOfFault) %></span>
        </li>
        <li><span>Fault Code</span>
            <span><%= odbNull(obdInfo.faultCode) %></span></li>
    </ul>
    <div class="obd-group">
        Vehicle
    </div>
    <ul>
        <li>
            <span>Total Mileage(km)</span>
            <span><%= odbNull(obdInfo.totalMileage) %></span>
        </li>
        <li><span>Driving Mileage(km)</span>
            <span><%= odbNull(obdInfo.drivingMileageKM) %></span></li>
        <li><span>Water Temperature(engine coolant℃)</span>
            <span><%= odbNull(obdInfo.waterTemperature) %></span></li>
        <li><span>engine intake air temperature(℃)</span>
            <span><%= odbNull(obdInfo.enginestringakeAirTemperature) %></span></li>
        <li><span>Air-condition temperature(℃)</span>
            <span><%= odbNull(obdInfo.airConditionTemperature) %></span></li>
        <li><span>battery current voltage(V)</span>
            <span><%= odbNull(obdInfo.batteryCurrentVoltage) %></span></li>
        <li><span>left front wheel speed(km/h)</span>
            <span><%= odbNull(obdInfo.leftFrontWheelSpeed) %></span></li>
        <li><span>right front wheel speed(km/h)</span>
            <span><%= odbNull(obdInfo.rightFrontWheelSpeed) %></span></li>
        <li><span>left rear wheel speed(km/h)</span>
            <span><%= odbNull(obdInfo.leftRearWheelSpeed) %></span></li>
        <li><span>right rear wheel speed(km/h)</span>
            <span><%= odbNull(obdInfo.rightRearWheelSpeed) %></span></li>
        <li><span>speed(km/h)</span>
            <span><%= odbNull(obdInfo.speed) %></span></li>
        <li><span>RPM(rpm)</span>
            <span><%= odbNull(obdInfo.RPM) %></span></li>
        <li><span>Oil Life Time(%)</span>
            <span><%= odbNull(obdInfo.oilLifeTime) %></span></li>
        <li><span>Oil Pressure(kPa)</span>
            <span><%= odbNull(obdInfo.oilPressure) %></span></li>
        <li><span>air flow(g/s)</span>
            <span><%= odbNull(obdInfo.airFlow) %></span></li>
        <li><span>intake manifold absolute pressure(kPa)</span>
            <span><%= odbNull(obdInfo.stringakeManifoldAbsolutePressure) %></span></li>
        <li><span>fuel injection pulse width(ms)</span>
            <span><%= odbNull(obdInfo.fuelInjectionPulseWidth) %></span></li>
        <li><span>accelerator pedal relative position(%)</span>
            <span><%= odbNull(obdInfo.acceleratorPedalRelativePosition) %></span></li>
        <li><span>steering wheel angle of rotation(°)</span>
            <span><%= odbNull(obdInfo.steeringWheelAngleOfRotation) %></span></li>
    </ul>
    <div class="obd-group">
        Fuel
    </div>
    <ul>
        <li>
            <span>Fuel Remain(L)</span>
            <span><%= odbNull(obdInfo.fuelRemainL) %></span>
        </li>
        <li>
            <span>Fuel Remain(%)</span>
            <span><%= odbNull(obdInfo.fuelRemain) %></span>
        </li>
        <li>
            <span>single fuel consumption(ml)</span>
            <span><%= odbNull(obdInfo.singleFuelConsumption) %></span>
        </li>
        <li><span>Average fuel consumption(L/100KM)</span>
            <span><%= odbNull(obdInfo.AverageFuelConsumption) %></span></li>
        <li>
            <span>instantaneous fuel consumption (L/100KM)</span>
            <span><%= odbNull(obdInfo.instantaneousFuelconsumption) %></span></li>
        <li>
            <span>instantaneous fuel consumption(L/H)</span>
            <span><%= odbNull(obdInfo.instantaneousFuelConsumptionLH) %></span></li>
    </ul>
    <div class="obd-group">
        Driving Data
    </div>
    <ul>
        <li>
            <span>Driving Mileage(KM)</span>
            <span><%= odbNull(obdInfo.drivingMileage) %></span>
        </li>
        <li><span>Sudden Brake</span>
            <span><%= odbNull(obdInfo.suddenBrake) %></span></li>
        <li><span>Sharp Turn</span>
            <span><%= odbNull(obdInfo.sharpTurn) %></span></li>
        <li><span>本次急加速</span>
            <span><%= odbNull(obdInfo.quickAcceleration) %></span></li>
        <li><span>Rapid Acceleration</span>
            <span><%= odbNull(obdInfo.sharpDeceleration) %></span></li>
        <li><span>Highest Speed(KM)</span>
            <span><%= odbNull(obdInfo.highestSpeed) %></span></li>
        <li><span>Highest Engine Speed(RPM)</span>
            <span><%= odbNull(obdInfo.highestEngineSpeed) %></span></li>
        <li><span>Driving Mileage After Faults Happened(KM)</span>
            <span><%= odbNull(obdInfo.drivingMileageAfterFaultsHappened) %></span></li>
        <li><span>Current Speed(KM/H)</span>
            <span><%= odbNull(obdInfo.currentSpeed) %></span></li>
    </ul>
</div>