import{_ as l,B as i,r as _,o as n,c as h,a as e,b as r,t as p,d as T,T as f,u as g,s as B,n as d,e as u,f as $,K as k,w as S,g as v,F as A,p as w,h as y}from"./index-23a2ea04.js";const x={name:"Count",components:{Button:i},data(){return{count:1}},methods:{increase(){this.count=this.count+1},decrease(){this.count=this.count-1}}},D={class:"count"},I={class:"count-button"};function L(t,o,m,C,c,a){const s=_("Button");return n(),h("div",D,[e("div",I,[r(s,{label:"+",click:a.increase},null,8,["click"]),r(s,{label:"-",click:a.decrease},null,8,["click"])]),e("p",null,"Count: "+p(c.count),1)])}var N=l(x,[["render",L]]);const V=T({name:"Dashboard",components:{Todo:f,Count:N,Button:i},setup(){const t=g(),{themeSelected:o}=B(t);return{themeSelected:o}},data(){return{currentTab:"Todo",todoLoaded:0}},computed:{isCountActive(){return this.currentTab==="Count"?this.getClassActive():""},isTodoActive(){return this.currentTab==="Todo"?this.getClassActive():""}},mounted(){this.eventBus.on("todoListTotal",({todoListTotal:t})=>{this.todoLoaded=t})},methods:{switchTo(t){this.currentTab=t},getClassActive(){const{themeSelected:t}=this;return["bg-"+t.backgroundColor,"text-"+t.textColor,"hover:bg"+t.textColor+"-700"]}}}),F=t=>(w("data-v-886bd768"),t=t(),y(),t),K={class:"dashboard-tabs",role:"tablist"},z={class:"dashboard-pages"},E=v(" Total "),R=F(()=>e("br",null,null,-1));function j(t,o,m,C,c,a){const s=_("Button");return n(),h(A,null,[e("ul",K,[e("li",null,[e("a",{href:"#Todo",class:d([t.isTodoActive]),onClick:o[0]||(o[0]=b=>t.switchTo("Todo"))}," Todo ",2)]),e("li",null,[e("a",{href:"#Count",class:d([t.isCountActive]),onClick:o[1]||(o[1]=b=>t.switchTo("Count"))}," Count ",2)])]),e("div",z,[(n(),u(k,null,[(n(),u($(t.currentTab)))],1024)),r(s,{class:"total-todo"},{default:S(()=>[E,R,v(" "+p(t.todoLoaded),1)]),_:1})])],64)}var G=l(V,[["render",j],["__scopeId","data-v-886bd768"]]);export{G as default};
