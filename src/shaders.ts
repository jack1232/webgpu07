export const Shaders = () => {
    const vertex = `
        [[location(0)]] var<in> position : vec4<f32>;
        [[location(1)]] var<in> color : vec4<f32>;
        [[builtin(position)]] var<out> Position : vec4<f32>;
        [[location(0)]] var<out> vColor : vec4<f32>;

        [[stage(vertex)]]
        fn main() -> void {
            Position = position;
            vColor = color;
            return;
        }`;

    const fragment = `
        [[location(0)]] var<in> vColor : vec4<f32>;
        [[location(0)]] var<out> fragColor : vec4<f32>;

        [[stage(fragment)]]
        fn main() -> void {
            fragColor = vColor;
            return;
        }`;

    return {
        vertex, 
        fragment
    };
}
