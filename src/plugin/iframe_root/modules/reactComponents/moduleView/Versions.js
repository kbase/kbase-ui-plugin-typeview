define([
    'preact',
    'htm',
    'reactComponents/DataTable7',
    'reactComponents/common',

    'bootstrap',
    'css!./Versions.css'
], (
    preact,
    htm,
    DataTable,
    {renderTimestamp}
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
                            <a 
                                href="/#spec/module/${this.props.versions.mod}-${version}" 
                                target="_blank"
                                style=${{fontFamily: 'monospace', fontWeight: 'bold'}}                            
                            >
                                ${version} (current)
                            </a>`;
                    } 
                    return html`
                        <a 
                            href="/#spec/module/${this.props.versions.mod}-${version}" 
                            target="_blank"
                            style=${{fontFamily: 'monospace'}}                            
                        >
                            ${version}
                        </a>`;
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
