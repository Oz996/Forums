(()=>{var e={};e.id=11,e.ids=[11],e.modules={5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},2351:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>x,originalPathname:()=>c,pages:()=>p,routeModule:()=>m,tree:()=>d});var s=t(3137),i=t(4647),a=t(4183),n=t.n(a),o=t(1775),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(r,l);let u=s.AppPageRouteModule,d=["",{children:["register",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,4399)),"C:\\Users\\Ozgun\\Desktop\\Forums\\client\\app\\register\\page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,6598)),"C:\\Users\\Ozgun\\Desktop\\Forums\\client\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,1918,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],p=["C:\\Users\\Ozgun\\Desktop\\Forums\\client\\app\\register\\page.tsx"],c="/register/page",x={require:t,loadChunk:()=>Promise.resolve()},m=new u({definition:{kind:i.x.APP_PAGE,page:"/register/page",pathname:"/register",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2650:(e,r,t)=>{Promise.resolve().then(t.bind(t,5723))},5723:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var s=t(80),i=t(5368),a=t(8172),n=t(1440),o=t.n(n),l=t(6558),u=t(1500),d=t(3258),p=t(7114),c=t(6737),x=t(9885),m=t(4751),g=t(12);let __WEBPACK_DEFAULT_EXPORT__=()=>{let[e,r]=(0,x.useState)(!1),{isAuthenticated:t}=(0,c.a)(),n=(0,p.useRouter)();(0,x.useEffect)(()=>{t&&n.push("/")},[t,n]);let{register:_,handleSubmit:h,formState:{errors:f}}=(0,l.cI)({userName:"",email:"",password:"",image:null}),registerMutation=async e=>{r(!0);let t=await d.Z.post("https://forums-api.onrender.com/users/register",e);return t.data},q=(0,g.D)(registerMutation,{onSuccess:e=>{r(!1),n.push("/login"),m.Am.success("Signed up")},onError:e=>{r(!1),console.error(e)}});return(0,s.jsxs)("div",{className:"mx-auto max-w-[30rem] mt-10 rounded-xl border shadow-lg p-10 flex flex-col gap-10",children:[s.jsx("h1",{className:"text-center font-semibold text-xl",children:"Register"}),(0,s.jsxs)("form",{className:"flex flex-col gap-5",onSubmit:h(e=>{q.mutate(e)}),children:[s.jsx(i.Y,{..._("userName",{required:"This field is required"}),type:"text",label:"Username"}),s.jsx(u.B,{errors:f,name:"userName",render:({message:e})=>s.jsx("p",{className:"text-red-500 text-sm font-semibold",children:e})}),s.jsx(i.Y,{..._("email",{required:"This field is required"}),type:"email",label:"Email"}),s.jsx(u.B,{errors:f,name:"email",render:({message:e})=>s.jsx("p",{className:"text-red-500 text-sm font-semibold",children:e})}),s.jsx(i.Y,{..._("password",{required:"This field is required"}),type:"password",label:"Password"}),s.jsx(u.B,{errors:f,name:"password",render:({message:e})=>s.jsx("p",{className:"text-red-500 text-sm font-semibold",children:e})}),s.jsx(i.Y,{..._("Cpassword",{required:"This field is required"}),type:"password",label:"Confirm Password"}),s.jsx(u.B,{errors:f,name:"Cpassword",render:({message:e})=>s.jsx("p",{className:"text-red-500 text-sm font-semibold",children:e})}),s.jsx(i.Y,{..._("image"),type:"text",label:"Image (optional)"}),s.jsx(a.A,{isLoading:e,type:"submit",className:"w-full",color:"secondary",children:"Sign up"})]}),(0,s.jsxs)("p",{className:"text-sm text-center",children:["Already a member?"," ",s.jsx(o(),{className:"underline text-blue-600",href:"/login",children:"Sign in"})," ","here"]})]})}},4399:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>Register});var s=t(8144),i=t(7536);let a=(0,i.createProxy)(String.raw`C:\Users\Ozgun\Desktop\Forums\client\components\RegisterForm.tsx`),{__esModule:n,$$typeof:o}=a,l=a.default;function Register(){return s.jsx("section",{className:"w-full h-[100vh] pt-24 ",children:s.jsx(l,{})})}t(3830)},7481:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var s=t(6885);let __WEBPACK_DEFAULT_EXPORT__=e=>{let r=(0,s.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:r+""}]}}};var r=require("../../webpack-runtime.js");r.C(e);var __webpack_exec__=e=>r(r.s=e),t=r.X(0,[449,885,77,824,466,779],()=>__webpack_exec__(2351));module.exports=t})();