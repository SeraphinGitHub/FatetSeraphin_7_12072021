<template>
    <section class="flexCenter backLoad">

        <figure class="flexCenter spin-container">
            <img class="logo-top" src="../../public/LogoModified.jpg" alt="logo top">
            <img class="logo-bottom" src="../../public/LogoModified.jpg" alt="logo bottom">
            
            <div class="ring-container-1">
                <div class="ring-1"></div>
            </div>

            <div class="ring-container-2">
                <div class="ring-2"></div>
            </div>
        </figure>

    </section>
</template>


<script>
    export default {
        name: "LoadingSpinner",
    }
</script>


<style scoped lang="scss">
    .backLoad {
        z-index: 80;
        position: fixed;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(100, 100, 100, 0.8);
    }

    .spin-container {
        z-index: 85;
        position: absolute;
        width: 100px;
        height: 100px;
    }

    // ====== Animation Duration ======
    $animDuration: 1s;

    .logo-top,
    .logo-bottom {
        object-fit: cover;
        position: absolute;
        width: 100%;
        height: 51%;
        animation: logo_anim $animDuration linear infinite;
    }

    .logo-top {
        z-index: 100;
        top: 0;
        object-position: top;
        border-radius: 50px 50px 0 0;
    }

    .logo-bottom {
        z-index: 85;
        bottom: 0;
        object-position: bottom;
        border-radius: 0 0 50px 50px;
    }

    .ring-container-1,
    .ring-container-2 {
        position: absolute;
        width: 200px;
        height: 200px;
    }

    .ring-container-1 {
        z-index: 90;
        transform: translateY(-7px) scaleY(25%);
        animation: spin_ring_1 $animDuration linear infinite;
    }

    .ring-container-2 {
        z-index: 87;
        transform: translateY(7px) scaleY(25%);
        animation: spin_ring_2 $animDuration linear infinite;
    }

    .ring-1,
    .ring-2 {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: transparent;
        border-top: solid 8px;
    }

    .ring-1 {
        border-top-color: red;
        transform: rotate(-70deg);
    }

    .ring-2 {
        border-top-color: lime;
        transform: rotate(-70deg);
    }

    @keyframes logo_anim {
        0% { transform: translateY(0) };
        25% { transform: translateY(6px) };
        50% { transform: translateY(0px) };
        75% { transform: translateY(-6px) };
        100% { transform: translateY(0) };
    }

    @keyframes spin_ring_1 {
        0% { transform: translateY(-7px) scaleY(25%) rotate(0deg) };
        100% { transform: translateY(-7px) scaleY(25%) rotate(-360deg) };
    }

    @keyframes spin_ring_2 {
        0% { transform: translateY(7px) scaleY(25%) rotate(0deg) };
        100% { transform: translateY(7px) scaleY(25%) rotate(360deg) };
    }
</style>