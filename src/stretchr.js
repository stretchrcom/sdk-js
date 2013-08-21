/**

  Stretchr JavaScript SDK
  /api/v1.1

  Copyright (c) 2013 Mat Ryer

  Please consider promoting this project if you find it useful.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
  to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies
  or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
  FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  DEALINGS IN THE SOFTWARE.

  Special thanks to:

    Jeff Mott for CryptoJS
    - scroll down for more information

*/

/** @namespace */
var Stretchr = {

  /** version represents this SDK version. */
  version: "2.0",

  /** apiVersion represents the default API version this SDK will
    * attempt to interact with. */
  apiVersion: "1.1"

};

/*
  oo
  v1.2
  
  The worlds simplest JavaScript OO implementation.
  For if you just need classes, and nothing else.

  Copyright (c) 2013 Mat Ryer
  Please consider promoting this project if you find it useful.
  Be sure to check out the Licence: https://github.com/stretchrcom/oo#licence
*/
var ooreset=function(){var oo={version:"1.2",classes:[],classesmap:{},Class:function(className){if(oo.classesmap[className]){throw new oo.DuplicateClassNameException(className);return null}var klass=function(){if(!this.$initialiseBases){throw new oo.IncorrectSyntaxException(className);}this.$initialiseBases.apply(this);this.init.apply(this,arguments)};klass.prototype.init=function(){};klass.$bases={};klass.prototype.$initialiseBases=function(){for(var baseName in this.$class.$bases){var basePrototype=this.$class.$bases[baseName];for(var baseProperty in basePrototype.prototype){if(typeof basePrototype.prototype[baseProperty]=="function"){if(baseProperty.substr(0,1)!="$"){basePrototype.prototype[baseProperty]=basePrototype.prototype[baseProperty].bind(this)}}}}};var afterClassDefinedList=[];for(var i=1,l=arguments.length-1;i<l;i++){var item=arguments[i];if(item.$beforeInherited){item=item.$beforeInherited(klass,arguments)}if(!item)continue;if(item.$isClass){klass.$bases[item.$className]=item;ooextend(item.prototype,klass.prototype);klass.prototype[item.$className]=item.prototype}else if(typeof item=="object"){ooextend(item,klass.prototype)}if(item.$afterInherited){item.$afterInherited(klass,arguments)}if(item.$afterClassDefined){afterClassDefinedList.push(item.$afterClassDefined.bind(item,klass,arguments))}}if(arguments.length>1){var definition=arguments[arguments.length-1];for(var property in definition){var theProperty=definition[property];if(property.substr(0,1)==="$"){klass[property]=theProperty}else{klass.prototype[property]=theProperty}}}klass.toString=function(){return"<{ oo.Class: "+this.$className+" }>"};klass.$isClass=true;klass.prototype.constructor=klass.prototype.$class=klass;oo.classes[oo.classes.length]=klass.$className=className;oo.classesmap[className]=klass;if(afterClassDefinedList.length>0){for(var i in afterClassDefinedList){afterClassDefinedList[i]()}}return klass}};oo.Events={$afterClassDefined:function(klass){if(klass.prototype.events){for(var i in klass.prototype.events){var event=klass.prototype.events[i];klass.prototype[event]=(function(){var $event=event;return function(){if(arguments.length===1&&typeof arguments[0]=="function"){var args=[$event,arguments[0]];this.on.apply(this,args)}else{var args=[$event];ooextend(arguments,args);this.fire.apply(this,args)}return this}})()}}},on:function(event,callback){this.ooevents=this.ooevents||{};this.ooevents[event]=this.ooevents[event]||[];this.ooevents[event].push(callback);return this},fire:function(event){if(this.ooevents&&this.ooevents[event]){var args=[];for(var i=1;i<arguments.length;i++){args.push(arguments[i])}for(var i in this.ooevents[event]){var func=this.ooevents[event][i];func.apply(this,args)}}},removeCallback:function(event,callback){if(this.ooevents&&this.ooevents[event]){for(var i in this.ooevents[event]){var func=this.ooevents[event][i];if(func==callback){this.ooevents[event].splice(i,1);return true}}}return false},withEvent:function(event){var codeblock=arguments[arguments.length-1];if(typeof codeblock!=="function"){throw new oo.IncorrectArgumentsException("withEvent","The last argument must be the codeblock to execute.");}var args=[];for(var i=1;i<arguments.length-1;i++){args.push(arguments[i])}args.unshift("before:"+event);var result=this.fire.apply(this,args);if(typeof result==="boolean"&&result===false){return false}result=codeblock();args.push(result);args[0]=event;this.fire.apply(this,args);return result}};oo.Exception=oo.Class("oo.Exception",{init:function(message){this.message=message},toString:function(){return"oo.Exception: \" + message + \""}});oo.DuplicateClassNameException=oo.Class("oo.DuplicateClassNameException",oo.Exception,{init:function(className){this["oo.Exception"].init("Cannot define a class because '"+className+"' already exists, consider namespacing your class names; e.g. YourCompany."+className)}});oo.IncorrectSyntaxException=oo.Class("oo.IncorrectSyntaxException",oo.Exception,{init:function(className){this["oo.Exception"].init("Incorrect syntax when creating a new instance; don't just call the method, use the new keyword: var obj = new "+className+"();")}});oo.IncorrectArgumentsException=oo.Class("oo.IncorrectArgumentsException",oo.Exception,{init:function(methodName,message){this["oo.Exception"].init("Incorrect syntax when calling "+methodName+"; "+message)}});return oo};var ooextend=function(source,destination){if(typeof source.length!="undefined"&&typeof destination.length!="undefined"){for(var s in source){destination.push(source[s])}}else{for(var s in source){destination[s]=source[s]}}};var oo=ooreset();var oobind=function(){var _func=arguments[0]||null,_obj=arguments[1]||this,_args=[],i=2,l=arguments.length,bound;for(;i<l;i++){_args.push(arguments[i])}bound=function(){var theArgs=[];var i=0;for(i=0,l=_args.length;i<l;i++){theArgs.push(_args[i])}for(i=0,l=arguments.length;i<l;i++){theArgs.push(arguments[i])}return _func.apply(_obj,theArgs)};bound.func=_func;bound.context=_obj;bound.args=_args;return bound};Function.prototype.bind=function(){var theArgs=[],i=0,l=arguments.length;theArgs.push(this);for(;i<l;i++){theArgs.push(arguments[i])}return oobind.apply(window,theArgs)};

/*
  Security
  =====================================================================
*/

/** 
 * hashSHA1 hashes the specified value using the SHA1 algorithm.
 * Usually instead of calling this method directly, you should assign this to the
 * {@link Stretchr.hash} member, and call that instead.
 * @param {string} value - The value to hash.
 */
Stretchr.hashSHA1 = function(value){
  return CryptoJS.SHA1(value);
};

/**
 * hash is the function that the Stretchr JavaScript SDK will use to
 * hash strings.  Calling it will hash the specified value.
 * By default, it will be a pointer to the {@link Stretchr.hashSHA1} function.
 * @param {string} value - The value to hash.
 * @returns Returns the hashed version of the specified value.
 */
Stretchr.hash = Stretchr.hashSHA1;

/*
  Dependencies
  =====================================================================
*/

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License

© 2009–2013 by Jeff Mott. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions, and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions, and the following disclaimer in the documentation or other materials provided with the distribution.
Neither the name CryptoJS nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS," AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE
*/
var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
f)).finalize(b)}}});var s=p.algo={};return p}(Math);
(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();