import {Vector3} from "three";

module.exports = function (faces, vtxNormals) {
    const faceNormals = [];
    //average vert norms to get face norms
    for(var i = 0; i < faces.length; i += 3){
        let avgNorm = new Vector3();

        for(var j = 0; j < 3; j++){
            let v = faces[i+j]*3;
            avgNorm.add(new Vector3(
                vtxNormals[v],
                vtxNormals[v+1],
                vtxNormals[v+2]
            ));
        }

        avgNorm.divideScalar(3).normalize();

        faceNormals.push(avgNorm.x, avgNorm.y, avgNorm.z);
    }

    return faceNormals
};