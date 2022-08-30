define([
    'preact',
    'htm',
    'reactComponents/Loading',
    'reactComponents/SimpleError',
    './View',
    'kb_lib/jsonRpc/genericClient'
], (
    preact,
    htm,
    Loading,
    SimpleError,
    View,
    GenericClient
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class Controller extends Component {
        constructor(props) {
            super(props);
            this.state = {
                status: 'NONE'
            }
        }

        componentDidMount() {
            this.fetchData();
        }

        async fetchData() {
             const workspace = new GenericClient({
                module: 'Workspace',
                url: this.props.runtime.config('services.workspace.url'),
                token: this.props.runtime.service('session').getAuthToken()
            });
            try {
                this.setState({
                    status: 'LOADING'
                });

                // fetch data...
                const [typeInfo] = await workspace.callFunc('get_type_info', [this.props.typeId]);

                this.setState({
                    status: 'SUCCESS',
                    value: {
                        typeInfo
                    }
                });
            } catch (ex) {
                console.error(ex);
                this.setState({
                    status: 'ERROR',
                    error: {
                        message: ex.message
                    }
                })
            }
        }

        renderLoading() {
            return html`
                <${Loading} message="Loading Type Spec Viewer..." />
            `;
        }

        renderError({message}) {
            return html`
                <${SimpleError} message=${message} />
            `;
        }

        renderSuccess({typeInfo}) {
            return html`
                <${View} typeInfo=${typeInfo} />
            `;
        }
       
        render() {
            switch (this.state.status) {
                case 'NONE':
                case 'LOADING':
                    return this.renderLoading();
                case 'ERROR': 
                    return this.renderError(this.state.error);
                case 'SUCCESS':
                    return this.renderSuccess(this.state.value);
            }
        }
    }
    return Controller;
});
