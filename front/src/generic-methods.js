
module.exports = {
    methods: {
        async getLoggedUserInfos() {
            const response = await fetch("http://localhost:3000/api/auth/user", {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${this.token}`
                },
                method: "GET",
            });
            try { return await response.json() }
            catch(error) { console.log("error", error) }
        },


        async getPostUserInfos() {
            const response = await fetch("http://localhost:3000/api/auth/postUser", {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${this.token}`
                },
                method: "POST",
                body: JSON.stringify({ id: this.userId })
            });
            
            try { return await response.json() }
            catch(error) { console.log("error", error) }
        },
    }
}