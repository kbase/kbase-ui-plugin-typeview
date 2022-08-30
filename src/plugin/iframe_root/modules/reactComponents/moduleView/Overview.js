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
                <table className="table table-striped">
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
        
        renderOwners() {
            return this.props.info.owners.map((owner) => {
                return html`
                    <div>
                        <a href=${`/#people/${owner}`} target="_blank">${owner}</a>
                    </div>
                `;
            })
        }
        render() {
            const {name, version, info: {description}} = this.props;
           
            return html`
                <table className="table table-striped table-bordered TypeView-Overview">
                    <tbody>
                        <tr>
                            <th>
                                Module Name
                            </th>
                            <td>
                                ${name}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Version
                            </th>
                            <td>
                                <span style=${{fontFamily: 'monospace'}}>${version}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Owners
                            </th>
                            <td>
                                ${this.renderOwners()}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Created
                            </th>
                            <td>
                                ${renderTimestamp(version)}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Description
                            </th>
                            <td>
                                <pre className="-description">
                                    ${description}
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
