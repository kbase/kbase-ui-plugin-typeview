require(['loader'], function () {
    'use strict';
    require([
        'bluebird',
        'dompurify',
        'kbaseUI/integration',
        'kbaseUI/dispatcher',
        'kb_knockout/load',
        'kb_lib/props',
        'yaml!./config.yml',
        'bootstrap',
        'css!font_awesome'
    ], (Promise, DOMPurify, Integration, Dispatcher, knockoutLoader, props, pluginConfig) => {
        const pluginConfigDB = new props.Props({ data: pluginConfig });
        Promise.try(() => {
            const integration = new Integration({
                rootWindow: window,
                pluginConfigDB
            });
            const rootNode = document.getElementById('root');

            // NOW -- we need to implement widget dispatch here
            // based on the navigation received from the parent context.
            let dispatcher = null;

            return knockoutLoader
                .load()
                .then((ko) => {
                    // For more efficient ui updates.
                    // This was introduced in more recent knockout releases,
                    // and in the past introduced problems which were resolved
                    // in knockout 3.5.0.
                    ko.options.deferUpdates = true;

                    // replace the html binding handler.
                    ko.bindingHandlers.html = {
                        init(element, valueAccessor) {
                            const value = ko.unwrap(valueAccessor()) || '';
                            // xss safe
                            element.innerHTML = DOMPurify.sanitize(value);
                        },
                        update(element, valueAccessor) {
                            const value = ko.unwrap(valueAccessor()) || '';
                            // xss safe
                            element.innerHTML = DOMPurify.sanitize(value);
                        }
                    };
                })
                .then(() => {
                    return integration.start();
                })
                .then(() => {
                    // Add routes to panels here
                    dispatcher = new Dispatcher({
                        runtime: integration.runtime,
                        node: rootNode,
                        views: pluginConfigDB.getItem('views', [])
                    });
                    return dispatcher.start();
                })
                .then((dispatcher) => {
                    integration.onNavigate(({ path, params }) => {
                        // TODO: ever
                        let view;
                        if (params.view) {
                            view = params.view;
                        } else {
                            view = path[0];
                        }
                        dispatcher.dispatch({ view, path, params })
                            .catch((ex) => {
                                // TODO: this should trigger an error display
                                console.error('Dispatch Error', ex.message);
                            });
                    });
                    integration.started();
                    // TODO: more channel listeners.
                });
        }).catch((err) => {
            console.error('ERROR2', err);
        });
    });
});
