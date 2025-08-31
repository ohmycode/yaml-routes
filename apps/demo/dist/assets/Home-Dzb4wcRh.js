import{u as y,j as e,L as p,r as g}from"./index-DzisDmv_.js";import{P as v}from"./prism-bash-DKOxzqVC.js";(function(t){var l=t.util.clone(t.languages.javascript),i=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,d=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,c=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function u(a,r){return a=a.replace(/<S>/g,function(){return i}).replace(/<BRACES>/g,function(){return d}).replace(/<SPREAD>/g,function(){return c}),RegExp(a,r)}c=u(c).source,t.languages.jsx=t.languages.extend("markup",l),t.languages.jsx.tag.pattern=u(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),t.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,t.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,t.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,t.languages.jsx.tag.inside.comment=l.comment,t.languages.insertBefore("inside","attr-name",{spread:{pattern:u(/<SPREAD>/.source),inside:t.languages.jsx}},t.languages.jsx.tag),t.languages.insertBefore("inside","special-attr",{script:{pattern:u(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:t.languages.jsx}}},t.languages.jsx.tag);var o=function(a){return a?typeof a=="string"?a:typeof a.content=="string"?a.content:a.content.map(o).join(""):""},m=function(a){for(var r=[],n=0;n<a.length;n++){var s=a[n],f=!1;if(typeof s!="string"&&(s.type==="tag"&&s.content[0]&&s.content[0].type==="tag"?s.content[0].content[0].content==="</"?r.length>0&&r[r.length-1].tagName===o(s.content[0].content[1])&&r.pop():s.content[s.content.length-1].content==="/>"||r.push({tagName:o(s.content[0].content[1]),openedBraces:0}):r.length>0&&s.type==="punctuation"&&s.content==="{"?r[r.length-1].openedBraces++:r.length>0&&r[r.length-1].openedBraces>0&&s.type==="punctuation"&&s.content==="}"?r[r.length-1].openedBraces--:f=!0),(f||typeof s=="string")&&r.length>0&&r[r.length-1].openedBraces===0){var x=o(s);n<a.length-1&&(typeof a[n+1]=="string"||a[n+1].type==="plain-text")&&(x+=o(a[n+1]),a.splice(n+1,1)),n>0&&(typeof a[n-1]=="string"||a[n-1].type==="plain-text")&&(x=o(a[n-1])+x,a.splice(n-1,1),n--),a[n]=new t.Token("plain-text",x,null,x)}s.content&&typeof s.content!="string"&&m(s.content)}};t.hooks.add("after-tokenize",function(a){a.language!=="jsx"&&a.language!=="tsx"||m(a.tokens)})})(Prism);function j({text:t,className:l=""}){const[i,d]=g.useState(!1),c=async()=>{await navigator.clipboard.writeText(t),d(!0),setTimeout(()=>d(!1),2e3)};return e.jsx("button",{onClick:c,className:`px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors font-medium ${l}`,title:"Copy to clipboard",children:i?"✓ Copied!":"Copy"})}function N(){const t=[{label:"npm",command:"npm install @yaml-routes/tanstack",icon:"📦"},{label:"pnpm",command:"pnpm add @yaml-routes/tanstack",icon:"🚀"},{label:"yarn",command:"yarn add @yaml-routes/tanstack",icon:"🧶"}],[l,i]=g.useState(0),[d,c]=g.useState(!1),[u,o]=g.useState(!1),m=async()=>{try{await navigator.clipboard.writeText(t[l].command),o(!0),setTimeout(()=>o(!1),2e3)}catch(a){console.error("Failed to copy text: ",a);const r=document.createElement("textarea");r.value=t[l].command,document.body.appendChild(r),r.select(),document.execCommand("copy"),document.body.removeChild(r),o(!0),setTimeout(()=>o(!1),2e3)}};return e.jsxs("div",{className:"relative max-w-4xl mx-auto group",onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl transform transition-all duration-700 group-hover:scale-105 opacity-70"}),e.jsxs("div",{className:"relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50 transform transition-all duration-500 hover:shadow-blue-500/10 hover:shadow-3xl",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:`text-3xl transition-transform duration-300 ${d?"animate-pulse scale-110":""}`,children:"⚡"}),e.jsx("div",{className:"absolute inset-0 bg-yellow-400/30 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-2xl font-bold text-white mb-1",children:"Quick Install"}),e.jsx("p",{className:"text-gray-400 text-sm",children:"Get started in seconds"})]})]}),e.jsx("div",{className:"flex bg-gray-800/80 backdrop-blur-sm rounded-xl p-1.5 border border-gray-600/30",children:t.map((a,r)=>e.jsxs("button",{onClick:()=>{i(r),o(!1)},className:`relative px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${l===r?"bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105":"text-gray-300 hover:text-white hover:bg-gray-700/50 hover:scale-105"}`,children:[e.jsx("span",{className:"text-base",children:a.icon}),a.label,l===r&&e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-lg blur-sm"})]},a.label))})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"bg-gray-800/80 px-6 py-3 rounded-t-xl border-b border-gray-700/50 flex items-center gap-2",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"}),e.jsx("div",{className:"w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"}),e.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"})]}),e.jsx("span",{className:"text-gray-400 text-sm font-mono ml-3",children:"Terminal"})]}),e.jsxs("div",{className:"relative bg-black/80 backdrop-blur-sm rounded-b-xl border border-gray-800/50",children:[e.jsx("pre",{className:"p-6 text-green-400 font-mono text-lg leading-relaxed overflow-x-auto",children:e.jsxs("code",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-blue-400 select-none",children:"$"}),e.jsx("span",{className:`transition-all duration-500 ${d?"text-green-300":"text-green-400"}`,children:t[l].command})]})}),e.jsx("button",{onClick:m,disabled:u,className:`absolute top-4 right-4 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm backdrop-blur-sm border flex items-center gap-2 hover:scale-105 ${u?"bg-green-600/80 text-white border-green-500/50 shadow-green-500/30":"bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600/30 hover:border-gray-500/50"}`,title:"Copy to clipboard",children:u?e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})}),"Copy"]})})]})]})]})]})}function b({language:t,children:l,title:i,className:d=""}){return g.useEffect(()=>{v.highlightAll()},[l]),e.jsxs("div",{className:`relative ${d}`,children:[i&&e.jsxs("div",{className:"bg-gray-800 px-4 py-3 text-sm text-gray-300 rounded-t-lg border-b border-gray-700 flex items-center gap-2",children:[e.jsx("span",{className:"w-3 h-3 bg-red-500 rounded-full"}),e.jsx("span",{className:"w-3 h-3 bg-yellow-500 rounded-full"}),e.jsx("span",{className:"w-3 h-3 bg-green-500 rounded-full"}),e.jsx("span",{className:"ml-3 font-medium",children:i})]}),e.jsxs("div",{className:"relative",children:[e.jsx("pre",{className:`${i?"rounded-b-lg":"rounded-lg"} text-sm overflow-x-auto !bg-gray-900 !p-4`,children:e.jsx("code",{className:`language-${t}`,children:l.trim()})}),e.jsx(j,{text:l.trim(),className:"absolute top-3 right-3"})]})]})}function h({icon:t,title:l,description:i,codeExample:d,language:c="typescript"}){return e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("span",{className:"text-3xl",children:t}),e.jsx("h3",{className:"text-xl font-bold",children:l})]}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4 leading-relaxed",children:i}),e.jsx(b,{language:c,children:d})]})}function S(){const t=y();return e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-20 py-16",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h1",{className:"text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight",children:"YAML Routes"}),e.jsx("div",{className:"h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"})]}),e.jsxs("p",{className:"text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed font-light",children:["The most ",e.jsx("strong",{className:"font-bold text-blue-600",children:"intuitive way"})," to define multi language routes for TanStack Router"]}),e.jsx("p",{className:"text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto",children:"Write routes in YAML • Get TypeScript types • Ship with confidence"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center mb-16",children:[e.jsx(p,{to:t("getting_started"),className:"bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1",children:"Get Started →"}),e.jsx(p,{to:t("demo"),className:"border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg",children:"Live Demo"})]}),e.jsx(N,{})]}),e.jsxs("div",{className:"mb-20",children:[e.jsxs("h2",{className:"text-4xl font-bold text-center mb-12",children:["Everything you need for ",e.jsx("span",{className:"text-blue-600",children:"modern routing"})]}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-8 mb-12",children:[e.jsx(h,{icon:"📝",title:"YAML Configuration",description:"Clean, readable route definitions that are easy to understand and maintain. No more cluttered JavaScript config files.",language:"yaml",codeExample:`# Clean, readable routing
user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true

# Internationalized routes
about:
    path:
        en: /about
        es: /acerca-de
    component: pages/About`}),e.jsx(h,{icon:"🔒",title:"Type Safety",description:"Generated TypeScript types catch errors before they reach production. Full autocomplete and IntelliSense support.",codeExample:`import { routeTo } from "./routeCache.generated";

// ✅ Type-safe navigation with autocomplete
const profileUrl = routeTo("user_profile", { 
  id: "alice" // ✅ Required parameter
});

// ❌ TypeScript error if missing required params
const badUrl = routeTo("user_profile"); 
//                    ^^^^^^^^^^^^^^^^
// Error: Argument of type '{}' is not assignable...

<Link to={profileUrl}>View Profile</Link>`}),e.jsx(h,{icon:"🌐",title:"Internationalization (i18n)",description:"Built-in support for multi-language routing with localized paths and components. No external i18n library needed.",language:"yaml",codeExample:`# Multi-language routes
settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, es, fr]

about:
    path:
        en: /about
        es: /acerca-de
        fr: /a-propos
    component:
        en: pages/AboutEN
        es: pages/AboutES
        fr: pages/AboutFR`}),e.jsx(h,{icon:"⚡",title:"Development Experience",description:"Watch mode for instant route generation, comprehensive error messages, and seamless integration with TanStack Router.",language:"bash",codeExample:`# Generate routes once
$ npx yaml-routes

# Watch for changes during development  
$ npx yaml-routes --watch

# Integrate with your build process
$ npm run build:routes && vite build

✅ Generated 5 base routes with 15 localized variants
🎉 Route generation completed!`})]})]}),e.jsxs("div",{className:"bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 rounded-2xl mb-20 border border-gray-200 dark:border-gray-700",children:[e.jsx("h2",{className:"text-4xl font-bold text-center mb-8",children:"See the complete workflow"}),e.jsx("p",{className:"text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto",children:"From YAML configuration to type-safe React components in seconds"}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-8",children:[e.jsx("div",{className:"lg:col-span-1",children:e.jsx(b,{language:"yaml",title:"routes.yml",className:"h-full",children:`settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, es]

home:
    path: /
    component: pages/Home

user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true

about:
    path:
        en: /about
        es: /acerca-de
    component: pages/About`})}),e.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[e.jsx(b,{language:"bash",title:"Terminal",children:`$ npx yaml-routes --watch
👀 Watching for changes...
📁 Config file: routes.yml
🔄 Press Ctrl+C to stop watching

🔧 Loading routing configuration...
🚀 Generating TanStack Router code-based routes cache...
🌐 i18n enabled, default locale: en, supported: [en, es]
✅ Generated code-based route cache: src/routeCache.generated.tsx
📊 Generated 4 base routes with 6 localized variants
🎉 Route generation completed!`}),e.jsx(b,{language:"typescript",title:"App.tsx",children:`import { routeTo } from "./routeCache.generated";

export function UserCard({ userId }: { userId: string }) {
    // ✅ Type-safe routing with autocomplete
    const profileUrl = routeTo("user_profile", { id: userId });
    
    return (
        <div className="user-card">
            <h3>User Profile</h3>
            <Link to={profileUrl} className="btn-primary">
                View Profile
            </Link>
            {/* Automatic i18n: /user/123 or /usuario/123 */}
        </div>
    );
}`})]})]})]}),e.jsxs("div",{className:"text-center mb-20",children:[e.jsx("h2",{className:"text-4xl font-bold mb-6",children:"Ready in under a minute"}),e.jsx("p",{className:"text-xl text-gray-600 dark:text-gray-300 mb-12",children:"Three simple steps to get started"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-8 max-w-5xl mx-auto",children:[e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform",children:[e.jsx("div",{className:"w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold",children:"1"}),e.jsx("h3",{className:"text-xl font-bold mb-3",children:"Install Package"}),e.jsx("p",{className:"text-blue-100",children:"Add to your TanStack Router project with your favorite package manager"})]}),e.jsx("div",{className:"hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-gray-300",children:"→"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform",children:[e.jsx("div",{className:"w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold",children:"2"}),e.jsx("h3",{className:"text-xl font-bold mb-3",children:"Create routes.yml"}),e.jsx("p",{className:"text-purple-100",children:"Define your routes in clean, readable YAML format"})]}),e.jsx("div",{className:"hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-gray-300",children:"→"})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform",children:[e.jsx("div",{className:"w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold",children:"3"}),e.jsx("h3",{className:"text-xl font-bold mb-3",children:"Generate Routes"}),e.jsx("p",{className:"text-green-100",children:"Run the CLI to generate type-safe route helpers"})]})]})]}),e.jsxs("div",{className:"text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white mb-20",children:[e.jsx("h2",{className:"text-4xl font-bold mb-6",children:"Ready to revolutionize your routing?"}),e.jsx("p",{className:"text-xl mb-8 text-blue-100 max-w-2xl mx-auto",children:"Join developers who've already simplified their routing with YAML Routes"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsx(p,{to:t("getting_started"),className:"bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl",children:"Start Building →"}),e.jsx(p,{to:t("advanced_examples"),className:"border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all",children:"Advanced Examples"})]})]}),e.jsxs("div",{className:"text-center py-8 border-t border-gray-200 dark:border-gray-700",children:[e.jsxs("p",{className:"text-gray-600 dark:text-gray-400 mb-2",children:["Currently supports ",e.jsx("strong",{children:"TanStack Router"})]}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-500",children:"React Router v7 support coming soon • Built with ❤️ for modern web development"})]})]})}export{S as default};
