<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong><RouterLink :to="userLink">{{props.userName}}</RouterLink> 发表了{{props.typeName}}: <RouterLink :to="dynamicsLink">{{ props.dynamicsName }}</RouterLink> </strong>
                    <br>
                    <slot name="dynamicsDescription">

                        {{props.dynamicsDetail}}

                    </slot>
                  
                    <br>
                    <small>
                        <slot name="messageTime">

                            {{ props.messageTime }}

                        </slot>
                    </small>
                </p>
            </div>
        </div>
    </article>
</template>

<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
    userName: { type: String, default: "mxc" ,required: true },
    typeName: { type: String, default: "博客", required: true },
    dynamicsName: { type: String, default: '。。。' },
    dynamicsTime: { type: Date, default: '2024/1/24 14:22', required: true },
    userLink:{type: String, default: '/' },
    dynamicsLink:{type: String, default: '/'},
    dynamicsDescription:{type:String ,default:'cscscscscscscscscsc'},
})
</script>

<style lang="scss" scoped>

</style>