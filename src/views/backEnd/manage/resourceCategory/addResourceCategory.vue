<template>
  <div class="app-container">
    <div class="from-container">
      <el-form :model="resourceForm" :rules="resourceRules" ref="resourceForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="resourceForm.name" size="small"></el-input>
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
import { addResourceCategory, updateResourceCategory } from '@/api/manage/resourceCategory'

export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      resourceForm: {
        id: null,
        name: null
      },
      resourceRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  created() {
  },
  mounted() {
    // add or edit
    this.isEdit = Boolean(this.$route.query.id);
    if (this.isEdit) {
      this.resourceForm = this.$route.query;
    }
  },
  methods: {
    handleSave() {
      this.$refs.resourceForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isEdit) {
            updateResourceCategory(this.resourceForm).then(res => {
              this.$router.push({ path: '/manage/resourceCategoryTable' })
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            }).catch(err => {})
          } else {
            addResourceCategory(this.resourceForm).then(res => {
              this.loading = false
              this.$router.push({ path: '/manage/resourceCategoryTable' })
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
      this.$router.push({ path: '/manage/resourceCategoryTable' });
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
