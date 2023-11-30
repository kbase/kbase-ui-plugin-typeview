define([
    'preact',
    'htm',
    'reactComponents/DataTable7',
    'reactComponents/common',
    'reactComponents/UILink',

    'bootstrap',
    'css!./Versions.css'
], (
    preact,
    htm,
    DataTable,
    {renderTimestamp},
    UILink
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Versions extends Component {
        render() {
            const columns = [{
                id: 'version',
                label: 'Version',
                style: {
                },
                render: (version) => {
                    if (version === this.props.version) {
                        return html`
                            <${UILink}
                                path=${`spec/module/${this.props.versions.mod}-${version}`}
                                type="kbaseui"
                                newWindow=${true}
                                style=${{fontFamily: 'monospace', fontWeight: 'bold'}}         
                            >
                                ${version} (this one)
                            </>
                        `;
                    } 
                    return html`
                        <${UILink}
                            path=${`spec/module/${this.props.versions.mod}-${version}`}
                            type="kbaseui"
                            newWindow=${true}
                            style=${{fontFamily: 'monospace'}}
                        >
                            ${version}
                        </>
                    `;
                }
            }, {
                id: 'version',
                label: 'Created',
                style: {
                },
                render: (version) => {
                    return html`<span style=${{fontFamily: 'monospace'}}>${renderTimestamp(version)}</span>`;
                }
            }];

            const dataSource = this.props.versions.vers.map((version) => {
                return {
                    version
                };
            });

            return html`
                <${DataTable} heights=${{row: 30, header: 30}} flex=${true} columns=${columns} dataSource=${dataSource} />
            `;
        }
       
    }
    return Versions;
});
