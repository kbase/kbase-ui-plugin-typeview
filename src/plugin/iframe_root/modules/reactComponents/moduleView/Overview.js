define([
    'preact',
    'htm',
    'reactComponents/common',
    'reactComponents/UILink',

    'bootstrap',
    'css!./Overview.css',
    'css!styles.css'
], (
    preact,
    htm,
    {renderTimestamp},
    UILink
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Overview extends Component {
        renderModuleVersions(module, versions) {
            const rows = versions.map((ver) => {
                return html`
                    <tr>
                        <td>
                            <${UILink} 
                                path=${`spec/module/${module}-${ver}`}
                                type='kbaseui'
                                newWindow=${true}
                                className="ModuleVersion"
                            >
                             ${ver}
                            </>
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
                        <${UILink} 
                            path=${`people/${owner}`}
                            type='kbaseui'
                            newWindow=${true}
                        >
                        ${owner}
                        </>
                    </div>
                `;
            })
        }
        render() {
            const {name, version, info: {ver, description}} = this.props;
           
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
                                <span style=${{fontFamily: 'monospace'}}>${ver}</span>
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
