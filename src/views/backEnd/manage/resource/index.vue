<template>
  <div class="app-container">
    <div class="search-container">
      <span class="">资源名称:</span>
      <el-input v-model="queryWhere.name" placeholder="请输入" size="small"></el-input>
      <span class="">资源编码:</span>
      <el-input v-model="queryWhere.code" placeholder="请输入" size="small"></el-input>
      <div class="tools">
        <el-button type="primary" @click="addResource" size="small" plain>添加</el-button>
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
      <el-table-column prop="name" align="center" label="资源名称"></el-table-column>
      <el-table-column prop="code" align="center" label="资源编码"></el-table-column>
      <el-table-column prop="url" align="center" label="请求路径"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="delResource(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="queryWhere.pageNum" :limit.sync="queryWhere.pageSize" 
      @pagination="fetchData()"/>
  </div>
</template>

<script>
import { getResourceList, delResource } from '@/api/manage/resource'
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
        name: null,
        code: null
      },
      statusOptions: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getResourceList(this.queryWhere).then(response => {
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
      this.queryWhere.code = null;
      this.query();
    },
    addResource() {
      this.$router.push({ path: '/manage/resourceTable/addResource' });
    },
    edit(data) {
      this.$router.push({ path: '/manage/resourceTable/addResource', query: data });
    },
    delResource(id) {
      this.$confirm('确认删除', '提示', {
        type: 'warning'
      }).then(() => {
        delResource({ id: id }).then(res => {
          this.fetchData();
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        })
      }).catch(err => {});
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common"

</style>
