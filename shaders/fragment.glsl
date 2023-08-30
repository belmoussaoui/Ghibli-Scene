varying vec3 vNormal;

void main() {

    float camera = max( dot( normalize( vNormal ), vec3( 0.0, 0.0, 1.0 ) ), 0.4);
    float light = max( dot( normalize( vNormal ), vec3(10.0, 10.0, 15.0) ), 0.0);

    gl_FragColor = vec4(0.26275, 0.45961, 0.44706, 1.0);
    if (length(light) > 0.0) {
         gl_FragColor = vec4( 0.32157, 0.51373, 0.49020, 1.0 );
    }
    if (length(light) > 5.99) {
         gl_FragColor = vec4( 0.35686, 0.57647, 0.52549, 1.0 );
    }
    if (length(light) > 9.99) {
        gl_FragColor = vec4( 0.40392, 0.65882, 0.57255, 1.0 );
    }
}