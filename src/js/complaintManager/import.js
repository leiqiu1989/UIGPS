define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('ajaxform');
    // 模板
    var tpls = {
        import: require('../../tpl/gpsDevice/import'),
        importList: require('../../tpl/gpsDevice/importList')
    };

    function GPSImport() {}

    $.extend(GPSImport.prototype, {
        init: function() {
            this.render();
            this.event();
        },
        render: function() {
            $('#main-content').html(template.compile(tpls.import));
        },
        event: function() {
            var me = this;
            $('#main-content').off()
                //返回
                .on('click', '.js_import_back', function() {
                    common.changeHash('#gpsDevice/index');
                })
                //下载模板
                .on('click', '.js_import_download', function() {
                    var url = window.DOMAIN + '/docTemplate/GPS设备导入模板.xls';
                    var downSrc = encodeURI(url);
                    $(this).attr('href', downSrc);
                })
                //校验
                .on('click', '.js_import_check', function() {
                    me.importFileAction(true);
                })
                //导入
                .on('click', '.js_import_import', function() {
                    me.importFileAction();
                });
        },
        importFileAction: function(ifcheck) {
            var url = ifcheck ? api.gpsDevice.checkFile : api.gpsDevice.importFile;
            var file = document.getElementById("importFile"); //文件路径
            if (!file.value.length) {
                common.toast('请选择文件');
                return false;
            }
            var suffix = file.value.substring(file.value.lastIndexOf('.')); //取得文件后缀
            if (suffix !== '.xls') {
                common.toast('请选择后缀为xls的电子表格文件');
                return false;
            }
            var st = common.getCookie('st');
            var sid = common.getCookie('sid');
            $(':hidden[name="st"]').val(st);
            $(':hidden[name="sid"]').val(sid);
            common.loading('show');
            $('#formImport').ajaxSubmit({
                type: 'POST',
                url: url,
                dataType: 'json',
                success: function(data) {
                    common.loading();
                    if (data.status == 'OK') {
                        if (!data.content.length) {
                            if (ifcheck) { //校验成功
                                common.toast('校验成功！可导入', 'success');
                                $('#importData').html('');
                                $('.js_import_import').removeClass('disabled');
                            } else { //上传成功
                                common.alert('数据添加成功', '', true, function() {
                                    common.changeHash('#gpsDevice/index');
                                });
                            }
                        } else {
                            common.toast('上传数据有错误');
                            $('#importData').html(template.compile(tpls.importList)(data));
                        }
                    } else {
                        if (data.errorCode == '120001' ||
                            data.errorCode == '120010' ||
                            data.errorCode == '120002' ||
                            data.errorCode == '50002') {
                            common.alert(data.errorMsg, 'error', true, function() {
                                common.clearData();
                                window.location.hash = '#login/login';
                            });
                        } else {
                            common.alert(data.errorMsg, 'error', true);
                        }
                    }
                }
            });
        }
    });
    var _GPSImport = new GPSImport();

    exports.init = function() {
        _GPSImport.init();
    };
});