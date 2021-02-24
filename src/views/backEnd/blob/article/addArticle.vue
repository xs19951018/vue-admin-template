<template>
  <div class="app-container">
    <div class="from-container">
      <el-form :model="handleForm" :rules="handleRules" ref="handleForm" label-width="100px" class="demo-ruleForm">
        <div class="user-info">
          <el-form-item label="标题" prop="title">
            <el-input v-model="handleForm.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="handleForm.description" size="small"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" 
              placeholder="请输入内容" v-model="handleForm.content">
            </el-input>
          </el-form-item>
          <el-form-item label="分类" prop="categoryId">
            <el-select v-model="handleForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="允许评论" prop="allowComment">
            <el-switch  v-model="handleForm.allowComment" :active-value="1" :inactive-value="0"></el-switch>
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
import { addArticle, updateArticle } from '@/api/blob/article'
import { getCategoryByUserId } from '@/api/blob/category'

export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      handleForm: {
        id: null,
        title: null,
        content: null,
        description: null,
        categoryId: null,
        allowComment: 1,
        userId: this.$store.state.user.id  // 获取user.id
      },
      handleRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      categoryOptions: []
    }
  },
  created() {
  },
  mounted() {
    // add or edit
    this.isEdit = Boolean(this.$route.query.id);
    if (this.isEdit) {
      // 合并对象
      Object.assign(this.handleForm, this.$route.query);
    }
    // 获取文章分类
    this.getCategoryOptions();
  },
  methods: {
    handleSave() {
      this.$refs.handleForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isEdit) {
            updateArticle(this.handleForm).then(res => {
              this.$router.push({ path: '/blob/articleTable' })
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            }).catch(err => {})
          } else {
            addArticle(this.handleForm).then(res => {
              this.loading = false
              this.$router.push({ path: '/blob/articleTable' })
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
      this.$router.push({ path: '/blob/articleTable' });
    },
    getCategoryOptions() {
      getCategoryByUserId({ id: this.handleForm.userId }).then(res => {
        this.categoryOptions = res.data
      }).catch(err => {})
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