<template>
  <div class="app-container">
    <div class="search-container">
      <span class="">文章标题:</span>
      <el-input v-model="queryWhere.articleTitle" placeholder="请输入" size="small"></el-input>
      <span class="">评论人:</span>
      <el-input v-model="queryWhere.userName" placeholder="请输入" size="small"></el-input>
      <div class="tools">
        <el-button type="primary" @click="addHandle" size="small" class="add-comment" plain>添加评论</el-button>
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
      <el-table-column prop="articleId" align="center" label="文章标题"></el-table-column>
      <el-table-column prop="content" align="center" label="评论内容"></el-table-column>
      <el-table-column prop="userId" align="center" label="评论人"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
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
import { getCommentList, delComment } from '@/api/blob/comment'
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
        articleTitle: null,
        userName: null
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCommentList(this.queryWhere).then(response => {
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
      this.queryWhere.articleTitle = null;
      this.queryWhere.userName = null;
      this.query();
    },
    addHandle() {
      this.$router.push({ path: '/blob/commentTable/addComment' });
    },
    editHandle(data) {
      this.$router.push({ path: '/blob/commentTable/addComment', query: data });
    },
    delHandle(id) {
      this.$confirm('确认删除', '提示', {
        type: 'warning'
      }).then(() => {
        delComment({ id: id }).then(res => {
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
  @import "@/styles/common";

  .add-comment {
    visibility: hidden;
  }
</style>
