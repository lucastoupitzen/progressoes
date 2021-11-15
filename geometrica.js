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
        contador = 2
        for (i = 0; i < lista.length; i++){
            if (lista[i].length != 0) { 
                contador++
            }
        }
        if (contador == 2){
            //avisa o usuário que falta um termo
            output.innerHTML = "É necessário fornecer mais 1 dado."
        } else if (contador >= 3) {
            return true
        }
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
        if (apontaTermo[0][1] == 1 && apontaTermo[0][2] == 1 && apontaTermo[0][3] == 1){
            // deu an e a razao
            var a1 = apontaTermo[1][2]/(apontaTermo[1][3]**(apontaTermo[1][1]-1))
            apontaTermo[1][0] = a1
            apontaTermo[0][0] = 1
        } else if (apontaTermo[0][3] == 1 && apontaTermo[0][4] == 1 && apontaTermo[0][5] == 1) {
            // deu a soma, n e razao
            var a1 =(apontaTermo[1][4] * (1 - apontaTermo[1][3]))/(1 - (apontaTermo[1][3]**apontaTermo[1][5]))
            apontaTermo[1][0] = a1
            apontaTermo[0][0] = 1
        }    
    }  
    if (apontaTermo[0][3] == 0) {
        // não deu a razao
        if (apontaTermo[0][0] == 1 && apontaTermo[0][1] == 1 && apontaTermo[0][2] == 1){
            // deu a1 e deu an
            var r = (apontaTermo[1][2]/apontaTermo[1][0])**(1/(apontaTermo[1][1] - 1))
            apontaTermo[1][3] = r
        } else if (apontaTermo[0][0] == 1 && apontaTermo[0][4]==1 && apontaTermo[0][5]==1) {
            // deu a1, soma e n
            var lista = [apontaTermo[1][0],apontaTermo[1][4],apontaTermo[1][4]- apontaTermo[1][0]]
            var r = polinomio(apontaTermo[1][5],lista, output)
            teste.innerHTML = r
            apontaTermo[1][3] = r
        } 
    }
    apontaTermo[0][3] = 1
    if (apontaTermo[0][5] == 0) {
        if (apontaTermo[0][0] == 1 && apontaTermo[0][3] == 1 && apontaTermo[0][4] == 1) {
            // deu a1, r e a soma
            var n = Math.log10(1 -((1-apontaTermo[1][3])*apontaTermo[1][4])/apontaTermo[1][0])/Math.log10(apontaTermo[1][3])
            if (Number.parseInt(n) == n) {
                apontaTermo[1][5] = n
                apontaTermo[0][5] = 1
            }          
        }
    }
    if (apontaTermo[0][6] == 1) {
        if (apontaTermo[1][6] <= apontaTermo[1][5]) {
            var valorQualquer_termo = apontaTermo[1][0]*(apontaTermo[1][3]**(apontaTermo[1][6]-1))
            output.innerHTML = `O ${apontaTermo[1][6]}º termo é ${valorQualquer_termo}.`
        } else {
            output.innerHTML = "Erro: Essa posição não existe na PG com tais propriedades"
        }
    } else if (apontaTermo[0][0] == 0) {
        output.innerHTML = "Os dados fornecidos são insuficientes."
    } else {
        return apontaTermo[1]
    }
}
function resolve(lista, metodo, output) {
    switch (metodo) {
        case "visualizar": 
            if (lista[5] == undefined){
                output.innerHTML = 'Não existe uma PG com essas propriedades.'
            } else {
                var soma = (lista[0]*(1-lista[3]**lista[5]))/(1 - lista[3])
                if (soma != lista[4] && lista[4] != 0) {
                    output.innerHTML = "A soma informada impossibilita o cálculo"
                } else {
                    pa_completa = []
                valor = lista[0]
                for(i = 0; i < lista[5]; i++){
                    pa_completa.push(valor)
                    valor *= lista[3]
                }
                for (i in pa_completa) {
                    if ((Math.round(pa_completa[i]) > pa_completa[i] && pa_completa[i] > (Math.round(pa_completa[i]) - 0.00000001)) || (Math.round(pa_completa[i]) < pa_completa[i] && pa_completa[i] < (Math.round(pa_completa[i]) + 0.00000001))) {
                        pa_completa[i] = Math.round(pa_completa[i])
                    }
                }
                var texto = ''
                for (i in pa_completa) {
                    texto += pa_completa[i]
                    texto += ", "
                }
                output.innerHTML = `A progressão é: ${texto.substring(0,texto.length - 2)}`
                }
            }
            break
        case "soma":
            if (lista[3] != 1) {
                var soma = (lista[0]*(1-lista[3]**lista[5]))/(1 - lista[3])
                if (soma != lista[4] && lista[4] != 0) {
                    output.innerHTML = "A soma informada não satisfaz a soma real da sequência."
                } else {
                    output.innerHTML = soma
                }
            } else {
                soma = lista[0]*lista[5]
                output.innerHTML = soma
            }
            
            break
        case "termo":
            var saida = document.getElementById("saida")
            var saida2 = document.getElementById("saida2")
            saida.innerHTML = '<p>Forneça a posição do termo desejado: <input type="number" name="valorQualquer" placeholder="Digite um número"  id="valorQualquer"></p>'
            saida2.innerHTML = '<input type="button" value="Calcular..." id= "calcular" onclick= "dialogo()">'
            break
        default: 
            output.innerHTML = "Erro"
    }
}
function polinomio(n, lista, output, metodo = 1) {
    // utilizar o teoremas das raizes racionais para determinar as raizes
    var divisor_a1 = []
    var divisor_an = []
    // lista dos divisores dos termos independentes e principal
    for (i = -lista[0]; i <= lista[0]; i++){
        if (i != 0 && (lista[0] % i) == 0) {
            divisor_a1.push(i)
        }
    }
    for (i = -lista[2]; i <= lista[2]; i++){
        if (i != 0 && (lista[2] % i) == 0) {
            divisor_an.push(i)
        }
    }
    // fazer o quociente entre os divisores
    let quociente = []
    for (i in divisor_an) {
        for (j in divisor_a1) {
            quociente.push(divisor_an[i]/divisor_a1[j])
        }
    }
    // determinar qual das raizes satisfazem a condicao
    let raizes = []
    if (metodo == 1) {
        for (k in quociente) {
            if (((lista[0]*(quociente[k])**n) - (lista[1]*quociente[k]) + lista[2]) == 0) {
                if (raizes.includes(quociente[k]) == false) {
                    raizes.push(quociente[k])
                }    
            }
        }  
    }
    if (raizes.length == 2 && raizes.includes(1)) {
        raizes.pop(1)
        return raizes[0]
    } else if (raizes.length == 1) {
        return raizes[0]
    } else if (raizes.length > 2) {
        output.innerHTML =`São necessárias mais informações. Nesse caso, a razão da PG pode ser qualquer um dos termos de ${raizes}`
    } else {
        output.innerHTML ='Não foi possível calcular'
    }
}
