(this["webpackJsonpfloat-world"]=this["webpackJsonpfloat-world"]||[]).push([[0],{10:function(n,e,o){n.exports=o(16)},16:function(n,e,o){"use strict";o.r(e);var t,i,a,r,c,s,l,d,u,w,p=o(1),f=o.n(p),m=o(3),h=o.n(m),v=o(9),g=o(0),b=o(4),x=(o(15),o(5)),y=o(6),M=o(7),k=o(8),D=[],E=new g.o,z=new k.a,P=function(){},S=function(n){console.log(n)};function I(n){if(!n)n=new g.Eb(1e3,1e3,1e3,1e3);z.load("modern_rocking_chair/scene.gltf",(function(e){return function(e){e.scene.position.copy(n),e.scene.scale.set(60,60,60),r.add(e.scene)}(e)}),P,S)}var W=null;function j(n){z.load("deer_23/scene.gltf",(function(e){return function(e){e.scene.position.copy(n),e.scene.scale.set(5,5,5),r.add(e.scene);var o=e.scene.children[0];o.position.copy(n),W=o;var t=e.animations[0],i=new g.c(o);D.push(i),i.clipAction(t).play()}(e)}),P,S)}function C(){a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight)}function H(){requestAnimationFrame(H),function(){var n=.001*performance.now();u.position.x=20*Math.sin(n),u.position.z=20*Math.cos(n),u.rotation.x=.5*n,u.rotation.z=.51*n,l.material.uniforms.time.value+=1/60,c.render(r,a)}(),i.update(),function(){var n,e=E.getDelta(),o=Object(v.a)(D);try{for(o.s();!(n=o.n()).done;){n.value.update(e)}}catch(t){o.e(t)}finally{o.f()}}(),W&&W.position&&(W.position.z<=15&&(W.position.z+=.6),W.position.x<=4&&(W.position.x+=.08))}var B=function(){!function(){t=document.getElementById("root"),(c=new g.Hb).setPixelRatio(window.devicePixelRatio),c.setSize(window.innerWidth,window.innerHeight),t.appendChild(c.domElement),w=new g.a(12833241,1),r=new g.ob,(a=new g.db(55,window.innerWidth/window.innerHeight,1,2e4)).position.set(-144.37621838106483,87.53752760239382,-15.698458124364846),d=new g.Db;var n=new g.fb(1e4,2e4),e=(new g.xb).load("/xiong-1 .jpg",(function(n){n.wrapS=n.wrapT=g.nb}));(l=new M.a(n,{textureWidth:512,textureHeight:512,waterNormals:e,alpha:1,sunDirection:new g.Db,sunColor:13929267,waterColor:13929267,distortionScale:1,fog:void 0!==r.fog})).rotation.x=-Math.PI/2,r.add(l);var o=new y.a;o.scale.setScalar(1e4),r.add(o),r.add(w);var p=o.material.uniforms;p.turbidity.value=10,p.rayleigh.value=5,p.mieCoefficient.value=.005,p.mieDirectionalG.value=.8;var f=.49,m=.49,h=new g.cb(c);!function(){var n=Math.PI*(f-.5),e=2*Math.PI*(m-.5);d.x=Math.cos(e),d.y=Math.sin(e)*Math.sin(n),d.z=Math.sin(e)*Math.cos(n),o.material.uniforms.sunPosition.value.copy(d),l.material.uniforms.sunDirection.value.copy(d).normalize(),r.environment=h.fromScene(o).texture}();var v=new g.j(6,6,6),k=new g.T({roughness:0});u=new g.Q(v,k),(s=new x.a(a,c.domElement)).maxPolarAngle=.5*Math.PI,s.target.set(0,50,0),s.minDistance=40,s.maxDistance=150,s.update(),i=new b.a,t.appendChild(i.dom),window.addEventListener("resize",C,!1)}();for(var n=0;n<3;n++);for(var e=0;e<30;e++);return function(){new g.R({color:16777215,skinning:!0}),new g.T({color:9339051,skinning:!0});var n=(new g.xb).load("textures/wave-textures-white-background-vector_53876-60286.jpg");n.encoding=g.Ib,n.anisotropy=16;var e=(new g.xb).load("pinkCloudBlueSky.jpg");e.wrapS=e.wrapT=g.nb,e.anisotropy=16,new g.R({color:16579322,skinning:!0})}(),j(new g.Db(100,0,-20)),I(new g.Db(20,-.1,-20)),H(),document.addEventListener("keyup",(function(){!function(){var n=new g.e,e=new g.d(n);(new g.f).load("New Recording 2.m4a",(function(n){e.setBuffer(n),e.setLoop(!0),e.setVolume(1),e.play()}))}()})),f.a.createElement(f.a.Fragment,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));h.a.render(f.a.createElement(f.a.StrictMode,null,f.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.3b48203f.chunk.js.map