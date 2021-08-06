
module.exports = { 
    methods: {

        // const token = window.localStorage.getItem("Token");
        
        async write_Base(data) {
            
            const response = await fetch("http://localhost:3000/api", {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                },
                method: "PUT",
                body: JSON.stringify(data)
            });
            
            try { return await response.json() }
            catch(error) { console.log("error", error) }
        },


        // const token = window.localStorage.getItem("Token");
        
        // async updateUser_API("http://localhost:3000/api/auth/updateUser", data) {
            
        //     const response = await fetch(url, {
        //         headers: {
        //             "Content-Type": "multipart/form-data; boundary=something",
        //             "Authorization": `Bearer ${token}`
        //         },
        //         method: "PUT",
        //         body: data
        //     });
            
        //     try { return await response }
        //     catch(error) { console.log("error", error) }
        // },


        // const token = window.localStorage.getItem("Token");
        
        // async updateUserEmail_API("http://localhost:3000/api/auth/updateUser/email", data) {
            
        //     const response = await fetch(url, {
        //         headers: {
        //             "Content-Type": "multipart/form-data; boundary=something",
        //             "Authorization": `Bearer ${token}`
        //         },
        //         method: "PUT",
        //         body: data
        //     });
            
        //     try { return await response }
        //     catch(error) { console.log("error", error) }
        //     return {}
        // },


        // const token = window.localStorage.getItem("Token");
        
        // async updateUserPsw_API("http://localhost:3000/api/auth/updateUser/password", data) {
            
        //     const response = await fetch(url, {
        //         headers: {
        //             "Content-Type": "multipart/form-data; boundary=something",
        //             "Authorization": `Bearer ${token}`
        //         },
        //         method: "PUT",
        //         body: data
        //     });
            
        //     try { return await response }
        //     catch(error) { console.log("error", error) }
        //     return {}
        // },


        // const token = window.localStorage.getItem("Token");
        
        async deleteUser_API(url) {
            
            return await fetch("http://localhost:3000/api/auth/delete", {
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    "Authorization": `Bearer ${token}`
                },
                method: "DELETE"
            });
        },

        
        // ==================================================================================
        // ==> USER
        // ==================================================================================
        
        // ----------------------------------------------------------------------------------
        
        // ----------------------------------------------------------------------------------
        async profileUser_API() { return await this.read_Base(`${this.urlAPI()}/auth/profile`) },
        // ----------------------------------------------------------------------------------
        async updateUser_API(formData) { this.write_BaseFiles(`${this.urlAPI()}/auth/updateUser`, formData, "PUT") },
        // ----------------------------------------------------------------------------------
        async updateUserEmail_API(formData) { this.write_Base(`${this.urlAPI()}/auth/updateUser/email`, formData, "PUT") },
        // ----------------------------------------------------------------------------------
        async updateUserPsw_API(formData) { this.write_Base(`${this.urlAPI()}/auth/updateUser/password`, formData, "PUT") },
        // ----------------------------------------------------------------------------------
        async deleteUser_API() { this.delete_Base(`${this.urlAPI()}/auth/delete`) },
        // ----------------------------------------------------------------------------------
    }
}