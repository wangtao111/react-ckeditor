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

            <div class="header-wrapper">
                <img src="{headerLogo}" title="{headerTitle}" />

                <div style="float: right;">
                    <div class="tpl-type">{templateType}</div>
                    <p style="margin: 0"><span>{date}</span></p>
                </div>
            </div>
        </section>`
    },
    {
        id: '标题',
        html: `
            <section class="tpl-title widget-component-wrapper">
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
                    <h1 class="summary-title editable-content">{titleName}</h1>
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

                <div class="editable-content-wrapper">
                    <div class="editable-content"></div>
                </div>
            </section>
        `
    }
];


export default TEMPLATES;