define([
    'preact',
    'htm',
    'reactComponents/common',

    'bootstrap',
    'css!./Overview.css',
    'css!styles.css'
], (
    preact,
    htm,
    {renderTimestamp}
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Overview extends Component {
        renderModuleVersions(module, versions) {
            const rows = versions.map((ver) => {
                return html`
                    <tr>
                        <td>
                            <a href="/#spec/module/${module}-${ver}" target="_blank" className="ModuleVersion">${ver}</a>
                        </td>
                        <td>
                            ${renderTimestamp(ver)} 
                        </td>
                    </tr>
                `;
            });
            return html`
                <table className="table table-striped -moduleVersions">
                    <thead>
                        <tr>
                            <th>Version id</th>
                            <th>Created on</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            `;
        }
        render() {
             const [, module, name, major, minor] = /^([^.]+)\.([^-]+)-([^.]+)\.(.*)$/.exec(
                this.props.typeInfo.type_def
            );
           
            return html`
                <table className="table table-striped table-bordered TypeView-Overview">
                    <tbody>
                        <tr>
                            <th>
                                Type name
                            </th>
                            <td>
                                ${name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Module
                            </th>
                            <td>
                                ${module}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Version
                            </th>
                            <td>
                                <span className="TypeVersion">${major}.${minor}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                In module version(s)
                            </th>
                            <td>
                                ${this.renderModuleVersions(module, this.props.typeInfo.module_vers)}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Description
                            </th>
                            <td>
                                <pre className="-description">
                                    ${this.props.typeInfo.description}
                                </pre>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
        }
       
    }
    return Overview;
});
