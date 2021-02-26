<template>
  <div class="app-container">
    <div class="search-container">
      <span class="">分类名称:</span>
      <el-input v-model="queryWhere.name" placeholder="请输入" size="small"></el-input>

      <div class="tools">
        <el-button type="primary" @click="addCategory" size="small" plain>添加</el-button>
        <el-button type="primary" @click="cancel" size="small" plain>返回</el-button>
        <el-button type="primary" @click="resetQuery" size="small" class="tool-search" plain>重置</el-button>
        <el-button type="primary" @click="query" size="small" class="tool-search" plain>搜索</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :header-cell-style="{background: '#f5f7fa',color:'#606266'}"
    >
      <el-table-column prop="name" align="center" label="分类名称"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="delCategory(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getResourceCategoryList, delResourceCategory } from '@/api/manage/resourceCategory'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      queryWhere: {
        name: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getResourceCategoryList(this.queryWhere).then(response => {
        this.list = response.data;
        this.listLoading = false;
      })
    },
    query() {
      this.fetchData();
    },
    resetQuery() {
      this.queryWhere.name = null;
      this.query();
    },
    addCategory() {
      this.$router.push({ path: '/manage/resourceCategoryTable/addResourceCategory' });
    },
    edit(data) {
      this.$router.push({ path: '/manage/resourceCategoryTable/addResourceCategory', query: data });
    },
    delCategory(id) {
      this.$confirm('确认删除', '提示', {
        type: 'warning'
      }).then(() => {
        delResourceCategory({ id: id }).then(res => {
          this.fetchData();
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
      }).catch(err => {});
    },
    cancel() {
      this.$router.push({ path: '/manage/resourceTable' });
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
