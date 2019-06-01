!function(t){var i={};function n(s){if(i[s])return i[s].exports;var e=i[s]={i:s,l:!1,exports:{}};return t[s].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,s){n.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,i){if(1&i&&(t=n(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var e in t)n.d(s,e,function(i){return t[i]}.bind(null,e));return s},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s=2)}([function(t,i,n){const{Vector3:s}=n(1);t.exports=function(t,i,n,e){t=t.slice(0),i=i.slice(0),n=n.slice(0);const r={},h=i=>{const n=i.toArray();let s=r;return n.forEach((e,r)=>{r==n.length-1?void 0===s[e]&&(t.push(i.x,i.y,i.z),s[e]=t.length/3-1):s[e]=s[e]||{},s=s[e]}),s};for(var o=0;o<i.length;o+=3){let r=new s(n[o],n[o+1],n[o+2]),a=()=>{const u=[0,1,2].map(n=>{const e=3*i[o+n];return new s(t[e],t[e+1],t[e+2])}),c=u.map((t,i)=>({vecIndices:[i,(i+1)%3],deltaVec:(new s).subVectors(u[(i+1)%3],t)}));let l=!1;for(var f=0;f<3;f++)if(c[f].deltaVec.length()>e){l=!0;break}if(!l)return;let y=c.sort((t,i)=>t.deltaVec.length()>i.deltaVec.length()?-1:1).slice(0,2),x=null;const _={};y.forEach(t=>{t.vecIndices.forEach(t=>{_[t]=_[t]||0,_[t]++,2==_[t]&&(x=t)})});const d=(y=y.sort((t,i)=>{return(new s).crossVectors(t.deltaVec,i.deltaVec).angleTo(r)<Math.PI/2?-1:1})).map(t=>{const i=t.deltaVec.clone().multiplyScalar(.5),n=u[t.vecIndices[0]].clone();return n.add(i),h(n)}),m=o+(x+1)%3,z=o+(x+2)%3,p=i[m],w=i[z],M=d[0],g=d[1];return i[m]=g,i[z]=M,i.push(g,p,w),i.push(M,g,w),[0,1].forEach(()=>{n.push(r.x,r.y,r.z)}),a()};a()}return{verts:t,faces:i,facenormals:n}}},function(t,i,n){"use strict";n.r(i);var s,e,r,h,o={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){for(var t=[],i=0;i<256;i++)t[i]=(i<16?"0":"")+i.toString(16);return function(){var i=4294967295*Math.random()|0,n=4294967295*Math.random()|0,s=4294967295*Math.random()|0,e=4294967295*Math.random()|0;return(t[255&i]+t[i>>8&255]+t[i>>16&255]+t[i>>24&255]+"-"+t[255&n]+t[n>>8&255]+"-"+t[n>>16&15|64]+t[n>>24&255]+"-"+t[63&s|128]+t[s>>8&255]+"-"+t[s>>16&255]+t[s>>24&255]+t[255&e]+t[e>>8&255]+t[e>>16&255]+t[e>>24&255]).toUpperCase()}}(),clamp:function(t,i,n){return Math.max(i,Math.min(n,t))},euclideanModulo:function(t,i){return(t%i+i)%i},mapLinear:function(t,i,n,s,e){return s+(t-i)*(e-s)/(n-i)},lerp:function(t,i,n){return(1-n)*t+n*i},smoothstep:function(t,i,n){return t<=i?0:t>=n?1:(t=(t-i)/(n-i))*t*(3-2*t)},smootherstep:function(t,i,n){return t<=i?0:t>=n?1:(t=(t-i)/(n-i))*t*t*(t*(6*t-15)+10)},randInt:function(t,i){return t+Math.floor(Math.random()*(i-t+1))},randFloat:function(t,i){return t+Math.random()*(i-t)},randFloatSpread:function(t){return t*(.5-Math.random())},degToRad:function(t){return t*o.DEG2RAD},radToDeg:function(t){return t*o.RAD2DEG},isPowerOfTwo:function(t){return 0==(t&t-1)&&0!==t},ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:function(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}};function a(t,i,n,s){this._x=t||0,this._y=i||0,this._z=n||0,this._w=void 0!==s?s:1}function u(t,i,n){this.x=t||0,this.y=i||0,this.z=n||0}Object.assign(a,{slerp:function(t,i,n,s){return n.copy(t).slerp(i,s)},slerpFlat:function(t,i,n,s,e,r,h){var o=n[s+0],a=n[s+1],u=n[s+2],c=n[s+3],l=e[r+0],f=e[r+1],y=e[r+2],x=e[r+3];if(c!==x||o!==l||a!==f||u!==y){var _=1-h,d=o*l+a*f+u*y+c*x,m=d>=0?1:-1,z=1-d*d;if(z>Number.EPSILON){var p=Math.sqrt(z),w=Math.atan2(p,d*m);_=Math.sin(_*w)/p,h=Math.sin(h*w)/p}var M=h*m;if(o=o*_+l*M,a=a*_+f*M,u=u*_+y*M,c=c*_+x*M,_===1-h){var g=1/Math.sqrt(o*o+a*a+u*u+c*c);o*=g,a*=g,u*=g,c*=g}}t[i]=o,t[i+1]=a,t[i+2]=u,t[i+3]=c}}),Object.defineProperties(a.prototype,{x:{get:function(){return this._x},set:function(t){this._x=t,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(t){this._y=t,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(t){this._z=t,this.onChangeCallback()}},w:{get:function(){return this._w},set:function(t){this._w=t,this.onChangeCallback()}}}),Object.assign(a.prototype,{isQuaternion:!0,set:function(t,i,n,s){return this._x=t,this._y=i,this._z=n,this._w=s,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this.onChangeCallback(),this},setFromEuler:function(t,i){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var n=t._x,s=t._y,e=t._z,r=t.order,h=Math.cos,o=Math.sin,a=h(n/2),u=h(s/2),c=h(e/2),l=o(n/2),f=o(s/2),y=o(e/2);return"XYZ"===r?(this._x=l*u*c+a*f*y,this._y=a*f*c-l*u*y,this._z=a*u*y+l*f*c,this._w=a*u*c-l*f*y):"YXZ"===r?(this._x=l*u*c+a*f*y,this._y=a*f*c-l*u*y,this._z=a*u*y-l*f*c,this._w=a*u*c+l*f*y):"ZXY"===r?(this._x=l*u*c-a*f*y,this._y=a*f*c+l*u*y,this._z=a*u*y+l*f*c,this._w=a*u*c-l*f*y):"ZYX"===r?(this._x=l*u*c-a*f*y,this._y=a*f*c+l*u*y,this._z=a*u*y-l*f*c,this._w=a*u*c+l*f*y):"YZX"===r?(this._x=l*u*c+a*f*y,this._y=a*f*c+l*u*y,this._z=a*u*y-l*f*c,this._w=a*u*c-l*f*y):"XZY"===r&&(this._x=l*u*c-a*f*y,this._y=a*f*c-l*u*y,this._z=a*u*y+l*f*c,this._w=a*u*c+l*f*y),!1!==i&&this.onChangeCallback(),this},setFromAxisAngle:function(t,i){var n=i/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this.onChangeCallback(),this},setFromRotationMatrix:function(t){var i,n=t.elements,s=n[0],e=n[4],r=n[8],h=n[1],o=n[5],a=n[9],u=n[2],c=n[6],l=n[10],f=s+o+l;return f>0?(i=.5/Math.sqrt(f+1),this._w=.25/i,this._x=(c-a)*i,this._y=(r-u)*i,this._z=(h-e)*i):s>o&&s>l?(i=2*Math.sqrt(1+s-o-l),this._w=(c-a)/i,this._x=.25*i,this._y=(e+h)/i,this._z=(r+u)/i):o>l?(i=2*Math.sqrt(1+o-s-l),this._w=(r-u)/i,this._x=(e+h)/i,this._y=.25*i,this._z=(a+c)/i):(i=2*Math.sqrt(1+l-s-o),this._w=(h-e)/i,this._x=(r+u)/i,this._y=(a+c)/i,this._z=.25*i),this.onChangeCallback(),this},setFromUnitVectors:function(t,i){var n=t.dot(i)+1;return n<1e-6?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=n),this.normalize()},angleTo:function(t){return 2*Math.acos(Math.abs(o.clamp(this.dot(t),-1,1)))},rotateTowards:function(t,i){var n=this.angleTo(t);if(0===n)return this;var s=Math.min(1,i/n);return this.slerp(t,s),this},inverse:function(){return this.conjugate()},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this.onChangeCallback(),this},multiply:function(t,i){return void 0!==i?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,i)):this.multiplyQuaternions(this,t)},premultiply:function(t){return this.multiplyQuaternions(t,this)},multiplyQuaternions:function(t,i){var n=t._x,s=t._y,e=t._z,r=t._w,h=i._x,o=i._y,a=i._z,u=i._w;return this._x=n*u+r*h+s*a-e*o,this._y=s*u+r*o+e*h-n*a,this._z=e*u+r*a+n*o-s*h,this._w=r*u-n*h-s*o-e*a,this.onChangeCallback(),this},slerp:function(t,i){if(0===i)return this;if(1===i)return this.copy(t);var n=this._x,s=this._y,e=this._z,r=this._w,h=r*t._w+n*t._x+s*t._y+e*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=r,this._x=n,this._y=s,this._z=e,this;var o=1-h*h;if(o<=Number.EPSILON){var a=1-i;return this._w=a*r+i*this._w,this._x=a*n+i*this._x,this._y=a*s+i*this._y,this._z=a*e+i*this._z,this.normalize()}var u=Math.sqrt(o),c=Math.atan2(u,h),l=Math.sin((1-i)*c)/u,f=Math.sin(i*c)/u;return this._w=r*l+this._w*f,this._x=n*l+this._x*f,this._y=s*l+this._y*f,this._z=e*l+this._z*f,this.onChangeCallback(),this},equals:function(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w},fromArray:function(t,i){return void 0===i&&(i=0),this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this.onChangeCallback(),this},toArray:function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t},onChange:function(t){return this.onChangeCallback=t,this},onChangeCallback:function(){}}),n.d(i,"Vector3",function(){return u}),Object.assign(u.prototype,{isVector3:!0,set:function(t,i,n){return this.x=t,this.y=i,this.z=n,this},setScalar:function(t){return this.x=t,this.y=t,this.z=t,this},setX:function(t){return this.x=t,this},setY:function(t){return this.y=t,this},setZ:function(t){return this.z=t,this},setComponent:function(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this},getComponent:function(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}},clone:function(){return new this.constructor(this.x,this.y,this.z)},copy:function(t){return this.x=t.x,this.y=t.y,this.z=t.z,this},add:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,i)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)},addScalar:function(t){return this.x+=t,this.y+=t,this.z+=t,this},addVectors:function(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this},addScaledVector:function(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this},sub:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,i)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)},subScalar:function(t){return this.x-=t,this.y-=t,this.z-=t,this},subVectors:function(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this},multiply:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,i)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)},multiplyScalar:function(t){return this.x*=t,this.y*=t,this.z*=t,this},multiplyVectors:function(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this},applyEuler:(h=new a,function(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(h.setFromEuler(t))}),applyAxisAngle:function(){var t=new a;return function(i,n){return this.applyQuaternion(t.setFromAxisAngle(i,n))}}(),applyMatrix3:function(t){var i=this.x,n=this.y,s=this.z,e=t.elements;return this.x=e[0]*i+e[3]*n+e[6]*s,this.y=e[1]*i+e[4]*n+e[7]*s,this.z=e[2]*i+e[5]*n+e[8]*s,this},applyMatrix4:function(t){var i=this.x,n=this.y,s=this.z,e=t.elements,r=1/(e[3]*i+e[7]*n+e[11]*s+e[15]);return this.x=(e[0]*i+e[4]*n+e[8]*s+e[12])*r,this.y=(e[1]*i+e[5]*n+e[9]*s+e[13])*r,this.z=(e[2]*i+e[6]*n+e[10]*s+e[14])*r,this},applyQuaternion:function(t){var i=this.x,n=this.y,s=this.z,e=t.x,r=t.y,h=t.z,o=t.w,a=o*i+r*s-h*n,u=o*n+h*i-e*s,c=o*s+e*n-r*i,l=-e*i-r*n-h*s;return this.x=a*o+l*-e+u*-h-c*-r,this.y=u*o+l*-r+c*-e-a*-h,this.z=c*o+l*-h+a*-r-u*-e,this},project:function(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)},unproject:function(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)},transformDirection:function(t){var i=this.x,n=this.y,s=this.z,e=t.elements;return this.x=e[0]*i+e[4]*n+e[8]*s,this.y=e[1]*i+e[5]*n+e[9]*s,this.z=e[2]*i+e[6]*n+e[10]*s,this.normalize()},divide:function(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this},divideScalar:function(t){return this.multiplyScalar(1/t)},min:function(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this},max:function(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this},clamp:function(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this.z=Math.max(t.z,Math.min(i.z,this.z)),this},clampScalar:(e=new u,r=new u,function(t,i){return e.set(t,t,t),r.set(i,i,i),this.clamp(e,r)}),clampLength:function(t,i){var n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(i,n)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(t){return this.x*t.x+this.y*t.y+this.z*t.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},manhattanLength:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(t){return this.normalize().multiplyScalar(t)},lerp:function(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this},lerpVectors:function(t,i,n){return this.subVectors(i,t).multiplyScalar(n).add(t)},cross:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,i)):this.crossVectors(this,t)},crossVectors:function(t,i){var n=t.x,s=t.y,e=t.z,r=i.x,h=i.y,o=i.z;return this.x=s*o-e*h,this.y=e*r-n*o,this.z=n*h-s*r,this},projectOnVector:function(t){var i=t.dot(this)/t.lengthSq();return this.copy(t).multiplyScalar(i)},projectOnPlane:(s=new u,function(t){return s.copy(this).projectOnVector(t),this.sub(s)}),reflect:function(){var t=new u;return function(i){return this.sub(t.copy(i).multiplyScalar(2*this.dot(i)))}}(),angleTo:function(t){var i=this.dot(t)/Math.sqrt(this.lengthSq()*t.lengthSq());return Math.acos(o.clamp(i,-1,1))},distanceTo:function(t){return Math.sqrt(this.distanceToSquared(t))},distanceToSquared:function(t){var i=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return i*i+n*n+s*s},manhattanDistanceTo:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)},setFromSpherical:function(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)},setFromSphericalCoords:function(t,i,n){var s=Math.sin(i)*t;return this.x=s*Math.sin(n),this.y=Math.cos(i)*t,this.z=s*Math.cos(n),this},setFromCylindrical:function(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)},setFromCylindricalCoords:function(t,i,n){return this.x=t*Math.sin(i),this.y=n,this.z=t*Math.cos(i),this},setFromMatrixPosition:function(t){var i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this},setFromMatrixScale:function(t){var i=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=n,this.z=s,this},setFromMatrixColumn:function(t,i){return this.fromArray(t.elements,4*i)},equals:function(t){return t.x===this.x&&t.y===this.y&&t.z===this.z},fromArray:function(t,i){return void 0===i&&(i=0),this.x=t[i],this.y=t[i+1],this.z=t[i+2],this},toArray:function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t},fromBufferAttribute:function(t,i,n){return void 0!==n&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}})},function(t,i,n){const{PerspectiveCamera:s,Scene:e,WebGLRenderer:r,Vector3:h,Face3:o,MeshBasicMaterial:a,Mesh:u,Geometry:c,Points:l,PointsMaterial:f,BufferGeometry:y,Float32BufferAttribute:x,Uint32BufferAttribute:_}=n(3),d=n(0);class m{constructor(){this.container=window.document.body,this.init(),this.animate()}onWindowResize(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=this.renderer.domElement.clientWidth/this.renderer.domElement.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.renderer.domElement.clientWidth,this.renderer.domElement.clientHeight)}init(){this.scene=new e,this.camera=new s(45,window.innerWidth/window.innerHeight,1,1e3),this.camera.position.z=20,this.camera.lookAt(new h(0,0,0)),this.camera.updateMatrixWorld(),this.renderer=new r,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.container.appendChild(this.renderer.domElement);const t=new c;t.vertices.push(new h(-1,5,0),new h(-1,-5,0),new h(1,-5,0),new h(1,5,0)),t.faces.push(new o(0,1,2),new o(0,2,3)),t.computeBoundingSphere(),t.computeBoundingBox(),t.computeFaceNormals(),t.computeVertexNormals();const i=t=>{const i=[];let n=new u(t,new a({wireframe:!0,color:16777215}));return i.push(n),n=new u(t,new a({transparent:!0,opacity:.2,color:16777215})),i.push(n),n=new l(t,new f({size:.4,color:16777215})),i.push(n),i.forEach(t=>{this.scene.add(t)}),i};i(t).forEach(t=>{t.position.x=-10});const n=new y,m=d(t.vertices.map(t=>t.toArray()).flat(),t.faces.map(t=>[t.a,t.b,t.c]).flat(),t.faces.map(t=>t.normal.toArray()).flat(),2);n.addAttribute("position",new x(Float32Array.from(m.verts),3)),n.setIndex(new _(Uint32Array.from(m.faces),1)),i(n).forEach(t=>{t.position.x=10}),window.addEventListener("resize",()=>{this.onWindowResize()},!1)}animate(){requestAnimationFrame(()=>{this.animate()}),this.renderer.render(this.scene,this.camera)}}window.addEventListener("DOMContentLoaded",function(){window.demo=new m})},function(t,i,n){t.exports=n(4)(1)},function(t,i){t.exports=vendor}]);
//# sourceMappingURL=demo.js.map