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

            despesa.id = i
            
            despesas.push(despesa)

        }
        return despesas
    }

    pesquisar(dado) {

        let despesasFiltradas = []

        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesasFiltradas)

        //ano
        if (dado.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == dado.ano)
        }
            
        //mes
        if (dado.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == dado.mes)
        }
        //dia
        if (dado.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == dado.dia)
        }
        //tipo
        if (dado.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == dado.dia)
        }
        //desc
        if (dado.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == dado.descricao)
        }
        //valor
        if (dado.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == dado.valor)
        }

        return despesasFiltradas
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


function carregaListaDespesas(despesas = []) {

    
    if (despesas.length == 0) {
        despesas = bd.recuperarTodosRegistros()
    }
    
    var listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    

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

       //criar btn de exclusão 

       let btn = document.createElement('button')
       btn.className = 'btn btn-danger'
       btn.innerHTML = '<i class = "fas fa-times">'
       btn.onclick = function() {

       }
       linha.insertCell(4).append(btn)


        
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



    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas)


}


