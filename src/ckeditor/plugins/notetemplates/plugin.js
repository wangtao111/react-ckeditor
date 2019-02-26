CKEDITOR.plugins.add('noteTemplates', {
    requires: 'widget',
    icons: 'noteTemplates',
    init: function(editor) {
        editor.widgets.add('noteTemplates', {
            template: `<div class="template-box">
                <section class="template-section">
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
                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <img src="" alt="logo" />
                        <div style="float: right;">
                            <div>晨会纪要</div>
                            <p><span>2018年9月6日</span></p>
                        </div>
                    </div>
                </section>

                <section class="template-section">
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
                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <h1 class="summary-title">晨会纪要标题</h1>
                    </div>
                </section>

                <section class="template-section">
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

                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <h2 class="section-title">特别声明</h2>
                        <div class="divider-line"></div>
                        <div style="margin: 15px;">
                            <p class="editable-content content1"></p>
                        </div>
                    </div>
                </section>

                <section class="template-section">
                    <select>
                        <option value="头部">头部</option>
                        <option value="标题">标题</option>
                        <option value="摘要">摘要</option>
                        <option value="声明">声明</option>
                        <option value="栏目" selected="selected">栏目</option>
                        <option value="公司股票">公司股票</option>
                        <option value="结束语">结束语</option>
                        <option value="尾部">尾部</option>
                    </select>

                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <h2 class="section-title">个股点评及推荐</h2>
                        <div class="divider-line"></div>
                        <div style="margin: 15px;">
                            <p class="editable-content content2"></p>
                        </div>
                    </div>
                </section>

                <section class="template-section">
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
                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <div style="margin: 15px;">
                            <p class="editable-content content3"></p>
                        </div>
                    </div>
                </section>

                <section class="template-section">
                    <select>
                        <option value="头部">头部</option>
                        <option value="标题">标题</option>
                        <option value="摘要">摘要</option>
                        <option value="声明">声明</option>
                        <option value="栏目" selected="selected">栏目</option>
                        <option value="公司股票">公司股票</option>
                        <option value="结束语">结束语</option>
                        <option value="尾部">尾部</option>
                    </select>

                    <div style="border: 1px dashed #98BCFF;overflow: hidden">
                        <h2 class="section-title">早报快讯</h2>
                        <div class="divider-line"></div>
                        <div style="margin: 15px;">
                            <p class="editable-content content4"></p>
                        </div>
                    </div>
                </section>
            </div>`,
            editables: {
                summaryTitle: {
                    selector: '.summary-title'
                },
                content1: {
                    selector: '.content1'
                },
                content2: {
                    selector: '.content2'
                },
                content3: {
                    selector: '.content3'
                },
                content4: {
                    selector: '.content4'
                }
            },
            allowedContent: 'div(!template-box); div(!template-box-content); h2(!template-box-title); div(!template-section); select;option(!value);',
            requiredContent: 'div(template-box)',
            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'template-box' );
            }
        })
    }
})