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
                    <strong>
                        <RouterLink :to="userLink">{{ props.userName }}</RouterLink>{{ props.action }}了你的: <RouterLink
                            :to="messageLink">{{ props.actionObject }}</RouterLink>
                    </strong>
                    <br>
                    <slot name="messageDescription">

                        {{ props.messageDetail }}

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
    userName: { type: String, default: "mxc", required: true },
    action: { type: String, default: "评论", required: true },
    actionObject: { type: String, default: '文章' },
    messageTime: { type: Date, default: '2024/1/24 14:22', required: true },
    userLink: { type: String, default: '/' },
    messageLink: { type: String, default: '/' },
    messageDescription: { type: String, default: 'cscscscscscscscscsc' },
})
</script>

<style lang="scss" scoped>

</style>