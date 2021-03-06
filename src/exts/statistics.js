/*
    author:xinglie.lkf@taobao.com
    页面切换时间统计插件，在log方法内记录页面切换的用时
 */
KISSY.add('exts/statistics', function(S, Router, VOM, Magix) {
    var MS = window.MS || {
        start: new Date()
    };
    var Statistics = {
        log: function(info) {
            console.log(info, info.end - info.start);
        }
    };

    var resume = function(rootVf) {
        rootVf.on('created', function() {
            var ph = Router.parseQH();
            var pn = ph.pathname;
            var begin = MS[pn];
            if (begin) {
                if (!begin.discard) {
                    Statistics.log({
                        start: begin.start,
                        end: new Date(),
                        action: begin.action,
                        from: begin.from,
                        cache: begin.cache,
                        pathname: pn,
                        to: begin.to
                    });
                }
            } else {
                Statistics.log({
                    action: 'load',
                    start: MS.start,
                    end: new Date(),
                    pathname: pn
                });
            }
            MS[pn] = {
                discard: true
            };
        });

        Router.on('changed', function(e) {
            if (!e.force) {
                var loc = e.location;
                var pn = loc.pathname;
                var cache = !! MS[pn];
                if (cache) {
                    cache.discard = true;
                }
                var changed = e.changed;
                if (changed.isPathname()) { //view的改变必定引起pathname的改变
                    MS[pn] = {
                        start: new Date(),
                        cache: cache,
                        action: 'pathnamechange',
                        from: changed.pathname.from,
                        to: changed.pathname.to
                    };
                } else { //params
                    MS[pn] = {
                        start: new Date(),
                        cache: cache,
                        action: 'paramschange'
                    };
                }
            }
        }, 0);
    };
    var rootVfId = Magix.config('rootId');
    var rootVf = VOM.get(rootVfId);
    var vfAdd = function(e) {
        if (e.vframe.id == rootVfId) {
            resume(e.vframe);
            VOM.off('add', vfAdd);
        }
    };
    if (!rootVf) {
        VOM.on('add', vfAdd);
    } else {
        resume(rootVf);
    }

    return Statistics;

}, {
    requires: ['magix/router', 'magix/vom', 'magix/magix']
});