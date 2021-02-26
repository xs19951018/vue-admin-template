<template>
  <div class="app-container">
    <div class="from-container">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-card v-for="(category, index) in resourceTree" :key="category.id" class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-checkbox v-model="category.checked" 
              :indeterminate="handleIndeterminate(index)" 
              @change="checked=>handleCategoryCheckbox(checked, category)">{{ category.name }}</el-checkbox>
          </div>
          <div v-for="resource in category.children" :key="resource.id" class="item">
            <el-checkbox v-model="resource.checked" @change="checked=>handleResourceCheckbox(checked, category, resource)">{{ resource.name }}</el-checkbox>
            <el-switch v-model="resource.status" active-text="允许" inactive-text="禁止" 
              :active-value="1" :inactive-value="0" v-show="resource.checked">
            </el-switch>
          </div>
        </el-card>
        
        <div class="tools">
          <el-button type="primary" @click="handleSave" size="small">保存</el-button>
          <el-button type="primary" @click="cancel" size="small" plain>取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getResourceTree } from '@/api/manage/resourceCategory'
import { getRoleResourceList, updateRoleResourceRelation } from '@/api/manage/resource'

export default {
  data() {
    return {
      loading: false,
      roleId: null,
      resourceTree: []
    }
  },
  created() {
  },
  mounted() {
    this.roleId = this.$route.query.id;
    this.getResourceTree();
  },
  methods: {
    handleSave() {
      this.$confirm('确认修改角色关联资源', '提示', {
        type: 'warning'
      }).then(() => {
        // 获取checked的resource
        let checkedRes = new Set();
        this.resourceTree.forEach(category => {
          category.children.forEach(resource => {
            if (resource.checked) {
              let map = {
                id: resource.id,
                status: resource.status
              }
              checkedRes.add(map);
            }
          })
        })
        this.loading = true;
        updateRoleResourceRelation({ 
          roleId: this.roleId,
          resourceList: Array.from(checkedRes)
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
    getResourceTree() {
      getResourceTree().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach(category => {
            category.checked = false;
            category.children.forEach(resource => {
              // resource 添加 checked = false 维持checkbox的状态
              resource.checked = false;
              // resource 添加 status = 0 维持switch的状态
              resource.status = 0;
            })
          })
        }
        this.resourceTree = res.data;
        // 根据角色选择的资源初始化checkbox
        this.getRoleResourceList();
      }).catch(err => {})
    },
    getRoleResourceList() {
      getRoleResourceList({ id: this.roleId }).then(res => {
        let checkedResources = res.data;
        let checkedResIds = checkedResources.map(e => e.resourceId);
        this.resourceTree.forEach(category => {
            category.children.forEach(resource => {
              let index = checkedResIds.indexOf(resource.id);
              if ( index> -1) {
                resource.checked = true;
                resource.status = checkedResources[index].status;
                // 切换switchbox状态
                this.handleResourceCheckbox(true, category, resource);
              }
            })
          })
          this.$forceUpdate();
      }).catch(err => {})
    },
    handleCategoryCheckbox(checked, category) {
      category.children.forEach(resource => {
        resource.checked = checked;
      })
      // 重新刷新vue实例
      this.$forceUpdate();
    },
    handleResourceCheckbox(checked, category, resource) {
      resource.checked = checked;
      let total = category.children.length;
      let checkedCount = category.children.filter(resource => {
        return resource.checked === true;
      }).length;
      category.checked = (total === checkedCount ? true : false);
      this.$forceUpdate();
    },
    handleIndeterminate(index) {
      let checkedCount = this.resourceTree[index].children.filter(resource => {
        return resource.checked === true;
      }).length;
      if (checkedCount === 0) return false;

      let total = this.resourceTree[index].children.length;
      return total > checkedCount ? true : false;
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common";

  .tools {
    margin-top: 10px;
  }
  .box-card {
    width: 600px;
    border-radius: 0;
  }
  .el-card__header {
    background: rgb(242, 246, 252);
  }
  .item {
    padding: 5px 0;
  }
  .item .el-switch {
    margin-left: 12rem;
  }
</style>
