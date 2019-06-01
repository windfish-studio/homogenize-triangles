const {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Vector3,
    MeshBasicMaterial,
    Mesh,
    Points,
    PointsMaterial,
    BufferGeometry,
    Float32BufferAttribute,
    Uint32BufferAttribute,
    PlaneGeometry,
    SphereGeometry
} = require('three');

const homogenizeTriangles = require('./homogenize-triangles');

class HomogenizeTrianglesDemo {

    constructor (tol, geo) {
        this.container = window.document.body;
        this.geometry = geo;
        this.tolerance = tol;
        this.perFrameRotation = new Vector3();
        this.init();
        this.animate();
    }

    buildGeometry () {
        let geo;
        switch(this.geometry){
            case 'plane':
                geo = new PlaneGeometry(15, 4);
                geo.computeBoundingSphere();
                geo.computeBoundingBox();
                geo.computeFaceNormals();
                geo.computeVertexNormals();
                this.perFrameRotation.set(0,0,0);
                break;
            case 'sphere':
                geo = new SphereGeometry(10, 5, 5);
                geo.computeBoundingSphere();
                geo.computeBoundingBox();
                geo.computeFaceNormals();
                geo.computeVertexNormals();
                this.perFrameRotation.set(0.001,0.005,0);
                break;
        }

        return geo;
    }

    setGeometry(geo){
        this.geometry = geo;
        this.rebuildScene();
    }

    setTolerance(tol){
        this.tolerance = tol;
        this.rebuildScene();
    }

    rebuildScene () {
        while(this.scene.children.length){
            let _o = this.scene.children[0];
            this.scene.remove(_o);
            _o.geometry.dispose();
            _o.material.dispose();
        };

        this.buildScene();
    }

    buildScene () {
        const geo = this.buildGeometry();

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

        createMultiMesh(geo).forEach(_t => {
            _t.position.x = -10;
        });

        const dividedTri = new BufferGeometry();
        const res = homogenizeTriangles(
            geo.vertices.map(_v => {return _v.toArray()}).flat(),
            geo.faces.map(_f => {return [_f.a, _f.b, _f.c]}).flat(),
            geo.faces.map(_f => {return _f.normal.toArray() }).flat(),
            this.tolerance
        );

        dividedTri.addAttribute('position', new Float32BufferAttribute(Float32Array.from(res.verts), 3));
        dividedTri.setIndex(new Uint32BufferAttribute(Uint32Array.from(res.faces), 1));

        createMultiMesh(dividedTri).forEach(_t => {
            _t.position.x = 10;
        });
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
        this.camera.position.z = 30;
        this.camera.lookAt(new Vector3(0,0,0));
        this.camera.updateMatrixWorld();

        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.container.appendChild( this.renderer.domElement );

        window.addEventListener( 'resize', ()=>{
            this.onWindowResize();
        }, false );

        this.buildScene();
    }

    animate(){
        requestAnimationFrame( () => {
            this.animate();
        } );

        this.scene.children.forEach(_o => {
            _o.rotation.x += this.perFrameRotation.x;
            _o.rotation.y += this.perFrameRotation.y;
        });

        this.renderer.render( this.scene, this.camera );
    }
}

window.addEventListener('DOMContentLoaded', function () {

    const tol_select = document.getElementById('tolerance');
    const geo_select = document.getElementById('geometry');

    for(var i = 0; i < 10; i++){
        const option = document.createElement('option');
        option.innerText = new String(i+1);
        option.value = i+1;
        tol_select.appendChild(option);
    }

    tol_select.addEventListener('change', function (e) {
        window.demo.setTolerance(parseInt(e.target.value));
    });
    tol_select.value = new String(10);

    geo_select.addEventListener('change', function (e) {
        window.demo.setGeometry(e.target.value);
    });
    geo_select.value = 'sphere';

    window.demo = new HomogenizeTrianglesDemo(tol_select.value, geo_select.value);
});

