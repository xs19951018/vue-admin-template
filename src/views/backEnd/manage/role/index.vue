<template>
  <div class="app-container">
    <div class="search-container">
      <span class="">角色名:</span>
      <el-input v-model="queryWhere.name" placeholder="请输入" size="small"></el-input>
      <div class="tools">
        <el-button type="primary" @click="addRole" size="small" plain>添加角色</el-button>
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
      <el-table-column prop="name" align="center" label="角色名"></el-table-column>
      <el-table-column prop="description" align="center" label="描述"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="delRole(scope.row.id)" size="small">删除</el-button>
          <el-button type="text" @click="editMenu(scope.row)" size="small">分配菜单</el-button>
          <el-button type="text" @click="editResource(scope.row)" size="small">分配资源</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="queryWhere.pageNum" :limit.sync="queryWhere.pageSize" 
      @pagination="fetchData()"/>
  </div>
</template>

<script>
import { getRoleList, delRole } from '@/api/manage/role'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      queryWhere: {
        pageNum: 1,
        pageSize: 10,
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
      getRoleList(this.queryWhere).then(response => {
        this.total = response.data.total;
        this.list = response.data.records;
        this.listLoading = false;
      })
    },
    query() {
      this.queryWhere.pageNum = 1;
      this.fetchData();
    },
    resetQuery() {
      this.queryWhere.name = null;
      this.query();
    },
    addRole() {
      this.$router.push({ path: '/manage/roleTable/addRole' });
    },
    edit(data) {
      this.$router.push({ path: '/manage/roleTable/addRole', query: data });
    },
    delRole(id) {
      this.$confirm('确认删除', '提示', {
        type: 'warning'
      }).then(() => {
        delRole({ id: id }).then(res => {
          this.fetchData();
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
      }).catch(err => {});
    },
    editMenu(data) {
      this.$router.push({ path: '/manage/roleTable/editMenu', query: data });
    },
    editResource(data) {
      this.$router.push({ path: '/manage/roleTable/editResource', query: data });
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
