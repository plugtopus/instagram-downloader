"use strict";

function createStandardXHR() {
    try {
        return new window.XMLHttpRequest
    } catch (a) {
    }
}

var JSZipUtils = {}, attempts = 3;
JSZipUtils._getBinaryFromXHR = function (a) {
    return a.response || a.responseText
}, JSZipUtils.getBinaryContent = function (a, b, c, d, e) {
    if (c.aborted) return void b("aborted");
    e = e || 1, e++;
    var f;
    try {
        f = createStandardXHR(), f.timeout = d, f.open("GET", a, !0), "responseType" in f && (f.responseType = "arraybuffer"), f.overrideMimeType && f.overrideMimeType("text/plain; charset=x-user-defined"), f.onreadystatechange = function (g) {
            var h, i;
            if (4 === this.readyState) if (404 === this.status) b(new Error("Ajax error 404 for " + a + " : " + this.status + " " + this.statusText), null); else if (200 === this.status || 0 === this.status) {
                h = null, i = null;
                try {
                    h = JSZipUtils._getBinaryFromXHR(f)
                } catch (j) {
                    i = new Error(j)
                }
                i && attempts >= e && !c.aborted ? JSZipUtils.getBinaryContent(a, b, c, d, e) : b(i, h)
            } else attempts >= e && !c.aborted ? JSZipUtils.getBinaryContent(a, b, c, d, e) : b(new Error("Ajax error for " + a + " : " + this.status + " " + this.statusText), null)
        }, f.send()
    } catch (g) {
        attempts >= e && !c.aborted ? JSZipUtils.getBinaryContent(a, b, c, d, e) : b(new Error(g), null)
    }
    return f
}, "undefined" != typeof module && (module.exports = JSZipUtils);