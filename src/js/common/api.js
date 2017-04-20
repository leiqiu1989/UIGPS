define(function(require, exports, module) {
    'use strict';

    var remoteUrl = 'http://120.25.212.193:8081';
    // 正式接口地址
    // var remoteUrl = 'http://192.168.1.21:8080';

    /*接口API*/
    var api = {
        // 按钮编码
        btnCodes: {
            carManager: {
                add: '00013',
                edit: '00014',
                del: '00015'
            }
        },
        //登录
        login: remoteUrl + '/Account/Login',
        // 修改密码
        modifypwd: remoteUrl + '/Account/ModifyPwd',
        // 组织树
        vehicleList: remoteUrl + '/Home/QueryZtree',
        // 获取车辆监控列表
        carPositionList: remoteUrl + '/Position/QueryLastPosition',
        // 获取车辆轨迹列表
        carTrackHistory: remoteUrl + '/Position/QueryHistory',
        // 历史位置查询
        historyQuery: remoteUrl + '/Position/QueryAcrossHistory',
        // 用户权限
        userPermission: remoteUrl + '/Role/QueryAccountPermission',
        // 发送指令
        sendCode: remoteUrl + '/Command/SendGeneralByVid',
        // 区域查车
        areaQuery: remoteUrl + '/position/QueryVehicleByRectangle',
        // odb信息
        odbInfo: remoteUrl + '/obd/last',
        // 车辆管理
        carManager: {
            list: remoteUrl + '/Vehicle/QueryAllVehicleAbbrInfo', //车辆管理列表
            exportCarList: remoteUrl + '/vehicle/get-vehicle-list-export',
            orgList: remoteUrl + '/Home/QueryOrgZtree', //获取组织树结构
            delete: remoteUrl + '/Vehicle/DeleteVehicleAbbrInfo', //删除车辆
            carType: remoteUrl + '/Vehicle/VehicleType', //车辆类型
            carBrand: remoteUrl + '/Vehicle/VehicleBrand', //车辆品牌
            plateNumberColor: remoteUrl + '/Vehicle/VehicleColor', //车牌颜色
            equipmentType: remoteUrl + '/Vehicle/EquipmentType', //设备类型
            carDriverList: remoteUrl + '/driver/get-drivers-by-orgid',
            checkGPS: remoteUrl + '/avl/check-gpsno',
            submit: remoteUrl + '/Vehicle/CreateVehicleAbbrInfo', // 增加车辆
            detail: remoteUrl + '/Vehicle/QueryVehicleAbbrInfo', //查看车辆详情
            update: remoteUrl + '/Vehicle/EditVehicleAbbrInfo', //编辑车辆
            lastLocation: remoteUrl + '/vehicle/get-last-location',
            historyLocation: remoteUrl + '/vehicle/get-history-location',
            alarmList: remoteUrl + '/alarm/get-alarm-event-by-gpsno',
            checkImportFile: remoteUrl + '/vehicle/check-import-data',
            importData: remoteUrl + '/vehicle/import-data',
            sendGPS: remoteUrl + '/web/cmd/send',
            getGPSNumByOrgId: remoteUrl + '/avl/info/get-avlinfo-list-by-orgid'
        },
        // 订单管理
        orderManager: {
            list: remoteUrl + '/Order/QueryAllOrder',
        },
        // 投诉管理
        complaintManager: {
            list: remoteUrl + '/Complaint/GetAll', //列表
            export: remoteUrl + '/avl/get-avl-info-list-export', //导出列表
        },
        // 用户管理
        userManager: {
            list: remoteUrl + '/sys/user/get-sys-user-page', // 列表
            add: remoteUrl + '/sys/user/save-sys-user', // 添加
            stop: remoteUrl + '/sys/user/disable-sys-user', // 停用
            active: remoteUrl + '/sys/user/active-sys-user', // 启用
            checkUserName: remoteUrl + '/sys/user/get-employee-info' //查询员工信息
        },
        deviceFault: {
            list: remoteUrl + '/web/device/fault-list',
            exportList: remoteUrl + '/web/device/exprot-fault-list',
            detail: remoteUrl + '/web/device/fault-info',
            processDeviceFault: remoteUrl + '/web/device/operate-fault',
            summaryCount: remoteUrl + '/web/device/count-fault'
        },
        tplManager: {
            list: remoteUrl + '/web/contract/template-list', // 获取模板列表
            enabledTpl: remoteUrl + '/web/contract/enabled-template', // 启用or禁用模板
            basicTplList: remoteUrl + '/web/contract/basic-templates', // 获取基础模板列表
            basicTplDetail: remoteUrl + '', // 获取基础模板详情
            detail: remoteUrl + '/web/contract/template-detail' // 模板详情
        },
        //车辆订单配置模块
        orderConfig: {
            list: remoteUrl + '/VehicleOrderType/QueryAllVehicleOrderTypeInfo', //列表
            editVehicleOrder: remoteUrl + '/VehicleOrderType/EditVehicleOrderTypeInfo', //对车辆可接收的订单信息进行配置 
            queryVehicelOrder: remoteUrl + '/VehicleOrderType/QueryVehicleOrderTypeInfoByVid' //根据车辆vid编号获取车辆详情 
        },
        //坐席管理
        seatsManager: {
            list: remoteUrl + '/SpeetChart/List', //列表
            changeStatus: remoteUrl + '/SpeetChart/ChangeStatus', //坐席管理-启用/禁用
            detail: remoteUrl + '/SpeetChart/GetModelById', //详情
            update: remoteUrl + '/SpeetChart/Update' //编辑
        },
        //角色管理
        roleManager: {
            list: remoteUrl + '/Role/QueryAllRole', //列表
            createRole: remoteUrl + '/Role/CreateRole', //新增角色
            editRole: remoteUrl + '/Role/EditRole', //编辑角色
            roleDetail: remoteUrl + '/Role/QueryByRoleId', //角色详情
            deleteRole: remoteUrl + '/Role/DeleteRole', //角色管理-删除 批量、单个
            rolePermission: remoteUrl + '/Role/QueryAllPermission' //角色管理-系统功能Ztree
        },
        // 用户管理
        userManager: {
            list: remoteUrl + '/Org/List',
            save: remoteUrl + '/Org/Create',
            update: remoteUrl + '/Org/Edit',
            roles: remoteUrl + '/Role/QuertAllRoleAbbr',
            del: remoteUrl + '/Org/Delete',
            detail: remoteUrl + '/Org/QueryOrgByOrgId'
        },
        // 地标点管理
        landMarkPointManager: {
            list: remoteUrl + '/LandMark/QueryAllLandMark',
            add: remoteUrl + '/LandMark/Create',
            update: remoteUrl + '/LandMark/Edit',
            del: remoteUrl + '/LandMark/Delete',
            detail: remoteUrl + '/LandMark/QueryDetailById'
        }
    };
    return api;
});