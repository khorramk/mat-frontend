<template>
    <div>
        <v-card
            class="mx-auto"
        >
            <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
            </v-img>
        </v-card>
        <v-img
            style="border: 2px solid white; margin-top: -74px; background-size: cover;"
            class="white--text align-end rounded mx-auto"
            max-width="150px"
            max-height="150px"
            :src="image"
        >
            <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
        </v-img>
        <div class="text-center">
            <span class="text-h5 font-weight-bold text--secondary">{{name}} </span>   
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileBanner',
    props: {
        name: {
            type: String,
            default: 'John doe'
        },
        image: {
            type: String,
            default: '/candidate.png'
        }
    }
}
</script>

<style scoped>
.v-image__image {
    background-size: cover ;
}
</style>
