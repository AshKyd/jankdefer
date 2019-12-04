import babel from "rollup-plugin-babel";

export default {
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // only transpile our source code
    })
  ]
};
