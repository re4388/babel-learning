import babel from '@babel/core'


const code = `
    function greet(name) {
        return 'Hello ' + name;
    }
    console.log(greet('tanhauhau')); // Hello tanhauhau
    `;

function myCustomPlugin() {
  return {
      visitor: {
          /* split out string into individual characters */
          StringLiteral(path) {
              const concat = path.node.value
                  .split('')
                  // use the utility function from @babel/types
                  .map(c => babel.types.stringLiteral(c))
                  .reduce((prev, curr) => {
                      return babel.types.binaryExpression('+', prev, curr);
                  });
              path.replaceWith(concat);


              // for each visit StringLiteral, we use babel.types to create stringLiteral
              // so visitor will keep visit newly created stringLiteral
              // use skip to stop and no need to go down and visit the newly created node
              path.skip();
          },

          /* reverse all the `variables` and `functions` names */
          Identifier(path) {
              if (
                  !(
                      path.parentPath.isMemberExpression() &&
                      path.parentPath
                      .get('object')
                      .isIdentifier({
                          name: 'console'
                      }) &&
                      path.parentPath.get('property').isIdentifier({
                          name: 'log'
                      })
                  )
              ) {
                  path.node.name = path.node.name
                      .split('')
                      .reverse()
                      .join('');
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