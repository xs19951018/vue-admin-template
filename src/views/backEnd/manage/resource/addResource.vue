<template>
  <div class="app-container">
    <div class="from-container">
      <el-form :model="resourceForm" :rules="resourceRules" ref="resourceForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="resourceForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="资源编码" prop="code">
          <el-input v-model="resourceForm.code" size="small"></el-input>
        </el-form-item>
        <el-form-item label="请求路径" prop="url">
          <el-input v-model="resourceForm.url" size="small"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="resourceForm.categoryId" clearable placeholder="请选择" size="small">
            <el-option
              v-for="item in categoryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
import { addResource, updateResource } from '@/api/manage/resource'
import { getResourceCategoryList } from '@/api/manage/resourceCategory'

export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      resourceForm: {
        id: null,
        name: null,
        code: null,
        url: null,
        categoryId: null
      },
      categoryOptions: [],
      resourceRules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入资源编码', trigger: 'blur' }],
        url: [{ required: true, message: '请输入请求路径', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择资源分类', trigger: 'change' }]
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
    // 初始化资源分类select
    this.getResourceCategoryList();
  },
  methods: {
    handleSave() {
      this.$refs.resourceForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isEdit) {
            updateResource(this.resourceForm).then(res => {
              this.$router.push({ path: '/manage/resourceTable' })
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            }).catch(err => {})
          } else {
            addResource(this.resourceForm).then(res => {
              this.loading = false
              this.$router.push({ path: '/manage/resourceTable' })
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
      this.$router.push({ path: '/manage/resourceTable' });
    },
    getResourceCategoryList() {
      getResourceCategoryList({}).then(res => {
        this.categoryOptions = res.data;
      }).catch(err => {})
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
