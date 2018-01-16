function userAgentKey(e){ 
          return options.excludeUserAgent || e.push({key: "in",value: getUserAgent()}),
                        e
}
function getUserAgent() {
                        return navigator.userAgent
                    }
                    function languageKey(e) {
                        return options.excludeLanguage || e.push({
                            key: "cm",
                            value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
                        }),
                        e
                    }
                    function colorDepthKey(e) {
                        return options.excludeColorDepth || e.push({
                            key: "gu",
                            value: screen.colorDepth
                        }),
                        e
                    }
                    function pixelRatioKey(e) {
                        return options.excludePixelRatio || e.push({
                            key: "uf",
                            value: getPixelRatio()
                        }),
                        e
                    }
                    function getPixelRatio() {
                        return window.devicePixelRatio || ""
                    }
                    function screenResolutionKey(e) {
                        return options.excludeScreenResolution ? e: getScreenResolution(e)
                    }
                    function getScreenResolution(e) {
                        var t;
                        return t = options.detectScreenOrientation && screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height],
                        void 0 !== t && e.push({
                            key: "jr",
                            value: t
                        }),
                        e
                    }
                    function availableScreenResolutionKey(e) {
                        return options.excludeAvailableScreenResolution ? e: getAvailableScreenResolution(e)
                    }
                    function getAvailableScreenResolution(e) {
                        var t;
                        return screen.availWidth && screen.availHeight && (t = options.detectScreenOrientation ? screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight] : [screen.availHeight, screen.availWidth]),
                        void 0 !== t && e.push({
                            key: "di",
                            value: t
                        }),
                        e
                    }
                    function timezoneOffsetKey(e) {
                        return options.excludeTimezoneOffset || e.push({
                            key: "zp",
                            value: (new Date).getTimezoneOffset()
                        }),
                        e
                    }
                    function sessionStorageKey(e) {
                        return ! options.excludeSessionStorage && hasSessionStorage() && e.push({
                            key: "uh",
                            value: 1
                        }),
                        e
                    }
                    function localStorageKey(e) {
                        return ! options.excludeSessionStorage && hasLocalStorage() && e.push({
                            key: "sh",
                            value: 1
                        }),
                        e
                    }
                    function indexedDbKey(e) {
                        return ! options.excludeIndexedDB && hasIndexedDB() && e.push({
                            key: "he",
                            value: 1
                        }),
                        e
                    }
                    function addBehaviorKey(e) {
                        return document.body && !options.excludeAddBehavior && document.body.addBehavior && e.push({
                            key: "add_behavior",
                            value: 1
                        }),
                        e
                    }
                    function openDatabaseKey(e) {
                        return ! options.excludeOpenDatabase && window.openDatabase && e.push({
                            key: "zo",
                            value: 1
                        }),
                        e
                    }
                    function cpuClassKey(e) {
                        return options.excludeCpuClass || e.push({
                            key: "rv",
                            value: getNavigatorCpuClass()
                        }),
                        e
                    }
                    function platformKey(e) {
                        return options.excludePlatform || e.push({
                            key: "nx",
                            value: getNavigatorPlatform()
                        }),
                        e
                    }
                    function doNotTrackKey(e) {
                        return options.excludeDoNotTrack || e.push({
                            key: "iw",
                            value: getDoNotTrack()
                        }),
                        e
                    }
                    function canvasKey(e) {
                        return ! options.excludeCanvas && isCanvasSupported() && e.push({
                            key: "wr",
                            value: getCanvasFp()
                        }),
                        e
                    }
                    function webglKey(e) {
                        return options.excludeWebGL ? ("undefined" == typeof NODEBUG && console.log("Skipping WebGL fingerprinting per excludeWebGL configuration option"), e) : isWebGlSupported() ? (e.push({
                            key: "wg",
                            value: getWebglFp()
                        }), e) : ("undefined" == typeof NODEBUG && console.log("Skipping WebGL fingerprinting because it is not supported in this browser"), e)
                    }
                    function adBlockKey(e) {
                        return options.excludeAdBlock || e.push({
                            key: "fk",
                            value: getAdBlock()
                        }),
                        e
                    }
                    function hasLiedLanguagesKey(e) {
                        return options.excludeHasLiedLanguages || e.push({
                            key: "rg",
                            value: getHasLiedLanguages()
                        }),
                        e
                    }
                    function hasLiedResolutionKey(e) {
                        return options.excludeHasLiedResolution || e.push({
                            key: "xy",
                            value: getHasLiedResolution()
                        }),
                        e
                    }
                    function hasLiedOsKey(e) {
                        return options.excludeHasLiedOs || e.push({
                            key: "jm",
                            value: getHasLiedOs()
                        }),
                        e
                    }
                    function hasLiedBrowserKey(e) {
                        return options.excludeHasLiedBrowser || e.push({
                            key: "ba",
                            value: getHasLiedBrowser()
                        }),
                        e
                    }
                    function pluginsKey(e) {
                        return options.excludePlugins || (isIE() ? options.excludeIEPlugins || e.push({
                            key: "ie_plugins",
                            value: getIEPlugins()
                        }) : e.push({
                            key: "qm",
                            value: getRegularPlugins()
                        })),
                        e
                    }
                    function getRegularPlugins() {
                        for (var e = [], t = 0, i = navigator.plugins.length; t < i; t++) e.push(navigator.plugins[t]);
                        return pluginsShouldBeSorted() && (e = e.sort(function(e, t) {
                            return e.name > t.name ? 1 : e.name < t.name ? -1 : 0
                        })),
                        map(e,
                        function(e) {
                            var t = map(e,
                            function(e) {
                                return [e.type, e.suffixes].join("~")
                            }).join(",");
                            return [e.name, e.description, t].join("::")
                        },
                        this)
                    }
                    function getIEPlugins() {
                        var e = [];
                        if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
                            var t = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
                            e = map(t,
                            function(e) {
                                try {
                                    return new ActiveXObject(e),
                                    e
                                } catch(e) {
                                    return null
                                }
                            })
                        }
                        return navigator.plugins && (e = e.concat(getRegularPlugins())),
                        e
                    }
                    function pluginsShouldBeSorted() {
                        for (var e = !1,
                        t = 0,
                        i = options.sortPluginsFor.length; t < i; t++) {
                            var r = options.sortPluginsFor[t];
                            if (navigator.userAgent.match(r)) {
                                e = !0;
                                break
                            }
                        }
                        return e
                    }
                    function touchSupportKey(e) {
                        return options.excludeTouchSupport || e.push({
                            key: "tm",
                            value: getTouchSupport()
                        }),
                        e
                    }
                    function hasSessionStorage() {
                        try {
                            return !! window.sessionStorage
                        } catch(e) {
                            return ! 0
                        }
                    }
                    function hasLocalStorage() {
                        try {
                            return !! window.localStorage
                        } catch(e) {
                            return ! 0
                        }
                    }
                    function hasIndexedDB() {
                        return !! window.indexedDB
                    }
                    function getNavigatorCpuClass() {
                        return navigator.cpuClass ? navigator.cpuClass: "unknown"
                    }
                    function getNavigatorPlatform() {
                        return navigator.platform ? navigator.platform: "unknown"
                    }
                    function getDoNotTrack() {
                        return navigator.doNotTrack ? navigator.doNotTrack: "unknown"
                    }
                    function getTouchSupport() {
                        var e = 0,
                        t = !1;
                        void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints: void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
                        try {
                            document.createEvent("TouchEvent"),
                            t = !0
                        } catch(e) {}
                        return [e, t, "ontouchstart" in window]
                    }
                    function getCanvasFp() {
                        var e = [],
                        t = document.createElement("canvas");
                        t.width = 2e3,
                        t.height = 200,
                        t.style.display = "inline";
                        var i = t.getContext("2d");
                        return i.rect(0, 0, 10, 10),
                        i.rect(2, 2, 6, 6),
                        e.push("canvas winding:" + (!1 === i.isPointInPath(5, 5, "evenodd") ? "yes": "no")),
                        i.textBaseline = "alphabetic",
                        i.fillStyle = "#f60",
                        i.fillRect(125, 1, 62, 20),
                        i.fillStyle = "#069",
                        options.dontUseFakeFontInCanvas ? i.font = "11pt Arial": i.font = "11pt no-real-font-123",
                        i.fillText("Cwm fjordbank glyphs vext quiz, 馃槂" + getNavigatorPlatform() + getBrowser(), 2, 15),
                        i.fillStyle = "rgba(102, 204, 0, 0.2)",
                        i.font = "18pt Arial",
                        i.fillText("Cwm fjordbank glyphs vext quiz, 馃槂" + getNavigatorPlatform() + getBrowser(), 4, 45),
                        i.globalCompositeOperation = "multiply",
                        i.fillStyle = "rgb(255,0,255)",
                        i.beginPath(),
                        i.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                        i.closePath(),
                        i.fill(),
                        i.fillStyle = "rgb(0,255,255)",
                        i.beginPath(),
                        i.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                        i.closePath(),
                        i.fill(),
                        i.fillStyle = "rgb(255,255,0)",
                        i.beginPath(),
                        i.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                        i.closePath(),
                        i.fill(),
                        i.fillStyle = "rgb(255,0,255)",
                        i.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                        i.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                        i.fill("evenodd"),
                        e.push("canvas fp:" + t.toDataURL()),
                        e.join("~")
                    }
                    function getWebglFp() {
                        var e, t = function(t) {
                            return e.clearColor(0, 0, 0, 1),
                            e.enable(e.DEPTH_TEST),
                            e.depthFunc(e.LEQUAL),
                            e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
                            "[" + t[0] + ", " + t[1] + "]"
                        };
                        if (! (e = getWebglCanvas())) return null;
                        var i = [],
                        r = e.createBuffer();
                        e.bindBuffer(e.ARRAY_BUFFER, r);
                        var n = new Float32Array([ - .2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
                        e.bufferData(e.ARRAY_BUFFER, n, e.STATIC_DRAW),
                        r.itemSize = 3,
                        r.numItems = 3;
                        var a = e.createProgram(),
                        o = e.createShader(e.VERTEX_SHADER);
                        e.shaderSource(o, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),
                        e.compileShader(o);
                        var s = e.createShader(e.FRAGMENT_SHADER);
                        return e.shaderSource(s, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),
                        e.compileShader(s),
                        e.attachShader(a, o),
                        e.attachShader(a, s),
                        e.linkProgram(a),
                        e.useProgram(a),
                        a.vertexPosAttrib = e.getAttribLocation(a, "attrVertex"),
                        a.offsetUniform = e.getUniformLocation(a, "uniformOffset"),
                        e.enableVertexAttribArray(a.vertexPosArray),
                        e.vertexAttribPointer(a.vertexPosAttrib, r.itemSize, e.FLOAT, !1, 0, 0),
                        e.uniform2f(a.offsetUniform, 1, 1),
                        e.drawArrays(e.TRIANGLE_STRIP, 0, r.numItems),
                        null != e.canvas && i.push(e.canvas.toDataURL()),
                        i.push("extensions:" + e.getSupportedExtensions().join(";")),
                        i.push("webgl aliased line width range:" + t(e.getParameter(e.ALIASED_LINE_WIDTH_RANGE))),
                        i.push("webgl aliased point size range:" + t(e.getParameter(e.ALIASED_POINT_SIZE_RANGE))),
                        i.push("webgl alpha bits:" + e.getParameter(e.ALPHA_BITS)),
                        i.push("webgl antialiasing:" + (e.getContextAttributes().antialias ? "yes": "no")),
                        i.push("webgl blue bits:" + e.getParameter(e.BLUE_BITS)),
                        i.push("webgl depth bits:" + e.getParameter(e.DEPTH_BITS)),
                        i.push("webgl green bits:" + e.getParameter(e.GREEN_BITS)),
                        i.push("webgl max anisotropy:" +
                        function(e) {
                            var t, i = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
                            return i ? (t = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === t && (t = 2), t) : null
                        } (e)),
                        i.push("webgl max combined texture image units:" + e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),
                        i.push("webgl max cube map texture size:" + e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE)),
                        i.push("webgl max fragment uniform vectors:" + e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS)),
                        i.push("webgl max render buffer size:" + e.getParameter(e.MAX_RENDERBUFFER_SIZE)),
                        i.push("webgl max texture image units:" + e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)),
                        i.push("webgl max texture size:" + e.getParameter(e.MAX_TEXTURE_SIZE)),
                        i.push("webgl max varying vectors:" + e.getParameter(e.MAX_VARYING_VECTORS)),
                        i.push("webgl max vertex attribs:" + e.getParameter(e.MAX_VERTEX_ATTRIBS)),
                        i.push("webgl max vertex texture image units:" + e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),
                        i.push("webgl max vertex uniform vectors:" + e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS)),
                        i.push("webgl max viewport dims:" + t(e.getParameter(e.MAX_VIEWPORT_DIMS))),
                        i.push("webgl red bits:" + e.getParameter(e.RED_BITS)),
                        i.push("webgl renderer:" + e.getParameter(e.RENDERER)),
                        i.push("webgl shading language version:" + e.getParameter(e.SHADING_LANGUAGE_VERSION)),
                        i.push("webgl stencil bits:" + e.getParameter(e.STENCIL_BITS)),
                        i.push("webgl vendor:" + e.getParameter(e.VENDOR)),
                        i.push("webgl version:" + e.getParameter(e.VERSION)),
                        e.getShaderPrecisionFormat ? (i.push("webgl vertex shader high float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision), i.push("webgl vertex shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMin), i.push("webgl vertex shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).rangeMax), i.push("webgl vertex shader medium float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision), i.push("webgl vertex shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMin), i.push("webgl vertex shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).rangeMax), i.push("webgl vertex shader low float precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).precision), i.push("webgl vertex shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMin), i.push("webgl vertex shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_FLOAT).rangeMax), i.push("webgl fragment shader high float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision), i.push("webgl fragment shader high float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMin), i.push("webgl fragment shader high float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).rangeMax), i.push("webgl fragment shader medium float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision), i.push("webgl fragment shader medium float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMin), i.push("webgl fragment shader medium float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).rangeMax), i.push("webgl fragment shader low float precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).precision), i.push("webgl fragment shader low float precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMin), i.push("webgl fragment shader low float precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_FLOAT).rangeMax), i.push("webgl vertex shader high int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).precision), i.push("webgl vertex shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMin), i.push("webgl vertex shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_INT).rangeMax), i.push("webgl vertex shader medium int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).precision), i.push("webgl vertex shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMin), i.push("webgl vertex shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_INT).rangeMax), i.push("webgl vertex shader low int precision:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).precision), i.push("webgl vertex shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMin), i.push("webgl vertex shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.LOW_INT).rangeMax), i.push("webgl fragment shader high int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).precision), i.push("webgl fragment shader high int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMin), i.push("webgl fragment shader high int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_INT).rangeMax), i.push("webgl fragment shader medium int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).precision), i.push("webgl fragment shader medium int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMin), i.push("webgl fragment shader medium int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_INT).rangeMax), i.push("webgl fragment shader low int precision:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).precision), i.push("webgl fragment shader low int precision rangeMin:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMin), i.push("webgl fragment shader low int precision rangeMax:" + e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.LOW_INT).rangeMax), i.join("~")) : ("undefined" == typeof NODEBUG && console.log("WebGL fingerprinting is incomplete, because your browser does not support getShaderPrecisionFormat"), i.join("~"))
                    }
                    function getAdBlock() {
                        var e = document.createElement("div");
                        e.innerHTML = "&nbsp;",
                        e.className = "adsbox";
                        var t = !1;
                        try {
                            document.body.appendChild(e),
                            t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight,
                            document.body.removeChild(e)
                        } catch(e) {
                            t = !1
                        }
                        return t
                    }
                    function getHasLiedLanguages() {
                        if (void 0 !== navigator.languages) try {
                            if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return ! 0
                        } catch(e) {
                            return ! 0
                        }
                        return ! 1
                    }
                    function getHasLiedResolution() {
                        return screen.width < screen.availWidth || screen.height < screen.availHeight
                    }
                    function getHasLiedOs() {
                        var e, t = navigator.userAgent.toLowerCase(),
                        i = navigator.oscpu,
                        r = navigator.platform.toLowerCase();
                        e = t.indexOf("windows phone") >= 0 ? "Windows Phone": t.indexOf("win") >= 0 ? "Windows": t.indexOf("android") >= 0 ? "Android": t.indexOf("linux") >= 0 ? "Linux": t.indexOf("iphone") >= 0 || t.indexOf("ipad") >= 0 ? "iOS": t.indexOf("mac") >= 0 ? "Mac": "Other";
                        if (("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e) return ! 0;
                        if (void 0 !== i) {
                            if (i = i.toLowerCase(), i.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e) return ! 0;
                            if (i.indexOf("linux") >= 0 && "Linux" !== e && "Android" !== e) return ! 0;
                            if (i.indexOf("mac") >= 0 && "Mac" !== e && "iOS" !== e) return ! 0;
                            if (0 === i.indexOf("win") && 0 === i.indexOf("linux") && i.indexOf("mac") >= 0 && "other" !== e) return ! 0
                        }
                        return r.indexOf("win") >= 0 && "Windows" !== e && "Windows Phone" !== e || ((r.indexOf("linux") >= 0 || r.indexOf("android") >= 0 || r.indexOf("pike") >= 0) && "Linux" !== e && "Android" !== e || ((r.indexOf("mac") >= 0 || r.indexOf("ipad") >= 0 || r.indexOf("ipod") >= 0 || r.indexOf("iphone") >= 0) && "Mac" !== e && "iOS" !== e || (0 === r.indexOf("win") && 0 === r.indexOf("linux") && r.indexOf("mac") >= 0 && "other" !== e || void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e)))
                    }
                    function getBrowser() {
                        var e = navigator.userAgent.toLowerCase();
                        return e.indexOf("firefox") >= 0 ? "Firefox": e.indexOf("opera") >= 0 || e.indexOf("opr") >= 0 ? "Opera": e.indexOf("chrome") >= 0 ? "Chrome": e.indexOf("safari") >= 0 ? "Safari": e.indexOf("trident") >= 0 ? "Internet Explorer": "Other"
                    }
                    function getHasLiedBrowser() {
                        var e = navigator.productSub,
                        t = getBrowser();
                        if (("Chrome" === t || "Safari" === t || "Opera" === t) && "20030107" !== e) return ! 0;
                        var i = eval.toString().length;
                        if (37 === i && "Safari" !== t && "Firefox" !== t && "Other" !== t) return ! 0;
                        if (39 === i && "Internet Explorer" !== t && "Other" !== t) return ! 0;
                        if (33 === i && "Chrome" !== t && "Opera" !== t && "Other" !== t) return ! 0;
                        var r;
                        try {
                            throw "a"
                        } catch(e) {
                            try {
                                e.toSource(),
                                r = !0
                            } catch(e) {
                                r = !1
                            }
                        }
                        return ! (!r || "Firefox" === t || "Other" === t)
                    }
                    function isCanvasSupported() {
                        var e = document.createElement("canvas");
                        return ! (!e.getContext || !e.getContext("2d"))
                    }
                    function isWebGlSupported() {
                        if (!isCanvasSupported()) return ! 1;
                        var e, t = document.createElement("canvas");
                        try {
                            e = t.getContext && (t.getContext("webgl") || t.getContext("experimental-webgl"))
                        } catch(t) {
                            e = !1
                        }
                        return !! window.WebGLRenderingContext && !!e
                    }
                    function isIE() {
                        return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent))
                    }
                    function hasSwfObjectLoaded() {
                        return void 0 !== window.swfobject
                    }
                    function hasMinFlashInstalled() {
                        return swfobject.hasFlashPlayerVersion("9.0.0")
                    }
                    function addFlashDivNode() {
                        var e = document.createElement("div");
                        e.setAttribute("id", options.swfContainerId),
                        document.body.appendChild(e)
                    }
                    function loadSwfAndDetectFonts(e) {
                        window.___fp_swf_loaded = function(t) {
                            e(t)
                        };
                        var t = options.swfContainerId;
                        addFlashDivNode();
                        var i = {
                            onReady: "___fp_swf_loaded"
                        },
                        r = {
                            allowScriptAccess: "always",
                            menu: "false"
                        };
                        swfobject.embedSWF(options.swfPath, t, "1", "1", "9.0.0", !1, i, r, {})
                    }
                    function getWebglCanvas() {
                        var e = document.createElement("canvas"),
                        t = null;
                        try {
                            t = e.getContext("webgl") || e.getContext("experimental-webgl")
                        } catch(e) {}
                        return t || (t = null),
                        t
                    }
                    function each(e, t, i) {
                        if (null !== e) if (nativeForEach && e.forEach === nativeForEach) e.forEach(t, i);
                        else if (e.length === +e.length) {
                            for (var r = 0,
                            n = e.length; r < n; r++) if (t.call(i, e[r], r, e) === {}) return
                        } else for (var a in e) if (e.hasOwnProperty(a) && t.call(i, e[a], a, e) === {}) return
                    }
                    function map(e, t, i) {
                        var r = [];
                        return null == e ? r: nativeMap && e.map === nativeMap ? e.map(t, i) : (each(e,
                        function(e, n, a) {
                            r[r.length] = t.call(i, e, n, a)
                        }), r)
                    }
                    function x64Add(e, t) {
                        e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
                        t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
                        var i = [0, 0, 0, 0];
                        return i[3] += e[3] + t[3],
                        i[2] += i[3] >>> 16,
                        i[3] &= 65535,
                        i[2] += e[2] + t[2],
                        i[1] += i[2] >>> 16,
                        i[2] &= 65535,
                        i[1] += e[1] + t[1],
                        i[0] += i[1] >>> 16,
                        i[1] &= 65535,
                        i[0] += e[0] + t[0],
                        i[0] &= 65535,
                        [i[0] << 16 | i[1], i[2] << 16 | i[3]]
                    }
                    function x64Multiply(e, t) {
                        e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]],
                        t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
                        var i = [0, 0, 0, 0];
                        return i[3] += e[3] * t[3],
                        i[2] += i[3] >>> 16,
                        i[3] &= 65535,
                        i[2] += e[2] * t[3],
                        i[1] += i[2] >>> 16,
                        i[2] &= 65535,
                        i[2] += e[3] * t[2],
                        i[1] += i[2] >>> 16,
                        i[2] &= 65535,
                        i[1] += e[1] * t[3],
                        i[0] += i[1] >>> 16,
                        i[1] &= 65535,
                        i[1] += e[2] * t[2],
                        i[0] += i[1] >>> 16,
                        i[1] &= 65535,
                        i[1] += e[3] * t[1],
                        i[0] += i[1] >>> 16,
                        i[1] &= 65535,
                        i[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0],
                        i[0] &= 65535,
                        [i[0] << 16 | i[1], i[2] << 16 | i[3]]
                    }
                    function x64Rotl(e, t) {
                        return t %= 64,
                        32 === t ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
                    }
                    function x64LeftShift(e, t) {
                        return t %= 64,
                        0 === t ? e: t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
                    }
                    function x64Xor(e, t) {
                        return [e[0] ^ t[0], e[1] ^ t[1]]
                    }
                    function x64Fmix(e) {
                        return e = x64Xor(e, [0, e[0] >>> 1]),
                        e = x64Multiply(e, [4283543511, 3981806797]),
                        e = x64Xor(e, [0, e[0] >>> 1]),
                        e = x64Multiply(e, [3301882366, 444984403]),
                        e = x64Xor(e, [0, e[0] >>> 1])
                    }
                    function x64hash128(e, t) {
                        e = e || "",
                        t = t || 0;
                        for (var i = e.length % 16,
                        r = e.length - i,
                        n = [0, t], a = [0, t], o = [0, 0], s = [0, 0], h = [2277735313, 289559509], u = [1291169091, 658871167], l = 0; l < r; l += 16) o = [255 & e.charCodeAt(l + 4) | (255 & e.charCodeAt(l + 5)) << 8 | (255 & e.charCodeAt(l + 6)) << 16 | (255 & e.charCodeAt(l + 7)) << 24, 255 & e.charCodeAt(l) | (255 & e.charCodeAt(l + 1)) << 8 | (255 & e.charCodeAt(l + 2)) << 16 | (255 & e.charCodeAt(l + 3)) << 24],
                        s = [255 & e.charCodeAt(l + 12) | (255 & e.charCodeAt(l + 13)) << 8 | (255 & e.charCodeAt(l + 14)) << 16 | (255 & e.charCodeAt(l + 15)) << 24, 255 & e.charCodeAt(l + 8) | (255 & e.charCodeAt(l + 9)) << 8 | (255 & e.charCodeAt(l + 10)) << 16 | (255 & e.charCodeAt(l + 11)) << 24],
                        o = x64Multiply(o, h),
                        o = x64Rotl(o, 31),
                        o = x64Multiply(o, u),
                        n = x64Xor(n, o),
                        n = x64Rotl(n, 27),
                        n = x64Add(n, a),
                        n = x64Add(x64Multiply(n, [0, 5]), [0, 1390208809]),
                        s = x64Multiply(s, u),
                        s = x64Rotl(s, 33),
                        s = x64Multiply(s, h),
                        a = x64Xor(a, s),
                        a = x64Rotl(a, 31),
                        a = x64Add(a, n),
                        a = x64Add(x64Multiply(a, [0, 5]), [0, 944331445]);
                        switch (o = [0, 0], s = [0, 0], i) {
                        case 15:
                            s = x64Xor(s, x64LeftShift([0, e.charCodeAt(l + 14)], 48));
                        case 14:
                            s = x64Xor(s, x64LeftShift([0, e.charCodeAt(l + 13)], 40));
                        case 13:
                            s = x64Xor(s, x64LeftShift([0, e.charCodeAt(l + 12)], 32));
                        case 12:
                            s = x64Xor(s, x64LeftShift([0, e.charCodeAt(l + 11)], 24));
                        case 11:
                            s = x64Xor(s, x64LeftShift([0, e.charCodeAt(l + 10)], 16));
                        case 10:
                            s = x64Xor(s, x64LeftShift([0, e.charCodeAt(l + 9)], 8));
                        case 9:
                            s = x64Xor(s, [0, e.charCodeAt(l + 8)]),
                            s = x64Multiply(s, u),
                            s = x64Rotl(s, 33),
                            s = x64Multiply(s, h),
                            a = x64Xor(a, s);
                        case 8:
                            o = x64Xor(o, x64LeftShift([0, e.charCodeAt(l + 7)], 56));
                        case 7:
                            o = x64Xor(o, x64LeftShift([0, e.charCodeAt(l + 6)], 48));
                        case 6:
                            o = x64Xor(o, x64LeftShift([0, e.charCodeAt(l + 5)], 40));
                        case 5:
                            o = x64Xor(o, x64LeftShift([0, e.charCodeAt(l + 4)], 32));
                        case 4:
                            o = x64Xor(o, x64LeftShift([0, e.charCodeAt(l + 3)], 24));
                        case 3:
                            o = x64Xor(o, x64LeftShift([0, e.charCodeAt(l + 2)], 16));
                        case 2:
                            o = x64Xor(o, x64LeftShift([0, e.charCodeAt(l + 1)], 8));
                        case 1:
                            o = x64Xor(o, [0, e.charCodeAt(l)]),
                            o = x64Multiply(o, h),
                            o = x64Rotl(o, 31),
                            o = x64Multiply(o, u),
                            n = x64Xor(n, o)
                        }
                        return n = x64Xor(n, [0, e.length]),
                        a = x64Xor(a, [0, e.length]),
                        n = x64Add(n, a),
                        a = x64Add(a, n),
                        n = x64Fmix(n),
                        a = x64Fmix(a),
                        n = x64Add(n, a),
                        a = x64Add(a, n),
                        ("00000000" + (n[0] >>> 0).toString(16)).slice( - 8) + ("00000000" + (n[1] >>> 0).toString(16)).slice( - 8) + ("00000000" + (a[0] >>> 0).toString(16)).slice( - 8) + ("00000000" + (a[1] >>> 0).toString(16)).slice( - 8);
                    }
                    function t(n, t) {
                        var o = (65535 & n) + (65535 & t);
                        return (n >> 16) + (t >> 16) + (o >> 16) << 16 | 65535 & o
                    }
                    function o(n, t) {
                        return n << t | n >>> 32 - t
                    }
                    function r(n, r, e, u, f, c) {
                        return t(o(t(t(r, n), t(u, c)), f), e)
                    }
                    function e(n, t, o, e, u, f, c) {
                        return r(t & o | ~t & e, n, t, u, f, c)
                    }
                    function u(n, t, o, e, u, f, c) {
                        return r(t & e | o & ~e, n, t, u, f, c)
                    }
                    function f(n, t, o, e, u, f, c) {
                        return r(t ^ o ^ e, n, t, u, f, c)
                    }
                    function c(n, t, o, e, u, f, c) {
                        return r(o ^ (t | ~e), n, t, u, f, c)
                    }
                    function i(n, o) {
                        n[o >> 5] |= 128 << o % 32,
                        n[14 + (o + 64 >>> 9 << 4)] = o;
                        var r, i, d, l, a, y = 1732584193,
                        h = -271733879,
                        m = -1732584194,
                        p = 271733878;
                        for (r = 0; r < n.length; r += 16) i = y,
                        d = h,
                        l = m,
                        a = p,
                        y = e(y, h, m, p, n[r], 7, -680876936),
                        p = e(p, y, h, m, n[r + 1], 12, -389564586),
                        m = e(m, p, y, h, n[r + 2], 17, 606105819),
                        h = e(h, m, p, y, n[r + 3], 22, -1044525330),
                        y = e(y, h, m, p, n[r + 4], 7, -176418897),
                        p = e(p, y, h, m, n[r + 5], 12, 1200080426),
                        m = e(m, p, y, h, n[r + 6], 17, -1473231341),
                        h = e(h, m, p, y, n[r + 7], 22, -45705983),
                        y = e(y, h, m, p, n[r + 8], 7, 1770035416),
                        p = e(p, y, h, m, n[r + 9], 12, -1958414417),
                        m = e(m, p, y, h, n[r + 10], 17, -42063),
                        h = e(h, m, p, y, n[r + 11], 22, -1990404162),
                        y = e(y, h, m, p, n[r + 12], 7, 1804603682),
                        p = e(p, y, h, m, n[r + 13], 12, -40341101),
                        m = e(m, p, y, h, n[r + 14], 17, -1502002290),
                        h = e(h, m, p, y, n[r + 15], 22, 1236535329),
                        y = u(y, h, m, p, n[r + 1], 5, -165796510),
                        p = u(p, y, h, m, n[r + 6], 9, -1069501632),
                        m = u(m, p, y, h, n[r + 11], 14, 643717713),
                        h = u(h, m, p, y, n[r], 20, -373897302),
                        y = u(y, h, m, p, n[r + 5], 5, -701558691),
                        p = u(p, y, h, m, n[r + 10], 9, 38016083),
                        m = u(m, p, y, h, n[r + 15], 14, -660478335),
                        h = u(h, m, p, y, n[r + 4], 20, -405537848),
                        y = u(y, h, m, p, n[r + 9], 5, 568446438),
                        p = u(p, y, h, m, n[r + 14], 9, -1019803690),
                        m = u(m, p, y, h, n[r + 3], 14, -187363961),
                        h = u(h, m, p, y, n[r + 8], 20, 1163531501),
                        y = u(y, h, m, p, n[r + 13], 5, -1444681467),
                        p = u(p, y, h, m, n[r + 2], 9, -51403784),
                        m = u(m, p, y, h, n[r + 7], 14, 1735328473),
                        h = u(h, m, p, y, n[r + 12], 20, -1926607734),
                        y = f(y, h, m, p, n[r + 5], 4, -378558),
                        p = f(p, y, h, m, n[r + 8], 11, -2022574463),
                        m = f(m, p, y, h, n[r + 11], 16, 1839030562),
                        h = f(h, m, p, y, n[r + 14], 23, -35309556),
                        y = f(y, h, m, p, n[r + 1], 4, -1530992060),
                        p = f(p, y, h, m, n[r + 4], 11, 1272893353),
                        m = f(m, p, y, h, n[r + 7], 16, -155497632),
                        h = f(h, m, p, y, n[r + 10], 23, -1094730640),
                        y = f(y, h, m, p, n[r + 13], 4, 681279174),
                        p = f(p, y, h, m, n[r], 11, -358537222),
                        m = f(m, p, y, h, n[r + 3], 16, -722521979),
                        h = f(h, m, p, y, n[r + 6], 23, 76029189),
                        y = f(y, h, m, p, n[r + 9], 4, -640364487),
                        p = f(p, y, h, m, n[r + 12], 11, -421815835),
                        m = f(m, p, y, h, n[r + 15], 16, 530742520),
                        h = f(h, m, p, y, n[r + 2], 23, -995338651),
                        y = c(y, h, m, p, n[r], 6, -198630844),
                        p = c(p, y, h, m, n[r + 7], 10, 1126891415),
                        m = c(m, p, y, h, n[r + 14], 15, -1416354905),
                        h = c(h, m, p, y, n[r + 5], 21, -57434055),
                        y = c(y, h, m, p, n[r + 12], 6, 1700485571),
                        p = c(p, y, h, m, n[r + 3], 10, -1894986606),
                        m = c(m, p, y, h, n[r + 10], 15, -1051523),
                        h = c(h, m, p, y, n[r + 1], 21, -2054922799),
                        y = c(y, h, m, p, n[r + 8], 6, 1873313359),
                        p = c(p, y, h, m, n[r + 15], 10, -30611744),
                        m = c(m, p, y, h, n[r + 6], 15, -1560198380),
                        h = c(h, m, p, y, n[r + 13], 21, 1309151649),
                        y = c(y, h, m, p, n[r + 4], 6, -145523070),
                        p = c(p, y, h, m, n[r + 11], 10, -1120210379),
                        m = c(m, p, y, h, n[r + 2], 15, 718787259),
                        h = c(h, m, p, y, n[r + 9], 21, -343485551),
                        y = t(y, i),
                        h = t(h, d),
                        m = t(m, l),
                        p = t(p, a);
                        return [y, h, m, p]
                    }
                    function d(n) {
                        var t, o = "";
                        for (t = 0; t < 32 * n.length; t += 8) o += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
                        return o
                    }
                    function l(n) {
                        var t, o = [];
                        for (o[(n.length >> 2) - 1] = void 0, t = 0; t < o.length; t += 1) o[t] = 0;
                        for (t = 0; t < 8 * n.length; t += 8) o[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
                        return o
                    }
                    function a(n) {
                        return d(i(l(n), 8 * n.length))
                    }
                    function y(n, t) {
                        var o, r, e = l(n),
                        u = [],
                        f = [];
                        for (u[15] = f[15] = void 0, e.length > 16 && (e = i(e, 8 * n.length)), o = 0; o < 16; o += 1) u[o] = 909522486 ^ e[o],
                        f[o] = 1549556828 ^ e[o];
                        return r = i(u.concat(l(t)), 512 + 8 * t.length),
                        d(i(f.concat(r), 640))
                    }
                    function h(n) {
                        var t, o, r = "0123456789abcdef",
                        e = "";
                        for (o = 0; o < n.length; o += 1) t = n.charCodeAt(o),
                        e += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
                        return e
                    }
                    function m(n) {
                        return unescape(encodeURIComponent(n))
                    }
                    function p(n) {
                        return a(m(n))
                    }
                    function g(n) {
                        return h(p(n))
                    }
                    function v(n, t) {
                        return y(m(n), m(t))
                    }
                    function b(n, t) {
                        return h(v(n, t))
                    }
                    function md5(n, t, o) {
                        return t ? o ? v(t, n) : b(t, n) : o ? p(n) : g(n)
                    }
                    function guid() {
                        function n() {
                            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                        }
                        return n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n()
                    }
                    function setCookie(n, e, t, i) {
                        var o = new Date;
                        o.setTime(o.getTime() + 24 * t * 60 * 60 * 1e3);
                        var r = "expires=" + o.toGMTString();
                        document.cookie = n + "=" + e + "; " + r + (i ? "; domain=" + i: "")
                    }
                    function getCookie(n) {
                        for (var e = n + "=",
                        t = document.cookie.split(";"), i = 0; i < t.length; i++) {
                            for (var o = t[i];
                            " " == o.charAt(0);) o = o.substring(1);
                            if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
                        }
                        return ""
                    }
                    function detectPrivacyMode(e) {
                        var n, o = function() {
                        	e(!0);
                        },
                        t = function() { 
                        	e(!1);
                        };
                        window.webkitRequestFileSystem ? webkitRequestFileSystem(0, 0, t, o) : "MozAppearance" in document.documentElement.style ? (n = indexedDB.open("cooksdk_privacy_check"), n.onerror = o, n.onsuccess = t) : /constructor/i.test(window.HTMLElement) || window.safari ?
                        function() {
                            try {
                                localStorage.length ? t() : (localStorage.cooksdk_privacy_check = "1024", localStorage.removeItem("cooksdk_privacy_check"), t())
                            } catch(e) {
                                navigator.cookieEnabled ? o() : t()
                            }
                        } () : window.indexedDB || !window.PointerEvent && !window.MSPointerEvent ? t() : o()
                    }
                    function detectExecEnv() {
                        var e = "";
                        return (window._phantom || window.callPhantom || window.__phantomas) && (e += "phantomjs"),
                        window.Buffer && (e += "nodejs"),
                        window.emit && (e += "couchjs"),
                        window.spawn && (e += "rhino"),
                        window.webdriver && (e += "selenium"),
                        (window.domAutomation || window.domAutomationController) && (e += "chromium-based-automation-driver"),
                        e
                    }
                    function detectIframeInfo() {
                        var e = window.self !== window.top,
                        n = {
                            isInIframe: e
                        };
                        if (e) {
                            var o = document.referrer;
                            n.referrer = o && o.split("?")[0],
                            n.iframeWidth = window.innerWidth || document.documentElement.clientWidth,
                            n.iframeHeight = window.innerHeight || document.documentElement.clientHeight
                        }
                        return n
                    }

                    
                    function base64Encode(e) {
                        var r, a, o, c, t, h;
                        for (o = e.length, a = 0, r = ""; a < o;) {
                            if (c = 255 & e.charCodeAt(a++), a == o) {
                                r += base64EncodeChars.charAt(c >> 2),
                                r += base64EncodeChars.charAt((3 & c) << 4),
                                r += "==";
                                break
                            }
                            if (t = e.charCodeAt(a++), a == o) {
                                r += base64EncodeChars.charAt(c >> 2),
                                r += base64EncodeChars.charAt((3 & c) << 4 | (240 & t) >> 4),
                                r += base64EncodeChars.charAt((15 & t) << 2),
                                r += "=";
                                break
                            }
                            h = e.charCodeAt(a++),
                            r += base64EncodeChars.charAt(c >> 2),
                            r += base64EncodeChars.charAt((3 & c) << 4 | (240 & t) >> 4),
                            r += base64EncodeChars.charAt((15 & t) << 2 | (192 & h) >> 6),
                            r += base64EncodeChars.charAt(63 & h)
                        }
                        return r;
                    }

                    function utf16to8(e) {
                        var r, a, o, c;
                        for (r = "", o = e.length, a = 0; a < o; a++) c = e.charCodeAt(a),
                        c >= 1 && c <= 127 ? r += e.charAt(a) : c > 2047 ? (r += String.fromCharCode(224 | c >> 12 & 15), r += String.fromCharCode(128 | c >> 6 & 63), r += String.fromCharCode(128 | c >> 0 & 63)) : (r += String.fromCharCode(192 | c >> 6 & 31), r += String.fromCharCode(128 | c >> 0 & 63));
                        return r;
                    }
                    
                    function enCode(e) {
                    	
                        return base64Encode(utf16to8(e));
                    }
                    
                    function quote(t) {
                        return escapable.lastIndex = 0,
                        escapable.test(t) ? '"' + t.replace(escapable,
                        function(t) {
                            var e = meta[t];
                            return "string" == typeof e ? e: "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice( - 4)
                        }) + '"': '"' + t + '"'
                    }
                    function str(t, e) {
                        var n, r, o, f, u, i = gap,
                        p = e[t];
                        switch (p && "object" == typeof p && "function" == typeof p.toJSON && (p = p.toJSON(t)), "function" == typeof rep && (p = rep.call(e, t, p)), typeof p) {
                        case "string":
                            return quote(p);
                        case "number":
                            return isFinite(p) ? String(p) : "null";
                        case "boolean":
                        case "null":
                            return String(p);
                        case "object":
                            if (!p) return "null";
                            if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(p)) {
                                for (f = p.length, n = 0; n < f; n += 1) u[n] = str(n, p) || "null";
                                return o = 0 === u.length ? "[]": gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + i + "]": "[" + u.join(",") + "]",
                                gap = i,
                                o
                            }
                            if (rep && "object" == typeof rep) for (f = rep.length, n = 0; n < f; n += 1)"string" == typeof rep[n] && (r = rep[n], (o = str(r, p)) && u.push(quote(r) + (gap ? ": ": ":") + o));
                            else for (r in p) Object.prototype.hasOwnProperty.call(p, r) && (o = str(r, p)) && u.push(quote(r) + (gap ? ": ": ":") + o);
                            return o = 0 === u.length ? "{}": gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + i + "}": "{" + u.join(",") + "}",
                            gap = i,
                            o
                        }
                    }
                    
                    function stringFy(t, e, n) {
                        var r;
                        if (gap = "", indent = "", "number" == typeof n) for (r = 0; r < n; r += 1) indent += " ";
                        else "string" == typeof n && (indent = n);
                        if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
                        return str("", {
                            "": t
                        })
                    }

                    function getEnvInfo(e,t,r) {
                    		if(envinfo_cache){
                    			return e&&e(envinfo_cache);
                    		}
                            r.push({
                                key: "au",
                                value: navigator.cookieEnabled
                            });
                            var ii = getCookie(pcweb.uuidkey);
                            ii || (ii = guid(), setCookie(pcweb.uuidkey, ii, 3650)),
                            r.push({
                                key: "mi",
                                value: ii
                            }),
                            r.push({
                                key: "cl",
                                value: pcweb.client
                            }),
                            r.push({
                                key: "sv",
                                value: pcweb.sdkVersion
                            });
                            for (var n = {},s = 0; s < r.length; s++)"wr" === r[s].key || "wg" === r[s].key ? n[r[s].key] = md5(r[s].value) : n[r[s].key] = r[s].value;
                            var o = detectIframeInfo();
                            n.ifm = o && [o.isInIframe, o.iframeWidth, o.iframeHeight, o.referrer];
                            n.ex = detectExecEnv();
                            detectPrivacyMode(function(t){
                            	n.pv = t;
                            	envinfo_cache = enCode(JSON.stringify(n));
                            	e&&e(envinfo_cache);
                            });           
                    }
                    function getValue(a){
                    	envinfo = JSON.stringify(a);
                    	var url = "http://127.0.0.1:8000/server/envin/";
                    	var xmlhttp=null;
                         if (window.XMLHttpRequest)
                           {
                           xmlhttp=new XMLHttpRequest();
                           }
                         else if (window.ActiveXObject)
                           {
                           xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                           }
                         if (xmlhttp!=null)
                           {
                         //  xmlhttp.setRequestHeader("X-CSRFToken","oypg2Kr5yBTASZfR83uoh4tlUpssNVlG5ML4qnyq6eCs4lRdVQogJs2QQChNoyqT");
                           xmlhttp.onreadystatechange=state_Change;
                           xmlhttp.open("POST",url,true);
                           var data = JSON.stringify({username: a})
                           xmlhttp.send(data);
                           alert(data);
                           }
                         else
                           {
                           alert("Your browser does not support XMLHTTP.");
                           }
                    }
        
                    function state_Change()
                    {
                    if (xmlhttp.readyState==4)
                      {
                    	alert(xmlhttp.status)
                      if (xmlhttp.status==200)
                        {
                        }
                      else
                        {
                        alert("Problem retrieving XML data");
                        }
                      }
                    }
                    var options = {
                        swfContainerId: "fingerprintjs2",
                        swfPath: "flash/compiled/FontList.swf",
                        detectScreenOrientation: !0,
                        sortPluginsFor: [/palemoon/i],
                        userDefinedFonts: []
                    },
                    pcweb = {
                            dfpkey: "__dfp",
                            uuidkey: "__uuid",
                            client: "PCWEB",
                            sdkVersion: "1.0"
                    };
                    var t_g = [];
                    nativeForEach = Array.prototype.forEach,
                    nativeMap = Array.prototype.map,
                    t_g = userAgentKey(t_g),
                    t_g = userAgentKey(t_g),
                    t_g = languageKey(t_g),
                    t_g = colorDepthKey(t_g),
                    t_g = pixelRatioKey(t_g),
                    t_g = screenResolutionKey(t_g),
                    t_g = availableScreenResolutionKey(t_g),
                    t_g = timezoneOffsetKey(t_g),
                    t_g = sessionStorageKey(t_g),
                    t_g = localStorageKey(t_g),
                    t_g = indexedDbKey(t_g),
                    t_g = addBehaviorKey(t_g),
                    t_g = openDatabaseKey(t_g),
                    t_g = cpuClassKey(t_g),
                    t_g = platformKey(t_g),
                    t_g = doNotTrackKey(t_g),
                    t_g = pluginsKey(t_g),
                    t_g = canvasKey(t_g),
                    t_g = webglKey(t_g),
                    t_g = adBlockKey(t_g),
                    t_g = hasLiedLanguagesKey(t_g),
                    t_g = hasLiedResolutionKey(t_g),
                    t_g = hasLiedOsKey(t_g),
                    t_g = hasLiedBrowserKey(t_g),
                    t_g = touchSupportKey(t_g);
                    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    gap, indent, meta = {
                    "\b": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                    },
                    rep;
                    var envinfo_cache = null,
                    i_g = [];
                    each(t_g,function(e) {
                        var t = e.value;
                        void 0 !== e.value.join && (t = e.value.join(";")),
                        i_g.push(t)
                    }),
                    getEnvInfo(function(t){
                    	getValue(t);
                    },x64hash128(i_g.join("~~~"), 31),t_g);
                    
                  
    
                    	
    
                     
               
   
                  
            
