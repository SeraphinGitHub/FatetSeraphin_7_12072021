
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


        log_Base(session, includeString, resetString) {

            if(session.message.includes(includeString)) {

                this.serverAlert = true;
                this.serverMsg = session.message;
                setTimeout(() => this.serverAlert = false, this.timeOutDuration);
            }

            else if(session.message.includes("connecté")) {
                localStorage.setItem("Token", session.token);
                
                this.$parent.$parent.isLogPages = false;
                this.$parent.$parent.isSwapPages = true;

                this.$parent.$parent.swapPageAlert = true;
                this.$parent.$parent.swapPageMsg = session.message;

                setTimeout(() => this.$parent.$parent.swapPageAlert = false, this.timeOutDuration);
                
                this.clearInputFields();

                if(resetString === "signin") {
                    document.querySelector(".signin").style.zIndex = "1";
                    document.querySelector(".login").style.zIndex = "10";
                }
            }
        }
    }
}