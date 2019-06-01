import test from 'ava';
const flatten = require('array-flatten');
const homogenizeTriangles = require('../src/homogenize-triangles');
const faceNormsFromVtxNorms = require('../src/util/faceNormsFromVtxNorms');
const fastRounding = require('../src/util/fastRounding');
const sigFigs = 5;

const desired = {
    sphere: {
        verts: require('./sphere_vtx.json'),
        faces: require('./sphere_face.json')
    },
    plane: {
        verts: require('./plane_vtx.json'),
        faces: require('./plane_face.json')
    }
};

const {
    SphereGeometry,
    PlaneBufferGeometry
} = require('three');

const testHomoGeo = (geo, exp, t, tol) => {

    geo.computeBoundingSphere();
    geo.computeBoundingBox();
    geo.computeFaceNormals();
    geo.computeVertexNormals();

    let faces, faceNormals, verts;
    if(geo.getAttribute){
        const vtxNormals = Array.from(geo.getAttribute('normal').array);

        verts = Array.from(geo.getAttribute('position').array);
        faces = Array.from(geo.getIndex().array);
        faceNormals = faceNormsFromVtxNorms(faces, vtxNormals);
    }else{
        verts = flatten(geo.vertices.map(_v => {return _v.toArray()}));
        faces = flatten(geo.faces.map(_f => {return [_f.a, _f.b, _f.c]}));
        faceNormals = flatten(geo.faces.map(_f => {return _f.normal.toArray()}));
    }

    const result = homogenizeTriangles(
        verts,
        faces,
        faceNormals,
        tol
    );

    const round = (_n) => {
        return fastRounding(_n, sigFigs)
    };

    t.deepEqual(result.verts.map(round), exp.verts.map(round));
    t.deepEqual(result.faces, exp.faces);
};

test('Check plane tesselation', (t) => {
    const geo = new PlaneBufferGeometry(15, 4);
    const exp = desired.plane;
    testHomoGeo(geo, exp, t, 3);
});

test('Check sphere tesselation', (t) => {
    const geo = new SphereGeometry(10,5,5);
    const exp = desired.sphere;
    testHomoGeo(geo, exp, t, 10);
});