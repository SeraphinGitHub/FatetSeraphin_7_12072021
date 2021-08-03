
module.exports = { 
    methods: {

        // const token = window.localStorage.getItem("Token");
        
        // async read_Base() {
            
        //     return await fetch("http://localhost:3000/api", {
        //         headers: {
        //             "Content-Type": "application/json; charset=UTF-8",
        //             "Authorization": `Bearer ${token}`
        //         },
        //         method: "GET",
        //     })
        //     .then(response => response.json())
        //     .then(data => { return data });
        // },


        // const token = window.localStorage.getItem("Token");
        
        // async write_Base(data) {
            
        //     const response = await fetch("http://localhost:3000/api", {
        //         headers: {
        //             "Content-Type": "application/json; charset=UTF-8",
        //             "Authorization": `Bearer ${token}`
        //         },
        //         method: "PUT",
        //         body: JSON.stringify(data)
        //     });
            
        //     try { return await response.json() }
        //     catch(error) { console.log("error", error) }
        //     return {}
        // },


        // const token = window.localStorage.getItem("Token");
        
        // async write_BaseFiles("http://localhost:3000/api", data) {
            
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
        
        // async delete_Base(url) {
            
        //     return await fetch("http://localhost:3000/api", {
        //         headers: {
        //             "Content-Type": "application/json; charset=UTF-8",
        //             "Authorization": `Bearer ${token}`
        //         },
        //         method: "DELETE"
        //     });
        // },

        
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



        // ==================================================================================
        //  ==> COMMENT
        // ==================================================================================
        async getAllComment_API(formData) {
            this.write_Base(`${this.urlAPI()}/comment`, formData, "POST") }, // publishId
        // ----------------------------------------------------------------------------------
        async createComment_API(formData) { 
        this.write_Base(`${this.urlAPI()}/comment/create`, formData, "POST") }, // publishId
        // ----------------------------------------------------------------------------------
        async modifyComment_API(formData) {
        this.write_Base(`${this.urlAPI()}/comment/modify`, formData, "PUT") }, // commentId
        // ----------------------------------------------------------------------------------
        async deleteComment_API(postId) {
        this.delete_Base_WithID(`${this.urlAPI()}/comment/delete`, postId) }, // commentId
        // ----------------------------------------------------------------------------------
        
        // const token = window.localStorage.getItem("Token");
        
        // const response = await fetch("http://localhost:3000/api/comment", {
        //     headers: {
        //         "Content-Type": "application/json; charset=UTF-8",
        //         "Authorization": `Bearer ${token}`
        //     },
        //     method: method,
        //     body: JSON.stringify(data)
        // });
        
        // try { return await response.json() }
        // catch(error) { console.log("error", error) }
        // return {}



        // const token = window.localStorage.getItem("Token");

        // const response = await fetch("http://localhost:3000/api/comment/delete", {
        //     headers: {
        //         "Content-Type": "application/json; charset=UTF-8",
        //         "Authorization": `Bearer ${token}`
        //     },
        //     method: "DELETE",
        //     body: JSON.stringify(postId)
        // });
        
        // try { return await response.json() }
        // catch(error) { console.log("error", error) }
        // return {}
    }
}