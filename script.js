let taskInput = document.querySelector('#taskInput')
let addBtn = document.querySelector('.addBtn')
let todoContainer = document.querySelector('.todoContainer')

let API = 'https://68693d6b2af1d945cea15bd9.mockapi.io/api/v1/todos'

addBtn.addEventListener('click', postData)

async function fetchData() {
    let response = await fetch(API)
    let data = await response.json()
    if (data) {
        todoContainer.innerHTML = ''

        data.forEach(obj => {
            let div = document.createElement('div')
            div.className = 'todo'
            div.innerHTML = `
                <p class = 'paraText'>${obj.text}</p>
                <input id="editInput" type="text" placeholder="Enter your task..!!" value = '${obj.text}'>
                <div>
                    <button class = 'deleteBtn'>Delete</button>
                    <button class = 'editBtn'>Edit</button>
                    <button class = 'saveBtn'>Save</button>
                </div>
    `

            let deleteBtn = div.querySelector('.deleteBtn')
            let editBtn = div.querySelector('.editBtn')
            let saveBtn = div.querySelector('.saveBtn')
            let paraText = div.querySelector('.paraText')
            let editInput = div.querySelector('#editInput')

            deleteBtn.addEventListener('click', function () {
                deleteData(obj.id)
            })

            editBtn.addEventListener('click', function () {
                editBtn.style.display = 'none'
                saveBtn.style.display = 'inline'
                paraText.style.display = 'none'
                editInput.style.display = 'inline'
            })

            saveBtn.addEventListener('click', async function () {
                let editValue = editInput.value
                let response = await updateData(obj.id, editValue)
                if (response.status === 200) {
                    fetchData()
                    editBtn.style.display = 'inline'
                    saveBtn.style.display = 'none'
                    paraText.style.display = 'inline'
                    editInput.style.display = 'none'
                }
            })

            todoContainer.append(div)
        });
    }
}

// Post
async function postData() {
    let value = taskInput.value;
    console.log(value);

    let objData = {
        text: value.trim()
    }

    let response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData),
    })

    if (response.status === 201) {
        fetchData()
        taskInput.value = '';
    }
}

async function updateData(id, value) {

    let objData = {
        text: value.trim()
    }

    let response = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData),
    })

    return response;
}

async function deleteData(id) {
    console.log(id);
    let response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
    })
    if (response.status === 200) {
        fetchData();
    }
}

fetchData()


// js async nahi hota hai
// js sync hota ha by default

// api call apka promise return karega or bolega aage badho block mat karo data mai de dunga aauega to

// async await

// but agar apne function async bana diya hai to async function ka behaviour kuch aaise hota hai ki agar aap uske andar fetch waigera use karte ho and await karte ho to aage ka task wo tabtak nahi karega jabtak apka async complete nahi ho jaata... or eska internal working humlog aage properly understand karenge... so dont worry bhai log🤔🤔🤔