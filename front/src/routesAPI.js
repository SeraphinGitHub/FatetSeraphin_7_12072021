
"use strict"

const fromAPI = "http://localhost:3000/api";

// ========== GET ==========
const read_Base = async (url) => {
    
    return await fetch(url)
    .then(response => response.json())
    .then(data => { return data });
}


// ========== POST / PUT / DELETE ==========
const write_Base = async (url, data, method) => {
    
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        method: method,
        body: JSON.stringify( data ) // ==> data = {object}
    });
    
    try { return await response.json() }
    catch(error) { console.log("error", error) }
    return {}
}


// ========== POST / PUT / DELETE ==========
const write_Base_WithID = async (url, data, postId, method) => {
    
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        method: method,
        body: JSON.stringify( data, postId ) // ==> data = {object}, postId = [array]
    });
    
    try { return await response.json() }
    catch(error) { console.log("error", error) }
    return {}
}


// ==================================================================================
// ==> USER
// ==================================================================================
const signinUser_API = async (formData) => write_Base(`${fromAPI}/auth/signin`, formData, "POST");
// ----------------------------------------------------------------------------------
const loginUser_API = async (formData) => write_Base(`${fromAPI}/auth/login`, formData, "POST");
// ----------------------------------------------------------------------------------
const logoutUser_API = async () => write_Base(`${fromAPI}/auth/logout`, {}, "POST");
// ----------------------------------------------------------------------------------
const wallUser_API = async () => read_Base(`${fromAPI}/auth/wall`);
// ----------------------------------------------------------------------------------
const profileUser_API = async () => read_Base(`${fromAPI}/auth/profile`);
// ----------------------------------------------------------------------------------
const updateUser_API = async (formData) => write_Base(`${fromAPI}/auth/updateUser`, formData, "PUT");
// ----------------------------------------------------------------------------------
const updateUserEmail_API = async (formData) => write_Base(`${fromAPI}/auth/updateUser/email`, formData, "PUT");
// ----------------------------------------------------------------------------------
const updateUserPsw_API = async (formData) => write_Base(`${fromAPI}/auth/updateUser/password`, formData, "PUT");
// ----------------------------------------------------------------------------------
const deleteUser_API = async (formData) => write_Base(`${fromAPI}/auth/delete`, formData, "DELETE");
// ----------------------------------------------------------------------------------


// ==================================================================================
//  ==> PUBLISH
// ==================================================================================
const getAllPublish_API = async () => read_Base(`${fromAPI}/publish`);
// ----------------------------------------------------------------------------------
const createPublish_API = async (formData) => write_Base(`${fromAPI}/publish/create`, formData, "POST");
// ----------------------------------------------------------------------------------
const modifyPublish_API = async (formData, postId) =>
write_Base_WithID(`${fromAPI}/publish/modify`, formData, postId, "PUT"); // publishId
// ----------------------------------------------------------------------------------
const deletePublish_API = async (formData, postId) =>
write_Base_WithID(`${fromAPI}/publish/delete`, formData, postId, "DELETE"); // publishId
// ----------------------------------------------------------------------------------



// ==================================================================================
//  ==> COMMENT
// ==================================================================================
const getAllComment_API = async (postId) =>
write_Base_WithID(`${fromAPI}/comment`, {}, postId, "POST"); // publishId
// ----------------------------------------------------------------------------------
const createComment_API = async (formData, postId) => 
write_Base_WithID(`${fromAPI}/comment/create`, formData, postId, "POST"); // publishId
// ----------------------------------------------------------------------------------
const modifyComment_API = async (formData, postId) =>
write_Base_WithID(`${fromAPI}/comment/modify`, formData, postId, "PUT"); // commentId
// ----------------------------------------------------------------------------------
const deleteComment_API = async (formData, postId) =>
write_Base_WithID(`${fromAPI}/comment/delete`, formData, postId, "DELETE"); // commentId
// ----------------------------------------------------------------------------------