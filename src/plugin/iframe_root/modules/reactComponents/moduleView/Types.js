define([
    'preact',
    'htm',
    'reactComponents/DataTable7',
    'reactComponents/Alert',

    'bootstrap',
    'css!styles.css'
], (
    preact,
    htm,
    DataTable,
    Alert
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class TypesUsed extends Component {
        render() {
            const types = Object.keys(this.props.types).map((typeId) => {
                const [module, name, major, minor] = typeId.split(/[.-]/);
                return {id: typeId, module, name, version: `${major}.${minor}`};
            })
            if (types.length === 0) {
                return html`<${Alert} type="info" message="No types are defined in this module" />`;
            }

            const columns = [
            {
                id: 'name',
                label: 'Type Name',
                render: (name, {id}) => {
                    return html`<a href="/#spec/type/${id}" target="_blank">${name}</a>`;
                }
            }, {
                id: 'version',
                label: 'Type Version',
                render: (version) => {
                    return html`<div className="TypeVersion" style=${{width: '4em', textAlign: 'right'}}>${version}</div>`;
                }
            }];

            const dataSource = types;

            return html`
                <${DataTable} heights=${{row: 40, col: 40}} flex=${true} columns=${columns} dataSource=${dataSource} />
            `;
        }
       
    }
    return TypesUsed;
});
