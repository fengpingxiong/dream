(this["webpackJsonpfloat-world"]=this["webpackJsonpfloat-world"]||[]).push([[0],{10:function(n,e,o){n.exports=o(16)},16:function(n,e,o){"use strict";o.r(e);var i,t,a,r,c,s,l,u,d,p,w=o(1),f=o.n(w),m=o(3),h=o.n(m),v=o(9),g=o(0),y=o(4),x=(o(15),o(5)),b=o(6),M=o(7),k=o(8),z=[],D=new g.o,E=new k.a,P=function(){},S=function(n){console.log(n)};function T(){E.load("game-ready_dolphin_swimming/scene.gltf",(function(n){return function(n){var e=new g.Db(4,-20,-100);n.scene.position.copy(e),n.scene.rotation.y=1.5,n.scene.scale.set(2,2,2),r.add(n.scene);var o=n.scene.children[0];o.position.copy(e),o;var i=n.animations[0],t=new g.c(o);z.push(t),t.clipAction(i).play()}(n)}),P,S)}var _=null;function I(){var n=new g.Db(-30,40,-1e3);E.load("cookie/scene.gltf",(function(e){return function(e){e.scene.position.copy(n),e.scene.scale.set(.3,.3,.3),r.add(e.scene),_=e.scene.children[0]}(e)}),P,S)}var W=null;function j(){E.load("human_animation_set/scene.gltf",(function(n){return function(n){var e=new g.Db(-30,0,-400);n.scene.position.copy(e),n.scene.scale.set(.5,.5,.5),r.add(n.scene);var o=n.scene.children[0];o.position.copy(e),W=o;var i=n.animations[0],t=new g.c(o);z.push(t),t.clipAction(i).play()}(n)}),P,S)}var C=null;function H(){E.load("deer_23/scene.gltf",(function(n){return function(n){var e=new g.Db(-30,0,-200);n.scene.position.copy(e),n.scene.scale.set(10,10,10),r.add(n.scene);var o=n.scene.children[0];o.position.copy(e),C=o;var i=n.animations[0],t=new g.c(o);z.push(t),t.clipAction(i).play()}(n)}),P,S)}function A(){E.load("modern_rocking_chair/scene.gltf",(function(n){return function(n){n.scene.position.copy(new g.Db(45,0,5)),n.scene.scale.set(15,15,15),n.scene.rotation.y=5,r.add(n.scene)}(n)}),P,S)}function B(){a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight)}function R(){requestAnimationFrame(R),function(){var n=.001*performance.now();d.position.x=20*Math.sin(n),d.position.z=20*Math.cos(n),d.rotation.x=.5*n,d.rotation.z=.51*n,l.material.uniforms.time.value+=1/60,c.render(r,a)}(),t.update(),function(){var n,e=D.getDelta(),o=Object(v.a)(z);try{for(o.s();!(n=o.n()).done;){n.value.update(e)}}catch(i){o.e(i)}finally{o.f()}}(),C&&C.position&&(C.position.z<=150&&(C.position.z+=.49),C.position.x<=3&&(C.position.x+=.1)),W&&W.position&&(W.position.z<=5500&&(W.position.z+=2),W.position.x<=55&&(W.position.x+=.3)),_&&_.position&&(_.position.z<=5500&&(_.position.z+=4),_.position.x<=55&&(_.position.x+=.3))}setTimeout((function(){H(),T()}),2500),setTimeout((function(){j()}),10500),setTimeout((function(){I()}),21500);var L=function(){return function(){i=document.getElementById("root"),(c=new g.Hb).setPixelRatio(window.devicePixelRatio),c.setSize(window.innerWidth,window.innerHeight),i.appendChild(c.domElement),p=new g.a(12833241,1),r=new g.ob,a=new g.db(85,window.innerWidth/window.innerHeight,1,2e4),u=new g.Db;var n=new g.fb(1e4,2e4),e=(new g.xb).load("waternormals.jpg",(function(n){n.wrapS=n.wrapT=g.nb}));(l=new M.a(n,{textureWidth:512,textureHeight:512,waterNormals:e,alpha:1,sunDirection:new g.Db,sunColor:15130325,waterColor:15130325,distortionScale:1})).rotation.x=-Math.PI/2,r.add(l);var o=new b.a;o.scale.setScalar(1e4),r.add(o),r.add(p);var w=o.material.uniforms;w.turbidity.value=1,w.rayleigh.value=5,w.mieCoefficient.value=.005,w.mieDirectionalG.value=.8;var f=.471,m=.1258,h=new g.cb(c);!function(){var n=Math.PI*(f-.5),e=2*Math.PI*(m-.5);u.x=Math.cos(e),u.y=Math.sin(e)*Math.sin(n),u.z=Math.sin(e)*Math.cos(n),o.material.uniforms.sunPosition.value.copy(u),l.material.uniforms.sunDirection.value.copy(u).normalize(),r.environment=h.fromScene(o).texture}();var v=new g.j(0,0),k=new g.T({roughness:0});d=new g.Q(v,k),(s=new x.a(a,c.domElement)).maxPolarAngle=.495*Math.PI,s.target.set(0,10,0),s.minDistance=40,s.maxDistance=500,s.update(),t=new y.a,i.appendChild(t.dom),window.addEventListener("resize",B,!1)}(),function(){new g.R({color:16777215,skinning:!0}),new g.T({color:9339051,skinning:!0});var n=(new g.xb).load("textures/wave-textures-white-background-vector_53876-60286.jpg");n.encoding=g.Ib,n.anisotropy=16;var e=(new g.xb).load("pinkCloudBlueSky.jpg");e.wrapS=e.wrapT=g.nb,e.anisotropy=16,new g.T({envMap:e,skinning:!0})}(),A(),R(),document.addEventListener("keyup",(function(){!function(){var n=new g.e,e=new g.d(n);(new g.f).load("New Recording 2.m4a",(function(n){e.setBuffer(n),e.setLoop(!0),e.setVolume(1),e.play()}))}()})),f.a.createElement(f.a.Fragment,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));h.a.render(f.a.createElement(f.a.StrictMode,null,f.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.d7d3bf12.chunk.js.map