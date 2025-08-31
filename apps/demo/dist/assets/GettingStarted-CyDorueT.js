import{u as n,j as e,L as l,r as o}from"./index-DzisDmv_.js";import{P as d}from"./prism-bash-DKOxzqVC.js";function a({language:t,children:r,title:s}){return o.useEffect(()=>{d.highlightAll()},[r]),e.jsxs("div",{className:"relative",children:[s&&e.jsx("div",{className:"bg-gray-800 px-4 py-3 text-sm text-gray-300 rounded-t-lg border-b border-gray-700",children:s}),e.jsx("pre",{className:`${s?"rounded-b-lg":"rounded-lg"} text-sm overflow-x-auto !bg-gray-900 !p-4`,children:e.jsx("code",{className:`language-${t}`,children:r.trim()})})]})}function x(){const t=n();return e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("h1",{className:"text-5xl font-bold mb-6",children:"Getting Started"}),e.jsx("p",{className:"text-xl text-gray-600 dark:text-gray-300",children:"Get up and running with YAML Routes in less than 5 minutes"})]}),e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[e.jsx("div",{className:"w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold",children:"1"}),e.jsx("h2",{className:"text-2xl font-bold",children:"Install the Package"})]}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"Add YAML Routes to your TanStack Router project:"}),e.jsx(a,{language:"bash",children:`npm install @yaml-routes/tanstack
# or
pnpm add @yaml-routes/tanstack
# or  
yarn add @yaml-routes/tanstack`})]}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[e.jsx("div",{className:"w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold",children:"2"}),e.jsx("h2",{className:"text-2xl font-bold",children:"Create routes.yml"})]}),e.jsxs("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:["Create a ",e.jsx("code",{className:"bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded",children:"routes.yml"})," file in your project root:"]}),e.jsx(a,{language:"yaml",title:"routes.yml",children:`# Basic routes
home:
    path: /
    component: pages/Home

about:
    path: /about
    component: pages/About

# Route with parameters
user_profile:
    path: /user/{id}
    component: pages/UserProfile
    parameters:
        id:
            type: string
            required: true`})]}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[e.jsx("div",{className:"w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold",children:"3"}),e.jsx("h2",{className:"text-2xl font-bold",children:"Generate Routes"})]}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"Run the CLI to generate your route cache:"}),e.jsx(a,{language:"bash",children:`# Generate once
npx yaml-routes

# Or watch for changes during development
npx yaml-routes --watch`})]}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-6",children:[e.jsx("div",{className:"w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold",children:"4"}),e.jsx("h2",{className:"text-2xl font-bold",children:"Use in Your Components"})]}),e.jsxs("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:["Import the generated ",e.jsx("code",{className:"bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded",children:"routeTo"})," function and use it in your React components:"]}),e.jsx(a,{language:"typescript",title:"App.tsx",children:`import { Link } from "@tanstack/react-router";
import { routeTo } from "./routeCache.generated";

function App() {
    return (
        <nav>
            <Link to={routeTo("home")}>Home</Link>
            <Link to={routeTo("about")}>About</Link>
            <Link to={routeTo("user_profile", { id: "alice" })}>
                Alice's Profile
            </Link>
        </nav>
    );
}`})]})]}),e.jsxs("div",{className:"mt-16 text-center",children:[e.jsx("h2",{className:"text-3xl font-bold mb-6",children:"What's Next?"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs(l,{to:t("advanced_examples"),className:"bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-colors shadow-lg",children:[e.jsx("h3",{className:"text-xl font-bold mb-2",children:"Advanced Examples"}),e.jsx("p",{className:"text-blue-100",children:"Explore internationalization, complex parameters, and advanced patterns"})]}),e.jsxs(l,{to:t("demo"),className:"border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-6 rounded-xl transition-colors",children:[e.jsx("h3",{className:"text-xl font-bold mb-2",children:"Live Demo"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"See all features in action with interactive examples"})]})]})]})]})}export{x as default};
