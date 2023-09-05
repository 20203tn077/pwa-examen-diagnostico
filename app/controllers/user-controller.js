const lblAction = document.getElementById('lblAction')
const iptFirstName = document.getElementById('iptFirstName')
const iptLastName = document.getElementById('iptLastName')
const iptEmail = document.getElementById('iptEmail')
const iptAvatar = document.getElementById('iptAvatar')
const ctrRegisterOptions = document.getElementById('ctrRegisterOptions')
const ctrDetailsOptions = document.getElementById('ctrDetailsOptions')
const ctrUsers = document.getElementById('ctrUsers')

let currentUser

function isValid() {
    return iptFirstName.value !== '' && iptLastName.value !== '' && iptEmail.value !== '' && iptAvatar.value !== ''
}

async function getUsers() {
    try {
        const users = await userService.getAll()
        let content = ''
        for (const {id, first_name, last_name, email, avatar} of users) content += 
        `<div class="col-xl-6" template="user">
            <div class="card shadow-sm clickable" onclick="showUser(${id})">
                <div class="row">
                    <div class="col-auto">
                        <img src="${avatar}" class="img-fluid rounded-start h-100 object-fit-cover">
                    </div>
                    <div class="col p-3">
                        <div class="row">
                            <div class=""><b>ID:</b> ${id}</div>
                            <div class=""><b>Nombre:</b> ${first_name} ${last_name}</div>
                            <div class=""><b>Email:</b> ${email}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        ctrUsers.innerHTML = content
    } catch (error) {
        notyf.error('Ocurrió un error al realizar la consulta')
    }
}

function showCreate() {
    lblAction.innerText = 'Crear usuario'
    ctrDetailsOptions.classList.add('d-none')
    ctrRegisterOptions.classList.remove('d-none')
    iptFirstName.value = ''
    iptLastName.value = ''
    iptEmail.value = ''
    iptAvatar.value = ''
}

async function createUser() {
    if (!isValid()) {
        notyf.error('Debes llenar todos los campos')
        return
    }
    try {
        await userService.create({
            first_name: iptFirstName.value,
            last_name: iptLastName.value,
            email: iptEmail.value,
            avatar: iptAvatar.value
        })
        notyf.success('Usuario registrado')
        await getUsers()
    } catch (error) {
        notyf.error('Ocurrió un error al crear al usuario')
    }
}

async function showUser(id) {
    try {
        lblAction.innerText = 'Usuario'
        ctrRegisterOptions.classList.add('d-none')
        ctrDetailsOptions.classList.remove('d-none')
        currentUser = await userService.getById(id)
        const {first_name, last_name, email, avatar} = currentUser
        iptFirstName.value = first_name
        iptLastName.value = last_name
        iptEmail.value = email
        iptAvatar.value = avatar
    } catch (error) {
        notyf.error('Ocurrió un error al realizar la consulta')
    }
}

async function updateUser() {
    if (!isValid()) {
        notyf.error('Debes llenar todos los campos')
        return
    }
    try {
        await userService.update({
            ...currentUser,
            first_name: iptFirstName.value,
            last_name: iptLastName.value,
            email: iptEmail.value,
            avatar: iptAvatar.value
        })
        notyf.success('Usuario actualizado')
        await getUsers()
    } catch (error) {
        notyf.error('Ocurrió un error al actualizar al usuario')
    }
}

async function deleteUser() {
    try {
        await userService.deleteById(currentUser.id)
        notyf.success('Usuario eliminado')
        showCreate()
        await getUsers()
    } catch (error) {
        notyf.error('Ocurrió un error al elimiar al usuario')
    }
}

window.onload = () => {
    getUsers()
    showCreate()
}