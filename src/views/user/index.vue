<template>
  <div class="app-container">
    <div>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formSearch.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-search"
            @click="search"
            size="mini"
            >搜索</el-button>
            <el-button
            class="filter-item"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-plus"
            @click="addUser=true"
            size="mini"
            >新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="hospital"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      :header-cell-style="headClass"
      v-loading="viewLoading"
    >
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.orgname }}</template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">{{ scope.row.orgcode }}</template>
      </el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">{{ scope.row.creater }}</template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">{{ scope.row.creater }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="pageVo.currPage"
    >
    </el-pagination>
    <div>
    <el-dialog title="新增用户" width="40%" :visible.sync="addUser">
        <el-form ref="addForm" v-loading="addLoading" :rules="rules" :model="addForm"  label-width="100px">
        <el-form-item label="登录账号" prop="loginAccount">
            <el-input v-model="addForm.loginAccount" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="addForm.phone" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
            <el-input v-model="addForm.nickName" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <template>
                <el-radio v-model="addForm.sex" label="1">男</el-radio>
                <el-radio v-model="addForm.sex" label="0">女</el-radio>
            </template>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" />
        </el-form-item>
      </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        addLoading:false,
        rules:{},
      addForm:{},
      pageVo: { currPage: 1, pageSize: 10 },
      totalSize: 0,
      formSearch: {
        name: "",
      },
      hospital: [1],
      viewLoading: false,
      addUser:false
    };
  },
  created() {},
  mounted() {
 
  },
  methods: {
    //设置表头颜色
    headClass() {
      return "background:#eef1f6;font-weight: 500;color:#262728";
    },
    //搜索
    search() {
      this.getHospital();
    },
    //分页
    handleSizeChange(val) {
      this.pageVo.pageSize = val;
      this.getHospital();
    },
    //分页
    handleCurrentChange(val) {
      this.pageVo.currPage = val;
      this.getHospital();
    },
    //获取批量数据
    handleSelectionChange(val) {
      console.log("val", val);
      this.checkList = val;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
