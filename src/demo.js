const {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Vector3,
    Face3,
    MeshBasicMaterial,
    Mesh,
    Geometry,
    Points,
    PointsMaterial,
    BufferGeometry,
    Float32BufferAttribute,
    Uint32BufferAttribute
} = require('three');

const homogenizeTriangles = require('./homogenize-triangles');

class HomogenizeTrianglesDemo {

    constructor () {
        this.container = window.document.body;
        this.init();
        this.animate();
    }

    onWindowResize () {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight );
    }

    init () {
        this.scene = new Scene();

        this.camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.z = 20;
        this.camera.lookAt(new Vector3(0,0,0));
        this.camera.updateMatrixWorld();

        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.container.appendChild( this.renderer.domElement );

        //construct a narrow triangle
        const narrowTri = new Geometry();

        //Vertical oriented rectangle
        narrowTri.vertices.push(
            new Vector3(-1,5,0),
            new Vector3(-1,-5,0),
            new Vector3(1,-5,0),
            new Vector3(1,5,0)
        );

        // narrowTri.vertices.push(
        //     new Vector3(-5,1,0),
        //     new Vector3(-5,-1,0),
        //     new Vector3(5,-1,0),
        //     new Vector3(5,1,0)
        // );

        narrowTri.faces.push(
            new Face3(0,1,2),
            new Face3(0,2,3)
        );

        narrowTri.computeBoundingSphere();
        narrowTri.computeBoundingBox();
        narrowTri.computeFaceNormals();
        narrowTri.computeVertexNormals();

        const createMultiMesh = (geo) => {
            const meshes = [];

            let mesh = new Mesh(geo, new MeshBasicMaterial({
                wireframe: true,
                color: 0xffffff
            }));

            meshes.push(mesh);

            mesh = new Mesh(geo, new MeshBasicMaterial({
                transparent: true,
                opacity: 0.2,
                color: 0xffffff
            }));

            meshes.push(mesh);

            mesh = new Points(geo, new PointsMaterial({
                size: 0.4,
                color: 0xffffff
            }));

            meshes.push(mesh);

            meshes.forEach(_m => {
                this.scene.add(_m);
            });

            return meshes;
        };

        createMultiMesh(narrowTri).forEach(_t => {
            _t.position.x = -10;
        });

        const dividedTri = new BufferGeometry();
        const res = homogenizeTriangles(
            narrowTri.vertices.map(_v => {return _v.toArray()}).flat(),
            narrowTri.faces.map(_f => {return [_f.a, _f.b, _f.c]}).flat(),
            narrowTri.faces.map(_f => {return _f.normal.toArray() }).flat(),
            2
        );

        dividedTri.addAttribute('position', new Float32BufferAttribute(Float32Array.from(res.verts), 3));
        dividedTri.setIndex(new Uint32BufferAttribute(Uint32Array.from(res.faces), 1));

        createMultiMesh(dividedTri).forEach(_t => {
            _t.position.x = 10;
        });

        window.addEventListener( 'resize', ()=>{
            this.onWindowResize();
        }, false );
    }

    animate(){
        requestAnimationFrame( () => {
            this.animate();
        } );

        this.renderer.render( this.scene, this.camera );
    }
}

window.addEventListener('DOMContentLoaded', function () {
    window.demo = new HomogenizeTrianglesDemo();
});