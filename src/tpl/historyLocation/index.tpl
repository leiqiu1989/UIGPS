<div class="panel panel-transparent no-margin full">
    <div class="panel-heading">
        <h3 class="panel-title">
            历史位置查询
        </h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <div class="col-sm-4">
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading clearfix">
                        <h3 class="panel-title pull-left">
                            区域1
                        </h3>
                        <div class="pull-right">
                            <a class="layui-btn layui-btn-small layui-btn-normal js-clear-overlay">清空所有数据</a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="layui-form auto-label-width">
                            <div class="layui-form-row clearfix">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">最小经度</label>
                                    <div class="layui-input-block">
                                        <input type="text" autocomplete="off" class="layui-input js-firstPoint" disabled />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">最小维度</label>
                                    <div class="layui-input-block">
                                        <input type="text" autocomplete="off" class="layui-input js-firstPoint" disabled />
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-row clearfix">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">最大经度</label>
                                    <div class="layui-input-block">
                                        <input type="text" autocomplete="off" class="layui-input js-firstPoint" disabled />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">最大维度</label>
                                    <div class="layui-input-block">
                                        <input type="text" autocomplete="off" class="layui-input js-firstPoint" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading clearfix">
                        <h3 class="panel-title pull-left w-150">
                            区域2
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class="layui-form auto-label-width">
                            <div class="layui-form-row clearfix">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">最小经度</label>
                                    <div class="layui-input-block">
                                        <input type="text" autocomplete="off" class="layui-input js-secondPoint" disabled />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">最小维度</label>
                                    <div class="layui-input-block">
                                        <input type="text" autocomplete="off" class="layui-input js-secondPoint" disabled />
                                    </div>
                                </div>
                            </div>
                            <div class="layui-form-row clearfix">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">最大经度</label>
                                    <div class="layui-input-block">
                                        <input type="text" autocomplete="off" class="layui-input js-secondPoint" disabled />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">最大维度</label>
                                    <div class="layui-input-block">
                                        <input type="text" autocomplete="off" class="layui-input js-secondPoint" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            时间
                        </h3>
                    </div>
                    <div class="panel-body">
                        <div class="layui-form auto-label-width">
                            <div class="layui-form-row clearfix">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">开始时间</label>
                                    <div class="layui-input-block">
                                        <input type="text" name="startDate" autocomplete="off" class="layui-input" />
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">结束时间</label>
                                    <div class="layui-input-block">
                                        <input type="text" name="endDate" autocomplete="off" class="layui-input" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-transparent no-margin">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="col-sm-offset-4 col-sm-8">
                                    <button class="layui-btn layui-btn-small layui-btn-normal w-200 js-search">查 询</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div id="historyMap" class="full"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="historyLocList">
                    <div class="panel full no-margin flexbox">
                        <div class="grid ">
                            <div class="table-head ">
                                <div class="table-head-warp ">
                                    <table class="grid-table ">
                                        <colgroup>
                                            <col width="80px" />
                                            <col width="20%" />
                                            <col width="30%" />
                                            <col width="30%" />
                                            <col width="10%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>车牌号码</th>
                                                <th>在区域1的时间</th>
                                                <th>在区域2的时间</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body no-padding grow ">
                            <div id="historyLocationList" class="grid-content">
                                <table class="grid-table ">
                                    <colgroup>
                                        <col width="80px" />
                                        <col width="20%" />
                                        <col width="30%" />
                                        <col width="30%" />
                                        <col width="10%" />
                                    </colgroup>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>