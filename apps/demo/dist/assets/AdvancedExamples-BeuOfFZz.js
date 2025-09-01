import{j as e,r as i}from"./index-qzSskACg.js";function o({text:t,className:r=""}){const[a,l]=i.useState(!1),n=async()=>{await navigator.clipboard.writeText(t),l(!0),setTimeout(()=>l(!1),2e3)};return e.jsx("button",{onClick:n,className:`px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors ${r}`,title:"Copy to clipboard",children:a?"Copied!":"Copy"})}function s({language:t,children:r,title:a}){return e.jsxs("div",{className:"relative",children:[a&&e.jsx("div",{className:"bg-gray-800 px-4 py-2 text-sm text-gray-300 rounded-t-lg border-b border-gray-700",children:a}),e.jsxs("div",{className:"relative",children:[e.jsx("pre",{className:`bg-gray-900 p-4 ${a?"rounded-b-lg":"rounded-lg"} text-sm overflow-x-auto`,children:e.jsx("code",{className:`language-${t} text-gray-100`,children:r})}),e.jsx(o,{text:r.trim(),className:"absolute top-2 right-2"})]})]})}function c(){return e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx("h1",{className:"text-4xl font-bold mb-8",children:"Getting Started"}),e.jsxs("div",{className:"space-y-8",children:[e.jsxs("section",{children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"📦 Installation"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4 mb-4",children:[e.jsx(s,{language:"bash",title:"npm",children:"npm install @yaml-routes/tanstack"}),e.jsx(s,{language:"bash",title:"yarn",children:"yarn add @yaml-routes/tanstack"}),e.jsx(s,{language:"bash",title:"pnpm",children:"pnpm add @yaml-routes/tanstack"})]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"⚙️ Setup"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-3",children:"1. Create a routes.yml file"}),e.jsx(s,{language:"yaml",title:"routes.yml",children:`# routes.yml
settings:
    i18n:
        enabled: true
        defaultLocale: en
        supportedLocales: [en, es]

home:
    path: /
    component: pages/Home

about:
    path:
        en: /about
        es: /acerca-de
    component: pages/About`})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-3",children:"2. Add build script to package.json"}),e.jsx(s,{language:"json",title:"package.json",children:`{
  "scripts": {
    "build:routes": "yaml-routes",
    "dev": "yaml-routes --watch & vite dev"
  }
}`})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-3",children:"3. Generate routes"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsx(s,{language:"bash",title:"One-time generation",children:"npx yaml-routes"}),e.jsx(s,{language:"bash",title:"Watch mode (development)",children:"npx yaml-routes --watch"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-medium mb-3",children:"4. Use in your app"}),e.jsx(s,{language:"typescript",title:"App.tsx",children:`import { RouterProvider } from "@tanstack/react-router";
import { router, routeTo } from "./routeCache.generated";

function App() {
  return <RouterProvider router={router} />;
}

// Type-safe navigation
const aboutUrl = routeTo("about"); // Uses current locale
const homeUrl = routeTo("home");`})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"🚀 Key Features"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-gray-50 dark:bg-gray-800 p-6 rounded-lg",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"🔒 Type Safety"}),e.jsxs("p",{className:"text-gray-600 dark:text-gray-300 mb-3",children:["Generated TypeScript types ensure your routes are always valid. The"," ",e.jsx("code",{className:"bg-gray-200 dark:bg-gray-700 px-1 rounded",children:"routeTo"})," helper provides full IntelliSense support."]}),e.jsx(s,{language:"typescript",children:`// TypeScript enforces parameters
routeTo("user", { id: "123" }); // ✅
routeTo("user"); // ❌ Missing required param`})]}),e.jsxs("div",{className:"bg-gray-50 dark:bg-gray-800 p-6 rounded-lg",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"🌐 Internationalization"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-3",children:"Built-in i18n support with localized paths and components. Automatically handles locale prefixes and routing."}),e.jsx(s,{language:"typescript",children:`// Same function, different locales
routeTo("about"); // EN: /about
routeTo("about"); // ES: /es/acerca-de`})]}),e.jsxs("div",{className:"bg-gray-50 dark:bg-gray-800 p-6 rounded-lg",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"⚡ Performance"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-3",children:"Generate routes at build time for zero-runtime overhead. Only the routes you define are included in the bundle."}),e.jsx(s,{language:"bash",children:`# Build-time generation
npx yaml-routes
# ✅ Generated: routeCache.generated.tsx`})]}),e.jsxs("div",{className:"bg-gray-50 dark:bg-gray-800 p-6 rounded-lg",children:[e.jsx("h3",{className:"font-semibold mb-2",children:"🛠 Developer Experience"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-3",children:"Clean YAML syntax, watch mode for development, and comprehensive error messages when something goes wrong."}),e.jsx(s,{language:"yaml",children:`# Clean, readable syntax
user_profile:
    path: /user/{id}
    component: pages/UserProfile`})]})]})]}),e.jsxs("section",{className:"bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-4",children:"🎯 Why YAML Routes?"}),e.jsxs("ul",{className:"space-y-2 text-gray-700 dark:text-gray-300",children:[e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"Declarative:"})," Define routes in a single, readable file"]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"Type-safe:"})," Generated TypeScript types catch errors at build time"]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"i18n-first:"})," Built-in support for multiple languages and locales"]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"Framework-agnostic:"})," Currently supports TanStack Router, more coming soon"]}),e.jsxs("li",{children:["✅ ",e.jsx("strong",{children:"Zero-runtime:"})," All route generation happens at build time"]})]})]})]})]})}export{c as default};
