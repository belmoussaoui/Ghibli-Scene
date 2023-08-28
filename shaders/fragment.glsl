uniform vec3 uBaseColor;
uniform vec3 uLineColor1;
uniform vec3 uLineColor2;
// uniform vec3 uLineColor3;
// uniform vec3 uLineColor4;

uniform vec3 uDirLightPos;
uniform vec3 uDirLightColor;

uniform vec3 uAmbientLightColor;

varying vec3 vNormal;

void main() {

    float camera = max( dot( normalize( vNormal ), vec3( 0.0, 0.0, 1.0 ) ), 0.4);
    float light = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);

    gl_FragColor = vec4( uBaseColor, 1.0 );
    gl_FragColor = vec4( 0.082, 0.212, 0.192, 1.0);

    if (length(light) > 0.0) {
         gl_FragColor = vec4( 0.004, 0.278, 0.29, 1.0 );
    }

    if (length(light) > 10.99) {
         gl_FragColor = vec4( 0.2, 0.459, 0.376, 1.0 );
    }
    if (length(light) > 20.99) {
        gl_FragColor = vec4( 0.286, 0.537, 0.486, 1.0 );
    }

    if (length(uAmbientLightColor + uDirLightColor * camera) < 0.5) {
        gl_FragColor = vec4( uLineColor2, 1.0 );
        gl_FragColor = vec4( 1.0, 1.0, 0.0, 1.0 );
    }

}