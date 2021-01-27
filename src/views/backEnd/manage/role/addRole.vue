<template>
  <div class="app-container">
    <div class="from-container">
      <el-form :model="roleForm" :rules="roleRules" ref="roleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="roleForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="roleForm.description" size="small"></el-input>
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
import { addRole, updateRole } from '@/api/manage/role'

export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      roleForm: {
        id: null,
        name: null,
        description: null
      },
      roleRules: {
        name: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
      }
    }
  },
  created() {
  },
  mounted() {
    // add or edit
    this.isEdit = Boolean(this.$route.query.id);
    if (this.isEdit) {
      this.roleForm = this.$route.query;
    }
  },
  methods: {
    handleSave() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isEdit) {
            updateRole(this.roleForm).then(res => {
              this.$router.push({ path: '/manage/roleTable' })
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            }).catch(err => {})
          } else {
            addRole(this.roleForm).then(res => {
              this.loading = false
              this.$router.push({ path: '/manage/roleTable' })
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
      this.$router.push({ path: '/manage/roleTable' });
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
