void function () {
    require(['common/ioc', '../../IoCTree'], function (ioc, IoCTree) {
        var tree = IoCTree.getInstance(ioc);
        tree.draw();
    })
}();