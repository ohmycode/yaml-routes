import{u as p,j as e,L as u,r as d}from"./index-64ObfeVp.js";import{c as h}from"./bundle-full-CjUPkvFE.js";function b({text:t,className:r=""}){const[a,s]=d.useState(!1),o=async()=>{await navigator.clipboard.writeText(t),s(!0),setTimeout(()=>s(!1),2e3)};return e.jsxs("button",{onClick:o,className:`group relative px-4 py-2 text-xs bg-gray-800/90 hover:bg-gray-700/90 text-gray-300 hover:text-white rounded-lg transition-all duration-200 font-medium backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50 shadow-lg hover:shadow-xl transform hover:scale-105 ${r}`,title:"Copy to clipboard",children:[e.jsx("div",{className:"flex items-center gap-2",children:a?e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-3.5 h-3.5 text-green-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),e.jsx("span",{className:"text-green-400",children:"Copied!"})]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})}),"Copy"]})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-sm"})]})}function f(){const t=[{label:"npm",command:"npm install @yaml-routes/tanstack",icon:"📦"},{label:"pnpm",command:"pnpm add @yaml-routes/tanstack",icon:"🚀"},{label:"yarn",command:"yarn add @yaml-routes/tanstack",icon:"🧶"}],[r,a]=d.useState(0),[s,o]=d.useState(!1),[c,i]=d.useState(!1),g=async()=>{try{await navigator.clipboard.writeText(t[r].command),i(!0),setTimeout(()=>i(!1),2e3)}catch(n){console.error("Failed to copy text: ",n);const l=document.createElement("textarea");l.value=t[r].command,document.body.appendChild(l),l.select(),document.execCommand("copy"),document.body.removeChild(l),i(!0),setTimeout(()=>i(!1),2e3)}};return e.jsxs("div",{className:"relative max-w-4xl mx-auto group",onMouseEnter:()=>o(!0),onMouseLeave:()=>o(!1),children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl transform transition-all duration-700 group-hover:scale-105 opacity-70"}),e.jsxs("div",{className:"relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50 transform transition-all duration-500 hover:shadow-blue-500/10 hover:shadow-3xl",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:`text-3xl transition-transform duration-300 ${s?"animate-pulse scale-110":""}`,children:"⚡"}),e.jsx("div",{className:"absolute inset-0 bg-yellow-400/30 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-2xl font-bold text-white mb-1",children:"Quick Install"}),e.jsx("p",{className:"text-gray-400 text-sm",children:"Get started in seconds"})]})]}),e.jsx("div",{className:"flex bg-gray-800/80 backdrop-blur-sm rounded-xl p-1.5 border border-gray-600/30",children:t.map((n,l)=>e.jsxs("button",{onClick:()=>{a(l),i(!1)},className:`relative px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 ${r===l?"bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105":"text-gray-300 hover:text-white hover:bg-gray-700/50 hover:scale-105"}`,children:[e.jsx("span",{className:"text-base",children:n.icon}),n.label,r===l&&e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-lg blur-sm"})]},n.label))})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"bg-gray-800/80 px-6 py-3 rounded-t-xl border-b border-gray-700/50 flex items-center gap-2",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"}),e.jsx("div",{className:"w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"}),e.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"})]}),e.jsx("span",{className:"text-gray-400 text-sm font-mono ml-3",children:"Terminal"})]}),e.jsxs("div",{className:"relative bg-black/80 backdrop-blur-sm rounded-b-xl border border-gray-800/50",children:[e.jsx("pre",{className:"p-6 text-green-400 font-mono text-lg leading-relaxed overflow-x-auto",children:e.jsxs("code",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-blue-400 select-none",children:"$"}),e.jsx("span",{className:`transition-all duration-500 ${s?"text-green-300":"text-green-400"}`,children:t[r].command})]})}),e.jsx("button",{onClick:g,disabled:c,className:`absolute top-4 right-4 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm backdrop-blur-sm border flex items-center gap-2 hover:scale-105 ${c?"bg-green-600/80 text-white border-green-500/50 shadow-green-500/30":"bg-gray-700/80 hover:bg-gray-600 text-gray-300 hover:text-white border-gray-600/30 hover:border-gray-500/50"}`,title:"Copy to clipboard",children:c?e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"Copied!"]}):e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})}),"Copy"]})})]})]})]})]})}function m({language:t,children:r,title:a,className:s=""}){const[o,c]=d.useState("");return d.useEffect(()=>{(async()=>{const g=await h(r.trim(),{lang:t,theme:"github-dark",transformers:[{pre(n){n.properties.style="background-color: #0d1117; padding: 1.5rem; margin: 0; font-size: 0.875rem; line-height: 1.6; overflow-x: auto;"}}]});c(g)})()},[r,t]),e.jsxs("div",{className:`relative group ${s}`,children:[a&&e.jsxs("div",{className:"bg-gray-800/90 backdrop-blur-sm px-5 py-3 text-sm text-gray-300 rounded-t-xl border-b border-gray-600/50 flex items-center gap-3 shadow-lg",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsx("span",{className:"w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"}),e.jsx("span",{className:"w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"}),e.jsx("span",{className:"w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"})]}),e.jsx("span",{className:"font-medium text-gray-200",children:a})]}),e.jsxs("div",{className:"relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 opacity-95"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),e.jsx("div",{className:`relative ${a?"rounded-b-xl":"rounded-xl"} border border-gray-700/50 group-hover:border-gray-600/50 transition-colors duration-300 shadow-xl`,dangerouslySetInnerHTML:{__html:o}}),e.jsx("div",{className:"absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0",children:e.jsx(b,{text:r.trim(),className:"bg-gray-700/80 hover:bg-gray-600/90 backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"})})]})]})}function x({icon:t,title:r,description:a,codeExample:s,language:o="typescript"}){return e.jsxs("div",{className:"group relative bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:"text-4xl block transform group-hover:scale-110 transition-transform duration-300",children:t}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"})]}),e.jsx("h3",{className:"text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent",children:r})]}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg",children:a}),e.jsx(m,{language:o,children:s})]})]})}function j(){const t=p();return e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-20 py-16",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h1",{className:"text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight",children:"YAML Routes"}),e.jsx("div",{className:"h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"})]}),e.jsxs("p",{className:"text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed font-light",children:["The most ",e.jsx("strong",{className:"font-bold text-blue-600",children:"intuitive way"})," to define multi language routes for TanStack Router"]}),e.jsx("p",{className:"text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto",children:"Write routes in YAML • Get TypeScript types • Ship with confidence"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center mb-16",children:[e.jsx(u,{to:t("getting_started"),className:"bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1",children:"Get Started →"}),e.jsx(u,{to:t("demo"),className:"border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg",children:"Live Demo"})]}),e.jsx(f,{})]}),e.jsxs("div",{className:"mb-20",children:[e.jsxs("h2",{className:"text-4xl font-bold text-center mb-12",children:["Everything you need for ",e.jsx("span",{className:"text-blue-600",children:"modern routing"})]}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-8 mb-12",children:[e.jsx(x,{icon:"📝",title:"YAML Configuration",description:"Clean, readable route definitions that are easy to understand and maintain. No more cluttered JavaScript config files.",language:"yaml",codeExample:`# Clean, readable routing
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
    component: pages/About`}),e.jsx(x,{icon:"🔒",title:"Type Safety",description:"Generated TypeScript types catch errors before they reach production. Full autocomplete and IntelliSense support.",codeExample:`import { routeTo } from "./routeCache.generated";

// ✅ Type-safe navigation with autocomplete
const profileUrl = routeTo("user_profile", { 
  id: "alice" // ✅ Required parameter
});

// ❌ TypeScript error if missing required params
const badUrl = routeTo("user_profile"); 
//                    ^^^^^^^^^^^^^^^^
// Error: Argument of type '{}' is not assignable...

<Link to={profileUrl}>View Profile</Link>`}),e.jsx(x,{icon:"🌐",title:"Internationalization (i18n)",description:"Built-in support for multi-language routing with localized paths and components. No external i18n library needed.",language:"yaml",codeExample:`# Multi-language routes
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
        fr: pages/AboutFR`}),e.jsx(x,{icon:"⚡",title:"Development Experience",description:"Watch mode for instant route generation, comprehensive error messages, and seamless integration with TanStack Router.",language:"bash",codeExample:`# Generate routes once
$ npx yaml-routes

# Watch for changes during development  
$ npx yaml-routes --watch

# Integrate with your build process
$ npm run build:routes && vite build

✅ Generated 5 base routes with 15 localized variants
🎉 Route generation completed!`})]})]}),e.jsxs("div",{className:"relative bg-gradient-to-br from-gray-50 via-blue-50/50 to-purple-50/50 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-900/80 p-8 md:p-12 rounded-3xl mb-20 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-2xl overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-50"}),e.jsx("div",{className:"absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -translate-x-36 -translate-y-36"}),e.jsx("div",{className:"absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl translate-x-36 translate-y-36"}),e.jsxs("div",{className:"relative",children:[e.jsx("h2",{className:"text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent",children:"See the complete workflow"}),e.jsx("p",{className:"text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto font-medium",children:"From YAML configuration to type-safe React components in seconds"}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-8",children:[e.jsx("div",{className:"lg:col-span-1",children:e.jsx(m,{language:"yaml",title:"routes.yml",className:"h-full",children:`settings:
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
    component: pages/About`})}),e.jsxs("div",{className:"lg:col-span-2 space-y-6",children:[e.jsx(m,{language:"bash",title:"Terminal",children:`$ npx yaml-routes --watch
👀 Watching for changes...
📁 Config file: routes.yml
🔄 Press Ctrl+C to stop watching

🔧 Loading routing configuration...
🚀 Generating TanStack Router code-based routes cache...
🌐 i18n enabled, default locale: en, supported: [en, es]
✅ Generated code-based route cache: src/routeCache.generated.tsx
📊 Generated 4 base routes with 6 localized variants
🎉 Route generation completed!`}),e.jsx(m,{language:"typescript",title:"App.tsx",children:`import { routeTo } from "./routeCache.generated";

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
}`})]})]})]})]}),e.jsxs("div",{className:"text-center mb-20",children:[e.jsx("h2",{className:"text-4xl font-bold mb-6",children:"Ready in under a minute"}),e.jsx("p",{className:"text-xl text-gray-600 dark:text-gray-300 mb-12",children:"Three simple steps to get started"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-8 max-w-5xl mx-auto",children:[e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform",children:[e.jsx("div",{className:"w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold",children:"1"}),e.jsx("h3",{className:"text-xl font-bold mb-3",children:"Install Package"}),e.jsx("p",{className:"text-blue-100",children:"Add to your TanStack Router project with your favorite package manager"})]}),e.jsx("div",{className:"hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-gray-300",children:"→"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform",children:[e.jsx("div",{className:"w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold",children:"2"}),e.jsx("h3",{className:"text-xl font-bold mb-3",children:"Create routes.yml"}),e.jsx("p",{className:"text-purple-100",children:"Define your routes in clean, readable YAML format"})]}),e.jsx("div",{className:"hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-gray-300",children:"→"})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform",children:[e.jsx("div",{className:"w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold",children:"3"}),e.jsx("h3",{className:"text-xl font-bold mb-3",children:"Generate Routes"}),e.jsx("p",{className:"text-green-100",children:"Run the CLI to generate type-safe route helpers"})]})]})]}),e.jsxs("div",{className:"text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white mb-20",children:[e.jsx("h2",{className:"text-4xl font-bold mb-6",children:"Ready to revolutionize your routing?"}),e.jsx("p",{className:"text-xl mb-8 text-blue-100 max-w-2xl mx-auto",children:"Join developers who've already simplified their routing with YAML Routes"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsx(u,{to:t("getting_started"),className:"bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl",children:"Start Building →"}),e.jsx(u,{to:t("advanced_examples"),className:"border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all",children:"Advanced Examples"})]})]}),e.jsxs("div",{className:"text-center py-8 border-t border-gray-200 dark:border-gray-700",children:[e.jsxs("p",{className:"text-gray-600 dark:text-gray-400 mb-2",children:["Currently supports ",e.jsx("strong",{children:"TanStack Router"})]}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-500",children:"React Router v7 support coming soon • Built with ❤️ for modern web development"})]})]})}export{j as default};
