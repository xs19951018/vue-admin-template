<template>
  <div class="app-container">
    <div class="search-container">
      <span class="">标签名称:</span>
      <el-input v-model="queryWhere.name" placeholder="请输入" size="small"></el-input>
      <div class="tools">
        <el-button type="primary" @click="addHandle" size="small" plain>添加标签</el-button>
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
      <el-table-column prop="name" align="center" label="标签名称"></el-table-column>
      <el-table-column prop="description" align="center" label="描述"></el-table-column>
      <el-table-column prop="articleCount" align="center" label="文章数量"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="editHandle(scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="delHandle(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="queryWhere.pageNum" :limit.sync="queryWhere.pageSize" 
      @pagination="fetchData()"/>
  </div>
</template>

<script>
import { getTagsList, delTags } from '@/api/blob/tags'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
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
      getTagsList(this.queryWhere).then(response => {
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
    addHandle() {
      this.$router.push({ path: '/blob/tagsTable/addTags' });
    },
    editHandle(data) {
      this.$router.push({ path: '/blob/tagsTable/addTags', query: data });
    },
    delHandle(id) {
      this.$confirm('确认删除', '提示', {
        type: 'warning'
      }).then(() => {
        delTags({ id: id }).then(res => {
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
