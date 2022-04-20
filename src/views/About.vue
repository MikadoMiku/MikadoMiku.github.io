<template>
    <div  style="padding: 1px">
        <div class="about">
            <p>
                This blog is self-made by me(Mihkel Riik) from scratch and is
                not yet fully finished. As i am working on this on the side of a
                full time job i need to take care and time to not burn out on
                programming since i have mostly been programming 10+ hours a day
                combined.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.about {
    width: 50vw;
    height: 50vh;
    margin-left: 25vw;
    margin-top: 25vh;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 20px hsl(317 100% 54%);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 10px;
}

.about > p {
    padding: 20px;
    margin-top: 25px;
    text-align: left;
}
</style>
