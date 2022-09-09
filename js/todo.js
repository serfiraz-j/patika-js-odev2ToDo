let taskList = JSON.parse(localStorage.getItem('taskList')) //arrayimize local storage'ta saklanan öğeleri ekledik
let ulList = document.querySelector('#list') //tasklarımızın parent elemanı olan ul yi id si ile aldık

// task üstüne tıklanmasını yakalama
ulList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
    }
})

showTaskList() //listemizi çağırdık

// task ekleme
function newElement() {
    let newTask = document.querySelector('#task').value.trim() //trim fonksiyonu başındaki sonundaki boşlukları siler
    if (localStorage.getItem('taskList') === null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem('taskList')) //storage'tan json ile çekip veriyi array olarak almış oluyoruz
    }
    if (newTask !== '') {
        taskList.push(newTask)
        showTaskList()
        $(".success").toast("show")

    } else {
        $(".error").toast("show")
    }
    localStorage.setItem('taskList', JSON.stringify(taskList)) //stroge'ı güncelliyoruz json stringfy ile tekrar string olarak yolluyoruz

}

// task silme 
function removeTask() {
    this.parentElement.remove(); //listeden sil

    taskList.splice(this.id, 1) //local storage güncellemesi için önce arraydan siliyoruz
    localStorage.setItem('taskList', JSON.stringify(taskList)) //local storage'tan da silmiş olduk

}

// task listesini çağırma
function showTaskList() {
    if (taskList) {
        ulList.innerHTML = ''
        taskList.forEach((task, index) => {
            let yeniLi = document.createElement('li')
            yeniLi.textContent = task
            const span = document.createElement("span")
            const text = document.createTextNode("\u00D7")
            span.className = "close"
            span.id = index
            span.onclick = removeTask
            span.appendChild(text)
            yeniLi.appendChild(span)
            ulList.appendChild(yeniLi)

        });

    }
}
