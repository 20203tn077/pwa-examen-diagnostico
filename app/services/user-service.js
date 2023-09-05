class UserService {
    #baseUrl = 'https://reqres.in/api/users/'
    #users = []
    #nextId

    async getAll() {
        if (!this.#users.length) {
            for (let lastPage = false, page = 1; !lastPage; page++) {
                const url = new URL(this.#baseUrl)
                url.searchParams.append('page', page)
                const res = await fetch(url)
                const {data: users, total_pages} = await res.json()
                lastPage = page === total_pages
                this.#users.push(...users)
            }
            this.#nextId = this.#users.length + 1
        }
        return this.#users
    }

    async getById(id) {
        // Esta consulta es de chocolate, en realidad se consulta la
        // lista interna para que estén los cambios realizados antes
        await fetch(new URL(id, this.#baseUrl))
        return this.#users.find(user => user.id === id)
    }

    async create(user) {
        await fetch(this.#baseUrl, {
            method: 'POST',
            body: JSON.stringify(user)
        })
        user.id = this.#nextId++
        this.#users.push(user)
    }

    async update(user) {
        await fetch(new URL(user.id, this.#baseUrl), {
            method: 'PUT',
            body: JSON.stringify(user)
        })
        const i = this.getIndexById(user.id)
        this.#users.splice(i, 1, user)
    }

    async deleteById(id) {
        await fetch(new URL(id, this.#baseUrl), {
            method: 'DELETE'
        })
        const i = this.getIndexById(id)
        this.#users.splice(i, 1)
    }

    getIndexById(id) {
        return this.#users.findIndex(user => user.id === id)
    }
}