KISSY.add("mxext/mmanager",function(k,h){var q=h.has,i=h.safeExec,a=function(c){h.isArray(c)||(c=[c]);for(var e=0,f;e<c.length;e++)f=c[e],delete f.cacheKey;return c},d=function(c){this.$modelClass=c;this.$modelsCache=h.createCache();this.$modelsCacheKeys={}},b=[].slice,g={urlParams:1,postParams:1,cacheKey:1,cacheTime:1,before:1,after:1},r=function(c){var e={},f;for(f in c)g[f]||(e[f]=c[f]);return e},j=function(c,e){var f=b.call(arguments,2);return function(){return c.apply(e,f.concat(b.call(arguments)))}};
h.mix(d,{create:function(c){if(!c)throw Error("MManager.create modelClass ungiven");return new d(c)}});var m=function(c){this.$host=c;this.$task=!1};h.mix(m.prototype,{fetchModels:function(c,e,f){var a=this;if(a.$task)return a.next(function(a){a.fetchModels(c,e,error,f)}),a;a.$task=!0;var b=a.$host;if(!a.$reqModels)a.$reqModels={};var d=b.$modelsCache,g=b.$modelsCacheKeys,r=a.$reqModels;h.isArray(c)||(c=[c]);var m=c.length,C=0,y,z,A=Array(m),s=[],t={},u=[],B=k.isArray(e);B&&(s=Array(e.length));for(var w=
function(c,b,o,h){if(!a.$destroy){C++;delete r[o.id];var j=o._cacheKey;A[c]=o;if(b)z=!0,y=h||y,t[c]=h;else{j&&!d.get(j)&&d.set(j,o);var l=o.metaParams;o._doneAt=k.now();var n=o._context;n&&i(n.after,[o].concat(l),n)}if(2==f)(l=B?e[c]:e)&&(s[c]=i(l,[o,b?{msg:h}:null,z?t:null],a));else if(4==f){u[c]={m:o,e:b,s:h};for(c=u.i||0;l=u[c];c++)if(n=B?e[c]:e,s[c]=i(n,[l.m,l.e?{msg:l.s}:null,u.e?t:null,s],a),l.e)t[c]=l.s,u.e=1;u.i=c}j&&q(g,j)&&(c=g[j],delete g[j],i(c,[b,o,h],o));if(C>=m)t.msg=y,b=z?t:null,1==
f?(A.push(b),s[0]=i(e,A,a),s[1]=b):s.push(b),a.$ntId=setTimeout(function(){a.$task=!1;a.doNext(s)},30)}},n=0,l;n<c.length;n++)if(l=c[n]){var x;x=b.getModel(l);var v=x.cacheKey;v&&q(g,v)?g[v].push(j(w,a,n)):(l=x.entity,x.needUpdate?(r[l.id]=l,v&&(g[v]=[]),l.request({success:j(w,l,n,!1,l),error:j(w,l,n,!0,l)})):w(n,!1,l))}else throw Error("miss attrs:"+c);return a},fetchAll:function(c,e){return this.fetchModels(c,e,1)},saveAll:function(c,e){c=a(c);return this.fetchModels(c,e,1)},fetchOrder:function(c,
e){var f=b.call(arguments,1);return this.fetchModels(c,1<f.length?f:e,4)},saveOrder:function(c,e){var c=a(c),f=b.call(arguments,1);return this.fetchModels(c,1<f.length?f:e,4)},saveOne:function(c,e){var c=a(c),f=b.call(arguments,1);return this.reqModels(c,1<f.length?f:e,2)},fetchOne:function(c,e){var f=b.call(arguments,1);return this.fetchModels(c,1<f.length?f:e,2)},abort:function(){clearTimeout(this.$ntId);var c=this.$reqModels,e=this.$host.$modelsCacheKeys;if(c)for(var f in c){var a=c[f],b=a._cacheKey;
if(b&&q(e,b)){var d=e[b];delete e[b];i(d,[!0,a,"aborted"],a)}a.abort()}this.$reqModels={};this.$queue=[];this.$task=!1},next:function(c){if(!this.$queue)this.$queue=[];this.$queue.push(c);this.$task||this.doNext.apply(this,[this].concat(this.$latest||[]));return this},doNext:function(c){var e=this.$queue;e&&(e=e.shift())&&i(e,[this].concat(c),this);this.$latest=c},destroy:function(){this.$destroy=!0;this.abort()}});h.mix(d.prototype,{registerModels:function(c){h.isArray(c)||(c=[c]);for(var e=0,a;e<
c.length;e++){a=c[e];if(!a.name)throw Error("model must own a name attribute");this[a.name]=a}},registerMethods:function(c){var e=this,a;for(a in c)q(c,a)&&(e[a]=function(c){return function(){for(var a,f=arguments,b=[],d=0,g;d<f.length;d++)g=f[d],h.isFunction(g)?b.push(function(c){return function(){a||c.apply(c,arguments)}}(g)):b.push(g);var j=c.apply(e,b);return{abort:function(){j&&j.abort&&i(j.abort,["aborted"],j);a=!0}}}}(c[a]))},createModel:function(c){var a=this.getModelMeta(c),f=new this.$modelClass(r(a)),
b=c;b.after||(b=a);if(b.after)f._context=b;f._cacheKey=c.cacheKey||a.cacheKey;f._meta=a;f.set(r(c));f.setUrlParams(a.urlParams);f.setPostParams(a.postParams);f.setUrlParams(c.urlParams);f.setPostParams(c.postParams);b=c;b.before||(b=a);c=c.metaParams||[];k.isFunction(b.before)&&i(b.before,[f].concat(c),b);f.metaParams=c;return f},getModelMeta:function(a){var e=this[a.name];if(!e)throw Error("Not found:"+a.name);return e},getModel:function(a){var e=this.getModelFromCache(a),f;e||(f=!0,e=this.createModel(a));
return{entity:e,cacheKey:e._cacheKey,needUpdate:f}},saveAll:function(a,e){return(new m(this)).saveAll(a,e)},fetchAll:function(a,e){return(new m(this)).fetchAll(a,e)},saveOrder:function(a,e){var f=new m(this);return f.saveOrder.apply(f,arguments)},fetchOrder:function(a,e){var f=new m(this);return f.fetchOrder.apply(f,arguments)},saveOne:function(a,e){var f=new m(this);return f.saveOne.apply(f,arguments)},fetchOne:function(a,e){var f=new m(this);return f.fetchOne.apply(f,arguments)},clearCacheByKey:function(a){var e=
this.$modelsCache;k.isString(a)&&e.del(a)},clearCacheByName:function(a){for(var e=this.$modelsCache.c,f=0;f<e.length;f++){var b=e[f];b.v&&b.v._meta.name==a&&delete e[b.k]}},getModelUrl:function(a){return this.$modelClass.prototype.url((k.isString(a)?this[a]:a).uri)},getModelFromCache:function(a){var e=this.$modelsCache,f=null,b;if(k.isString(a))b=a;else{var d=this.getModelMeta(a);b=a.cacheKey||d.cacheKey}if(b&&(f=e.get(b))){if(!d)d=f._meta;a=a.cacheTime||d.cacheTime||0;0<a&&k.now()-f._doneAt>a&&(this.clearCacheByKey(b),
f=null)}return f}});return d},{requires:["magix/magix"]});
KISSY.add("mxext/model",function(k,h){var q=function(a,d,b){for(var g in d)k.isObject(d[g])?(h.has(a,g)||(a[g]={}),q(a[g],d[g],!0)):b&&(a[g]=d[g])},i=function(a){a&&this.set(a);this.id=k.guid("m")};h.mix(i,{GET:"GET",POST:"POST",extend:function(a,d){var b=function(){b.superclass.constructor.apply(this,arguments);d&&h.safeExec(d,[],this)};h.mix(b,this,{prototype:!0});q(a,this.prototype);return k.extend(b,this,a)}});h.mix(i.prototype,{urlMap:{},sync:h.noop,parse:function(a){return a},getParamsObject:function(a){if(!a)a=
i.GET;return this["$"+a]||null},getUrlParamsObject:function(){return this.getParamsObject(i.GET)},getPostParamsObject:function(){return this.getParamsObject(i.POST)},getPostParams:function(){return this.getParams(i.POST)},getUrlParams:function(){return this.getParams(i.GET)},getParams:function(a){var a=a?a.toUpperCase():i.GET,a=this["$"+a],d=[],b;if(a)for(var g in a)if(b=a[g],k.isArray(b))for(var h=0;h<b.length;h++)d.push(g+"="+encodeURIComponent(b[h]));else d.push(g+"="+encodeURIComponent(b));return d.join("&")},
setUrlParamsIf:function(a,d){this.setParams(a,d,i.GET,!0)},setPostParamsIf:function(a,d){this.setParams(a,d,i.POST,!0)},setParams:function(a,d,b,g){b=b?b.toUpperCase():i.GET;if(!this.$keysCache)this.$keysCache={};this.$keysCache[b]=!0;b="$"+b;this[b]||(this[b]={});if(k.isObject(a))for(var h in a){if(!g||!this[b][h])this[b][h]=a[h]}else if(a&&(!g||!this[b][a]))this[b][a]=d},setPostParams:function(a,d){this.setParams(a,d,i.POST)},setUrlParams:function(a,d){this.setParams(a,d,i.GET)},removeParamsObject:function(a){if(!a)a=
i.GET;delete this["$"+a]},removePostParamsObject:function(){this.removeParamsObject(i.POST)},removeUrlParamsObject:function(){this.removeParamsObject(i.GET)},reset:function(){var a=this.$keysCache;if(a){for(var d in a)h.has(a,d)&&delete this["$"+d];delete this.$keysCache}a=this.$keys;d=this.$attrs;if(a){for(var b=0;b<a.length;b++)delete d[a[b]];delete this.$keys}},url:function(a){var a=a||this.get("uri"),d;if(a){d=a.split(":");var b=this.urlMap;if(b)for(var g=0,h=d.length;g<h&&!(b=b[d[g]],void 0===
b);g++)g==h-1&&(a=b)}else throw Error("model not set uri");return a},get:function(a){var d=this.$attrs;return d?d[a]:null},set:function(a,d,b){if(!this.$attrs)this.$attrs={};if(b&&!this.$keys)this.$keys=[];if(k.isObject(a))for(var g in a)b&&this.$keys.push(g),this.$attrs[g]=a[g];else a&&(b&&this.$keys.push(a),this.$attrs[a]=d)},load:function(a){this.request(a)},save:function(a){this.request(a)},request:function(a){a||(a={});var d=a.success,b=a.error,g=this;g.$abort=!1;a.success=function(a){if(!g.$abort){if(a){var b=
g.parse(a);b&&(k.isArray(b)&&(b={list:b}),g.set(b,null,!0))}d&&d.apply(this,arguments)}};a.error=function(){g.$abort||b&&b.apply(this,arguments)};g.$trans=g.sync(a)},abort:function(){this.$trans&&this.$trans.abort&&this.$trans.abort();delete this.$trans;this.$abort=!0},isAborted:function(){return this.$abort},beginTransaction:function(){this.$bakAttrs=k.clone(this.$attrs)},rollbackTransaction:function(){var a=this.$bakAttrs;if(a)this.$attrs=a,delete this.$bakAttrs},endTransaction:function(){delete this.$bakAttrs}});
return i},{requires:["magix/magix"]});
KISSY.add("mxext/view",function(k,h,q,i){var a=window,d="destroy,abort,stop,cancel,remove".split(","),b=0,g=h.safeExec,r=h.has,j={},m=function(a){if(!m.d)m.d=1,a.on("add",function(a){var a=a.vframe,e=j[a.id];if(e){for(var b=0;b<e.length;b++)c(a,e[b]);delete j[a.id]}}),a.on("remove",function(a){delete j[a.vframe.id]}),a.root().on("childrenCreated",function(){j={}})},c=function(a,b){var c=a.view;if(c&&a.viewUsable)g(c.receiveMessage,b,c);else{var d=function(c){a.un("viewInteract",d);g(c.view.receiveMessage,
b,c.view)};a.on("viewInteract",d)}};return q.extend({mxViewCtor:h.noop,navigate:function(a){i.navigate.apply(i,arguments)},manage:function(a,c){var d=!0;1==arguments.length&&(c=a,a="res_"+b++,d=!1);if(!this.$resCache)this.$resCache={};this.$resCache[a]={hasKey:d,res:c};return c},getManaged:function(a){var c=this.$resCache;return c&&r(c,a)?c[a].res:null},removeManaged:function(a){var c=null,b=this.$resCache;if(b)if(r(b,a))c=b[a].res,delete b[a];else for(var d in b)if(b[d].res===a){c=b[d].res;delete b[d];
break}return c},destroyManaged:function(c){var b=this.$resCache;if(b){for(var i in b){var j=b[i],p=j.res;if(h.isNumber(p))a.clearTimeout(p),a.clearInterval(p);else if(p)if(p.nodeType&&p.parentNode)k.one(p).remove();else for(var m=0;m<d.length;m++)h.isFunction(p[d[m]])&&g(p[d[m]],[],p);c&&!j.hasKey&&delete b[i]}c||delete this.$resCache}},receiveMessage:h.noop,postMessageTo:function(a,b){var d=this.vom;m(d);h.isArray(a)||(a=[a]);b||(b={});for(var g=0,i;g<a.length;g++){i=a[g];var k=d.get(i);k?c(k,b):
(j[i]||(j[i]=[]),j[i].push(b))}},destroyMRequest:function(){var a=this.$resCache;if(a)for(var b in a){var c=a[b].res;c&&c.fetchOne&&c.fetchAll&&(c.destroy(),delete a[b])}}},function(){var a=this;a.on("interact",function(){a.on("rendercall",function(){a.destroyMRequest()});a.on("prerender",function(){a.destroyManaged(!0)});a.on("destroy",function(){a.destroyManaged()})});a.mxViewCtor()})},{requires:["magix/magix","magix/view","magix/router"]});