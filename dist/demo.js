!function(t){var i={};function e(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(n,s,function(i){return t[i]}.bind(null,s));return n},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="/",e(e.s=2)}([function(t,i,e){const{Vector3:n}=e(1);t.exports=function(t,i,e,s){t=t.slice(0),i=i.slice(0),e=e.slice(0);const r={},h=i=>{const e=i.toArray();let n=r;return e.forEach((s,r)=>{r==e.length-1?void 0===n[s]&&(t.push(i.x,i.y,i.z),n[s]=t.length/3-1):n[s]=n[s]||{},n=n[s]}),n};for(var o=0;o<i.length;o+=3){let r=new n(e[o],e[o+1],e[o+2]),a=()=>{const c=[0,1,2].map(e=>{const s=3*i[o+e];return new n(t[s],t[s+1],t[s+2])}),u=c.map((t,i)=>({vecIndices:[i,(i+1)%3],deltaVec:(new n).subVectors(c[(i+1)%3],t)}));let l=!1;for(var y=0;y<3;y++)if(u[y].deltaVec.length()>s){l=!0;break}if(!l)return;let f=u.sort((t,i)=>t.deltaVec.length()>i.deltaVec.length()?-1:1).slice(0,2),d=null;const x={};f.forEach(t=>{t.vecIndices.forEach(t=>{x[t]=x[t]||0,x[t]++,2==x[t]&&(d=t)})});const m=(f=f.sort((t,i)=>{return(new n).crossVectors(t.deltaVec,i.deltaVec).angleTo(r)<Math.PI/2?-1:1})).map(t=>{const i=t.deltaVec.clone().multiplyScalar(.5),e=c[t.vecIndices[0]].clone();return e.add(i),h(e)}),_=o+(d+1)%3,p=o+(d+2)%3,z=i[_],w=i[p],M=m[0],g=m[1];return i[_]=g,i[p]=M,i.push(g,z,w),i.push(M,g,w),[0,1].forEach(()=>{e.push(r.x,r.y,r.z)}),a()};a()}return{verts:t,faces:i,facenormals:e}}},function(t,i,e){"use strict";e.r(i);var n,s,r,h,o={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){for(var t=[],i=0;i<256;i++)t[i]=(i<16?"0":"")+i.toString(16);return function(){var i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,n=4294967295*Math.random()|0,s=4294967295*Math.random()|0;return(t[255&i]+t[i>>8&255]+t[i>>16&255]+t[i>>24&255]+"-"+t[255&e]+t[e>>8&255]+"-"+t[e>>16&15|64]+t[e>>24&255]+"-"+t[63&n|128]+t[n>>8&255]+"-"+t[n>>16&255]+t[n>>24&255]+t[255&s]+t[s>>8&255]+t[s>>16&255]+t[s>>24&255]).toUpperCase()}}(),clamp:function(t,i,e){return Math.max(i,Math.min(e,t))},euclideanModulo:function(t,i){return(t%i+i)%i},mapLinear:function(t,i,e,n,s){return n+(t-i)*(s-n)/(e-i)},lerp:function(t,i,e){return(1-e)*t+e*i},smoothstep:function(t,i,e){return t<=i?0:t>=e?1:(t=(t-i)/(e-i))*t*(3-2*t)},smootherstep:function(t,i,e){return t<=i?0:t>=e?1:(t=(t-i)/(e-i))*t*t*(t*(6*t-15)+10)},randInt:function(t,i){return t+Math.floor(Math.random()*(i-t+1))},randFloat:function(t,i){return t+Math.random()*(i-t)},randFloatSpread:function(t){return t*(.5-Math.random())},degToRad:function(t){return t*o.DEG2RAD},radToDeg:function(t){return t*o.RAD2DEG},isPowerOfTwo:function(t){return 0==(t&t-1)&&0!==t},ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:function(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}};function a(t,i,e,n){this._x=t||0,this._y=i||0,this._z=e||0,this._w=void 0!==n?n:1}function c(t,i,e){this.x=t||0,this.y=i||0,this.z=e||0}Object.assign(a,{slerp:function(t,i,e,n){return e.copy(t).slerp(i,n)},slerpFlat:function(t,i,e,n,s,r,h){var o=e[n+0],a=e[n+1],c=e[n+2],u=e[n+3],l=s[r+0],y=s[r+1],f=s[r+2],d=s[r+3];if(u!==d||o!==l||a!==y||c!==f){var x=1-h,m=o*l+a*y+c*f+u*d,_=m>=0?1:-1,p=1-m*m;if(p>Number.EPSILON){var z=Math.sqrt(p),w=Math.atan2(z,m*_);x=Math.sin(x*w)/z,h=Math.sin(h*w)/z}var M=h*_;if(o=o*x+l*M,a=a*x+y*M,c=c*x+f*M,u=u*x+d*M,x===1-h){var g=1/Math.sqrt(o*o+a*a+c*c+u*u);o*=g,a*=g,c*=g,u*=g}}t[i]=o,t[i+1]=a,t[i+2]=c,t[i+3]=u}}),Object.defineProperties(a.prototype,{x:{get:function(){return this._x},set:function(t){this._x=t,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(t){this._y=t,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(t){this._z=t,this.onChangeCallback()}},w:{get:function(){return this._w},set:function(t){this._w=t,this.onChangeCallback()}}}),Object.assign(a.prototype,{isQuaternion:!0,set:function(t,i,e,n){return this._x=t,this._y=i,this._z=e,this._w=n,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this.onChangeCallback(),this},setFromEuler:function(t,i){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var e=t._x,n=t._y,s=t._z,r=t.order,h=Math.cos,o=Math.sin,a=h(e/2),c=h(n/2),u=h(s/2),l=o(e/2),y=o(n/2),f=o(s/2);return"XYZ"===r?(this._x=l*c*u+a*y*f,this._y=a*y*u-l*c*f,this._z=a*c*f+l*y*u,this._w=a*c*u-l*y*f):"YXZ"===r?(this._x=l*c*u+a*y*f,this._y=a*y*u-l*c*f,this._z=a*c*f-l*y*u,this._w=a*c*u+l*y*f):"ZXY"===r?(this._x=l*c*u-a*y*f,this._y=a*y*u+l*c*f,this._z=a*c*f+l*y*u,this._w=a*c*u-l*y*f):"ZYX"===r?(this._x=l*c*u-a*y*f,this._y=a*y*u+l*c*f,this._z=a*c*f-l*y*u,this._w=a*c*u+l*y*f):"YZX"===r?(this._x=l*c*u+a*y*f,this._y=a*y*u+l*c*f,this._z=a*c*f-l*y*u,this._w=a*c*u-l*y*f):"XZY"===r&&(this._x=l*c*u-a*y*f,this._y=a*y*u-l*c*f,this._z=a*c*f+l*y*u,this._w=a*c*u+l*y*f),!1!==i&&this.onChangeCallback(),this},setFromAxisAngle:function(t,i){var e=i/2,n=Math.sin(e);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(e),this.onChangeCallback(),this},setFromRotationMatrix:function(t){var i,e=t.elements,n=e[0],s=e[4],r=e[8],h=e[1],o=e[5],a=e[9],c=e[2],u=e[6],l=e[10],y=n+o+l;return y>0?(i=.5/Math.sqrt(y+1),this._w=.25/i,this._x=(u-a)*i,this._y=(r-c)*i,this._z=(h-s)*i):n>o&&n>l?(i=2*Math.sqrt(1+n-o-l),this._w=(u-a)/i,this._x=.25*i,this._y=(s+h)/i,this._z=(r+c)/i):o>l?(i=2*Math.sqrt(1+o-n-l),this._w=(r-c)/i,this._x=(s+h)/i,this._y=.25*i,this._z=(a+u)/i):(i=2*Math.sqrt(1+l-n-o),this._w=(h-s)/i,this._x=(r+c)/i,this._y=(a+u)/i,this._z=.25*i),this.onChangeCallback(),this},setFromUnitVectors:function(t,i){var e=t.dot(i)+1;return e<1e-6?(e=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=e):(this._x=0,this._y=-t.z,this._z=t.y,this._w=e)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=e),this.normalize()},angleTo:function(t){return 2*Math.acos(Math.abs(o.clamp(this.dot(t),-1,1)))},rotateTowards:function(t,i){var e=this.angleTo(t);if(0===e)return this;var n=Math.min(1,i/e);return this.slerp(t,n),this},inverse:function(){return this.conjugate()},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this.onChangeCallback(),this},multiply:function(t,i){return void 0!==i?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,i)):this.multiplyQuaternions(this,t)},premultiply:function(t){return this.multiplyQuaternions(t,this)},multiplyQuaternions:function(t,i){var e=t._x,n=t._y,s=t._z,r=t._w,h=i._x,o=i._y,a=i._z,c=i._w;return this._x=e*c+r*h+n*a-s*o,this._y=n*c+r*o+s*h-e*a,this._z=s*c+r*a+e*o-n*h,this._w=r*c-e*h-n*o-s*a,this.onChangeCallback(),this},slerp:function(t,i){if(0===i)return this;if(1===i)return this.copy(t);var e=this._x,n=this._y,s=this._z,r=this._w,h=r*t._w+e*t._x+n*t._y+s*t._z;if(h<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,h=-h):this.copy(t),h>=1)return this._w=r,this._x=e,this._y=n,this._z=s,this;var o=1-h*h;if(o<=Number.EPSILON){var a=1-i;return this._w=a*r+i*this._w,this._x=a*e+i*this._x,this._y=a*n+i*this._y,this._z=a*s+i*this._z,this.normalize()}var c=Math.sqrt(o),u=Math.atan2(c,h),l=Math.sin((1-i)*u)/c,y=Math.sin(i*u)/c;return this._w=r*l+this._w*y,this._x=e*l+this._x*y,this._y=n*l+this._y*y,this._z=s*l+this._z*y,this.onChangeCallback(),this},equals:function(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w},fromArray:function(t,i){return void 0===i&&(i=0),this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this.onChangeCallback(),this},toArray:function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t},onChange:function(t){return this.onChangeCallback=t,this},onChangeCallback:function(){}}),e.d(i,"Vector3",function(){return c}),Object.assign(c.prototype,{isVector3:!0,set:function(t,i,e){return this.x=t,this.y=i,this.z=e,this},setScalar:function(t){return this.x=t,this.y=t,this.z=t,this},setX:function(t){return this.x=t,this},setY:function(t){return this.y=t,this},setZ:function(t){return this.z=t,this},setComponent:function(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this},getComponent:function(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}},clone:function(){return new this.constructor(this.x,this.y,this.z)},copy:function(t){return this.x=t.x,this.y=t.y,this.z=t.z,this},add:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,i)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)},addScalar:function(t){return this.x+=t,this.y+=t,this.z+=t,this},addVectors:function(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this},addScaledVector:function(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this},sub:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,i)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)},subScalar:function(t){return this.x-=t,this.y-=t,this.z-=t,this},subVectors:function(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this},multiply:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,i)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)},multiplyScalar:function(t){return this.x*=t,this.y*=t,this.z*=t,this},multiplyVectors:function(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this},applyEuler:(h=new a,function(t){return t&&t.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(h.setFromEuler(t))}),applyAxisAngle:function(){var t=new a;return function(i,e){return this.applyQuaternion(t.setFromAxisAngle(i,e))}}(),applyMatrix3:function(t){var i=this.x,e=this.y,n=this.z,s=t.elements;return this.x=s[0]*i+s[3]*e+s[6]*n,this.y=s[1]*i+s[4]*e+s[7]*n,this.z=s[2]*i+s[5]*e+s[8]*n,this},applyMatrix4:function(t){var i=this.x,e=this.y,n=this.z,s=t.elements,r=1/(s[3]*i+s[7]*e+s[11]*n+s[15]);return this.x=(s[0]*i+s[4]*e+s[8]*n+s[12])*r,this.y=(s[1]*i+s[5]*e+s[9]*n+s[13])*r,this.z=(s[2]*i+s[6]*e+s[10]*n+s[14])*r,this},applyQuaternion:function(t){var i=this.x,e=this.y,n=this.z,s=t.x,r=t.y,h=t.z,o=t.w,a=o*i+r*n-h*e,c=o*e+h*i-s*n,u=o*n+s*e-r*i,l=-s*i-r*e-h*n;return this.x=a*o+l*-s+c*-h-u*-r,this.y=c*o+l*-r+u*-s-a*-h,this.z=u*o+l*-h+a*-r-c*-s,this},project:function(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)},unproject:function(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)},transformDirection:function(t){var i=this.x,e=this.y,n=this.z,s=t.elements;return this.x=s[0]*i+s[4]*e+s[8]*n,this.y=s[1]*i+s[5]*e+s[9]*n,this.z=s[2]*i+s[6]*e+s[10]*n,this.normalize()},divide:function(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this},divideScalar:function(t){return this.multiplyScalar(1/t)},min:function(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this},max:function(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this},clamp:function(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this.z=Math.max(t.z,Math.min(i.z,this.z)),this},clampScalar:(s=new c,r=new c,function(t,i){return s.set(t,t,t),r.set(i,i,i),this.clamp(s,r)}),clampLength:function(t,i){var e=this.length();return this.divideScalar(e||1).multiplyScalar(Math.max(t,Math.min(i,e)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(t){return this.x*t.x+this.y*t.y+this.z*t.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},manhattanLength:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(t){return this.normalize().multiplyScalar(t)},lerp:function(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this},lerpVectors:function(t,i,e){return this.subVectors(i,t).multiplyScalar(e).add(t)},cross:function(t,i){return void 0!==i?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,i)):this.crossVectors(this,t)},crossVectors:function(t,i){var e=t.x,n=t.y,s=t.z,r=i.x,h=i.y,o=i.z;return this.x=n*o-s*h,this.y=s*r-e*o,this.z=e*h-n*r,this},projectOnVector:function(t){var i=t.dot(this)/t.lengthSq();return this.copy(t).multiplyScalar(i)},projectOnPlane:(n=new c,function(t){return n.copy(this).projectOnVector(t),this.sub(n)}),reflect:function(){var t=new c;return function(i){return this.sub(t.copy(i).multiplyScalar(2*this.dot(i)))}}(),angleTo:function(t){var i=this.dot(t)/Math.sqrt(this.lengthSq()*t.lengthSq());return Math.acos(o.clamp(i,-1,1))},distanceTo:function(t){return Math.sqrt(this.distanceToSquared(t))},distanceToSquared:function(t){var i=this.x-t.x,e=this.y-t.y,n=this.z-t.z;return i*i+e*e+n*n},manhattanDistanceTo:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)},setFromSpherical:function(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)},setFromSphericalCoords:function(t,i,e){var n=Math.sin(i)*t;return this.x=n*Math.sin(e),this.y=Math.cos(i)*t,this.z=n*Math.cos(e),this},setFromCylindrical:function(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)},setFromCylindricalCoords:function(t,i,e){return this.x=t*Math.sin(i),this.y=e,this.z=t*Math.cos(i),this},setFromMatrixPosition:function(t){var i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this},setFromMatrixScale:function(t){var i=this.setFromMatrixColumn(t,0).length(),e=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=e,this.z=n,this},setFromMatrixColumn:function(t,i){return this.fromArray(t.elements,4*i)},equals:function(t){return t.x===this.x&&t.y===this.y&&t.z===this.z},fromArray:function(t,i){return void 0===i&&(i=0),this.x=t[i],this.y=t[i+1],this.z=t[i+2],this},toArray:function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t},fromBufferAttribute:function(t,i,e){return void 0!==e&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}})},function(t,i,e){const{PerspectiveCamera:n,Scene:s,WebGLRenderer:r,Vector3:h,MeshBasicMaterial:o,Mesh:a,Points:c,PointsMaterial:u,BufferGeometry:l,Float32BufferAttribute:y,Uint32BufferAttribute:f,PlaneGeometry:d,SphereGeometry:x}=e(3),m=e(0);class _{constructor(t,i){this.container=window.document.body,this.geometry=i,this.tolerance=t,this.perFrameRotation=new h,this.init(),this.animate()}buildGeometry(){let t;switch(this.geometry){case"plane":(t=new d(15,4)).computeBoundingSphere(),t.computeBoundingBox(),t.computeFaceNormals(),t.computeVertexNormals(),this.perFrameRotation.set(0,0,0);break;case"sphere":(t=new x(10,5,5)).computeBoundingSphere(),t.computeBoundingBox(),t.computeFaceNormals(),t.computeVertexNormals(),this.perFrameRotation.set(.001,.005,0)}return t}setGeometry(t){this.geometry=t,this.rebuildScene()}setTolerance(t){this.tolerance=t,this.rebuildScene()}rebuildScene(){for(;this.scene.children.length;){let t=this.scene.children[0];this.scene.remove(t)}this.buildScene()}buildScene(){const t=this.buildGeometry(),i=t=>{const i=[];let e=new a(t,new o({wireframe:!0,color:16777215}));return i.push(e),e=new a(t,new o({transparent:!0,opacity:.2,color:16777215})),i.push(e),e=new c(t,new u({size:.4,color:16777215})),i.push(e),i.forEach(t=>{this.scene.add(t)}),i};i(t).forEach(t=>{t.position.x=-10});const e=new l,n=m(t.vertices.map(t=>t.toArray()).flat(),t.faces.map(t=>[t.a,t.b,t.c]).flat(),t.faces.map(t=>t.normal.toArray()).flat(),this.tolerance);e.addAttribute("position",new y(Float32Array.from(n.verts),3)),e.setIndex(new f(Uint32Array.from(n.faces),1)),i(e).forEach(t=>{t.position.x=10})}onWindowResize(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=this.renderer.domElement.clientWidth/this.renderer.domElement.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.renderer.domElement.clientWidth,this.renderer.domElement.clientHeight)}init(){this.scene=new s,this.camera=new n(45,window.innerWidth/window.innerHeight,1,1e3),this.camera.position.z=30,this.camera.lookAt(new h(0,0,0)),this.camera.updateMatrixWorld(),this.renderer=new r,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.container.appendChild(this.renderer.domElement),window.addEventListener("resize",()=>{this.onWindowResize()},!1),this.buildScene()}animate(){requestAnimationFrame(()=>{this.animate()}),this.scene.children.forEach(t=>{t.rotation.x+=this.perFrameRotation.x,t.rotation.y+=this.perFrameRotation.y}),this.renderer.render(this.scene,this.camera)}}window.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("tolerance"),i=document.getElementById("geometry");for(var e=0;e<10;e++){const i=document.createElement("option");i.innerText=new String(e+1),i.value=e+1,t.appendChild(i)}t.addEventListener("change",function(t){window.demo.setTolerance(parseInt(t.target.value))}),t.value=new String(3),i.addEventListener("change",function(t){window.demo.setGeometry(t.target.value)}),window.demo=new _(t.value,i.value)})},function(t,i,e){t.exports=e(4)(1)},function(t,i){t.exports=vendor}]);
//# sourceMappingURL=demo.js.map