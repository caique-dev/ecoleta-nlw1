const 
    buttonSearch = document.querySelector("#page-home main a")
    modal = document.querySelector("#modal")
    close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})