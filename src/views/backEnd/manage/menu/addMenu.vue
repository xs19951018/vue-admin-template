<template>
  <div class="app-container">
    <div class="from-container">
      <el-form :model="menuForm" :rules="menuRules" ref="menuForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="父级菜单" prop="parentId">
          <el-input v-model="menuForm.parentId" size="small"></el-input>
        </el-form-item>
        
        <div class="tools">
          <el-button type="primary" @click="handleSave" size="small">保存</el-button>
          <el-button type="primary" @click="cancel" size="small" plain>取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addMenu, updateMenu } from '@/api/manage/menu'

export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      menuForm: {
        id: null,
        userName: null,
        password: '88888888',
        name: null,
        phone: null
      },
      menuRules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      }
    }
  },
  created() {
  },
  mounted() {
    // add or edit
    this.isEdit = Boolean(this.$route.query.id);
    if (this.isEdit) {
      this.menuForm = this.$route.query;
    }
  },
  methods: {
    handleSave() {
      this.$refs.menuForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isEdit) {
            updateMenu(this.menuForm).then(res => {
              this.$router.push({ path: '/manage/menuTable' })
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            }).catch(err => {})
          } else {
            addMenu(this.menuForm).then(res => {
              this.loading = false
              this.$router.push({ path: '/manage/menuTable' })
              this.$message({
                type: 'success',
                message: '新增成功'
              });
            }).catch(err => {})
          }
          this.loading = false;
        }
      });
    },
    cancel() {
      this.$router.push({ path: '/manage/menuTable' });
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
