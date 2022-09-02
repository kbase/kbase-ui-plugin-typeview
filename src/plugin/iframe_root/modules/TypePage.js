define([
    'preact',
    'htm',    
    'reactComponents/typeView/Controller'
], (
    preact,
    htm,
    TypeViewController
) => {
    const html = htm.bind(preact.h);
    class TypePage {
        constructor(config) {
            this.runtime = config.runtime;
        }

        // LIFECYCLE

        attach(node) {
            this.node = node;
            return null;
        }

        start(params) {
            this.runtime.send('ui', 'setTitle', `Type Specification for "${params.typeid}"`);
            preact.render(html`<${TypeViewController} typeId=${params.typeid} runtime=${this.runtime}/>`, this.node);
            return null;
        }

        stop() {
            return null;
        }

        detach() {
            // xss safe
            this.node.innerHTML = '';
            return null;
        }
    }

    return TypePage;
});
