define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('ajaxform');
    // 模板
    var tpls = {
        carImport: require('../../tpl/carManager/import'),
        carImportData: require('../../tpl/carManager/importlist')
    };

    function carImport() {}
    $.extend(carImport.prototype, {
        init: function() {
            $('#main-content').empty().html(template.compile(tpls.carImport)());
            this.event();
        },
        ImportFileData: function(hasCheckData, callback) {
            var url = hasCheckData ? api.carManager.checkImportFile :
                api.carManager.importData;
            var orgid = $(':hidden[name="orgId"]').val();
            var st = common.getCookie('st');
            var sid = common.getCookie('sid');
            $(':hidden[name="st"]').val(st);
            $(':hidden[name="sid"]').val(sid);
            if (!orgid) {
                common.toast('数据所属机构不能为空！');
                return false;
            }
            // 文件检查
            var file = document.getElementById('importFile'); //文件路径
            if (!file.value) {
                common.toast('请选择文件');
                return false;
            }
            var suffix = file.value.substring(file.value.lastIndexOf('.')); //取得文件后缀
            if (suffix != '.xls') {
                common.toast('请选择后缀名为xls的电子表格文件');
                return false;
            }
            common.loading('show');
            $('#frmImprot').ajaxSubmit({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function(res) {
                    if (res.status === 'OK') {
                        var data = res.content;
                        if (data.length < 1) {
                            if (hasCheckData) {
                                $('.js_import_import').removeClass('disabled');
                                common.toast('数据校验成功,请导入数据！', 'success');
                            } else {
                                callback && callback();
                            }
                        } else {
                            $('#importData').empty().html(template.compile(tpls.carImportData)({
                                data: data
                            }));
                        }
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                }
            });
        },
        event: function() {
            var me = this;
            // 取消回车表单form提交
            $('#frmImprot').on('keydown', 'input[name="orgName"]', function(e) {
                var code = e.which || e.keyCode;
                if (code == 13) {
                    return false;
                }
            });
            // 所属机构事件监听
            common.listenOrganization();
            $('#carImport')
                .on('click', '.js_import_back', function() {
                    common.changeHash('#carManager/index');
                })
                .on('click', '.js_import_download', function() {
                    var url = window.DOMAIN + '/docTemplate/车辆导入模板.xls';
                    var downSrc = encodeURI(url);
                    $(this).attr('href', downSrc);
                })
                .on('click', '.js_import_check', function() {
                    me.ImportFileData(true);
                })
                .on('click', '.js_import_import', function() {
                    me.ImportFileData(false, function() {
                        common.toast('数据导入成功！', 'success');
                        return false;
                    });
                });
        }
    });
    var _carImport = new carImport();

    exports.init = function(param) {
        _carImport.init();
    };
});