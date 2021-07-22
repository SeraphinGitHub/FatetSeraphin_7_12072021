<template>
    <section class="flexCenter private-wall">

        <button class="private-wall-btn" @click="showPrivateWall()">Mon mur</button>
        
        <div class="flexCenter flow">
            <Publication/>
        </div>

    </section>
</template>


<script>
    import Publication from '../Actu/Publication.vue'

    export default {
        name: 'PrivateWall',

        components: {
            Publication,
        },

        methods: {
            showPrivateWall: function() {
                document.querySelector(".actu").style.zIndex = "5";
                document.querySelector(".private-wall").style.zIndex = "10";
                document.querySelector(".profile").style.zIndex = "5";
            },
        }
    }
</script>


<style scoped lang="scss">

    $pageColor: rgb(60, 63, 255);

    .private-wall {
        z-index: 5;
        border-radius: 20px;
        background: linear-gradient(to top, lightgray, $pageColor);
    }

    .private-wall,
    .private-wall-btn {
        border: solid $pageColor 3px;
    }
    
    .private-wall-btn {
        left: center;
        background-color: $pageColor;
    }
</style>