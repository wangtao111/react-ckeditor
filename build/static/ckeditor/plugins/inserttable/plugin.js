CKEDITOR.plugins.add('inserttable', {
    require: 'widget',
    init(editor) {
        function makeElement(name) {
            return new CKEDITOR.dom.element(name, editor.document);
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
            editor.insertElement(table);
        }

        editor.widgets.add('inserttable', {
            template: '<div id="table-wrapper" class="container"></div>',
            requireContent: 'div(container)',
            upcast: function(element) {
                return element.name === 'div' && element.hasClass('container')
            },
            data() {
                const { tableConfig } = this.data;
               
                if(tableConfig) {
                    insertTable(tableConfig);
                }
            }
        });
    }
})