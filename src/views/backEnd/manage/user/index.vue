<template>
  <div class="app-container">
    <div class="search-container">
      <span class="">用户名:</span>
      <el-input v-model="queryWhere.userName" placeholder="请输入" size="small"></el-input>
      <span class="">状态:</span>
      <el-select v-model="queryWhere.status" clearable placeholder="请选择" size="small">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="tools">
        <el-button type="primary" @click="addUser" size="small" plain>添加用户</el-button>
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
      <el-table-column prop="userName" align="center" label="用户名"></el-table-column>
      <el-table-column prop="name" align="center" label="姓名"></el-table-column>
      <el-table-column prop="phone" align="center" label="手机号"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | FormatDate('yyyy-MM-dd HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" 
            @change="changeStatus($event,scope.row)"></el-switch>
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
import { getUserList, changeUserStatus, delUser } from '@/api/manage/user'
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
        userName: null,
        status: null
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
      getUserList(this.queryWhere).then(response => {
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
      this.queryWhere.userName = null;
      this.queryWhere.status = null;
      this.query();
    },
    changeStatus(event,data) {
      data.status = event === 0 ? 1 : 0;  // 保持之前的状态
      this.$confirm('确认修改用户状态', '提示', {
        type: 'warning'
      }).then(() => {
        changeUserStatus({
          id: data.id,
          status: event
        }).then(res => {
          data.status = event;  // 成功后更新状态
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        })
      }).catch(err => {});
    },
    addUser() {
      this.$router.push({ path: '/manage/userTable/addUser' });
    },
    edit(data) {
      this.$router.push({ path: '/manage/userTable/addUser', query: data });
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
