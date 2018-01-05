!
function() {
	function a(a) {
		return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
	}
	function b(a) {
		return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
	}
	function c(c, d) {
		function e(a) {
			return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
		}
		function f(b) {
			var c = m;
			if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function() {
				return m++, "_line=" + m + ";"
			})), 0 === b.indexOf("=")) {
				var e = l && !/^=[=#]/.test(b);
				if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
					var f = b.replace(/\s*\([^\)]+\)/, "");
					n[f] || /^(include|print)$/.test(f) || (b = "_escape(" + b + ")")
				} else b = "_string(" + b + ")";
				b = s[1] + b + s[2]
			}
			return g && (b = "_line=" + c + ";" + b), r(a(b), function(a) {
				if (a && !p[a]) {
					var b;
					b = "print" === a ? u : "include" === a ? v : n[a] ? "_utils." + a : o[a] ? "_helpers." + a : "_data." + a, w += a + "=" + b + ",", p[a] = !0
				}
			}), b + "\n"
		}
		var g = d.debug,
			h = d.openTag,
			i = d.closeTag,
			j = d.parser,
			k = d.compress,
			l = d.escape,
			m = 1,
			p = {
				_data: 1,
				_filename: 1,
				_utils: 1,
				_helpers: 1,
				_out: 1,
				_line: 1
			},
			q = "".trim,
			s = q ? ["_out='';", "_out+=", ";", "_out"] : ["_out=[];", "_out.push(", ");", "_out.join('')"],
			t = q ? "_out+=text;return _out;" : "_out.push(text);",
			u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
			v = "function(filename,data){data=data||_data;var text=_utils._include(filename,data,_filename);" + t + "}",
			w = "'use strict';var _utils=this,_helpers=_utils._helpers," + (g ? "_line=0," : ""),
			x = s[0],
			y = "return new String(" + s[3] + ");";
		r(c.split(h), function(a) {
			a = a.split(i);
			var b = a[0],
				c = a[1];
			1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
		});
		var z = w + x + y;
		g && (z = "try{" + z + "}catch(e){throw {filename:_filename,name:'Render Error',message:e.message,line:_line,source:" + b(c) + ".split(/\\n/)[_line-1].replace(/^\\s+/,'')};}");
		try {
			var A = new Function("_data", "_filename", z);
			return A.prototype = n, A
		} catch (B) {
			throw B.temp = "function anonymous(_data,_filename) {" + z + "}", B
		}
	}
	var d = function(a, b) {
			return "string" == typeof b ? q(b, {
				filename: a
			}) : g(a, b)
		};
	d.version = "3.0.0", d.config = function(a, b) {
		e[a] = b
	};
	var e = d.defaults = {
		openTag: "<%",
		closeTag: "%>",
		escape: !0,
		cache: !0,
		compress: !1,
		parser: null
	},
		f = d.cache = {};
	d.render = function(a, b) {
		return q(a, b)
	};
	var g = d.renderFile = function(a, b) {
			var c = d.get(a) || p({
				filename: a,
				name: "Render Error",
				message: "Template not found"
			});
			return b ? c(b) : c
		};
	d.get = function(a) {
		var b;
		if (f[a]) b = f[a];
		else if ("object" == typeof document) {
			var c = document.getElementById(a);
			if (c) {
				var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
				b = q(d, {
					filename: a
				})
			}
		}
		return b
	};
	var h = function(a, b) {
			return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
		},
		i = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		},
		j = function(a) {
			return i[a]
		},
		k = function(a) {
			return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
		},
		l = Array.isArray ||
	function(a) {
		return "[object Array]" === {}.toString.call(a)
	}, m = function(a, b) {
		var c, d;
		if (l(a)) for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
		else for (c in a) b.call(a, a[c], c)
	}, n = d.utils = {
		_helpers: {},
		_include: g,
		_string: h,
		_escape: k,
		_each: m
	};
	d.helper = function(a, b) {
		o[a] = b
	};
	var o = d.helpers = n._helpers;
	d.onerror = function(a) {
		var b = "Template Error\n\n";
		for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
		"object" == typeof console && console.error(b)
	};
	var p = function(a) {
			return d.onerror(a), function() {
				return "{Template Error}"
			}
		},
		q = d.compile = function(a, b) {
			function d(c) {
				try {
					return new i(c, h) + ""
				} catch (d) {
					return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
				}
			}
			b = b || {};
			for (var g in e) void 0 === b[g] && (b[g] = e[g]);
			var h = b.filename;
			try {
				var i = c(a, b)
			} catch (j) {
				return j.filename = h || "anonymous", j.name = "Syntax Error", p(j)
			}
			return d.prototype = i.prototype, d.toString = function() {
				return i.toString()
			}, h && b.cache && (f[h] = d), d
		},
		r = n._each,
		s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
		t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
		u = /[^\w$]+/g,
		v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
		w = /^\d[^,]*|,\d[^,]*/g,
		x = /^,+|,+$/g,
		y = /^$|,+/;
	e.openTag = "{{", e.closeTag = "}}";
	var z = function(a, b) {
			var c = b.split(":"),
				d = c.shift(),
				e = c.join(":") || "";
			return e && (e = ", " + e), "_helpers." + d + "(" + a + e + ")"
		};
	e.parser = function(a) {
		a = a.replace(/^\s/, "");
		var b = a.split(" "),
			c = b.shift(),
			e = b.join(" ");
		switch (c) {
		case "if":
			a = "if(" + e + "){";
			break;
		case "else":
			b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";
			break;
		case "/if":
			a = "}";
			break;
		case "each":
			var f = b[0] || "_data",
				g = b[1] || "as",
				h = b[2] || "_value",
				i = b[3] || "_index",
				j = h + "," + i;
			"as" !== g && (f = "[]"), a = "_each(" + f + ",function(" + j + "){";
			break;
		case "/each":
			a = "});";
			break;
		case "echo":
			a = "print(" + e + ");";
			break;
		case "print":
		case "include":
			a = c + "(" + b.join(",") + ");";
			break;
		default:
			if (/^\s*\|\s*[\w\$]/.test(e)) {
				var k = !0;
				0 === a.indexOf("#") && (a = a.substr(1), k = !1);
				for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) o = z(o, m[l]);
				a = (k ? "=" : "=#") + o
			} else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a
		}
		return a
	}, "function" == typeof define ? define(function() {
		return d
	}) : "undefined" != typeof exports ? module.exports = d : this.template = d
}();