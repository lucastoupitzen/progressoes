function dialogo() {
    // colhe os dados fornecidos pelo usuário
    var primeiroTermo = document.getElementById("primeiroTermo").value
    var termoQualquer = [document.getElementById("posicaoTermo").value, document.getElementById("valorTermo").value] // é uma lista que receber a posicao e o termo [n,an]
    var quantiTermos = document.getElementById("quantiTermos").value
    var razao = document.getElementById("razao").value
    var somaTermos = document.getElementById("somaTermos").value
    var valorQualquer_posicao = document.getElementById("valorQualquer") 
    var metodos = document.getElementById("metodos").value
    var output = document.getElementById("output")
    var teste = document.getElementById("teste")
    // verificar se é possível realizar a operação desejada no método
    var verifica_termos = verificador(primeiroTermo,termoQualquer,quantiTermos,razao,somaTermos,output)
    if (verifica_termos == true) {
        // criar uma lista "[0]" de 0 e 1 para saber quais termos temos e outra lista"[1]" " com seus valores
        var apontaTermo = apontaTermos(primeiroTermo,termoQualquer,quantiTermos,razao,somaTermos,valorQualquer_posicao,teste)
        if (apontaTermo[0][0] == 1 && apontaTermo[0][3] == 1 && apontaTermo[0][5] == 1 && apontaTermo[0][6] == 0) {
            resolve(apontaTermo[1], metodos,output)
        } else {
            resolve(arruma(apontaTermo,output,teste), metodos,output)
        }
    }

}
function verificador(primeiroTermo,termoQualquer,quantiTermos,razao,somaTermos,output) {
    // verifica se os dois termos da lista "termoQualquer" foram preenchidos
    if (termoQualquer[0].length != 0 && termoQualquer[1].length != 0) {
        var lista = [primeiroTermo, quantiTermos,razao,somaTermos]
        //verifica se há um terceiro termo já preenchido
        for (i = 0; i < lista.length; i++){
            if (lista[i].length != 0) { 
                return true
            } else {
                //avisa o usuário que falta um termo
                output.innerHTML = "É necessário fornecer mais 1 dado."
            }
        } 
    // verifica se a lista está vazia e confere a presença dos demais parâmetros, tendo que somar 3
    } else if (termoQualquer[0].length == 0 && termoQualquer[1].length == 0) {
        var lista = [primeiroTermo, quantiTermos,razao,somaTermos]
        var contador = 0
        for (i = 0; i < lista.length; i++){
            if (lista[i].length != 0) {
                contador++
            } 
        }
        if (contador >= 3){
            return true
        } else {
            output.innerHTML = `É necessário fornecer mais ${3-contador} dado(s)`
        }         
    } else {
        // erro no termoQualquer -> forneceu apenas um parâmetro
        output.innerHTML = "Para utilizar um termo qualquer como dado, você deve necessariamente informar a posição e o valor do termo."
    }
}
function apontaTermos(primeiroTermo,termoQualquer,quantiTermos,razao,somaTermos,valorQualquer,teste) {
    // vai percorrer a lista de termos para detectar aqueles que já foram dados
    // retorna uma lista de 0 e 1 seguindo uma ordem que servirá de controle
    var lista = [primeiroTermo,termoQualquer[0],termoQualquer[1],razao,somaTermos,quantiTermos,valorQualquer]
    var lista_final = {
        "index" : [],
        "valores" : []
    }
    if (lista[6] != null) {
        lista[6] = lista[6].value
        for (i = 0; i < lista.length; i++) {
            if (lista[i].length != 0) {
                lista_final.index.push(1)
                lista_final.valores.push(Number(lista[i]))
            } else {
                lista_final.index.push(0)
                lista_final.valores.push(0)
            }
        }
    } else {
        for (i = 0; i < lista.length - 1; i++) {
            if (lista[i].length != 0) {
                lista_final.index.push(1)
                lista_final.valores.push(Number(lista[i]))
            } else {
                lista_final.index.push(0)
                lista_final.valores.push(0)
            }
        } 
        lista_final.index.push(0)
        lista_final.valores.push(0)
    }
    return [lista_final.index , lista_final.valores]
}
function arruma(apontaTermo,output,teste) {
    if (apontaTermo[0][5] == 0 && apontaTermo[0][1]==1) {
        // deu an mas não deu n
        apontaTermo[1][5] = apontaTermo[1][1]
        apontaTermo[0][5] = 1
    }
    if (apontaTermo[0][0] == 0) {
        // se a1 não foi dado
        if (apontaTermo[0][1] == 1 && apontaTermo[0][2] == 1 && apontaTermo[0][4] == 1) {
            // deu a soma e o an
            if (apontaTermo[1][1] == apontaTermo[1][5]) {
                var a1 = ((2*apontaTermo[1][4])/apontaTermo[1][1]) - apontaTermo[1][2]
                apontaTermo[1][0] = a1
                apontaTermo[0][0] = 1
                var r = (apontaTermo[1][2] - a1)/(apontaTermo[1][1] - 1)
                apontaTermo[1][3] = r
            } else {
                var apoio = apontaTermo[1][5] - (apontaTermo[1][1]-1)
                if (apoio != apontaTermo[1][1]) {
                    var a_apoio = ((2*apontaTermo[1][4])/apontaTermo[1][5]) - apontaTermo[1][2]
                    var r = (apontaTermo[1][2] - a_apoio)/(apontaTermo[1][1] - apoio)
                    apontaTermo[1][3] = r
                    apontaTermo[0][3] = 1
                    var a1 = apontaTermo[1][2] - (apontaTermo[1][1]-1)*r
                    apontaTermo[1][0] = a1
                    apontaTermo[0][0] = 1
                }   
            }
        } else if (apontaTermo[0][1] == 1 && apontaTermo[0][2] == 1 && apontaTermo[0][3] == 1){
            // deu an e a razao
            var a1 = apontaTermo[1][2] - (apontaTermo[1][1]-1)*apontaTermo[1][3]
            apontaTermo[1][0] = a1
            apontaTermo[0][0] = 1
        } else if (apontaTermo[0][3] == 1 && apontaTermo[0][4] == 1 && apontaTermo[0][5] == 1) {
            // deu a soma, n e razao
            var a1 = (((apontaTermo[1][4]*2)/apontaTermo[1][5]) - (apontaTermo[1][5]- 1)*apontaTermo[1][3])/2
            apontaTermo[1][0] = a1
            apontaTermo[0][0] = 1
        } 
        
    } 
    if (apontaTermo[0][3] == 0) {
        // não deu a razao
        if (apontaTermo[0][0] == 1 && apontaTermo[0][1] == 1 && apontaTermo[0][2] == 1){
            // deu a1 e deu an
            var r = (apontaTermo[1][2] - apontaTermo[1][0])/(apontaTermo[1][1]-1)
            apontaTermo[1][3] = r
        } else if (apontaTermo[0][0] == 1 && apontaTermo[0][4]==1 && apontaTermo[0][5]==1) {
            // deu a1, soma e n
            var r = (((apontaTermo[1][4]*2)/apontaTermo[1][5]) - 2*apontaTermo[1][0])/(apontaTermo[1][5]-1)
            apontaTermo[1][3] = r
        } 
    }
    apontaTermo[0][3] = 1
    if (apontaTermo[0][5] == 0) {
        if (apontaTermo[0][0] == 1 && apontaTermo[0][3] == 1 && apontaTermo[0][4] == 1) {
            // deu a1, r e a soma
            var n = bhaskara(apontaTermo[1][3],apontaTermo[1][0],apontaTermo[1][4],output)
            apontaTermo[1][5] = n
        }
    }
    apontaTermo[0][5] = 1
    if (apontaTermo[0][6] == 1) {
        if (apontaTermo[1][6] <= apontaTermo[1][5]) {
            var valorQualquer_termo = apontaTermo[1][0] + (apontaTermo[1][6]-1)*apontaTermo[1][3]
            output.innerHTML = `O ${apontaTermo[1][6]}º termo é ${valorQualquer_termo}.`
        } else {
            output.innerHTML = "Erro: Essa posição não existe na PA com tais propriedades"
        }
    } else if (apontaTermo[0][0] == 0) {
        output.innerHTML = "Os dados fornecidos são insuficientes. Na condição dada, existem infinitas progressões que satisfazem as condições. Evite fornecer o termo central da PA."
    }else {
        return apontaTermo[1]
    }
}

function bhaskara(r,a1,soma,output) {
    var resultado = ((r - 2*a1) + (((2*a1 - r)**2 + 8*soma*r))**0.5)/(2*r)
    if (Number.parseInt(resultado) == resultado && resultado > 0) {
        return resultado
    } else {
        var resultado = ((r -2*a1) - (((2*a1 - r)**2 + 8*soma*r))**0.5)/(2*r)
        if (Number.parseInt(resultado) == resultado && resultado > 0) {
            return resultado
        } else {
            output.innerHTML = 'Não existe uma PA com essas propriedades.'
        }   
    }
}
function resolve(lista, metodo, output) {
    switch (metodo) {
        case "visualizar": 
            var soma = (2*lista[0] + (lista[5]-1)*lista[3])*(lista[5]/2)
            if (lista[5] == null){
                output.innerHTML = 'Não existe uma PA com essas propriedades.'
            } else if (lista[4] != 0 && soma != lista[4]) {
                output.innerHTML = 'Não existe uma PA com essas propriedades.'
            } else {
                pa_completa = []
                valor = lista[0]
                for(i = 0; i < lista[5]; i++){
                    pa_completa.push(valor)
                    valor += lista[3]
                }
                for (i in pa_completa) {
                    if ((Math.round(pa_completa[i]) > pa_completa[i] && pa_completa[i] > (Math.round(pa_completa[i]) - 0.00000001)) || (Math.round(pa_completa[i]) < pa_completa[i] && pa_completa[i] < (Math.round(pa_completa[i]) + 0.00000001))) {
                        pa_completa[i] = Math.round(pa_completa[i])
                    }
                }
                var texto = ''
                pa_completa.forEach(function(num) {
                    texto += num
                    texto += ", "
                }) 
                output.innerHTML = `A progressão é: ${texto.substring(0,texto.length - 2)}`
            }
            break
        case "soma":
            var soma = (2*lista[0] + (lista[5]-1)*lista[3])*(lista[5]/2)
            if (soma != null && lista[4] == soma) {
                output.innerHTML = soma
            } else {
                output.innerHTML = 'Não existe uma PA com essas propriedades.'
            }
            
            break
        case "termo":
            var saida = document.getElementById("saida")
            var saida2 = document.getElementById("saida2")
            saida.innerHTML = '<p>Forneça a posição do termo desejado: <input type="number" name="valorQualquer" placeholder="Digite um número"  id="valorQualquer"></p>'
            saida2.innerHTML = '<input type="button" value="Calcular..." id="novoCalcular" onclick= "dialogo()">'
            break
        default: 
            output.innerHTML = "Erro"
    }
}

