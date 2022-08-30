define([
    'preact',
    'htm',
    'reactComponents/Tabs',
    './Overview',
    './Spec',
    './Types',
    './Included',
    './Versions',

    'bootstrap',
    'css!./View.css'
], (
    preact,
    htm,
    Tabs,
    Overview,
    Spec,
    Types,
    Included,
    Versions
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class View extends Component {
        renderVersions() {
            return html`
                <div>Versions</div>
            `;
        }
        renderTabs() {
            const tabs = [
                {
                    id: 'overview',
                    title: 'Overview',
                    autoScroll: true,
                    render: () => {
                        return html`<${Overview} ...${this.props} />`;
                    }
                },
                {
                    id: 'typeSpec',
                    title: 'Spec',
                    autoScroll: true,
                    render: () => {
                        return html`<${Spec} spec=${this.props.info.spec} />`;
                    }
                },
                {
                    id: 'types',
                    title: 'Types',
                    render: () => {
                        // return 'Types...';
                        return html`<${Types} types=${this.props.info.types} />`;
                    }
                },
                {
                    id: 'included',
                    title: 'Included modules',
                    render: () => {
                        return html`<${Included} included=${this.props.info.included_spec_version} />`;
                    }
                },
                {
                    id: 'versions',
                    title: 'Versions',
                    render: () => {
                        // Note that the "version" (singular, current version) is a string, while the "versions" (all versions)
                        // are numbers (ints)!
                       return html`<${Versions} versions=${this.props.versions} version=${parseInt(this.props.version, 10)}/>`;
                    }
                }
            ];
            return html`<${Tabs} tabs=${tabs} />`;
        }
        
        render() {
            
            return html`
                <div className="TypeView">
                    ${this.renderTabs()}
                </div>
            `;
        }
    }
    return View;
});
