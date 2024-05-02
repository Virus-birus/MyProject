window.onload = () => {
    generateCalendar()
}

function generateCalendar() {
    const calendar = document.getElementById('Calendar')
    const Dates = new Date()
    const month = Dates.getMonth()
    const year = Dates.getYear()

    const firsDayInMonth = new Date(year, month, 1)
    const lastDayInMonth = new Date(year, month + 1, 0)

    const firsDayInWeek = firsDayInMonth.getDay()
    const lastDayInWeek = lastDayInMonth.getDate()

    for (let i = 0; i < firsDayInWeek; i++) {
        const blankDay = document.createElement('div')
        calendar.appendChild(blankDay)
    }

    for (let day = 1; day <= lastDayInWeek; day++) {
        let daySq = document.createElement('div')
        daySq.className = 'calendarDay'
        daySq.textContent = day
        daySq.id = `Day-${day}`
        calendar.appendChild(daySq)
    }
}

function ShowModal() {
    document.getElementById('addTaskModal').style.display = 'block'
}

function CloseShowModal() {
    document.getElementById('addTaskModal').style.display = 'none'
}

function deletedButton(taskEl) {
    if (confirm('are you ready deleted task modal?')) {
        taskEl.parentNode.removeChild(taskEl)
    }
}

function TaskEditor(taskEl) {
    const newTask = prompt('edit your task', taskEl.textContent)
    if ((newTask !== null) & (newTask.trim() !== '')) {
        taskEl.textContent = newTask
    }
}

function addTask() {
    const taskDate = new Date(document.getElementById('task-dates').value)
    const taskDesc = document.getElementById('task-desc').value.trim()

    if (taskDesc && !isNaN(taskDate.getDate())) {
        const DayInCalendar = document.getElementById('Calendar').children

        for (let i = 0; i < DayInCalendar.length; i++) {
            const day = DayInCalendar[i]
            if (parseInt(day.textContent) === taskDate.getDate()) {
                const taskEl = document.createElement('div')
                taskEl.className = 'task'
                taskEl.textContent = taskDesc

                taskEl.addEventListener('contextmenu', function (event) {
                    event.preventDefault()
                    deletedButton(taskEl)
                })

                taskEl.addEventListener('click', function () {
                    TaskEditor(taskEl)
                })

                day.appendChild(taskEl)
                break
            }
        }

        CloseShowModal()
    } else {
        alert('Пожалуйста введите вверные данные')
    }
}
