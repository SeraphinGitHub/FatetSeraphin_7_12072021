
module.exports = { 
    methods: {
        
        urlAPI() { return "http://localhost:3000/api" },


        // ========== GET ==========
        async read_Base(url) {
            
            return await fetch(url)
            .then(response => response.json())
            .then(data => { return data });
        },


        // ========== POST / PUT / DELETE ==========
        async write_Base(url, data, method) {
            
            const response = await fetch(url, {
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                credentials: "include",
                method: method,
                body: JSON.stringify( data ) // ==> data = {object}
            });
            
            try { return await response.json() }
            catch(error) { console.log("error", error) }
            return {}
        },


        // ========== POST / PUT / DELETE ==========
        async write_Base_WithID(url, data, postId, method) {
            
            const response = await fetch(url, {
                headers: {"Content-Type": "application/json; charset=UTF-8"},
                credentials: "include",
                method: method,
                body: JSON.stringify( data, postId ) // ==> data = {object}, postId = [array]
            });
            
            try { return await response.json() }
            catch(error) { console.log("error", error) }
            return {}
        },

        
        // ==================================================================================
        // ==> USER
        // ==================================================================================
        async signinUser_API(formData) { this.write_Base(`${this.urlAPI()}/auth/signin`, formData, "POST") },

        // ----------------------------------------------------------------------------------
        async loginUser_API(formData) { this.write_Base(`${this.urlAPI()}/auth/login`, formData, "POST") },
        
        // ----------------------------------------------------------------------------------
        async logoutUser_API() { this.write_Base(`${this.urlAPI()}/auth/logout`, {}, "POST") },
        
        // ----------------------------------------------------------------------------------
        async wallUser_API() { return await this.read_Base(`${this.urlAPI()}/auth/wall`) },
        
        // ----------------------------------------------------------------------------------
        async profileUser_API() { return await this.read_Base(`${this.urlAPI()}/auth/profile`) },
        
        // ----------------------------------------------------------------------------------
        async updateUser_API(formData) { this.write_Base(`${this.urlAPI()}/auth/updateUser`, formData, "PUT") },
        
        // ----------------------------------------------------------------------------------
        async updateUserEmail_API(formData) { this.write_Base(`${this.urlAPI()}/auth/updateUser/email`, formData, "PUT") },
        
        // ----------------------------------------------------------------------------------
        async updateUserPsw_API(formData) { this.write_Base(`${this.urlAPI()}/auth/updateUser/password`, formData, "PUT") },
        
        // ----------------------------------------------------------------------------------
        async deleteUser_API(formData) { this.write_Base(`${this.urlAPI()}/auth/delete`, formData, "DELETE") },
        
        // ----------------------------------------------------------------------------------


        // ==================================================================================
        //  ==> PUBLISH
        // ==================================================================================
        async getAllPublish_API() { return await this.read_Base(`${this.urlAPI()}/publish`) },
        // ----------------------------------------------------------------------------------

        async createPublish_API(formData) { this.write_Base(`${this.urlAPI()}/publish/create`, formData, "POST") },
        // ----------------------------------------------------------------------------------

        async modifyPublish_API(formData, postId) {
        this.write_Base_WithID(`${this.urlAPI()}/publish/modify`, formData, postId, "PUT") }, // publishId
        // ----------------------------------------------------------------------------------

        async deletePublish_API(formData, postId) {
        this.write_Base_WithID(`${this.urlAPI()}/publish/delete`, formData, postId, "DELETE") }, // publishId
        // ----------------------------------------------------------------------------------



        // ==================================================================================
        //  ==> COMMENT
        // ==================================================================================
        async getAllComment_API(postId) {
            this.write_Base_WithID(`${this.urlAPI()}/comment`, {}, postId, "POST") }, // publishId
        // ----------------------------------------------------------------------------------

        async createComment_API(formData, postId) { 
        this.write_Base_WithID(`${this.urlAPI()}/comment/create`, formData, postId, "POST") }, // publishId
        // ----------------------------------------------------------------------------------
        
        async modifyComment_API(formData, postId) {
        this.write_Base_WithID(`${this.urlAPI()}/comment/modify`, formData, postId, "PUT") }, // commentId
        // ----------------------------------------------------------------------------------

        async deleteComment_API(formData, postId) {
        this.write_Base_WithID(`${this.urlAPI()}/comment/delete`, formData, postId, "DELETE") }, // commentId
        // ----------------------------------------------------------------------------------
    }
}