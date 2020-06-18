import babel from '@babel/core'


const code = `
    function greet(name) {
        return 'Hello ' + name;
    }
    console.log(greet('tanhauhau')); // Hello tanhauhau
    `;

/*Demo how to use visitor pattern to go AST*/

function myPlugin() {
  return {
    visitor: {

      Identifier(path){
        path.node.name = path.node.name.split('').reverse().join('')
      },

    }
  }
}




const Plugin = {
  plugins: [myPlugin],
}

const output = babel.transformSync(code, Plugin);

console.log(output.code);