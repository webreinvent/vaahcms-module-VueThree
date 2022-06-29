<script setup>
import {reactive, ref} from 'vue';

const inputs = {
}
const data = reactive(inputs);
const height = ref(window.innerHeight)

</script>
<template  >

    <div v-if="height">
        <el-container :style="{'height': height+'px'}" >
            <el-aside width="200px">
                <el-scrollbar>
                    <el-menu :router="true">
                        <el-menu-item index="/" >
                            Dashboard
                        </el-menu-item>
                        <el-menu-item index="/articles" >Articles</el-menu-item>
                    </el-menu>
                </el-scrollbar>

            </el-aside>
        </el-container>
    </div>

</template>


