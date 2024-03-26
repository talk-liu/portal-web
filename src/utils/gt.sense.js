/* eslint-disable */
!(function(global, factory) {
  'use strict'
  typeof module == 'object' && typeof module.exports == 'object'
    ? (module.exports = global.document
      ? factory(global, !0)
      : function(w) {
        if (!w.document) throw new Error('Geetest requires a window with a document')
        return factory(w)
      })
    : factory(global)
})(typeof window != 'undefined' ? window : this, function(window, noGlobal) {
  'use strict'
  function _Object(obj) {
    this._obj = obj
  }
  function Config(config) {
    let self = this
    new _Object(config)._each(function(key, value) {
      self[key] = value
    })
  }
  if (void 0 === window) throw new Error('Geetest requires browser environment')
  let document = window.document,
    Math = window.Math,
    head = document.getElementsByTagName('head')[0]
  ;(_Object.prototype = {
    _each: function(process) {
      let _obj = this._obj
      for (let k in _obj) _obj.hasOwnProperty(k) && process(k, _obj[k])
      return this
    },
  }),
  (Config.prototype = {
    api_server: 'api.geetest.com',
    type_path: '/gettype_deepknow.php',
    protocol: 'http://',
    static_servers: ['static.geetest.com', 'dn-staticdown.qbox.me'],
    path: '/static/js/sense.js',
    type: 'sense',
    _extend: function(obj) {
      let self = this
      new _Object(obj)._each(function(key, value) {
        self[key] = value
      })
    },
  })
  var isNumber = function(value) {
      return typeof value == 'number'
    },
    isString = function(value) {
      return typeof value == 'string'
    },
    isBoolean = function(value) {
      return typeof value == 'boolean'
    },
    isFunction = function(value) {
      return typeof value == 'function'
    },
    random = function() {
      return parseInt(1e4 * Math.random()) + new Date().valueOf()
    },
    loadScript = function(url, cb) {
      let script = document.createElement('script')
      ;(script.charset = 'UTF-8'),
      (script.async = !0),
      (script.onerror = function() {
        cb(!0)
      })
      let loaded = !1
      ;(script.onload = script.onreadystatechange = function() {
        loaded ||
          (script.readyState && script.readyState !== 'loaded' && script.readyState !== 'complete') ||
          ((loaded = !0),
          setTimeout(function() {
            cb(!1)
          }, 0))
      }),
      setTimeout(function() {
        (script.src = url), head.appendChild(script)
      }, 10)
    },
    normalizeDomain = function(domain) {
      return domain.replace(/^https?:\/\/|\/$/g, '')
    },
    normalizePath = function(path) {
      return (path = path.replace(/\/+/g, '/')), path.indexOf('/') !== 0 && (path = '/' + path), path
    },
    normalizeQuery = function(query) {
      if (!query) return ''
      let q = '?'
      return (
        new _Object(query)._each(function(key, value) {
          (isString(value) || isNumber(value) || isBoolean(value)) &&
            (q = q + encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&')
        }),
        q === '?' && (q = ''),
        q.replace(/&$/, '')
      )
    },
    makeURL = function(protocol, domain, path, query) {
      domain = normalizeDomain(domain)
      let url = normalizePath(path) + normalizeQuery(query)
      return domain && (url = protocol + domain + url), url
    },
    load = function(protocol, domains, path, query, cb) {
      var tryRequest = function(at) {
        let url = makeURL(protocol, domains[at], path, query)
        loadScript(url, function(err) {
          err ? (at >= domains.length - 1 ? cb(!0) : tryRequest(at + 1)) : cb(!1)
        })
      }
      tryRequest(0)
    },
    jsonp = function(domains, path, config, callback) {
      let cb = 'geetest_' + random()
      ;(window[cb] = function(data) {
        callback(data.status === 'success' ? data.data : data), (window[cb] = undefined)
        try {
          delete window[cb]
        } catch (e) {}
      }),
      load(
        config.protocol,
        domains,
        path,
        {
          gt: config.id,
          callback: cb,
        },
        function(err) {
          err && throwError('networkError', config)
        },
      )
    },
    throwError = function(errorType, config) {
      let errors = {
        networkError: '网络错误',
        idNotExist: '参数id必填',
        cbIlegal: 'callback必须是function',
        geetestNotExist: 'Geetest不存在',
      }
      if (typeof config.onError != 'function') throw new Error(errors[errorType])
      config.onError(errors[errorType])
    },
    detect = function() {
      return !!window.Geetest
    },
    initSense = function(userConfig, callback) {
      let config = new Config(userConfig)
      return (
        userConfig.https
          ? (config.protocol = 'https://')
          : window.location.protocol !== 'http:' && window.location.protocol !== 'https:'
            ? (config.protocol = 'https://')
            : (config.protocol = window.location.protocol + '//'),
        userConfig && userConfig.id
          ? callback && !isFunction(callback)
            ? void throwError('cbIlegal', config)
            : detect()
              ? void (callback && callback(new window.Geetest(config)))
              : void jsonp([config.api_server], config.type_path, config, function(newConfig) {
                load(config.protocol, newConfig.static_servers, newConfig.path, null, function(err) {
                  if (err) throwError('networkError', config)
                  else {
                    if (typeof window.Geetest == 'undefined') return void throwError('geetestNotExist', config)
                    config._extend(newConfig), callback && callback(new window.Geetest(config))
                  }
                })
              })
          : void throwError('idNotExist', config)
      )
    }
  return (window.initSense = initSense), initSense
})
