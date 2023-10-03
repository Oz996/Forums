exports.id=779,exports.ids=[779],exports.modules={6094:(e,t,r)=>{Promise.resolve().then(r.bind(r,8693))},1959:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,9918,23)),Promise.resolve().then(r.t.bind(r,2057,23)),Promise.resolve().then(r.t.bind(r,6148,23)),Promise.resolve().then(r.t.bind(r,8359,23)),Promise.resolve().then(r.t.bind(r,1860,23)),Promise.resolve().then(r.t.bind(r,2427,23))},8693:(e,t,r)=>{"use strict";r.r(t),r.d(t,{Providers:()=>Providers});var s=r(80),l=r(4256),o=r(5167),n=r(212),i=r(5570),a=r(6248),c=r(1440),d=r.n(c),u=r(9885),h=r(7625),x=r(3500),m=r(7541),p=r(9186),g=r(5497),j=r(6737),v=r(4751),f=r(1072);let components_Header=()=>{let[e,t]=(0,u.useState)(!1),{isAuthenticated:r,handleLogout:l}=(0,j.a)();if((0,u.useEffect)(()=>{t(!0)},[]),!e)return null;let{theme:o,setTheme:n}=(0,f.F)();return(0,s.jsxs)(m.R,{className:`w-full h-[3rem] bg-purple-600 absolute top-0 left-0 items-center text-white duration-200 ${"dark"===o&&"bg-purple-950"}`,children:[s.jsx(p.H,{children:s.jsx(d(),{className:"uppercase text-3xl font-semibold",href:"/",children:"posts"})}),s.jsx(g.k,{children:(0,s.jsxs)(d(),{className:"flex items-center gap-1",href:"/create",children:[s.jsx(h.E49,{size:20}),"New Post"]})}),s.jsx(g.k,{children:r?s.jsx("span",{className:"cursor-pointer",onClick:()=>{l(),v.Am.success("Signed out")},children:"Logout"}):s.jsx(d(),{href:"/login",children:"Login"})}),s.jsx("div",{className:"cursor-pointer",children:"light"===o?s.jsx(x.Mei,{className:"text-white",size:21,onClick:()=>n("dark")}):s.jsx(x.TLr,{size:21,onClick:()=>n("light")})})]})};r(5996);let P=new o.S;function Providers({children:e}){return(0,s.jsxs)(s.Fragment,{children:[s.jsx(a.H,{children:(0,s.jsxs)(n.aH,{client:P,children:[s.jsx(l.w,{children:(0,s.jsxs)(f.f,{attribute:"class",defaultTheme:"light",children:[s.jsx(components_Header,{}),e]})}),s.jsx(i.t,{})]})}),s.jsx(v.Ix,{position:"top-center",autoClose:1500,hideProgressBar:!0})]})}},6248:(e,t,r)=>{"use strict";r.d(t,{H:()=>AuthContextProvider,V:()=>o});var s=r(80),l=r(9885);let o=(0,l.createContext)(null),AuthContextProvider=({children:e})=>{let[t,r]=(0,l.useState)(!1),[n,i]=(0,l.useState)(null);return(0,l.useEffect)(()=>{let e=localStorage.getItem("token"),t=localStorage.getItem("email");r(!!e),i(t)},[t]),(0,l.useEffect)(()=>{console.log(n)},[n]),s.jsx(o.Provider,{value:{isAuthenticated:t,userEmail:n,handleLogin:(e,t)=>{console.log("email:",e),r(!0),localStorage.setItem("token",t),localStorage.setItem("email",e),i(e)},handleLogout:()=>{r(!1),localStorage.removeItem("token"),localStorage.removeItem("email"),i(null)}},children:e})}},6737:(e,t,r)=>{"use strict";r.d(t,{a:()=>useAuth});var s=r(6248),l=r(9885);let useAuth=()=>{let e=(0,l.useContext)(s.V);if(!e)throw Error("Failed to use AuthContext");return e}},6598:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>RootLayout,metadata:()=>u});var s=r(8144),l=r(7366),o=r.n(l);r(7272);var n=r(7536);let i=(0,n.createProxy)(String.raw`C:\Users\Ozgun\Desktop\Forums\client\app\providers.tsx`),{__esModule:a,$$typeof:c}=i;i.default;let d=i.Providers,u={title:"Create Next App",description:"Generated by create next app"};function RootLayout({children:e}){return s.jsx("html",{lang:"en",className:"",children:s.jsx("body",{className:o().className,children:s.jsx(d,{children:e})})})}},7272:()=>{}};