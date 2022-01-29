let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const saveTabBtn = document.getElementById("savetab-btn")
const clearBtn = document.getElementById("clear-btn")
const ulEl = document.getElementById("ul-el")

let linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))
if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

inputBtn.addEventListener("click", function () {
    if (inputEl.value !== "") {
        myLinks.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    }
})

saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})

clearBtn.addEventListener("click", function () {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems += `<li>
                            <a href="${links[i]}">
                                ${links[i]}
                            </a>
                    </li>`
    }
    ulEl.innerHTML = listItems
}

