(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{25:function(e,t,a){},43:function(e,t,a){},88:function(e,t,a){},89:function(e,t,a){"use strict";a.r(t);var s=a(1),r=a.n(s),c=a(26),n=a.n(c),o=a(17),l=a(7),i=a(9),d=a(19),j=a(45),u=a(46),m=a(2),p="LOGIN_SUCCESS",b="LOGIN_FAIL",h="SIGNUP_SUCCESS",O="SIGNUP_FAIL",x="ACTIVATION_SUCCESS",f="ACTIVATION_FAIL",g="USER_LOADED_SUCCESS",w="USER_LOADED_FAIL",v="AUTHENTICATED_SUCCESS",N="AUTHENTICATED_FAIL",S="PASSWORD_RESET_FAIL",y="PASSWORD_RESET_SUCCESS",_="PASSWORD_RESET_CONFIRM_FAIL",C="PASSWORD_RESET_CONFIRM_SUCCESS",E="LOGOUT",A="DELETE_USER_SUCCESS",k="DELETE_USER_FAIL",I="SCRAPE_SUCCESS",T="SCRAPE_FAIL",P="DATA_UPLOAD_SUCCESS",D="DATA_UPLOAD_FAIL",L={access:localStorage.getItem("access"),refresh:localStorage.getItem("refresh"),isAuthenticated:null,user:null,username:"",email:"",password:"",re_password:"",number:"",gender:"",dob:""},G={query:""},R=Object(d.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0,a=t.type,s=t.payload;switch(a){case v:return Object(m.a)(Object(m.a)({},e),{},{isAuthenticated:!0});case p:return localStorage.setItem("access",s.access),localStorage.setItem("refresh",s.refresh),Object(m.a)(Object(m.a)({},e),{},{isAuthenticated:!0,access:s.access,refresh:s.refresh});case h:case N:case A:return Object(m.a)(Object(m.a)({},e),{},{isAuthenticated:!1});case g:return Object(m.a)(Object(m.a)({},e),{},{username:s.username,email:s.email,password:s.password,number:s.number,gender:s.gender,dob:s.dob});case w:return Object(m.a)(Object(m.a)({},e),{},{username:"",email:"",password:"",number:"",gender:"",dob:""});case b:case O:case E:return localStorage.removeItem("access"),localStorage.removeItem("refresh"),Object(m.a)(Object(m.a)({},e),{},{access:null,refresh:null,isAuthenticated:!1,user:null,username:"",email:"",password:"",number:"",gender:"",dob:""});case y:case S:case C:case _:case x:case f:case k:return Object(m.a)({},e);default:return e}},scrape:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0,a=t.type,s=t.payload;switch(a){case I:return Object(m.a)(Object(m.a)({},e),{},{query:s.query});case T:return Object(m.a)(Object(m.a)({},e),{},{query:""});case P:return Object(m.a)(Object(m.a)({},e),{},{File:s.File,fileData:s.fileData,option:s.option});case D:return Object(m.a)(Object(m.a)({},e),{},{File:"",fileData:"",option:""});default:return e}}}),F=[u.a],J=Object(d.createStore)(R,{},Object(j.composeWithDevTools)(d.applyMiddleware.apply(void 0,F))),U=a(28),q=a(10),M=a(5),W=a(8),B=a.n(W),z=a(15),H=a(16),Z=a.n(H),V=function(){return function(){var e=Object(z.a)(B.a.mark((function e(t){var a,s;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return a={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},e.prev=2,e.next=5,Z.a.get("/accounts/users/me/",a);case 5:s=e.sent,console.log("loading",s.data),t({type:g,payload:s.data}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),t({type:w,payload:e.t0.response&&e.t0.response.data.detail?e.t0.response.data.detail:e.t0.message});case 13:e.next=16;break;case 15:t({type:w});case 16:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}()},K=a(90),$=a(91),Q=a(49),X=a(92),Y=a(93),ee=a.p+"static/media/login.4d3b2db6.jpg",te=(a(25),a(0)),ae=Object(i.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{signup:function(e){return function(){var t=Object(z.a)(B.a.mark((function t(a){var s,r,c,n,o,l,i,d,j,u;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s={headers:{"Content-Type":"multipart/form-data"}},t.prev=1,t.next=4,Z.a.post("/accounts/users/",e,s);case 4:r=t.sent,console.log(r.data),a({type:h,payload:r.data}),t.next=21;break;case 9:t.prev=9,t.t0=t.catch(1),c=JSON.stringify(t.t0.response.data,null,2),a({type:O,payload:JSON.parse(c)}),n=JSON.stringify(t.t0.response.data,null,2),o=JSON.parse(n).password,l=JSON.parse(n).username,i=JSON.parse(n).email,d=JSON.parse(n).gender,j=JSON.parse(n).dob,u=JSON.parse(n).number,o?alert(JSON.parse(n).password[0]):l?alert(JSON.parse(n).username[0]):i?alert(JSON.parse(n).email[0]):u?alert(JSON.parse(n).number[0]):d?alert(JSON.parse(n).gender[0]):j&&alert(JSON.parse(n).dob[0]);case 21:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.signup,a=e.isAuthenticated,r=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,c=Object(s.useState)(!1),n=Object(M.a)(c,2),o=n[0],i=n[1],d=Object(s.useState)({username:"",email:"",password:"",re_password:"",number:"",gender:"",dob:""}),j=Object(M.a)(d,2),u=j[0],p=j[1],b=Object(s.useState)({}),h=Object(M.a)(b,2),O=h[0],x=h[1],f=Object(s.useState)({}),g=Object(M.a)(f,2),w=g[0],v=g[1],N=u.username,S=u.email,y=u.password,_=u.re_password,C=u.number,E=u.gender,A=u.dob,k=(O.image,function(e){return p(Object(m.a)(Object(m.a)({},u),{},Object(q.a)({},e.target.name,e.target.value)))});return a?Object(te.jsx)(l.a,{to:"/dashboard"}):o?Object(te.jsx)(l.a,{to:"/login"}):Object(te.jsx)(te.Fragment,{children:Object(te.jsx)(K.a,{className:"mt-1",children:Object(te.jsxs)($.a,{children:[Object(te.jsx)(Q.a,{lg:6,md:7,sm:12,children:Object(te.jsx)("img",{className:"w-100",src:ee,alt:""})}),Object(te.jsxs)(Q.a,{lg:6,md:6,sm:12,className:"mt-1 p-0",children:[Object(te.jsx)("h1",{className:"title",children:"SSK Enterprise"}),Object(te.jsxs)(X.a,{onSubmit:function(e){e.preventDefault();var a=function(){var e={};return N&&""!==N?N.length>20&&(e.username="Username is Too Long"):e.username="Username is Required",S&&""!==S?r.test(S)||(e.email="Invalid Email"):e.email="Email is Required",y&&""!==y?y.length<8&&(e.password="Password is too Short"):e.password="Password is Required",_&&""!==_?y!==_&&(e.re_password="Password Doesnot Match"):e.re_password="Password Confirmation is Required",C&&11===C.length||(e.number="Invalid Mobile Number"),E&&""!==E||(e.gender="Gender is Required"),A&&""!==A||(e.dob="Date of Birth is Required"),e}();if(Object.keys(a).length>0)v(a);else{var s;console.log(O),console.log(N);var c=new FormData;c.append("username",N),c.append("email",S),c.append("password",y),c.append("re_password",_),c.append("number",C),c.append("gender",E),c.append("dob",A),c.append("image",O),(s=console).log.apply(s,Object(U.a)(c)),t(c),i(!0)}},children:[Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupText",children:[Object(te.jsx)(X.a.Label,{children:"Username"}),Object(te.jsx)(X.a.Control,{name:"username",className:"input ".concat(w.username&&"errorShow"),type:"text",placeholder:"Enter username",value:N||"",onChange:function(e){return k(e)}}),w.username&&Object(te.jsx)("p",{className:"errorShow",children:w.username})]}),Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupEmail",children:[Object(te.jsx)(X.a.Label,{children:"Email address"}),Object(te.jsx)(X.a.Control,{name:"email",className:"input ".concat(w.email&&"errorShow"),type:"email",placeholder:"Enter email",value:S||"",onChange:function(e){return k(e)}}),w.email&&Object(te.jsx)("p",{className:"errorShow",children:w.email})]}),Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupPassword",children:[Object(te.jsx)(X.a.Label,{children:"Password"}),Object(te.jsx)(X.a.Control,{name:"password",className:"input ".concat(w.password&&"errorShow"),type:"password",placeholder:"Enter Password",value:y||"",onChange:function(e){return k(e)}}),w.password&&Object(te.jsx)("p",{className:"errorShow",children:w.password})]}),Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupConfirmPassword",children:[Object(te.jsx)(X.a.Label,{children:"Confirm Password"}),Object(te.jsx)(X.a.Control,{name:"re_password",className:"input ".concat(w.re_password&&"errorShow"),type:"password",placeholder:"Enter Confirm Password",value:_||"",onChange:function(e){return k(e)}}),w.re_password&&Object(te.jsx)("p",{className:"errorShow",children:w.re_password})]}),Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupNumber",children:[Object(te.jsx)(X.a.Label,{children:"Mobile Number"}),Object(te.jsx)(X.a.Control,{name:"number",className:"input ".concat(w.number&&"errorShow"),type:"text",placeholder:"Enter Mobile Number",value:C||"",onChange:function(e){return k(e)}}),w.number&&Object(te.jsx)("p",{className:"errorShow",children:w.number})]}),Object(te.jsxs)($.a,{children:[Object(te.jsx)(Q.a,{children:Object(te.jsxs)(X.a.Group,{controlId:"formBasicSelectGender",children:[Object(te.jsx)(X.a.Label,{children:"Select Gender"}),Object(te.jsxs)(X.a.Control,{name:"gender",className:"input ".concat(w.gender&&"errorShow"),as:"select",value:E||"",onChange:function(e){return k(e)},children:[Object(te.jsx)("option",{value:"Gender",children:"Select..."}),Object(te.jsx)("option",{value:"Male",children:"Male"}),Object(te.jsx)("option",{value:"Feale",children:"Female"}),Object(te.jsx)("option",{value:"Other",children:"Other"})]}),w.gender&&Object(te.jsx)("p",{className:"errorShow",children:w.gender})]})}),Object(te.jsx)(Q.a,{children:Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupDate",children:[Object(te.jsx)(X.a.Label,{children:"Date of Birth"}),Object(te.jsx)(X.a.Control,{name:"dob",className:"input ".concat(w.dob&&"errorShow"),type:"date",placeholder:"Enter Date of Birth",value:A||"",onChange:function(e){return k(e)}}),w.dob&&Object(te.jsx)("p",{className:"errorShow",children:w.dob})]})})]}),Object(te.jsxs)(X.a.Group,{controlId:"formFile",className:"mb-3",children:[Object(te.jsx)(X.a.Label,{children:"Default file input example"}),Object(te.jsx)(X.a.Control,{type:"file",name:"image",accept:"image/png, image/jpeg",onChange:function(e){return function(e){console.log(e.target.files[0]),x(e.target.files[0])}(e)}})]}),Object(te.jsx)("div",{className:"d-flex justify-content-center",children:Object(te.jsx)(Y.a,{as:"input",type:"submit",value:"Signup",className:"submit"})}),Object(te.jsx)("div",{className:"createAccount",children:Object(te.jsxs)("span",{children:["Already Have an Account",Object(te.jsx)("a",{href:"/login",children:"Login"})]})}),Object(te.jsx)("div",{className:"back",children:Object(te.jsx)("a",{href:"/",children:"Back To Site"})})]})]})]})})})})),se=Object(i.b)(null,{verify:function(e,t){return function(){var a=Object(z.a)(B.a.mark((function a(s){var r,c;return B.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r={headers:{"Content-Type":"application/json"}},c=JSON.stringify({uid:e,token:t}),a.prev=2,a.next=5,Z.a.post("/accounts/users/activation/",c,r);case 5:s({type:x}),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(2),s({type:f,payload:a.t0.response&&a.t0.response.data.detail?a.t0.response.data.detail:a.t0.message});case 11:case"end":return a.stop()}}),a,null,[[2,8]])})));return function(e){return a.apply(this,arguments)}}()}})((function(e){var t=e.verify,a=e.match,r=Object(s.useState)(!1),c=Object(M.a)(r,2),n=c[0],o=c[1];return n?Object(te.jsx)(l.a,{to:"/login"}):Object(te.jsx)("div",{className:"container",children:Object(te.jsxs)("div",{className:"d-flex flex-column justify-content-center align-items-center",style:{marginTop:"200px"},children:[Object(te.jsx)("h1",{children:"Verify your Account:"}),Object(te.jsx)("button",{onClick:function(e){var s=a.params.uid,r=a.params.token;t(s,r),o(!0)},style:{marginTop:"50px"},type:"button",className:"btn btn-primary",children:"Verify"})]})})})),re=Object(i.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated}}),{login:function(e,t){return function(){var a=Object(z.a)(B.a.mark((function a(s){var r,c,n,o,l,i,d;return B.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r={headers:{"Content-Type":"application/json"}},c=JSON.stringify({email:e,password:t}),a.prev=2,a.next=5,Z.a.post("/accounts/jwt/create/",c,r);case 5:n=a.sent,s({type:p,payload:n.data}),s(V()),a.next=18;break;case 10:a.prev=10,a.t0=a.catch(2),s({type:b,payload:a.t0.response&&a.t0.response.data.detail?a.t0.response.data.detail:a.t0.message}),o=JSON.stringify(a.t0.response.data,null,2),l=JSON.parse(o).password,i=JSON.parse(o).email,d=JSON.parse(o).detail,l?alert(JSON.parse(o).password[0]):i?alert(JSON.parse(o).email[0]):d&&alert(JSON.parse(o).detail);case 18:case"end":return a.stop()}}),a,null,[[2,10]])})));return function(e){return a.apply(this,arguments)}}()}})((function(e){var t=e.login,a=e.isAuthenticated,r=Object(s.useState)({email:"",password:""}),c=Object(M.a)(r,2),n=c[0],i=c[1],d=Object(s.useState)({}),j=Object(M.a)(d,2),u=j[0],p=j[1],b=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,h=n.email,O=n.password,x=function(e){return i(Object(m.a)(Object(m.a)({},n),{},Object(q.a)({},e.target.name,e.target.value)))};return a?Object(te.jsx)(l.a,{to:"/dashboard"}):Object(te.jsx)(te.Fragment,{children:Object(te.jsx)(K.a,{className:"mt-1",children:Object(te.jsxs)($.a,{children:[Object(te.jsx)(Q.a,{lg:7,md:7,sm:12,children:Object(te.jsx)("img",{className:"w-100",src:ee,alt:""})}),Object(te.jsxs)(Q.a,{lg:4,md:7,sm:10,className:"mt-1 p-0",children:[Object(te.jsx)("h1",{className:"mt-3 d-flex justify-content-center",children:"SSK Enterprise"}),Object(te.jsx)("h1",{className:"mt-5 d-flex justify-content-center",children:"Welcome User"}),Object(te.jsxs)(X.a,{onSubmit:function(e){e.preventDefault();var a=function(){var e={};return h&&""!==h?b.test(h)||(e.email="Invalid Email"):e.email="Email is Required",O&&""!==O||(e.password="Password is Required"),e}();Object.keys(a).length>0?p(a):t(h,O)},children:[Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupEmail",children:[Object(te.jsx)(X.a.Label,{children:"Email address"}),Object(te.jsx)(X.a.Control,{name:"email",className:"input ".concat(u.email&&"errorShow"),type:"email",placeholder:"Enter email",value:h||"",onChange:function(e){return x(e)}}),u.email&&Object(te.jsx)("p",{className:"errorShow",children:u.email})]}),Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupPassword",children:[Object(te.jsx)(X.a.Label,{children:"Password"}),Object(te.jsx)(X.a.Control,{name:"password",className:"input ".concat(u.password&&"errorShow"),type:"password",placeholder:"Enter Password",value:O||"",onChange:function(e){return x(e)}}),u.password&&Object(te.jsx)("p",{className:"errorShow",children:u.password})]}),Object(te.jsx)("div",{className:"d-flex justify-content-left",children:Object(te.jsx)("p",{children:Object(te.jsx)(o.b,{to:"/reset-password",children:"Forgot Password"})})}),Object(te.jsx)("div",{className:"d-flex justify-content-center",children:Object(te.jsx)(Y.a,{as:"input",type:"submit",value:"Login",className:"submit"})}),Object(te.jsx)("div",{className:"createAccount",children:Object(te.jsxs)("span",{children:["New Here?",Object(te.jsx)("a",{href:"/signup",children:"Create Account"})]})}),Object(te.jsx)("div",{className:"back",children:Object(te.jsx)("a",{href:"/",children:"Back To Site"})})]})]})]})})})}));a(43);var ce=Object(i.b)(null,{Logout:function(){return function(e){e({type:E})}}})((function(e){return Object(te.jsx)(te.Fragment,{children:Object(te.jsxs)("div",{className:"sidebar",children:[Object(te.jsxs)("a",{href:"#home",children:[Object(te.jsx)("i",{className:"fa fa-fw fa-home"})," Home"]}),Object(te.jsxs)("a",{href:"/scrapper",children:[Object(te.jsx)("i",{className:"fa fa-fw fa-wrench"})," Scrapper"]}),Object(te.jsxs)("a",{href:"/models",children:[Object(te.jsx)("i",{className:"fa fa-fw fa-wrench"})," Models"]}),Object(te.jsxs)("a",{href:"#clients",children:[Object(te.jsx)("i",{className:"fa fa-fw fa-user"})," Clients"]}),Object(te.jsxs)("a",{href:"#contact",children:[Object(te.jsx)("i",{className:"fa fa-fw fa-envelope"})," Contact"]}),Object(te.jsxs)("button",{onClick:function(){return e(),Object(te.jsx)(l.a,{to:"/login"})},children:[Object(te.jsx)("i",{className:"fa fa-fw fa-envelope"})," Logout"]})]})})})),ne=a.p+"static/media/ssk.c45d4d25.jpg",oe=Object(l.g)((function(e){return Object(te.jsxs)(te.Fragment,{children:[Object(te.jsx)("div",{children:Object(te.jsx)(ce,{})}),Object(te.jsx)("div",{className:"main",children:Object(te.jsxs)("div",{className:"card",children:[Object(te.jsxs)("div",{className:"card-header",children:[Object(te.jsx)("div",{className:"row",children:Object(te.jsxs)("div",{className:"column",children:[Object(te.jsx)("img",{src:ne,className:"title-image rounded-circle pull-left mx-1",alt:"Cinque Terre"}),Object(te.jsx)("p",{className:"name",children:" ADMIN NAME"})]})}),Object(te.jsxs)("div",{className:"row",children:[Object(te.jsx)("div",{className:"column",children:Object(te.jsx)("p",{className:"email",children:" email@example.com"})}),Object(te.jsx)("div",{className:"column",children:Object(te.jsx)("p",{className:"email",children:" email@example.com"})}),Object(te.jsx)("div",{className:"column",children:Object(te.jsx)("p",{className:"email",children:" email@example.com"})})]})]}),Object(te.jsx)("div",{className:"card-body",children:"Content"})]})})]})})),le=Object(i.b)(null,{checkAuthenticated:function(){return function(){var e=Object(z.a)(B.a.mark((function e(t){var a,s;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!localStorage.getItem("access")){e.next=15;break}return a={headers:{"Content-Type":"application/json",Accept:"application/json"}},s=JSON.stringify({token:localStorage.getItem("access")}),e.prev=3,e.next=6,Z.a.post("/accounts/jwt/verify/",s,a);case 6:"token_not_valid"!==e.sent.data.code?t({type:v}):t({type:N}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),t({type:N,payload:e.t0.response&&e.t0.response.data.detail?e.t0.response.data.detail:e.t0.message});case 13:e.next=16;break;case 15:t({type:N});case 16:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}()},load_user:V})((function(e){var t=e.checkAuthenticated,a=e.load_user,r=e.children;return Object(s.useEffect)((function(){t(),a()}),[]),Object(te.jsx)("div",{children:r})})),ie=Object(i.b)(null,{reset_password:function(e){return function(){var t=Object(z.a)(B.a.mark((function t(a){var s,r;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s={headers:{"Content-Type":"application/json"}},r=JSON.stringify({email:e}),t.prev=2,t.next=5,Z.a.post("/accounts/users/reset_password/",r,s);case 5:a({type:y}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),a({type:S,payload:t.t0.response&&t.t0.response.data.detail?t.t0.response.data.detail:t.t0.message});case 11:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.reset_password,a=Object(s.useState)(!1),r=Object(M.a)(a,2),c=r[0],n=r[1],o=Object(s.useState)({email:""}),i=Object(M.a)(o,2),d=i[0],j=i[1],u=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,p=Object(s.useState)({}),b=Object(M.a)(p,2),h=b[0],O=b[1],x=d.email;return c?(console.log("sent"),Object(te.jsx)(l.a,{to:"/login"})):(console.log("not send"),Object(te.jsx)(te.Fragment,{children:Object(te.jsx)(K.a,{className:"mt-1",children:Object(te.jsxs)($.a,{children:[Object(te.jsx)(Q.a,{lg:8,md:8,sm:12,children:Object(te.jsx)("img",{className:"w-100",src:ee,alt:""})}),Object(te.jsxs)(Q.a,{lg:4,md:8,sm:14,className:"mt-1 p-0",children:[Object(te.jsx)("h1",{className:"mt-3 d-flex justify-content-center",children:"SSK Enterprise"}),Object(te.jsx)("h1",{className:"mt-5 d-flex justify-content-center",children:"Welcome User"}),Object(te.jsxs)(X.a,{onSubmit:function(e){e.preventDefault();var a=function(){var e={};return x&&""!==x?u.test(x)||(e.email="Invalid Email"):e.email="Email is Required",e}();Object.keys(a).length>0?O(a):(t(x),n(!0))},children:[Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupEmail",children:[Object(te.jsx)(X.a.Label,{children:"Email address"}),Object(te.jsx)(X.a.Control,{name:"email",className:"input ".concat(h.email&&"errorShow"),type:"email",placeholder:"Enter email",value:x||"",onChange:function(e){return function(e){return j(Object(m.a)(Object(m.a)({},d),{},Object(q.a)({},e.target.name,e.target.value)))}(e)}}),h.email&&Object(te.jsx)("p",{className:"errorShow",children:h.email})]}),Object(te.jsx)("div",{className:"d-flex justify-content-center",children:Object(te.jsx)(Y.a,{as:"input",type:"submit",value:"Reset Password",className:"submit"})}),Object(te.jsx)("div",{className:"back",children:Object(te.jsx)("a",{href:"/",children:"Back To Site"})})]})]})]})})}))})),de=Object(i.b)(null,{reset_password_confirm:function(e,t,a,s){return function(){var r=Object(z.a)(B.a.mark((function r(c){var n,o;return B.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n={headers:{"Content-Type":"application/json"}},o=JSON.stringify({uid:e,token:t,new_password:a,re_new_password:s}),r.prev=2,r.next=5,Z.a.post("/accounts/users/reset_password_confirm/",o,n);case 5:c({type:C}),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(2),c({type:_,payload:r.t0.response&&r.t0.response.data.detail?r.t0.response.data.detail:r.t0.message});case 11:case"end":return r.stop()}}),r,null,[[2,8]])})));return function(e){return r.apply(this,arguments)}}()}})((function(e){var t=e.match,a=e.reset_password_confirm,r=Object(s.useState)(!1),c=Object(M.a)(r,2),n=c[0],o=c[1],i=Object(s.useState)({new_password:"",re_new_password:""}),d=Object(M.a)(i,2),j=d[0],u=d[1],p=Object(s.useState)({}),b=Object(M.a)(p,2),h=b[0],O=b[1],x=j.new_password,f=j.re_new_password,g=function(e){return u(Object(m.a)(Object(m.a)({},j),{},Object(q.a)({},e.target.name,e.target.value)))};return n?Object(te.jsx)(l.a,{to:"/"}):Object(te.jsx)(te.Fragment,{children:Object(te.jsx)(K.a,{className:"mt-1",children:Object(te.jsxs)($.a,{children:[Object(te.jsx)(Q.a,{lg:8,md:8,sm:12,children:Object(te.jsx)("img",{className:"w-100",src:ee,alt:""})}),Object(te.jsxs)(Q.a,{lg:4,md:8,sm:14,className:"mt-1 p-0",children:[Object(te.jsx)("h1",{className:"mt-3 d-flex justify-content-center",children:"SSK Enterprise"}),Object(te.jsx)("h1",{className:"mt-5 d-flex justify-content-center",children:"Welcome User"}),Object(te.jsxs)(X.a,{onSubmit:function(e){e.preventDefault();var s=function(){var e={};return x&&""!==x?x.length<8&&(e.new_password="Password is too Short"):e.new_password="Password is Required",f&&""!==f?x!==f&&(e.re_new_password="Password Doesnot Match"):e.re_new_password="Password Confirmation is Required",e}();if(Object.keys(s).length>0)O(s);else{var r=t.params.uid,c=t.params.token;a(r,c,x,f),o(!0)}},children:[Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupPassword",children:[Object(te.jsx)(X.a.Label,{children:"Password"}),Object(te.jsx)(X.a.Control,{name:"new_password",className:"input ".concat(h.password&&"errorShow"),type:"password",placeholder:"Enter Password",value:x||"",onChange:function(e){return g(e)},required:!0}),h.new_password&&Object(te.jsx)("p",{className:"errorShow",children:h.new_password})]}),Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupConfirmPassword",children:[Object(te.jsx)(X.a.Label,{children:"Confirm Password"}),Object(te.jsx)(X.a.Control,{name:"re_new_password",className:"input ".concat(h.password2&&"errorShow"),type:"password",placeholder:"Enter Confirm Password",value:f||"",onChange:function(e){return g(e)}}),h.re_new_password&&Object(te.jsx)("p",{children:h.re_new_password})]}),Object(te.jsx)("div",{className:"d-flex justify-content-center",children:Object(te.jsx)(Y.a,{as:"input",type:"submit",value:"Reset Password",className:"submit"})}),Object(te.jsx)("div",{className:"back",children:Object(te.jsx)("a",{href:"/",children:"Back To Site"})})]})]})]})})})})),je=a(50),ue=a(51),me=a(53),pe=a(52),be=function(e){Object(me.a)(a,e);var t=Object(pe.a)(a);function a(){return Object(je.a)(this,a),t.apply(this,arguments)}return Object(ue.a)(a,[{key:"render",value:function(){var e=this.props.component;return localStorage.getItem("access")?Object(te.jsx)(e,{}):Object(te.jsx)(l.a,{to:{pathname:"/login"}})}}]),a}(r.a.Component),he=be,Oe=Object(i.b)((function(e){return{username:e.auth.username,email:e.auth.email}}),{scrape_twitter:function(e,t,a){return function(){var s=Object(z.a)(B.a.mark((function s(r){var c,n,o;return B.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(!localStorage.getItem("access")){s.next=17;break}return c={headers:{"Content-Type":"application/json",Authorization:"JWT ".concat(localStorage.getItem("access")),Accept:"application/json"}},n=JSON.stringify({search_word:e,username:t,email:a}),console.log("body",n),s.prev=4,s.next=7,Z.a.post("/scrappers/twitter_scrapper/",n,c);case 7:o=s.sent,console.log("hello",o.data),r({type:I,payload:o.data}),s.next=15;break;case 12:s.prev=12,s.t0=s.catch(4),r({type:T,payload:s.t0.response&&s.t0.response.data.detail?s.t0.response.data.detail:s.t0.message});case 15:s.next=18;break;case 17:r({type:T});case 18:case"end":return s.stop()}}),s,null,[[4,12]])})));return function(e){return s.apply(this,arguments)}}()}})((function(e){var t=e.scrape_twitter,a=e.username,r=e.email,c=Object(s.useState)({search_word:""}),n=Object(M.a)(c,2),o=n[0],l=n[1],i=o.search_word;return Object(te.jsx)(te.Fragment,{children:Object(te.jsxs)(X.a,{onSubmit:function(e){e.preventDefault(),console.log(i),t(i,a,r)},children:[Object(te.jsxs)(X.a.Group,{className:"mb-0",controlId:"formGroupSearch",children:[Object(te.jsx)(X.a.Label,{children:"Search"}),Object(te.jsx)(X.a.Control,{name:"search_word",type:"text",placeholder:"Enter Query",value:i||"",onChange:function(e){return function(e){return l(Object(m.a)(Object(m.a)({},o),{},Object(q.a)({},e.target.name,e.target.value)))}(e)},required:!0})]}),Object(te.jsx)("div",{className:"d-flex justify-content-center",children:Object(te.jsx)(Y.a,{as:"input",type:"submit",value:"Scrape",className:"submit"})})]})})}));a(87);var xe=Object(i.b)((function(e){return{username:e.auth.username,email:e.auth.email}}),{file_upload:function(e){return function(){var t=Object(z.a)(B.a.mark((function t(a){var s,r,c;return B.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!localStorage.getItem("access")){t.next=16;break}return r={headers:{"Content-Type":"multipart/form-data",Authorization:"JWT ".concat(localStorage.getItem("access"))}},(s=console).log.apply(s,["body"].concat(Object(U.a)(e))),t.prev=3,t.next=6,Z.a.post("/models/SentAModel/",e,r);case 6:c=t.sent,console.log("hello",c.data),a({type:I,payload:c.data}),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(3),a({type:T,payload:t.t0.response&&t.t0.response.data.detail?t.t0.response.data.detail:t.t0.message});case 14:t.next=17;break;case 16:a({type:T});case 17:case"end":return t.stop()}}),t,null,[[3,11]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.file_upload,a=e.username,r=e.email,c=Object(s.useState)(),n=Object(M.a)(c,2),o=n[0],l=n[1],i=Object(s.useState)({}),d=Object(M.a)(i,2),j=(d[0],d[1]),u=Object(s.useState)(),m=Object(M.a)(u,2),p=m[0],b=m[1];return Object(te.jsx)(te.Fragment,{children:Object(te.jsxs)(X.a,{onSubmit:function(e){e.preventDefault();var s=function(){var e={};return o&&""!==o||(e.file="Username is Required"),p&&""!==p||(e.option="Date of Birth is Required"),e}();if(Object.keys(s).length>0)j(s);else{console.log(o);var c=new FormData;c.append("File",o),c.append("fileName",o.name),c.append("option",p),c.append("username",a),c.append("email",r),t(c)}var n=o.name;console.log(n);if(!/(\.xlsx|\.xls|\.csv|)$/i.exec(n))return console.log("hello"),alert("Invalid file type"),n.name="",!1},children:[Object(te.jsxs)($.a,{children:[Object(te.jsx)(Q.a,{children:Object(te.jsxs)(X.a.Group,{controlId:"formFile",children:[Object(te.jsx)(X.a.Label,{children:"Choose csv File for model training"}),Object(te.jsx)(X.a.Control,{name:"File",type:"file",accept:".xlsx, .xls, .csv",onChange:function(e){return function(e){console.log(e.target.files[0]),l(e.target.files[0])}(e)},required:!0})]})}),Object(te.jsx)(Q.a,{children:Object(te.jsxs)(X.a.Group,{controlId:"formBasicSelectOption",children:[Object(te.jsx)(X.a.Label,{children:"Select options"}),Object(te.jsxs)(X.a.Control,{name:"option",as:"select",value:p||"",onChange:function(e){return b(e.target.value)},required:!0,children:[Object(te.jsx)("option",{value:"default",children:"Select..."}),Object(te.jsx)("option",{value:"Prediction",children:"Run Predictions"}),Object(te.jsx)("option",{value:"Train",children:"Training the models"})]})]})})]}),Object(te.jsx)(Y.a,{variant:"primary",className:"mt-3",type:"submit",children:"Submit"})]})})}));a(88);var fe=function(){return Object(te.jsxs)("div",{children:[Object(te.jsx)(ce,{}),Object(te.jsx)("div",{className:"page-content page-container",id:"page-content",children:Object(te.jsx)("div",{className:"padding",children:Object(te.jsx)("div",{className:"row container d-flex justify-content-center",children:Object(te.jsx)("div",{className:"col-xl-6 col-md-12",children:Object(te.jsx)("div",{className:"card user-card-full w-100",children:Object(te.jsxs)("div",{className:"row m-l-0 m-r-0",children:[Object(te.jsx)("div",{className:"col-sm-4 bg-c-lite-green user-profile",children:Object(te.jsxs)("div",{className:"card-block text-center text-white",children:[Object(te.jsxs)("div",{className:"m-b-25",children:[" ",Object(te.jsx)("img",{src:"https://img.icons8.com/bubbles/100/000000/user.png",className:"img-radius",alt:"User-Profile-Image"})," "]}),Object(te.jsx)("h6",{className:"f-w-600",children:"Hembo Tingor"}),Object(te.jsx)("p",{children:"Web Designer"})," ",Object(te.jsx)("i",{className:" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"})]})}),Object(te.jsx)("div",{className:"col-sm-8",children:Object(te.jsxs)("div",{className:"card-block",children:[Object(te.jsx)("h6",{className:"m-b-20 p-b-5 b-b-default f-w-600",children:"Information"}),Object(te.jsxs)("div",{className:"row",children:[Object(te.jsxs)("div",{className:"col-sm-6",children:[Object(te.jsx)("p",{className:"m-b-10 f-w-600",children:"Email"}),Object(te.jsx)("h6",{className:"text-muted f-w-400",children:"rntng@gmail.com"})]}),Object(te.jsxs)("div",{className:"col-sm-6",children:[Object(te.jsx)("p",{className:"m-b-10 f-w-600",children:"Phone"}),Object(te.jsx)("h6",{className:"text-muted f-w-400",children:"98979989898"})]})]}),Object(te.jsx)("h6",{className:"m-b-20 m-t-40 p-b-5 b-b-default f-w-600",children:"Projects"}),Object(te.jsxs)("div",{className:"row",children:[Object(te.jsxs)("div",{className:"col-sm-6",children:[Object(te.jsx)("p",{className:"m-b-10 f-w-600",children:"Recent"}),Object(te.jsx)("h6",{className:"text-muted f-w-400",children:"Sam Disuja"})]}),Object(te.jsxs)("div",{className:"col-sm-6",children:[Object(te.jsx)("p",{className:"m-b-10 f-w-600",children:"Most Viewed"}),Object(te.jsx)("h6",{className:"text-muted f-w-400",children:"Dinoter husainm"})]})]}),Object(te.jsxs)("ul",{className:"social-link list-unstyled m-t-40 m-b-10",children:[Object(te.jsx)("li",{children:Object(te.jsx)("a",{href:"#!","data-toggle":"tooltip","data-placement":"bottom",title:"","data-original-title":"facebook","data-abc":"true",children:Object(te.jsx)("i",{className:"mdi mdi-facebook feather icon-facebook facebook","aria-hidden":"true"})})}),Object(te.jsx)("li",{children:Object(te.jsx)("a",{href:"#!","data-toggle":"tooltip","data-placement":"bottom",title:"","data-original-title":"twitter","data-abc":"true",children:Object(te.jsx)("i",{className:"mdi mdi-twitter feather icon-twitter twitter","aria-hidden":"true"})})}),Object(te.jsx)("li",{children:Object(te.jsx)("a",{href:"#!","data-toggle":"tooltip","data-placement":"bottom",title:"","data-original-title":"instagram","data-abc":"true",children:Object(te.jsx)("i",{className:"mdi mdi-instagram feather icon-instagram instagram","aria-hidden":"true"})})})]})]})})]})})})})})})]})};var ge=function(){return Object(te.jsx)(i.a,{store:J,children:Object(te.jsx)(o.a,{children:Object(te.jsx)(le,{children:Object(te.jsxs)(l.d,{children:[Object(te.jsx)(l.b,{exact:!0,path:"/signup",component:ae}),Object(te.jsx)(l.b,{exact:!0,path:"/activate/:uid/:token",component:se}),Object(te.jsx)(l.b,{exact:!0,path:"/login",component:re}),Object(te.jsx)(he,{exact:!0,path:"/dashboard",component:oe}),Object(te.jsx)(he,{exact:!0,path:"/Profile",component:fe}),Object(te.jsx)(he,{exact:!0,path:"/scrapper",component:Oe}),Object(te.jsx)(he,{exact:!0,path:"/models",component:xe}),Object(te.jsx)(l.b,{exact:!0,path:"/reset-password",component:ie}),Object(te.jsx)(l.b,{exact:!0,path:"/password/reset/confirm/:uid/:token",component:de})]})})})})};n.a.render(Object(te.jsx)(r.a.StrictMode,{children:Object(te.jsx)(ge,{})}),document.getElementById("root"))}},[[89,1,2]]]);
//# sourceMappingURL=main.f3a9c7d5.chunk.js.map