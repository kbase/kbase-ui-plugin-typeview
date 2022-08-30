define([
    'preact',
    'htm',    
    'reactComponents/moduleView/Controller'
], (
    preact,
    htm,
    ModuleViewController
) => {
    const html = htm.bind(preact.h);
    class ModulePage {
        constructor(config) {
            this.runtime = config.runtime;
        }

        // LIFECYCLE

        attach(node) {
            this.node = node;
            return null;
        }

        start(params) {
            this.runtime.send('ui', 'setTitle', `Module View for "${params.moduleid}"`);
            preact.render(html`<${ModuleViewController} moduleId=${params.moduleid} runtime=${this.runtime}/>`, this.node);
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

    return ModulePage;
});
