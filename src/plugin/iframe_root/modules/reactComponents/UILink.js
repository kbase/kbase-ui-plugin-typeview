define([
    'preact',
    'htm',
], (
    preact,
    htm
) => {
    const {h, Component} = preact;
    const html = htm.bind(h);

    function navigationPathToURL({path, params, type}, newWindow) {
        const url = new URL(window.location.origin);
        switch (type) {
            case 'kbaseui': {
                if (newWindow) {
                    const hostname = window.location.hostname.split('.').slice(1).join('.');
                    url.hostname = hostname;
                    url.pathname = `legacy/${path}`;
                    if (params && Object.keys(params).length > 0) {
                        for (const [key, value] of Object.entries(params)) {
                            url.searchParams.set(key, value);
                        }
                    }
                } else {
                    url.hash = `#${path}`
                    if (params && Object.keys(params).length > 0) {
                        url.hash += `$${new URLSearchParams(params).toString()}`
                    }
                }
                break;
            }
            case 'europaui': {
                const hostname = window.location.hostname.split('.').slice(1).join('.');
                url.hostname = hostname;
                url.pathname = path;
                if (params && Object.keys(params).length > 0) {
                    for (const [key, value] of Object.entries(params)) {
                        url.searchParams.set(key, value);
                    }
                }
            }
        }
        return url;
    }

    class UILink extends Component {
        renderLabel(url) {
            if (this.props.linkIsLabel) {
                return url.toString();
            }
            if (this.props.label) {
                return this.props.label;
            }
            return this.props.children;
        }
        render() {
            const path = {
                path: this.props.path,
                params: this.props.params,
                type: this.props.type
            }
            const url = navigationPathToURL(path, !!this.props.newWindow)
            
            const target = (() => {
                if (this.props.path.type === 'kbaseui') {
                    if (this.props.newWindow) {
                        return '_blank';
                    }
                    return '_self';
                }
                if (this.props.newWindow) {
                    return '_blank';
                }
                return '_top';
            })();
    
            return html`<a 
                href=${url.toString()} 
                title=${this.props.title}
                target=${target}
                style=${this.props.style}
                className=${this.props.className}
            >
                ${this.renderLabel(url)}
            </a>`
        }
    }

    return UILink;
});