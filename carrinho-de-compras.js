const database = require("./db-produtos");
const readline = require("readline-sync");

const { produtos } = database;

produtos.sort((a, b) => a.preco - b.preco);

const carrinho = [];

console.log("--------------------------------------");
console.log(" ");
console.log("Seja bem-vindo à {reprograma}market!");
console.log(" ");
console.log("--------------------------------------");

const encontrarPorCategoria = () => {
    const perguntaCategorias = readline.question("Voce deseja encontrar os produtos por categoria? (S/N)").toUpperCase();
    console.log("--------------------------------------");
    
    if (perguntaCategorias === "S") {
        console.log("Essas são as nossas categorias:");
        console.log("Alimento, Bebida, Casa, Higiene, Informatica");
        console.log("--------------------------------------");
        
        const perguntaQualCategoria = readline.question("Qual categoria voce deseja ver?").toLowerCase();
        console.log("--------------------------------------");

        const produtosEncontradosPorCategoria = produtos.filter(produto => produto.categoria === perguntaQualCategoria);

        if (produtosEncontradosPorCategoria.length > 0) {
            console.table(produtosEncontradosPorCategoria);
            console.log("--------------------------------------");
        } else {
            console.log("Resposta inválida. Por favor, tente novamente.");
            console.log("--------------------------------------");
            encontrarPorCategoria();
        }
    
    } else if (perguntaCategorias.toUpperCase() === "N") {
        console.log("Esses são todos os produtos disponíveis:");
        console.table(produtos);
        console.log("--------------------------------------");
    } else {
        console.log("Resposta inválida. Por favor, tente novamente.");
        console.log("--------------------------------------");
        encontrarPorCategoria();
    }
}
encontrarPorCategoria()


const compras = () => {

    const perguntaId = parseInt(readline.question("Digite o id do produto:"));
    console.log("--------------------------------------");
    
    const produtoEncontradoPorId = produtos.find(produto => produto.id === perguntaId)
    if (produtoEncontradoPorId) {
        console.log("Produto registrado!");
        console.log("--------------------------------------");
    } else {
        console.log("Resposta inválida. Por favor, tente novamente.");
        console.log("--------------------------------------");
        compras()
    }

    const validarQuantidade = () => {

        perguntaQuantidade = parseInt(readline.question("Quantas unidades voce deseja comprar desse produto?"));
        console.log("--------------------------------------");

        if (perguntaQuantidade > 0) {
            console.log("Parabéns! Seu(s) produto(s) está(ão) no carrinho!");
            console.log("--------------------------------------");
        } else {
            console.log("Resposta inválida. Por favor, tente novamente.");
            console.log("--------------------------------------");
            validarQuantidade();
        }
    };
    validarQuantidade();

    const produtosAdicionados = {
        ...produtoEncontradoPorId, 
        quantidade: perguntaQuantidade
    };

    carrinho.push(produtosAdicionados);

    const perguntaContinuarComprando = readline.question("Voce deseja continuar comprando? (S/N)").toUpperCase();
    console.log("--------------------------------------");

    if (perguntaContinuarComprando === "S") {
        console.log("Esses são os produtos disponíveis:");
        console.table(produtos)
        console.log("--------------------------------------");
        compras()
    } else {
        perguntaCupom = readline.question("Voce tem algum cupom de desconto? (S/N)").toUpperCase();
        console.log("--------------------------------------");
        {
            if (perguntaCupom === "S") {
                perguntaValorCupom = parseInt(readline.question("Por favor, insira o valor do cupom:"));
                console.log("--------------------------------------");

                for (i = 0; i <= 1000; i++) {
                    if (perguntaValorCupom > 15 || perguntaValorCupom < 0) {
                        console.log("Valor inválido, tente novamente.");
                        perguntaValorCupom = parseInt(readline.question("Por favor, insira o valor do cupom:"))
                        console.log("--------------------------------------");
                    } else {
                        break
                    }
                }
            } else {
                console.log("Obrigada pro comprar com a gente! Volte sempre <3");
                console.log("--------------------------------------");
            }
        }
    }
}
compras()


class Pedido {
    constructor(carrinho) {
        this.produtoAdicionado = carrinho,
        this.subtotal = 0
    }

    calculoSubtotal() {
        this.subtotal = this.produtoAdicionado.reduce((accumulator, produto) => accumulator + (produto.preco * produto.quantidade), 0)
    }
}

const pedido = new Pedido(carrinho)
console.table(pedido.produtoAdicionado)

pedido.calculoSubtotal()
console.log(`O valor do seu pedido foi: R$ ${pedido.subtotal.toFixed(2)}`);
console.log("--------------------------------------");

const desconto = pedido.subtotal * (perguntaValorCupom/100)
console.log(`O valor do seu desconto foi: R$ ${desconto.toFixed(2)}`);
console.log("--------------------------------------");

const valorFinal = pedido.subtotal - desconto
console.log(`O valor final do seu pedido é R$ ${valorFinal.toFixed(2)}`);