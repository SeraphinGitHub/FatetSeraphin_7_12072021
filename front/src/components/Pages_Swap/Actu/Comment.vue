<template>
    <div class="flexCenter comment-frame" :id="comment.id">

        <CommentUserInfos :userId="comment.userId"/>
        <span class="flexCenter time-stamp">Publié le : <h3>{{ commentTime }}</h3></span>
        <p>{{ comment.textContent }}</p>

    </div>
</template>


<script>
    import CommentUserInfos from "./CommentUserInfos.vue"
    
    export default {
        name: "Comment",

        components: {
            CommentUserInfos,
        },

        props: {
            comment: Object,
        },

        data() {
            return {
                commentTime: new Date(this.comment.createdAt).toLocaleString(),
            }
        },

        methods: {

        }
    }
</script>


<style scoped>
    .comment-frame {
        height: auto;
        width: 90%;
        margin-bottom: 20px;
        border: solid 1px black;
        border-radius: 15px;
        background: linear-gradient(to bottom right, white, darkviolet);
    }

    .time-stamp {
        align-content: space-between;
        height: 37px;
        width: 90%;

        font-family: "Raleway-Medium";
        font-size: 100%;
        line-height: 100%;
        font-weight: 400;
    }

    h3 {
        margin: 0;
        margin-left: 5px;
        font-style: italic;
        font-size: 100%;
        font-weight: 400;
    }

    p {
        width: 85%;
        margin: 10px;
        margin-top: 7px;
        padding: 10px;
        font-size: 100%;
        line-height: 110%;
        border-radius: 10px;
        background: white;
    }
</style>