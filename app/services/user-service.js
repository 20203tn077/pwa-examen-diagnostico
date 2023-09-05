class UserService {
    #baseUrl = 'https://reqres.in/api/users'

    async getByPage(page) {
        const url = new URL(this.#baseUrl)
        url.searchParams.append('page', page)
        const res = await fetch(url)
        return res.json()
    }

    async getById(id) {
        const res = await fetch(new URL(id, this.#baseUrl))
        return res.json()
    }

    async create(user) {
        const res = await fetch(this.#baseUrl, {
            method: 'POST',
            body: JSON.stringify(user)
        })
        return res.json()
    }

    async update(user) {
        const res = await fetch(new URL(id, this.#baseUrl), {
            method: 'PUT',
            body: JSON.stringify(user)
        })
        return res.json()
    }

    async deleteById(id) {
        const res = await fetch(new URL(id, this.#baseUrl), {
            method: 'DELETE',
            body: JSON.stringify(person)
        })
        return res.json()
    }
}