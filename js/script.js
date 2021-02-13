function addTask(params) {
    let input = document.getElementById('ipt')
    if(input.value !== ''){
        createTask(input.value)
    }
    input.value = ''
}

function createTask(params) {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(params))
    addButtons(li)
    document.getElementById('list').appendChild(li)
}

function addButtons(params) {
    let check = document.createElement('input')
    check.type = 'checkbox'
    check.classList.add('list__check')
    check.onclick = function (params) {
        displayButtons()
    }
    params.appendChild(check)
    
    let remove = document.createElement('div')
    remove.classList.add('list__delete')
    remove.onclick = function (params) {
        this.parentElement.remove()
    }
    params.appendChild(remove)
}

document.getElementById('ipt').addEventListener('keyup', function (params) {
    if(params.key == 'Enter'){
        addTask()
    }
})

let list = document.getElementById('list')
list.addEventListener('click', function (params) {
    if(params.target.nodeName == 'LI'){
        params.target.classList.toggle('done')
    }
    saveF()
})
setTimeout(save, 1000)
let tasks = []
let tasksDone = []
function save(params) {
    list.addEventListener('DOMSubtreeModified', function (params) {
        saveF()
    })    
}

function saveF(params) {
    tasks = []
    tasksDone = []
    let listItems = document.getElementsByTagName('li')
    for (let index = 0; index < listItems.length; index++) {
        const element = listItems[index];
        tasks.push(element.innerText)
        if(element.classList.contains('done')){
            tasksDone.push(true)
        }
        else{
            tasksDone.push(false)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('tasksDone', JSON.stringify(tasksDone))    
}

if (localStorage.getItem('tasks') !== null) {
    let saved = JSON.parse(localStorage.getItem('tasks'))
    let savedIdx = JSON.parse(localStorage.getItem('tasksDone'))
    for (let index = 0; index < saved.length; index++) {
        const element = saved[index];
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(element))
        if(savedIdx[index]){
            li.classList.add('done')
        }
        // addButtons(li)
        document.getElementById('list').appendChild(li)
    }
}

let checkList = document.getElementsByClassName('list__check')
function displayButtons(params) {
    for (let index = 0; index < checkList.length; index++) {
        const element = checkList[index];
        if(element.checked){
            document.getElementById('buttons__actions').style.display = 'block'
            break
        }
        else{
            document.getElementById('buttons__actions').style.display = 'none'
        }
    }
}
function selectAll(params) {
    for (let index = 0; index < checkList.length; index++) {
        const element = checkList[index];
        element.checked = true
    }
    displayButtons()
}
function deSelectAll(params) {
    for (let index = 0; index < checkList.length; index++) {
        const element = checkList[index];
        element.checked = false
    }
    displayButtons()
}
function done(params) {
    for (let index = 0; index < checkList.length; index++) {
        const element = checkList[index];
        if(element.checked){
            element.parentElement.classList.add('done')
        }
    }
}
function removeN(params) {
    for (let index = checkList.length-1; index >= 0; index--) {
        const element = checkList[index];
        if (element.checked) {
            element.parentElement.remove()
        }
    }
}

let firstLi = document.getElementsByTagName('li')
for (let index = 0; index < firstLi.length; index++) {
    const element = firstLi[index];
    addButtons(element)
}
let darkMode
if (localStorage.getItem('darkMode') !== null) {
    if(localStorage.getItem('darkMode') == 1){
        themeChange()
    }
}
function themeChange(params) {
    if(!darkMode){
        document.body.classList.add('dark')
        darkMode = 1
    }
    else{
        document.body.classList.remove('dark')
        darkMode = 0
    }
    localStorage.setItem('darkMode', darkMode)
}
