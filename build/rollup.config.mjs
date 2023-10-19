import terser from '@rollup/plugin-terser';
export default {
    input: 'src/TileFetch.js',
    output: [
        {
            file: 'dist/Leaflet.TileLayer.TileFetch.js',
            format: 'umd',
            name: 'L.TileLayer.TileFetch',
            // sourcemap: true,
            globals: {
            },
        },
        {
            file: 'dist/Leaflet.TileLayer.TileFetch.min.js',
            format: 'umd',
            name: 'L.TileLayer.TileFetch',
            plugins: [terser()],
        },
    ],
};
