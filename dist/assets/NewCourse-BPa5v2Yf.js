import{f as _}from"./course-C6omip4F.js";import{i as u}from"./level-CmSkZBuv.js";import{V as p,r as v,b3 as h,q as c,t as n,v as s,C as f,y as C,aM as m,K as g,L as b,M as a,d as N,bf as k,X as w,Y as x}from"./index-BGBiAn3r.js";const l=o=>(w("data-v-2ba5bd75"),o=o(),x(),o),S={class:"new-course"},y={class:"container"},I={class:"top"},L=l(()=>s("div",{class:"title"},[s("div",{class:"hot"},"HOT")],-1)),V={class:"bottom"},B=["onClick"],q=["src"],D={class:"content"},M={class:"price"},T=l(()=>s("div",null,"会员专享",-1)),z={__name:"NewCourse",setup(o){const r=v([]);(async()=>{const t=await _({pageNum:1,pageSize:8});r.value=t.data.pageInfo.list})();const i=t=>{k.push({path:"/course/detail",query:{id:t}})};return(t,F)=>{const d=h("sapn");return c(),n("div",S,[s("div",y,[s("div",I,[L,f(d,{class:"txt"},{default:C(()=>[m(" 新上好课 ")]),_:1})]),s("div",V,[s("ul",null,[(c(!0),n(g,null,b(r.value,e=>(c(),n("li",{key:e.id,onClick:G=>i(e.id)},[s("img",{src:e.courseCover,alt:""},null,8,q),s("div",D,[s("h3",null,a(e.courseName),1),s("span",null,a(N(u)(e.courseLevel))+" ·"+a(e.clicks)+"人报名",1),s("div",M,[T,s("span",null,"￥"+a(e.discountPrice),1)])])],8,B))),128))])])])])}}},P=p(z,[["__scopeId","data-v-2ba5bd75"]]);export{P as default};
