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
      /* visitor wil go thru each Identifier*/
      Identifier(path){
        console.log('Identifier');
      },
      /* visitor wil go thru each StringLiteral*/
      StringLiteral(path){
        console.log(`StringLiteral`);
      }

    }
  }
}




const Plugin = {
  plugins: [myPlugin],
}

const output = babel.transformSync(code, Plugin);

console.log(output.code);