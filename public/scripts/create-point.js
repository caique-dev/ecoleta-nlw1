// populando os selects

// populando as Ufs
function populateUFs() {
    const ufSelect = document.querySelector("Select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() /*(res) => { return res.json()}*/)
    .then( states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    }) 
}

populateUFs()

// identifica a UF para puxar as cidades
document
    .querySelector("Select[name=uf]")
    .addEventListener("change", getCities)

// populando as cidades da UF
function getCities(event) {
    const citySelect = document.querySelector("Select[name=city]")
    const stateInput = document.querySelector("[name=state]"/* "Input[name=state]" */)

    const indexOfSelectedStates = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedStates].text 

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true  

    const ufvalue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    fetch(url)
    .then( res => res.json() /* (res) => { return res.json()} */)
    .then( cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
    })

    citySelect.disabled = false    
} 

// declarando os items para click
const itemsToCollect = document.querySelectorAll(".items-grid li")

// identificando o clique em cada item
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// localizando o input que registra os items
const collectedItems = document.querySelector("input[name=items]")

// vetor com os itens selecionados
let selectedItems = []

// funcao para atualizar o vetor dos itens
function handleSelectedItem(event) {
    const itemLi = event.target

    // removando ou adicionando estilo ao item selecionado 
    itemLi.classList.toggle("selected") // toggle = intercala

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados e pega-los - mostra o indice do item
    const alredySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // true ou false
        return itemFound
    })

    // se já tiver selecionado,
    if (alredySelected >= 0 /* ou alredySelected !=-1 */) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDiferent = item != itemId // se for false ele tira do array
            return itemIsDiferent
        })

        selectedItems = filteredItems
    } else {
        // se nn estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}