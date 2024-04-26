document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('imcForm');
    const resultadoIMC = document.getElementById('resultadoIMC');
    const imcValue = document.getElementById('imcValue');
    const imcMessage = document.getElementById('imcMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obter os valores de altura e peso do formulário
        const altura = parseFloat(document.getElementById('altura').value.replace(',', '.'));
        const peso = parseFloat(document.getElementById('peso').value.replace(',', '.'));

        // Verificar se os valores de altura e peso são válidos
        if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
            // Exibir mensagem de erro se os valores forem inválidos
            resultadoIMC.classList.remove('alert-success');
            resultadoIMC.classList.add('alert-danger');
            resultadoIMC.textContent = 'Por favor, insira valores válidos para altura e peso.';
            resultadoIMC.classList.remove('d-none');
            return; // Sair da função
        }

        // Calcular o IMC
        const imc = peso / (altura * altura);

        // Exibir o resultado do IMC
        imcValue.textContent = imc.toFixed(2); // Arredonda o IMC para 2 casas decimais
        resultadoIMC.classList.remove('d-none');

        // Determinar a mensagem com base no IMC
        let imcMessageText = '';
        if (imc < 18.5) {
            imcMessageText = 'Você está abaixo do peso.';
        } else if (imc < 25) {
            imcMessageText = 'Você está com o peso normal.';
        } else if (imc < 30) {
            imcMessageText = 'Você está com sobrepeso.';
        } else {
            imcMessageText = 'Você está obeso.';
        }

        // Exibir a mensagem de IMC
        imcMessage.textContent = imcMessageText;

        // Remover recomendações de dieta existentes antes de adicionar novas
        resultadoIMC.querySelectorAll('.imc-recommendation').forEach(function(element) {
            element.remove();
        });

        // Exibir recomendações de dieta se o IMC estiver fora do intervalo normal
        if (imc < 18.5 || imc >= 25) {
            const imcRecommendationElement = document.createElement('p');
            imcRecommendationElement.textContent = 'Recomendações de Dieta: É importante consultar um profissional de saúde para desenvolver um plano de dieta e exercícios adequado. Recomenda-se uma dieta rica em alimentos integrais e exercícios regulares para promover a perda de peso e melhorar a saúde geral.';
            imcRecommendationElement.classList.add('imc-recommendation');
            resultadoIMC.appendChild(imcRecommendationElement);
        }

        // Limpar os campos do formulário
        form.reset();
    });
});
