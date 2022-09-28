define([
    'preact',
    'htm',
    'json!./icons.json',

    'bootstrap'
], (
    preact,
    htm,
    iconConfig
) => {
    const {Component} = preact;
    const html = htm.bind(preact.h);

    class TypeIcon extends Component {
       
        constructor(props) {
            super(props);
            this.objectTypeConfig = this.fixIconConfig();
        }

        fixIconConfig() {
            const objectTypes = new Set(Object.keys(iconConfig.data).concat(Object.keys(iconConfig.color_mapping)));
            objectTypes.delete('DEFAULT');

            return Array.from(objectTypes.keys()).reduce((objectTypeConfig, typeName) => {
                const typeConfig = {};
                if (typeName in iconConfig.data) {
                    typeConfig.classNames = iconConfig.data[typeName][0].split(/\s+/);
                } else {
                    typeConfig.classNames = iconConfig.data.DEFAULT[0].split(/\s+/);
                }
                if (typeName in iconConfig.color_mapping) {
                    typeConfig.color = iconConfig.color_mapping[typeName];
                } else {
                    console.warn('Type without color assigned, defaulting', typeName);
                    typeConfig.color = this.getColor(typeName)
                }
                if (typeConfig.classNames.some((className) => { return className.includes("fa-"); })) {
                    typeConfig.type = 'fontAwesome';
                } else {
                    typeConfig.type = 'kbase';
                }
                objectTypeConfig[typeName] = typeConfig;
                return objectTypeConfig;
            }, {});
        }

        getDefaultIcon(typeName) {
            return {
                type: 'fontAwesome',
                classNames: ['fa-file-o'],
                color: this.getColor(typeName)
            };
        }

        getIcon() {
            const iconConfig = this.objectTypeConfig[this.props.typeName];
            if (!iconConfig) {
                console.warn(`No icon defined for type ${this.props.typeName}, defaulting`);
                return this.getDefaultIcon(this.props.typeName);
            }
            const classNames = iconConfig.classNames.slice();
            switch (iconConfig.type) {
            case 'kbase':
                classNames.push('icon');
                if (this.props.size) {
                    switch (this.props.size) {
                    case 'small':
                        classNames.push('icon-sm');
                        break;
                    case 'medium':
                        classNames.push('icon-md');
                        break;
                    case 'large':
                        classNames.push('icon-lg');
                        break;
                    }
                }
                break;
            case 'fontAwesome':
                classNames.push('fa');
                break;
            }

            return {
                classNames,
                type: iconConfig.type,
                color: iconConfig.color,
                html: `<span class="${classNames.join(' ')}"></span>`
            };
        }

        getColor(typeName) {
            let code = 0;
            const colors = iconConfig.colors;

            for (let i = 0; i < typeName.length; i += 1) {
                code += typeName.charCodeAt(i);
            }
            return colors[code % colors.length];
        }

        render() {
            const icon = this.getIcon();

            return html`
                <div>
                <span className="fa-stack fa-2x">
                    <i className="fa fa-circle fa-stack-2x"
                       style=${{color: icon.color}}></i>
                    <i className=${`fa fa-inverse fa-stack-1x ${icon.classNames.join(' ')}`}></i>
                </span>
                </div>
            `;
        }
    }

    return TypeIcon;
});