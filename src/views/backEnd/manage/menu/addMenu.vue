<template>
  <div class="app-container">
    <div class="from-container">
      <el-form :model="menuForm" :rules="menuRules" ref="menuForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="code">
          <el-input v-model="menuForm.code" size="small"></el-input>
        </el-form-item>
        <el-form-item label="父级菜单" prop="parentId">
          <el-select v-model="menuForm.parentId" clearable placeholder="请选择" size="small">
            <el-option
              v-for="item in topMenuOptions"
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
import { addMenu, updateMenu, getTopMenuList } from '@/api/manage/menu'

export default {
  data() {
    return {
      loading: false,
      isEdit: false,
      menuForm: {
        id: null,
        name: null,
        parentId: null,
        code: null
      },
      topMenuOptions: [{ id: 0, name: "无", value: 0 }],
      menuRules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入英文名称', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择父级菜单', trigger: 'change' }]
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
    // 初始化菜单select
    this.getTopMenuList();
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
    },
    getTopMenuList() {
      getTopMenuList().then(res => {
        this.topMenuOptions = this.topMenuOptions.concat(res.data)
      }).catch(err => {})
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
