import{U as y,M as G,c as P,E as m,f as S,m as ve,T as g,l as X,k as $,e as I}from"./index-27d48d88.js";import{j,M as Y,k as q,c as K,R as pe,b as w,S as O,G as Ee,B as Z,d as _e,s as ge,e as be,h as Te,i as xe}from"./SystemManager-24d39ba8.js";var Re=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;
uniform sampler2D uSamplers[%count%];

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%
    finalColor = outColor * vColor;
}
`,ye=`precision highp float;
in vec2 aPosition;
in vec2 aUV;
in vec4 aColor;
in float aTextureId;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

out vec2 vTextureCoord;
out vec4 vColor;
out float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * worldTransformMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aUV;
    vTextureId = aTextureId;
    
    vColor = vec4(aColor.rgb * aColor.a, aColor.a)  * worldAlpha;
}
`;function Ie(t){return j({vertexSrc:ye,fragmentSrc:Re,maxTextures:t,name:"default"})}class Q{constructor(){this.didUpload=!1}init(){const e=new y({tint:{value:new Float32Array([1,1,1,1]),type:"f32"},translationMatrix:{value:new G,type:"mat3x3<f32>"}});this.shader=new P({glProgram:Ie(Y),resources:{uniforms:e,batchSamplers:q}})}execute(e,r){const n=e.renderer;e.state.blendMode=r.blendMode,n.state.set(e.state),n.shader.bind(this.shader,this.didUpload),this.didUpload=!0;const i=r.batchParent;n.geometry.bind(i.geometry,this.shader.glProgram);for(let s=0;s<r.textures.textures.length;s++)n.texture.bind(r.textures.textures[s],s);n.shader.bindUniformBlock(n.globalUniforms.uniformGroup,"globalUniforms",0),n.geometry.draw("triangle-list",r.size,r.start)}destroy(){this.shader.destroy(!0),this.shader=null}}Q.extension={type:[m.WebGLRendererPipesAdaptor],name:"batch"};var Ne=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;
uniform sampler2D uSamplers[%count%];

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%
    finalColor = outColor * vColor;
}
`,Se=`precision highp float;
in vec2 aPosition;
in vec2 aUV;
in vec4 aColor;
in float aTextureId;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

uniform mat3 transformMatrix;
uniform vec4 color;

out vec2 vTextureCoord;
out vec4 vColor;
out float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * worldTransformMatrix * transformMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aUV;
    vTextureId = aTextureId;
    
    vColor = vec4(aColor.rgb * aColor.a, aColor.a)  * worldAlpha;
}
`;function Be(t){return j({vertexSrc:Se,fragmentSrc:Ne,maxTextures:t,name:"graphics"})}class J{init(){const e=new y({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new G,type:"mat3x3<f32>"}});this.shader=new P({glProgram:Be(Y),resources:{localUniforms:e,batchSamplers:q}})}execute(e,r){const n=r.view.context,i=n.customShader||this.shader,s=e.renderer,o=s.graphicsContext;if(!o.updateGpuContext(n).batches.length)return;const{geometry:a,batches:c}=o.getContextRenderData(n),u=e.state;u.blendMode=r.layerBlendMode,s.state.set(e.state);const l=i.resources.localUniforms.uniforms;l.transformMatrix=r.layerTransform,K(r.layerColor,l.color,0),s.shader.bind(i),s.shader.bindUniformBlock(s.globalUniforms.uniformGroup,"globalUniforms"),s.geometry.bind(a,i.glProgram);for(let d=0;d<c.length;d++){const v=c[d];if(v.size){for(let h=0;h<v.textures.textures.length;h++)s.texture.bind(v.textures.textures[h],h);s.geometry.draw("triangle-list",v.size,v.start)}}}destroy(){this.shader.destroy(!0),this.shader=null}}J.extension={type:[m.WebGLRendererPipesAdaptor],name:"graphics"};class ee{execute(e,r){const n=e.renderer,i=r.view,s=e.state;s.blendMode=r.layerBlendMode;const o=e.localUniforms;o.uniforms.transformMatrix=r.layerTransform,o.update(),K(r.layerColor,o.uniforms.color,0);let a=i._shader;a||(a=e.meshShader,a.texture=i.texture),a.groups[0]=n.globalUniforms.bindGroup,a.groups[1]=e.localUniformsBindGroup,n.encoder.draw({geometry:i._geometry,shader:a,state:s})}}ee.extension={type:[m.WebGLRendererPipesAdaptor],name:"mesh"};var x=(t=>(t[t.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",t[t.ARRAY_BUFFER=34962]="ARRAY_BUFFER",t[t.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",t))(x||{});class Ae{constructor(e,r){this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.refCount=0,this.type=r}}class te{constructor(e){this._gpuBuffers={},this.renderer=e,this.boundBufferBases={}}destroy(){this.renderer=null}contextChange(){this.destroyAll(!0),this.gl=this.renderer.gl}getGlBuffer(e){return this._gpuBuffers[e.uid]||this.createGLBuffer(e)}bind(e){const{gl:r}=this,n=this.getGlBuffer(e);r.bindBuffer(n.type,n.buffer)}bindBufferBase(e,r){const{gl:n}=this;if(this.boundBufferBases[r]!==e){const i=this.getGlBuffer(e);this.boundBufferBases[r]=e,n.bindBufferBase(n.UNIFORM_BUFFER,r,i.buffer)}}bindBufferRange(e,r,n){const{gl:i}=this;n=n||0;const s=this.getGlBuffer(e);i.bindBufferRange(i.UNIFORM_BUFFER,r||0,s.buffer,n*256,256)}updateBuffer(e){const{gl:r}=this,n=this.getGlBuffer(e);if(e._updateID===n.updateID)return n;if(n.updateID=e._updateID,r.bindBuffer(n.type,n.buffer),n.byteLength>=e.data.byteLength)r.bufferSubData(n.type,0,e.data,0,e._updateSize/4);else{const i=e.descriptor.usage&S.STATIC?r.STATIC_DRAW:r.DYNAMIC_DRAW;n.byteLength=e.data.byteLength,r.bufferData(n.type,e.data,i)}return n}destroyAll(e){const r=this.gl;if(!e)for(const n in this._gpuBuffers)r.deleteBuffer(this._gpuBuffers[n].buffer);this._gpuBuffers={}}onBufferDestroy(e,r){const n=this._gpuBuffers[e.uid],i=this.gl;r||i.deleteBuffer(n.buffer),this._gpuBuffers[e.uid]=null}createGLBuffer(e){const{gl:r}=this;let n=x.ARRAY_BUFFER;e.descriptor.usage&S.INDEX?n=x.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&S.UNIFORM&&(n=x.UNIFORM_BUFFER);const i=new Ae(r.createBuffer(),n);return this._gpuBuffers[e.uid]=i,e.on("destroy",this.onBufferDestroy,this),i}}te.extension={type:[m.WebGLRendererSystem],name:"buffer"};class N{constructor(e){this.renderer=e,this.webGLVersion=1,this.extensions={},this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this.renderer.gl=e,e.isContextLost()&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").restoreContext()}init(e){if(e!=null&&e.context)this.initFromContext(e.context);else{const r=this.renderer.background.alpha<1,n=e.premultipliedAlpha??!0;this.preserveDrawingBuffer=e.preserveDrawingBuffer,this.powerPreference=e.powerPreference,this.initFromOptions({alpha:r,premultipliedAlpha:n,antialias:this.renderer.options.antialias,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference})}}initFromContext(e){this.gl=e,this.validateContext(e),this.renderer.runners.contextChange.emit(e);const r=this.renderer.view.element;r.addEventListener("webglcontextlost",this.handleContextLost,!1),r.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}initFromOptions(e){const r=this.createContext(this.renderer.view.element,e);this.initFromContext(r)}createContext(e,r){const n=e.getContext("webgl2",r);return this.webGLVersion=2,this.gl=n,this.getExtensions(),this.gl}getExtensions(){const{gl:e}=this,r={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc")};this.webGLVersion===1?Object.assign(this.extensions,r,{drawBuffers:e.getExtension("WEBGL_draw_buffers"),depthTexture:e.getExtension("WEBGL_depth_texture"),loseContext:e.getExtension("WEBGL_lose_context"),vertexArrayObject:e.getExtension("OES_vertex_array_object")||e.getExtension("MOZ_OES_vertex_array_object")||e.getExtension("WEBKIT_OES_vertex_array_object"),uint32ElementIndex:e.getExtension("OES_element_index_uint"),floatTexture:e.getExtension("OES_texture_float"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),textureHalfFloat:e.getExtension("OES_texture_half_float"),textureHalfFloatLinear:e.getExtension("OES_texture_half_float_linear")}):this.webGLVersion===2&&Object.assign(this.extensions,r,{colorBufferFloat:e.getExtension("EXT_color_buffer_float")})}handleContextLost(e){e.preventDefault()}handleContextRestored(){this.renderer.runners.contextChange.emit(this.gl)}destroy(){const e=this.renderer.view.element;this.renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}postrender(){}validateContext(e){const r=e.getContextAttributes(),n="WebGL2RenderingContext"in globalThis&&e instanceof globalThis.WebGL2RenderingContext;n&&(this.webGLVersion=2),r&&!r.stencil&&console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");const i=n||!!e.getExtension("OES_element_index_uint");this.supports.uint32Indices=i,i||console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")}}N.extension={type:[m.WebGLRendererSystem],name:"context"};N.defaultOptions={context:null,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"default"};var C=(t=>(t[t.RGBA=6408]="RGBA",t[t.RGB=6407]="RGB",t[t.RG=33319]="RG",t[t.RED=6403]="RED",t[t.RGBA_INTEGER=36249]="RGBA_INTEGER",t[t.RGB_INTEGER=36248]="RGB_INTEGER",t[t.RG_INTEGER=33320]="RG_INTEGER",t[t.RED_INTEGER=36244]="RED_INTEGER",t[t.ALPHA=6406]="ALPHA",t[t.LUMINANCE=6409]="LUMINANCE",t[t.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",t[t.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",t[t.DEPTH_STENCIL=34041]="DEPTH_STENCIL",t))(C||{}),re=(t=>(t[t.TEXTURE_2D=3553]="TEXTURE_2D",t[t.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",t[t.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",t[t.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",t[t.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",t[t.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",t[t.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",t))(re||{}),f=(t=>(t[t.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",t[t.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",t[t.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",t[t.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",t[t.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",t[t.UNSIGNED_INT=5125]="UNSIGNED_INT",t[t.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",t[t.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",t[t.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",t[t.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",t[t.BYTE=5120]="BYTE",t[t.SHORT=5122]="SHORT",t[t.INT=5124]="INT",t[t.FLOAT=5126]="FLOAT",t[t.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",t[t.HALF_FLOAT=36193]="HALF_FLOAT",t))(f||{});const L={uint8x2:{type:f.UNSIGNED_BYTE,size:2,normalised:!1},uint8x4:{type:f.UNSIGNED_BYTE,size:4,normalised:!1},sint8x2:{type:f.BYTE,size:2,normalised:!1},sint8x4:{type:f.BYTE,size:4,normalised:!1},unorm8x2:{type:f.UNSIGNED_BYTE,size:2,normalised:!0},unorm8x4:{type:f.UNSIGNED_BYTE,size:4,normalised:!0},snorm8x2:{type:f.BYTE,size:2,normalised:!0},snorm8x4:{type:f.BYTE,size:4,normalised:!0},uint16x2:{type:f.UNSIGNED_SHORT,size:2,normalised:!1},uint16x4:{type:f.UNSIGNED_SHORT,size:4,normalised:!1},sint16x2:{type:f.SHORT,size:2,normalised:!1},sint16x4:{type:f.SHORT,size:4,normalised:!1},unorm16x2:{type:f.UNSIGNED_SHORT,size:2,normalised:!0},unorm16x4:{type:f.UNSIGNED_SHORT,size:4,normalised:!0},snorm16x2:{type:f.SHORT,size:2,normalised:!0},snorm16x4:{type:f.SHORT,size:4,normalised:!0},float16x2:{type:f.HALF_FLOAT,size:2,normalised:!1},float16x4:{type:f.HALF_FLOAT,size:4,normalised:!1},float32:{type:f.FLOAT,size:1,normalised:!1},float32x2:{type:f.FLOAT,size:2,normalised:!1},float32x3:{type:f.FLOAT,size:3,normalised:!1},float32x4:{type:f.FLOAT,size:4,normalised:!1},uint32:{type:f.UNSIGNED_INT,size:1,normalised:!1},uint32x2:{type:f.UNSIGNED_INT,size:2,normalised:!1},uint32x3:{type:f.UNSIGNED_INT,size:3,normalised:!1},uint32x4:{type:f.UNSIGNED_INT,size:4,normalised:!1},sint32:{type:f.INT,size:1,normalised:!1},sint32x2:{type:f.INT,size:2,normalised:!1},sint32x3:{type:f.INT,size:3,normalised:!1},sint32x4:{type:f.INT,size:4,normalised:!1}};function Ue(t){return L[t]??L.float32}const B={5126:4,5123:2,5121:1},De={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};class ne{constructor(e){this._geometryVaoHash={},this.renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!0,this.managedGeometries={}}contextChange(){this.gl=this.renderer.gl}bind(e,r){const n=this.gl;this._activeGeometry=e;const i=this.getVao(e,r);this._activeVao!==i&&(this._activeVao=i,n.bindVertexArray(i)),this.updateBuffers()}reset(){this.unbind()}updateBuffers(){const e=this._activeGeometry,r=this.renderer.buffer;for(let n=0;n<e.buffers.length;n++){const i=e.buffers[n];r.updateBuffer(i)}}checkCompatibility(e,r){const n=e.attributes,i=r.attributeData;for(const s in i)if(!n[s])throw new Error(`shader and geometry incompatible, geometry missing the "${s}" attribute`)}getSignature(e,r){const n=e.attributes,i=r.attributeData,s=["g",e.uid];for(const o in n)i[o]&&s.push(o,i[o].location);return s.join("-")}getVao(e,r){var n;return((n=this._geometryVaoHash[e.uid])==null?void 0:n[r.key])||this.initGeometryVao(e,r)}initGeometryVao(e,r,n=!0){const i=this.renderer.gl,s=this.renderer.buffer;this.renderer.shader.getProgramData(r),this.checkCompatibility(e,r);const o=this.getSignature(e,r);this._geometryVaoHash[e.uid]||(this._geometryVaoHash[e.uid]={},e.on("destroy",this.onGeometryDestroy,this));const a=this._geometryVaoHash[e.uid];let c=a[o];if(c)return a[r.key]=c,c;const u=e.buffers,l=e.attributes,d={},v={};for(const h in u)d[h]=0,v[h]=0;for(const h in l)!l[h].size&&r.attributeData[h]?l[h].size=r.attributeData[h].size:l[h].size||console.warn(`PIXI Geometry attribute '${h}' size cannot be determined (likely the bound shader does not have the attribute)`),d[l[h].buffer.uid]+=l[h].size*B[l[h].type];for(const h in l){const p=l[h],M=p.size;p.stride===void 0&&(d[p.buffer.uid]===M*B[p.type]?p.stride=0:p.stride=d[p.buffer.uid]),p.start===void 0&&(p.start=v[p.buffer.uid],v[p.buffer.uid]+=M*B[p.type])}c=i.createVertexArray(),i.bindVertexArray(c);for(let h=0;h<u.length;h++){const p=u[h];s.bind(p)}return this.activateVao(e,r),a[r.key]=c,a[o]=c,i.bindVertexArray(null),c}onGeometryDestroy(e,r){const n=this._geometryVaoHash[e.uid],i=this.gl;if(n){if(r)for(const s in n)this._activeVao!==n[s]&&this.unbind(),i.deleteVertexArray(n[s]);this._geometryVaoHash[e.uid]=null}}destroyAll(e=!1){const r=this.gl;for(const n in this._geometryVaoHash){if(e)for(const i in this._geometryVaoHash[n]){const s=this._geometryVaoHash[n];this._activeVao!==s&&this.unbind(),r.deleteVertexArray(s[i])}this._geometryVaoHash[n]=null}}activateVao(e,r){const n=this.renderer.gl,i=this.renderer.buffer,s=e.attributes;e.indexBuffer&&i.bind(e.indexBuffer);let o=null;for(const a in s){const c=s[a],u=c.buffer,l=i.getGlBuffer(u);if(r.attributeData[a]){o!==l&&(i.bind(u),o=l);const d=r.attributeData[a].location;n.enableVertexAttribArray(d);const v=Ue(c.format);if(n.vertexAttribPointer(d,v.size,v.type,v.normalised,c.stride,c.offset),c.instance)if(this.hasInstance)n.vertexAttribDivisor(d,1);else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,r,n,i){const{gl:s}=this.renderer,o=this._activeGeometry,a=De[o.topology||e];if(o.indexBuffer){const c=o.indexBuffer.data.BYTES_PER_ELEMENT,u=c===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;o.instanced?s.drawElementsInstanced(a,r||o.indexBuffer.data.length,u,(n||0)*c,o.instanceCount||1):s.drawElements(a,r||o.indexBuffer.data.length,u,(n||0)*c)}else o.instanced?s.drawArraysInstanced(a,n,r||o.getSize(),i||1):s.drawArrays(a,n,r||o.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this.renderer=null}}ne.extension={type:[m.WebGLRendererSystem],name:"geometry"};const Ce=new ve({vertex:`
        out vec2 vUv;

        void main() {
            vUv = vec2((gl_VertexID << 1) & 2, (gl_VertexID & 2));

            gl_Position = vec4(vUv * 2.0f + -1.0f, 0.0f, 1.0f);

            // flip dem UVs
            vUv.y = 1.0f - vUv.y;
        }`,fragment:`
        in vec2 vUv;
        out vec4 fragColor;

        uniform sampler2D uTexture;

        void main() {
            fragColor = texture(uTexture, vUv);
        }`,name:"big-triangle"}),H=new P({glProgram:Ce,resources:{uTexture:g.WHITE.source}});class ie{constructor(e){this.useBackBuffer=!0,this.renderer=e}init({useBackBuffer:e}={}){this.useBackBuffer=e}renderToBackBuffer(e){if(!this.useBackBuffer)return e;const r=this.renderer.renderTarget.getRenderTarget(e);return this.targetTexture=r.colorTexture,this._getBackBufferTexture(r.colorTexture)}presentBackBuffer(){if(!this.useBackBuffer)return;const e=this.renderer,r=e.gl;e.renderTarget.finishRenderPass(),e.renderTarget.bind(this.targetTexture,!1),H.resources.uTexture=this.backBufferTexture.source,e.shader.bind(H,!1),e.state.set(X.for2d()),r.drawArrays(r.TRIANGLES,0,3)}_getBackBufferTexture(e){const r=e.source;return this.backBufferTexture=this.backBufferTexture||new g({source:new $({width:1,height:1,resolution:1,antialias:!1})}),this.backBufferTexture.source.resize(r.width,r.height,r._resolution),this.backBufferTexture}destroy(){}}ie.extension={type:[m.WebGLRendererSystem],name:"backBuffer"};class se{constructor(e){this.colorMaskCache=15,this.renderer=e}setMask(e){this.colorMaskCache!==e&&(this.colorMaskCache=e,this.renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}destroy(){}}se.extension={type:[m.WebGLRendererSystem],name:"colorMask"};class oe{constructor(e){this.commandFinished=Promise.resolve(),this.renderer=e}start(){}beginRenderPass(e,r){this.setViewport(e.viewport)}setViewport(e){}setScissor(e){e.fit(this.renderer.renderTarget.renderTarget.viewport)}clearScissor(){}setGeometry(e,r){this.renderer.geometry.bind(e,r.glProgram)}setShaderBindGroups(e,r){}syncBindGroup(e){}draw(e){const r=this.renderer,{geometry:n,shader:i,state:s,skipSync:o,topology:a,size:c,start:u,instanceCount:l}=e;r.shader.bind(i,o),r.geometry.bind(n,r.shader.activeProgram),s&&r.state.set(s),r.geometry.draw(a,c,u,l)}finishRenderPass(){}finish(){}restoreRenderPass(){}destroy(){}}oe.extension={type:[m.WebGLRendererSystem],name:"encoder"};class Fe{constructor(){this.width=-1,this.height=-1,this.msaaRenderBuffer=[],this.msaa=!1,this.dirtyId=-1}}class ae{constructor(e){this.onRenderTargetChange=new pe("onRenderTargetChange"),this.renderSurfaceToRenderTargetHash=new Map,this.gpuRenderTargetHash={},this.renderTargetStack=[],this.defaultClearColor=[0,0,0,0],this.clearColorCache=[0,0,0,0],this.viewPortCache={x:0,y:0,width:0,height:0},this.rootProjectionMatrix=new G,this.renderer=e}contextChange(e){this.gl=e}start(e,r=!0,n){this.renderTargetStack.length=0;const i=this.getRenderTarget(e);this.rootRenderTarget=i,this.rootProjectionMatrix=i.projectionMatrix,this.push(i,r,n)}bind(e,r=!0,n){const i=this.getRenderTarget(e);this.renderTarget=i;const s=this.getGpuRenderTarget(i);i.dirtyId!==s.dirtyId&&(s.dirtyId=i.dirtyId,this.resizeGpuRenderTarget(i));const o=this.gl;o.bindFramebuffer(o.FRAMEBUFFER,s.framebuffer),i.colorTextures.forEach(l=>{this.renderer.texture.unbind(l)});const a=i.viewport;let c=a.y;i.isRoot&&(c=this.renderer.view.element.height-a.height);const u=this.viewPortCache;if((u.x!==a.x||u.y!==c||u.width!==a.width||u.height!==a.height)&&(u.x=a.x,u.y=c,u.width=a.width,u.height=a.height,o.viewport(a.x,c,a.width,a.height)),r){const l=this.gl;if(r){n=n??this.defaultClearColor;const d=this.clearColorCache;(d[0]!==n[0]||d[1]!==n[1]||d[2]!==n[2]||d[3]!==n[3])&&(d[0]=n[0],d[1]=n[1],d[2]=n[2],d[3]=n[3],l.clearColor(n[0],n[1],n[2],n[3])),l.clear(l.COLOR_BUFFER_BIT|l.DEPTH_BUFFER_BIT|l.STENCIL_BUFFER_BIT)}}return this.onRenderTargetChange.emit(i),i}getGpuColorTexture(e){return e.colorTexture}push(e,r=!0,n){const i=this.bind(e,r,n);return this.renderTargetStack.push(i),i}pop(){this.renderTargetStack.pop(),this.bind(this.renderTargetStack[this.renderTargetStack.length-1],!1)}getRenderTarget(e){return this.renderSurfaceToRenderTargetHash.get(e)??this.initRenderTarget(e)}initRenderTarget(e){let r=null;return e instanceof w?r=e:e instanceof g&&(r=new w({colorTextures:[e]}),e.source.resource instanceof HTMLCanvasElement&&(r.isRoot=!0),e.source.on("destroy",()=>{r.destroy()})),this.renderSurfaceToRenderTargetHash.set(e,r),r}finishRenderPass(){const e=this.getGpuRenderTarget(this.renderTarget);if(!e.msaa)return;const r=this.renderer.gl;r.bindFramebuffer(r.FRAMEBUFFER,e.resolveTargetFramebuffer),r.bindFramebuffer(r.READ_FRAMEBUFFER,e.framebuffer),r.blitFramebuffer(0,0,e.width,e.height,0,0,e.width,e.height,r.COLOR_BUFFER_BIT,r.NEAREST),r.bindFramebuffer(r.FRAMEBUFFER,e.framebuffer),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)}finish(){}copyToTexture(e,r,n,i){const s=this.renderer,o=s.renderTarget.getGpuColorTexture(e);s.renderTarget.bind(o,!1),s.texture.bind(r,0);const a=s.gl;return a.copyTexSubImage2D(a.TEXTURE_2D,0,0,0,n.x,n.y,i.width,i.height),r}getGpuRenderTarget(e){return this.gpuRenderTargetHash[e.uid]||this.initGpuRenderTarget(e)}initGpuRenderTarget(e){const n=this.renderer.gl,i=new Fe;return e.colorTexture.source.resource instanceof HTMLCanvasElement?(this.gpuRenderTargetHash[e.uid]=i,i.framebuffer=null,i):(this.initColor(e,i),e.stencil&&this.initStencil(i),n.bindFramebuffer(n.FRAMEBUFFER,null),this.gpuRenderTargetHash[e.uid]=i,i)}resizeGpuRenderTarget(e){if(e.isRoot)return;const r=this.getGpuRenderTarget(e);this.resizeColor(e,r),e.stencil&&this.resizeStencil(r)}initColor(e,r){const n=this.renderer,i=n.gl,s=i.createFramebuffer();if(r.resolveTargetFramebuffer=s,i.bindFramebuffer(i.FRAMEBUFFER,s),r.width=e.colorTexture.source.pixelWidth,r.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((o,a)=>{const c=o.source;c.antialias&&(r.msaa=!0),n.texture.bindSource(c,0);const l=n.texture.getGlSource(c).texture;i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+a,3553,l,0)}),r.msaa){const o=i.createFramebuffer();r.framebuffer=o,i.bindFramebuffer(i.FRAMEBUFFER,o),e.colorTextures.forEach((a,c)=>{const u=i.createRenderbuffer();r.msaaRenderBuffer[c]=u})}else r.framebuffer=s}resizeColor(e,r){const n=e.colorTexture.source;if(r.width=n.pixelWidth,r.height=n.pixelHeight,e.colorTextures.forEach((i,s)=>{s!==0&&i.source.resize(n.width,n.height,n._resolution)}),r.msaa){const i=this.renderer,s=i.gl,o=r.framebuffer;s.bindFramebuffer(s.FRAMEBUFFER,o),e.colorTextures.forEach((a,c)=>{const u=a.source;i.texture.bindSource(u,0);const d=i.texture.getGlSource(u).internalFormat,v=r.msaaRenderBuffer[c];s.bindRenderbuffer(s.RENDERBUFFER,v),s.renderbufferStorageMultisample(s.RENDERBUFFER,4,d,u.pixelWidth,u.pixelHeight),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+c,s.RENDERBUFFER,v)})}}initStencil(e){const r=this.renderer.gl,n=r.createRenderbuffer();e.depthStencilRenderBuffer=n,r.bindRenderbuffer(r.RENDERBUFFER,n),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,n)}resizeStencil(e){const r=this.renderer.gl;r.bindRenderbuffer(r.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?r.renderbufferStorageMultisample(r.RENDERBUFFER,4,r.DEPTH24_STENCIL8,e.width,e.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,e.width,e.height)}destroy(){}}ae.extension={type:[m.WebGLRendererSystem],name:"renderTarget"};class ce{constructor(e){this.stencilCache={enabled:!1,stencilReference:0},this.renderTargetStencilState={},e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this.gl=e,this.comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this.stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP}}onRenderTargetChange(e){this.activeRenderTarget=e;let r=this.renderTargetStencilState[e.uid];r||(r=this.renderTargetStencilState[e.uid]={stencilMode:O.DISABLED,stencilReference:0}),this.setStencilMode(r.stencilMode,r.stencilReference)}setStencilMode(e,r){const n=this.renderTargetStencilState[this.activeRenderTarget.uid];n.stencilMode=e,n.stencilReference=r;const i=Ee[e],s=this.gl;if(e===O.DISABLED){this.stencilCache.enabled&&(this.stencilCache.enabled=!1,s.disable(s.STENCIL_TEST));return}this.stencilCache.enabled||(this.stencilCache.enabled=!0,s.enable(s.STENCIL_TEST)),s.stencilFunc(this.comparisonFuncMapping[i.stencilBack.compare],r,255),s.stencilOp(s.KEEP,s.KEEP,this.stencilOpsMapping[i.stencilBack.passOp])}destroy(){}}ce.extension={type:[m.WebGLRendererSystem],name:"stencil"};class Ge{constructor(e,r){this.program=e,this.uniformData=r,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}function k(t,e,r){const n=t.createShader(e);return t.shaderSource(n,r),t.compileShader(n),n}function A(t){const e=new Array(t);for(let r=0;r<e.length;r++)e[r]=!1;return e}function ue(t,e){switch(t){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return A(2*e);case"bvec3":return A(3*e);case"bvec4":return A(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const Pe={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};function Me(t){return Pe[t]}let T=null;const V={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function le(t,e){if(!T){const r=Object.keys(V);T={};for(let n=0;n<r.length;++n){const i=r[n];T[t[i]]=V[i]}}return T[e]}function we(t,e){const r={},n=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=e.getActiveAttrib(t,i);if(s.name.startsWith("gl_"))continue;const o=le(e,s.type),a={type:o,name:s.name,size:Me(o),location:e.getAttribLocation(t,s.name)};r[s.name]=a}return r}function Oe(t,e){const r={},n=e.getProgramParameter(t,e.ACTIVE_UNIFORM_BLOCKS);for(let i=0;i<n;i++){const s=e.getActiveUniformBlockName(t,i),o=e.getUniformBlockIndex(t,s),a=e.getActiveUniformBlockParameter(t,i,e.UNIFORM_BLOCK_DATA_SIZE);r[s]={name:s,index:o,size:a}}return r}function Le(t,e){const r={},n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const s=e.getActiveUniform(t,i),o=s.name.replace(/\[.*?\]$/,""),a=!!s.name.match(/\[.*?\]$/),c=le(e,s.type);r[o]={name:o,index:i,type:c,size:s.size,isArray:a,value:ue(c,s.size)}}return r}function W(t,e){const r=t.getShaderSource(e).split(`
`).map((u,l)=>`${l}: ${u}`),n=t.getShaderInfoLog(e),i=n.split(`
`),s={},o=i.map(u=>parseFloat(u.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(u=>u&&!s[u]?(s[u]=!0,!0):!1),a=[""];o.forEach(u=>{r[u-1]=`%c${r[u-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const c=r.join(`
`);a[0]=c,console.error(n),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}function He(t,e,r,n){t.getProgramParameter(e,t.LINK_STATUS)||(t.getShaderParameter(r,t.COMPILE_STATUS)||W(t,r),t.getShaderParameter(n,t.COMPILE_STATUS)||W(t,n),console.error("PixiJS Error: Could not initialize shader."),t.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(e)))}function ke(t,e){const r=k(t,t.VERTEX_SHADER,e.vertex),n=k(t,t.FRAGMENT_SHADER,e.fragment),i=t.createProgram();t.attachShader(i,r),t.attachShader(i,n);const s=e.transformFeedbackVaryings;s&&(typeof t.transformFeedbackVaryings!="function"?console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given."):t.transformFeedbackVaryings(i,s.names,s.bufferMode==="separate"?t.SEPARATE_ATTRIBS:t.INTERLEAVED_ATTRIBS)),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||He(t,i,r,n),e.attributeData=we(i,t),e.uniformData=Le(i,t),e.uniformBlockData=Oe(i,t),t.deleteShader(r),t.deleteShader(n);const o={};for(const c in e.uniformData){const u=e.uniformData[c];o[c]={location:t.getUniformLocation(i,c),value:ue(u.type,u.size)}}return new Ge(i,o)}const E={textureCount:0,blockIndex:0};class fe{constructor(e){this.programDataHash={},this.activeProgram=null,this.nextIndex=0,this.boundUniformsIdsToIndexHash={},this.boundIndexToUniformsHash={},this.renderer=e}contextChange(e){this.gl=e,this.maxBindings=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS)}bind(e,r){if(this.setProgram(e.glProgram),r)return;E.textureCount=0,E.blockIndex=0;const n=this.gl,i=this.getProgramData(e.glProgram);for(const s in e.groups){const o=e.groups[s];for(const a in o.resources){const c=o.resources[a];if(c instanceof y)c.ubo?this.bindUniformBlock(c,e.uniformBindMap[s][a],E.blockIndex++):this.updateUniformGroup(c);else if(c instanceof Z)this.bindUniformBlock(c,e.uniformBindMap[s][a],E.blockIndex++);else if(c instanceof $){this.renderer.texture.bind(c,E.textureCount);const u=e.uniformBindMap[s][a],l=i.uniformData[u];l&&n.uniform1i(l.location,E.textureCount++)}}}}updateUniformGroup(e){this.renderer.uniformGroup.updateUniformGroup(e,this.activeProgram,E)}bindUniformBlock(e,r,n=0){const i=this.renderer.buffer,s=this.getProgramData(this.activeProgram),o=e.bufferResource;o&&this.renderer.uniformBuffer.updateUniformGroup(e),i.updateBuffer(e.buffer);let a=this.boundUniformsIdsToIndexHash[e.uid];if(a===void 0){const l=this.nextIndex++%this.maxBindings,d=this.boundIndexToUniformsHash[l];d&&(this.boundUniformsIdsToIndexHash[d.uid]=void 0),a=this.boundUniformsIdsToIndexHash[e.uid]=l,this.boundIndexToUniformsHash[l]=e,o?i.bindBufferRange(e.buffer,l,e.offset):i.bindBufferBase(e.buffer,l)}const c=this.gl,u=this.activeProgram.uniformBlockData[r].index;s.uniformBlockBindings[n]!==a&&(s.uniformBlockBindings[n]=a,c.uniformBlockBinding(s.program,u,a))}setProgram(e){if(this.activeProgram===e)return;this.activeProgram=e;const r=this.getProgramData(e);this.gl.useProgram(r.program)}getProgramData(e){const r=e.key;return this.programDataHash[r]||this.createProgramData(e)}createProgramData(e){const r=e.key;return this.programDataHash[r]=ke(this.gl,e),this.programDataHash[r]}}fe.extension={type:[m.WebGLRendererSystem],name:"shader"};let b;function Ve(){if(typeof b=="boolean")return b;try{b=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch{b=!1}return b}const U=[{test:t=>t.type==="float"&&t.size===1&&!t.isArray,code:t=>`
            if(uv["${t}"] !== ud["${t}"].value)
            {
                ud["${t}"].value = uv["${t}"]
                gl.uniform1f(ud["${t}"].location, uv["${t}"])
            }
            `},{test:(t,e)=>(t.type==="sampler2D"||t.type==="samplerCube"||t.type==="sampler2DArray")&&t.size===1&&!t.isArray&&(e==null||e instanceof g),code:t=>`t = syncData.textureCount++;

            renderer.texture.bind(uv["${t}"], t);

            if(ud["${t}"].value !== t)
            {
                ud["${t}"].value = t;
                gl.uniform1i(ud["${t}"].location, t);
; // eslint-disable-line max-len
            }`},{test:(t,e)=>t.type==="mat3"&&t.size===1&&!t.isArray&&e.a!==void 0,code:t=>`
            gl.uniformMatrix3fv(ud["${t}"].location, false, uv["${t}"].toArray(true));
            `},{test:(t,e)=>t.type==="vec2"&&t.size===1&&!t.isArray&&e.x!==void 0,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${t}"].location, v.x, v.y);
                }`},{test:t=>t.type==="vec2"&&t.size===1&&!t.isArray,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${t}"].location, v[0], v[1]);
                }
            `},{test:(t,e)=>t.type==="vec4"&&t.size===1&&!t.isArray&&e.width!==void 0,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${t}"].location, v.x, v.y, v.width, v.height)
                }`},{test:(t,e)=>t.type==="vec4"&&t.size===1&&!t.isArray&&e.red!==void 0,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${t}"].location, v.red, v.green, v.blue, v.alpha)
                }`},{test:(t,e)=>t.type==="vec3"&&t.size===1&&!t.isArray&&e.red!==void 0,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${t}"].location, v.red, v.green, v.blue)
                }`},{test:t=>t.type==="vec4"&&t.size===1&&!t.isArray,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${t}"].location, v[0], v[1], v[2], v[3])
                }`}],We={float:`
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,vec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,vec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,vec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,int:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,ivec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,ivec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,ivec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,uint:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,uvec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,uvec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,uvec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,bool:`
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,bvec2:`
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,bvec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,bvec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,mat2:"gl.uniformMatrix2fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",sampler2D:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,samplerCube:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,sampler2DArray:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`},ze={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"};function Xe(t,e){const r=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(const n in t.uniforms){const i=e[n];if(!i){t.uniforms[n]instanceof y?t.uniforms[n].ubo?r.push(`
                        renderer.shader.bindUniformBlock(uv.${n}, "${n}");
                    `):r.push(`
                        renderer.shader.updateUniformGroup(uv.${n});
                    `):t.uniforms[n]instanceof Z&&r.push(`
                        renderer.shader.bindBufferResource(uv.${n}, "${n}");
                    `);continue}const s=t.uniforms[n];let o=!1;for(let a=0;a<U.length;a++)if(U[a].test(i,s)){r.push(U[a].code(n,s)),o=!0;break}if(!o){const c=(i.size===1&&!i.isArray?We:ze)[i.type].replace("location",`ud["${n}"].location`);r.push(`
            cu = ud["${n}"];
            cv = cu.value;
            v = uv["${n}"];
            ${c};`)}}return new Function("ud","uv","renderer","syncData",r.join(`
`))}class de{constructor(e){this.destroyed=!1,this.cache={},this.uniformGroupSyncHash={},this.renderer=e,this.systemCheck(),this.gl=null,this.cache={}}systemCheck(){if(!Ve())throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(e){this.gl=e}updateUniformGroup(e,r,n){const i=this.renderer.shader.getProgramData(r);(!e.isStatic||e.dirtyId!==i.uniformDirtyGroups[e.uid])&&(i.uniformDirtyGroups[e.uid]=e.dirtyId,this.getUniformSyncFunction(e,r)(i.uniformData,e.uniforms,this.renderer,n))}getUniformSyncFunction(e,r){var n;return((n=this.uniformGroupSyncHash[e.signature])==null?void 0:n[r.key])||this.createUniformSyncFunction(e,r)}createUniformSyncFunction(e,r){const n=this.uniformGroupSyncHash[e.signature]||(this.uniformGroupSyncHash[e.signature]={}),i=this.getSignature(e,r.uniformData,"u");return this.cache[i]||(this.cache[i]=Xe(e,r.uniformData)),n[r.key]=this.cache[i],n[r.key]}getSignature(e,r,n){const i=e.uniforms,s=[`${n}-`];for(const o in i)s.push(o),r[o]&&s.push(r[o].type);return s.join("-")}destroy(){this.renderer=null,this.destroyed=!0}}de.extension={type:[m.WebGLRendererSystem],name:"uniformGroup"};function $e(t){const e={};return e.normal=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e.add=[t.ONE,t.ONE],e.multiply=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e.screen=[t.ONE,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[t.SRC_ALPHA,t.ONE,t.ONE,t.ONE],e["screen-npm"]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e}const je=0,Ye=1,qe=2,Ke=3,Ze=4,Qe=5,F=class{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[je]=this.setBlend,this.map[Ye]=this.setOffset,this.map[qe]=this.setCullFace,this.map[Ke]=this.setDepthTest,this.map[Ze]=this.setFrontFace,this.map[Qe]=this.setDepthMask,this.checks=[],this.defaultState=new X,this.defaultState.blend=!0}contextChange(t){this.gl=t,this.blendModesMap=$e(t),this.set(this.defaultState),this.reset()}set(t){if(t=t||this.defaultState,this.stateId!==t.data){let e=this.stateId^t.data,r=0;for(;e;)e&1&&this.map[r].call(this,!!(t.data&1<<r)),e=e>>1,r++;this.stateId=t.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,t)}forceState(t){t=t||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(t.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,t);this.stateId=t.data}setBlend(t){this.updateCheck(F.checkBlendMode,t),this.gl[t?"enable":"disable"](this.gl.BLEND)}setOffset(t){this.updateCheck(F.checkPolygonOffset,t),this.gl[t?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(t){this.gl[t?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(t){this.gl.depthMask(t)}setCullFace(t){this.gl[t?"enable":"disable"](this.gl.CULL_FACE)}setFrontFace(t){this.gl.frontFace(this.gl[t?"CW":"CCW"])}setBlendMode(t){if(this.blendModesMap[t]||(t="normal"),t===this.blendMode)return;this.blendMode=t;const e=this.blendModesMap[t],r=this.gl;e.length===2?r.blendFunc(e[0],e[1]):r.blendFuncSeparate(e[0],e[1],e[2],e[3]),e.length===6?(this._blendEq=!0,r.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,r.blendEquationSeparate(r.FUNC_ADD,r.FUNC_ADD))}setPolygonOffset(t,e){this.gl.polygonOffset(t,e)}reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}updateCheck(t,e){const r=this.checks.indexOf(t);e&&r===-1?this.checks.push(t):!e&&r!==-1&&this.checks.splice(r,1)}static checkBlendMode(t,e){t.setBlendMode(e.blendMode)}static checkPolygonOffset(t,e){t.setPolygonOffset(1,e.polygonOffset)}destroy(){this.gl=null}};let he=F;he.extension={type:[m.WebGLRendererSystem],name:"state"};class Je{constructor(e){this.target=re.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=f.UNSIGNED_BYTE,this.internalFormat=C.RGBA,this.format=C.RGBA,this.samplerType=0}}const et={type:"image",upload(t,e,r){e.width===t.width||e.height===t.height?r.texSubImage2D(r.TEXTURE_2D,0,0,0,e.format,e.type,t.resource):r.texImage2D(e.target,0,e.internalFormat,t.width,t.height,0,e.format,e.type,t.resource),e.width=t.width,e.height=t.height}},tt={type:"image",upload(t,e,r){r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.alphaMode!==0),e.width===t.width||e.height===t.height?r.texSubImage2D(r.TEXTURE_2D,0,0,0,e.format,e.type,t.resource):r.texImage2D(e.target,0,e.internalFormat,t.pixelWidth,t.pixelHeight,0,e.format,e.type,t.resource),e.width=t.pixelWidth,e.height=t.pixelHeight}};function rt(t){return{r8unorm:t.RED,r8snorm:t.RED,r8uint:t.RED,r8sint:t.RED,r16uint:t.RED,r16sint:t.RED,r16float:t.RED,rg8unorm:t.RG,rg8snorm:t.RG,rg8uint:t.RG,rg8sint:t.RG,r32uint:t.RED,r32sint:t.RED,r32float:t.RED,rg16uint:t.RG,rg16sint:t.RG,rg16float:t.RG,rgba8unorm:t.RGBA,"rgba8unorm-srgb":t.RGBA,rgba8snorm:t.RGBA,rgba8uint:t.RGBA,rgba8sint:t.RGBA,bgra8unorm:t.RGBA,"bgra8unorm-srgb":t.RGBA,rgb9e5ufloat:t.RGB,rgb10a2unorm:t.RGBA,rg11b10ufloat:t.RGB,rg32uint:t.RG,rg32sint:t.RG,rg32float:t.RG,rgba16uint:t.RGBA,rgba16sint:t.RGBA,rgba16float:t.RGBA,rgba32uint:t.RGBA,rgba32sint:t.RGBA,rgba32float:t.RGBA,stencil8:t.STENCIL_INDEX8,depth16unorm:t.DEPTH_COMPONENT,depth24plus:t.DEPTH_COMPONENT,"depth24plus-stencil8":t.DEPTH_STENCIL,depth32float:t.DEPTH_COMPONENT,"depth32float-stencil8":t.DEPTH_STENCIL}}function nt(t){return{r8unorm:t.R8,r8snorm:t.R8_SNORM,r8uint:t.R8UI,r8sint:t.R8I,r16uint:t.R16UI,r16sint:t.R16I,r16float:t.R16F,rg8unorm:t.RG8,rg8snorm:t.RG8_SNORM,rg8uint:t.RG8UI,rg8sint:t.RG8I,r32uint:t.R32UI,r32sint:t.R32I,r32float:t.R32F,rg16uint:t.RG16UI,rg16sint:t.RG16I,rg16float:t.RG16F,rgba8unorm:t.RGBA,"rgba8unorm-srgb":t.SRGB8_ALPHA8,rgba8snorm:t.RGBA8_SNORM,rgba8uint:t.RGBA8UI,rgba8sint:t.RGBA8I,bgra8unorm:t.RGBA8,"bgra8unorm-srgb":t.SRGB8_ALPHA8,rgb9e5ufloat:t.RGB9_E5,rgb10a2unorm:t.RGB10_A2,rg11b10ufloat:t.R11F_G11F_B10F,rg32uint:t.RG32UI,rg32sint:t.RG32I,rg32float:t.RG32F,rgba16uint:t.RGBA16UI,rgba16sint:t.RGBA16I,rgba16float:t.RGBA16F,rgba32uint:t.RGBA32UI,rgba32sint:t.RGBA32I,rgba32float:t.RGBA32F,stencil8:t.STENCIL_INDEX8,depth16unorm:t.DEPTH_COMPONENT16,depth24plus:t.DEPTH_COMPONENT24,"depth24plus-stencil8":t.DEPTH24_STENCIL8,depth32float:t.DEPTH_COMPONENT32F,"depth32float-stencil8":t.DEPTH32F_STENCIL8}}function it(t){return{r8unorm:t.UNSIGNED_BYTE,r8snorm:t.BYTE,r8uint:t.UNSIGNED_BYTE,r8sint:t.BYTE,r16uint:t.UNSIGNED_SHORT,r16sint:t.SHORT,r16float:t.HALF_FLOAT,rg8unorm:t.UNSIGNED_BYTE,rg8snorm:t.BYTE,rg8uint:t.UNSIGNED_BYTE,rg8sint:t.BYTE,r32uint:t.UNSIGNED_INT,r32sint:t.INT,r32float:t.FLOAT,rg16uint:t.UNSIGNED_SHORT,rg16sint:t.SHORT,rg16float:t.HALF_FLOAT,rgba8unorm:t.UNSIGNED_BYTE,"rgba8unorm-srgb":t.UNSIGNED_BYTE,rgba8snorm:t.BYTE,rgba8uint:t.UNSIGNED_BYTE,rgba8sint:t.BYTE,bgra8unorm:t.UNSIGNED_BYTE,"bgra8unorm-srgb":t.UNSIGNED_BYTE,rgb9e5ufloat:t.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:t.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:t.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:t.UNSIGNED_INT,rg32sint:t.INT,rg32float:t.FLOAT,rgba16uint:t.UNSIGNED_SHORT,rgba16sint:t.SHORT,rgba16float:t.HALF_FLOAT,rgba32uint:t.UNSIGNED_INT,rgba32sint:t.INT,rgba32float:t.FLOAT,stencil8:t.UNSIGNED_BYTE,depth16unorm:t.UNSIGNED_SHORT,depth24plus:t.UNSIGNED_INT,"depth24plus-stencil8":t.UNSIGNED_INT_24_8,depth32float:t.FLOAT,"depth32float-stencil8":t.FLOAT_32_UNSIGNED_INT_24_8_REV}}const z={linear:9729,nearest:9728},st={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},D={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},ot={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};class me{constructor(e){this.glTextures={},this.glSamplers={},this.boundTextures=[],this.boundTexturesSamplers=[],this.activeTextureLocation=-1,this.boundSamplers={},this.managedTextureSources={},this.uploads={image:tt,buffer:et},this.renderer=e}contextChange(e){this.gl=e,this.mapFormatToInternalFormat||(this.mapFormatToInternalFormat=nt(e),this.mapFormatToType=it(e),this.mapFormatToFormat=rt(e));for(let r=0;r<16;r++)this.bind(g.EMPTY,r)}bind(e,r=0){e?(this.bindSource(e.source,r),this.bindSampler(e.style,r)):(this.bindSource(null,r),this.bindSampler(null,r))}bindSource(e,r=0){const n=this.gl;if(this.boundTextures[r]!==e){this.boundTextures[r]=e,this.activateLocation(r),e=e||g.EMPTY.source;const i=this.getGlSource(e);n.bindTexture(i.target,i.texture)}}bindSampler(e,r=0){const n=this.gl;if(!e){this.boundSamplers[r]=null,n.bindSampler(r,null);return}const i=this.getGlSampler(e);this.boundSamplers[r]!==i&&(this.boundSamplers[r]=i,n.bindSampler(r,i))}unbind(e){const r=e.source,n=this.boundTextures,i=this.gl;for(let s=0;s<n.length;s++)if(n[s]===r){this.activateLocation(s);const o=this.getGlSource(r);i.bindTexture(o.target,null),n[s]=null}}activateLocation(e){this.activeTextureLocation!==e&&(this.activeTextureLocation=e,this.gl.activeTexture(this.gl.TEXTURE0+e))}initSource(e){const r=this.gl,n=new Je(r.createTexture());if(n.type=this.mapFormatToType[e.format],n.internalFormat=this.mapFormatToInternalFormat[e.format],n.format=this.mapFormatToFormat[e.format],e.autoGenerateMipmaps){const i=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(i))+1}return this.glTextures[e.uid]=n,e.on("update",this.onSourceUpdate,this),e.on("destroy",this.onSourceDestroy,this),this.onSourceUpdate(e),n}onSourceUpdate(e){const r=this.gl,n=this.glTextures[e.uid];r.bindTexture(r.TEXTURE_2D,n.texture),this.boundTextures[this.activeTextureLocation]=e,this.uploads[e.type]?(this.uploads[e.type].upload(e,n,this.gl),e.autoGenerateMipmaps&&e.mipLevelCount>1&&r.generateMipmap(n.target)):r.texImage2D(r.TEXTURE_2D,0,r.RGBA,e.pixelWidth,e.pixelHeight,0,r.RGBA,r.UNSIGNED_BYTE,null)}onSourceDestroy(e){const r=this.gl;e.off("destroy",this.onSourceDestroy,this),e.off("update",this.onSourceUpdate,this);const n=this.glTextures[e.uid];delete this.glTextures[e.uid],r.deleteTexture(n.target)}initSampler(e){const r=this.gl,n=this.gl.createSampler();if(this.glSamplers[e.resourceId]=n,r.samplerParameteri(n,r.TEXTURE_WRAP_S,D[e.addressModeU]),r.samplerParameteri(n,r.TEXTURE_WRAP_T,D[e.addressModeV]),r.samplerParameteri(n,r.TEXTURE_WRAP_R,D[e.addressModeW]),r.samplerParameteri(n,r.TEXTURE_MAG_FILTER,z[e.minFilter]),this.boundTextures[this.activeTextureLocation].mipLevelCount>1){const s=st[e.minFilter][e.mipmapFilter];r.samplerParameteri(n,r.TEXTURE_MIN_FILTER,s)}else r.samplerParameteri(n,r.TEXTURE_MIN_FILTER,z[e.magFilter]);const i=this.renderer.context.extensions.anisotropicFiltering;if(i&&e.maxAnisotropy>1){const s=Math.min(e.maxAnisotropy,r.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));r.samplerParameteri(n,i.TEXTURE_MAX_ANISOTROPY_EXT,s)}return e.compare&&r.samplerParameteri(n,r.TEXTURE_COMPARE_FUNC,ot[e.compare]),this.glSamplers[e.resourceId]}getGlSampler(e){return this.glSamplers[e.resourceId]||this.initSampler(e)}getGlSource(e){return this.glTextures[e.uid]||this.initSource(e)}destroy(){throw new Error("Method not implemented.")}}me.extension={type:[m.WebGLRendererSystem],name:"texture"};const at=[ie,N,te,me,ae,ne,de,fe,oe,he,ce,se,Q,ee,J],R=class extends _e{constructor(){super(),this.type="webgl",this.renderPipes={};const t={runners:["init","destroy","contextChange","reset","update","postrender","prerender","resize"],systems:R.__systems,pipes:R.__pipes},e={...R.__pipesAdaptors};Object.keys(t.pipes).forEach(r=>{var o;const n=t.pipes[r],i=(o=e[r])==null?void 0:o.adaptor,s=r;i?this.renderPipes[s]=new n(this,new i):this.renderPipes[s]=new n(this)}),this.setup(t),ge(this.type)}resize(t,e,r){this.view.resizeView(t,e,r)}async init(t){t=Object.assign({},{...be,...N.defaultOptions},t),this.options=t,this.startup.run(this.options)}render(t,e){e instanceof HTMLCanvasElement&&(e=Te(e)),e||(e=this.backBuffer.renderToBackBuffer(this.view.texture)),this.runners.prerender.emit(),this.renderTarget.start(e,!0,this.background.colorRgba),this.layer.render(t),this.backBuffer.presentBackBuffer(),this.renderTarget.finish(),this._lastObjectRendered=t,this.runners.postrender.emit()}get resolution(){return this.view.resolution}set resolution(t){this.view.resolution=t}get width(){return this.view.texture.frameWidth}get height(){return this.view.texture.frameHeight}get canvas(){return this.view.element}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return!0}get rendererLogId(){return`WebGL ${this.context.webGLVersion}`}};let _=R;_.__systems=[];_.__pipes={};_.__pipesAdaptors={};I.handleByNamedList(m.WebGLRendererSystem,_.__systems);I.handleByMap(m.WebGLRendererPipes,_.__pipes);I.handle(m.WebGLRendererPipesAdaptor,t=>{_.__pipesAdaptors[t.name]={adaptor:t.ref}},t=>{delete _.__pipesAdaptors[t.name]});I.add(...xe,...at);export{_ as WebGLRenderer};
