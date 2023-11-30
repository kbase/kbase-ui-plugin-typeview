define([
    'preact',
    'htm',
    'reactComponents/DataTable7',
    'reactComponents/Alert',
    'reactComponents/UILink',

    'bootstrap',
], (
    preact,
    htm,
    DataTable,
    Alert,
    UILink
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class TypesUsed extends Component {
       
        render() {
            if (this.props.typeInfo.used_type_defs.length === 0) {
                return html`<${Alert} type="info" message="This type is not used by any other types" />`;
            }

            const columns = [{
                id: 'module',
                label: 'Module',
                style: {
                },
                render: (module) => {
                    return html`
                        <${UILink} 
                            path=${`spec/module/${module}`}
                            type="kbaseui"
                            newWindow=${true}
                        >
                        ${module}
                        </>
                    `;
                }
            }, {
                id: 'name',
                label: 'Type Name',
                style: {
                },
                render: (name, {id}) => {
                    return html`
                        <${UILink} 
                            path=${`spec/type/${id}`}
                            type="kbaseui"
                            newWindow=${true}
                        >
                        ${name}
                        </>
                    `;
                }
            },{
                id: 'version',
                label: 'Type Version',
                style: {
                },
                render: (version, {id}) => {
                    return html`
                        <${UILink} 
                            path=${`spec/type/${id}`}
                            type="kbaseui"
                            newWindow=${true}
                        >
                        ${version}
                        </>
                    `;
                }
            }];

            const dataSource = this.props.typeInfo.used_type_defs.map((typeId) => {
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
    return TypesUsed;
});
