const tableIdData = {};     // 表格Id与数据的映射
export default function(widgetNum, editor, command) {
    let conf = editor.config,
        quickBorder = conf.qtBorder || '1',
        quickStyle = conf.qtStyle || null,
        quickClass = conf.qtClass || '',
        quickCellPadding = conf.qtCellPadding || '1',
        quickCellSpacing = conf.qtCellSpacing || '1',
        quickWidth = conf.qtWidth || '500px',
        quickPreviewSize = conf.qtPreviewSize || '14px',
        quickPreviewBorder = conf.qtPreviewBorder || '1px solid #aaa',
        quickPreviewBackground = conf.qtPreviewBackground || '#e5e5e5';
    function makeElement(name) {
        return new window.CKEDITOR.dom.element(name, editor.document);
    }

    function insertTable({ columns, dataSource }) {
        let table = makeElement('table');
        let thead = table.append(makeElement('thead'));
        let tbody = table.append(makeElement('tbody'));
        const headerRow = thead.append(makeElement('tr'));
        
        for(let i = 0, len = columns.length; i < len; i++) {
            const headerCell = makeElement('th');
            headerCell.appendText(columns[i].title);
            headerRow.append(headerCell);
        }
        thead.append(headerRow);

        for(let j = 0, len = dataSource.length; j < len; j++) {
            const tableRow = makeElement('tr');

            for(let i = 0, len = columns.length; i < len; i++ ) {
                const rowCell = makeElement('td');
                rowCell.appendText(dataSource[j][columns[i].dataIndex]);
                tableRow.append(rowCell);
            }
            tbody.append(tableRow);
        }
        table.setAttribute('class', 'editor-table-widget');
        setTimeout(() => {
            editor.document.findOne(`#tableWrapper${ widgetNum }`).$.append(table.$);
            editor.focus();
            const range = editor.getSelection().getRanges()[0];
            range.collapse(false);
        }, 0);
        editor.fire('removeFormatCleanup', table);
    }
    editor.widgets.add(`inserttable-widget${ widgetNum }`, {
        template: `<div style="position: relative" class="charts_container">
        <div id="tableWrapper${widgetNum}" class="container"></div>
        <p name='command' style='width:0;height:0;overflow:hidden;position: absolute;'>${command}</p>` +
        `<div class="editCommand" name='editCommand'>
            编辑命令
        </div>` +
        `</div>`,
        requireContent: 'div(container)',
        upcast: function(element) {
            return element.name === 'div' && element.hasClass('container')
        },
        data() {
            const { tableConfig } = this.data;
            const mapData = tableIdData[`table${ widgetNum }`];

            if(tableConfig && !mapData || JSON.stringify(mapData) !== JSON.stringify(tableConfig)) {
                tableIdData[`table${ widgetNum }`] = tableConfig;
                insertTable(tableConfig);

                this.setFocused(false);
            }
        }
    });
}