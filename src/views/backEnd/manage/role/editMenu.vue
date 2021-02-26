<template>
  <div class="app-container">
    <div class="from-container">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-tree
          :data="menuList"
          :props="{ label: 'name', children: 'children' }"
          node-key="id"
          ref="tree"
          show-checkbox
          default-expand-all>
        </el-tree>
        
        <div class="tools">
          <el-button type="primary" @click="handleSave" size="small">保存</el-button>
          <el-button type="primary" @click="cancel" size="small" plain>取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getMenuList, getCheckedMenuList, updateRoleMenuRelation } from '@/api/manage/menu'

export default {
  data() {
    return {
      loading: false,
      roleId: null,
      menuList: []
    }
  },
  created() {
  },
  mounted() {
    this.roleId = this.$route.query.id;
    this.getMenuList();
  },
  methods: {
    handleSave() {
      this.$confirm('确认修改角色关联菜单', '提示', {
        type: 'warning'
      }).then(() => {
        let checkedNodes = this.$refs.tree.getCheckedNodes();
        let checkedMenuIds = new Set();
        if (checkedNodes.length > 0) {
          checkedNodes.forEach(el => {
            checkedMenuIds.add(el.id);
            if (el.parentId != 0) {
              checkedMenuIds.add(el.parentId);
            }
          });
        }
        this.loading = true;
        updateRoleMenuRelation({ 
          roleId: this.roleId,
          menuIds: Array.from(checkedMenuIds)
        }).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        }).catch(err => {})
      }).catch(err => {});
      this.loading = false;
    },
    cancel() {
      this.$router.push({ path: '/manage/roleTable' });
    },
    getMenuList() {
      getMenuList({}).then(res => {
        this.menuList = res.data
        this.getCheckedMenuList();
      }).catch(err => {})
    },
    getCheckedMenuList() {
      getCheckedMenuList({ id: this.roleId }).then(res => {
        let checkedMenuNodes = res.data.filter(e => {
          return e.parentId != 0;
        });
        this.$refs.tree.setCheckedNodes(checkedMenuNodes);
      }).catch(err => {})
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
