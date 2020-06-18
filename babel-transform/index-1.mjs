import babel from "@babel/core";

const code = 'const n = 1';


/* code -> AST -> transformed AST -> transformed code */


function myCustomPlugin() {
  return {
    visitor: {
      Identifier(path) {
        // change all `n` to `x`
        if (path.isIdentifier({ name: "n" })) {
          path.node.name = "x";
        }
      },
    },
  };
}

const Plugin = {
  plugins: [myCustomPlugin],
}

const output = babel.transformSync(code, Plugin);

console.log(output.code);
