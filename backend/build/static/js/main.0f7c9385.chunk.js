(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{40:function(e,t,a){},80:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),r=a(24),c=a.n(r),o=a(17),i=a(6),l=a(9),j=a(19),d=a(42),u=a(43),b=a(2),p="LOGIN_SUCCESS",m="LOGIN_FAIL",h="SIGNUP_SUCCESS",O="SIGNUP_FAIL",x="ACTIVATION_SUCCESS",f="ACTIVATION_FAIL",g="USER_LOADED_SUCCESS",v="USER_LOADED_FAIL",y="AUTHENTICATED_SUCCESS",S="AUTHENTICATED_FAIL",w="PASSWORD_RESET_FAIL",N="PASSWORD_RESET_SUCCESS",C="PASSWORD_RESET_CONFIRM_FAIL",_="PASSWORD_RESET_CONFIRM_SUCCESS",A="LOGOUT",E="DELETE_USER_SUCCESS",I="DELETE_USER_FAIL",k="SCRAPE_SUCCESS",L="SCRAPE_FAIL",T="DATA_UPLOAD_SUCCESS",G="DATA_UPLOAD_FAIL",P={access:localStorage.getItem("access"),refresh:localStorage.getItem("refresh"),isAuthenticated:null,user:null,username:"",email:"",password:"",re_password:"",number:"",gender:"",dob:""},q={query:""},D=Object(j.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0,a=t.type,s=t.payload;switch(a){case y:return Object(b.a)(Object(b.a)({},e),{},{isAuthenticated:!0});case p:return localStorage.setItem("access",s.access),localStorage.setItem("refresh",s.refresh),Object(b.a)(Object(b.a)({},e),{},{isAuthenticated:!0,access:s.access,refresh:s.refresh});case h:case S:case E:return Object(b.a)(Object(b.a)({},e),{},{isAuthenticated:!1});case g:return Object(b.a)(Object(b.a)({},e),{},{username:s.username,email:s.email,password:s.password,number:s.number,gender:s.gender,dob:s.dob});case v:return Object(b.a)(Object(b.a)({},e),{},{username:"",email:"",password:"",number:"",gender:"",dob:""});case m:case O:case A:return localStorage.removeItem("access"),localStorage.removeItem("refresh"),Object(b.a)(Object(b.a)({},e),{},{access:null,refresh:null,isAuthenticated:!1,user:null,username:"",email:"",password:"",number:"",gender:"",dob:""});case N:case w:case _:case C:case x:case f:case I:return Object(b.a)({},e);default:return e}},scrape:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0,a=t.type,s=t.payload;switch(a){case k:return Object(b.a)(Object(b.a)({},e),{},{query:s.query});case L:return Object(b.a)(Object(b.a)({},e),{},{query:""});case T:return Object(b.a)(Object(b.a)({},e),{},{file:s.file,option:s.option});case G:return Object(b.a)(Object(b.a)({},e),{},{file:"",option:""});default:return e}}}),R=[u.a],U=Object(j.createStore)(D,{},Object(d.composeWithDevTools)(j.applyMiddleware.apply(void 0,R))),F=a(10),J=a(7),M=a(8),W=a.n(M),B=a(15),z=a(16),H=a.n(z),K=function(){return function(){var e=Object(B.a)(W.a.mark((function e(t){var a,s;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return a={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},e.prev=2,e.next=5,H.a.get("/accounts/users/me/",a);case 5:s=e.sent,console.log("loading",s.data),t({type:g,payload:s.data}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),t({type:v,payload:e.t0.response&&e.t0.response.data.detail?e.t0.response.data.detail:e.t0.message});case 13:e.next=16;break;case 15:t({type:v});case 16:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()},V=a(87),Z=a(88),Q=a(47),$=a(89),X=a(90),Y=a.p+"static/media/login.855b842f.svg",ee=(a(80),a(0)),te=Object(l.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{signup:function(e,t,a,s,n,r,c){return function(){var o=Object(B.a)(W.a.mark((function o(i){var l,j,d;return W.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return l={headers:{"Content-Type":"application/json"}},j=JSON.stringify({username:e,email:t,password:a,re_password:s,number:n,gender:r,dob:c}),o.prev=2,o.next=5,H.a.post("/accounts/users/",j,l);case 5:d=o.sent,console.log(d.data),i({type:h,payload:d.data}),o.next=13;break;case 10:o.prev=10,o.t0=o.catch(2),i({type:O,payload:o.t0.response&&o.t0.response.data.detail?o.t0.response.data.detail:o.t0.message});case 13:case"end":return o.stop()}}),o,null,[[2,10]])})));return function(e){return o.apply(this,arguments)}}()}})((function(e){var t,a=e.signup,n=e.isAuthenticated,r=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,c=Object(s.useState)(!1),o=Object(J.a)(c,2),l=o[0],j=o[1],d=Object(s.useState)({username:"",email:"",password:"",re_password:"",number:"",gender:"",dob:""}),u=Object(J.a)(d,2),p=u[0],m=u[1],h=Object(s.useState)({}),O=Object(J.a)(h,2),x=O[0],f=O[1];console.log(x);var g=p.username,v=p.email,y=p.password,S=p.re_password,w=p.number,N=p.gender,C=p.dob,_=function(e){return m(Object(b.a)(Object(b.a)({},p),{},Object(F.a)({},e.target.name,e.target.value)))};return n?Object(ee.jsx)(i.a,{to:"/dashboard"}):l?Object(ee.jsx)(i.a,{to:"/login"}):Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsx)(V.a,{className:"mt-1",children:Object(ee.jsxs)(Z.a,{children:[Object(ee.jsx)(Q.a,{lg:6,md:7,sm:12,children:Object(ee.jsx)("img",{className:"w-100",src:Y,alt:""})}),Object(ee.jsxs)(Q.a,{lg:6,md:6,sm:12,className:"mt-1 p-0",children:[Object(ee.jsx)("h1",{className:"title",children:"SSK Enterprise"}),Object(ee.jsxs)($.a,{onSubmit:function(e){e.preventDefault(),""===g&&f({username:"Username is Required"}),v.trim()||(f({email:"Email is Required"}),r.test(v)||f({email:"Invalid Email"})),y.trim()||(f({password:"Password is Required"}),y!==S&&f({password:"Password does not match"})),S.trim()||f({re_password:"Password Confirmation is Required"}),w.trim()||f({number:"Number is Required"}),C.trim()?(a(g,v,y,S,w,N,C),j(!0)):f({dob:"Date of Birth is Required"})},children:[Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupText",children:[Object(ee.jsx)($.a.Label,{children:"Username"}),Object(ee.jsx)($.a.Control,{name:"username",className:"input ".concat(x.username&&"errorShow"),type:"text",placeholder:"Enter username",value:g||"",onChange:function(e){return _(e)},required:!0}),x.username&&Object(ee.jsx)("p",{className:"errorShow",children:x.username})]}),Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupEmail",children:[Object(ee.jsx)($.a.Label,{children:"Email address"}),Object(ee.jsx)($.a.Control,{name:"email",type:"email",placeholder:"Enter email",value:v||"",onChange:function(e){return _(e)},required:!0})]}),Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupPassword",children:[Object(ee.jsx)($.a.Label,{children:"Password"}),Object(ee.jsx)($.a.Control,{name:"password",type:"password",placeholder:"Enter Password",minLength:"8",maxLength:"14",value:y||"",onChange:function(e){return _(e)},required:!0})]}),Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupConfirmPassword",children:[Object(ee.jsx)($.a.Label,{children:"Confirm Password"}),Object(ee.jsx)($.a.Control,{name:"re_password",type:"password",placeholder:"Enter Confirm Password",value:S||"",onChange:function(e){return _(e)},required:!0}),x.password&&Object(ee.jsx)("p",{style:{fontWeight:"bold",color:"red"},className:"errorShow",children:x.password})]}),Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupNumber",children:[Object(ee.jsx)($.a.Label,{children:"Mobile Number"}),Object(ee.jsx)($.a.Control,(t={name:"number",type:"text",placeholder:"Enter Mobile Number",minLength:"11"},Object(F.a)(t,"minLength","11"),Object(F.a)(t,"value",w||""),Object(F.a)(t,"onChange",(function(e){return _(e)})),Object(F.a)(t,"required",!0),t))]}),Object(ee.jsxs)(Z.a,{children:[Object(ee.jsx)(Q.a,{children:Object(ee.jsxs)($.a.Group,{controlId:"formBasicSelectGender",children:[Object(ee.jsx)($.a.Label,{children:"Select Gender"}),Object(ee.jsxs)($.a.Control,{name:"gender",as:"select",value:N||"",onChange:function(e){return _(e)},children:[Object(ee.jsx)("option",{value:"Gender",children:"Select..."}),Object(ee.jsx)("option",{value:"Male",children:"Male"}),Object(ee.jsx)("option",{value:"Feale",children:"Female"}),Object(ee.jsx)("option",{value:"Other",children:"Other"})]})]})}),Object(ee.jsx)(Q.a,{children:Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupDate",children:[Object(ee.jsx)($.a.Label,{children:"Date of Birth"}),Object(ee.jsx)($.a.Control,{name:"dob",type:"date",placeholder:"Enter Date of Birth",value:C||"",onChange:function(e){return _(e)},required:!0})]})})]}),Object(ee.jsx)("div",{className:"d-flex justify-content-center",children:Object(ee.jsx)(X.a,{as:"input",type:"submit",value:"Signup",className:"submit"})}),Object(ee.jsx)("div",{className:"createAccount",children:Object(ee.jsxs)("span",{children:["Already Have an Account",Object(ee.jsx)("a",{href:"/login",children:"Login"})]})}),Object(ee.jsx)("div",{className:"back",children:Object(ee.jsx)("a",{href:"/",children:"Back To Site"})})]})]})]})})})})),ae=Object(l.b)(null,{verify:function(e,t){return function(){var a=Object(B.a)(W.a.mark((function a(s){var n,r;return W.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},r=JSON.stringify({uid:e,token:t}),a.prev=2,a.next=5,H.a.post("/accounts/users/activation/",r,n);case 5:s({type:x}),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(2),s({type:f,payload:a.t0.response&&a.t0.response.data.detail?a.t0.response.data.detail:a.t0.message});case 11:case"end":return a.stop()}}),a,null,[[2,8]])})));return function(e){return a.apply(this,arguments)}}()}})((function(e){var t=e.verify,a=e.match,n=Object(s.useState)(!1),r=Object(J.a)(n,2),c=r[0],o=r[1];return c?Object(ee.jsx)(i.a,{to:"/login"}):Object(ee.jsx)("div",{className:"container",children:Object(ee.jsxs)("div",{className:"d-flex flex-column justify-content-center align-items-center",style:{marginTop:"200px"},children:[Object(ee.jsx)("h1",{children:"Verify your Account:"}),Object(ee.jsx)("button",{onClick:function(e){var s=a.params.uid,n=a.params.token;t(s,n),o(!0)},style:{marginTop:"50px"},type:"button",className:"btn btn-primary",children:"Verify"})]})})})),se=Object(l.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{login:function(e,t){return function(){var a=Object(B.a)(W.a.mark((function a(s){var n,r,c;return W.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={headers:{"Content-Type":"application/json"}},r=JSON.stringify({email:e,password:t}),a.prev=2,a.next=5,H.a.post("/accounts/jwt/create/",r,n);case 5:c=a.sent,s({type:p,payload:c.data}),s(K()),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(2),s({type:m,payload:a.t0.response&&a.t0.response.data.detail?a.t0.response.data.detail:a.t0.message});case 13:case"end":return a.stop()}}),a,null,[[2,10]])})));return function(e){return a.apply(this,arguments)}}()}})((function(e){var t=e.login,a=e.isAuthenticated,n=Object(s.useState)({email:"",password:""}),r=Object(J.a)(n,2),c=r[0],l=r[1],j=c.email,d=c.password,u=function(e){return l(Object(b.a)(Object(b.a)({},c),{},Object(F.a)({},e.target.name,e.target.value)))};return a?Object(ee.jsx)(i.a,{to:"/dashboard"}):Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsx)(V.a,{className:"mt-1",children:Object(ee.jsxs)(Z.a,{children:[Object(ee.jsx)(Q.a,{lg:8,md:8,sm:12,children:Object(ee.jsx)("img",{className:"w-100",src:Y,alt:""})}),Object(ee.jsxs)(Q.a,{lg:4,md:8,sm:14,className:"mt-1 p-0",children:[Object(ee.jsx)("h1",{className:"mt-3 d-flex justify-content-center",children:"SSK Enterprise"}),Object(ee.jsx)("h1",{className:"mt-5 d-flex justify-content-center",children:"Welcome User"}),Object(ee.jsxs)($.a,{onSubmit:function(e){e.preventDefault(),t(j,d)},children:[Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupEmail",children:[Object(ee.jsx)($.a.Label,{children:"Email address"}),Object(ee.jsx)($.a.Control,{name:"email",type:"email",placeholder:"Enter email",value:j||"",onChange:function(e){return u(e)},required:!0})]}),Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupPassword",children:[Object(ee.jsx)($.a.Label,{children:"Password"}),Object(ee.jsx)($.a.Control,{name:"password",type:"password",placeholder:"Enter Password",minLength:"8",maxLength:"14",value:d||"",onChange:function(e){return u(e)},required:!0})]}),Object(ee.jsx)("div",{className:"d-flex justify-content-left",children:Object(ee.jsx)("p",{children:Object(ee.jsx)(o.b,{to:"/reset-password",children:"Forgot Password"})})}),Object(ee.jsx)("div",{className:"d-flex justify-content-center",children:Object(ee.jsx)(X.a,{as:"input",type:"submit",value:"Login",className:"submit"})}),Object(ee.jsx)("div",{className:"createAccount",children:Object(ee.jsxs)("span",{children:["New Here?",Object(ee.jsx)("a",{href:"/signup",children:"Create Account"})]})}),Object(ee.jsx)("div",{className:"back",children:Object(ee.jsx)("a",{href:"/",children:"Back To Site"})})]})]})]})})})}));a(40);var ne=Object(l.b)(null,{Logout:function(){return function(e){e({type:A})}}})((function(e){return Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsxs)("div",{className:"sidebar",children:[Object(ee.jsxs)("a",{href:"#home",children:[Object(ee.jsx)("i",{className:"fa fa-fw fa-home"})," Home"]}),Object(ee.jsxs)("a",{href:"/scrapper",children:[Object(ee.jsx)("i",{className:"fa fa-fw fa-wrench"})," Scrapper"]}),Object(ee.jsxs)("a",{href:"/models",children:[Object(ee.jsx)("i",{className:"fa fa-fw fa-wrench"})," Models"]}),Object(ee.jsxs)("a",{href:"#clients",children:[Object(ee.jsx)("i",{className:"fa fa-fw fa-user"})," Clients"]}),Object(ee.jsxs)("a",{href:"#contact",children:[Object(ee.jsx)("i",{className:"fa fa-fw fa-envelope"})," Contact"]}),Object(ee.jsxs)("button",{onClick:function(){return e(),Object(ee.jsx)(i.a,{to:"/login"})},children:[Object(ee.jsx)("i",{className:"fa fa-fw fa-envelope"})," Logout"]})]})})})),re=a.p+"static/media/ssk.c45d4d25.jpg",ce=Object(i.g)((function(e){return Object(ee.jsxs)(ee.Fragment,{children:[Object(ee.jsx)("div",{children:Object(ee.jsx)(ne,{})}),Object(ee.jsx)("div",{className:"main",children:Object(ee.jsxs)("div",{className:"card",children:[Object(ee.jsxs)("div",{className:"card-header",children:[Object(ee.jsx)("div",{className:"row",children:Object(ee.jsxs)("div",{className:"column",children:[Object(ee.jsx)("img",{src:re,className:"title-image rounded-circle pull-left mx-1",alt:"Cinque Terre"}),Object(ee.jsx)("p",{className:"name",children:" ADMIN NAME"})]})}),Object(ee.jsxs)("div",{className:"row",children:[Object(ee.jsx)("div",{className:"column",children:Object(ee.jsx)("p",{className:"email",children:" email@example.com"})}),Object(ee.jsx)("div",{className:"column",children:Object(ee.jsx)("p",{className:"email",children:" email@example.com"})}),Object(ee.jsx)("div",{className:"column",children:Object(ee.jsx)("p",{className:"email",children:" email@example.com"})})]})]}),Object(ee.jsx)("div",{className:"card-body",children:"Content"})]})})]})})),oe=Object(l.b)(null,{checkAuthenticated:function(){return function(){var e=Object(B.a)(W.a.mark((function e(t){var a,s;return W.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return a={headers:{"Content-Type":"application/json",Accept:"application/json"}},s=JSON.stringify({token:localStorage.getItem("access")}),e.prev=3,e.next=6,H.a.post("/accounts/jwt/verify/",s,a);case 6:"token_not_valid"!==e.sent.data.code?t({type:y}):t({type:S}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),t({type:S,payload:e.t0.response&&e.t0.response.data.detail?e.t0.response.data.detail:e.t0.message});case 13:e.next=16;break;case 15:t({type:S});case 16:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}()},load_user:K})((function(e){var t=e.checkAuthenticated,a=e.load_user,n=e.children;return Object(s.useEffect)((function(){t(),a()}),[]),Object(ee.jsx)("div",{children:n})})),ie=Object(l.b)(null,{reset_password:function(e){return function(){var t=Object(B.a)(W.a.mark((function t(a){var s,n;return W.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s={headers:{"Content-Type":"application/json"}},n=JSON.stringify({email:e}),t.prev=2,t.next=5,H.a.post("/accounts/users/reset_password/",n,s);case 5:a({type:N}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),a({type:w,payload:t.t0.response&&t.t0.response.data.detail?t.t0.response.data.detail:t.t0.message});case 11:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.reset_password,a=Object(s.useState)(!1),n=Object(J.a)(a,2),r=n[0],c=n[1],o=Object(s.useState)({email:""}),l=Object(J.a)(o,2),j=l[0],d=l[1],u=j.email;return r?(console.log("sent"),Object(ee.jsx)(i.a,{to:"/login"})):(console.log("not send"),Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsx)(V.a,{className:"mt-1",children:Object(ee.jsxs)(Z.a,{children:[Object(ee.jsx)(Q.a,{lg:8,md:8,sm:12,children:Object(ee.jsx)("img",{className:"w-100",src:Y,alt:""})}),Object(ee.jsxs)(Q.a,{lg:4,md:8,sm:14,className:"mt-1 p-0",children:[Object(ee.jsx)("h1",{className:"mt-3 d-flex justify-content-center",children:"SSK Enterprise"}),Object(ee.jsx)("h1",{className:"mt-5 d-flex justify-content-center",children:"Welcome User"}),Object(ee.jsxs)($.a,{onSubmit:function(e){e.preventDefault(),t(u),c(!0)},children:[Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupEmail",children:[Object(ee.jsx)($.a.Label,{children:"Email address"}),Object(ee.jsx)($.a.Control,{name:"email",type:"email",placeholder:"Enter email",value:u||"",onChange:function(e){return function(e){return d(Object(b.a)(Object(b.a)({},j),{},Object(F.a)({},e.target.name,e.target.value)))}(e)},required:!0})]}),Object(ee.jsx)("div",{className:"d-flex justify-content-center",children:Object(ee.jsx)(X.a,{as:"input",type:"submit",value:"Reset Password",className:"submit"})}),Object(ee.jsx)("div",{className:"back",children:Object(ee.jsx)("a",{href:"/",children:"Back To Site"})})]})]})]})})}))})),le=Object(l.b)(null,{reset_password_confirm:function(e,t,a,s){return function(){var n=Object(B.a)(W.a.mark((function n(r){var c,o;return W.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c={headers:{"Content-Type":"application/json"}},o=JSON.stringify({uid:e,token:t,new_password:a,re_new_password:s}),n.prev=2,n.next=5,H.a.post("/accounts/users/reset_password_confirm/",o,c);case 5:r({type:_}),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(2),r({type:C,payload:n.t0.response&&n.t0.response.data.detail?n.t0.response.data.detail:n.t0.message});case 11:case"end":return n.stop()}}),n,null,[[2,8]])})));return function(e){return n.apply(this,arguments)}}()}})((function(e){var t=e.match,a=e.reset_password_confirm,n=Object(s.useState)(!1),r=Object(J.a)(n,2),c=r[0],o=r[1],l=Object(s.useState)({new_password:"",re_new_password:""}),j=Object(J.a)(l,2),d=j[0],u=j[1],p=d.new_password,m=d.re_new_password,h=function(e){return u(Object(b.a)(Object(b.a)({},d),{},Object(F.a)({},e.target.name,e.target.value)))};return c?Object(ee.jsx)(i.a,{to:"/"}):Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsx)(V.a,{className:"mt-1",children:Object(ee.jsxs)(Z.a,{children:[Object(ee.jsx)(Q.a,{lg:8,md:8,sm:12,children:Object(ee.jsx)("img",{className:"w-100",src:Y,alt:""})}),Object(ee.jsxs)(Q.a,{lg:4,md:8,sm:14,className:"mt-1 p-0",children:[Object(ee.jsx)("h1",{className:"mt-3 d-flex justify-content-center",children:"SSK Enterprise"}),Object(ee.jsx)("h1",{className:"mt-5 d-flex justify-content-center",children:"Welcome User"}),Object(ee.jsxs)($.a,{onSubmit:function(e){e.preventDefault();var s=t.params.uid,n=t.params.token;a(s,n,p,m),o(!0)},children:[Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupPassword",children:[Object(ee.jsx)($.a.Label,{children:"Password"}),Object(ee.jsx)($.a.Control,{name:"new_password",type:"password",placeholder:"Enter Password",minLength:"8",maxLength:"14",value:p||"",onChange:function(e){return h(e)},required:!0})]}),Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupConfirmPassword",children:[Object(ee.jsx)($.a.Label,{children:"Confirm Password"}),Object(ee.jsx)($.a.Control,{name:"re_new_password",type:"password",placeholder:"Enter Confirm Password",value:m||"",onChange:function(e){return h(e)},required:!0})]}),Object(ee.jsx)("div",{className:"d-flex justify-content-center",children:Object(ee.jsx)(X.a,{as:"input",type:"submit",value:"Reset Password",className:"submit"})}),Object(ee.jsx)("div",{className:"back",children:Object(ee.jsx)("a",{href:"/",children:"Back To Site"})})]})]})]})})})})),je=a(48),de=a(49),ue=a(51),be=a(50),pe=function(e){Object(ue.a)(a,e);var t=Object(be.a)(a);function a(){return Object(je.a)(this,a),t.apply(this,arguments)}return Object(de.a)(a,[{key:"render",value:function(){var e=this.props.component;return localStorage.getItem("access")?Object(ee.jsx)(e,{}):Object(ee.jsx)(i.a,{to:{pathname:"/login"}})}}]),a}(n.a.Component),me=pe,he=Object(l.b)((function(e){return{username:e.auth.username,email:e.auth.email}}),{scrape_twitter:function(e,t,a){return function(){var s=Object(B.a)(W.a.mark((function s(n){var r,c,o;return W.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(!localStorage.getItem("access")){s.next=17;break}return r={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},c=JSON.stringify({query:e,username:t,email:a}),console.log("body",c),s.prev=4,s.next=7,H.a.post("/scrappers/twitter_scrapper/",c,r);case 7:o=s.sent,console.log("hello",o.data),n({type:k,payload:o.data}),s.next=15;break;case 12:s.prev=12,s.t0=s.catch(4),n({type:L,payload:s.t0.response&&s.t0.response.data.detail?s.t0.response.data.detail:s.t0.message});case 15:s.next=18;break;case 17:n({type:L});case 18:case"end":return s.stop()}}),s,null,[[4,12]])})));return function(e){return s.apply(this,arguments)}}()}})((function(e){var t=e.scrape_twitter,a=e.username,n=e.email,r=Object(s.useState)({query:""}),c=Object(J.a)(r,2),o=c[0],i=c[1],l=o.query;return Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsxs)($.a,{onSubmit:function(e){e.preventDefault(),console.log(l),t(l,a,n)},children:[Object(ee.jsxs)($.a.Group,{className:"mb-0",controlId:"formGroupSearch",children:[Object(ee.jsx)($.a.Label,{children:"Search"}),Object(ee.jsx)($.a.Control,{name:"query",type:"text",placeholder:"Enter Query",value:l||"",onChange:function(e){return function(e){return i(Object(b.a)(Object(b.a)({},o),{},Object(F.a)({},e.target.name,e.target.value)))}(e)},required:!0})]}),Object(ee.jsx)("div",{className:"d-flex justify-content-center",children:Object(ee.jsx)(X.a,{as:"input",type:"submit",value:"Scrape",className:"submit"})})]})})}));var Oe=Object(l.b)((function(e){return{username:e.auth.username,email:e.auth.email}}),{file_upload:function(e,t,a,s){return function(){var n=Object(B.a)(W.a.mark((function n(r){var c,o,i;return W.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!localStorage.getItem("access")){n.next=17;break}return c={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},o=JSON.stringify({file:e,option:t,username:a,email:s}),console.log("body",o),n.prev=4,n.next=7,H.a.post("/models/SentAModel/",o,c);case 7:i=n.sent,console.log("hello",i.data),r({type:k,payload:i.data}),n.next=15;break;case 12:n.prev=12,n.t0=n.catch(4),r({type:L,payload:n.t0.response&&n.t0.response.data.detail?n.t0.response.data.detail:n.t0.message});case 15:n.next=18;break;case 17:r({type:L});case 18:case"end":return n.stop()}}),n,null,[[4,12]])})));return function(e){return n.apply(this,arguments)}}()}})((function(e){var t=e.file_upload,a=e.username,s=e.email,r=n.a.useState(),c=Object(J.a)(r,2),o=c[0],i=c[1],l=n.a.useState(),j=Object(J.a)(l,2),d=j[0],u=j[1];return Object(ee.jsx)(ee.Fragment,{children:Object(ee.jsxs)($.a,{onSubmit:function(e){e.preventDefault(),console.log(o),t(o,d,a,s)},children:[Object(ee.jsxs)(Z.a,{children:[Object(ee.jsx)(Q.a,{children:Object(ee.jsxs)($.a.Group,{controlId:"formFile",children:[Object(ee.jsx)($.a.Label,{children:"Choose csv File for model training"}),Object(ee.jsx)($.a.Control,{name:"file",type:"file",accept:".xlsx, .xls, .csv",onChange:function(e){return i(e.target.files[0].name)},required:!0})]})}),Object(ee.jsx)(Q.a,{children:Object(ee.jsxs)($.a.Group,{controlId:"formBasicSelectOption",children:[Object(ee.jsx)($.a.Label,{children:"Select options"}),Object(ee.jsxs)($.a.Control,{name:"option",as:"select",value:d||"",onChange:function(e){return u(e.target.value)},required:!0,children:[Object(ee.jsx)("option",{value:"default",children:"Select..."}),Object(ee.jsx)("option",{value:"Prediction",children:"Run Predictions"}),Object(ee.jsx)("option",{value:"Train",children:"Training the models"})]})]})})]}),Object(ee.jsx)(X.a,{variant:"primary",className:"mt-3",type:"submit",children:"Submit"})]})})}));var xe=function(){return Object(ee.jsx)(l.a,{store:U,children:Object(ee.jsx)(o.a,{children:Object(ee.jsx)(oe,{children:Object(ee.jsxs)(i.d,{children:[Object(ee.jsx)(i.b,{exact:!0,path:"/signup",component:te}),Object(ee.jsx)(i.b,{exact:!0,path:"/activate/:uid/:token",component:ae}),Object(ee.jsx)(i.b,{exact:!0,path:"/login",component:se}),Object(ee.jsx)(me,{exact:!0,path:"/dashboard",component:ce}),Object(ee.jsx)(me,{exact:!0,path:"/scrapper",component:he}),Object(ee.jsx)(me,{exact:!0,path:"/models",component:Oe}),Object(ee.jsx)(i.b,{exact:!0,path:"/reset-password",component:ie}),Object(ee.jsx)(i.b,{exact:!0,path:"/password/reset/confirm/:uid/:token",component:le})]})})})})};c.a.render(Object(ee.jsx)(n.a.StrictMode,{children:Object(ee.jsx)(xe,{})}),document.getElementById("root"))}},[[86,1,2]]]);
//# sourceMappingURL=main.0f7c9385.chunk.js.map