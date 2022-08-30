define([
    'preact',
    'htm',
    '../../lib/syntax',

    'bootstrap',
], (
    preact,
    htm,
    syntax,
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Spec extends Component {
        render() {
            const highlighted = syntax.highlightKIDL(this.props.spec);
            const spec = syntax.replaceMarkedTypeLinksInSpec(highlighted.value);
           
            return html`
                <div className="TypeView-Spec">
                   <pre>
                        <code className="kidl" dangerouslySetInnerHTML=${{__html: spec}}>
                        </code>
                   </pre>
                </div>
            `;
        }
       
    }
    return Spec;
});
