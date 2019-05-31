!function(t){var i={};function s(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=i,s.d=function(t,i,n){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)s.d(n,r,function(i){return t[i]}.bind(null,r));return n},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="/",s(s.s=0)}([function(t,i,s){const{Vector3:n}=s(4);t.exports=function(t,i,s){t=t.slice(0),i=i.slice(0);const r={};for(var h=0;h<i.length;h+=3){let e=()=>{const o=[0,1,2].map(s=>{const r=3*i[h+s];return new n(t[r],t[r+1],t[r+2])}),a=o.map((t,i)=>({vecIndices:[i,(i+1)%3],deltaVec:(new n).subVectors(o[(i+1)%3],t)}));let u=!1;for(var c=0;c<3;c++)if(a[c].deltaVec.length()>s){u=!0;break}if(!u)return;let l=a.sort((t,i)=>t.deltaVec.length()>i.deltaVec.length()?-1:1).slice(0,2),y=null;const f={};l.forEach(t=>{t.vecIndices.forEach(t=>{f[t]=f[t]||0,f[t]++,2==f[t]&&(y=t)})});const _=t=>{Math.max(o[y].angleTo(o[t.vecIndices[0]]),o[y].angleTo(o[t.vecIndices[1]]))};l=l.sort((t,i)=>_(t)<_(i)?-1:1);const x=l.map(i=>{const s=i.deltaVec.clone().multiplyScalar(.5),n=o[i.vecIndices[0]].clone();return n.add(s),(i=>{const s=i.toArray();let n=r;return s.forEach((r,h)=>{h==s.length-1?void 0===n[r]&&(t.push(i.x,i.y,i.z),n[r]=t.length/3-1):n[r]=n[r]||{},n=n[r]}),n})(n)}),z=h+(y+1)%3,d=h+(y+2)%3,p=i[z],m=i[d],M=x[0],w=x[1];return i[z]=w,i[d]=M,i.push(w,p,m),i.push(M,w,m),e()};e()}return{verts:t,faces:i}}},,,,function(t,i,s){"use strict";s.r(i);var n,r,h,e,o={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){for(var t=[],i=0;i<256;i++)t[i]=(i<16?"0":"")+i.toString(16);return function(){var i=4294967295*Math.random()|0,s=4294967295*Math.random()|0,n=4294967295*Math.random()|0,r=4294967295*Math.random()|0;return(t[255&i]+t[i>>8&255]+t[i>>16&255]+t[i>>24&255]+"-"+t[255&s]+t[s>>8&255]+"-"+t[s>>16&15|64]+t[s>>24&255]+"-"+t[63&n|128]+t[n>>8&255]+"-"+t[n>>16&255]+t[n>>24&255]+t[255&r]+t[r>>8&255]+t[r>>16&255]+t[r>>24&255]).toUpperCase()}}(),clamp:function(t,i,s){return Math.max(i,Math.min(s,t))},euclideanModulo:function(t,i){return(t%i+i)%i},mapLinear:function(t,i,s,n,r){return n+(t-i)*(r-n)/(s-i)},lerp:function(t,i,s){return(1-s)*t+s*i},smoothstep:function(t,i,s){return t<=i?0:t>=s?1:(t=(t-i)/(s-i))*t*(3-2*t)},smootherstep:function(t,i,s){return t<=i?0:t>=s?1:(t=(t-i)/(s-i))*t*t*(t*(6*t-15)+10)},randInt:function(t,i){return t+Math.floor(Math.random()*(i-t+1))},randFloat:function(t,i){return t+Math.random()*(i-t)},randFloatSpread:function(t){return t*(.5-Math.random())},degToRad:function(t){return t*o.DEG2RAD},radToDeg:function(t){return t*o.RAD2DEG},isPowerOfTwo:function(t){return 0==(t&t-1)&&0!==t},ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:function(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}};function a(t,i,s,n){this._x=t||0,this._y=i||0,this._z=s||0,this._w=void 0!==n?n:1}function u(t,i,s){this.x=t||0,this.y=i||0,this.z=s||0}Object.assign(a,{slerp:function(t,i,s,n){return s.copy(t).slerp(i,n)},slerpFlat:function(t,i,s,n,r,h,e){var o=s[n+0],a=s[n+1],u=s[n+2],c=s[n+3],l=r[h+0],y=r[h+1],f=r[h+2],_=r[h+3];if(c!==_||o!==l||a!==y||u!==f){var x=1-e,z=o*l+a*y+u*f+c*_,d=z>=0?1:-1,p=1-z*z;if(p>Number.EPSILON){var m=Math.sqrt(p),M=Math.atan2(m,z*d);x=Math.sin(x*M)/m,e=Math.sin(e*M)/m}var w=e*d;if(o=o*x+l*w,a=a*x+y*w,u=u*x+f*w,c=c*x+_*w,x===1-e){var g=1/Math.sqrt(o*o+a*a+u*u+c*c);o*=g,a*=g,u*=g,c*=g}}t[i]=o,t[i+1]=a,t[i+2]=u,t[i+3]=c}}),Object.defineProperties(a.prototype,{x:{get:function(){return this._x},set:function(t){this._x=t,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(t){this._y=t,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(t){this._z=t,this.onChangeCallback()}},w:{get:function(){return this._w},set:function(t){this._w=t,this.onChangeCallback()}}}),Object.assign(a.prototype,{isQuaternion:!0,set:function(t,i,s,n){return this._x=t,this._y=i,this._z=s,this._w=n,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this.onChangeCallback(),this},setFromEuler:function(t,i){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var s=t._x,n=t._y,r=t._z,h=t.order,e=Math.cos,o=Math.sin,a=e(s/2),u=e(n/2),c=e(r/2),l=o(s/2),y=o(n/2),f=o(r/2);return"XYZ"===h?(this._x=l*u*c+a*y*f,this._y=a*y*c-l*u*f,this._z=a*u*f+l*y*c,this._w=a*u*c-l*y*f):"YXZ"===h?(this._x=l*u*c+a*y*f,this._y=a*y*c-l*u*f,this._z=a*u*f-l*y*c,this._w=a*u*c+l*y*f):"ZXY"===h?(this._x=l*u*c-a*y*f,this._y=a*y*c+l*u*f,this._z=a*u*f+l*y*c,this._w=a*u*c-l*y*f):"ZYX"===h?(this._x=l*u*c-a*y*f,this._y=a*y*c+l*u*f,this._z=a*u*f-l*y*c,this._w=a*u*c+l*y*f):"YZX"===h?(this._x=l*u*c+a*y*f,this._y=a*y*c+l*u*f,this._z=a*u*f-l*y*c,this._w=a*u*c-l*y*f):"XZY"===h&&(this._x=l*u*c-a*y*f,this._y=a*y*c-l*u*f,this._z=a*u*f+l*y*c,this._w=a*u*c+l*y*f),!1!==i&&this.onChangeCallback(),this},setFromAxisAngle:function(t,i){var s=i/2,n=Math.sin(s);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(s),this.onChangeCallback(),this},setFromRotationMatrix:function(t){var i,s=t.elements,n=s[0],r=s[4],h=s[8],e=s[1],o=s[5],a=s[9],u=s[2],c=s[6],l=s[10],y=n+o+l;return y>0?(i=.5/Math.sqrt(y+1),this._w=.25/i,this._x=(c-a)*i,this._y=(h-u)*i,this._z=(e-r)*i):n>o&&n>l?(i=2*Math.sqrt(1+n-o-l),this._w=(c-a)/i,this._x=.25*i,this._y=(r+e)/i,this._z=(h+u)/i):o>l?(i=2*Math.sqrt(1+o-n-l),this._w=(h-u)/i,this._x=(r+e)/i,this._y=.25*i,this._z=(a+c)/i):(i=2*Math.sqrt(1+l-n-o),this._w=(e-r)/i,this._x=(h+u)/i,this._y=(a+c)/i,this._z=.25*i),this.onChangeCallback(),this},setFromUnitVectors:function(t,i){var s=t.dot(i)+1;return s<1e-6?(s=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=s):(this._x=0,this._y=-t.z,this._z=t.y,this._w=s)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=s),this.normalize()},angleTo:function(t){return 2*Math.acos(Math.abs(o.clamp(this.dot(t),-1,1)))},rotateTowards:function(t,i){var s=this.angleTo(t);if(0===s)return this;var n=Math.min(1,i/s);return this.slerp(t,n),this},inverse:function(){return this.conjugate()},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this.onChangeCallback(),this},multiply:function(t,i){return void 0!==i?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,i)):this.multiplyQuaternions(this,t)},premultiply:function(t){return this.multiplyQuaternions(t,this)},multiplyQuaternions:function(t,i){var s=t._x,n=t._y,r=t._z,h=t._w,e=i._x,o=i._y,a=i._z,u=i._w;return this._x=s*u+h*e+n*a-r*o,this._y=n*u+h*o+r*e-s*a,this._z=r*u+h*a+s*o-n*e,this._w=h*u-s*e-n*o-r*a,this.onChangeCallback(),this},slerp:function(t,i){if(0===i)return this;if(1===i)return this.copy(t);var s=this._x,n=this._y,r=this._z,h=this._w,e=h*t._w+s*t._x+n*t._y+r*t._z;if(e<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,e=-e):this.copy(t),e>=1)return this._w=h,this._x=s,this._y=n,this._z=r,this;var o=1-e*e;if(o<=Number.EPSILON){var a=1-i;return this._w=a*h+i*this._w,this._x=a*s+i*this._x,this._y=a*n+i*this._y,this._z=a*r+i*this._z,this.normalize()}var u=Math.sqrt(o),c=Math.atan2(u,e),l=Math.sin((1-i)*c)/u,y=Math.sin(i*c)/u;return this._w=h*l+this._w*y,this._x=s*l+this._x*y,this._y=n*l+this._y*y,this._z=r*l+this._z*y,this.onChangeCallback(),this},equals:function(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w},fromArray:function(t,i){return void 0===i&&(i=0),this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this.onChangeCallback(),this},toArray:function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t},onChange:function(t){return this.onChangeCallback=t,this},onChangeCallback:function(){}}),s.d(i,"Vector3",function(){return u}),Object.assign(u.prototype,{isVector3:!0,set:function(t,i,s){return this.x=t,this.y=i,this.z=s,this},setScalar:function(t){return this.x=t,this.y=t,this.z=t,this},setX:function(t){return this.x=t,this},setY:function(t){return this.y=t,this},setZ:function(t){return this.z=t,this},setComponent:function(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this},getComponent:function(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}},clone:function(){return new this.constructor(this.x,this.y,this.z)},copy:function(t){return this.x=t.x,this.y=t.y,this.z=t.z,this},add:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,i)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)},addScalar:function(t){return this.x+=t,this.y+=t,this.z+=t,this},addVectors:function(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this},addScaledVector:function(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this},sub:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,i)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)},subScalar:function(t){return this.x-=t,this.y-=t,this.z-=t,this},subVectors:function(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this},multiply:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,i)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)},multiplyScalar:function(t){return this.x*=t,this.y*=t,this.z*=t,this},multiplyVectors:function(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this},applyEuler:(e=new a,function(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(e.setFromEuler(t))}),applyAxisAngle:function(){var t=new a;return function(i,s){return this.applyQuaternion(t.setFromAxisAngle(i,s))}}(),applyMatrix3:function(t){var i=this.x,s=this.y,n=this.z,r=t.elements;return this.x=r[0]*i+r[3]*s+r[6]*n,this.y=r[1]*i+r[4]*s+r[7]*n,this.z=r[2]*i+r[5]*s+r[8]*n,this},applyMatrix4:function(t){var i=this.x,s=this.y,n=this.z,r=t.elements,h=1/(r[3]*i+r[7]*s+r[11]*n+r[15]);return this.x=(r[0]*i+r[4]*s+r[8]*n+r[12])*h,this.y=(r[1]*i+r[5]*s+r[9]*n+r[13])*h,this.z=(r[2]*i+r[6]*s+r[10]*n+r[14])*h,this},applyQuaternion:function(t){var i=this.x,s=this.y,n=this.z,r=t.x,h=t.y,e=t.z,o=t.w,a=o*i+h*n-e*s,u=o*s+e*i-r*n,c=o*n+r*s-h*i,l=-r*i-h*s-e*n;return this.x=a*o+l*-r+u*-e-c*-h,this.y=u*o+l*-h+c*-r-a*-e,this.z=c*o+l*-e+a*-h-u*-r,this},project:function(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)},unproject:function(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)},transformDirection:function(t){var i=this.x,s=this.y,n=this.z,r=t.elements;return this.x=r[0]*i+r[4]*s+r[8]*n,this.y=r[1]*i+r[5]*s+r[9]*n,this.z=r[2]*i+r[6]*s+r[10]*n,this.normalize()},divide:function(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this},divideScalar:function(t){return this.multiplyScalar(1/t)},min:function(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this},max:function(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this},clamp:function(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this.z=Math.max(t.z,Math.min(i.z,this.z)),this},clampScalar:(r=new u,h=new u,function(t,i){return r.set(t,t,t),h.set(i,i,i),this.clamp(r,h)}),clampLength:function(t,i){var s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(i,s)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(t){return this.x*t.x+this.y*t.y+this.z*t.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},manhattanLength:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(t){return this.normalize().multiplyScalar(t)},lerp:function(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this},lerpVectors:function(t,i,s){return this.subVectors(i,t).multiplyScalar(s).add(t)},cross:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,i)):this.crossVectors(this,t)},crossVectors:function(t,i){var s=t.x,n=t.y,r=t.z,h=i.x,e=i.y,o=i.z;return this.x=n*o-r*e,this.y=r*h-s*o,this.z=s*e-n*h,this},projectOnVector:function(t){var i=t.dot(this)/t.lengthSq();return this.copy(t).multiplyScalar(i)},projectOnPlane:(n=new u,function(t){return n.copy(this).projectOnVector(t),this.sub(n)}),reflect:function(){var t=new u;return function(i){return this.sub(t.copy(i).multiplyScalar(2*this.dot(i)))}}(),angleTo:function(t){var i=this.dot(t)/Math.sqrt(this.lengthSq()*t.lengthSq());return Math.acos(o.clamp(i,-1,1))},distanceTo:function(t){return Math.sqrt(this.distanceToSquared(t))},distanceToSquared:function(t){var i=this.x-t.x,s=this.y-t.y,n=this.z-t.z;return i*i+s*s+n*n},manhattanDistanceTo:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)},setFromSpherical:function(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)},setFromSphericalCoords:function(t,i,s){var n=Math.sin(i)*t;return this.x=n*Math.sin(s),this.y=Math.cos(i)*t,this.z=n*Math.cos(s),this},setFromCylindrical:function(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)},setFromCylindricalCoords:function(t,i,s){return this.x=t*Math.sin(i),this.y=s,this.z=t*Math.cos(i),this},setFromMatrixPosition:function(t){var i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this},setFromMatrixScale:function(t){var i=this.setFromMatrixColumn(t,0).length(),s=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=s,this.z=n,this},setFromMatrixColumn:function(t,i){return this.fromArray(t.elements,4*i)},equals:function(t){return t.x===this.x&&t.y===this.y&&t.z===this.z},fromArray:function(t,i){return void 0===i&&(i=0),this.x=t[i],this.y=t[i+1],this.z=t[i+2],this},toArray:function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t},fromBufferAttribute:function(t,i,s){return void 0!==s&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}})}]);
//# sourceMappingURL=homogenize-triangles.js.map