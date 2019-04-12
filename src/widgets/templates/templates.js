const TEMPLATES = [
    {
        id: '头部',
        html: `<section class="tpl-header widget-component-wrapper">
            <select>
                <option value="头部" selected="selected">头部</option>
                <option value="标题">标题</option>
                <option value="摘要">摘要</option>
                <option value="声明">声明</option>
                <option value="栏目">栏目</option>
                <option value="公司股票">公司股票</option>
                <option value="结束语">结束语</option>
                <option value="尾部">尾部</option>
            </select>

            <div class="header-wrapper tpl-dashed-border" style="overflow:hidden;">
                <div style="float: left;margin-top: 12px;" class="editable-img">
                    <img src="{headerLogo}" title="{headerTitle}" width="130"/>
                </div>

                <div style="float: right;margin-top: 15px;" class="editable-inline">
                    <div class="tpl-type">{templateType}</div>
                    <p style="margin: 0"><span>{date}</span></p>
                </div>
            </div>
        </section>`
    },
    {
        id: '标题',
        html: `
            <section class="tpl-title widget-component-wrapper {className}" width={width}>
                <select>
                    <option value="头部">头部</option>
                    <option value="标题" selected="selected">标题</option>
                    <option value="摘要">摘要</option>
                    <option value="声明">声明</option>
                    <option value="栏目">栏目</option>
                    <option value="公司股票">公司股票</option>
                    <option value="结束语">结束语</option>
                    <option value="尾部">尾部</option>
                </select>

                <div class="tpl-dashed-border">
                    <h1 class="summary-title">{titleName}</h1>
                </div>
            </section>
        `
    },
    {
        id: '声明',
        html: `
            <section class="tpl-statement widget-component-wrapper">
                <select>
                    <option value="头部">头部</option>
                    <option value="标题">标题</option>
                    <option value="摘要">摘要</option>
                    <option value="声明" selected="selected">声明</option>
                    <option value="栏目">栏目</option>
                    <option value="公司股票">公司股票</option>
                    <option value="结束语">结束语</option>
                    <option value="尾部">尾部</option>
                </select>

                <div class="tpl-dashed-border">
                    <h2>{widgetTitle}</h2>
                    <div class="divider-line"></div>
                    <div class="editable-content-wrapper">
                        <div class="editable-content"></div>
                    </div>
                </div>
            </section>
        `
    },
    {
        id: '栏目',
        html: `
            <section class="tpl-column widget-component-wrapper">
                <select>
                    <option value="头部">头部</option>
                    <option value="标题">标题</option>
                    <option value="摘要">摘要</option>
                    <option value="声明" selected="selected">声明</option>
                    <option value="栏目">栏目</option>
                    <option value="公司股票">公司股票</option>
                    <option value="结束语">结束语</option>
                    <option value="尾部">尾部</option>
                </select>

                <div class="tpl-dashed-border">
                    <h2>{widgetTitle}</h2>
                    <div class="divider-line"></div>
                    <div class="editable-content-wrapper">
                        <div class="editable-content"></div>
                    </div>
                </div>
            </section>
        `
    },
    {
        id: '公司股票',
        html: `
            <section class="widget-component-wrapper">
                <select>
                    <option value="头部">头部</option>
                    <option value="标题">标题</option>
                    <option value="摘要">摘要</option>
                    <option value="声明">声明</option>
                    <option value="栏目">栏目</option>
                    <option value="公司股票" selected="selected">公司股票</option>
                    <option value="结束语">结束语</option>
                    <option value="尾部">尾部</option>
                </select>

                <div class="editable-content-wrapper tpl-dashed-border">
                    <div class="editable-content"></div>
                </div>
            </section>
        `
    },
    {
        id: '摘要',
        html: `
            <section class="widget-component-wrapper {className}" width="{width}">
                <select>
                    <option>摘要</option>
                </select>

                <div class="editable-content-wrapper tpl-dashed-border">
                    <div class="editable-content">
                        <h3>{titleName}</h3>
                    </div>
                </div>
            </section>
        `
    }, 
    {
        id: '股价',
        html: `
            <section class="widget-component-wrapper {className}" width="{width}">
                <select>
                    <option value="股价">股价</option>
                </select>

                <div class="tpl-dashed-border"><h3>{titleName}</h3></div>
            </section>
        `
    },
    {
        id: '作者',
        html: `
            <section class="widget-component-wrapper {className}" width="{width}">
                <select>
                    <option value="作者">作者</option>
                </select>

                <div class="editable-content-wrapper tpl-dashed-border">
                    <div class="editable-content">
                        <div class="content-wrapper">
                            <h3>{titleName}</h3>

                            <dl>
                                <dt>@何靖雯</dt>
                                <dd>电话: 021-63325888-8090</dd>
                                <dd>邮箱: hejingwen@oritens.com.cn</dd>
                                <dd>执业证书编号: S08843243243243</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </section>
        `
    }
];


export default TEMPLATES;