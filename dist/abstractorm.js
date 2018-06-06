!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("abstractorm",[],t):"object"==typeof exports?exports.abstractorm=t():e.abstractorm=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);const n={adapter:"electronIPC"};var s=(e=n,t)=>{e.adapter&&t.setAdapter(e.adapter)};var o=function(){function e(e,t){return this.table=e,this.signal=t,this.pre_query="",this.query="",this.post_query="",this}return e.prototype.count=function(e){return null==e&&(e="id"),this.pre_query=`select count(${e}) from ${this.table} `,this},e.prototype.select=function(e){return null==e&&(e="*"),this.pre_query=`select ${e} from ${this.table} `,this},e.prototype.increment=function(e,t,r){return null==r&&(r=1),this.pre_query=`update ${this.table} set ${t} = ${t} + ${r} where id = ${e}`,this.exec()},e.prototype.decrement=function(e,t,r){return null==r&&(r=1),this.pre_query=`update ${this.table} set ${t} = ${t} - ${r} where id = ${e}`,this.exec()},e.prototype.where=function(e){return""===this.pre_query&&this.select(),this.query=`where ${this.processAttrs(e)}`,this},e.prototype.whereIn=function(e,t){return""===this.pre_query&&this.select(),this.query=`where ${e} IN (${t.join(",")})`,this},e.prototype.processAttrs=function(e){let t;return t=[],Object.keys(e).forEach(r=>{let n,s,o;if("function"==typeof(o=e[r])&&(s=o(),t.push(` ${r} ${o} `)),"string"==typeof o&&t.push(` ${r} = '${o}' `),"boolean"==typeof o&&(n=!0===o?1:0,t.push(` ${r} = ${n} `)),"number"==typeof o)return t.push(` ${r} = ${o} `)}),t.join(" and ")},e.prototype.get=function(e){return this.where({id:e}),this.exec()},e.prototype.create=function(e){return this.signal.createSQL(this.table,e)},e.prototype.update=function(e,t){return this.signal.updateSQL(this.table,e,t)},e.prototype.delete=function(e){return this.signal.deleteSQL(this.table,e)},e.prototype.delete_query=function(){return this.pre_query=`delete from ${this.table} `,this},e.prototype.findAll=function(){return this.pre_query=`select * from ${this.table} `,this.exec()},e.prototype.exec=function(){return this.sql=this.pre_query+this.query+this.post_query,this.signal.sql(this.sql)},e.prototype.toSQL=function(){return`${this.pre_query}${this.query}${this.post_query}`},e}();const i=r(1).ipcRenderer,u=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}),c=(e,t)=>new Promise(r=>{const n=u();i.send("insert_sql",e,t,n),i.once(`insert_sql${n}`,(e,t)=>r(t))}),a=(e,t,r)=>new Promise(n=>{const s=u();i.send("update_sql",e,t,r,s),i.once(`update_sql${s}`,(e,t)=>n(t))}),l=(e,t)=>new Promise(r=>{const n=u();i.send("delete_sql",e,t,n),i.once(`delete_sql${n}`,(e,t)=>r(t))}),p=e=>new Promise(t=>{const r=u();i.send("sql",e,r),i.once(`sql${r}`,(e,r)=>t(r))});var d=e=>{if(!i)throw new Error("Electron ipcRenderer is not defined.");return e.createSQL=c,e.updateSQL=a,e.deleteSQL=l,e.sql=p,e};const h=(e,t)=>x(`INSERT INTO ${e} VALUES (${t.join(",")});`),f=(e,t,r)=>x(`UPDATE ${e} SET ${(e=>{const t=[];return Object.keys(e).map(r=>{t.push(`${r} = ${e[r]}`)}),t.join(",")})(r)} WHERE id = ${t};`),y=(e,t)=>x(`DELETE FROM ${e} WHERE id = ${t};`),x=e=>new Promise((t,r)=>{if(window.openDatabase){window.openDatabase("test_db","","Web SQL Database",2e5),t(db.transaction(t=>{t.executeSql(e)}))}else r(new Error("WebSQL is not present"))});var $=e=>{if(!ipcRenderer)throw new Error("WebSQL is not present");return e.createSQL=h,e.updateSQL=f,e.deleteSQL=y,e.sql=x,e};const q=()=>console.log(args);var b=e=>{context.createSQL=q,context.updateSQL=q,context.deleteSQL=q,context.sql=q};const w="Adapter is not defined";var _=class{constructor(e){s(e,this),this.models=[]}loadModels(e){return this.models=e,this}loadTables(e){const t=this.models,r=this.adapter;if(!Array.isArray(e))throw new Error(`Tables argument should be array, example: ['notes','comments']. Given: ${e}`);return e.map(e=>{let n=new o(e,r);return t[e]=n,n}),this}loadSchema(e){}inject(e){return Object.assign(e,this.models),this}setAdapter(e){switch(e){case"electronIPC":d(this);break;case"websql":$(this);break;case"dummy":b(this);break;default:throw new Error(w)}return this}},m=function(e,t,r){e.on("sql",(e,n,s)=>{t.raw(n).then(t=>(e.sender.send(`sql${s}`,t),t)).catch(t=>{r.error(t),r.error(n),e.sender.send(`sql${s}`,[])})}),e.on("insert_sql",(e,n,s,o)=>{t(n).insert(s).then(t=>(e.sender.send(`insert_sql${o}`,t),t)).catch(t=>{r.error(t),e.sender.send(`insert_sql${o}`,[])})}),e.on("update_sql",(e,n,s,o,i)=>{t(n).where({id:s}).update(o).then(t=>(e.sender.send(`update_sql${i}`,t),t)).catch(t=>{r.error(t),e.sender.send(`update_sql${i}`,[])})}),e.on("delete_sql",(e,n,s,o)=>{t(n).where({id:s}).del().then(t=>(e.sender.send(`delete_sql${o}`,t),t)).catch(t=>{r.error(t),e.sender.send(`delete_sql${o}`,[])})})};r.d(t,"electronMainIPC",function(){return m});t.default=function(e){return new _(e)}},function(e,t){e.exports=require("electron")}])});
//# sourceMappingURL=abstractorm.js.map