<template>  
  <div class="pagination-container fr">    
    <el-pagination      
      :background="background"      
      :current-page.sync="currentPage"      
      :page-size.sync="pageSize"      
      layout="total, sizes, prev, pager, next, jumper"      
      :page-sizes="[10, 20, 30, 40]"      
      :total="total"      
      @size-change="handleSizeChange"      
      @current-change="handleCurrentChange"/>  
  </div>
</template>
<script>
export default {  
  name: 'Pagination',  
  props: {    
    total: {      
      default: 0,      
      type: Number    
    },    
    page: { 
      // 当前页      
      type: Number,      
      default: 1    
    },    
    limit: {      
      type: Number,      
      default: 10    
    },    
    pageSizes: { 
      // 每页显示条数      
      type: Number,      
      default: 10 
      // 默认10条    
    },    
    background: {      
      type: Boolean,      
      default: true    
    },  
  },  
  computed: {    
    currentPage: {      
      get() {        
        return this.page      
      },      
      set(val) {        
        this.$emit('update:page', val)      
      }    
    },    
    pageSize: {      
      get() {        
        return this.limit      
      },      
      set(val) {        
        this.$emit('update:limit', val)      
      }    
    }  
  },  
  methods: {    
    handleSizeChange(val) {      
       this.$emit('pagination', { page: this.currentPage, limit: val })    
    },    
    handleCurrentChange(val) {      
      this.$emit('pagination', { page: val, limit: this.pageSize })    
    }  
  }
}
</script>
<style scoped>
  .pagination-container {
    background-color: #ffffff;
    padding: 14px 20px;
    margin-top: 16px;
    font-size: 14px;
    font-family: PingFangSC, Microsoft YaHei;
    font-weight: 400;
    color: rgba(221, 118, 118, 0.65);
  }
</style>
