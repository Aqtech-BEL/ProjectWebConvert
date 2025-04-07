
const acronym = ["BRL", "USD", "EUR", "BTC"];
const acronymS = ["USD", "EUR", "BTC", "BRL"];

const valueCoin = {
    BRL: 5.7363,        // 1 USD = 5.7363 BRL
    USD: 1,            // Base    
    EUR: 0.9213,        // 1 USD = 0.9213 EUR
    BTC: 0.00002171,     // 1 USD = 0.00002171 BTC
};



//SELECTION FIRST
const selectOptionOne = document.getElementsByTagName("select")[0];
selectOptionOne.addEventListener("change", () => {

    const selectdOption = selectOptionOne.options[selectOptionOne.selectedIndex];
    document.getElementsByClassName("typecoin")[0].textContent = selectdOption.textContent;
    document.getElementsByClassName("imgcoin")[0].src = `./assets/${selectOptionOne.value}.png`;

    const input = document.querySelector("input");
    const inputhidden = document.querySelector("#inputhidden");
    input.value = ""; // Limpa o valor visível
    inputhidden.value = ""; // Limpa o valor numérico, se tiver


    const symbolCoin = selectdOption.textContent.split(" ")[0]; //SIMBOLO
    input.placeholder = `${symbolCoin} 0,00`;
    document.getElementsByClassName("value")[0].textContent = input.placeholder;

});

//SELECTION SECOND
const selectOptionTwo = document.getElementsByTagName("select")[1];
selectOptionTwo.addEventListener("change", () => {

    //Está acessando as opçoes do select e trocando o texto e imagem
    const selectdOption = selectOptionTwo.options[selectOptionTwo.selectedIndex];
    document.getElementsByClassName("typecoin")[1].textContent = selectdOption.textContent;
    document.getElementsByClassName("imgcoin")[1].src = `./assets/ImgTwo/${selectOptionTwo.value}.png`;


    //Está pegando o simbolo que está no selct e jogando para o value
    const symbolCoin = selectdOption.textContent.split(" ")[0];
    document.getElementsByClassName("value")[1].textContent = `${symbolCoin} 0,00`
});

//INPUT

const enter = (event) => {

    if (event.key === "Enter") {
        event.preventDefault(); // evita que envie formulário (se tiver)

        let value = input.value.trim();

        // Remove o símbolo do começo, se tiver (ex: "R$ ", "US$ ", etc)
        value = value.replace(/^[^\d]+/, "").trim();

        // Agora sim, troca o ponto por vírgula
        value = value.replace(".", ",");

        const symbol = document.querySelector("select");
        const indexSymbol = symbol.options[symbol.selectedIndex];
        const symbolCoin = indexSymbol.textContent.split(" ")[0];

        // Verifica se já tem vírgula (ex: "10,50")
        if (!value.includes(",")) {
            value += ",00";
        } else {
            // Se tem vírgula, mas nada depois (ex: "10,"), completa com 00
            const partes = value.split(",");
            if (partes[1] === "") {
                value = partes[0] + ",00";
            } else if (partes[1].length === 1) {
                // Se só tem 1 dígito (ex: "10,5"), completa com 0 → "10,50"
                value = partes[0] + "," + partes[1] + "0";
            }
        }

        // Converte para número real (ponto no lugar da vírgula)
        const numberReal = parseFloat(value.replace(",", "."));

        // Atualiza o input escondido com o número puro
        inputhidden.value = numberReal;

        input.value = `${symbolCoin} ${value}`;

        document.querySelector(".value").textContent = input.value; //BUSCA A CLASS VALUE E COLOCA O VALOR DO INPUT NELA

    }


}

const input = document.querySelector("input");
const inputhidden = document.querySelector("#inputhidden");
input.addEventListener("keydown", enter);


//BUTTON
const clickbutton = () => {

    const selectFirst = document.getElementsByTagName("select")[0];
    const firstAcronym = acronym[parseInt(selectFirst.value) - 1]; //PARA RECEBER UM VALOR NO LUGAR DE UMA STRING
    const rateFirst = valueCoin[firstAcronym];

    const selectSecond = document.getElementsByTagName("select")[1];
    const secondAcronym = acronymS[parseInt(selectSecond.value) - 1]; //PARA RECEBER UM VALOR NO LUGAR DE UMA STRING
    const rateSecond = valueCoin[secondAcronym];

    //valorConvertido = valorOriginal * (taxas[moedaDestino] / taxas[moedaOrigem]);
    const rate = inputhidden.value * (rateSecond / rateFirst);

    let result = rate.toFixed(2).replace(".", ",");

    const indexSymbol = selectSecond.options[selectSecond.selectedIndex];
    const symbolCoin = indexSymbol.textContent.split(" ")[0];


    document.getElementsByClassName("value")[1].textContent = `${symbolCoin} ${result}`;

};


const button = document.getElementById("button");
button.addEventListener("click", clickbutton);

