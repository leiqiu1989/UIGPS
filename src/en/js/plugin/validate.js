define(function(require, exports, module) {
    /**
     * 验证插件
     * @constructor
     * @param {node}        el                  container node
     * @param {Object}      opts                参数集合
     * @param {node}        opts.subBtn         触发校验元素
     * @param {Boolean}     opts.blurTrigger    是否失去焦点时校验
     * @param {string}      opts.promptPos      错误提示 inline
     * @param {Function}    opts.submit         验证通过回调
     * @param {Boolean}     opts.filterEmptyValue   submit返回的data是否过滤为空的值
     */
    function Validate(el, opts) {
        if (!(this instanceof arguments.callee)) {
            return new Validate(el, opts);
        }

        this.opts = $.extend(true, {
            subBtn: '[type=submit]',
            subBtnWrap: true,
            blurTrigger: false,
            promptPos: 'inline',
            submit: $.noop,
            filterEmptyValue: true,
            reg: {
                tel: /^1\d{10}$/,
                phone: /^0\d{2,3}-\d{7,8}$/,
                amount: /^\d+(\.\d+)?$/,
                integer: /^\d*$/,
                number: /^\d+(\.\d{1,2})?$/,
                notAllNumber: /\D+/,
                email: /^.+@.+\..+$/,
                realName: /^[\u4e00-\u9fa5_a-zA-Z]+$/,
                url: /^https?/,
                idCard: /(^\d{15}$)|(^\d{17}(\d|X)$)/i
            },
            errorMsg: {
                required: 'Not null',
                min: 'Not less than',
                max: 'Not more than',
                groupRequired: 'Required one',
                checkbox: 'Please select',
                tel: 'Please enter the correct cell phone number',
                phone: 'Please enter the correct telephone number',
                equals: 'Input is inconsistent',
                amount: 'Please enter the correct amount',
                integer: 'Please enter an integer',
                number: 'Please enter a number, Max two decimal point',
                notAllNumber: 'Not all numbers',
                email: 'Please enter the correct email',
                realName: 'Only English or Chinese',
                url: 'Please enter the correct url',
                idCard: 'Please enter the correct id card'
            },
            // 校验时需要在错误信息里增加label内容的规则
            labelReg: ['notAllNumber', 'integer', 'number']
        }, $.validateSetting, opts);

        this.el = $(el);
        this.subBtn = this.opts.subBtnWrap ? this.el.find(this.opts.subBtn) : $(this.opts.subBtn);
        this.inputs = this.el.find('input, select, textarea');
        this.promptPos = this.opts.promptPos;
        this.submitCb = this.opts.submit;

        this.init();
    }

    Validate.prototype = {
        init: function() {
            var self = this;

            self.formdata = {};

            self.subBtn.on('click.vd', function() {
                self.formdata = {};
                self.checkForm();
            });

            if (this.opts.blurTrigger) {
                this.inputs.on('blur.vd', function() {
                    self._isSubmit = false;
                    self._validate($(this));
                });
            }
        },
        checkForm: function() {
            var self = this;

            this.el.find('.error-tips').remove();

            this.inputs.each(function() {
                self._isSubmit = true;
                self._validate($(this));
            });

            var formdata = $.extend({}, this.formdata);

            if (!this.el.find('.input-error').length) {
                this.submitCb.call(this, formdata);
                this.el.data('done') && this.el.trigger('done', formdata);
            }
        },

        _validate: function(input) {
            var self = this;
            var opts = this.opts;
            var errorMsg = opts.errorMsg;
            var value = $.trim(input.val());
            var type = input.data('type');
            var inputType = input[0].type;
            var inputName = input.attr('name');
            var reg = opts.reg[type];
            var max = parseFloat(input.attr('max'));
            var min = parseFloat(input.attr('min'));
            var hasLabel = $.inArray(type, self.opts.labelReg) >= 0 ? true : false;

            self.getErrorEl(input).removeClass('input-error');
            self.getErrorEl(input).parent().find('.error-tips').remove();

            // 当有vingore时排除以下情况 进行校验
            // 排除type为hidden的input
            // 排除不可见的元素
            // 排除disabled的元素
            if (!self.hasAttr(input, 'vingore') && (input.attr('type') == 'hidden' || input.is(':hidden') || input.prop('disabled'))) return;

            if (self.hasAttr(input, 'required')) {
                if (inputType == 'checkbox') {
                    // TODO checkbox required

                    if (inputName) {
                        if (self.inputs.filter('[name="' + inputName + '"]').last().is(input) && !self.formdata[inputName]) {
                            return self.addError(input, errorMsg.checkbox, true);
                        }

                        if (input.prop('checked')) {
                            self.formdata[inputName] && (value = self.formdata[inputName] + ',' + value);
                        } else {
                            return;
                        }
                    } else if (!input.prop('checked')) {
                        return self.addError(input, errorMsg.checkbox, true);
                    }
                } else {
                    if (!value) {
                        return self.addError(input, errorMsg.required, true);
                    }
                }
            }

            if (self.hasAttr(input, 'group-required')) {
                var groupName = input.attr('group-required');
                var $group = self.el.find('[group-required="' + groupName + '"]');
                var $groupFirst = $group.eq(0);
                var groupTips = $group.map(function() { return $(this).prev().length ? ($.trim($(this).prev().text()) || null) : null });

                if (!$group.filter(function() { return this.value }).length) {
                    if (!$groupFirst.hasClass('input-error')) {
                        return self.addError($groupFirst, (groupTips.length ? Array.prototype.slice.call(groupTips, 0).join('和') : '') + errorMsg.groupRequired, false);
                    }
                } else {
                    !$groupFirst.val() && $groupFirst.removeClass('input-error').parent().find('.error-tips').remove();
                }
            }

            // 规则校验
            if (reg && value && !($.isFunction(reg) ? reg(value) : reg.test(value))) {
                return self.addError(input, errorMsg[type], hasLabel, 1);
            }

            // 最小值校验
            if (min && parseFloat(value) < min) {
                return self.addError(input, errorMsg.min + min, hasLabel, 1);
            }

            // 最大值校验
            if (max && parseFloat(value) > max) {
                return self.addError(input, errorMsg.max + max, hasLabel, 1);
            }

            // 密码验证
            if (self.hasAttr(input, 'equals')) {
                var equalsval = $('[name="' + input.attr('equals') + '"]').val();

                if (value && value != equalsval) {
                    return self.addError(input, errorMsg.equals, true, 1);
                }
            }

            // 规则通过，设值
            if (inputName) {
                if (inputType == 'radio' && !input.prop('checked')) return;

                if (opts.filterEmptyValue) {
                    value !== '' && (self.formdata[inputName] = value)
                } else {
                    self.formdata[inputName] = value
                }
            }
        },

        _resetError: function() {
            this.el.find('.input-error').removeClass('input-error');
            this.el.find('.error-tips').remove();
        },

        // 处理错误逻辑
        addError: function(ele, msg, hasLabel, isRule) {
            var label = hasLabel ? (ele.prev().length ? $.trim(ele.prev().text()).replace(/\：/g, '') : '') : '';
            var errorEl = this.getErrorEl(ele);
            var tips = ele.siblings('.validate-tips');
            var dataMsg = (errorEl.data('msg') || '').split('|');
            var msg = dataMsg[0] ?
                (isRule && this.hasAttr(ele, 'required') ? dataMsg[1] : dataMsg[0]) :
                ((tips.length && tips.data('msg')) ? tips.data('msg') : (label + msg));

            var htmls = '<i class="error-tips">' + msg + '</i>';

            var promptPos = this.promptPos;

            errorEl.addClass('input-error');

            if (tips.length) {
                tips.append(htmls);
            } else {
                errorEl.after(htmls);
            }
        },

        // 获取添加error class的元素
        getErrorEl: function(ele) {
            var target = ele.data('target');
            var errorSelector = ele.attr('errorselector');

            return target ? target : (errorSelector ? $(errorSelector) : ele);
        },

        hasAttr: function(ele, attribute) {
            return typeof ele.attr(attribute) !== 'undefined';
        },

        done: function(callback) {
            var self = this;

            self.el.on('done', function(e, data) {
                $.isFunction(callback) && callback.call(self, data);
            }).data('done', true);
        },

        destroy: function() {
            this.subBtn.off('.vd');
            this.inputs.off('.vd');
            this.el.off('.vd');
            this._resetError();
        }
    }

    module.exports = Validate;
});