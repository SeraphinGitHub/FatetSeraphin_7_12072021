<template>
    <section class="flexCenter actu">
       
        <button class="actu-btn" @click="showActu()">Actu</button>
        
        <ul class="flexCenter flow">
            <Publication/>
            <Publication/>
        </ul>

    </section>
</template>


<script>
    import Publication from './Publication.vue'

    export default {
        name: 'Actu',
        
        components: {
            Publication,
        },

        methods: {
            showActu: function() {
                document.querySelector(".actu").style.zIndex = "10";
                document.querySelector(".private-wall").style.zIndex = "5";
                document.querySelector(".profile").style.zIndex = "5";
            },
        }
    }
</script>


<style scoped lang="scss">
    
    $pageColor: rgb(60, 180, 255);

    .actu {
        z-index: 10;
        border-radius: 0 20px 20px 20px;
        background: linear-gradient(to top, lightgray, $pageColor);
    }

    .actu,
    .actu-btn {
        border: solid $pageColor 3px;
    }
    
    .actu-btn {
        left: -3px;
        background-color: $pageColor;
    }
</style>