<template>
  <div class="app-container">
    <div class="from-container">
      <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="100px" class="demo-ruleForm">
        <div class="user-info">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="userForm.userName" size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-show="!isEdit">
            <el-input v-model="userForm.password" size="small" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="userForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="userForm.phone" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="user-avatar" v-show="isEdit">
          <el-upload
            class="avatar-uploader"
            action="manage/file/uploadAvatar"
            :data="{key: userForm.userName}"
            accept="image/*"
            :auto-upload="true"
            :limit="1"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { addUser, updateUser } from '@/api/manage/user'

export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      isAdd: true,
      userForm: {
        id: null,
        userName: null,
        password: '88888888',
        name: null,
        phone: null,
        avatar: null
      },
      test: null,
      userRules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
    }
  },
  created() {
  },
  mounted() {
    // add or edit
    this.isEdit = Boolean(this.$route.query.id);
    if (this.isEdit) {
      this.userForm = this.$route.query
    }
  },
  methods: {
    handleSave() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isEdit) {
            updateUser(this.userForm).then(res => {
              this.$router.push({ path: '/manage/userTable' })
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            }).catch(err => {})
          } else {
            addUser(this.userForm).then(res => {
              this.loading = false
              this.$router.push({ path: '/manage/userTable' })
              this.$message({
                type: 'success',
                message: '新增成功'
              })
            }).catch(err => {})
          }
          this.loading = false
        }
      })
    },
    cancel() {
      this.$router.push({ path: '/manage/userTable' })
    },
    uploadSuccess(response, file, fileList) {
      // 上传头像成功回调
      this.userForm.avatar = response.data
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
