<template>
    <div class="flexCenter aze">

        <button class="btn" @click.prevent="postArticle()" type="submit">Publier l'article</button>
        
    </div>
</template>


<script>    
    export default {
        name: 'Publish',

        methods: {
            postArticle: function() {
                
            }
        }
    }
</script>


<style scoped>
    .aze {
        position: absolute;
        top: -120px;
        left: -20px;
        height: 50px;
        width: 200px;
    }
</style>