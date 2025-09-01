import{c as m,j as e,b as h,r as x,L as u}from"./index-CO-_ZL5r.js";import{c as b}from"./bundle-full-DahQOjOw.js";function N({domain:r,path:n="",title:s="Demo Site",theme:a="light",children:t}){const o=m(),l=r||(o==="es"?"pizzalandia.demo":"pizza-corner.demo"),c=a==="dark"?"bg-gray-900 text-gray-100":"bg-white text-gray-900";return e.jsxs("div",{className:"bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden",children:[e.jsxs("div",{className:"bg-gray-700 px-4 py-3 flex items-center gap-3 border-b border-gray-600",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-3 h-3 bg-red-500 rounded-full"}),e.jsx("span",{className:"w-3 h-3 bg-yellow-500 rounded-full"}),e.jsx("span",{className:"w-3 h-3 bg-green-500 rounded-full"})]}),e.jsxs("div",{className:"flex-1 bg-gray-600 rounded px-3 py-1 text-sm text-gray-300 flex items-center gap-2",children:[e.jsx("span",{className:"text-gray-400",children:"🔒"}),e.jsxs("span",{className:"font-mono text-xs",children:[l,n]})]}),e.jsx("button",{className:"text-gray-400 hover:text-white text-sm",children:"⟳"})]}),e.jsx("div",{className:`min-h-[600px] ${c}`,children:t})]})}function v({routeName:r,component:n,params:s={},urlPattern:a}){const t=m(),o=h();return e.jsxs("div",{className:"bg-blue-900/20 rounded-xl p-6 border border-blue-700",children:[e.jsx("h3",{className:"text-lg font-bold mb-3 text-blue-300",children:"🔗 Current Route Information"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium text-gray-300",children:"Route Name:"}),e.jsx("code",{className:"bg-blue-800 px-2 py-1 rounded text-blue-300",children:r})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium text-gray-300",children:"Component:"}),e.jsx("code",{className:"bg-blue-800 px-2 py-1 rounded text-blue-300",children:n})]}),Object.entries(s).map(([l,d])=>e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("span",{className:"font-medium text-gray-300 capitalize",children:[l,":"]}),e.jsx("code",{className:"bg-blue-800 px-2 py-1 rounded text-blue-300",children:d})]},l)),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium text-gray-300",children:"Locale:"}),e.jsx("code",{className:"bg-blue-800 px-2 py-1 rounded text-blue-300",children:t})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium text-gray-300",children:"Current URL:"}),e.jsx("code",{className:"bg-gray-800 px-2 py-1 rounded text-xs text-gray-400",children:o.pathname})]}),a&&e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium text-gray-300",children:"URL Pattern:"}),e.jsx("code",{className:"bg-gray-800 px-2 py-1 rounded text-xs text-gray-400",children:a})]})]})]})}const f=`
.highlighted {
    background-color: rgba(59, 130, 246, 0.15);
    border-left: 4px solid rgb(96, 165, 250);
    padding-left: calc(1.5rem - 4px);
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    padding-right: 1.5rem;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
    animation: highlight-pulse 2s ease-in-out infinite;
}

@keyframes highlight-pulse {
    0%, 100% { 
        background: linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
    }
    50% { 
        background: linear-gradient(90deg, rgba(59, 130, 246, 0.25), rgba(147, 51, 234, 0.25));
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
    }
}
`;function w({highlightedPaths:r=[],title:n="routes.yml - Live Demo",yamlContent:s=y}){const[a,t]=x.useState("");return x.useEffect(()=>{(async()=>{const d=s.split(`
`).findIndex(i=>i.trim()==="pizza:"),c=r.map(i=>i===0?d+1:d+1+i),p=await b(s,{lang:"yaml",theme:"github-dark",transformers:[{pre(i){i.properties.style="background-color: transparent; padding: 1.5rem; margin: 0; font-size: 0.875rem; line-height: 1.6; overflow-x: auto;"},line(i,g){c.includes(g)&&this.addClassToHast(i,"highlighted")}}]});t(p)})()},[s,r]),e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700",children:[e.jsxs("h2",{className:"text-2xl font-bold mb-4 flex items-center gap-2 text-white",children:["📝 routes.yml",e.jsx("span",{className:"text-sm bg-blue-900 text-blue-300 px-2 py-1 rounded",children:"Live"})]}),e.jsx("p",{className:"text-gray-300 mb-4",children:"The highlighted sections show the current active route and parameters"}),e.jsxs("div",{className:"relative group",children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:f}}),e.jsxs("div",{className:"bg-gradient-to-r from-gray-800 to-gray-750 px-6 py-4 text-sm text-gray-300 rounded-t-xl border-b border-gray-700/50 flex items-center gap-3 shadow-lg",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-3 h-3 bg-red-500 rounded-full shadow-sm animate-pulse"}),e.jsx("span",{className:"w-3 h-3 bg-yellow-500 rounded-full shadow-sm"}),e.jsx("span",{className:"w-3 h-3 bg-green-500 rounded-full shadow-sm"})]}),e.jsx("span",{className:"ml-2 font-medium text-gray-200",children:n}),e.jsxs("div",{className:"ml-auto flex items-center gap-2",children:[e.jsx("span",{className:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),e.jsx("span",{className:"text-xs text-green-400 font-medium",children:"Live"})]})]}),e.jsxs("div",{className:"relative overflow-hidden",children:[e.jsx("div",{className:"!bg-gradient-to-br !from-gray-900 !to-gray-800 shadow-2xl border border-gray-700/50 rounded-b-xl relative overflow-x-auto group-hover:shadow-3xl transition-all duration-300",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a}})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-b-xl"})]})]})]})})}const y=`# 🍕 Mario's Legendary Pizza Palace - Routes Configuration
settings:
  i18n:
    enabled: true
    defaultLocale: en
    supportedLocales: [en, es, fr]
    forceLocaleUrl: true
  basePath: /yaml-routes

# 🍕 Pizza menu and details
pizza:
  path:
    en: /demo/pizza-corner/{pizzaType}
    es: /demo/pizzalandia/{pizzaType}
  component: pages/demo/Pizza
  parameters:
    pizzaType:
      required: true

pizza_review_list:
  path:
    en: /demo/pizza-corner/{pizzaType}/reviews
    es: /demo/pizzalandia/{pizzaType}/recomendaciones
  component: pages/demo/PizzaReviewList
  parameters:
    pizzaType:
      required: true

pizza_review:
  path:
    en: /demo/pizza-corner/{pizzaType}/reviews/{reviewId}
    es: /demo/pizza-corner/{pizzaType}/recomendaciones/{reviewId}
  component:
    en: pages/demo/PizzaReview
    es: pages/demo/Recomendacion
  parameters:
    pizzaType:
      required: true
    reviewId:
      required: true

pizza_review_comments:
  path:
    en: /demo/pizza-corner/{pizzaType}/reviews/{reviewId}/comment/{commentId}
    es: /demo/pizzalandia/{pizzaType}/recomendaciones/{reviewId}/commentario/{commentId}
  component: pages/demo/PizzaReviewComment
  parameters:
    pizzaType:
      required: true
    reviewId:
      required: true
    commentId:
      required: true`;function L(r,n={},s="en"){switch(r){case"pizza":const a=[0];return s==="en"?a.push(2):s==="es"&&a.push(3),a.push(4),a;default:return[0]}}function T({breadcrumbs:r=[],children:n}){const s=m();return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"bg-red-700 text-white px-6 py-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("h1",{className:"text-2xl font-bold flex items-center gap-2",children:["🍕 ",s==="es"?"Pizzalandia":"Pizza Corner"]}),e.jsxs("div",{className:"flex items-center gap-4 text-sm",children:[e.jsx("span",{children:s==="es"?"Inicio":s==="fr"?"Accueil":"Home"}),e.jsx("span",{className:"font-semibold border-b-2 border-white",children:s==="es"?"Menú":"Menu"}),e.jsx("span",{children:s==="es"?"Contacto":"Contact"})]})]})}),r.length>0&&e.jsx("div",{className:"bg-gray-800 px-6 py-3 text-sm flex items-center gap-2 border-b border-gray-700",children:r.map((a,t)=>e.jsxs("div",{className:"flex items-center gap-2",children:[a.to?e.jsx(u,{to:a.to,className:"text-blue-400 hover:underline",children:a.label}):e.jsx("span",{className:t===r.length-1?"text-gray-400":"text-gray-300 font-medium",children:a.label}),t<r.length-1&&e.jsx("span",{className:"text-gray-500",children:"›"})]},t))}),e.jsx("div",{className:"p-6",children:e.jsx("div",{className:"max-w-4xl mx-auto",children:n})})]})}export{N as B,T as P,v as R,w as Y,L as g};
