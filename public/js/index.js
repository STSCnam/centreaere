'use strict'

const areas = document.querySelectorAll('.area .ls')

window.onload = () => {
    areas[3].addEventListener('dragover', allowDrop)
    areas[3].addEventListener('drop', drop)

    updateArea1()
}

const updateArea1 = () => {
    let area = areas[0]

    fetch(`/find/homes`)
        .then(res => {
            res.json().then(res => {
                resetArea(area)

                for (let home of res) {
                    let row = document.createElement('div')

                    row.classList.add('row', 'columns', 'is-gapless')

                    row.innerHTML += `
                        <span class="column">${home.idMaison}</span>
                        <span class="column">${home.nomMaison}</span>
                    `
                    
                    row.addEventListener('click', e => updateArea2(home))

                    area.appendChild(row)
                }
            })
        }).catch(console.error)
}

const updateArea2 = home => {
    let area = areas[1]

    fetch(`/find/rooms?id=${home.idMaison}`)
        .then(res => {
            res.json().then(res => {
                resetArea(areas[1], areas[2], areas[3])

                for (let room of res) {
                    let row = document.createElement('div')

                    row.classList.add('row', 'columns', 'is-gapless')

                    row.innerHTML += `
                        <span class="column">${room.idChambre}</span>
                        <span class="column">${room.nomChambre}</span>
                        <span class="column">${room.nbLits}</span>
                        <span class="column">${room.typeChambre}</span>
                    `
                    
                    row.addEventListener('click', e => updateArea3(room))

                    area.appendChild(row)
                }
            })
        }).catch(console.error)
}

const updateArea3 = room => {
    let area = areas[2]

    fetch(`/find/childrens`)
        .then(res => {
            res.json().then(res => {
                resetArea(area)

                for (let child of res) {
                    let row = document.createElement('div')

                    row.classList.add('row', 'columns', 'is-gapless')
                    row.id = `child-${child.idEnfant}`

                    row.setAttribute('meta-id-child', child.idEnfant)
                    row.setAttribute('meta-name-child', child.prenomEnfant)
                    row.setAttribute('meta-sexe-child', child.sexeEnfant)
                    row.setAttribute('meta-id-room', room.idChambre)
                    row.setAttribute('meta-type-room', room.typeChambre)
                    row.setAttribute('meta-nbchilds-room', room.nbEnfants)
                    row.setAttribute('meta-nbbeds-room', room.nbLits)
                    row.setAttribute('draggable', true)

                    row.addEventListener('dragstart', drag)

                    row.innerHTML += `
                        <span class="column ${child.sexeEnfant === 'Fille' ? 'women' : 'boy'}">
                            <span></span>
                        </span>
                        <span class="column">${child.idEnfant}</span>
                        <span class="column">${child.prenomEnfant}</span>
                        <span class="column">${child.sexeEnfant}</span>
                    `

                    area.appendChild(row)
                }

                updateArea4(room)
            })
        }).catch(console.error)
}

const updateArea4 = room => {
    let area = areas[3]
    
    fetch(`/find/childsInRoom?id=${room.idChambre}`)
        .then(res => {
            res.json().then(res => {
                resetArea(area)

                for (let child of res) {
                    let row = document.createElement('div')

                    row.classList.add('row', 'columns', 'is-gapless')

                    row.innerHTML += `
                        <span class="column ${child.sexeEnfant === 'Fille' ? 'women' : 'boy'}">
                            <span></span>
                        </span>
                        <span class="column">${child.idEnfant}</span>
                        <span class="column">${child.prenomEnfant}</span>
                        <span class="column">${child.sexeEnfant}</span>
                    `

                    area.appendChild(row)
                }
            })
        }).catch(console.error)
}

const resetArea = (...areas) => {
    for (let area of areas)
        area.innerHTML = ''
}

const drag = e => {
    let target = e.target
    
    e.dataTransfer.setData('text', target.id)
}

const allowDrop = e => e.preventDefault()

const drop = e => {
    e.preventDefault()

    let row          = document.querySelector(`#${e.dataTransfer.getData('text')}`)
    let idChild      = row.getAttribute('meta-id-child')
    let sexeChild    = row.getAttribute('meta-sexe-child')
    let idRoom       = row.getAttribute('meta-id-room')
    let nbChildsRoom = row.getAttribute('meta-nbchilds-room')
    let typeRoom     = row.getAttribute('meta-type-room')
    let nbBedsRoom   = row.getAttribute('meta-nbbeds-room')

    if (sexeChild !== typeRoom)
        return alert(`This room is reserved for boys only. ${sexeChild} given.`)

    if (nbChildsRoom >= nbBedsRoom)
        return alert('This room is already full.')

    if (e.target.classList.contains('ls')) {
        fetch(`/update?idChild=${idChild}&idRoom=${idRoom}`)
            .then(res => {
                e.target.appendChild(row)
                updateArea3({
                    idChambre: idRoom,
                    typeChambre: typeRoom,
                    nbEnfants: ++nbChildsRoom,
                    nbLits: nbBedsRoom
                })
            })
            .catch(console.error)
    }
}