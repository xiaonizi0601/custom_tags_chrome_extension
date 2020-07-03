<template>
    <!-- 提示框 start -->
    <div class="custom-toast">
        <img src="../assets/images/icon_msg.svg">
        <span class="ml-2">{{markedWords}}</span>
    </div>
    <!-- 提示框 end -->
</template>

<script>
    export default {
        name: 'toast',
        // props:["markedWords"],
        props: {
            markedWords: {
                type: String
            }
        },// 提示语
        data () {
            return {
            }
        },
        methods: {

        }
    }
</script>


<style scoped>
    .custom-toast {
        background: var(--base-color);
        color: #fff;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1051;
    }
</style>