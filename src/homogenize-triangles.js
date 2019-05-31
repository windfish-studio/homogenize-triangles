const {Vector3} = require('three/src/math/Vector3');

module.exports = function homogenizeTriangles (verts, faces, tol) {
    verts = verts.slice(0);
    faces = faces.slice(0);

    const spatialIndex = {};

    for(var i = 0; i < faces.length; i += 3) {
        let splitFace = () => {
            const vecs = [0, 1, 2].map(_f => {
                const vertIdx = faces[i + _f] * 3;
                return new Vector3(
                    verts[vertIdx],
                    verts[vertIdx + 1],
                    verts[vertIdx + 2]
                );
            });

            const segs = vecs.map((_v, _i) => {
                return {
                    vecIndices: [_i, (_i+1)%3],
                    deltaVec: (new Vector3()).subVectors(vecs[(_i+1)%3], _v)
                };
            });

            let do_split = false;
            for(var j = 0; j < 3; j++){
                if(segs[j].deltaVec.length() > tol){
                    do_split = true;
                    break;
                }
            }

            if(!do_split){
                return;
            }

            let orderedSegs = segs.sort((_sa, _sb)=>{return (_sa.deltaVec.length() > _sb.deltaVec.length())? -1 : 1}).slice(0,2);
            let sharedVtx = null;

            //find the vertex shared by the two longest edges
            const shared = {};
            orderedSegs.forEach(_o => {
                _o.vecIndices.forEach(_vi => {
                    shared[_vi] = shared[_vi] || 0;
                    shared[_vi]++;

                    if(shared[_vi] == 2){
                        sharedVtx = _vi;
                    }
                });
            });

            //ensure orderedSegs is always in CCW order
            const maxAngle = (_o) => {
                Math.max(
                    vecs[sharedVtx].angleTo(vecs[_o.vecIndices[0]]),
                    vecs[sharedVtx].angleTo(vecs[_o.vecIndices[1]])
                );
            };

            orderedSegs = orderedSegs.sort((_oa, _ob) => {
                return (maxAngle(_oa) < maxAngle(_ob))? -1 : 1;
            });

            const createOrShareVtx = (vtx) => {
                const points = vtx.toArray();
                let currentPath = spatialIndex;

                points.forEach((_p, _i) => {
                    if(_i == (points.length - 1)){
                        if(currentPath[_p] === undefined){
                            verts.push(vtx.x, vtx.y, vtx.z);
                            currentPath[_p] = (verts.length / 3) - 1;
                        }
                    }else{
                        currentPath[_p] = currentPath[_p] || {};
                    }

                    currentPath = currentPath[_p];
                });

                return currentPath;
            };

            //create two new vertices
            const newVertsIdx = orderedSegs.map(_o => {
                const half = _o.deltaVec.clone().multiplyScalar(0.5);

                const newVtx = vecs[_o.vecIndices[0]].clone();
                newVtx.add(half);

                return createOrShareVtx(newVtx);

            });

            //rearrange the faces
            const _fb = i + ((sharedVtx + 1) % 3);
            const _fc = i + ((sharedVtx + 2) % 3);
            const b = faces[_fb];
            const c = faces[_fc];
            const d = newVertsIdx[0];
            const e = newVertsIdx[1];

            faces[_fb] = e;
            faces[_fc] = d;

            faces.push(e, b, c);
            faces.push(d, e, c);

            return splitFace();
        };

        splitFace();
    }

    return {
        verts: verts,
        faces: faces
    }
};