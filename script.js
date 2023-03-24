// chrome://extensions/
let myLead = []
const  inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))
const tabBtn = document.querySelector("#save-btn")

if(leadFromLocalStorage) {
    myLead = leadFromLocalStorage
    render(myLead)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLead.push(tabs[0].url)
    localStorage.setItem("myLead", JSON.stringify(myLead))    
    render(myLead)
    })
})

function render(Leads) {
    let listItem = ""
    for(let i = 0; i < Leads.length; i++) {
        listItem +=`
            <li>
                <a target ='_blank' href = '${Leads[i]}' >
                 ${Leads[i]}
                 <a/>
            </li>
        `
    }
    ulEl.innerHTML = listItem
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLead = []
    render(myLead)
})

inputBtn.addEventListener("click", function() {
    myLead.push(inputEl.value)   
    inputEl.value = ""
    localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)    
})

