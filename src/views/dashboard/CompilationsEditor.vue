<template>
    <div>
        <n-button @click="showAddModel = true">添加</n-button>
        <n-table :bordered="false" :single-line="false">
            <thead>
                <tr> 
                    <th>名称</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(Compilations, index) in CompilationsList">
                    <td>{{ Compilations.id }}</td>
                    <td>{{ Compilations.name }}</td>
                    <td>
                        <n-space>
                            <n-button @click="toUpdate(Compilations)">修改</n-button>
                            <n-button @click="deleteCompilations(Compilations)">删除</n-button>
                        </n-space>
                    </td>
                </tr>

            </tbody>
        </n-table>

        <n-modal v-model:show="showAddModel" preset="dialog" title="Dialog">
            <template #header>
                <div>添加分类</div>
            </template>
            <div>
                <n-input v-model:value="addCompilations.name" type="text" placeholder="请输入名称" />
            </div>
            <template #action>
                <div>
                    <n-button @click="add">提交</n-button>
                </div>
            </template>
        </n-modal>

        <n-modal v-model:show="showUpdateModel" preset="dialog" title="Dialog">
            <template #header>
                <div>修改分类</div>
            </template>
            <div>
                <n-input v-model:value="updateCompilations.name" type="text" placeholder="请输入名称" />
            </div>
            <template #action>
                <div>
                    <n-button @click="update">提交</n-button>
                </div>
            </template>
        </n-modal>


    </div>
</template>

<script setup>

import { loginState } from "../../store/StoreLogin";
import { ref, reactive, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage ,useDialog} from "naive-ui";
const router = useRouter()
const route = useRoute()

const message = useMessage()
const dialog = useDialog()
const axios = inject("axios")

const store = loginState()

const showAddModel = ref(false)
const showUpdateModel = ref(false)

const CompilationsList = ref([])
const addCompilations = reactive({
    name: ""
})

const updateCompilations = reactive({
    id:0,
    name: ""
})

onMounted(() => {
    loadDatas()
})

const loadDatas = async () => {
    let res = await axios.get("/Compilations/list")
    CompilationsList.value = res.data.rows
}

const add = async () => {
    let res = await axios.post("/Compilations/_token/add", { name: addCompilations.name })
    if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
    showAddModel.value = false;
}

const toUpdate = async (Compilations) =>{
    showUpdateModel.value = true 
    updateCompilations.id = Compilations.id
    updateCompilations.name = Compilations.name
}

const update = async ()=>{
    let res = await axios.put("/Compilations/_token/update", { id:updateCompilations.id, name: updateCompilations.name })
    if (res.data.code == 200) {
        loadDatas()
        message.info(res.data.msg)
    } else {
        message.error(res.data.msg)
    }
    showUpdateModel.value = false;
}

const deleteCompilations = async (Compilations) => {

    dialog.warning({
        title: '警告',
        content: '是否要删除',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            let res = await axios.delete(`/Compilations/_token/delete?id=${Compilations.id}`)
            if (res.data.code == 200) {
                loadDatas()
                message.info(res.data.msg)
            } else {
                message.error(res.data.msg)
            }
        },
        onNegativeClick: () => { }
    })


}

</script>

<style lang="scss" scoped>
</style>