const {Vector3} = require('three');
const fastRounding = require('./util/fastRounding');

const sigFigs = 5;

module.exports = function homogenizeTriangles (verts, faces, facenormals, tol) {
    verts = verts.slice(0);
    faces = faces.slice(0);
    facenormals = facenormals.slice(0);

    const spatialIndex = {};

    const createOrShareVtx = (vtx) => {
        const points = vtx.toArray();
        let currentPath = spatialIndex;

        points.forEach((_n, _i) => {
            let _p = fastRounding(_n, sigFigs);
            if(_p == -0){
                _p = 0;
            }

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

    for(var i = 0; i < faces.length; i += 3) {

        let faceNormal = new Vector3(
            facenormals[i],
            facenormals[i+1],
            facenormals[i+2]
        );

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

            orderedSegs = orderedSegs.sort((_oa, _ob) => {

                const cross = (new Vector3()).crossVectors(_oa.deltaVec, _ob.deltaVec);
                const ang = cross.angleTo(faceNormal);

                return (ang < (Math.PI/2))? -1 : 1;
            });

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

            faces.push(d, b, c);
            faces.push(d, e, b);

            //copy this facenormal twice (one for each new face)
            [0,1].forEach(() => {
                facenormals.push(faceNormal.x, faceNormal.y, faceNormal.z);
            });

            return splitFace();
        };

        splitFace();
    }

    return {
        verts: verts,
        faces: faces,
        facenormals: facenormals
    }
};