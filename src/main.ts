import { InitGPU, CreateGPUBuffer } from './helper';
import { Shaders } from './shaders'; 

const CreateSquare = async () => {
    const gpu = await InitGPU();
    const device = gpu.device;

    const vertexData = new Float32Array([
       -0.5, -0.5,  // vertex a
        0.5, -0.5,  // vertex b
       -0.5,  0.5,  // vertex d
       -0.5,  0.5,  // vertex d
        0.5, -0.5,  // vertex b
        0.5,  0.5,  // vertex c
   ]);

   const colorData = new Float32Array([
        1, 0, 0,    // vertex a: red
        0, 1, 0,    // vertex b: green
        1, 1, 0,    // vertex d: yellow
        1, 1, 0,    // vertex d: yellow
        0, 1, 0,    // vertex b: green
        0, 0, 1     // vertex c: blue
    ]);

    const vertexBuffer = CreateGPUBuffer(device, vertexData);
    const colorBuffer = CreateGPUBuffer(device, colorData);
    
    const shader = Shaders();
    const pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({                    
                code: shader.vertex
            }),
            entryPoint: "main",
            buffers:[
                {
                    arrayStride: 8,
                    attributes: [{
                        shaderLocation: 0,
                        format: "float32x2",
                        offset: 0
                    }]
                },
                {
                    arrayStride: 12,
                    attributes: [{
                        shaderLocation: 1,
                        format: "float32x3",
                        offset: 0
                    }]
                }
            ]
        },
        fragment: {
            module: device.createShaderModule({                    
                code: shader.fragment
            }),
            entryPoint: "main",
            targets: [
                {
                    format: gpu.format as GPUTextureFormat
                }
            ]
        },
        primitive:{
            topology: "triangle-list",
        }
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = gpu.context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            loadValue: { r: 0.5, g: 0.5, b: 0.8, a: 1.0 }, //background color
            storeOp: 'store'
        }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.setVertexBuffer(1, colorBuffer);
    renderPass.draw(6);
    renderPass.endPass();

    device.queue.submit([commandEncoder.finish()]);
}

CreateSquare();




