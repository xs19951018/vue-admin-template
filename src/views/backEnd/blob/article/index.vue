<template>
  <div class="app-container">
    <div class="search-container">
      <span class="">标题:</span>
      <el-input v-model="queryWhere.title" placeholder="请输入" size="small"></el-input>
      <span class="">评论状态:</span>
      <el-select v-model="queryWhere.allowComment" clearable placeholder="请选择" size="small">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="tools">
        <el-button type="primary" @click="addUser" size="small" plain>添加文章</el-button>
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
      <el-table-column prop="title" align="center" label="标题"></el-table-column>
      <el-table-column prop="content" align="center" label="内容"></el-table-column>
      <el-table-column prop="description" align="center" label="描述"></el-table-column>
      <el-table-column prop="categoryId" align="center" label="分类"></el-table-column>
      <el-table-column prop="allowComment" align="center" label="允许评论">
        <template slot-scope="scope">
          <el-switch  v-model="scope.row.allowComment" :active-value="1" :inactive-value="0" 
            @change="changeCommentStatus($event,scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="delUser(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="queryWhere.pageNum" :limit.sync="queryWhere.pageSize" 
      @pagination="fetchData()"/>
  </div>
</template>

<script>
import { getArticleList, changeCommentStatus, delUser } from '@/api/blob/article'
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
        title: null,
        allowComment: null
      },
      statusOptions: [
        { value: 1, label: '允许' },
        { value: 0, label: '禁止' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getArticleList(this.queryWhere).then(response => {
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
      this.queryWhere.title = null;
      this.queryWhere.allowComment = null;
      this.query();
    },
    changeCommentStatus(event,data) {
      data.allowComment = event === 0 ? 1 : 0;  // 保持之前的状态
      this.$confirm('确认修改评论状态', '提示', {
        type: 'warning'
      }).then(() => {
        changeCommentStatus({
          id: data.id,
          allowComment: event
        }).then(res => {
          data.allowComment = event;  // 成功后更新状态
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        })
      }).catch(err => {});
    },
    addUser() {
      this.$router.push({ path: '/blob/articleTable/addArticle' });
    },
    edit(data) {
      this.$router.push({ path: '/blob/articleTable/addArticle', query: data });
    },
    delUser(id) {
      this.$confirm('确认删除', '提示', {
        type: 'warning'
      }).then(() => {
        delUser({ id: id }).then(res => {
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
