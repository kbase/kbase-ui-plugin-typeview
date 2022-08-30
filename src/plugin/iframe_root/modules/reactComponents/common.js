define([
    'preact',
    'htm',

    'css!styles.css'
], (
    preact,
    htm
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    function renderTimestamp(time) {
        if (!time) {
            return 'n/a';
        }
        const options = {
            year: 'numeric', month: 'short', day: '2-digit',
            hour: '2-digit', minute: '2-digit',
            hour12: true
        };
        const timestamp = Intl.DateTimeFormat('en-US', options).format(time);
        return html`<span className="Timestamp">${timestamp}</span>`;
    }

    return {renderTimestamp}
})