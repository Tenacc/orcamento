class Despesa {
    constructor(ano,mes,dia,tipo,descricao,valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if (this[i] === undefined || this[i] === '' || this[i] === null) {
                return false
            }
        } 
        return true  
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }


    //metodos da classe
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
       
       let id = this.getProximoId()

       localStorage.setItem(id, JSON.stringify(d))

       localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        // array de despesas 
        let despesas = []

        let id = localStorage.getItem('id')

        //recuperar todas as despesas do local storage
        for(let i = 1; i <= id; i++) {

            //recuperar a despesa 
            let despesa = JSON.parse(localStorage.getItem(i))
            

            // verificar se existem itens excluidos
            if(despesa === null) {
                continue
            }

            despesas.push(despesa)

        }
        return despesas
    }
    
}

let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value

    ) 
    
    if (despesa.validarDados()) {
        bd.gravar(despesa)
        $('#sucessoGravacao').modal('show') //comando de jquery
    } else {
        $('#erroGravacao').modal('show') //comando de jquery
    }
   
}


function carregaListaDespesas() {
    
}


