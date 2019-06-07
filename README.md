#Homogenize Triangles
This library will sub-divide triangles in a mesh until each edge-length is less than or equal to a user-specified threshold. Use it when you have too few triangles in a mesh and you need to create more. Please see the JSFiddle example: 

 https://jsfiddle.net/sikanrong/fua2hny8/
 
 ![Demo Screenshot](https://raw.githubusercontent.com/windfish-studio/homogenize-triangles/master/dist/homogenize-triangles.png)
 
###Usage
 
 ```javascript
const homogenizeTriangles = require('@windfish-studio/homogenize-triangles');

//Three verts making up a triangle in 3D space
flatVertices = [-1, -5, 0, 0, 5, 0, 1, -5, 0];
//Three vertex indices (the index of first coordinate of the vtx in flatVertices, divided by 3)
flatFaces = [0,1,2];
//One normal vector for each face
flatFaceNormals = [0,0,1,0,0,1,0,0,1];

//the tolerance, edges longer than this will be cut in half
const tol = 3.0;

const homogenized = homogenizeTriangles(
    flatVertices,
    flatFaces,
    flatFaceNormals,
    tol
);

//returns an object with keys {verts, faces, facenormals} which point to arrays.
//Each array has the same format as the inputs to the function
```

###Tests

```bash
npm run test
``` 
 
 