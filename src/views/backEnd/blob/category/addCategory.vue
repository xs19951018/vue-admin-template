<template>
  <div class="app-container">
    <div class="from-container">
      <el-form :model="handleForm" :rules="handleRules" ref="handleForm" label-width="100px" class="demo-ruleForm">
        <div class="user-info">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="handleForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="handleForm.description" size="small"></el-input>
          </el-form-item>
          <el-form-item label="缩略图" prop="image">
            <el-input v-model="handleForm.image" size="small"></el-input>
          </el-form-item>
        </div>
        
        <div class="tools">
          <el-button type="primary" @click="handleSave" size="small">保存</el-button>
          <el-button type="primary" @click="cancel" size="small" plain>取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addCategory, updateCategory } from '@/api/blob/category'

export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      isAdd: true,
      handleForm: {
        id: null,
        name: null,
        description: null,
        image: null,
        userId: this.$store.state.user.id  // 登陆人id
      },
      handleRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
    }
  },
  created() {
  },
  mounted() {
    // add or edit
    this.isEdit = Boolean(this.$route.query.id);
    if (this.isEdit) {
      this.handleForm = this.$route.query;
    }
  },
  methods: {
    handleSave() {
      this.$refs.handleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isEdit) {
            updateCategory(this.handleForm).then(res => {
              this.$router.push({ path: '/blob/categoryTable' })
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            }).catch(err => {})
          } else {
            addCategory(this.handleForm).then(res => {
              this.loading = false
              this.$router.push({ path: '/blob/categoryTable' })
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
      this.$router.push({ path: '/blob/categoryTable' });
    }
  }
}
</script>
<style lang="scss" scpoed>
@import "@/styles/common";

.user-info {
  width: 50%;
  float: left;
}
.user-avatar {
  width: 178px;
  height: 184px;
  display: inline-block;
}
.tools {
  clear: both;
}
</style>

<style lang="scss" scpoed>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>