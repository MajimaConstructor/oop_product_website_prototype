document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("table");
  });
  
  class Produto {
    constructor() {
      this.id = 1;
      this.ArrayProduto = [];
      this.idadd = null;
    }
  
    salvar() {
      let produto = this.lerCampos();
  
      if (this.verifica(produto)) {
        if (this.idadd === null) {
          this.adicionar(produto);
        } else {
          this.atualizar(this.idadd, produto);
        }
        this.insereCampos();
        this.cancelar();
      }
    }
  
    verifica(produto) {
      let objProd = {};
      objProd.id = this.id;
      objProd.nome = document.getElementById("nomeProd").value;
      objProd.valor = document.getElementById("valorProd").value;
      let verificaVF;
      if (objProd.nome == "" || objProd.valor == "") {
        verificaVF = false;
      } else {
        verificaVF = true;
      }
      return verificaVF;
    }
  
    lerCampos() {
      let objProd = {};
      objProd.id = this.id;
      objProd.nome = document.getElementById("nomeProd").value;
      objProd.valor = document.getElementById("valorProd").value;
  
      if (this.verifica(objProd)) {
        return objProd;
      } else {
        alert("Preencha todos os campos.");
      }
    }
  
    adicionar(produtoRecebido) {
      this.ArrayProduto.push(produtoRecebido);
      this.id++;
    }
  
    cancelar() {
      document.getElementById("nomeProd").value = "";
      document.getElementById("valorProd").value = "";
      this.idadd = null;
      document.getElementById("btn").innerText = "SALVAR";
    }
  
    insereCampos() {
      let tbody = document.getElementById("tbody");
      tbody.innerHTML = "";
      for (let i = 0; i < this.ArrayProduto.length; i++) {
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_nome = tr.insertCell();
        let td_valor = tr.insertCell();
        let td_acao = tr.insertCell();
  
        td_id.innerText = this.ArrayProduto[i].id;
        td_nome.innerText = this.ArrayProduto[i].nome;
        td_valor.innerText = this.ArrayProduto[i].valor;
  
        let imgExcluir = document.createElement("img");
        imgExcluir.src = "excluir.png";
        imgExcluir.setAttribute("onclick", `produto.deletar(${this.ArrayProduto[i].id})`);
        td_acao.appendChild(imgExcluir);
  
        let imgEditar = document.createElement("img");
        imgEditar.src = "editar.png";
        imgEditar.setAttribute("onclick", `produto.editar(${this.ArrayProduto[i].id})`);
        td_acao.appendChild(imgEditar);
      }
    }
  
    deletar(id) {
      if (confirm("Deseja apagar?")) {
        let tbody = document.getElementById("tbody");
        for (let i = 0; i < this.ArrayProduto.length; i++) {
          if (this.ArrayProduto[i].id === id) {
            this.ArrayProduto.splice(i, 1);
            tbody.deleteRow(i);
            this.insereCampos();
            return;
          }
        }
      }
    }
  
    editar(id) {
      this.idadd = id;
      for (let i = 0; i < this.ArrayProduto.length; i++) {
        if (this.ArrayProduto[i].id === id) {
          document.getElementById("nomeProd").value = this.ArrayProduto[i].nome;
          document.getElementById("valorProd").value = this.ArrayProduto[i].valor;
          document.getElementById("btn").innerText = "ATUALIZAR";
          return;
        }
      }
    }
  
    atualizar(id, produto) {
      for (let i = 0; i < this.ArrayProduto.length; i++) {
        if (this.ArrayProduto[i].id === id) {
          this.ArrayProduto[i].nome = produto.nome;
          this.ArrayProduto[i].valor = produto.valor;
          this.idadd = null;
          document.getElementById("btn").innerText = "SALVAR";
          this.insereCampos();
        }
      }
    }
  }
  
  let produto = new Produto();
  