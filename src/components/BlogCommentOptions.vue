<template>
    <div class="comment_button_container">
        <button type="button" class="btn btn-info" @click="editComment()">Edit</button>
        <button style="margin-left: 5px" type="button" class="btn btn-danger" @click="deleteComment()">
            Delete
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "commentOptions",
    props: {
        commentId: String,
    },
    methods: {
        deleteComment() {
            this.$emit("deleteComment")
        },
        editComment() {
            this.$emit("editComment")
        }
    }
});
</script>

<style scoped></style>
