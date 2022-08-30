define([
    'preact',
    'htm',
    'reactComponents/DataTable7',
    'reactComponents/Alert',

    'bootstrap',
], (
    preact,
    htm,
    DataTable,
    Alert
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class TypesUsing extends Component {
       
        render() {
            if (this.props.typeInfo.using_type_defs.length === 0) {
                return html`<${Alert} type="info" message="This type is not using any other types" />`;
            }

            const columns = [{
                id: 'module',
                label: 'Module',
                style: {
                },
                render: (module) => {
                    return module;
                }
            }, {
                id: 'name',
                label: 'Type Name',
                style: {
                },
                render: (name, {id}) => {
                    return html`<a href="/#spec/type/${id}" target="_blank">${name}</a>`;
                }
            },{
                id: 'version',
                label: 'Type Version',
                style: {
                },
                render: (version, {id}) => {
                    return html`<a href="/#spec/type/${id}" target="_blank">${version}</a>`;
                }
            }];

            const dataSource = this.props.typeInfo.using_type_defs.map((typeId) => {
                    const [module, name, major, minor] = typeId.split(/[.-]/);
                    return {
                        module,
                        name,
                        version: `${major}.${minor}`,
                        id: typeId
                    };
                });

            return html`
                <${DataTable} heights=${{row: 40, col: 40}} flex=${true} columns=${columns} dataSource=${dataSource} />
            `;
        }
       
    }
    return TypesUsing;
});
