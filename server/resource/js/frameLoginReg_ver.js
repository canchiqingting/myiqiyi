define("ver.js", ["./config/config", "./loader"], function (e, t, n) {
    var a = e("./config/config"),
        i = e("./loader"),
        r = a.templatePath,
        o = a.projectDebug;
    n.exports = {
        loadJob: function (e, t) {
            i.load({
                jobName: e,//“frameLoginReg”
                config: a
            }, t)
        }, loadTemplate: function (e, t, n) {
            var a = ("string" == typeof e ? [e] : e).map(function (e) {
                return r + "/" + e + ".js"
            });
            a && (o || -1 != n.jobFile.indexOf("jobs/qitan") ? i.loadTemplate(a, t, n) : seajs.use(a, t || function () {}))
        }, loadModule: function () {}
    }
});
define("config/config.js", [], function (e, t, n) {
    var a = {
        projectName: "qiyiV2",
        projectVersion: "20180130101950",
        templateVersion: "20180126102551",
        commonVersion: "20180130101950",
        developer: "zhangdan",
        jobPath: "resource/js",
        commonPath: "resource/js",
        templatePath: "templates/scripts",
        env: "product",
        projectDebug: !1,
        cookie: {
            pc: "QC020"
        },
        supportTs: Q.browser.iPad || Q.browser.iPhone || navigator.userAgent.match(/miuivideo\//i)
    };
    "development" == a.env, n.exports = a
});
define("loader.js", [], function (e, t, n) {
    window.Q = window.Q || {}, window.Q.PageInfo = window.Q.PageInfo || {}, window.Q.PageInfo.playPageInfo = window.Q.PageInfo.playPageInfo || {};
    var a = {},
        i = {};
    n.exports = {
        load: function (e, t) {
            var n = e.jobName,
                a = e.config,
                i = a.jobPath,
                r = a.commonPath,
                o = Q.PageInfo.projectVersion || a.projectVersion,
                s = a.commonVersion || Q.PageInfo.commonVersion,
                l = a.projectDebug;
            l && (o = "", s = ""), Q.PageInfo.projectVersion = o, Q.PageInfo.projectConfig = a, Q.PageInfo.jobName = n;
            var d = ["/"  + i + "/" + n + ".js"];
            if (l || -1 != i.indexOf("/i18n") || -1 != i.indexOf("/appstore") || -1 != i.indexOf("/qitan")) seajs.use(d, t || function () {});
            else {
                var m = ["/" + r + "/common.js"];
                seajs.use(m, function () {
                    seajs.use(d, t || function () {})
                })
            }
        }, loadJobTemplate: function (e, t) {
            var n = e.config,
                r = (e.jobFile || n.jobPath + "/" + e.jobName, n.projectName),
                o = r + "/template",
                s = n.projectDebug,
                l = n.templateVersion || Q.PageInfo.templateVersion;
            s && (l = ""), Q.PageInfo.templateVersion = Q.PageInfo.templateVersion || l;
            var d = r === Q.projectName ? "" : "$/../../" + r + "/",
                m = [d + l + (l ? "/" : "") + "templates/template.js"];
            i[o] = i[o] || [], seajs.use(m, function () {
                a[o] = !0, (i[o] || []).forEach(function (e) {
                    seajs.use(e.name, e.callback)
                }), t && t.apply(this, arguments)
            })
        }, loadTemplate: function (e, t, n) {
            n = n || {
                jobFile: Q.PageInfo.projectConfig.jobPath + "/" + Q.PageInfo.jobName,
                projectName: Q.PageInfo.projectConfig.projectName,
                projectDebug: Q.PageInfo.projectConfig.projectDebug,
                templateVersion: Q.PageInfo.templateVersion
            };
            var r = n.jobFile,
                o = n.projectName,
                s = o + "/template";
            if (a[s]) seajs.use(e, t);
            else {
                var l;
                (l = !i[s]) && (i[s] = []), i[s].push({
                    name: e,
                    callback: t
                }), l && this.loadJobTemplate({
                    jobFile: r,
                    config: {
                        projectName: o,
                        projectDebug: n.projectDebug || !1,
                        templateVersion: n.templateVersion
                    }
                })
            }
        }
    }
});
//# buildBy serverV2-UglifyJS2-FullCache at Tue Jan 30 2018 10:21:36 GMT+0800 (CST) take time: 69 ms