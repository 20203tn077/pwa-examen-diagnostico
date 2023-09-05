let activeUser
let userService = new UserService()

async function getUsers() {
    const users = (await userService.getByPage(1)).data
    render('user', users)
}

async function create() {
    const users = (await userService.getByPage(1)).data
    render('user', users)
}

async function create() {
    const users = (await userService.getByPage(1)).data
    render('user', users)
}

async function create() {
    const users = (await userService.getByPage(1)).data
    render('user', users)
}

async function create() {
    const users = (await userService.getByPage(1)).data
    render('user', users)
}

window.onload = () => {
    getUsers()
}