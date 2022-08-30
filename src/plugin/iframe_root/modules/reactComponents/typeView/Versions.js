define([
    'preact',
    'htm',
    'reactComponents/DataTable7',

    'bootstrap',
    'css!styles.css'
], (
    preact,
    htm,
    DataTable,
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Versions extends Component {
       
        render() {
            const columns = [
            //     {
            //     id: 'id',
            //     label: 'Type Name',
            //     style: {
            //     },
            //     render: (id, {name}) => {
            //         return html`<a href="/#spec/type/${id}" target="_blank">${name}</a>`;
            //     }
            // },
             {
                id: 'version',
                label: 'Type Version',
                style: {
                },
                render: (version, {id}) => {
                    const isCurrentType = this.props.typeInfo.type_def === id;
                    const [classNames, suffix] =  (() => {
                        if (isCurrentType) {
                            return [['-current'], ' (current)'];
                        }
                        return [[], ''];
                    })();

                    return html`
                        <a 
                            href="/#spec/type/${id}" 
                            target="_blank" 
                            className=${['TypeVersion'].concat(classNames).join(' ')}
                        >
                            ${version}${suffix}
                        </a>`;
                }
            }];

            const dataSource = this.props.typeInfo.type_vers.map((typeId) => {
                const [, name, major, minor] = typeId.split(/[.-]/);
                return {
                    name,
                    version: `${major}.${minor}`,
                    id: typeId
                };
            });


            return html`
                <${DataTable} heights=${{row: 30, header: 30}} flex=${true} columns=${columns} dataSource=${dataSource} />
            `;
        }
       
    }
    return Versions;
});
