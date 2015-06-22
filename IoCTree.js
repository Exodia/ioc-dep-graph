define(
    function (require) {

        function IoCTree(ioc) {
            this.ioc = ioc;
            this.children = null;
            this.nodes = [];
            this.links = [];
            this.initNodes();
            this.initLinks();
        }

        IoCTree.prototype.initNodes = function () {
            var components = this.ioc.getComponentConfig();
            this.nodes = Object.keys(components).map(function (node) {
                return {
                    id: node
                }
            });
        };

        IoCTree.prototype.initLinks = function () {
            var process = function (type, source, deps) {
                deps.forEach(function (dep) {
                    this.links.push({
                        source: source,
                        target: findIndexById(this.nodes, dep),
                        relation: type
                    })
                }, this);

            };

            this.nodes.forEach(function (node, index) {
                var config = this.ioc.getComponentConfig(node.id);
                process.call(this, 'arg', index, config.argDeps || []);
                process.call(this, 'setter', index, config.setterDeps || []);
                process.call(this, 'property', index, config.propDeps || []);
                process.call(this, 'import', index, config.anonyDeps || []);
            }, this);
        };

        IoCTree.prototype.draw = function () {
            console.log(this);
            var me = this;
            if (!this.drawWindow) {
                this.drawWindow = window.open('../draw.html');
                this.drawWindow.onload = function () {
                    me.drawWindow.postMessage({
                        nodes: me.nodes,
                        links: me.links
                    }, '*');
                };
            }
            else {
                this.drawWindow.postMessage({
                    nodes: this.nodes,
                    links: this.links
                }, '*');
            }
        };

        IoCTree.getInstance = function (ioc) {
            this._instance = this._instance || new IoCTree(ioc);
            return this._instance;
        };

        function findIndexById(arr, id) {
            var result = -1;
            arr.some(function (item, index) {
                if (id === item.id) {
                    result = index;
                    return true;
                }
            });

            return result;
        }

        return IoCTree;
    }
);