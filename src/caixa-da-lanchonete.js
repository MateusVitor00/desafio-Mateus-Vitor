class CaixaDaLanchonete {
  constructor() {
    this.cardapio = [
      new itemCardapio("cafe", "Café", 3.0),
      new itemCardapio(
        "chantily",
        "Chantily (extra do Café)",
        1.5,
        true,
        "cafe"
      ),
      new itemCardapio("suco", "Suco natural", 6.2),
      new itemCardapio("sanduiche", "Sanduíche", 6.5),
      new itemCardapio("queijo", "Queijo(extra do sanduíche)", 2.0, true, "sanduice" ),
      new itemCardapio("salgado", "Salgado", 7.25),
      new itemCardapio("combo1", "1 Suco e 1 Sanduíche", 9.5),
      new itemCardapio("combo2", "1 Café e 1 Sanduíche", 7.5),
    ];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!metodosDePagamento.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0;

    for (const itemPedido of itens) {
      const [codigo, quantidade] = itemPedido.split(",");
      const itemCardapio = this.cardapio.find((item) => item.codigo === codigo);

      if (!itemCardapio) {
        return "Item inválido!";
      }
      

      if (quantidade <= 0 && metodoDePagamento === "dinheiro") {
        return "Quantidade inválida!";
      }

      if (itemCardapio.ehExtra && metodoDePagamento) {
        const itemPrincipal = this.cardapio.find(
          (item) => item.codigo === itemCardapio.itemPrincipal
        );
        if (!itens.includes(itemPrincipal)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }


        valorTotal += itemCardapio.valor;
    }

      if (metodoDePagamento === "dinheiro") {
        valorTotal *= 0.95;
      } else if (metodoDePagamento === "credito") {
        valorTotal *= 1.03;
      } else {
        valorTotal

    }


    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}
const metodosDePagamento = ["dinheiro", "credito", "debito"];

class itemCardapio {
  constructor(codigo, descricao, valor, ehExtra = false, itemPrincipal) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.valor = valor;
    this.ehExtra = ehExtra;
    this.itemPrincipal = itemPrincipal;
  }
}

export { CaixaDaLanchonete };
