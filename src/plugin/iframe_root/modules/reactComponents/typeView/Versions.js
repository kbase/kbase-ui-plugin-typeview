define([
    'preact',
    'htm',
    'reactComponents/DataTable7',
    'reactComponents/UILink',

    'bootstrap',
    'css!styles.css'
], (
    preact,
    htm,
    DataTable,
    UILink
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Versions extends Component {
       
        render() {
            const columns = [

             {
                id: 'version',
                label: 'Type Version',
                style: {
                },
                render: (version, {id}) => {
                    const isCurrentType = this.props.typeInfo.type_def === id;
                    const [classNames, suffix] =  (() => {
                        if (isCurrentType) {
                            return [['-current'], ' (this one)'];
                        }
                        return [[], ''];
                    })();

                    return html`
                        <${UILink}
                            path=${`spec/type/${id}`}
                            type="kbaseui"
                            newWindow=${true}
                            className=${['TypeVersion'].concat(classNames).join(' ')}
                        >
                            ${version}${suffix}
                        </>
                        `;
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
