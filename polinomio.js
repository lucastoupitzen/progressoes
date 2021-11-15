function polinomio(n, lista) {
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
    for (k in quociente) {
        if (((lista[0]*(quociente[k])**n) - (lista[1]*quociente[k]) + lista[2]) == 0) {
            if (raizes.includes(quociente[k]) == false){
                raizes.push(quociente[k])
            }    
        }
    }  
    if (raizes.length == 2 && raizes.includes(1)) {
        raizes.pop(1)
        console.log(raizes[0])
    } else if (raizes.length >= 2) {
        console.log(`São necessárias mais informações. Nesse caso, a razão da PG pode ser qualquer um dos termos de ${raizes}`)
    } else {
        console.log('Não foi possível calcular')
    } 

}

