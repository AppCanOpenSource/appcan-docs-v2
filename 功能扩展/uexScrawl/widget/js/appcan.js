/*! appcan v0.1.16 |  from 3g2win.com *//* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */

var Zepto = (function() {
  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
    document = window.document,
    elementDisplay = {}, classCache = {},
    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    rootNodeRE = /^(?:body|html)$/i,
    capitalRE = /([A-Z])/g,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
    table = document.createElement('table'),
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    readyRE = /complete|loaded|interactive/,
    simpleSelectorRE = /^[\w-]*$/,
    class2type = {},
    toString = class2type.toString,
    zepto = {},
    camelize, uniq,
    tempParent = document.createElement('div'),
    propMap = {
      'tabindex': 'tabIndex',
      'readonly': 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      'maxlength': 'maxLength',
      'cellspacing': 'cellSpacing',
      'cellpadding': 'cellPadding',
      'rowspan': 'rowSpan',
      'colspan': 'colSpan',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'contenteditable': 'contentEditable'
    },
    isArray = Array.isArray ||
      function(object){ return object instanceof Array }

  zepto.matches = function(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                          element.oMatchesSelector || element.matchesSelector
    if (matchesSelector) return matchesSelector.call(element, selector)
    // fall back to performing a selector:
    var match, parent = element.parentNode, temp = !parent
    if (temp) (parent = tempParent).appendChild(element)
    match = ~zepto.qsa(parent, selector).indexOf(element)
    temp && tempParent.removeChild(element)
    return match
  }

  function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }

  function isFunction(value) { return type(value) == "function" }
  function isWindow(obj)     { return obj != null && obj == obj.window }
  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
  function isObject(obj)     { return type(obj) == "object" }
  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  function likeArray(obj) { return typeof obj.length == 'number' }

  function compact(array) { return filter.call(array, function(item){ return item != null }) }
  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
  function dasherize(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
  }
  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

  function classRE(name) {
    return name in classCache ?
      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
  }

  function maybeAddPx(name, value) {
    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
  }

  function defaultDisplay(nodeName) {
    var element, display
    if (!elementDisplay[nodeName]) {
      element = document.createElement(nodeName)
      document.body.appendChild(element)
      display = getComputedStyle(element, '').getPropertyValue("display")
      element.parentNode.removeChild(element)
      display == "none" && (display = "block")
      elementDisplay[nodeName] = display
    }
    return elementDisplay[nodeName]
  }

  function children(element) {
    return 'children' in element ?
      slice.call(element.children) :
      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function(html, name, properties) {
    var dom, nodes, container

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
      if (!(name in containers)) name = '*'

      container = containers[name]
      container.innerHTML = '' + html
      dom = $.each(slice.call(container.childNodes), function(){
        container.removeChild(this)
      })
    }

    if (isPlainObject(properties)) {
      nodes = $(dom)
      $.each(properties, function(key, value) {
        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
        else nodes.attr(key, value)
      })
    }

    return dom
  }

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function(selector, context) {
    var dom
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // If it's a html fragment, create nodes from it
      // Note: In both Chrome 21 and Firefox 15, DOM error 12
      // is thrown if the fragment doesn't begin with <
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // If it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // If a function is given, call it when the DOM is ready
    else if (isFunction(selector)) return $(document).ready(selector)
    // If a Zepto collection is given, just return it
    else if (zepto.isZ(selector)) return selector
    else {
      // normalize array if an array of nodes is given
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function(selector, context){
    return zepto.init(selector, context)
  }

  function extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
  }

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
  }

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  zepto.qsa = function(element, selector){
    var found,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
        isSimple = simpleSelectorRE.test(nameOnly)
    return (isDocument(element) && isSimple && maybeID) ?
      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
      slice.call(
        isSimple && !maybeID ?
          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
          element.getElementsByTagName(selector) : // Or a tag
          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
      )
  }

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector)
  }

  $.contains = document.documentElement.contains ?
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while (node && (node = node.parentNode))
        if (node === parent) return true
      return false
    }

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value){
    var klass = node.className,
        svg   = klass && klass.baseVal !== undefined

    if (value === undefined) return svg ? klass.baseVal : klass
    svg ? (klass.baseVal = value) : (node.className = value)
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    var num
    try {
      return value ?
        value == "true" ||
        ( value == "false" ? false :
          value == "null" ? null :
          !/^0/.test(value) && !isNaN(num = Number(value)) ? num :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value )
        : value
    } catch(e) {
      return value
    }
  }

  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject

  $.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
  }

  $.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
  }

  $.camelCase = camelize
  $.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
  }

  // plugin compatibility
  $.uuid = 0
  $.support = { }
  $.expr = { }

  $.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
      for (i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if (value != null) values.push(value)
      }
    else
      for (key in elements) {
        value = callback(elements[key], key)
        if (value != null) values.push(value)
      }
    return flatten(values)
  }

  $.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++)
        if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
      for (key in elements)
        if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
  }

  $.grep = function(elements, callback){
    return filter.call(elements, callback)
  }

  if (window.JSON) $.parseJSON = JSON.parse

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
  })

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
      return $(slice.apply(this, arguments))
    },

    ready: function(callback){
      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      if (readyRE.test(document.readyState) && document.body) callback($)
      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
      return this
    },
    get: function(idx){
      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
      return this.length
    },
    remove: function(){
      return this.each(function(){
        if (this.parentNode != null)
          this.parentNode.removeChild(this)
      })
    },
    each: function(callback){
      emptyArray.every.call(this, function(el, idx){
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    filter: function(selector){
      if (isFunction(selector)) return this.not(this.not(selector))
      return $(filter.call(this, function(element){
        return zepto.matches(element, selector)
      }))
    },
    add: function(selector,context){
      return $(uniq(this.concat($(selector,context))))
    },
    is: function(selector){
      return this.length > 0 && zepto.matches(this[0], selector)
    },
    not: function(selector){
      var nodes=[]
      if (isFunction(selector) && selector.call !== undefined)
        this.each(function(idx){
          if (!selector.call(this,idx)) nodes.push(this)
        })
      else {
        var excludes = typeof selector == 'string' ? this.filter(selector) :
          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
        this.forEach(function(el){
          if (excludes.indexOf(el) < 0) nodes.push(el)
        })
      }
      return $(nodes)
    },
    has: function(selector){
      return this.filter(function(){
        return isObject(selector) ?
          $.contains(this, selector) :
          $(this).find(selector).size()
      })
    },
    eq: function(idx){
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    first: function(){
      var el = this[0]
      return el && !isObject(el) ? el : $(el)
    },
    last: function(){
      var el = this[this.length - 1]
      return el && !isObject(el) ? el : $(el)
    },
    find: function(selector){
      var result, $this = this
      if (!selector) result = []
      else if (typeof selector == 'object')
        result = $(selector).filter(function(){
          var node = this
          return emptyArray.some.call($this, function(parent){
            return $.contains(parent, node)
          })
        })
      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
      else result = this.map(function(){ return zepto.qsa(this, selector) })
      return result
    },
    closest: function(selector, context){
      var node = this[0], collection = false
      if (typeof selector == 'object') collection = $(selector)
      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
        node = node !== context && !isDocument(node) && node.parentNode
      return $(node)
    },
    parents: function(selector){
      var ancestors = [], nodes = this
      while (nodes.length > 0)
        nodes = $.map(nodes, function(node){
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node)
            return node
          }
        })
      return filtered(ancestors, selector)
    },
    parent: function(selector){
      return filtered(uniq(this.pluck('parentNode')), selector)
    },
    children: function(selector){
      return filtered(this.map(function(){ return children(this) }), selector)
    },
    contents: function() {
      return this.map(function() { return slice.call(this.childNodes) })
    },
    siblings: function(selector){
      return filtered(this.map(function(i, el){
        return filter.call(children(el.parentNode), function(child){ return child!==el })
      }), selector)
    },
    empty: function(){
      return this.each(function(){ this.innerHTML = '' })
    },
    // `pluck` is borrowed from Prototype.js
    pluck: function(property){
      return $.map(this, function(el){ return el[property] })
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    replaceWith: function(newContent){
      return this.before(newContent).remove()
    },
    wrap: function(structure){
      var func = isFunction(structure)
      if (this[0] && !func)
        var dom   = $(structure).get(0),
            clone = dom.parentNode || this.length > 1

      return this.each(function(index){
        $(this).wrapAll(
          func ? structure.call(this, index) :
            clone ? dom.cloneNode(true) : dom
        )
      })
    },
    wrapAll: function(structure){
      if (this[0]) {
        $(this[0]).before(structure = $(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        $(structure).append(this)
      }
      return this
    },
    wrapInner: function(structure){
      var func = isFunction(structure)
      return this.each(function(index){
        var self = $(this), contents = self.contents(),
            dom  = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
      })
    },
    unwrap: function(){
      this.parent().each(function(){
        $(this).replaceWith($(this).children())
      })
      return this
    },
    clone: function(){
      return this.map(function(){ return this.cloneNode(true) })
    },
    hide: function(){
      return this.css("display", "none")
    },
    toggle: function(setting){
      return this.each(function(){
        var el = $(this)
        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
      })
    },
    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
    html: function(html){
      return 0 in arguments ?
        this.each(function(idx){
          var originHtml = this.innerHTML
          $(this).empty().append( funcArg(this, html, idx, originHtml) )
        }) :
        (0 in this ? this[0].innerHTML : null)
    },
    text: function(text){
      return 0 in arguments ?
        this.each(function(idx){
          var newText = funcArg(this, text, idx, this.textContent)
          this.textContent = newText == null ? '' : ''+newText
        }) :
        (0 in this ? this[0].textContent : null)
    },
    attr: function(name, value){
      var result
      return (typeof name == 'string' && !(1 in arguments)) ?
        (!this.length || this[0].nodeType !== 1 ? undefined :
          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
        ) :
        this.each(function(idx){
          if (this.nodeType !== 1) return
          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
        })
    },
    removeAttr: function(name){
      return this.each(function(){ this.nodeType === 1 && setAttribute(this, name) })
    },
    prop: function(name, value){
      name = propMap[name] || name
      return (1 in arguments) ?
        this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :
        (this[0] && this[0][name])
    },
    data: function(name, value){
      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

      var data = (1 in arguments) ?
        this.attr(attrName, value) :
        this.attr(attrName)

      return data !== null ? deserializeValue(data) : undefined
    },
    val: function(value){
      return 0 in arguments ?
        this.each(function(idx){
          this.value = funcArg(this, value, idx, this.value)
        }) :
        (this[0] && (this[0].multiple ?
           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
           this[0].value)
        )
    },
    offset: function(coordinates){
      if (coordinates) return this.each(function(index){
        var $this = $(this),
            coords = funcArg(this, coordinates, index, $this.offset()),
            parentOffset = $this.offsetParent().offset(),
            props = {
              top:  coords.top  - parentOffset.top,
              left: coords.left - parentOffset.left
            }

        if ($this.css('position') == 'static') props['position'] = 'relative'
        $this.css(props)
      })
      if (!this.length) return null
      var obj = this[0].getBoundingClientRect()
      return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      }
    },
    css: function(property, value){
      if (arguments.length < 2) {
        var element = this[0], computedStyle = getComputedStyle(element, '')
        if(!element) return
        if (typeof property == 'string')
          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
        else if (isArray(property)) {
          var props = {}
          $.each(isArray(property) ? property: [property], function(_, prop){
            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
          })
          return props
        }
      }

      var css = ''
      if (type(property) == 'string') {
        if (!value && value !== 0)
          this.each(function(){ this.style.removeProperty(dasherize(property)) })
        else
          css = dasherize(property) + ":" + maybeAddPx(property, value)
      } else {
        for (key in property)
          if (!property[key] && property[key] !== 0)
            this.each(function(){ this.style.removeProperty(dasherize(key)) })
          else
            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }

      return this.each(function(){ this.style.cssText += ';' + css })
    },
    index: function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
    },
    hasClass: function(name){
      if (!name) return false
      return emptyArray.some.call(this, function(el){
        return this.test(className(el))
      }, classRE(name))
    },
    addClass: function(name){
      if (!name) return this
      return this.each(function(idx){
        classList = []
        var cls = className(this), newName = funcArg(this, name, idx, cls)
        newName.split(/\s+/g).forEach(function(klass){
          if (!$(this).hasClass(klass)) classList.push(klass)
        }, this)
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
      })
    },
    removeClass: function(name){
      return this.each(function(idx){
        if (name === undefined) return className(this, '')
        classList = className(this)
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
          classList = classList.replace(classRE(klass), " ")
        })
        className(this, classList.trim())
      })
    },
    toggleClass: function(name, when){
      if (!name) return this
      return this.each(function(idx){
        var $this = $(this), names = funcArg(this, name, idx, className(this))
        names.split(/\s+/g).forEach(function(klass){
          (when === undefined ? !$this.hasClass(klass) : when) ?
            $this.addClass(klass) : $this.removeClass(klass)
        })
      })
    },
    scrollTop: function(value){
      if (!this.length) return
      var hasScrollTop = 'scrollTop' in this[0]
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
      return this.each(hasScrollTop ?
        function(){ this.scrollTop = value } :
        function(){ this.scrollTo(this.scrollX, value) })
    },
    scrollLeft: function(value){
      if (!this.length) return
      var hasScrollLeft = 'scrollLeft' in this[0]
      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
      return this.each(hasScrollLeft ?
        function(){ this.scrollLeft = value } :
        function(){ this.scrollTo(value, this.scrollY) })
    },
    position: function() {
      if (!this.length) return

      var elem = this[0],
        // Get *real* offsetParent
        offsetParent = this.offsetParent(),
        // Get correct offsets
        offset       = this.offset(),
        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

      // Subtract element margins
      // note: when an element has margin: auto the offsetLeft and marginLeft
      // are the same in Safari causing offset.left to incorrectly be 0
      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

      // Add offsetParent borders
      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

      // Subtract the two offsets
      return {
        top:  offset.top  - parentOffset.top,
        left: offset.left - parentOffset.left
      }
    },
    offsetParent: function() {
      return this.map(function(){
        var parent = this.offsetParent || document.body
        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
          parent = parent.offsetParent
        return parent
      })
    }
  }

  // for now
  $.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  ;['width', 'height'].forEach(function(dimension){
    var dimensionProperty =
      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

    $.fn[dimension] = function(value){
      var offset, el = this[0]
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
      else return this.each(function(idx){
        el = $(this)
        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
      })
    }
  })

  function traverseNode(node, fun) {
    fun(node)
    for (var i = 0, len = node.childNodes.length; i < len; i++)
      traverseNode(node.childNodes[i], fun)
  }

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  adjacencyOperators.forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2 //=> prepend, append

    $.fn[operator] = function(){
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType, nodes = $.map(arguments, function(arg) {
            argType = type(arg)
            return argType == "object" || argType == "array" || arg == null ?
              arg : zepto.fragment(arg)
          }),
          parent, copyByClone = this.length > 1
      if (nodes.length < 1) return this

      return this.each(function(_, target){
        parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
                 operatorIndex == 1 ? target.firstChild :
                 operatorIndex == 2 ? target :
                 null

        var parentInDocument = $.contains(document.documentElement, parent)

        nodes.forEach(function(node){
          if (copyByClone) node = node.cloneNode(true)
          else if (!parent) return $(node).remove()

          parent.insertBefore(node, target)
          if (parentInDocument) traverseNode(node, function(el){
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
               (!el.type || el.type === 'text/javascript') && !el.src)
              window['eval'].call(window, el.innerHTML)
          })
        })
      })
    }

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
      $(html)[operator](this)
      return this
    }
  })

  zepto.Z.prototype = $.fn

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq
  zepto.deserializeValue = deserializeValue
  $.zepto = zepto

  return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)

;(function($){
  var _zid = 1, undefined,
      slice = Array.prototype.slice,
      isFunction = $.isFunction,
      isString = function(obj){ return typeof obj == 'string' },
      handlers = {},
      specialEvents={},
      focusinSupported = 'onfocusin' in window,
      focus = { focus: 'focusin', blur: 'focusout' },
      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

  function zid(element) {
    return element._zid || (element._zid = _zid++)
  }
  function findHandlers(element, event, fn, selector) {
    event = parse(event)
    if (event.ns) var matcher = matcherFor(event.ns)
    return (handlers[zid(element)] || []).filter(function(handler) {
      return handler
        && (!event.e  || handler.e == event.e)
        && (!event.ns || matcher.test(handler.ns))
        && (!fn       || zid(handler.fn) === zid(fn))
        && (!selector || handler.sel == selector)
    })
  }
  function parse(event) {
    var parts = ('' + event).split('.')
    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
  }
  function matcherFor(ns) {
    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
  }

  function eventCapture(handler, captureSetting) {
    return handler.del &&
      (!focusinSupported && (handler.e in focus)) ||
      !!captureSetting
  }

  function realEvent(type) {
    return hover[type] || (focusinSupported && focus[type]) || type
  }

  function add(element, events, fn, data, selector, delegator, capture){
    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
    events.split(/\s/).forEach(function(event){
      if (event == 'ready') return $(document).ready(fn)
      var handler   = parse(event)
      handler.fn    = fn
      handler.sel   = selector
      // emulate mouseenter, mouseleave
      if (handler.e in hover) fn = function(e){
        var related = e.relatedTarget
        if (!related || (related !== this && !$.contains(this, related)))
          return handler.fn.apply(this, arguments)
      }
      handler.del   = delegator
      var callback  = delegator || fn
      handler.proxy = function(e){
        e = compatible(e)
        if (e.isImmediatePropagationStopped()) return
        e.data = data
        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
        if (result === false) e.preventDefault(), e.stopPropagation()
        return result
      }
      handler.i = set.length
      set.push(handler)
      if ('addEventListener' in element)
        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
    })
  }
  function remove(element, events, fn, selector, capture){
    var id = zid(element)
    ;(events || '').split(/\s/).forEach(function(event){
      findHandlers(element, event, fn, selector).forEach(function(handler){
        delete handlers[id][handler.i]
      if ('removeEventListener' in element)
        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
      })
    })
  }

  $.event = { add: add, remove: remove }

  $.proxy = function(fn, context) {
    var args = (2 in arguments) && slice.call(arguments, 2)
    if (isFunction(fn)) {
      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
      proxyFn._zid = zid(fn)
      return proxyFn
    } else if (isString(context)) {
      if (args) {
        args.unshift(fn[context], fn)
        return $.proxy.apply(null, args)
      } else {
        return $.proxy(fn[context], fn)
      }
    } else {
      throw new TypeError("expected function")
    }
  }

  $.fn.bind = function(event, data, callback){
    return this.on(event, data, callback)
  }
  $.fn.unbind = function(event, callback){
    return this.off(event, callback)
  }
  $.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
  }

  var returnTrue = function(){return true},
      returnFalse = function(){return false},
      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      }

  function compatible(event, source) {
    if (source || !event.isDefaultPrevented) {
      source || (source = event)

      $.each(eventMethods, function(name, predicate) {
        var sourceMethod = source[name]
        event[name] = function(){
          this[predicate] = returnTrue
          return sourceMethod && sourceMethod.apply(source, arguments)
        }
        event[predicate] = returnFalse
      })

      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
          'returnValue' in source ? source.returnValue === false :
          source.getPreventDefault && source.getPreventDefault())
        event.isDefaultPrevented = returnTrue
    }
    return event
  }

  function createProxy(event) {
    var key, proxy = { originalEvent: event }
    for (key in event)
      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

    return compatible(proxy, event)
  }

  $.fn.delegate = function(selector, event, callback){
    return this.on(event, selector, callback)
  }
  $.fn.undelegate = function(selector, event, callback){
    return this.off(event, selector, callback)
  }

  $.fn.live = function(event, callback){
    $(document.body).delegate(this.selector, event, callback)
    return this
  }
  $.fn.die = function(event, callback){
    $(document.body).undelegate(this.selector, event, callback)
    return this
  }

  $.fn.on = function(event, selector, data, callback, one){
    var autoRemove, delegator, $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.on(type, selector, data, fn, one)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = data, data = selector, selector = undefined
    if (isFunction(data) || data === false)
      callback = data, data = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(_, element){
      if (one) autoRemove = function(e){
        remove(element, e.type, callback)
        return callback.apply(this, arguments)
      }

      if (selector) delegator = function(e){
        var evt, match = $(e.target).closest(selector, element).get(0)
        if (match && match !== element) {
          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
        }
      }

      add(element, event, callback, data, selector, delegator || autoRemove)
    })
  }
  $.fn.off = function(event, selector, callback){
    var $this = this
    if (event && !isString(event)) {
      $.each(event, function(type, fn){
        $this.off(type, selector, fn)
      })
      return $this
    }

    if (!isString(selector) && !isFunction(callback) && callback !== false)
      callback = selector, selector = undefined

    if (callback === false) callback = returnFalse

    return $this.each(function(){
      remove(this, event, callback, selector)
    })
  }

  $.fn.trigger = function(event, args){
    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
    event._args = args
    return this.each(function(){
      // items in the collection might not be DOM elements
      if('dispatchEvent' in this) this.dispatchEvent(event)
      else $(this).triggerHandler(event, args)
    })
  }

  // triggers event handlers on current element just as if an event occurred,
  // doesn't trigger an actual event, doesn't bubble
  $.fn.triggerHandler = function(event, args){
    var e, result
    this.each(function(i, element){
      e = createProxy(isString(event) ? $.Event(event) : event)
      e._args = args
      e.target = element
      $.each(findHandlers(element, event.type || event), function(i, handler){
        result = handler.proxy(e)
        if (e.isImmediatePropagationStopped()) return false
      })
    })
    return result
  }

  // shortcut methods for `.bind(event, fn)` for each event type
  ;('focusin focusout load resize scroll unload click dblclick '+
  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
    $.fn[event] = function(callback) {
      return callback ?
        this.bind(event, callback) :
        this.trigger(event)
    }
  })

  ;['focus', 'blur'].forEach(function(name) {
    $.fn[name] = function(callback) {
      if (callback) this.bind(name, callback)
      else this.each(function(){
        try { this[name]() }
        catch(e) {}
      })
      return this
    }
  })

  $.Event = function(type, props) {
    if (!isString(type)) props = type, type = props.type
    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
    event.initEvent(type, bubbles, true)
    return compatible(event)
  }

})(Zepto)

;(function($){
  var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/

  // trigger a custom event and return false if it was cancelled
  function triggerAndReturn(context, eventName, data) {
    var event = $.Event(eventName)
    $(context).trigger(event, data)
    return !event.isDefaultPrevented()
  }

  // trigger an Ajax "global" event
  function triggerGlobal(settings, context, eventName, data) {
    if (settings.global) return triggerAndReturn(context || document, eventName, data)
  }

  // Number of active Ajax requests
  $.active = 0

  function ajaxStart(settings) {
    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
  }
  function ajaxStop(settings) {
    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
      return false

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
  }
  function ajaxSuccess(data, xhr, settings, deferred) {
    var context = settings.context, status = 'success'
    settings.success.call(context, data, status, xhr)
    if (deferred) deferred.resolveWith(context, [data, status, xhr])
    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
    ajaxComplete(status, xhr, settings)
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, xhr, settings, deferred) {
    var context = settings.context
    settings.error.call(context, xhr, type, error)
    if (deferred) deferred.rejectWith(context, [xhr, type, error])
    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
    ajaxComplete(type, xhr, settings)
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
    var context = settings.context
    settings.complete.call(context, xhr, status)
    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
    ajaxStop(settings)
  }

  // Empty function, used as default callback
  function empty() {}

  $.ajaxJSONP = function(options, deferred){
    if (!('type' in options)) return $.ajax(options)

    var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ?
        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function(errorType) {
        $(script).triggerHandler('error', errorType || 'abort')
      },
      xhr = { abort: abort }, abortTimeout

    if (deferred) deferred.promise(xhr)

    $(script).on('load error', function(e, errorType){
      clearTimeout(abortTimeout)
      $(script).off().remove()

      if (e.type == 'error' || !responseData) {
        ajaxError(null, errorType || 'error', xhr, options, deferred)
      } else {
        ajaxSuccess(responseData[0], xhr, options, deferred)
      }

      window[callbackName] = originalCallback
      if (responseData && $.isFunction(originalCallback))
        originalCallback(responseData[0])

      originalCallback = responseData = undefined
    })

    if (ajaxBeforeSend(xhr, options) === false) {
      abort('abort')
      return xhr
    }

    window[callbackName] = function(){
      responseData = arguments
    }

    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
    document.head.appendChild(script)

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
      abort('timeout')
    }, options.timeout)

    return xhr
  }

  $.ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    // Transport
    xhr: function () {
      return new window.XMLHttpRequest()
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    // Whether data should be serialized to string
    processData: true,
    // Whether the browser should be allowed to cache GET responses
    cache: true
  }

  function mimeToDataType(mime) {
    if (mime) mime = mime.split(';', 2)[0]
    return mime && ( mime == htmlType ? 'html' :
      mime == jsonType ? 'json' :
      scriptTypeRE.test(mime) ? 'script' :
      xmlTypeRE.test(mime) && 'xml' ) || 'text'
  }

  function appendQuery(url, query) {
    if (query == '') return url
    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
  }

  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
    if (options.processData && options.data && $.type(options.data) != "string")
      options.data = $.param(options.data, options.traditional)
    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
      options.url = appendQuery(options.url, options.data), options.data = undefined
  }

  $.ajax = function(options){
    var settings = $.extend({}, options || {}),
        deferred = $.Deferred && $.Deferred()
    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

    ajaxStart(settings)

    if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      RegExp.$2 != window.location.host

    if (!settings.url) settings.url = window.location.toString()
    serializeData(settings)

    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
    if (hasPlaceholder) dataType = 'jsonp'

    if (settings.cache === false || (
         (!options || options.cache !== true) &&
         ('script' == dataType || 'jsonp' == dataType)
        ))
      settings.url = appendQuery(settings.url, '_=' + Date.now())

    if ('jsonp' == dataType) {
      if (!hasPlaceholder)
        settings.url = appendQuery(settings.url,
          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
      return $.ajaxJSONP(settings, deferred)
    }

    var mime = settings.accepts[dataType],
        headers = { },
        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
        xhr = settings.xhr(),
        nativeSetHeader = xhr.setRequestHeader,
        abortTimeout

    if (deferred) deferred.promise(xhr)

    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
    setHeader('Accept', mime || '*/*')
    if (mime = settings.mimeType || mime) {
      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
      xhr.overrideMimeType && xhr.overrideMimeType(mime)
    }
    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
    xhr.setRequestHeader = setHeader

    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        xhr.onreadystatechange = empty
        clearTimeout(abortTimeout)
        var result, error = false
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
          result = xhr.responseText

          try {
            // http://perfectionkills.com/global-eval-what-are-the-options/
            if (dataType == 'script')    (1,eval)(result)
            else if (dataType == 'xml')  result = xhr.responseXML
            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
          } catch (e) { error = e }

          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
          else ajaxSuccess(result, xhr, settings, deferred)
        } else {
          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
        }
      }
    }

    if (ajaxBeforeSend(xhr, settings) === false) {
      xhr.abort()
      ajaxError(null, 'abort', xhr, settings, deferred)
      return xhr
    }

    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

    var async = 'async' in settings ? settings.async : true
    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.onreadystatechange = empty
        xhr.abort()
        ajaxError(null, 'timeout', xhr, settings, deferred)
      }, settings.timeout)

    // avoid sending empty string (#319)
    xhr.send(settings.data ? settings.data : null)
    return xhr
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if ($.isFunction(data)) dataType = success, success = data, data = undefined
    if (!$.isFunction(success)) dataType = success, success = undefined
    return {
      url: url
    , data: data
    , success: success
    , dataType: dataType
    }
  }

  $.get = function(/* url, data, success, dataType */){
    return $.ajax(parseArguments.apply(null, arguments))
  }

  $.post = function(/* url, data, success, dataType */){
    var options = parseArguments.apply(null, arguments)
    options.type = 'POST'
    return $.ajax(options)
  }

  $.getJSON = function(/* url, data, success */){
    var options = parseArguments.apply(null, arguments)
    options.dataType = 'json'
    return $.ajax(options)
  }

  $.fn.load = function(url, data, success){
    if (!this.length) return this
    var self = this, parts = url.split(/\s/), selector,
        options = parseArguments(url, data, success),
        callback = options.success
    if (parts.length > 1) options.url = parts[0], selector = parts[1]
    options.success = function(response){
      self.html(selector ?
        $('<div>').html(response.replace(rscript, "")).find(selector)
        : response)
      callback && callback.apply(self, arguments)
    }
    $.ajax(options)
    return this
  }

  var escape = encodeURIComponent

  function serialize(params, obj, traditional, scope){
    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
    $.each(obj, function(key, value) {
      type = $.type(value)
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value)
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key)
      else params.add(key, value)
    })
  }

  $.param = function(obj, traditional){
    var params = []
    params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
    serialize(params, obj, traditional)
    return params.join('&').replace(/%20/g, '+')
  }
})(Zepto)

;(function($){
  $.fn.serializeArray = function() {
    var result = [], el
    $([].slice.call(this.get(0).elements)).each(function(){
      el = $(this)
      var type = el.attr('type')
      if (this.nodeName.toLowerCase() != 'fieldset' &&
        !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
        ((type != 'radio' && type != 'checkbox') || this.checked))
        result.push({
          name: el.attr('name'),
          value: el.val()
        })
    })
    return result
  }

  $.fn.serialize = function(){
    var result = []
    this.serializeArray().forEach(function(elm){
      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
    })
    return result.join('&')
  }

  $.fn.submit = function(callback) {
    if (callback) this.bind('submit', callback)
    else if (this.length) {
      var event = $.Event('submit')
      this.eq(0).trigger(event)
      if (!event.isDefaultPrevented()) this.get(0).submit()
    }
    return this
  }

})(Zepto)

;(function($){
  // __proto__ doesn't exist on IE<11, so redefine
  // the Z function to use object extension instead
  if (!('__proto__' in {})) {
    $.extend($.zepto, {
      Z: function(dom, selector){
        dom = dom || []
        $.extend(dom, $.fn)
        dom.selector = selector || ''
        dom.__Z = true
        return dom
      },
      // this is a kludge but works
      isZ: function(object){
        return $.type(object) === 'array' && '__Z' in object
      }
    })
  }

  // getComputedStyle shouldn't freak out when called
  // without a valid element as argument
  try {
    getComputedStyle(undefined)
  } catch(e) {
    var nativeGetComputedStyle = getComputedStyle;
    window.getComputedStyle = function(element){
      try {
        return nativeGetComputedStyle(element)
      } catch(e) {
        return null
      }
    }
  }
})(Zepto)

//     Zepto.js
//     (c) 2010-2014 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    if(!('ontouchstart' in window)) return true;
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }
  
  function isWindows(){
    if(!('ontouchstart' in window)) return true;
  }
    
  function isPointerEventType(e, type){
    if(!('ontouchstart' in window)) return true;
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType;
    
    var touchStart = isWindows()?'MSPointerDown pointerdown mousedown':'touchstart MSPointerDown pointerdown';
    var touchMove = isWindows()?'MSPointerMove pointermove mousemove':'touchmove MSPointerMove pointermove';
    var touchEnd = isWindows()?'MSPointerUp pointerup mouseup':'touchend MSPointerUp pointerup';
    
    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on(touchStart, function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        deltaX = 0;
        deltaY = 0;
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on(touchMove, function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY
        
        if(isNaN(deltaX)) deltaX = 0;
        if(isNaN(deltaY)) deltaY = 0;
        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
        touch.el && touch.el.trigger('swipeMove'+(swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)),{dx:Math.abs(touch.x1 - touch.x2),dy:Math.abs(touch.y1 - touch.y2)});

      })
      .on(touchEnd, function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30 || isWindows()) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              touch.el.trigger(event)

              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipeMoveLeft','swipeMoveRight','swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto)
;//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      else func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));
;//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var slice = array.slice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;

      // Remove all callbacks for all events.
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }

      var names = name ? [name] : _.keys(this._events);
      for (var i = 0, length = names.length; i < length; i++) {
        name = names[i];

        // Bail out if there are no events stored.
        var events = this._events[name];
        if (!events) continue;

        // Remove all callbacks for this event.
        if (!callback && !context) {
          delete this._events[name];
          continue;
        }

        // Find any remaining events.
        var remaining = [];
        for (var j = 0, k = events.length; j < k; j++) {
          var event = events[j];
          if (
            callback && callback !== event.callback &&
            callback !== event.callback._callback ||
            context && context !== event.context
          ) {
            remaining.push(event);
          }
        }

        // Replace events if there are any remaining.  Otherwise, clean up.
        if (remaining.length) {
          this._events[name] = remaining;
        } else {
          delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, length = names.length; i < length; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, length = changes.length; i < length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch' && !options.attrs) options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.stopListening();
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit', 'chain'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    if (!_[method]) return;
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analogous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      for (var i = 0, length = models.length; i < length; i++) {
        var model = models[i] = this.get(models[i]);
        if (!model) continue;
        var id = this.modelId(model.attributes);
        if (id != null) delete this._byId[id];
        delete this._byId[model.cid];
        var index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : models.slice();
      var id, model, attrs, existing, sort;
      var at = options.at;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (var i = 0, length = models.length; i < length; i++) {
        attrs = models[i];

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(attrs)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge && attrs !== existing) {
            attrs = this._isModel(attrs) ? attrs.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (!model) continue;
        id = this.modelId(model.attributes);
        if (order && (model.isNew() || !modelMap[id])) order.push(model);
        modelMap[id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (var i = 0, length = this.length; i < length; i++) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (var i = 0, length = toAdd.length; i < length; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (var i = 0, length = orderedModels.length; i < length; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (var i = 0, length = toAdd.length; i < length; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, length = this.models.length; i < length; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      var id = this.modelId(this._isModel(obj) ? obj.attributes : obj);
      return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },

    // Define how to uniquely identify models in the collection.
    modelId: function (attrs) {
      return attrs[this.model.prototype.idAttribute || 'id'];
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (this._isModel(attrs)) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Method for checking whether an object should be considered a model for
    // the purposes of adding to the collection.
    _isModel: function (model) {
      return model instanceof Model;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (id != null) this._byId[id] = model;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (event === 'change') {
        var prevId = this.modelId(model.previousAttributes());
        var id = this.modelId(model.attributes);
        if (prevId !== id) {
          if (prevId != null) delete this._byId[prevId];
          if (id != null) this._byId[id] = model;
        }
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample', 'partition'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    if (!_[method]) return;
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    if (!_[method]) return;
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this._removeElement();
      this.stopListening();
      return this;
    },

    // Remove this view's element from the document and all event listeners
    // attached to it. Exposed for subclasses using an alternative DOM
    // manipulation API.
    _removeElement: function() {
      this.$el.remove();
    },

    // Change the view's element (`this.el` property) and re-delegate the
    // view's events on the new element.
    setElement: function(element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
    },

    // Creates the `this.el` and `this.$el` references for this view using the
    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
    // context or an element. Subclasses can override this to utilize an
    // alternative DOM manipulation API and are only required to set the
    // `this.el` property.
    _setElement: function(el) {
      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      this.el = this.$el[0];
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], _.bind(method, this));
      }
      return this;
    },

    // Add a single event listener to the view's element (or a child element
    // using `selector`). This only works for delegate-able events: not `focus`,
    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
    delegate: function(eventName, selector, listener) {
      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
    },

    // Clears all callbacks previously bound to the view by `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // A finer-grained `undelegateEvents` for removing a single delegated event.
    // `selector` and `listener` are both optional.
    undelegate: function(eventName, selector, listener) {
      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
    },

    // Produces a DOM element to be assigned to your view. Exposed for
    // subclasses using an alternative DOM manipulation API.
    _createElement: function(tagName) {
      return document.createElement(tagName);
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
      }
    },

    // Set attributes from a hash on this view's element.  Exposed for
    // subclasses using an alternative DOM manipulation API.
    _setAttributes: function(attributes) {
      this.$el.attr(attributes);
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Pass along `textStatus` and `errorThrown` from jQuery.
    var error = options.error;
    options.error = function(xhr, textStatus, errorThrown) {
      options.textStatus = textStatus;
      options.errorThrown = errorThrown;
      if (error) error.apply(this, arguments);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args, name) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.getSearch();
    },

    // In IE6, the hash fragment and search params are incorrect if the
    // fragment contains `?`.
    getSearch: function() {
      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function() {
      var path = decodeURI(this.location.pathname + this.getSearch());
      var root = this.root.slice(0, -1);
      if (!path.indexOf(root)) path = path.slice(root.length);
      return path.slice(1);
    },

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function(fragment) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange) {
          fragment = this.getPath();
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error('Backbone.history has already been started');
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange   = 'onhashchange' in window;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      this.fragment         = this.getFragment();

      // Add a cross-platform `addEventListener` shim for older browsers.
      var addEventListener = window.addEventListener || function (eventName, listener) {
        return attachEvent('on' + eventName, listener);
      };

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      // Proxy an iframe to handle location events if the browser doesn't
      // support the `hashchange` event, HTML5 history, or the user wants
      // `hashChange` but not `pushState`.
      if (!this._hasHashChange && this._wantsHashChange && (!this._wantsPushState || !this._hasPushState)) {
        var iframe = document.createElement('iframe');
        iframe.src = 'javascript:0';
        iframe.style.display = 'none';
        iframe.tabIndex = -1;
        var body = document.body;
        // Using `appendChild` will throw on IE < 9 if the document is not ready.
        this.iframe = body.insertBefore(iframe, body.firstChild).contentWindow;
        this.navigate(this.fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        addEventListener('popstate', this.checkUrl, false);
      } else if (this._wantsHashChange && this._hasHashChange && !this.iframe) {
        addEventListener('hashchange', this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.location.replace(this.root + '#' + this.getPath());
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {replace: true});
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      // Add a cross-platform `removeEventListener` shim for older browsers.
      var removeEventListener = window.removeEventListener || function (eventName, listener) {
        return detachEvent('on' + eventName, listener);
      };

      // Remove window listeners.
      if (this._hasPushState) {
        removeEventListener('popstate', this.checkUrl, false);
      } else if (this._wantsHashChange && this._hasHashChange && !this.iframe) {
        removeEventListener('hashchange', this.checkUrl, false);
      }

      // Clean up the iframe if necessary.
      if (this.iframe) {
        document.body.removeChild(this.iframe.frameElement);
        this.iframe = null;
      }

      // Some environments will throw when clearing an undefined interval.
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getHash(this.iframe);
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash and decode for matching.
      fragment = decodeURI(fragment.replace(pathStripper, ''));

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getHash(this.iframe))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));
;/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:appcan 基础对象
    created:2014,08.18
    update:2013.08.22 by dushaobin


*/
/* global window */
;(function(global){
    var appcan = {};
    var isUexReady = false;
    var readyQueue = [];
    var isAppcan =false;
    //appcan 相关模块
    appcan.modules = {};
    
    //获取唯一id
    var getUID = function(){
        var maxId = 65536;
        var uid = 0;
        return function(){
            uid = (uid+1)%maxId;
            return uid;
        };
    }();
    
    //获取随机的唯一id，随机不重复，长度固定
    var getUUID = function(len){
        len = len || 6;
        len = parseInt(len,10);
        len = isNaN(len)?6:len;
        var seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ';
        var seedLen = seed.length - 1;
        var uuid = '';
        while(len--){
            uuid += seed[Math.round(Math.random()*seedLen)]
        }
        return uuid;
    }
    
    //是否是函数
    var isFunction = function(obj){
        return Object.prototype.toString.call(obj) === '[object Function]';
    };
    //是否是字符串
    var isString = function(obj){
        return Object.prototype.toString.call(obj) === '[object String]';
    };
    //是否是object对象
    var isObject = function(obj){
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    //是否是数组
    var isArray = function(obj){
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    //是否是window对象
    var isWindow = function(obj){
        return obj != null && obj == obj.window;
    };
    //是否是纯对象
    var isPlainObject = function (obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    };
    //扩展对象
    var extend = function(target, source, deep) {
        var key = null;
        for (key in source){
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                if (isPlainObject(source[key]) && !isPlainObject(target[key])){
                    target[key] = {};
                }
                if (isArray(source[key]) && !isArray(target[key])){
                    target[key] = [];
                }
                extend(target[key], source[key], deep);
            }
            else if (source[key] !== undefined) {
                target[key] = source[key];
            }
        }
        return target;
    };
    
    //添加appcan 版本
    appcan.version = '0.1.16';
    
    var errorInfo = {
        moduleName:'模块的名字必须为字符串并且不能为空！',
        moduleFactory:'模块构造对象必须是函数！'
    };

    //定义一个模块，或者插件
    appcan.define = function(name,factory){
        if(isFunction(name)){
            name = '';
            factory = name;
        }
        if(!name || !isString(name)){
            throw new Error(errorInfo.moduleName);
        }
        if(!isFunction(factory)){
            throw new Error(errorInfo.moduleFactory);
        }
        var mod = {exports:{}};
        var res = factory.call(this,appcan.require('dom'),mod.exports,mod);
        var exports = mod.exports || res;
        //模块已经存在
        if(name in appcan){
            appcan[name] = [appcan.name];
            appcan[name].push(exports);
        }else{
            appcan[name] = exports;
        }
        return exports;
    };

    /*
    对模块进行扩展
    @param String name 要扩展的对象
    @param Function factory 扩展函数


    */
    appcan.extend = function(name,factory){
        if(arguments.length > 1 && isPlainObject(name)){
            return extend.apply(appcan,arguments);
        }
        if(isFunction(name) || isPlainObject(name)){
            factory = name;
            name = '';
        }
        name = name ? name : this;
        var extendTo = appcan.require(name);
        extendTo = extendTo ? extendTo : this;
        var mod = {exports:{}};
        var res = null;
        var exports = mod.exports;
        if(isFunction(factory)){
            res = factory.call(this,extendTo,exports,mod);
            res = res || mod.exports;
            extend(extendTo,res);
        }
        if(isPlainObject(factory)){
            extend(extendTo,factory);
        }
        return extendTo;
    };

    //加载依赖的文件
    appcan.require = function(name){
        if(!name){
            throw new Error(errorInfo.moduleName);
        }
        if(!isString(name)){
            return name;
        }
        var res = appcan[name];
        if(isArray(res) && res.length < 2){
            return res[0];
        }
        return res || null;
    };

    //代码入口
    appcan.use = function(modules,factory){
        if(isFunction(modules)){
            factory = modules;
            modules = [];
        }
        if(isString(modules)){
            modules = [modules];
            factory = factory;
        }
        if(!isArray(modules)){
            throw new Error('以来模块参数不正确！');
        }
        var args = [];
        args.push(appcan.require('dom'));
        for(var i=0,len=modules.length; i<len; i++){
            args.push(appcan.require(modules[i]));
        }
        return factory.apply(appcan,args);
    };

    /*
    是否在appcan内运行
    */

    appcan.extend({
        isPlainObject:isPlainObject,
        isFunction:isFunction,
        isString:isString,
        isArray:isArray,
        isAppcan:isAppcan,
        getOptionId:getUID,
        getUID:getUUID
    });

    /*
        继承类

    */
    appcan.inherit = function(parent,protoProps, staticProps) {
        if(!isFunction(parent)){
            staticProps = protoProps;
            protoProps = parent;
            parent = function(){};
        }else{
            parent = parent;
        }
        var child;
        if (protoProps && (protoProps.hasOwnProperty('constructor'))) {
            child = protoProps.constructor;
        } else {
            child = function(){
                parent.apply(this, arguments);
                this.initated && (this.initated.apply(this,arguments));
                return this;
            };
        }
        extend(child,parent);
        extend(child,staticProps);
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();
        if (protoProps) {
            extend(child.prototype, protoProps);
        }
        child.__super__ = parent.prototype;
        return child;
    };

    /*
    执行添加到ready中的方法

    */
    function execReadyQueue(){
        for(var i=0,len=readyQueue.length;i<len;i++){
            readyQueue[i].call(appcan);
        }
        readyQueue.length = 0;
    }

    /*
    检查是ready
    @param Function callback 回调函数

    */
    function ready(callback){
        callback = isFunction(callback)?callback:function(){};
        readyQueue.push(callback);
        if(isUexReady){
            execReadyQueue();
            return;
        }
        if('uexWindow' in window){
            isUexReady = true;
            execReadyQueue();
            return;
        }else{
            //判断uex插件是否ready
            if(readyQueue.length > 1){
                return;
            }
            if(isFunction(window.uexOnload)){
                readyQueue.unshift(window.uexOnload);
            }
            window.uexOnload = function(type){
                isAppcan = true;
                appcan.isAppcan = true;
                if(!type){
                    isUexReady = true;
                    execReadyQueue();
                }
            };
        }
    }

    //设置uexReady
    appcan.ready = ready;
    global.appcan = appcan;
})(this);
;/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:扩展zepto到appcan dom 对象上
    扩展Backbone到appcan Backbone 对象上
    扩展underscore到appcan _ 对象上
    created:2014,08.18
    update:


*/
/*global appcan,Zepto,Backbone,_,uexLog,window*/

//把zepto，导入到appcan.dom 上
window.appcan && window.appcan.define('dom',function($,exports,module){
    module.exports = Zepto;
});

//把Backbone，导入到appcan.Backbone 上
window.appcan && appcan.define('Backbone',function($,exports,module){
    module.exports = Backbone;
});

//把underscore，导入到appcan._ 上
window.appcan && appcan.define('_',function($,exports,module){
    module.exports = _;
});

//把underscore，导入到appcan.underscore 上
window.appcan && appcan.define('underscore',function($,exports,module){
    module.exports = _;
});

//扩展appcan基础库能力
window.appcan && appcan.extend(function(ac,exports,module){

    /*
    打印日志到控制台，如果是appcan应用打印到，响应的控制台
    @param * obj 任何类型

    */
    var logs = function(obj){
        try{
            if(window.uexLog){
                window.uexLog && uexLog.sendLog(obj);
            }else{
                console && console.log(obj);
            }
        }catch(e){
            return e;
        }
    };

    ac.logs = logs;

});

//扩展原声的dom对象
window.appcan && appcan.extend('dom',function(dom,exports,module){
    if(!appcan.isAppcan){
        return;
    }
    
});
;/*

    author:dushaobin
    email:shaobin.du@3g2win.com
    description:构建appcan view模块
    create:2014.08.25
    update:______/___author___


*/
/* global appcan,window,document*/
appcan && appcan.define('detect',function(ac,exports,module){
    var os = {};
    var browser = {};
    var ua = window.navigator.userAgent;
    var webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
      android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
      osx = ua.match(/\(Macintosh\; Intel .*OS X ([\d_.]+).+\)/),
      ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
      iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
      wp = ua.match(/Windows Phone ([\d.]+)/),
      touchpad = webos && ua.match(/TouchPad/),
      kindle = ua.match(/Kindle\/([\d.]+)/),
      silk = ua.match(/Silk\/([\d._]+)/),
      blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
      bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
      rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
      playbook = ua.match(/PlayBook/),
      chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
      firefox = ua.match(/Firefox\/([\d.]+)/),
      ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
      webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
      safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);

    // Todo: clean this up with a better OS/browser seperation:
    // - discern (more) between multiple browsers on android
    // - decide if kindle fire in silk mode is android or not
    // - Firefox on Android doesn't specify the Android version
    // - possibly devide in os, device and browser hashes

    if (browser.webkit = !!webkit) {
        browser.version = webkit[1];
    }
    //android
    if (android) {
        os.name = 'android';
        os.android = true;
        os.version = android[2];
    }

    if (iphone && !ipod) {
        os.name = 'iphone';
        os.ios = os.iphone = true;
        os.version = iphone[2].replace(/_/g, '.');
    }

    if (ipad){
        os.name = 'ipad';
        os.ios = os.ipad = true;
        os.version = ipad[2].replace(/_/g, '.');
    }
    if (ipod) {
        os.name = 'ipod';
        os.ios = os.ipod = true;
        os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    }
    if (wp) {
        os.name = 'wp';
        os.wp = true;
        os.version = wp[1];
    }
    if (webos) {
        os.name = 'webos';
        os.webos = true;
        os.version = webos[2];
    }

    if (touchpad) {
        os.name = 'touchpad';
        os.touchpad = true;
    }

    if (blackberry) {
        os.name = 'blackberry';
        os.blackberry = true;
        os.version = blackberry[2];
    }

    if (bb10) {
        os.name = 'bb10';
        os.bb10 = true;
        os.version = bb10[2];
    }

    if (rimtabletos) {
        os.name = 'rimtabletos';
        os.rimtabletos = true;
        os.version = rimtabletos[2];
    }

    if (playbook) {
        browser.name = 'playbook';
        browser.playbook = true;
    }

    if (kindle) {
        os.name = 'kindle';
        os.kindle = true;
        os.version = kindle[1];
    }
    if (silk) {
        browser.name = 'silk';
        browser.silk = true;
        browser.version = silk[1];
    }
    if (!silk && os.android && ua.match(/Kindle Fire/)) {
        browser.name = 'silk';
        browser.silk = true;
    }
    if (chrome) {
        browser.name = 'chrome';
        browser.chrome = true;
        browser.version = chrome[1];
    }
    if (firefox) {
        browser.name = 'firefox';
        browser.firefox = true;
        browser.version = firefox[1];
    }
    if (ie) {
        browser.name = 'ie';
        browser.ie = true;
        browser.version = ie[1];
    }
    if (safari && (osx || os.ios)) {
        browser.name = 'safari';
        browser.safari = true;
        if (osx) {
            browser.version = safari[1];
        }
    }
    if(osx){
        os.name = 'osx';
        os.version = osx[1].split('_').join('.');
    }
    if (webview) {
        browser.name = 'webview';
        browser.webview = true;
    }
    //appcan navive 应用
    if(!!(appcan.isAppcan)){
        browser.name = 'appcan';
        browser.appcan = true;
    }
    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
      (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
    os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
      (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
      (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));

    //检查是否支持touch事件
    var checkTouchEvent = function(){
        if(('ontouchstart' in window) || window.DocumentTouch && window.document instanceof window.DocumentTouch) {
          return true;
        }
        return false;
    };

    //判断是否支持css3d,todo：避免多次创建
    var supports3d = function() {
		var div = document.createElement('div'),
			ret = false,
			properties = ['perspectiveProperty', 'WebkitPerspective'];
		for (var i = properties.length - 1; i >= 0; i--){
			ret = ret ? ret : div.style[properties[i]] !== undefined;
		}

        //如果webkit 3d transforms被禁用,虽然语法上检查没问题，但是还是不支持
        if (ret){
            var st = document.createElement('style');
            // webkit allows this media query to succeed only if the feature is enabled.
            // "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){#modernizr{height:3px}}"
            st.textContent = '@media (-webkit-transform-3d){#test3d{height:3px}}';
            document.getElementsByTagName('head')[0].appendChild(st);
            div.id = 'test3d';
            document.documentElement.appendChild(div);
            ret = (div.offsetHeight === 3);
            st.parentNode.removeChild(st);
            div.parentNode.removeChild(div);
        }
        return ret;
	};

    //事件的支持度检测
    var events = {
        supportTouch:checkTouchEvent()
    };

    //css的支持度检测
    var css = {
        support3d:supports3d()
    };

    //Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13
    module.exports = {
        browser:browser,
        os:os,
        event:events,
        css:css,
        ua:ua
    };

});
;/*
 author:dushaobin
 email:shaobin.du@3g2win.com
 description:扩展encrypt 到appcan对象上
 created:2014,08.21
 update:

 */
/*global appcan*/
appcan && appcan.define('crypto', function($, exports, module) {
    /*
     扰乱s-box
     @param String key 字符串长度为0-256位

     */
    function rc4Init(key) {
        var s = [],
            j = 0,
            x;
        for (var i = 0; i < 256; i++) {
            s[i] = i;
        }
        for ( i = 0; i < 256; i++) {
            j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
        }
        return s;
    }

    /*
     用rc4 进行加解密
     @param String str 要加密的数据
     @param Array s 初始化好的s-box

     */
    function rc4Encrypt(str, s) {
        var i = 0;
        var j = 0;
        var res = '';
        var k = [];
        var x = null;
        k = k.concat(s);
        for (var y = 0; y < str.length; y++) {
            i = (i + 1) % 256;
            j = (j + k[i]) % 256;
            x = k[i];
            k[i] = k[j];
            k[j] = x;
            var dest = str.charCodeAt(y) ^ k[(k[i] + k[j]) % 256] || str.charCodeAt(y)
            res +=String.fromCharCode(dest)

        }
        return res;
    }

    /*
     直接加密数据合并两个方法

     */
    function rc4EncryptWithKey(key, content) {
        if (!key || !content) {
            return '';
        }
        var sbox = rc4Init(key);
        return rc4Encrypt(content, sbox);
    }

    function MD5(data) {

        // convert number to (unsigned) 32 bit hex, zero filled string
        function to_zerofilled_hex(n) {
            var t1 = (n >>> 0).toString(16)
            return "00000000".substr(0, 8 - t1.length) + t1
        }

        // convert array of chars to array of bytes
        function chars_to_bytes(ac) {
            var retval = []
            for (var i = 0; i < ac.length; i++) {
                retval = retval.concat(str_to_bytes(ac[i]))
            }
            return retval
        }

        // convert a 64 bit unsigned number to array of bytes. Little endian
        function int64_to_bytes(num) {
            var retval = []
            for (var i = 0; i < 8; i++) {
                retval.push(num & 0xFF)
                num = num >>> 8
            }
            return retval
        }

        //  32 bit left-rotation
        function rol(num, places) {
            return ((num << places) & 0xFFFFFFFF) | (num >>> (32 - places))
        }

        // The 4 MD5 functions
        function fF(b, c, d) {
            return (b & c) | (~b & d)
        }

        function fG(b, c, d) {
            return (d & b) | (~d & c)
        }

        function fH(b, c, d) {
            return b ^ c ^ d
        }

        function fI(b, c, d) {
            return c ^ (b | ~d)
        }

        // pick 4 bytes at specified offset. Little-endian is assumed
        function bytes_to_int32(arr, off) {
            return (arr[off + 3] << 24) | (arr[off + 2] << 16) | (arr[off + 1] << 8) | (arr[off])
        }

        /*
         Conver string to array of bytes in UTF-8 encoding
         See:
         http://www.dangrossman.info/2007/05/25/handling-utf-8-in-javascript-php-and-non-utf8-databases/
         http://stackoverflow.com/questions/1240408/reading-bytes-from-a-javascript-string
         How about a String.getBytes(<ENCODING>) for Javascript!? Isn't it time to add it?
         */
        function str_to_bytes(str) {
            var retval = []
            for (var i = 0; i < str.length; i++)
                if (str.charCodeAt(i) <= 0x7F) {
                    retval.push(str.charCodeAt(i))
                } else {
                    var tmp = encodeURIComponent(str.charAt(i)).substr(1).split('%')
                    for (var j = 0; j < tmp.length; j++) {
                        retval.push(parseInt(tmp[j], 0x10))
                    }
                }
            return retval
        }

        // convert the 4 32-bit buffers to a 128 bit hex string. (Little-endian is assumed)
        function int128le_to_hex(a, b, c, d) {
            var ra = ""
            var t = 0
            var ta = 0
            for (var i = 3; i >= 0; i--) {
                ta = arguments[i]
                t = (ta & 0xFF)
                ta = ta >>> 8
                t = t << 8
                t = t | (ta & 0xFF)
                ta = ta >>> 8
                t = t << 8
                t = t | (ta & 0xFF)
                ta = ta >>> 8
                t = t << 8
                t = t | ta
                ra = ra + to_zerofilled_hex(t)
            }
            return ra
        }

        // conversion from typed byte array to plain javascript array
        function typed_to_plain(tarr) {
            var retval = new Array(tarr.length)
            for (var i = 0; i < tarr.length; i++) {
                retval[i] = tarr[i]
            }
            return retval
        }

        // check input data type and perform conversions if needed
        var databytes = null
        // String
        var type_mismatch = null
        if ( typeof data == 'string') {
            // convert string to array bytes
            databytes = str_to_bytes(data)
        } else if (data.constructor == Array) {
            if (data.length === 0) {
                // if it's empty, just assume array of bytes
                databytes = data
            } else if ( typeof data[0] == 'string') {
                databytes = chars_to_bytes(data)
            } else if ( typeof data[0] == 'number') {
                databytes = data
            } else {
                type_mismatch = typeof data[0]
            }
        } else if ( typeof ArrayBuffer != 'undefined') {
            if ( data instanceof ArrayBuffer) {
                databytes = typed_to_plain(new Uint8Array(data))
            } else if (( data instanceof Uint8Array) || ( data instanceof Int8Array)) {
                databytes = typed_to_plain(data)
            } else if (( data instanceof Uint32Array) || ( data instanceof Int32Array) || ( data instanceof Uint16Array) || ( data instanceof Int16Array) || ( data instanceof Float32Array) || ( data instanceof Float64Array)) {
                databytes = typed_to_plain(new Uint8Array(data.buffer))
            } else {
                type_mismatch = typeof data
            }
        } else {
            type_mismatch = typeof data
        }

        if (type_mismatch) {
            alert('MD5 type mismatch, cannot process ' + type_mismatch)
        }

        function _add(n1, n2) {
            return 0x0FFFFFFFF & (n1 + n2)
        }

        return do_digest()

        function do_digest() {

            // function update partial state for each run
            function updateRun(nf, sin32, dw32, b32) {
                var temp = d
                d = c
                c = b
                //b = b + rol(a + (nf + (sin32 + dw32)), b32)
                b = _add(b, rol(_add(a, _add(nf, _add(sin32, dw32))), b32))
                a = temp
            }

            // save original length
            var org_len = databytes.length

            // first append the "1" + 7x "0"
            databytes.push(0x80)

            // determine required amount of padding
            var tail = databytes.length % 64
            // no room for msg length?
            if (tail > 56) {
                // pad to next 512 bit block
                for (var i = 0; i < (64 - tail); i++) {
                    databytes.push(0x0)
                }
                tail = databytes.length % 64
            }
            for ( i = 0; i < (56 - tail); i++) {
                databytes.push(0x0)
            }
            // message length in bits mod 512 should now be 448
            // append 64 bit, little-endian original msg length (in *bits*!)
            databytes = databytes.concat(int64_to_bytes(org_len * 8))

            // initialize 4x32 bit state
            var h0 = 0x67452301
            var h1 = 0xEFCDAB89
            var h2 = 0x98BADCFE
            var h3 = 0x10325476

            // temp buffers
            var a = 0,
                b = 0,
                c = 0,
                d = 0

            // Digest message
            for ( i = 0; i < databytes.length / 64; i++) {
                // initialize run
                a = h0
                b = h1
                c = h2
                d = h3

                var ptr = i * 64

                // do 64 runs
                updateRun(fF(b, c, d), 0xd76aa478, bytes_to_int32(databytes, ptr), 7)
                updateRun(fF(b, c, d), 0xe8c7b756, bytes_to_int32(databytes, ptr + 4), 12)
                updateRun(fF(b, c, d), 0x242070db, bytes_to_int32(databytes, ptr + 8), 17)
                updateRun(fF(b, c, d), 0xc1bdceee, bytes_to_int32(databytes, ptr + 12), 22)
                updateRun(fF(b, c, d), 0xf57c0faf, bytes_to_int32(databytes, ptr + 16), 7)
                updateRun(fF(b, c, d), 0x4787c62a, bytes_to_int32(databytes, ptr + 20), 12)
                updateRun(fF(b, c, d), 0xa8304613, bytes_to_int32(databytes, ptr + 24), 17)
                updateRun(fF(b, c, d), 0xfd469501, bytes_to_int32(databytes, ptr + 28), 22)
                updateRun(fF(b, c, d), 0x698098d8, bytes_to_int32(databytes, ptr + 32), 7)
                updateRun(fF(b, c, d), 0x8b44f7af, bytes_to_int32(databytes, ptr + 36), 12)
                updateRun(fF(b, c, d), 0xffff5bb1, bytes_to_int32(databytes, ptr + 40), 17)
                updateRun(fF(b, c, d), 0x895cd7be, bytes_to_int32(databytes, ptr + 44), 22)
                updateRun(fF(b, c, d), 0x6b901122, bytes_to_int32(databytes, ptr + 48), 7)
                updateRun(fF(b, c, d), 0xfd987193, bytes_to_int32(databytes, ptr + 52), 12)
                updateRun(fF(b, c, d), 0xa679438e, bytes_to_int32(databytes, ptr + 56), 17)
                updateRun(fF(b, c, d), 0x49b40821, bytes_to_int32(databytes, ptr + 60), 22)
                updateRun(fG(b, c, d), 0xf61e2562, bytes_to_int32(databytes, ptr + 4), 5)
                updateRun(fG(b, c, d), 0xc040b340, bytes_to_int32(databytes, ptr + 24), 9)
                updateRun(fG(b, c, d), 0x265e5a51, bytes_to_int32(databytes, ptr + 44), 14)
                updateRun(fG(b, c, d), 0xe9b6c7aa, bytes_to_int32(databytes, ptr), 20)
                updateRun(fG(b, c, d), 0xd62f105d, bytes_to_int32(databytes, ptr + 20), 5)
                updateRun(fG(b, c, d), 0x2441453, bytes_to_int32(databytes, ptr + 40), 9)
                updateRun(fG(b, c, d), 0xd8a1e681, bytes_to_int32(databytes, ptr + 60), 14)
                updateRun(fG(b, c, d), 0xe7d3fbc8, bytes_to_int32(databytes, ptr + 16), 20)
                updateRun(fG(b, c, d), 0x21e1cde6, bytes_to_int32(databytes, ptr + 36), 5)
                updateRun(fG(b, c, d), 0xc33707d6, bytes_to_int32(databytes, ptr + 56), 9)
                updateRun(fG(b, c, d), 0xf4d50d87, bytes_to_int32(databytes, ptr + 12), 14)
                updateRun(fG(b, c, d), 0x455a14ed, bytes_to_int32(databytes, ptr + 32), 20)
                updateRun(fG(b, c, d), 0xa9e3e905, bytes_to_int32(databytes, ptr + 52), 5)
                updateRun(fG(b, c, d), 0xfcefa3f8, bytes_to_int32(databytes, ptr + 8), 9)
                updateRun(fG(b, c, d), 0x676f02d9, bytes_to_int32(databytes, ptr + 28), 14)
                updateRun(fG(b, c, d), 0x8d2a4c8a, bytes_to_int32(databytes, ptr + 48), 20)
                updateRun(fH(b, c, d), 0xfffa3942, bytes_to_int32(databytes, ptr + 20), 4)
                updateRun(fH(b, c, d), 0x8771f681, bytes_to_int32(databytes, ptr + 32), 11)
                updateRun(fH(b, c, d), 0x6d9d6122, bytes_to_int32(databytes, ptr + 44), 16)
                updateRun(fH(b, c, d), 0xfde5380c, bytes_to_int32(databytes, ptr + 56), 23)
                updateRun(fH(b, c, d), 0xa4beea44, bytes_to_int32(databytes, ptr + 4), 4)
                updateRun(fH(b, c, d), 0x4bdecfa9, bytes_to_int32(databytes, ptr + 16), 11)
                updateRun(fH(b, c, d), 0xf6bb4b60, bytes_to_int32(databytes, ptr + 28), 16)
                updateRun(fH(b, c, d), 0xbebfbc70, bytes_to_int32(databytes, ptr + 40), 23)
                updateRun(fH(b, c, d), 0x289b7ec6, bytes_to_int32(databytes, ptr + 52), 4)
                updateRun(fH(b, c, d), 0xeaa127fa, bytes_to_int32(databytes, ptr), 11)
                updateRun(fH(b, c, d), 0xd4ef3085, bytes_to_int32(databytes, ptr + 12), 16)
                updateRun(fH(b, c, d), 0x4881d05, bytes_to_int32(databytes, ptr + 24), 23)
                updateRun(fH(b, c, d), 0xd9d4d039, bytes_to_int32(databytes, ptr + 36), 4)
                updateRun(fH(b, c, d), 0xe6db99e5, bytes_to_int32(databytes, ptr + 48), 11)
                updateRun(fH(b, c, d), 0x1fa27cf8, bytes_to_int32(databytes, ptr + 60), 16)
                updateRun(fH(b, c, d), 0xc4ac5665, bytes_to_int32(databytes, ptr + 8), 23)
                updateRun(fI(b, c, d), 0xf4292244, bytes_to_int32(databytes, ptr), 6)
                updateRun(fI(b, c, d), 0x432aff97, bytes_to_int32(databytes, ptr + 28), 10)
                updateRun(fI(b, c, d), 0xab9423a7, bytes_to_int32(databytes, ptr + 56), 15)
                updateRun(fI(b, c, d), 0xfc93a039, bytes_to_int32(databytes, ptr + 20), 21)
                updateRun(fI(b, c, d), 0x655b59c3, bytes_to_int32(databytes, ptr + 48), 6)
                updateRun(fI(b, c, d), 0x8f0ccc92, bytes_to_int32(databytes, ptr + 12), 10)
                updateRun(fI(b, c, d), 0xffeff47d, bytes_to_int32(databytes, ptr + 40), 15)
                updateRun(fI(b, c, d), 0x85845dd1, bytes_to_int32(databytes, ptr + 4), 21)
                updateRun(fI(b, c, d), 0x6fa87e4f, bytes_to_int32(databytes, ptr + 32), 6)
                updateRun(fI(b, c, d), 0xfe2ce6e0, bytes_to_int32(databytes, ptr + 60), 10)
                updateRun(fI(b, c, d), 0xa3014314, bytes_to_int32(databytes, ptr + 24), 15)
                updateRun(fI(b, c, d), 0x4e0811a1, bytes_to_int32(databytes, ptr + 52), 21)
                updateRun(fI(b, c, d), 0xf7537e82, bytes_to_int32(databytes, ptr + 16), 6)
                updateRun(fI(b, c, d), 0xbd3af235, bytes_to_int32(databytes, ptr + 44), 10)
                updateRun(fI(b, c, d), 0x2ad7d2bb, bytes_to_int32(databytes, ptr + 8), 15)
                updateRun(fI(b, c, d), 0xeb86d391, bytes_to_int32(databytes, ptr + 36), 21)

                // update buffers
                h0 = _add(h0, a)
                h1 = _add(h1, b)
                h2 = _add(h2, c)
                h3 = _add(h3, d)
            }
            // Done! Convert buffers to 128 bit (LE)
            return int128le_to_hex(h3, h2, h1, h0).toUpperCase()
        }

    }


    module.exports = {
        /*
         rc4:{
         encryptWithKey:rc4EncryptWithKey
         }*/
        rc4 : rc4EncryptWithKey,
        md5 : MD5
    };

});
;/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:扩展 db 到appcan 对象上
    created:2014,08.22
    update:


*/
/*global appcan,window*/
appcan && appcan.define('database',function($,exports,module){

    var eventEmitter = appcan.require('eventEmitter');
    //var uexDataBaseMgr = window.uexDataBaseMgr || {};
    /*
    获取唯一操作符

    */
    var getOptId = appcan.getOptionId;

    /*
    数据库操作类
    @param String name 数据名

    */
    var DB = function(name){
        this.name = name;
    };
    var dbProto = {
        constructor:DB,
        select:function(sql,callback){
            var that = this;
            var optId = getOptId();
            if(arguments.length === 1 && appcan.isPlainObject(sql)){
                callback = sql.callback;
                sql = sql.sql;
            }
            if(appcan.isFunction(callback)){
                if(!sql){
                    return callback(new Error('sql 为空'));
                }
                uexDataBaseMgr.cbSelectSql = function(optId,dataType,data){
                    if(dataType != 1){
                        return callback(new Error('select error'));
                    }
                    callback(null,data,dataType,optId);
                    that.emit('select',null,data,dataType,optId);
                };
            }
            uexDataBaseMgr.selectSql(this.name,optId,sql);
        },
        exec:function(sql,callback){
            var that = this;
            var optId = getOptId();
            if(arguments.length === 1 && appcan.isPlainObject(sql)){
                callback = sql.callback;
                sql = sql.sql;
            }
            if(appcan.isFunction(callback)){
                if(!sql){
                    return callback(new Error('sql 为空'));
                }
                uexDataBaseMgr.cbExecuteSql = function(optId,dataType,data){
                    if(dataType != 2){
                        return callback(new Error('exec sql error'));
                    }
                    callback(null,data,dataType,optId);
                    that.emit('select',null,data,dataType,optId);
                };
            }
            uexDataBaseMgr.executeSql(this.name,optId,sql);
        },
        //执行事务
        transaction:function(sqlFun,callback){
            var that = this;
            var optId = getOptId();
            if(arguments.length === 1 && appcan.isPlainObject(sqlFun)){
                callback = sqlFun.callback;
                sqlFun = sqlFun.sqlFun;
            }
            if(appcan.isFunction(callback)){
                if(!appcan.isFunction(sqlFun)){
                    return callback(new Error('exec transaction error'));
                }
                window.uexDataBaseMgr.cbTransaction = function(optId,dataType,data){
                    if(dataType != 2){
                        return callback(new Error('exec transaction!'));
                    }
                    callback(null,data,dataType,optId);
                    that.emit('transaction',null,data,dataType,optId);
                };
            }
            uexDataBaseMgr.transaction(this.name,optId,sqlFun);
        }
    };
    //实现eventEmitter能力
    appcan.extend(dbProto,eventEmitter);
    DB.prototype = dbProto;

    var database = {
        /*
        创建一个数据库
        @param String name 数据库名字
        @param String optId 操作Id
        @param Function callback 创建完成回调


        */
        create:function(name,optId,callback){
            var argObj = null;
            if(arguments.length === 1 && appcan.isPlainObject(name)){
                argObj = name;
                name = argObj.name;
                optId = argObj.optId;
                callback = argObj.callback;
            }
            if(!name){
                callback(new Error('数据库名字不能为空！'));
                return;
            }
            if(appcan.isFunction(optId)){
                callback = optId;
                optId = '';
            }
            if(appcan.isFunction(callback)){
                uexDataBaseMgr.cbOpenDataBase = function(optId,type,data){
                    if(type != 2){
                        return callback(new Error('open database error'));
                    }
                    var db = new DB(name);
                    callback(null,data,db,type,optId);
                    this.emit('open',null,data,db,type,optId);
                };
            }
            uexDataBaseMgr.openDataBase(name,optId);
        },
        /*
        销户一个数据库
        @param String name 数据库名字
        @param String optId 操作Id
        @param Function callback 删除完成回调


        */
        destory:function(name,optId,callback){
            var argObj = null;
            if(arguments.length === 1 && appcan.isPlainObject(name)){
                argObj = name;
                name = argObj.name;
                optId = argObj.optId;
                callback = argObj.callback;
            }
            if(!name){
                return;
            }
            if(appcan.isFunction(optId)){
                callback = optId;
                optId = '';
            }
            if(appcan.isFunction(callback)){
                if(!name){
                    callback(new Error('数据库名字不能为空！'));
                    return;
                }
                uexDataBaseMgr.cbCloseDataBase = function(optId,dataType,data){
                    if(dataType != 2){
                        return callback(new Error('close database error'));
                    }
                    callback(null,data,dataType,optId);
                    this.emit('close',null,data,dataType,optId);
                };
            }

            uexDataBaseMgr.closeDataBase(name,optId);

        },
        /*
        查询数据库数据
        @param String name 数据库名
        @param String sql sql语句
        @param Function callback 查询结果回调


        */
        select:function(name,sql,callback){
            if(arguments.length === 1 && appcan.isPlainObject(name)){
                sql = name.sql;
                callback = name.callback;
                name = name.name;
            }
            if(!name || !appcan.isString(name)){
                return callback(new Error('数据库名不为空'));
            }
            var db = new DB(name);
            db.select(sql,callback);
        },
        exec:function(name,sql,callback){
            if(arguments.length === 1 && appcan.isPlainObject(name)){
                sql = name.sql;
                callback = name.callback;
                name = name.name;
            }
            if(!name || !appcan.isString(name)){
                return callback(new Error('数据库名不为空'));
            }
            var db = new DB(name);
            db.exec(sql,callback);
        },
        translaction:function(name,sqlFun,callback){
            if(arguments.length === 1 && appcan.isPlainObject(name)){
                sqlFun = name.sqlFun;
                callback = name.callback;
                name = name.name;
            }
            if(!name || !appcan.isString(name)){
                return callback(new Error('数据库名不为空'));
            }
            var db = new DB(name);
            db.transaction(sqlFun,callback);
        }
    };

    database = appcan.extend(database,eventEmitter);

    module.exports = database;

});
;/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:扩展zepto到appcan dom 对象上
    扩展Backbone到appcan Backbone 对象上
    扩展underscore到appcan _ 对象上
    created:2014,08.18
    update:


*/
/*global window,appcan*/
window.appcan && appcan.define('device',function($,exports,module){

    var completeCount = 0;
    //var uexDevice = window.uexDevice || {};
    /*
    启动设备震动一段时间
    @param Int millisecond 震动的毫秒数

    */
    function vibrate(millisecond){
        millisecond = parseInt(millisecond,10);
        millisecond = isNaN(millisecond)?0:millisecond;
        uexDevice.vibrate(millisecond);
    }

    /*
    取消设备的震动

    */
    function cancelVibrate(){
        uexDevice.cancelVibrate();
    }

    /*
    获取设备相关的信息
    @param Int infoId 设备信息Id
    @param Function callback 获取信息成功后的回调

    */
    function getInfo(infoId,callback){
        if(arguments.length === 1 && appcan.isPlainObject(infoId)){
            callback = infoId.callback;
            infoId = infoId.infoId;
        }
        if(appcan.isFunction(callback)){
            uexDevice.cbGetInfo = function(optId,dataType,data){
                if(dataType != 1){
                    return callback(new Error('get info error'+infoId));
                }
                callback(null,data,dataType,optId);
            };
        }
        uexDevice.getInfo(infoId);
    }

    /*
    获取所有设备相关的信息
    @param Function callback 每个结果的回调
    todo: 由于只能通过for循环获取系统信息所以用for

    */
    function getDeviceInfo(callback){
        var deviceInfo = {};
        for(var i=0,len = 18;i<len;i++){
            getInfo(i,function(err,data){
                completeCount++;
                if(err){
                    return callback(err);
                }
                var singleInfo = JSON.parse(data);
                appcan.extend(deviceInfo,singleInfo);
                callback(deviceInfo,singleInfo,i,len,completeCount);
            });
        }
        return deviceInfo;
    }

    //更新设备信息
    /*appcan.ready(function(){
        updateDeviceInfo(function(completeCount){
            if(completeCount > 17){
                deviceInfo.isUpdatedAll = true;
            }else{
                deviceInfo.isUpdateAll = false;
            }
            deviceInfo.completeCount = completeCount;
            appcan.extend(deviceRes,deviceInfo);
        });
    });*/

    //相关信息扩展到对象上

    module.exports = {
        vibrate:vibrate,
        cancelVibrate:cancelVibrate,
        getInfo:getInfo,
        getDeviceInfo:getDeviceInfo
    };

});
;/*

    author:dushaobin
    email:shaobin.du@3g2win.com
    description:构建appcan eventEmitter模块
    create:2014.08.18
    update:______/___author___


*/
/*global appcan*/
appcan && appcan.define('eventEmitter',function($,exports,module){
    //事件对象
    var eventEmitter = {
        on:function(name,callback){
            if(!this.__events){
                this.__events = {};
            }
            if(this.__events[name]){
                this.__events[name].push(callback);
            }else{
                this.__events[name] = [callback];
            }
        },
        off:function(name,callback){
            if(!this.__events){
                return;
            }
            if(name in this.__events){
                for(var i=0,len=this.__events[name].length;i<len;i++){
                    if(this.__events[name][i] === callback){
                        this.__events[name].splice(i,1);
                        return;
                    }
                }
            }
        },
        once:function(name,callback){
            var that = this;
            var tmpcall = function(){
                callback.apply(that,arguments);
                that.off(tmpcall);
            };
            this.on(name,tmpcall);
        },
        addEventListener:function(){
            return this.on.apply(this,arguments);
        },
        removeEventListener:function(){
            return this.off.apply(this,arguments);
        },
        trigger:function(name,context){
            var args = [].slice.call(arguments,2);
            if(!this.__events || !appcan.isString(name)){
                return;
            }
            context = context || this;
            if(name && (name in this.__events)){
                for(var i=0,len=this.__events[name].length;i<len;i++){
                    this.__events[name][i].apply(context,args);
                }
            }
        },
        emit:function(){
            return this.trigger.apply(this,arguments);
        }

    };
    //扩展到appan基础对象上
    appcan.extend(eventEmitter);
    module.exports = eventEmitter;
});
;
/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    descript:构建appcan file 模块
    created:2014.08.19
    update:____/____

*/
/*global appcan,uexFileMgr*/

appcan && appcan.define('file',function($,exports,module){

    //var uexFileMgr = window.uexFileMgr;
    /*
    获取操作 id

    */
    var getOptionId = appcan.getOptionId;

    /*
    文件是否存在
    @param String filePath 文件路径
    @param Function callback 又返回结果时的回调

    */
    
    var existQueue = {};//出来是否存在的队列
    
    function processExistCall(optId,dataType,data){
        var callback = existQueue['exist_call_'+optId];
        if(appcan.isFunction(callback)){
            if(dataType == 2){
                callback(null,data,dataType,optId);
            }else{
                callback(new Error('exist file error'),data,
                    dataType,optId);
            }
        }
        //当调用一次后释放掉
        delete existQueue['exist_call_'+optId];
    }
    
    function exists(filePath,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            callback = argObj.callback;
        }
        var optId = getOptionId();
        if(appcan.isFunction(callback)){
            existQueue['exist_call_' + optId] = callback;
            uexFileMgr.cbIsFileExistByPath = function(optId,dataType,data){
                processExistCall.apply(null,arguments);
            };
        }
        uexFileMgr.isFileExistByPath(optId,filePath);
        close(optId);
    }

    /*
    返回文件的相关信息
    @param String filePath
    @param Function callback


    */
    
    function stat(filePath,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            callback = argObj.callback;
        }
        if(appcan.isFunction(callback)){
            uexFileMgr.cbGetFileTypeByPath = function(optId,dataType,data){
                if(dataType != 2){
                    callback(new Error('get file type error'),null,
                        dataType,optId);
                    return;
                }
                var res = {};
                if(data == 0){
                    res.isFile = true;
                }
                if(data == 1){
                    res.isDirectory = true;
                }
                callback(null,res,dataType,optId);
            };
        }
        uexFileMgr.getFileTypeByPath(filePath);
    }



    /*
    读取文件内容
    @param String filePath 文件路径
    @param String callback 结果回调



    */
    function read(filePath,length,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            length = argObj.length;
            callback = argObj.callback;
        }
        if(!filePath){
            return callback(new Error('file name is empty'));
        }
        if(appcan.isFunction(length)){
            callback = length;
            length = -1;
        }
        callback = appcan.isFunction(callback)?callback:function(){};
        length = length || -1;
        exists(filePath,function(err,res){
            if(err){
                return callback(err);
            }
            if(!res){
                return callback(new Error('文件不存在'));
            }
            stat(filePath,function(err,fileInfo){
                if(err){
                    return callback(err);
                }
                if(!fileInfo.isFile){
                    return callback(new Error('该路径不是文件'));
                }
                uexFileMgr.cbReadFile = function(optId,dataType,data){
                    if(dataType != 0){
                        callback(new Error('read file error'),data,
                            dataType,optId);
                    }
                    callback(null,data,dataType,optId);
                };
                open(filePath,1,function(err,data,dataType,optId){
                    uexFileMgr.readFile(optId,length);
                    close(optId);
                });
            });
        });
    }
    
    
    /*
    读加密的文件内容
    
    
    */
    
    function readSecure(filePath,length,key,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            length = argObj.length;
            key = argObj.key;
            callback = argObj.callback;
        }
        if(!filePath){
            return callback(new Error('file name is empty'));
        }
        callback = appcan.isFunction(callback)?callback:function(){};
        length = length || -1;
        exists(filePath,function(err,res){
            if(err){
                return callback(err);
            }
            if(!res){
                return callback(new Error('文件不存在'));
            }
            stat(filePath,function(err,fileInfo){
                if(err){
                    return callback(err);
                }
                if(!fileInfo.isFile){
                    return callback(new Error('该路径不是文件'));
                }
                uexFileMgr.cbReadFile = function(optId,dataType,data){
                    if(dataType != 0){
                        callback(new Error('read file error'),data,
                            dataType,optId);
                    }
                    callback(null,data,dataType,optId);
                };
                openSecure(filePath,1,key,function(err,data,dataType,optId){
                    uexFileMgr.readFile(optId,length);
                    close(optId);
                });
            });
        });
    }

    /*
    获取文件的json形式
    @param String filePath 文件的路径
    @param Function callback 文件读取完成之后的回调

    */
    function readJSON(filePath,callback){
        read({
            filePath:filePath,
            callback:function(err,data){
                var res = null;
                if(err){
                    return callback(err);
                }
                try{
                    if(!data){
                        res = {};
                    }else{
                        res = JSON.parse(data);
                    }
                    callback(null,res);
                }catch(e){
                    return callback(e);
                }
            }
        });
    }



    /*
    写文件
    @param String filePath 文件路径
    @param String mode  写入方式
    @param String content 写入内容

    */
    function write(filePath,content,callback,mode){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            content = argObj.content;
            mode = argObj.mode;
            callback = argObj.callback;
        }
        mode = mode || 0;
        if(appcan.isFunction(content)){
            callback = content;
            content = '';
        }
        open(filePath,2,function(err,data,dataType,optId){
            if(err){
                return callback(err);
            }
            uexFileMgr.writeFile(optId,mode,content);
            close(optId);
            callback(null);
        });
    }
    
    /*
    以安全的方式写入文件内容
    @param String filePath 文件路径
    @param String mode  写入方式
    @param String content 写入内容
    @param String key 要写入文件的密码

    */
    function writeSecure(filePath,content,callback,mode,key){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            content = argObj.content;
            mode = argObj.mode;
            key = argObj.key;
            callback = argObj.callback;
        }
        mode = mode || 0;
        if(appcan.isFunction(content)){
            key = mode;
            mode = callback;
            callback = content;
            content = '';
        }
        openSecure(filePath,2,key,function(err,data,dataType,optId){
            if(err){
                return callback(err);
            }
            uexFileMgr.writeFile(optId,mode,content);
            close(optId);
            callback(null);
        });
    }

    /*
    附近文件到文件的末尾
    @param String filePath 文件路径
    @param String content 内容
    @param Function 回调

    */

    function append(filePath,content,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            content = argObj.content;
            callback = argObj.callback;
        }
        return write(filePath,content,callback,1);
    }
    
    /*
    附近文件到文件的末尾
    @param String filePath 文件路径
    @param String content 内容
    @param String key 加密key
    @param Function 回调

    */

    function appendSecure(filePath,content,key,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            content = argObj.content;
            key = argObj.key;
            callback = argObj.callback;
        }
        return writeSecure(filePath,content,callback,1,key);
    }


    /*
    打开流
    @param String filePath 文件路径
    @param String mode 打开方式

    */
    function open(filePath,mode,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            mode = argObj.mode;
            callback = argObj.callback;
        }
        if(appcan.isFunction(mode)){
            callback = mode;
            mode = 3;
        }
        mode = mode || 3;
        if(!appcan.isString(filePath)){
            return callback(new Error('文件路径不正确'));
        }
        //var optId = getOptionId();
        if(appcan.isFunction(callback)){
            uexFileMgr.cbOpenFile = function(optId,dataType,data){
                if(dataType != 2){
                    callback(new Error('open file error'),data,dataType,optId);
                    return;
                }
                callback(null,data,dataType,optId);
            };
        }
        uexFileMgr.openFile(getOptionId(),filePath,mode);
        //close(optId);
    }
    
    /*
    打开加密文件
    @param String filePath 文件路径
    @param String mode 模式
    @param String key 加密字符串
    @param Function callback 打开加密文件成功后的回调
    
    */
    
    function openSecure(filePath,mode,key,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            mode = argObj.mode;
            key = argObj.key;
            callback = argObj.callback;
        }
        key = key? key : '';
        mode = mode || 3;
        if(!appcan.isFunction(callback)){
            callback = null;
        }
        if(!appcan.isString(filePath)){
            return callback(new Error('文件路径不正确'));
        }
        //var optId = getOptionId();
        if(appcan.isFunction(callback)){
            uexFileMgr.cbOpenSecure = function(optId,dataType,data){
                if(dataType != 2){
                    callback(new Error('open secure file error'),data,dataType,optId);
                    return;
                }
                callback(null,data,dataType,optId);
            };
        }
        uexFileMgr.openSecure(getOptionId(),filePath,mode,key);
        //close(optId);
    }
    
    

    /*
    删除文件
    @param String filePath 文件路径
    @param Function callback 删除结果回调函数

    */

    function deleteFile(filePath,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            callback = argObj.callback;
        }
        var optId = getOptionId();
        if(appcan.isFunction(callback)){
            uexFileMgr.cbDeleteFileByPath = function(optId,dataType,data){
                if(dataType != 2){
                    return callback(new Error('delete file error'));
                }
                callback(null,data,dataType,optId);
            };
        }
        uexFileMgr.deleteFileByPath(filePath);
        close(optId);
    }

    /*
    关闭文件流
    @param String optId 操作id

    */
    function close(optId){
        if(arguments.length === 1 && appcan.isPlainObject(optId)){
            optId = optId.optId;
        }
        if(!optId){
            return;
        }
        uexFileMgr.closeFile(optId);
    }
    
    

    /*
    创建文件
    @param String filePath 文件路径
    @param Function callback 创建结果回调函数

    */
    function create(filePath,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            callback = argObj.callback;
        }
        var optId = getOptionId();
        if(appcan.isFunction(callback)){
            uexFileMgr.cbCreateFile = function(optId,dataType,data){
                if(dataType != 2){
                    return callback(new Error('create file error'),
                    data,dataType,optId);
                }
                callback(null,data,dataType,optId);
            };
        }
        uexFileMgr.createFile(optId,filePath);
        close(optId);
    }
    
    /*
    创建文件
    @param String filePath 创建一个加密文件
    @param String key 加密的字符串 
    @param Function callback 创建结果回调函数

    */
    function createSecure(filePath,key,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            key = argObj.key;
            callback = argObj.callback;
        }
        key = key?key:'';
        var optId = getOptionId();
        if(appcan.isFunction(callback)){
            uexFileMgr.cbCreateSecure = function(optId,dataType,data){
                if(dataType != 2){
                    return callback(new Error('create secure file error'),
                    data,dataType,optId);
                }
                callback(null,data,dataType,optId);
            };
        }
        uexFileMgr.createSecure(optId,filePath,key);
        close(optId);
        
    }
    

    //本地文件
    var localPath = 'wgt://data/locFile.txt';

    /*
    删除本地文件
    @param Function callback 删除本地文件

    */

    function deleteLocalFile(callback){
        if(appcan.isPlainObject(callback)){
            callback = callback.callback;
        }
        if(!appcan.isFunction(callback)){
            callback = function(){};
        }
        deleteFile(localPath,callback);
    }

    /*
    写入本地文件
    @param String content 要写入的内容
    @param Function callback 写完后的结果

    */

    function writeLocalFile(content,callback){
        exists(localPath,function(err,data){
            if(err){
                return callback(err);
            }
            if(!data){
                create(localPath,function(err,res){
                    if(err){
                        return callback(err);
                    }
                    if(res == 0){
                        write(localPath,content,callback);
                    }
                });
            }else{
                write(localPath,content,callback);
            }
        });
    }

    /*
    读本地文件内容
    @param Function callback 结果回调


    */

    function readLocalFile(callback){
        return read(localPath,callback);
    }
    
    /*
    获取文件的真实路径
    @param String path 要获取的文件路径
    @param Function callback 获取成功后的回调    
    
    */
    function getRealPath(filePath,callback){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(filePath)){
            argObj = filePath;
            filePath = argObj.filePath;
            callback = argObj.callback;
        }
        uexFileMgr.cbGetFileRealPath = function(optId, dataType, data){
            if(dataType != 0){
                callback(new Error('get file path error'),data,dataType,optId);
                return;
            }
            callback(null,data,dataType,optId);
        };
        
        uexFileMgr.getFileRealPath(filePath);
    }
    
    
    
    
    module.exports = {
        wgtPath:'wgt://',
        resPath:'res://',
        wgtRootPath:'wgtroot://',
        open:open,
        close:close,
        read:read,
        readJSON:readJSON,
        write:write,
        create:create,
        remove:deleteFile,
        append:append,
        exists:exists,
        stat:stat,
        deleteLocalFile:deleteLocalFile,
        writeLocalFile:writeLocalFile,
        readLocalFile:readLocalFile,
        getRealPath:getRealPath,
        createSecure:createSecure,
        openSecure:openSecure,
        readSecure:readSecure,
        writeSecure:writeSecure,
        appendSecure:appendSecure
    };

});
;/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:扩展zepto到appcandom 对象上
    created:2014,08.20
    update:


*/
/*global appcan,window*/
window.appcan && appcan.define('Model',function($,exports,module){
    var Backbone = appcan.require('Backbone');
    var Model = Backbone.Model.extend({
        setToken:function(){

        }
    });

    module.exports = Model;
});
;/*

    author:dushaobin
    email:shaobin.du@3g2win.com
    description:构建appcan request模块
    create:2014.08.18
    update:______/___author___


*/
/*global window,appcan*/
appcan && appcan.define('request',function($,exports,module){
    var jsonpID = 0,
      document = window.document,
      key,
      name,
      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      scriptTypeRE = /^(?:text|application)\/javascript/i,
      xmlTypeRE = /^(?:text|application)\/xml/i,
      jsonType = 'application/json',
      htmlType = 'text/html',
      blankRE = /^\s*$/;

    var getXmlHttpId = appcan.getOptionId;

    // trigger a custom event and return false if it was cancelled
    function triggerAndReturn(context, eventName, data) {
        appcan.trigger(eventName,context,data);
    }

    // trigger an Ajax "global" event
    function triggerGlobal(settings, context, eventName, data) {
        if (settings.global) {
            return triggerAndReturn(context || appcan, eventName, data);
        }
    }

  // Number of active Ajax requests
  var active = 0;

  function ajaxStart(settings) {
      if (settings.global && active++ === 0) {
          triggerGlobal(settings, null, 'ajaxStart');
      }
  }
  function ajaxStop(settings) {
      if (settings.global && !(--active)) {
          triggerGlobal(settings, null, 'ajaxStop');
      }
  }

  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
  function ajaxBeforeSend(xhr, settings) {
    var context = settings.context;
    if (settings.beforeSend.call(context, xhr, settings) === false ||
        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false){
          return false;
        }

    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
  }
  function ajaxSuccess(data, requestCode, response, xhr, settings, deferred) {
      var context = settings.context, status = 'success';

      settings.success.call(context, data, status, requestCode, response, xhr);
      if (deferred) {
          deferred.resolveWith(context, [data, status, requestCode, response, xhr]);
      }
      triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data, status, requestCode, response]);
      ajaxComplete(status, xhr, settings);
  }
  // type: "timeout", "error", "abort", "parsererror"
  function ajaxError(error, type, msg, xhr, settings, deferred) {
      var context = settings.context;
      settings.error.call(context, xhr, type, error, msg);
      if (deferred) {
          deferred.rejectWith(context, [xhr, type, error, msg]);
      }
      triggerGlobal(settings, context, 'ajaxError',
        [xhr, settings, error || type, msg]);
        ajaxComplete(type, xhr, settings);
  }
  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
  function ajaxComplete(status, xhr, settings) {
      var context = settings.context;
        settings.complete.call(context, xhr, status);
        triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
        ajaxStop(settings);
  }
  
  // progress: 当前上传进度
  function ajaxProgress(progress, xhr, settings) {
      var context = settings.context;
        settings.progress.call(context,progress, xhr, status);
        triggerGlobal(settings, context, 'ajaxProgress', [progress,xhr, settings]);
  }
  
  // Empty function, used as default callback
  function empty() {}

  var ajaxSettings = {
    // Default type of request
    type: 'GET',
    // Callback that is executed before request
    beforeSend: empty,
    // Callback that is executed if the request succeeds
    success: empty,
    // Callback that is executed the the server drops error
    error: empty,
    // Callback that is executed on request complete (both: error and success)
    complete: empty,
    //add progress 
    progress: empty,
    // The context for the callbacks
    context: null,
    // Whether to trigger "global" Ajax events
    global: true,
    //证书信息
    certificate:null,
    //添加app认证信息
    appVerify:true,
    //模拟Http
    emulateHTTP:false,
    // Transport
    xhr: function () {
        return window.uexXmlHttpMgr;
    },
    // MIME types mapping
    // IIS returns Javascript as "application/x-javascript"
    accepts: {
      script: 'text/javascript, application/javascript, application/x-javascript',
      json:   jsonType,
      xml:    'application/xml, text/xml',
      html:   htmlType,
      text:   'text/plain'
    },
    // Whether the request is to another domain
    crossDomain: false,
    // Default timeout
    timeout: 0,
    //默认不设置content type
    contentType:false,
    // Whether data should be serialized to string
    processData: false,
    // Whether the browser should be allowed to cache GET responses
    cache: true
};

  function mimeToDataType(mime) {
      if (mime) {
          mime = mime.split(';', 2)[0];
      }
      return mime && ( mime == htmlType ? 'html' :
        mime == jsonType ? 'json' :
        scriptTypeRE.test(mime) ? 'script' :
        xmlTypeRE.test(mime) && 'xml' ) || 'text';
  }

  function appendQuery(url, query) {
    if (query == '') {
        return url;
    }
    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
  }
  
  function processCompleteResult(xhr,opcode,status,result,requestCode,response,deferred){
      var settings = xhr['settings_'+opcode];
      var dataType = settings.dataType;
      if(status < 0){
          if(result == null || result == ""){
            result = response;
          }

          ajaxError(null,'request error', result, xhr, settings, deferred);
          return;
      }
      if (status == 1) {
          if(!requestCode || requestCode == 200 || (requestCode > 200 && requestCode <300) || requestCode == 304){
            //todo release 
            xhr['settings_'+opcode] = null;
            //clearTimeout(abortTimeout);
            var error = false;
            result = result || '';
            try {
                // http://perfectionkills.com/global-eval-what-are-the-options/
                if (dataType == 'script'){
                    (1,eval)(result);
                }else if (dataType == 'xml')  {
                    result = result;
                }else if (dataType == 'json') {
                    result = blankRE.test(result) ? null : $.parseJSON(result);
                }
            } catch (e) {
                error = e;
            }
            if (error) {
                ajaxError(error, 'parsererror', result, xhr, settings, deferred);
            }
            else {
                ajaxSuccess(result, requestCode, response, xhr, settings, deferred);
            }     
          }else{
            if(result == null || result == ""){
              result = response;
            }
            ajaxError(null,'request error', result, xhr, settings, deferred);
          }
          
      } else {
          ajaxError(null, 'error', result, xhr, settings, deferred);
      }
      xhr.close(opcode);
  }
  
  function processProgress(progress,xhr,optId){
      var settings = xhr['settings_'+optId];
      ajaxProgress(progress,xhr,settings);
  }
  
  // serialize payload and append it to the URL for GET requests
  function serializeData(options) {
      if (options.processData && options.data && !appcan.isString(options.data)){
          options.data = $.param(options.data, options.traditional);
      }
      if (options.data && (!options.type || options.type.toUpperCase() == 'GET')){
          options.data = $.param(options.data, options.traditional);
          options.url = appendQuery(options.url, options.data);
          options.data = undefined;
      }
  }
  

  function ajax(options){
      var httpId = getXmlHttpId();
        var settings = $.extend({}, options || {}),
            deferred = $.Deferred && $.Deferred();
        for (key in ajaxSettings) {
            if (settings[key] === undefined) {
                settings[key] = ajaxSettings[key];
            }
        }
        ajaxStart(settings);
        if (!settings.crossDomain) {
            settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
                RegExp.$2 != window.location.host;
        }

        if (!settings.url) {
            settings.url = window.location.toString();
        }
        serializeData(settings);

        var dataType = settings.dataType;
        var hasPlaceholder = /\?.+=\?/.test(settings.url);
        if (hasPlaceholder) {
            dataType = 'jsonp';
        }

        if (settings.cache === false || (
            (!options || options.cache !== true) &&
            ('script' == dataType || 'jsonp' == dataType)
        )){
            settings.url = appendQuery(settings.url, '_=' + Date.now());
        }

        if ('jsonp' == dataType) {
            if (!hasPlaceholder){
                settings.url = appendQuery(settings.url,
                settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?');
            }
            return $.ajaxJSONP(settings, deferred);
        }

        var mime = settings.accepts[dataType],
            headers = {},
            setHeader = function(name, value) {
                headers[name.toLowerCase()] = [name, value];
            },
            protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
            xhr = settings.xhr(),
            nativeSetHeader = function(xhr,headers){
                var toHeader = {};
                var fromHeader = null;
                for(var key in headers){
                    fromHeader = headers[key];
                    toHeader[fromHeader[0]] = fromHeader[1];
                }
                xhr.setHeaders(httpId,JSON.stringify(toHeader));
            },
            addAppVerify = function(settings){
                if(settings.appVerify === true){
                    //添加app 认证头 修复模拟器不支持setAppvVerify 方法
                    xhr.setAppVerify && xhr.setAppVerify(httpId,1);
                }
                if(settings.appVerify === false){
                    //添加app 认证头 修复模拟器不支持setAppvVerify 方法
                    xhr.setAppVerify && xhr.setAppVerify(httpId,0);
                }
            },
            //更新证书信息
            updateCertificate = function(settings){
                var certi = settings.certificate;
                if(!certi){
                    return;
                }
                xhr.setCertificate && xhr.setCertificate(httpId,certi.password || '',certi.path);
            },
            abortTimeout;
        //绑定相应的配置
        xhr['settings_'+httpId] = settings;
        
        if (deferred) {
            deferred.promise(xhr);
        }
        //发出的ajax请求
        if (!settings.crossDomain) {
            setHeader('X-Requested-With', 'XMLHttpRequest');
        }
        setHeader('Accept', mime || '*/*');
        if (mime = settings.mimeType || mime) {
            if (mime.indexOf(',') > -1) {
                mime = mime.split(',', 2)[0];
            }
            xhr.overrideMimeType && xhr.overrideMimeType(mime);
        }
        
        if (settings.emulateHTTP && (settings.type === 'PUT' || settings.type === 'DELETE' || settings.type === 'PATCH')) {
            setHeader('X-HTTP-Method-Override', settings.type);
            settings.type = 'POST';
        }
        
        if (settings.contentType ||
            (settings.contentType !== false &&
            settings.data && settings.type.toUpperCase() != 'GET')){
                setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
        }

        if (settings.headers) {
            for (var name in settings.headers) {
                setHeader(name, settings.headers[name]);
            }
        }

        xhr.setRequestHeader = setHeader;
        //添加progress 回调
        xhr.onPostProgress = function(optId,progress){
            var resArg = [progress];
            resArg.push(xhr);
            resArg.push(optId);
            processProgress.apply(null,resArg);
        };
        xhr.onData = function(){
            var resArg = [xhr];
            for(var i=0,len=arguments.length;i<len;i++){
                resArg.push(arguments[i]);
            }
            resArg.push(deferred);
            processCompleteResult.apply(null,resArg);
        };

        if (ajaxBeforeSend(xhr, settings) === false) {
            xhr.close(httpId);
            ajaxError(null, 'abort', null, xhr, settings, deferred);
            return xhr;
        }
        
        if (settings.xhrFields) {
            for (name in settings.xhrFields) {
                xhr[name] = settings.xhrFields[name];
            }
        }

        var async = 'async' in settings ? settings.async : true;
        //xhr.open(settings.type, settings.url, async, settings.username, settings.password)
        xhr.open(httpId,settings.type,settings.url,settings.timeout);
        //添加http header
        nativeSetHeader(xhr, headers);
        //设置证书信息
        updateCertificate(settings);
        //添加app认证信息
        addAppVerify(settings);
        
        if(settings.data && settings.contentType === false){
            for(name in settings.data){
                //fixed Number 类型bug
                if(appcan.isPlainObject(settings.data[name])){
                    if(settings.data[name].path){
                        //上传文件数据
                        xhr.setPostData(httpId,"1",name,settings.data[name].path);
                    }else{
                        xhr.setPostData(httpId,"0",name,JSON.stringify(settings.data[name]));
                    }
                }else{
                    //添加普通数据
                    xhr.setPostData(httpId,"0",name,settings.data[name]);
                }
            }
        }else{
            if(settings.contentType === 'application/json'){
                if(appcan.isPlainObject(settings.data)){
                    settings.data = JSON.stringify(settings.data);
                }
            }
            //fixed ios bug 如果调用setBody就是当作post请求发送出来
            if(settings.data){
                xhr.setBody(httpId,settings.data ? settings.data : null);
            }
        }
        xhr.send(httpId);
        return xhr;
  }

  // handle optional data/success arguments
  function parseArguments(url, data, success, dataType) {
    if (appcan.isFunction(data)) {
        dataType = success;
        success = data;
        data = undefined;
    }
    if (!appcan.isFunction(success)) {
        dataType = success;
        success = undefined;
    }
    return {
          url: url,
          data: data,
          success: success,
          dataType: dataType
    };
  }

  function get(/* url, data, success, dataType */){
      return ajax(parseArguments.apply(null, arguments));
  }

  function post(/* url, data, success, dataType */){
      var options = parseArguments.apply(null, arguments);
      options.type = 'POST';
      return ajax(options);
  }

  function getJSON(/* url, data, success */){
      var options = parseArguments.apply(null, arguments);
      options.dataType = 'json';
      return ajax(options);
  }

  var escape = encodeURIComponent;

  function serialize(params, obj, traditional, scope){
      var type, array = $.isArray(obj), hash = $.isPlainObject(obj);
      $.each(obj, function(key, value) {
        type = $.type(value);
        if (scope) {
            key = traditional ? scope :
            scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
        }
        // handle data in serializeArray() format
        if (!scope && array) {
            params.add(value.name, value.value);
        }
        // recurse into nested objects
        else if (type == 'array' || (!traditional && type == 'object')){
            serialize(params, value, traditional, key);
        }
        else {
            params.add(key, value);
        }
        });
    }

    function param(obj, traditional){
        var params = [];
        params.add = function(k, v){
            this.push(escape(k) + '=' + escape(v));
        };
        serialize(params, obj, traditional);
        return params.join('&').replace(/%20/g, '+');
    }
  
   //添加post form提交表单 todo:属于扩展对象
   function postForm(form,success,error){
       if(!form){
           return;
       }
       form = $(form);
       var submitInputs = [];
       var inputTypes = {
           'color':1,
           'date':1,
           'datetime':1,
           'datetime-local':1,
           'email':1,
           'hidden':1,
           'month':1,
           'number':1,
           'password':1,
           'radio':1,
           'range':1,
           'search':1,
           'tel':1,
           'text':1,
           'time':1,
           'url':1,
           'week':1
       };
       var fileType = ['file'];
       var checkTypes = ['checkbox','radio'];
       var todoSupport = ['keygen'];
       var eleList = ['input','select','textarea'];
       var formData = {};
       
       success = success || function(){};
       error = error || function(){};
       
       function getFormData(){
           form.find(eleList.join(',')).each(function(i,v){
               if(v.tagName === 'INPUT'){
                   var ele = $(v);
                   var type = ele.attr('type');
                   if(type in inputTypes){
                       if(ele.attr('data-ispath')){
                           formData[ele.attr('name')] = {
                               path:ele.val()
                           }
                       }else{
                           formData[ele.attr('name')] = ele.val();
                       }
                   }
               }else{
                   
               }
           });
       }
       
       var method = form.attr('method');
       var action = form.attr('action') || location.href;
       method = (method || 'POST').toUpperCase();
       getFormData();
       ajax({
           url:action,
           type:method,
           data:formData,
           success:success,
           error:error
       });
    }

    var offlineClearQueue =[];
    /*
        处理删除离线数据文件回调
        @param string err err对象如果为空则表示 没有错误，否则表示操作出错了
        @param int data表示返回的操作结果，0：处理成功
        @param int dataType操作结果的数据类型，默认正常为2
        @param int optId该操作id
    */
    function processOfflineClearQueue(err,data,dataType,optId){
        if(offlineClearQueue.length > 0){
            $.each(offlineClearQueue,function(i,v){
                if(v && appcan.isFunction(v)){
                    v(err,data,dataType,optId);
                }
            });
            offlineClearQueue =[];
        }
        return;
    }

    /* 
      清除localStorage中url对应离线缓存数据及离线文件
        url:需要被清除离线数据的url地址
    */

    function clearOffline(url,callback,data){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(url)){
            argObj = url;
            url = argObj['url'];
            data = argObj['data'];
            callback = argObj['callback'];
        }
        if(!appcan.isFunction(callback)){
            callback = function(){};
        }
        offlineClearQueue.push(callback);
        var offlineKey ='offlinedata';
        var offlinedata = appcan.locStorage.val(offlineKey);
        var offlineUrl;
        if(data){
            var paramsInfo = JSON.stringify(data);
            var fullUrl = url + paramsInfo;
            offlineUrl= appcan.crypto.md5(fullUrl);
        }else{
            offlineUrl= appcan.crypto.md5(url);
        }
         
        if(offlinedata != null){
            dataObj = JSON.parse(offlinedata);
            if(dataObj[offlineUrl]){
                if(dataObj[offlineUrl]['data']){
                    var localFilePath = dataObj[offlineUrl]['data'];
                    appcan.file.remove({
                        filePath:localFilePath,
                        callback:function(err,data,dataType,optId){
                            delete dataObj[offlineUrl];
                            appcan.locStorage.val(offlineKey,JSON.stringify(dataObj));
                            processOfflineClearQueue(err,data,dataType,optId);
                        }
                    });
                }else{
                    delete dataObj[offlineUrl];
                    appcan.locStorage.val(offlineKey,JSON.stringify(dataObj));
                    processOfflineClearQueue(null,0,2,0);
                }
            }else{
                processOfflineClearQueue(null,0,2,0);
            }
        }else{
            offlineClearQueue =[];
        }
    }
    
  
    module.exports = {
        ajax:ajax,
        get:get,
        post:post,
        getJSON:getJSON,
        param:param,
        postForm:postForm,
        clearOffline:clearOffline
    };
});
;/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:扩展storage 到 appcan 上
    created:2014,08.25
    update:


*/
/*global appcan,window,unescape*/
appcan && appcan.define('locStorage',function($,exports,module){

    var storage = window.localStorage,
            i=0,
            len=0;
    /*
    从本地存储获取值
    @param String key 设置localstorage的key
    @param String value 设置localstorage的val

    */
    function setValue(key,val){
        try{
            if(storage){
                if(!appcan.isString(val)){
                    val = JSON.stringify(val);
                }
                storage.setItem(key,val);
            }else{

            }
        }catch(e){

        }
    }
    /*
        批量设置localstorage

    */
    function setValues(key){
        if(appcan.isPlainObject(key)){
            for(var k in key){
                if(key.hasOwnPropery(k)){
                    setValue(k,key[k]);
                }
            }
        }else if(appcan.isArray(key)){
            for(i=0,len=key.length;i<len;i++){
                if(key[i]){
                    setValue.apply(this,key[i]);
                }
            }
        }else{
            setValue.apply(this,arguments);
        }
    }

    /*
    从localStorage获取对应的值
    @param String key 获取值的key

    */
    function getValue(key){
        if(!key){
            return;
        }
        try{
            if(storage){
                return storage.getItem(key);
            }
        }catch(e){

        }
    }
    /*
    从localStorage获取所有的keys

    */
    function getKeys(){
        var res = [];
        var key = '';
        for (var i=0,len=storage.length; i< len; i++){
            key = storage.key(i);
            if(key){
                res.push(key);
            }
        }
        return res;
    }

    /*
    青春对应的key
    @param String key


    */
    function clear(key){
        try{
            if(key && appcan.isString(key)){
                storage.removeItem(key);
            }else{
                storage.clear();
            }
        }catch(e){

        }
    }

    /*
    localStorage剩余空间大小

    */
    function leaveSpace(){
        var space = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(storage))).length;
        return space;
    }
    
    /*
        获取或者设置localStorage的值
        @param String key
        @param String val
        
    */
    function val(key,value){
        if(arguments.length === 1){
            return getValue(key);
        }
        setValue(key,value);
    }

    module.exports = {
        getVal:getValue,
        setVal:setValues,
        leaveSpace:leaveSpace,
        remove:clear,
        keys:getKeys,
        val:val
    };

});
;/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:扩展user 到appcan对象上
    created:2014,08.21
    update:


*/
/*global window,appcan*/
window.appcan && appcan.extend(function(ac,exports,module){
    /*
    字符组去除前后空格
    @param String str 要去空格的字符串


    */
    var trim = function(str){
        if(!str){
            return '';
        }
        if(String.prototype.trim){
            return String.prototype.trim.call(str);
        }
        return str.replace(/^\s+|\s+$/ig,'');
    };
    /*
    字符组去除前面空格
    @param String str 要去空格的字符串


    */
    var trimLeft = function(str){
        if(!str){
            return '';
        }
        if(String.prototype.trimLeft){
            return String.prototype.trimLeft.call(str);
        }
        return str.replace(/^\s+/ig,'');
    };

    /*
    字符组去除后面空格
    @param String str 要去空格的字符串


    */
    var trimRight = function(str){
        if(!str){
            return '';
        }
        if(String.prototype.trimRight){
            return String.prototype.trimRight.call(str);
        }
        return str.replace(/\s+$/ig,'');
    };
    /*
    获取字符串的字节长度
    @param String str

    */
    var byteLength = function(str){
        if(!str){
            return 0;
        }
        var totalLength = 0;
        var i;
        var charCode;
        for (i = 0; i < str.length; i++) {
            charCode = str.charCodeAt(i);
          if (charCode < 0x007f) {
              totalLength = totalLength + 1;
          } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
              totalLength += 2;
          } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
              totalLength += 3;
          }
        }
        return totalLength;
    };

    module.exports = {
        trim:trim,
        trimLeft:trimLeft,
        trimRight:trimRight,
        byteLength:byteLength
    };
    
});
;/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:扩展user 到appcan对象上
    created:2014,08.21
    update:


*/
/*global appcan*/
appcan && appcan.define('User',function($,exports,module){
    var Backbone = appcan.require('Backbone');
    var db = appcan.require('database');
    var User = Backbone.Model.extend({
        login:function(){

        },
        signup:function(){

        },
        logout:function(){


        },
        changePassword:function(){

        }
    });
    module.exports = User;
});
;/*

    author:dushaobin
    email:shaobin.du@3g2win.com
    description:构建appcan view模块
    create:2014.08.19
    update:______/___author___


*/
/*global window,appcan*/
window.appcan && appcan.define('view',function($,exports,module){
    var _ = appcan.require('underscore');
    var settings = {};
    /*
        配置模版参数
        @param Object newSettings 新的配置信息

    */
    var config = function(newSettings){
        settings = _.defaults({},settings,newSettings);
    };
    /*
        替换内容到制定的元素中
        @param String selector 选择器
        @param String template 模板
        @param Object dataSource 数据源
        @param Object options 参数

    */
    var renderTemp = function(selector,template,dataSource,options){
        options = _.defaults({},settings,options);
        var render = _.template(template,options);
        var dataRes = render(dataSource);
        $(selector).html(dataRes);
        return dataRes;
    };
    /*
        附加内容到指定的元素中
        @param String selector 选择器
        @param String template 模板
        @param Object dataSource 数据源
        @param Object options 参数

    */
    var apRenderTemp = function(selector,template,dataSource,options){
        options = _.defaults({},settings,options);
        var render = _.template(template,options);
        var dataRes = render(dataSource);
        $(selector).append(dataRes);
        return dataRes;
    };
    module.exports = {
        template:_.template,
        render:renderTemp,
        appendRender:apRenderTemp,
        config:config
    };
});
;/*

    author:dushaobin
    email:shaobin.du@3g2win.com
    description:构建appcan window模块
    create:2014.08.18
    update:______/___author___


*/
/*global window,appcan,uexWindow*/

window.appcan && appcan.define('window',function($,exports,module){
    
    var subscribeGlobslQueue = [];//订阅队列
    var bounceCallQueue = [];//
    var multiPopoverQueue = {};
    var currentOS = '';
    var keyFuncMapper = {};//映射
    
    /*
        捕获android实体键
        @param String id 实体键的id
        @param Function callback 当点击时出发的回调函数
    
    
    */
    function monitorKey(id,callback){
        keyFuncMapper[id] = callback;
        uexWindow.setReportKey(id);
        uexWindow.onKeyPressed = function(keyCode){
            keyFuncMapper[keyCode] && keyFuncMapper[keyCode](keyCode);    
        }
    }
    
    /*
    打开一个新窗口
    @param String name 新窗口的名字 如果该window已经存在则直接打开
    @param String dataType 数据类型：0：url 1：html 数据 2：html and url
    @param String data 载入的数据
    @param Int aniId 动画id：
        0：无动画
        1:从左向右推入
        2:从右向左推入
        3:从上向下推入
        4:从下向上推入
        5:淡入淡出
        6:左翻页
        7:右翻页
        8:水波纹
        9:由左向右切入
        10:由右向左切入
        11:由上先下切入
        12:由下向上切入

        13:由左向右切出
        14:由右向左切出
        15:由上向下切出
        16:由下向上切出
    @param int width 窗口宽度
    @param int height 窗口的高度
    @param int tpye 窗口的类型
        0:普通窗口
        1:OAuth 窗口
        2:加密页面窗口
        4:强制刷新
        8:url用系统浏览器打开
        16:view不透明
        32:隐藏的winwdow
        64:等待popOver加载完毕后显示
        128:支持手势
        256:标记opn的window上一个window不隐藏
        512:标记呗open的浮动窗口用友打开wabapp
    @param animDuration 动画时长


    */
    function open(name,data,aniId,type,dataType,width,height,animDuration,extraInfo){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(name)){
            argObj = name;
            name = argObj['name'];
            dataType = argObj['dataType'] || 0;
            aniId = argObj['aniId'] || 0;
            width = argObj['width'];
            height = argObj['height'];
            type = argObj['type'] || 0;
            animDuration = argObj['animDuration'];
			extraInfo = argObj['extraInfo'];
            data = argObj['data'];
        }
        dataType = dataType || 0;
        aniId = aniId || 0;
        type = type || 0;
        animDuration = animDuration || 300;
		
		try{
			extraInfo = appcan.isString(extraInfo) ? extraInfo : JSON.stringify(extraInfo);
			extraInfo = JSON.parse(extraInfo);
			if(!extraInfo.extraInfo){
				extraInfo = {extraInfo:extraInfo};
			}
			extraInfo = JSON.stringify(extraInfo);
		}catch(e){
			extraInfo = extraInfo || '';
		}
		
        //打开新窗口
        uexWindow.open(name,dataType,data,aniId,width,height,type,animDuration,extraInfo);
    }

    /*
    关闭窗口
    @param String animateId 窗口关闭动画
    @param Int animDuration 动画持续时间

    */
    function close(animId,animDuration){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(animId)){
            argObj = animId;
            animId = argObj['animId'];
            animDuration = argObj['animDuration'];
        }
        if(animId){
            animId = parseInt(animId,10);
            if(isNaN(animId) || animId > 16 || animId < 0){
                animId = -1;
            }
        }
        if(animDuration){
            animDuration = parseInt(animDuration,10);
            animDuration = isNaN(animDuration)?'':animDuration;
        }
        animDuration = animDuration || 300;
        uexWindow.close(animId,animDuration);
    }

    /*
    在指定的窗口执行js脚本

    @param string name 窗口的名字
    @param string type 窗口类型
    @param string inscript 窗口内容

    */
    function evaluateScript(name,scriptContent,type){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(name)){
            argObj = name;
            name = argObj['name'];
            type = argObj['type'] || 0;
            scriptContent = argObj['scriptContent'];
        }
        type = type || 0;
        uexWindow.evaluateScript(name,type,scriptContent);
    }
    /*
    在指定的浮动窗口中执行脚本
    @param String name 执行的窗口名字
    @param String popName 浮动窗口名
    @param String scriptContent 脚本内容

    */
    function evaluatePopoverScript(name,popName,scriptContent){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(name)){
            argObj = name;
            name = argObj['name'];
            popName = argObj['popName'] || 0;
            scriptContent = argObj['scriptContent'];
        }
        name = name || '';
        if(!appcan.isString(popName) || !popName){
            return;           
        }
        uexWindow.evaluatePopoverScript(name,popName,scriptContent);
    }

    /*
    设置窗口的上拉，下拉效果
    @param String bounceType 弹动效果类型
        0:无任何效果
        1:颜色弹动效果
        2:设置图片弹动
    @param Function downEndCall 下拉到底的回调
    @param Function upEndCall 上拉到底的回调
    @param String color 设置下拉视图的颜色
    @param String imgSettings 设置显示内容
    
    todo:该方法需要重写，

    */

    function setBounce(bounceType,startPullCall,downEndCall,upEndCall,color,imgSettings){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(bounceType)){
            argObj = bounceType;
            bounceType = argObj['bounceType'] || 1;
            startPullCall = argObj['startPullCall'];
            downEndCall = argObj['downEndCall'];
            upEndCall = argObj['upEndCall'];
            color = argObj['color'] || 'rgba(255,255,255,0)';
            imgSettings = argObj['imgSettings'] || '{"imagePath":"res://reload.png",'+
            '"textColor":"#530606","pullToReloadText":"拖动刷新",'+
            '"releaseToReloadText":"释放刷新",'+
            '"loadingText":"加载中，请稍等"}';
        
        }
        color = color || 'rgba(255,255,255,0)';
        imgSettings = imgSettings || '{"imagePath":"res://reload.png",'+
        '"textColor":"#530606","pullToReloadText":"拖动刷新",'+
        '"releaseToReloadText":"释放刷新",'+
        '"loadingText":"加载中，请稍等"}';

        // if(!bounceType){
            // return;
        // }
        var startBounce = 1;
        //绑定回弹通知函数
        uexWindow.onBounceStateChange = function (type,status){
            if(status == 0){
                startPullCall && startPullCall(type);
            }
            if(status == 1) {
                downEndCall && downEndCall(type);
            }
            if(status == 2) {
                upEndCall && upEndCall(type);
            }
        };
        uexWindow.setBounce(startBounce);
        //设置颜色
        /*if(bounceType == 1){
            uexWindow.showBounceView('0',color,'1');
        }
        if(bounceType == 2){
            uexWindow.setBounceParams('0',imgSettings);
            uexWindow.showBounceView('0',color,1);
        }*/
        //绑定下拉回调
        if(startPullCall || downEndCall || upEndCall){
            if(!appcan.isArray(bounceType)){
                bounceType=[bounceType];
            }
            for(var i=0;i<bounceType.length;i++){
                uexWindow.notifyBounceEvent(bounceType[i],'1');

                setBounceParams(bounceType[i],imgSettings);
                uexWindow.showBounceView(bounceType[i],color,'1'); 
                
                
            }
            
        }
    }
	
	
	var bounceStateQueue =[];
            /*
        处理回调获取弹动状态
        @param string msg 传递过来的消息
    
    */
    function processGetBounceStateQueue(data,dataType,opId){
        if(bounceStateQueue.length > 0){
            $.each(bounceStateQueue,function(i,v){
                if(v && appcan.isFunction(v)){
                    if(dataType == 2){
                        v(data,dataType,opId);
                    }
                    
                }
            });
        }
        bounceStateQueue=[];
        return;
    }

    /*
        获取当前的弹动状态
        
        
    */
    function getBounceStatus(callback){
        if(arguments.length === 1 && appcan.isPlainObject(callback)){
            callback = callback['callback'];
        }
        if(!appcan.isFunction(callback)){
            return;
        }
        bounceStateQueue.push(callback);
        uexWindow.cbBounceState = function(opId, dataType, data){
            processGetBounceStateQueue(data,dataType,opId);
        };

        uexWindow.getBounce();
    }
    
    /*
        开启上下滑动回弹
        
        
    */
    function enableBounce(){
        //1:开启回弹效果
        uexWindow.setBounce(1);
    }
    
    /*
        关闭回弹效果
    
    */
    function disableBounce(){
        //0:禁用回弹效果
        uexWindow.setBounce(0);
    }
    
    /*
        设置回弹类
        @param String type 设置回弹的类型 
        @param String color 设置回弹显示的颜色 
        @param Int flag 设置是否添加回弹回调 
        @param Function callback 回弹的回调函数 
        
    
    */
    function setBounceType(type,color,flag,callback){
        if(arguments.length ===1 && appcan.isPlainObject(type)){
            flag = type.flag;
            color = type.color;
            callback = type.callback;
            type = type.type;
        }
        flag = (flag === void 0 ? 1 : flag);
        flag = parseInt(flag,10);
        color = color || 'rgba(0,0,0,0)';
        type = (type === void 0 ? 0 : type);
        callback = callback || function(){};
        //强制开启页面弹动效果
        enableBounce();
        
        uexWindow.showBounceView(type,color,flag);
        if(flag){
            bounceCallQueue.push({type:type,callback:callback});
            uexWindow.onBounceStateChange || (uexWindow.onBounceStateChange = function(backType,status){
                var currCallObj = null;
                for(var i=0,len=bounceCallQueue.length;i<len;i++){
                    currCallObj = bounceCallQueue[i];
                    if(currCallObj){
                        if(backType === currCallObj.type){
                            if(appcan.isFunction(currCallObj.callback)){
                                currCallObj.callback(status,type);
                            }
                        }
                    }
                }
            });
            //1:接收回调函数
            uexWindow.notifyBounceEvent(type,1);
        }
    }
    
    /*
        给上下回弹添加参数
        @param String position 设置回弹的类型
        @param Object data 要设置回弹显示出来内容的json参数
        {
            imagePath:'回弹显示的图片路径',
            textColor:'设置回弹内容的字体颜色',
            levelText:'设置文字的级别',
            pullToReloadText:'下拉超过边界显示出的内容',
            releaseToReloadText:'拖动超过刷新边界后显示的内容',
            loadingText:'拖动超过刷新临界线并且释放，并且拖动'
        }
    
    */
    function setBounceParams(position,data){
        if(arguments.length ===1 && appcan.isPlainObject(position)){
            data = position.data;
            position = position.position;
        }
        if(appcan.isPlainObject(data)){
            data = JSON.stringify(data);
        }
        uexWindow.setBounceParams(position,data);
    }
    

    /*
    展示弹动结束后显示的网页
    @param String position 0为顶端恢复弹动，1为底部恢复弹动

    */

    function resetBounceView(position){
        if(appcan.isPlainObject(position)){
            position = position['position'];
        }
        position = parseInt(position,10);
        if(isNaN(position)){
            position = 0;
        }else{
            position = position;
        }
        position = position || 0;
        uexWindow.resetBounceView(position);
    }

    /*
    弹出一个非模态的提示框
    @param String type 消息提示框显示的模式
        0:没有进度条
        1:有进度条
    @param String position 提示在手机上的位置
        1:left_top
        2:top
        3:right_top
        4:left
        5:middle
        6:right
        7:bottom_left
        8:bottom
        9:right_bottom
    @param String msg 提示内容
    @param String duration 提示框存在时间，小于0不会自动关闭


    */
    

    function openToast(msg,duration,position,type){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(msg)){
            argObj = msg;
            msg = argObj['msg'];
            duration = argObj['duration'];
            position = argObj['position'] || 5;
            type = argObj['type'];
        }
        type = type || (duration?0:1);
        duration = duration || 0;
        position = position || 5;
        //执行跳转
        uexWindow.toast(type,position,msg,duration);
    }

    /*
    关闭提示框

    */
    function closeToast(){
        uexWindow.closeToast();
    }

    /*
    移动浮动窗口位置动画
    @param String left 距离左边界的位置
    @param String top 距离上边界的位置
    @param Function callback 动画完成的回调函数
    @param Int duration 动画的移动时间

    */

    function moveAnim(left,top,callback,duration){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(left)){
            argObj = left;
            left = argObj['left'] || 0;
            top = argObj['top'] || 0;
            callback = argObj['callback'];
            duration = argObj['duration'] || 250;
        }
        left = left || 0;
        top = top || 0;
        duration = duration || 250;
        uexWindow.beginAnimition();
        uexWindow.setAnimitionDuration(duration);
        uexWindow.setAnimitionRepeatCount('0');
        uexWindow.setAnimitionAutoReverse('0');
        uexWindow.makeTranslation(left,top,'0');
        uexWindow.commitAnimition();
        if(appcan.isFunction(callback)) {
            uexWindow.onAnimationFinish = callback;
        }
    }
    
    /*
        
    
    */
        
    function setWindowFrame(dx,dy,duration,callback){
        if(arguments.length === 1 && appcan.isPlainObject(dx)){
            argObj = dx;
            dx = argObj['dx'] || 0;
            dy = argObj['dy'] || 0;
            duration = argObj['duration'] || 250;
            callback = argObj['callback'] || function(){};
        }
        uexWindow.onSetWindowFrameFinish = callback;
        uexWindow.setWindowFrame(dx,dy,duration);
    }
    
    
    /*
    依指定的样式弹出一个提示框
    @param String selector css选择器
    @param String url 加载的数据内容
    @param String left 居左距离
    @param String top 居上距离
    @param String name 弹窗名称

    */

    function popoverElement(id,url,left,top,name,extraInfo){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(id)){
            argObj = id;
            id = argObj['id'] || 0;
            url = argObj['url'];
            top = argObj['top'];
            left = argObj['left'];
			extraInfo = argObj['extraInfo'];
            name = argObj['name'];
        }
        top = top || 0;
        left = left || 0;
        var ele = $('#'+id);
        var width = ele.width();
        var height = ele.height();
        var fontSize = ele.css('font-size');
        top = parseInt(top,10);
        top = isNaN(top)?ele.offset().top:top;//默认使用元素本身的top
        left = parseInt(left,10);
        left = isNaN(left)?ele.offset().left:left;//默认使用元素本身的left
        name = name?name:id;
        
		extraInfo = extraInfo || '';
		
        //fixed xiaomi 2s bug
        fontSize = parseInt(fontSize,10);
        fontSize = isNaN(fontSize)? 0 : fontSize;
        
        openPopover(name,0,url,'',left,top,width,height,fontSize,0,0,extraInfo);
    }

    /*
    打开一个浮动窗口
    @param String name 浮动窗口名
    @param String dataType 数据类型0:url 1:html 2:url html
    @param String url  url地址
    @param String data 数据
    @param Int left 居左距离
    @param Int top 居上距离
    @param Int width 宽
    @param Int height 高
    @param Int fontSize 默认字体
    @param Int tpye 窗口的类型
        0:普通窗口
        1:OAuth 窗口
        2:加密页面窗口
        4:强制刷新
        8:url用系统浏览器打开
        16:view不透明
        32:隐藏的winwdow
        64:等待popOver加载完毕后显示
        128:支持手势
        256:标记opn的window上一个window不隐藏
        512:标记呗open的浮动窗口用友打开wabapp
    
    @param Int bottomMargin 浮动窗口相对父窗口底部的距离。为空或0时，默认为0。当值不等于0时，inHeight参数无效


    */
    function openPopover(name,dataType,url,data,left,top,width,height,fontSize,type,bottomMargin,extraInfo){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(name)){
            argObj = name;
            name = argObj['name'];
            dataType = argObj['dataType'];
            url = argObj['url'];
            data = argObj['data'];
            left = argObj['left'];
            top = argObj['top'];
            width = argObj['width'];
            height = argObj['height'];
            fontSize = argObj['fontSize'];
            type = argObj['type'];
            bottomMargin = argObj['bottomMargin'];
			extraInfo = argObj['extraInfo'];
        }
        dataType = dataType || 0;
        left = left || 0;
        top = top || 0;
        height = height || 0;
        width = width || 0;
        type = type || 0;
        bottomMargin = bottomMargin || 0;
        fontSize = fontSize || 0;
        data = data || '';
        //fixed xiaomi 2s bug
        fontSize = parseInt(fontSize,10);
        fontSize = isNaN(fontSize)?0:fontSize;
		
		try{
			extraInfo = appcan.isString(extraInfo) ? extraInfo : JSON.stringify(extraInfo);
			extraInfo = JSON.parse(extraInfo);
			if(!extraInfo.extraInfo){
				extraInfo = {extraInfo:extraInfo};
			}
			extraInfo = JSON.stringify(extraInfo);
		}catch(e){
			extraInfo = extraInfo || '';
		}
		
        //fixed ios bug
        if(uexWidgetOne.platformName && uexWidgetOne.platformName.toLowerCase().indexOf('ios') > -1){
            var args = ['"'+name+'"',dataType,'"'+url+'"','"'+data+'"',left,top,width,height,fontSize,type,bottomMargin,"'"+extraInfo+"'"];
            var scriptContent = 'uexWindow.openPopover(' + args.join(',') +')';
            evaluateScript('',scriptContent);
            return;
        }
        uexWindow.openPopover(name,dataType,url,data,left,top,width,height,fontSize,type,bottomMargin,extraInfo);
    }

    /*
    关闭浮动按钮
    @param String name 浮动窗口的名字

    */

    function closePopover(name){
        if(arguments.length === 1 && appcan.isPlainObject(name)){
            name = name['name'];
        }
        uexWindow.closePopover(name);
    }
    

    /*
    根据制定元素重置提示框的位置大小
    @param String id 元素id
    @param String left 距左边距离
    @param String top 距上边的距离
    @param String name 名称，默认为id
    */

    function resizePopoverByEle(id,left,top,name){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(id)){
            argObj = id;
            id = argObj['id'];
            left = argObj['left'];
            top = argObj['top'];
            name = argObj['name'];
        }
        left = left || 0;
        top = top || 0;
        var ele = $('#'+id);
        var width = ele.width();
        var height = ele.height();
        left = parseInt(left,10);
        left = isNaN(left)?0:left;
        top = parseInt(top,10);
        top = isNaN(top)?0:top;
        name = name?name:id;
        uexWindow.setPopoverFrame(name,left,top,width,height);
    }

    /*
    重置提示框的位置大小
    @param String name popover名
    @param String left 距左边距离
    @param String top 距上边的距离
    @param String width 窗口的宽
    @param String height 窗口的高


    */

    function resizePopover(name,left,top,width,height){
        var argObj = null;
        if(arguments.length === 1 && appcan.isPlainObject(name)){
            argObj = name;
            name = argObj['name'];
            left = argObj['left'];
            top = argObj['top'];
            width = argObj['width'];
            height = argObj['height'];
        }
        left = left || 0;
        top = top || 0;
        width = width || 0;
        height = height || 0;

        left = parseInt(left,10);
        left = isNaN(left)?0:left;

        top = parseInt(top,10);
        top = isNaN(top)?0:top;

        width = parseInt(width,10);
        width = isNaN(width)?0:width;

        height = parseInt(height,10);
        height = isNaN(height)?0:height;

        uexWindow.setPopoverFrame(name,left,top,width,height);
    }


    /*
    弹出一个确认框
    @param String title 对话框的标题
    @param String content 对话框的内容
    @param Array buttons 按钮文字


    */
    function windowConfirm(title,content,buttons,callback){
        if(arguments.length === 1 && appcan.isPlainObject(title)){
            callback = title['callback'];
            buttons = title['buttons'];
            content = title['content'];
            title = title['title'];
        }
        title = title || '提示';
        buttons = buttons || ['确定'];
        buttons = appcan.isArray(buttons)?buttons:[buttons];
        popConfirm(title,content,buttons,callback);
    }
    
    /*
    弹出一个警告框
    @param String title 对话框的标题
    @param String content 对话框的内容
    @param Array buttons 按钮文字


    */
    function popAlert(title,content,buttons){
        if(arguments.length === 1 && appcan.isPlainObject(title)){
            buttons = title['buttons'];
            content = title['content'];
            title = title['title'];
        }
        buttons = appcan.isArray(buttons)?buttons:[buttons];
        uexWindow.alert(title,content,buttons[0]);
    }
    
    /*
        弹出一个提示框
        @param String title 对话框的标题
        @param String content 对话框的内容
        @param Array buttons 按钮文字
        
        
        
    */
    function popConfirm(title,content,buttons,callback){
        if(arguments.length === 1 && appcan.isPlainObject(title)){
            callback = title['callback'];
            buttons = title['buttons'];
            content = title['content'];
            title = title['title'];
        }
        buttons = appcan.isArray(buttons)?buttons:[buttons];
        if(appcan.isFunction(callback)){
            uexWindow.cbConfirm = function(optId,dataType,data){
                if(dataType != 2){
                    return callback(new Error('confirm error'));
                }
                callback(null,data,dataType,optId);
            };
        }
        
        uexWindow.confirm(title,content,buttons);
    }
    
    /*
        弹出一个可提示用户输入的对话框
        @param String title 对话框的标题
        @param String content 对话框显示的内容
        @param String defaultValue 输入框默认文字
        @param Array  buttons 显示在按钮上的文字集合
        @param Function callback  对话框关闭的回调 
        
        
    */
    function popPrompt(title, content, defaultValue, buttons,callback){
        if(arguments.length === 1 && appcan.isPlainObject(title)){
            callback = title['callback'];
            buttons = title['buttons'];
            content = title['content'];
            defaultValue = title['defaultValue'];
            title = title['title'];
        }
        buttons = appcan.isArray(buttons)?buttons:[buttons];
        if(appcan.isFunction(callback)){
            uexWindow.cbPrompt = function(optId,dataType,data){
                try{
                    var data=JSON.parse(data);
                    callback(null,data,dataType,optId);
                }
                catch(e){
                    callback(e);
                }
            };
        }
        
        uexWindow.prompt(title,content,defaultValue,buttons);
    }
    
    /*
    把指定的浮动窗口排在所有浮动窗口最上面
    @param String name 浮动窗口的名字

    */

    function bringPopoverToFront(name){
        if(arguments.length === 1 && appcan.isPlainObject(name)){
            name = name['name'];
        }
        uexWindow.bringPopoverToFront(name);
    }
    
    /*
    把指定的浮动窗口排在所有浮动窗口最下面
    @param String name 浮动窗口的名字

    */
    
    function sendPopoverToBack(name){
        if(arguments.length === 1 && appcan.isPlainObject(name)){
            name = name['name'];
        }
        uexWindow.sendPopoverToBack(name);
    }
    
    /*
        订阅一个频道消息,当有消息发布的时候该该回调将会调用该回调
        @param Int channelId 频道id
        @param Function callback回调函数
        
    */
    function subscribe(channelId,callback){
        if(arguments.length === 1 && appcan.isPlainObject(channelId)){
            callback = channelId['callback'];
            channelId = channelId['channelId'];
        }
        if(!appcan.isFunction(callback)){
            return;
        }
        var funName = 'notify_callback_' + appcan.getUID();
        uexWindow[funName] = callback;
        uexWindow.subscribeChannelNotification(channelId,funName);
    }
    
    /*
        发布一个消息
        @param Int channelId :频道id
        @param String msg : 要发布的消息
    
    */
    function publish(channelId,msg){
        if(arguments.length === 1 && appcan.isPlainObject(channelId)){
            msg = channelId['msg'];
            channelId = channelId['channelId'];
        }
        if(appcan.isPlainObject(msg)){
            msg = JSON.stringify(msg);
        }
        uexWindow.publishChannelNotification(channelId,msg);
    }
    
    /*
        向全局的公共频道发送消息
        @param String msg 向全局频道发送消息
    
    */
    
    function publishGlobal(msg){
        if(arguments.length === 1 && appcan.isPlainObject(msg)){
            msg = msg['msg'];
        }
        uexWindow.postGlobalNotification(msg);
    }
    
    /*
        处理全局回调订阅消息
        @param string msg 传递过来的消息
    
    */
    function processSubscribeGolbalQueue(msg){
        if(subscribeGlobslQueue.length > 0){
            $.each(subscribeGlobslQueue,function(i,v){
                if(v && appcan.isFunction(v)){
                    v(msg);
                }
            });
        }
        return
    }
    
    /*
        订阅全局的频道
        @param Function callback 订阅的回调
    
    */
    function subscribeGlobal(callback){
        if(arguments.length === 1 && appcan.isPlainObject(callback)){
            callback = callback['callback'];
        }
        if(!appcan.isFunction(callback)){
            return;
        }
        subscribeGlobslQueue.push(callback);
        uexWindow.onGlobalNotification = function(msg){
            processSubscribeGolbalQueue(msg);
        };
    }
    
    /*
        移除全局订阅事件
        @param Function callback：要移除的回调的引用
    
    */
    function removeGlobalSubscribe(callback){
        if(arguments.length === 1 && appcan.isPlainObject(callback)){
            callback = callback['callback'];
        }
        if(!appcan.isFunction(callback)){
            return;
        }
        for(var i=0,len=subscribeGlobslQueue.length;i<len;i++){
            if(subscribeGlobslQueue[i] === callback){
                subscribeGlobslQueue.splice(i,1);
                return;
            }
        }
    }
    
    /*
        处理多窗口滑动回调事件
        
    */
    function processMultiPopover(err,res){
        if(err){
            //todo call error
        }else{
            if(appcan.isString(res)){
                res = JSON.parse(res);
            }
            if(!res.multiPopName){
                return;
            }
            var multiCalls = multiPopoverQueue[res.multiPopName];
            $.each(multiCalls,function(i,fun){
                if(appcan.isFunction(fun)){
                    fun(null,res);
                }
            });
        }
    }
    
    /*
        弹出多页面浮动窗口
        @param String popName:弹出窗口的名称 
        @param String content:传入的数据 
        @param String dataType:传入数据的类型 0：url方式载入；1：html内容 方式载入；2：既有url方式，又有html内容方式 
        @param Int left:距离左边的距离 
        @param Int top:距离上边界的距离 
        @param Int width:弹出窗口的宽
        @param Int height:弹出窗口的高 
        @param Int fontSize:字体大小 
        @param Int flag:弹出类型的标识
        @param Int indexSelected:默认选中的窗口 
        
    
    */
    function openMultiPopover(popName,content,dataType, left, top, width, height,change, fontSize, flag, indexSelected,extraInfo){
        if(arguments.length === 1 && appcan.isPlainObject(popName)){
            indexSelected = popName['indexSelected'];
            flag = popName['flag'];
            fontSize = popName['fontSize'];
            change = popName['change'];
            height = popName['height'];
            width = popName['width'];
            top = popName['top'];
            left = popName['left'];
            dataType = popName['dataType'];
            content = popName['content'];
			extraInfo = popName['extraInfo']
            popName = popName['popName'];
        }
        dataType = dataType || 0;
        flag = flag || 0;
        indexSelected = parseInt(indexSelected,10);
        indexSelected = isNaN(indexSelected)? 0 : indexSelected;
        width = width || 0;
        height = height || 0;
        change = change || function(){};
		
		try{
			extraInfo = appcan.isString(extraInfo) ? extraInfo : JSON.stringify(extraInfo);
			extraInfo = JSON.parse(extraInfo);
			if(!extraInfo.extraInfo){
				extraInfo = {extraInfo:extraInfo};
			}
			extraInfo = JSON.stringify(extraInfo);
		}catch(e){
			extraInfo = extraInfo || '';
		}
        
        //fixed android 如果少任何一个key就会crash bug
        if(!appcan.isString(content)){
            if(!content.content){
                content={
                    content:content
                };
            }
        }else{
            content = JSON.parse(conent);
            if(!content.content){
                content={
                    content:content
                };
            }
        }
        //check all key
        var mustKey = ['inPageName','inUrl','inData'];
        var realContent = content.content;
        $.each(realContent,function(i,v){
            $.each(mustKey,function(i1,v1){
                if(!(v1 in v)){
                    v[v1] = '';
                }
            });
        });
        //content
        content = JSON.stringify(content);
        if(multiPopoverQueue[popName]){
            multiPopoverQueue[popName].push(change);
        }else{
            multiPopoverQueue[popName] = [change];
        }
        uexWindow.openMultiPopover(content,popName,dataType, left, top, width, height, fontSize, flag, indexSelected,extraInfo);
        uexWindow.cbOpenMultiPopover = function(optId,dataType,res){
            if(optId == 0){
                if(dataType != 1){
                    processMultiPopover(new Error('multi popover error'));
                }else{
                    processMultiPopover(null,res);
                }
            }
        };
        //fixed ios indexed bug
        setSelectedPopOverInMultiWindow(popName, indexSelected);
    }
    
    /*
        关闭多页面浮动窗口
        @param String popName:多页面弹出窗口
        
    
    */
    function closeMultiPopover(popName){
        if(arguments.length === 1 && appcan.isPlainObject(popName)){
            popName = popName['popName'];
        }
        if(!popName){
            return;
        }
        
        uexWindow.closeMultiPopover(popName)
        
    }
    
    /*
        设置多页面浮动窗口跳转到的子页面窗口的索引
        @param String popName:多窗口弹出框的名称
        @param String index:页面的索引 
        
        
    */
    function setSelectedPopOverInMultiWindow(popName,index){
        if(arguments.length === 1 && appcan.isPlainObject(popName)){
            index = popName['index'];
            popName = popName['popName'];
        }
        if(!popName){
            return;
        }
        index = parseInt(index,10);
        index = isNaN(index)? 0 : index;
        //fixed 模拟器不支持MultiPopOver bug
        uexWindow.setSelectedPopOverInMultiWindow && uexWindow.setSelectedPopOverInMultiWindow(popName,index);
        
    }
    
    
    
    var windowStatusCallList = [];
    
    /*
        
        处理窗口回调事件
        @param Function state:当前的状态
        
        
    */
    function processWindowStateChange(state){
        $.each(windowStatusCallList,function(i,v){
            if(appcan.isFunction(v)){
                v(state);
            }
        })
    }
    
    
    /*
        当前窗口的状态改变
        @param Function callback:窗口事件改变后的回调函数
        
    
    */
    function onStateChange(callback){
        if(!appcan.isFunction(callback)){
            return;
        }
        //兼容老用法
        
        windowStatusCallList.push(callback);
        
        uexWindow.onStateChange = processWindowStateChange;
    }
    
    /*
        默认状态改变事件
        
    
    */
    
    function defaultStatusChange(state){
        var tmpResumeCall = null;
        var tmpPauseCall = null;
        if(appcan.window.onResume){
            tmpResumeCall = appcan.window.onResume;
        }
        if(appcan.window.onPause){
            tmpPauseCall = appcan.window.onPause;
        }
        
        if(state === 0){
            appcanWindow.emit('resume');
            tmpResumeCall && tmpResumeCall();
        }
        
        if(state === 1){
            appcanWindow.emit('pause');
            tmpPauseCall && tmpPauseCall();
        }
        
    }
    
    
    /*
    
        swipe回调列表
        
        
    */
    var swipeCallbackList = {
        left:[],
        right:[] 
    };
    
    function processSwipeLeft(){
        
        $.each(swipeCallbackList.left,function(i,v){
            if(appcan.isFunction(v)){
                v();
            }
        })
        
    }
    
    function processSwipeRight(){
        
        $.each(swipeCallbackList.right,function(i,v){
            if(appcan.isFunction(v)){
                v();
            }
        })
    }
    
    /*
        当页面滑动的时候，执行的回调方法
        
    
    */
    function onSwipe(direction,callback){
        
        if(direction === 'left'){
            swipeCallbackList[direction].push(callback);
            
            uexWindow.onSwipeLeft = processSwipeLeft;
            return;
        }
        if(direction === 'right'){
            swipeCallbackList[direction].push(callback);
            
            uexWindow.onSwipeRight = processSwipeRight;
            return;
        }
    }
    
    function onSwipeLeft(callback){
        if(!appcan.isFunction(callback)){
            return;
        }
        onSwipe('left',callback);
    }
    
    function onSwipeRight(callback){
        if(!appcan.isFunction(callback)){
            return;
        }
        onSwipe('right',callback);
    }
    
    /*
        
        兼容原始appcan.frame.onSwipeLeft 和 appcan.window.onSwipeLeft 方法
        
    
    */
    function defaultSwipeLeft(){
        var tmpSwipeLeftCall = null;
        var tmpFrameSLCall = null;
        
        if(appcan.window.onSwipeLeft){
            tmpSwipeLeftCall = appcan.window.onSwipeLeft;
        }
        
        if(appcan.frame.onSwipeLeft){
            tmpFrameSLCall = appcan.frame.onSwipeLeft;
        }
        
        appcanWindow.emit('swipeLeft');
        appcan.frame && appcan.frame.emit && appcan.frame.emit('swipeLeft');
        tmpSwipeLeftCall && tmpSwipeLeftCall();
        tmpFrameSLCall && tmpFrameSLCall();
        
    }
    
    
     /*
        
        兼容原始appcan.frame.onSwipeRight 和 appcan.window.onSwipeRight 方法
        
    
    */
    function defaultSwipeRight(){
        var tmpSwipeRightCall = null;
        var tmpFrameSRCall = null;
        
        if(appcan.window.onSwipeRight){
            tmpSwipeRightCall = appcan.window.onSwipeRight;
        }
        
        if(appcan.frame.onSwipeRight){
            tmpFrameSRCall = appcan.frame.onSwipeRight;
        }
        
        appcanWindow.emit('swipeRight');
        appcan.frame && appcan.frame.emit && appcan.frame.emit('swipeRight');
        tmpSwipeRightCall && tmpSwipeRightCall();
        tmpFrameSRCall && tmpFrameSRCall();
    }
    /*
        
        控制父组件是否拦截子组件的事件 
        @param Int enable 设置父组件是否拦截子组件的事件,参数不为1时设置默认拦截；0:可以拦截，子组件不可以正常响应事件 ；1:不拦截，子组件可以正常响应事件 
    */
    function setMultilPopoverFlippingEnbaled(enable){
        var enable = parseInt(enable,10);
        enable = isNaN(enable)?0:enable;
        enable = enable!=1?0:enable;
        uexWindow.setMultilPopoverFlippingEnbaled(enable);
    }
    
    
    //默认绑定状态
    appcan.ready(function(){
        //绑定默认状态改变事件
        onStateChange(defaultStatusChange);
        //绑定默认swipe事件
        onSwipeLeft(defaultSwipeLeft);
        //绑定默认swipe事件
        onSwipeRight(defaultSwipeRight);
    });
    
    //导出接口
    var appcanWindow = module.exports = {
        open:open,
        close:close,
        evaluateScript:evaluateScript,
        evaluatePopoverScript:evaluatePopoverScript,
        setBounce:setBounce,
        setBounceParams:setBounceParams,
        enableBounce:enableBounce,
        disableBounce:disableBounce,
        setBounceType:setBounceType,
        resetBounceView:resetBounceView,
        openToast:openToast,
        closeToast:closeToast,
        moveAnim:moveAnim,
        popoverElement:popoverElement,
        openPopover:openPopover,
        closePopover:closePopover,
        resizePopover:resizePopover,
        resizePopoverByEle:resizePopoverByEle,
        alert:windowConfirm,
        //popAlert:popAlert, 隐藏该接口，因为confirm
        confirm:popConfirm,
        prompt:popPrompt,
        bringPopoverToFront:bringPopoverToFront,
        sendPopoverToBack:sendPopoverToBack,
        publish:publish,
        subscribe:subscribe,
        //publishGlobal:publishGlobal,
        //subscribeGlobal:subscribeGlobal,
        selectMultiPopover:setSelectedPopOverInMultiWindow,
        openMultiPopover:openMultiPopover,
        closeMultiPopover:closeMultiPopover,
        setWindowFrame:setWindowFrame,
        monitorKey:monitorKey,
        stateChange:onStateChange,
        swipeLeft:onSwipeLeft,
        swipeRight:onSwipeRight,
		getBounceStatus:getBounceStatus,
        setMultilPopoverFlippingEnbaled:setMultilPopoverFlippingEnbaled
        
    };
    
    appcan.extend(appcanWindow,appcan.eventEmitter);

});

/*
    author:dushaobin
    email:shaobin.du@3g2win.com
    description:构建appcan window模块
    create:2014.08.18
    update:______/___author___

*/
window.appcan && appcan.define('frame',function($,exports,module){
    var appWin = appcan.require('window');
    
    var appcanFrame = module.exports = {
        //open:appWin.openPopover,
        close:appWin.closePopover,
        //resize:appWin.resizePopover,
        bringToFront:appWin.bringPopoverToFront,
        sendToBack:appWin.sendPopoverToBack,
        evaluateScript:appWin.evaluatePopoverScript,
        publish:appWin.publish,
        subscribe:appWin.subscribe,
        //publishGlobal:appWin.publishGlobal,
        //subscribeGlobal:appWin.subscribeGlobal,
        selectMulti:appWin.selectMultiPopover,
        openMulti:appWin.openMultiPopover,
        closeMulti:appWin.closeMultiPopover,
        setBounce:appWin.setBounce,
		getBounceStatus:appWin.getBounceStatus,
        resetBounce:appWin.resetBounceView,
        open:function(id,url,left,top,name,index,change,extraInfo){
            var argObj = null;
            if(arguments.length === 1 && appcan.isPlainObject(id)){
                argObj = id;
                id = argObj['id'] || 0;
                url = argObj['url'];
                top = argObj['top'];
                left = argObj['left'];
                name = argObj['name'];
                index = argObj['index'];
                change = argObj['change'];
            }
            if(appcan.isArray(url)){
                var ele = $('#'+id);
                var width = ele.width();
                var height = ele.height();
                var fontSize = ele.css('font-size');
                top = parseInt(top,10);
                top = isNaN(top)?ele.offset().top:top;//默认使用元素本身的top
                left = parseInt(left,10);
                left = isNaN(left)?ele.offset().left:left;//默认使用元素本身的left
                name = name?name:id;
                //fixed xiaomi 2s bug
                fontSize = parseInt(fontSize,10);
                fontSize = isNaN(fontSize)? 0 : fontSize;
                appWin.openMultiPopover(name || id,
                    url,0,left,top,width,height,change||function(){},fontSize,0,index,extraInfo);
            }
            else{
                appWin.popoverElement(id,url,left,top,name,extraInfo);
            }
        },
        resize:appWin.resizePopoverByEle,
        swipeLeft:appWin.swipeLeft,
        swipeRight:appWin.swipeRight
    };
    
    appcan.extend(appcanFrame,appcan.eventEmitter);
    
    
});;;(function() {
    var requestAjax = appcan.request.ajax;
    var baseFilePath ='wgt://offlinedata/';
    var offlineKey = 'offlinedata';
    var rc4=appcan.crypto.rc4;
    function ajax(opts) {
        if (arguments.length === 1 && appcan.isPlainObject(opts)) {
            var url;
            var expires;
            if(opts.data){
                var paramsInfo = JSON.stringify(opts.data);
                var fullUrl = opts.url + paramsInfo;
                url = appcan.crypto.md5(fullUrl);
            }else{
                url = appcan.crypto.md5(opts.url);
            }
            if(opts.expires && typeof(opts.expires) == 'number'){
                expires = parseInt(opts.expires) + parseInt(new Date().getTime());
            }else if(opts.expires && typeof(opts.expires) == 'string'){
                var result = setISO8601(opts.expires);
                expires = result;
            }else{
                expires = 0;
            }
            if (opts.offlineDataPath != undefined && typeof(opts.offlineDataPath) == 'string'){
                baseFilePath = opts.offlineDataPath;
            }
            if (opts.offline != undefined) {
                var isOffline = opts.offline;

                
                if (isOffline === true) {
                    var offlinedata = appcan.locStorage.val(offlineKey);
                    var dataObj = null;
                    if (offlinedata != null) {
                        dataObj = JSON.parse(offlinedata);
                        if (dataObj[url]) {
                            var urlData = dataObj[url];
                            if (urlData.timeout && urlData.now && urlData.data) {
                                var timeout = parseInt(urlData.now) + parseInt(urlData.timeout);
                                var now = new Date();
                                var localFilePath = urlData.data;
                                if(urlData.expires && (urlData.expires > now.getTime())){
                                   appcan.file.read({
                                        filePath:localFilePath,
                                        length:-1,
                                        callback:function(err,data,dataType,optId){
                                            if(err == null){
                                                //判断是否进行解密
                                                if(opts.crypto && opts.password){ 
                                                    data = rc4(opts.password,data);
                                                }
                                                var tempSucc = opts.success;
                                                if (typeof(tempSucc) == 'function') {
                                                    opts.success(data,"success",200,null,null);
                                                }
                                            }else{
                                                var tempSucc = opts.success;
                                                var tempError = opts.error;
                                                opts.success = function(res) {
                                                    tempSucc.apply(this, arguments);
                                                    setLocalStorage(url, res, expires, opts);
                                                };
                                                opts.error = function(res) {
                                                    tempError.apply(this, arguments);
                                                };

                                                requestAjax(opts);
                                            }
                                        }
                                    }); 
                                }
                                else if (timeout > now.getTime()) {
                                    appcan.file.read({
                                        filePath:localFilePath,
                                        length:-1,
                                        callback:function(err,data,dataType,optId){
                                            if(err == null){
                                                //判断是否进行解密
                                                if(opts.crypto && opts.password){ 
                                                    data = rc4(opts.password,data);
                                                }
                                                var tempSucc = opts.success;
                                                if (typeof(tempSucc) == 'function') {
                                                    opts.success(data,"success",200,null,null);
                                                }
                                            }else{
                                                var tempSucc = opts.success;
                                                var tempError = opts.error;
                                                opts.success = function(res) {
                                                    tempSucc.apply(this, arguments);
                                                    setLocalStorage(url, res, expires, opts);
                                                };
                                                opts.error = function(res) {
                                                    tempError.apply(this, arguments);
                                                };
                                                requestAjax(opts);
                                            }
                                        }
                                    });
                                } else {
                                    var tempSucc = opts.success;
                                    var tempError = opts.error;
                                    opts.success = function(res) {
                                        tempSucc.apply(this, arguments);
                                        setLocalStorage(url, res, expires, opts);
                                    };
                                    opts.error = function(res) {
                                        tempError.apply(this, arguments);
                                    };
                                    requestAjax(opts);
                                }
                            } else if (urlData.data) {
                                var localFilePath = urlData.data;
                                if(urlData.expires){
                                    var now = new Date();
                                    if(urlData.expires > now.getTime()){
                                        appcan.file.read({
                                            filePath:localFilePath,
                                            callback:function(err,data,dataType,optId){
                                                if(err == null){
                                                    //判断是否进行解密
                                                    if(opts.crypto && opts.password){ 
                                                        data = rc4(opts.password,data);
                                                    }
                                                    var tempSucc = opts.success;
                                                    if (typeof(tempSucc) == 'function') {
                                                        opts.success(data,"success",200,null,null);
                                                    }
                                                }else{
                                                    var tempSucc = opts.success;
                                                    var tempError = opts.error;
                                                    opts.success = function(res) {
                                                        tempSucc.apply(this, arguments);
                                                        setLocalStorage(url, res, expires, opts);   
                                                    };
                                                    opts.error = function(res) {
                                                        tempError.apply(this, arguments);
                                                    };
                                                    requestAjax(opts);
                                                }
                                            }
                                        });

                                    }else{
                                        var tempSucc = opts.success;
                                        var tempError = opts.error;
                                        opts.success = function(res) {
                                            tempSucc.apply(this, arguments);
                                            setLocalStorage(url, res, expires, opts);
                                        };
                                        opts.error = function(res) {
                                            tempError.apply(this, arguments);
                                        };
                                        requestAjax(opts);
                                    }
                                }else{
                                    appcan.file.read({
                                        filePath:localFilePath,
                                        callback:function(err,data,dataType,optId){
                                            if(err == null){
                                                //判断是否进行解密
                                                if(opts.crypto && opts.password){ 
                                                    data = rc4(opts.password,data);
                                                }
                                                var tempSucc = opts.success;
                                                if (typeof(tempSucc) == 'function') {
                                                    opts.success(data,"success",200,null,null);
                                                }
                                            }else{
                                                var tempSucc = opts.success;
                                                var tempError = opts.error;
                                                opts.success = function(res) {
                                                    tempSucc.apply(this, arguments);
                                                    setLocalStorage(url, res, expires, opts);
                                                };
                                                opts.error = function(res) {
                                                    tempError.apply(this, arguments);
                                                };
                                                requestAjax(opts);
                                            }
                                        }
                                    }); 
                                }
                                
                            } else {
                                var tempSucc = opts.success;
                                var tempError = opts.error;
                                opts.success = function(res) {
                                    tempSucc.apply(this, arguments);
                                    setLocalStorage(url, res, expires, opts);
                                };
                                opts.error = function(res) {
                                    tempError.apply(this, arguments);
                                };

                                requestAjax(opts);
                            }
                        } else {
                            var tempSucc = opts.success;
                            var tempError = opts.error;
                            opts.success = function(res) {
                                tempSucc.apply(this, arguments);
                                setLocalStorage(url, res, expires, opts);
                            };
                            opts.error = function(res) {
                                tempError.apply(this, arguments);
                            };
                            requestAjax(opts);
                        }
                    } else {
                        var tempSucc = opts.success;
                        var tempError = opts.error;
                        opts.success = function(res) {
                            tempSucc.apply(this, arguments);
                            setLocalStorage(url, res, expires, opts);
                        };
                        opts.error = function(res) {
                            tempError.apply(this, arguments);
                        };
                        requestAjax(opts);
                    }
                } else {
                    var tempSucc = opts.success;
                    var tempError = opts.error;
                    opts.success = function(res) {
                        tempSucc.apply(this, arguments);
                        setLocalStorage(url, res, expires, opts);
                    };
                    opts.error = function(res) {
                        tempError.apply(this, arguments);
                    };
                    requestAjax(opts);
                }
            } else {
                var tempSucc = opts.success;
                var tempError = opts.error;
                opts.success = function(res) {
                    tempSucc.apply(this, arguments);
                };
                opts.error = function(res) {
                    tempError.apply(this, arguments);
                };
                requestAjax(opts);
            }
        }
    }
    function setLocalStorage(fileUrl, fileData, exp, opts) {
        try {
            var filename = fileUrl;
            var localFilePath = baseFilePath + filename + '.txt';
            var saveData = {};
            var now = new Date().getTime();
            var data=fileData;
            //判断是否进行加密
            if(opts.crypto && opts.password){
                fileData = rc4(opts.password,fileData);
            }
            appcan.file.write({
                filePath:localFilePath,
                content:fileData,
                callback:function(err){
                    if(err == null){
                        saveData['now'] = now;
                        saveData['data'] = localFilePath;
                        if (data.timeout) {
                            saveData.timeout= data.timeout;
                        }else if(typeof data == "string"){
                            try{
                               var parseData = JSON.parse(data);
                               if(parseData.timeout){
                                   saveData.timeout = parseData.timeout;
                               }
                            }catch(e){
                                //console.log(e);
                            }
                        }
                        if(exp > 0){
                            saveData['expires'] = exp;
                        }
                        var offdata = appcan.locStorage.val(offlineKey) || '{}';
                        var offdataObj = JSON.parse(offdata);
                        offdataObj[filename] = saveData;
                        appcan.locStorage.val(offlineKey, JSON.stringify(offdataObj)); 
                    }  
                }
            });
        } catch(e) {
            throw e;
        }
    }
    
    function setISO8601(string) {
        var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" + "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" + "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
        if (string) {
            try{
                var d = string.match(new RegExp(regexp));
                var offset = 0;
                var date = new Date(d[1], 0, 1);

                if (d[3]) {
                    date.setMonth(d[3] - 1);
                }
                if (d[5]) {
                    date.setDate(d[5]);
                }
                if (d[7]) {
                    date.setHours(d[7]);
                }
                if (d[8]) {
                    date.setMinutes(d[8]);
                }
                if (d[10]) {
                    date.setSeconds(d[10]);
                }
                if (d[12]) {
                    date.setMilliseconds(Number("0." + d[12]) * 1000);
                }
                if (d[14]) {
                    offset = (Number(d[16]) * 60) + Number(d[17]);
                    offset *= ((d[15] == '-') ? 1 : -1);
                }
                offset -= date.getTimezoneOffset();
                time = (Number(date) + (offset * 60 * 1000));
                return Number(time);
            }catch(e){
                return 0;
            }
            //this.setTime(Number(time));
        } else {
            return 0;
        }
    }

    function ISODateString(d) {
        function pad(n) {
            return n < 10 ? '0' + n : n
        }
        return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z'
    }
    appcan.extend(appcan.request, {
        ajax : ajax
    });
})();

appcan.define('ajax', function($, exports, module){
    module.exports = appcan.request.ajax;
});;/**
 *
 */
appcan.define("icache", function($, exports, module) {
    var opid = 1000;
    var CACHE_PATH = "wgt://icache/";
    function iCache(option) {
        var self = this;
        appcan.extend(this, appcan.eventEmitter);
        self.waiting = [];
        self.running = [];
        self.option = $.extend({
            maxtask : 3
        }, option, true);
        uexFileMgr.cbGetFileRealPath = function(opCode, dataType, path) {
            self.realpath = path;
            self.emit("NEXT_SESSION");
        }
        uexFileMgr.cbIsFileExistByPath = function(opId, dataType, data) {
            self.emit("FS" + opId, self, data);
        }
        uexDownloaderMgr.cbCreateDownloader = function(opCode, dataType, data) {

            self.emit("CDL" + opCode, self, data);
        }
        uexDownloaderMgr.onStatus = function(opCode, fileSize, percent, status) {

            self.emit("DLS" + opCode, self, {
                fileSize : fileSize,
                percent : percent,
                status : status
            });
        }
        uexFileMgr.getFileRealPath("wgt://");
        self.on("NEXT_SESSION", self._next);

    }


    iCache.prototype = {
        _progress : function(data, session) {
            if (session.progress) {
                session.progress(data, session);
            }
        },
        _success : function(fpath, session) {
            var self = this;
            self.off("DLS" + session.id);
            uexDownloaderMgr.closeDownloader(session.id);
            if (session.success) {
                session.success(fpath, session);
            } else if (session.dom && session.dom.length) {
                switch(session.dom[0].tagName.toLowerCase()) {
                case "img":
                    session.dom.attr("src", fpath);
                    break;
                default:
                    session.dom.css("background-image", "url(file://" + fpath + ") !important");
                    break;
                }
            }
            var index = self.running.valueOf(session);
            index != undefined && self.running.splice(index, 1);
            self.emit("NEXT_SESSION");
        },
        _fail : function(session) {
            var self = this;
            self.off("DLS" + session.id);
            uexDownloaderMgr.closeDownloader(session.id);
            var index = self.running.valueOf(session);
            index != undefined && self.running.splice(index, 1);
            if (session.fail) {
                session.fail(session);
            }
            self.emit("NEXT_SESSION");
        },
        _next : function() {
            var self = this;
            if (!self.realpath)
                return;
            if (self.running.length >= self.option.maxtask)
                return;
            var session = self.waiting.shift();
            if (!session)
                return;
            self.running.push(session);
            self._download(session);

        },
        _download : function(session) {
            var self = this;
            var fid = appcan.crypto.md5(session.url);
            var fpath = self.realpath + "/icache/" + fid;
            self.once("FS" + session.id, function(data) {
                if (data) {
                    self._success(fpath, session);
                } else {
                    uexDownloaderMgr.createDownloader(session.id);
                }
            })
            self.once("CDL" + session.id, function(data) {
                if (!data) {
                    (uexDownloaderMgr.setHeaders && session.header) && uexDownloaderMgr.setHeaders(session.id, session.header);
                    uexDownloaderMgr.download(session.id, session.url, fpath, '0');
                } else
                    self._fail(session);
            })
            self.on("DLS" + session.id, function(data) {
                switch(parseInt(data.status)) {
                case 0:
                    self._progress(data, session)
                    break;
                case 1:
                    self._success(fpath, session);
                    break;
                default:
                    self._fail(session);
                    break;
                }
            })
            uexFileMgr.isFileExistByPath(session.id, fpath);
        },
        run : function(option) {
            var self = this;
            var session = $.extend({
                id : ("" + (opid++)),
                status : 0
            }, option, true);
            self.waiting.push(session);
            self.emit("NEXT_SESSION");
        },
        clearcache:function(){
            uexFileMgr.deleteFileByPath(CACHE_PATH);
        }
    }

    module.exports = function(option) {
        return new iCache(option);
    };
})
