<div class="login-top">
    <div class="login-icon">卓越智驾</div>
    <div class="login-language">
        <div class="lang-item active" data-lang="zh">中文</div>
        <div class="lang-item" data-lang="en">English</div>
    </div>
</div>
<div class="login-body">
    <div class="login-center">
        <div id="imgSilder">
            <div id="slider">
                <a href="javascript:void(0)"><img src="<%= staticURL+'/img/1CAR.png' %>" /></a>
                <a href="javascript:void(0)"><img src="<%= staticURL+'/img/2MOTO.png' %>" /></a>
                <a href="javascript:void(0)"><img src="<%= staticURL+'/img/3NEWOBD.png' %>" /></a>
            </div>
        </div>
        <div id="login">
            <div id="header">
                登陆管理平台
            </div>
            <div id="content">
                <div class="layui-form auto-label-width">
                    <div class="layui-form-item">
                        <label class="layui-form-label">用户名</label>
                        <div class="layui-input-block">
                            <input class="layui-input" maxlength="20" name="username" required type="text" />
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">密&nbsp;&nbsp;&nbsp;码</label>
                        <div class="layui-input-block">
                            <input class="layui-input" maxlength="20" name="password" required type="password" />
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">类&nbsp;&nbsp;&nbsp;型</label>
                        <div class="layui-input-block">
                            <select name="userType">
                            <option value="1">个人账户</option>
                            <option value="2">企业账户</option>
                        </select>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <a class="login-btn js-login">登 陆</a>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <a class="login-forgetpwd">忘记密码?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="login-code">
    <span class="code">
        应用下载
    </span>
    <span class="code">
        公众号
    </span>
</div>
<div class="login-footer">
    <div class="item">
        <span>客服电话：0755-88277178</span>
        <span>企业邮箱：admin@etgps.cn</span>
        <span>版权所有：深圳市易特科技有限公司</span>
    </div>
    <div class="item">
        <span>@ 2016 itte.com 版权所有</span>
        <span>ICP证：粤B2-20140901</span>
    </div>
</div>

<!--<div id="logo-icon">
</div>
<div id="login">
    <div id="header">
        用户登录
    </div>
    <div id="content">
        <div class="group-row row-line">
            <label class="icon icon-user"></label>
            <input type="text" name="username" placeholder="请输入用户名" />
        </div>
        <div class="group-row row-line">
            <label class="icon icon-password"></label>
            <input type="password" name="password" placeholder="请输入密码" />
        </div>
        <div class="group-row">
            <a href="javascript:" class="login-btn" id="btn-login">
				登 录
			</a>
        </div>
        <div class="group-row">
            <label id="js_remember" class="remember-check"><span>记住我</span></label>
        </div>
    </div>
</div>-->