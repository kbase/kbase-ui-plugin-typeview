define([
    'preact',
    'htm',
    'reactComponents/DataTable7',
    'reactComponents/Alert',
    'reactComponents/common',
    'reactComponents/UILink',

    'bootstrap',
], (
    preact,
    htm,
    DataTable,
    Alert, 
    {renderTimestamp},
    UILink
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Versions extends Component {
       
        render() {
             const modules = Object.entries(this.props.included).map(([name, version]) => {
                return {name, version}
            });
            if (modules.length === 0) {
                return html`<${Alert} type="info" message="No modules are included in this module" />`;
            }
            const columns = [{
                id: 'name',
                label: 'Type Name',
                style: {
                },
                render: (name, {version}) => {
                    return html`
                        <${UILink}
                            path=${`spec/module/${name}-${version}`}
                            type="kbaseui"
                            newWindow=${true}
                        >
                            ${name}
                        </>
                    `;
                }
            }, {
                id: 'version',
                label: 'Version',
                style: {
                },
                render: (version) => {
                    return version;
                }
            }, {
                id: 'version',
                label: 'Created',
                style: {
                },
                render: (version) => {
                    return renderTimestamp(version);
                }
            }];

            const dataSource = modules;


            return html`
                <${DataTable} heights=${{row: 30, header: 30}} flex=${true} columns=${columns} dataSource=${dataSource} />
            `;
        }
       
    }
    return Versions;
});
