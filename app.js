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

    let despesas = []

    despesas = bd.recuperarTodosRegistros()

    var listaDespesas = document.getElementById('listaDespesas')
    

    // percorrer o array e listar 
    despesas.forEach(function(d){

       let linha =  listaDespesas.insertRow()
       linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 

       //ajustar tipo

       switch (d.tipo) {
           case '1': d.tipo = 'Alimentação' 
                break
           case '2': d.tipo = 'Educação' 
                break
           case '3': d.tipo = 'Lazer' 
                break
           case '4': d.tipo = 'Saúde' 
                break  
           case '5': d.tipo = 'Transporte' 
                break   
        }
            

       linha.insertCell(1).innerHTML = d.tipo
       linha.insertCell(2).innerHTML = d.descricao
       linha.insertCell(3).innerHTML = d.valor


        
    })
}

function pesquisarDespesa () {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value 
    let tipo = document.getElementById('tipo').value 
    let descricao = document.getElementById('descricao').value 
    let valor = document.getElementById('valor').value 

    

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)



    console.log(despesa)


}


