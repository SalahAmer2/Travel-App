if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const t={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return t;default:return e(r)}})).then(e=>{const r=n(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-ec4d79a7"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"./index.html",revision:"7e47d761e578aaaa03a3641f464ccef6"},{url:"img/david-marcu-78A265wPiO4-unsplash.jpg",revision:"2f7dd0b0a4d8cb366fa3383e1a43e131"},{url:"main.css",revision:"6dbae7b7bd75f0ac78d65287582bc248"},{url:"main.js",revision:"26eaf783e0104db87211c85b63b242b9"}],{})}));
//# sourceMappingURL=service-worker.js.map
