define([
    'preact',
    'htm',
    'reactComponents/Tabs',
    './Overview',
    './Spec',
    './TypesUsing',
    './TypesUsed',
    './Versions',

    'bootstrap',
    'css!./View.css'
], (
    preact,
    htm,
    Tabs,
    Overview,
    Spec,
    TypesUsing,
    TypesUsed,
    Versions
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class View extends Component {
        renderTypesUsed() {
            return html`
                <div>Types Used</div>
            `;
        }
        renderVersions() {
            return html`
                <div>Versions</div>
            `;
        }
        renderTabs() {
            const tabs = [
                {
                    id: 'overview',
                    title: 'Type Overview',
                    autoScroll: true,
                    render: () => {
                        return html`<${Overview} typeInfo=${this.props.typeInfo} />`;
                    }
                },
                {
                    id: 'typeSpec',
                    title: 'Type Spec',
                    autoScroll: true,
                    render: () => {
                         return html`<${Spec} typeInfo=${this.props.typeInfo} />`;
                    }
                },
                {
                    id: 'typesUsing',
                    title: 'Types Using',
                    render: () => {
                       return html`<${TypesUsing} typeInfo=${this.props.typeInfo} />`;
                    }
                },
                {
                    id: 'typesUsed',
                    title: 'Types Used',
                    render: () => {
                        return html`<${TypesUsed} typeInfo=${this.props.typeInfo} />`;
                    }
                },
                {
                    id: 'versions',
                    title: 'Versions',
                    render: () => {
                       return html`<${Versions} typeInfo=${this.props.typeInfo} />`;
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
