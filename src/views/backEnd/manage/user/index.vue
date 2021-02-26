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
      <el-table-column prop="roleName" align="center" label="角色"></el-table-column>
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
          <el-button type="text" @click="editRole(scope.row.id)" size="small">分配角色</el-button>
          <el-button type="text" @click="edit(scope.row)" size="small">编辑</el-button>
          <el-button type="text" @click="delUser(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="queryWhere.pageNum" :limit.sync="queryWhere.pageSize" 
      @pagination="fetchData()"/>

    <el-dialog title="分配角色" custom-class="role-dialog" :visible.sync="roleForm.dialogVisible" width="30%">
      <el-form :form="roleForm">
        <el-form-item>
          <el-select v-model="roleForm.roleIds" multiple size="small" placeholder="请选择">
            <el-option
              v-for="item in roleForm.roleOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleForm.dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="updateUserRoleRelation()" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, changeUserStatus, delUser } from '@/api/manage/user'
import { getAllRoleList, getRoleIdsByUser, updateUserRoleRelation } from '@/api/manage/role'
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
        userName: null,
        status: null
      },
      statusOptions: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ],
      roleForm: {
        dialogVisible: false,
        roleOptions: [],
        userId: null,
        roleIds: [],
      }
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
    },
    editRole(id) {
      this.roleForm.dialogVisible = true;
      this.roleForm.userId = id;
      if (this.roleForm.roleOptions.length === 0) {
        this.getAllRoleList();
      }
      this.getRoleIdsByUser();
    },
    getAllRoleList() {
      getAllRoleList().then(res => {
        this.roleForm.roleOptions = res.data;
      }).catch(err => {})
    },
    getRoleIdsByUser() {
      getRoleIdsByUser({ id: this.roleForm.userId }).then(res => {
        this.roleForm.roleIds = res.data;
      }).catch(err => {})
    },
    updateUserRoleRelation() {
      updateUserRoleRelation(this.roleForm).then(res => {
        this.fetchData();
        this.$message({
          type: 'success',
          message: '角色修改成功'
        });
      }).catch(err => {})
      this.roleForm.dialogVisible = false;
    }
  }
}
</script>
<style lang="scss" scpoed>
  @import "@/styles/common";

  .el-dialog__header, .el-dialog__footer {
    padding: 10px 20px;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
</style>
