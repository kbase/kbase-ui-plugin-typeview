define([
    'preact',
    'htm',
    'reactComponents/DataTable7',
    'reactComponents/Alert',
    'reactComponents/common',

    'bootstrap',
], (
    preact,
    htm,
    DataTable,
    Alert, 
    {renderTimestamp}
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Versions extends Component {
       
        render() {
             const modules = Object.entries(this.props.included).map(([moduleName, version]) => {
                return {moduleName, version}
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
                    return html`<a href="/#spec/module/${name}-${version}" target="_blank">${name}</a>`;
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
