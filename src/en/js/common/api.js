define(function(require, exports, module) {
    'use strict';

    // 测试地址
    var remoteUrl = 'http://120.25.212.193:8081';

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
        // 指令初始值
        directiveInfo: remoteUrl + '/command/param',
        // 里程设置
        setMilage: remoteUrl + '/Command/distance-set',
        // 灵敏度设置
        setSensitivity: remoteUrl + '/command/sensitivity-set',
        // 超速设置
        setSpeeding: remoteUrl + '/command/maxspeed-set',
        // 设防、撤防
        setSecurity: remoteUrl + '/command/security-set',
        // 油电打开、关闭
        setOilelectricity: remoteUrl + '/command/oilelectricity-set',
        // 围栏打开、关闭
        setArea: remoteUrl + '/command/area-enable',
        // 设置报警电话
        setNoticecenter: remoteUrl + '/command/noticecenter-change',
        // 区域查车
        areaQuery: remoteUrl + '/position/QueryVehicleByRectangle',
        // odb信息
        odbInfo: remoteUrl + '/obd/last',
        // 组织机构列表-tree
        subordinateTree: remoteUrl + '/ConditionInfo/OrgList',
        // 获取设备编号-select，根据所属机构编号
        getDevice: remoteUrl + '/ConditionInfo/DeviceNoList',
        // 获取车牌号码-select，根据所属机构编号
        getLienceList: remoteUrl + '/ConditionInfo/LicenseList',
        // 获取SIM卡号码-select，根据所属机构编号
        getSIMList: remoteUrl + '/ConditionInfo/SimList',
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
            submit: remoteUrl + '/Vehicle/CreateVehicleAbbrInfo', // 增加车辆
            detail: remoteUrl + '/Vehicle/QueryVehicleAbbrInfo', //查看车辆详情
            update: remoteUrl + '/Vehicle/EditVehicleAbbrInfo', //编辑车辆
            lastLocation: remoteUrl + '/vehicle/get-last-location',
            historyLocation: remoteUrl + '/vehicle/get-history-location',
            sendGPS: remoteUrl + '/web/cmd/send'
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
        },
        // 报表管理
        reportManager: {
            alarmReport: remoteUrl + '/alarm/report',
            obdReport: remoteUrl + '/obd/report',
            mileageReport: remoteUrl + '/position/report'
        },
        // 发票管理
        invoiceManager: {
            list: remoteUrl + '/Invoice/QueryInvoiceList',
            openInvoice: remoteUrl + '/Invoice/OpenInvoice',
            export: remoteUrl + '/Invoice/Export'
        },
        // 服务到期管理
        serverDueManager: {
            list: remoteUrl + '/Simcard/QuerySimcardList',
            export: remoteUrl + '/Simcard/Export'
        },
        // 续费记录管理
        renewLogManager: {
            list: remoteUrl + '/Recharge/QueryRechargeList',
            export: remoteUrl + '/Recharge/Export'
        },
        // 系统日志
        systemLogManager: {
            list: remoteUrl + '/log/list'
        }
    };
    return api;
});