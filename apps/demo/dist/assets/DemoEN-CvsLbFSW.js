import{u as v,b as f,c as w,j as e,L as d,r as z}from"./index-Dp_niks-.js";import{c as N}from"./bundle-full-BkJ-rgzt.js";const k=`
.highlighted-line {
    position: relative;
    display: block;
    margin: 0 -1.5rem;
    padding: 0 1.5rem;
    line-height: inherit;
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
    border-left: 4px solid rgb(96, 165, 250);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
    animation: highlight-pulse 2s ease-in-out infinite;
}

/* Ensure consistent line spacing for all code elements */
pre code .line {
    display: block;
    line-height: 1.5;
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
`;function T({yamlContent:i,highlightedPaths:n=[]}){const[h,c]=z.useState("");return z.useEffect(()=>{(async()=>{const a=i.split(`
`),p=[];a.forEach((r,s)=>{n.some(t=>r.includes(t)||t.includes("{")&&r.includes(t.replace(/\{[^}]+\}/g,"{"))||t.includes(":")&&r.includes(t.split(":")[0])||r.trim().endsWith(":")&&t.startsWith(r.trim().slice(0,-1)))&&p.push(s+1)});const g=await N(i,{lang:"yaml",theme:"github-dark",transformers:[{pre(r){this.addClassToHast(r,"overflow-x-auto"),this.addClassToHast(r,"text-sm"),this.addClassToHast(r,"leading-relaxed"),this.addClassToHast(r,"!bg-transparent"),this.addClassToHast(r,"!p-6"),this.addClassToHast(r,"!m-0")},line(r,s){p.includes(s)&&this.addClassToHast(r,"highlighted-line")}}]});c(g)})()},[i,n]),e.jsxs("div",{className:"relative group",children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:k}}),e.jsxs("div",{className:"bg-gradient-to-r from-gray-800 to-gray-750 px-6 py-4 text-sm text-gray-300 rounded-t-xl border-b border-gray-700/50 flex items-center gap-3 shadow-lg",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-3 h-3 bg-red-500 rounded-full shadow-sm animate-pulse"}),e.jsx("span",{className:"w-3 h-3 bg-yellow-500 rounded-full shadow-sm"}),e.jsx("span",{className:"w-3 h-3 bg-green-500 rounded-full shadow-sm"})]}),e.jsx("span",{className:"ml-2 font-medium text-gray-200",children:"routes.yml - Live Demo"}),e.jsxs("div",{className:"ml-auto flex items-center gap-2",children:[e.jsx("span",{className:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),e.jsx("span",{className:"text-xs text-green-400 font-medium",children:"Live"})]})]}),e.jsxs("div",{className:"relative overflow-hidden",children:[e.jsx("div",{className:"!bg-gradient-to-br !from-gray-900 !to-gray-800 shadow-2xl border border-gray-700/50 rounded-b-xl relative overflow-x-auto group-hover:shadow-3xl transition-all duration-300",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:h}})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-b-xl"})]})]})}function P(){const i=v(),n=f(),h=w(),c={pizzas:{margherita:{name:"🍅 Classic Margherita",description:"Fresh basil, mozzarella, and tomato sauce on wood-fired crust",price:"$18",chef:"Mario",reviews:{"amazing-flavor":{author:"Sofia K.",rating:5,text:"The most authentic Italian taste in the city!",replies:{"chef-thanks":{author:"Chef Mario",text:"Grazie mille! Made with love 💚"},"agree-completely":{author:"Luigi M.",text:"Couldn't agree more! My favorite too 🍕"}}},"perfect-crust":{author:"James R.",rating:5,text:"The wood-fired crust is perfection!",replies:{"secret-technique":{author:"Chef Mario",text:"24-hour fermented dough is the secret! 👨‍🍳"}}}},toppings:{"san-marzano":{name:"🍅 San Marzano Tomatoes",origin:"Napoli, Italy"},"buffalo-mozzarella":{name:"🧀 Buffalo Mozzarella",origin:"Campania, Italy"},"fresh-basil":{name:"🌿 Fresh Basil",origin:"Local Garden"}}},"meat-lovers":{name:"🥩 Carnivore Supreme",description:"Pepperoni, sausage, bacon, and ham with extra mozzarella",price:"$24",chef:"Luigi",reviews:{"protein-paradise":{author:"Mike T.",rating:5,text:"Meat lover's dream come true!",replies:{"glad-you-enjoyed":{author:"Chef Luigi",text:"That's what we aim for! 🥩"}}}},toppings:{pepperoni:{name:"🍕 Spicy Pepperoni",origin:"House-made"},"italian-sausage":{name:"🌭 Italian Sausage",origin:"Traditional Recipe"},"crispy-bacon":{name:"🥓 Crispy Bacon",origin:"Locally Sourced"}}},"vegan-delight":{name:"🌱 Garden Paradise",description:"Cashew cheese, roasted vegetables, and herb oil on whole wheat crust",price:"$22",chef:"Sofia",reviews:{"surprisingly-good":{author:"Emma L.",rating:4,text:"I'm not vegan but this was incredible!",replies:{"plant-power":{author:"Chef Sofia",text:"Plants can be amazing! 🌱✨"}}}},toppings:{"cashew-cheese":{name:"🥜 Cashew Mozzarella",origin:"House-made"},"roasted-peppers":{name:"🫑 Roasted Bell Peppers",origin:"Local Farm"},"herb-oil":{name:"🌿 Herb-infused Oil",origin:"Sofia's Recipe"}}}}},a=(()=>{var m;const s=n.pathname.replace("/yaml-routes","").replace(`/${h}`,"").replace(/^\//,"").split("/").filter(Boolean);if(s.length===0)return{type:"home",params:{},simulatedPath:"/"};if(s[0]==="user"&&s.length>=2){const t=s[1],l={mario:"margherita",luigi:"meat-lovers",sofia:"vegan-delight"}[t]||"margherita",o=c.pizzas[l];if(s[2]==="images"&&s.length>=4){s[3];const u=Object.keys(o.reviews)[0],b=o.reviews[u],y=Object.keys(b.replies||{})[0];return{type:"pizza-review-reply",params:{pizzaType:l,reviewId:u,replyId:y},simulatedPath:`/pizza/${l}/reviews/${u}/replies/${y}`,data:{pizza:o,review:b,reply:(m=b.replies)==null?void 0:m[y]}}}return s[2]==="images"?{type:"pizza-reviews",params:{pizzaType:l},simulatedPath:`/pizza/${l}/reviews`,data:{pizza:o}}:{type:"pizza-details",params:{pizzaType:l},simulatedPath:`/pizza/${l}`,data:{pizza:o}}}return{type:"demo-home",params:{},simulatedPath:"/demo"}})(),p=`# 🍕 Mario's Legendary Pizza Palace - Routes Configuration
settings:
  i18n:
    enabled: true
    defaultLocale: en
    supportedLocales: [en, es, fr]
    forceLocaleUrl: true
  basePath: /yaml-routes
# 🏠 Main pages
demo:
  path:
    en: /demo
    es: /demo
    fr: /demo
  component:
    en: pages/DemoEN
    es: pages/DemoES
    fr: pages/DemoFR
# 🍕 Pizza menu and details
pizza_details:
  path: /pizza/{pizzaType}
  component: pages/PizzaDetails
  parameters:
    pizzaType:
      type: string
      required: true
      description: "Pizza type slug (margherita, meat-lovers, etc.)"
# ⭐ Pizza reviews section
pizza_reviews:
  path: /pizza/{pizzaType}/reviews
  component: pages/PizzaReviews
  parameters:
    pizzaType:
      type: string
      required: true
# 📝 Individual review with replies
pizza_review_details:
  path: /pizza/{pizzaType}/reviews/{reviewId}
  component: pages/PizzaReviewDetails
  parameters:
    pizzaType:
      type: string
      required: true
    reviewId:
      type: string
      required: true
# 💬 Deep nested: Reply to review
pizza_review_reply:
  path: /pizza/{pizzaType}/reviews/{reviewId}/replies/{replyId}
  component: pages/PizzaReviewReply
  parameters:
    pizzaType:
      type: string
      required: true
    reviewId:
      type: string
      required: true
    replyId:
      type: string
      required: true
# 🧀 Pizza toppings explorer
pizza_toppings:
  path: /pizza/{pizzaType}/toppings
  component: pages/PizzaToppings
  parameters:
    pizzaType:
      type: string
      required: true
# 📦 Order tracking system
order_tracking:
  path: /orders/{orderId}/tracking
  component: pages/OrderTracking
  parameters:
    orderId:
      type: string
      required: true
# 👨‍🍳 Chef profiles and specialties
chef_profile:
  path: /chef/{chefId}
  component: pages/ChefProfile
  parameters:
    chefId:
      type: string
      required: true
chef_specialty:
  path: /chef/{chefId}/specialties/{specialtyId}
  component: pages/ChefSpecialty
  parameters:
    chefId:
      type: string
      required: true
    specialtyId:
      type: string
      required: true`,g=()=>{switch(a.type){case"pizza-details":return["pizza_details:","/pizza/{pizzaType}",`pizzaType: ${a.params.pizzaType}`];case"pizza-reviews":return["pizza_reviews:","/pizza/{pizzaType}/reviews",`pizzaType: ${a.params.pizzaType}`];case"pizza-review-reply":return["pizza_review_reply:","/pizza/{pizzaType}/reviews/{reviewId}/replies/{replyId}",`pizzaType: ${a.params.pizzaType}`,`reviewId: ${a.params.reviewId}`,`replyId: ${a.params.replyId}`];default:return["demo:"]}};return e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("h1",{className:"text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-yellow-500 to-red-800 bg-clip-text text-transparent",children:"🍕 Mario's Pizza Palace Demo"}),e.jsx("p",{className:"text-xl text-gray-600 dark:text-gray-300 mb-6",children:"Interactive routing demonstration with deeply nested URLs"}),e.jsxs("div",{className:"inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium",children:[e.jsx("span",{className:"w-2 h-2 bg-red-500 rounded-full animate-pulse"}),"Live YAML highlighting • Real-time parameter extraction"]}),e.jsxs("div",{className:"mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700",children:[e.jsxs("p",{className:"text-sm text-blue-700 dark:text-blue-300",children:[e.jsx("strong",{children:"Simulated Routes:"})," This demo shows how pizza routes would look, but uses existing user routes for navigation."]}),e.jsxs("p",{className:"text-xs text-blue-600 dark:text-blue-400 mt-1",children:["Current URL: ",e.jsx("code",{className:"bg-blue-100 dark:bg-blue-800 px-1 rounded",children:a.simulatedPath})]})]})]}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg",children:[e.jsxs("h2",{className:"text-2xl font-bold mb-4 flex items-center gap-2",children:["📝 routes.yml Configuration",e.jsx("span",{className:"text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded",children:"Live"})]}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"The highlighted sections show the current active route and parameters"}),e.jsx(T,{yamlContent:p,highlightedPaths:g()})]}),e.jsxs("div",{className:"bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700",children:[e.jsx("h3",{className:"text-lg font-bold mb-3 text-blue-800 dark:text-blue-300",children:"🔍 Current Route Analysis"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Route Type:"}),e.jsx("code",{className:"bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded",children:a.type})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Simulated URL:"}),e.jsx("code",{className:"bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded",children:a.simulatedPath})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"font-medium",children:"Actual URL:"}),e.jsx("code",{className:"bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs",children:n.pathname})]}),Object.keys(a.params).length>0&&e.jsxs("div",{children:[e.jsx("span",{className:"font-medium",children:"Parameters:"}),e.jsx("div",{className:"mt-1 space-y-1",children:Object.entries(a.params).map(([r,s])=>e.jsxs("div",{className:"flex justify-between text-xs",children:[e.jsxs("span",{className:"text-gray-600 dark:text-gray-400",children:[r,":"]}),e.jsx("code",{className:"bg-blue-100 dark:bg-blue-800 px-1 rounded",children:String(s)})]},r))})]})]})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg",children:[e.jsxs("h2",{className:"text-2xl font-bold mb-6 flex items-center gap-2",children:["🎮 Interactive Demo",e.jsx("span",{className:"text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded",children:"Click to navigate"})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4 flex items-center gap-2",children:"🍕 Our Signature Pizzas"}),e.jsx("div",{className:"grid gap-4",children:Object.entries(c.pizzas).map(([r,s])=>{const t={margherita:"mario","meat-lovers":"luigi","vegan-delight":"sofia"}[r];return e.jsxs("div",{className:"border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",children:[e.jsxs("div",{className:"flex justify-between items-start mb-2",children:[e.jsx("h4",{className:"font-medium text-lg",children:s.name}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-lg font-bold text-green-600",children:s.price}),e.jsx(d,{to:i("user_profile",{id:t}),className:"text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium",children:"View Details →"})]})]}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 text-sm mb-3",children:s.description}),e.jsx("div",{className:"mb-3",children:e.jsxs("span",{className:"text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-2 py-1 rounded",children:["Chef: ",s.chef]})}),e.jsxs("div",{className:"flex flex-wrap gap-2 text-xs",children:[e.jsxs(d,{to:i("user_images",{id:t}),className:"bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50",children:["⭐ Reviews (",Object.keys(s.reviews).length,")"]}),Object.entries(s.reviews).slice(0,1).map(([x,l])=>e.jsxs(d,{to:i("user_image",{id:t,imageId:x}),className:"bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-900/50",children:['💬 "',l.text.slice(0,25),'..."']},x))]})]},r)})})]}),e.jsxs("section",{children:[e.jsx("h3",{className:"text-xl font-semibold mb-4 flex items-center gap-2",children:"🧭 Navigation Examples"}),e.jsxs("div",{className:"grid gap-3",children:[e.jsx(d,{to:i("user_profile",{id:"mario"}),className:"border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors block",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium",children:"🍅 Classic Margherita Details"}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Simulates: ",e.jsx("code",{children:"/pizza/margherita"})]})]}),e.jsx("span",{className:"text-blue-600 text-sm",children:"View →"})]})}),e.jsx(d,{to:i("user_images",{id:"luigi"}),className:"border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors block",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium",children:"🥩 Meat Lovers Reviews"}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Simulates: ",e.jsx("code",{children:"/pizza/meat-lovers/reviews"})]})]}),e.jsx("span",{className:"text-blue-600 text-sm",children:"Reviews →"})]})}),e.jsx(d,{to:i("user_image",{id:"sofia",imageId:"surprisingly-good"}),className:"border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors block",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium",children:"🌱 Vegan Pizza Review Reply"}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:["Simulates: ",e.jsx("code",{children:"/pizza/vegan-delight/reviews/surprisingly-good/replies/plant-power"})]})]}),e.jsx("span",{className:"text-blue-600 text-sm",children:"Deep nested →"})]})})]})]})]}),a.data&&e.jsxs("div",{className:"bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700",children:[e.jsx("h3",{className:"text-lg font-bold mb-3 text-orange-800 dark:text-orange-300",children:"📄 Current Page Content Preview"}),a.type==="pizza-details"&&a.data.pizza&&e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium text-lg mb-2",children:[a.data.pizza.name," - ",a.data.pizza.price]}),e.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-3",children:a.data.pizza.description}),e.jsxs("div",{className:"bg-white/50 dark:bg-gray-800/50 p-3 rounded mb-3",children:[e.jsx("p",{className:"text-sm font-medium mb-2",children:"Toppings:"}),e.jsx("div",{className:"grid grid-cols-1 gap-1 text-xs",children:Object.entries(a.data.pizza.toppings).map(([r,s])=>e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:s.name}),e.jsxs("span",{className:"text-gray-500",children:["(",s.origin,")"]})]},r))})]}),e.jsx("p",{className:"text-sm text-orange-700 dark:text-orange-300",children:"💡 This would be the PizzaDetails component showing pizza information, ingredients, and ordering options"})]}),a.type==="pizza-reviews"&&a.data.pizza&&e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium mb-2",children:[a.data.pizza.name," - Customer Reviews"]}),e.jsxs("div",{className:"bg-white/50 dark:bg-gray-800/50 p-3 rounded mb-3",children:[e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300 mb-2",children:"Recent Reviews:"}),e.jsx("div",{className:"space-y-2 text-xs",children:Object.entries(a.data.pizza.reviews).map(([r,s])=>e.jsxs("div",{className:"bg-blue-50 dark:bg-blue-900/50 p-2 rounded",children:[e.jsxs("div",{className:"flex justify-between mb-1",children:[e.jsx("span",{className:"font-medium",children:s.author}),e.jsx("span",{className:"text-yellow-500",children:"★".repeat(s.rating)})]}),e.jsxs("p",{className:"text-gray-600 dark:text-gray-300",children:['"',s.text,'"']})]},r))})]}),e.jsx("p",{className:"text-sm text-orange-700 dark:text-orange-300",children:"💡 This would be the PizzaReviews component displaying all customer reviews for this pizza"})]}),a.type==="pizza-review-reply"&&a.data.pizza&&a.data.review&&a.data.reply&&e.jsxs("div",{children:[e.jsxs("h4",{className:"font-medium text-lg mb-2",children:['Reply to "',a.data.review.text,'"']}),e.jsxs("div",{className:"bg-white/50 dark:bg-gray-800/50 p-3 rounded mb-3",children:[e.jsxs("div",{className:"mb-2",children:[e.jsxs("strong",{children:["Original Review by ",a.data.review.author,":"]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-300 mt-1",children:['"',a.data.review.text,'"']})]}),e.jsxs("div",{className:"border-l-4 border-blue-400 pl-3",children:[e.jsxs("strong",{children:["Reply by ",a.data.reply.author,":"]}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-300 mt-1",children:['"',a.data.reply.text,'"']})]})]}),e.jsx("p",{className:"text-sm text-orange-700 dark:text-orange-300",children:"💡 This would be the PizzaReviewReply component showing the detailed conversation thread"})]})]})]})]}),e.jsxs("div",{className:"mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white p-8",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("h2",{className:"text-3xl font-bold mb-4",children:"🚀 What This Demonstrates"}),e.jsx("p",{className:"text-xl text-blue-100",children:"See how YAML Routes handles complex, nested routing scenarios"})]}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"bg-white/10 backdrop-blur-sm rounded-xl p-6",children:[e.jsx("h3",{className:"text-xl font-bold mb-3 flex items-center gap-2",children:"🎯 Deep Nesting"}),e.jsxs("p",{className:"text-blue-100 mb-3",children:["Routes like"," ",e.jsxs("code",{className:"bg-white/20 px-1 rounded",children:["/pizza/","{type}","/reviews/","{id}","/replies/","{id}"]}),"show how YAML Routes handles complex URL structures."]}),e.jsxs("ul",{className:"text-sm text-blue-200 space-y-1",children:[e.jsx("li",{children:"• Multiple path parameters"}),e.jsx("li",{children:"• Nested resource relationships"}),e.jsx("li",{children:"• Type-safe parameter extraction"})]})]}),e.jsxs("div",{className:"bg-white/10 backdrop-blur-sm rounded-xl p-6",children:[e.jsx("h3",{className:"text-xl font-bold mb-3 flex items-center gap-2",children:"📱 Real-time Updates"}),e.jsx("p",{className:"text-blue-100 mb-3",children:"The YAML configuration updates in real-time as you navigate, highlighting the current route and parameters."}),e.jsxs("ul",{className:"text-sm text-blue-200 space-y-1",children:[e.jsx("li",{children:"• Live syntax highlighting"}),e.jsx("li",{children:"• Parameter value extraction"}),e.jsx("li",{children:"• Route pattern matching"})]})]}),e.jsxs("div",{className:"bg-white/10 backdrop-blur-sm rounded-xl p-6",children:[e.jsx("h3",{className:"text-xl font-bold mb-3 flex items-center gap-2",children:"🌍 i18n Ready"}),e.jsx("p",{className:"text-blue-100 mb-3",children:"Switch languages and see how the same route structure works across different locales seamlessly."}),e.jsxs("ul",{className:"text-sm text-blue-200 space-y-1",children:[e.jsx("li",{children:"• Locale-aware URLs"}),e.jsx("li",{children:"• Automatic route generation"}),e.jsx("li",{children:"• Consistent navigation"})]})]})]})]})]})}export{P as default};
