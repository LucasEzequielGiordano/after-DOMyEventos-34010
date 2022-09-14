// creamos un array vacío, una variable global la cual vamos a utilizar en la clase constructora para sumar de 1 
const notas = []
let idUnico = 0
class Nota {
    constructor(tarea) {
        this.tarea = tarea
        this.id = idUnico++
    }
}

// obtenemos los elementos del HTML
const listaNotas = document.getElementById('listaNotas')
const inputNota = document.getElementById('inputNota')
const btnNota = document.getElementById('btnNota')
const borrarTodo = document.getElementById('borrarTodo')

// realizamos evento en el cual guardamos y creamos cada tarea
btnNota.addEventListener('click', () => {
    notas.push(new Nota(inputNota.value))
    crearTarea()
})

// function que crea dinámicamente cada tarea
function crearTarea() {
    const tarea = document.createElement('div')
    tarea.classList.add('notaAgregada')
    notas.forEach((e) => {
    tarea.innerHTML = `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${e.tarea}</h5>
            <button class="btn btn-success tachar${notas.id}">Realizada</button>
            <button class="btn btn-danger ${notas.id}">Eliminar</button>
        </div>
    </div>
    `
    })
    listaNotas.appendChild(tarea)
    eliminarTarea()
    eliminarTodo()
    tareaRealizada()
}

// function eliminar tarea individualmente
function eliminarTarea() {
    let tareaAEliminar = document.querySelectorAll(`.${notas.id}`)
    tareaAEliminar.forEach((nota) => {
        nota.addEventListener('click', (e) => {
            tareaAEliminar = e.target
            let card = tareaAEliminar.closest('.card') // closest selecciona el elemento más cercano a donde se realizó el evento
            notas.splice(card, 1)
            card.remove()
        })
    })
}

// function eliminar todo mediante dos formas.
function eliminarTodo() {
    borrarTodo.addEventListener('click', () => {
        // notas.splice(0, notas.length-1+1)
        notas.length = 0
        listaNotas.innerHTML = ''
    })
}

// function de tachar tareas
function tareaRealizada() {
    let tacharTarea = document.querySelectorAll(`.tachar${notas.id}`)
    tacharTarea.forEach((nota) => {
        nota.addEventListener('click', (e) => {
            tacharTarea = e.target
            let card = tacharTarea.closest('.card')
            if(card.classList.contains('tachar')) {
                card.classList.remove('tachar')
            } else {
                card.classList.add('tachar')
            }
        })
    })
}