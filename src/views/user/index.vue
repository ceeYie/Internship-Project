<template>
  <div class="app-container">
    <div>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="用户名" prop="keyWord">
          <el-input v-model="formSearch.keyWord" placeholder="请输入用户名" />
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
      :total="pageVo.pageNumber"
    >
    </el-pagination>
    <div>
    <el-dialog title="新增用户" width="30%" :visible.sync="addUser">
        <el-form ref="addForm" v-loading="addLoading" :rules="rules" :model="addForm"  label-width="100px">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="addForm.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" />
        </el-form-item>
        <el-form-item label="医生编码" prop="userCode">
            <el-input v-model="addForm.userCode" />
        </el-form-item>
        <!-- <el-form-item label="启用/禁用" prop="status">
            <template>
                <el-radio v-model="addForm.status" label="1">启用</el-radio>
                <el-radio v-model="addForm.status" label="0">禁用</el-radio>
            </template>
        </el-form-item> -->
        <template>
          <span class="dialog-footer">
            <el-button @click="addUser = false"  size="mini">取 消</el-button>
            <el-button type="primary" @click="addSubmit()"  size="mini">确 定</el-button>
          </span>
        </template>
      </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { userList,userSave,statistic } from "@/api/user";
export default {
  data() {
    return {
        addLoading:false,
        rules:{
          userName: [
            { required: true, message: "帐号不能为空", trigger: "blur" }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" }
          ],
        },
      addForm:{
        userType:'1',
        userName:'',
        password:'',
        userCode:'',
        // status:''
      },
      pageVo: { pageNumber: 1, pageSize: 10 },
      totalSize: 0,
      formSearch: {
        keyWord: "",
        pageNumber: 1,
         pageSize: 10
      },
      hospital: [1],
      viewLoading: false,
      addUser:false
    };
  },
  created() {},
  mounted() {
    this.getUser()
    this.z()
  },
  methods: {
    z(){
      statistic({}).then(res => {
          
            console.log(res);
 
        });
    },
    //设置表头颜色
    headClass() {
      return "background:#eef1f6;font-weight: 500;color:#262728";
    },
    //搜索
    search() {
      this.getUser();
    },
    //分页
    handleSizeChange(val) {
      this.pageVo.pageSize = val;
      this.getUser();
    },
    //分页
    handleCurrentChange(val) {
      this.pageVo.pageNumber = val;
      this.getUser();
    },
    //用户列表
    getUser(){

      userList(this.formSearch).then(res => {
          if (res.code==500) {
            this.$message.error(res.msg);
          }else{
            console.log(res);
          }
        });
    },
    //新增用户
    addSubmit(){
      userSave(this.addForm).then(res => {
        console.log('新增数据',res)
        if (res.code==500) {
          this.$message.error(res.msg);
        }else{
          this.$message.error('新增成功');
          this.addUser = false
          this.getUser()
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer{
  display: flex;
  justify-content: flex-end;
}
</style>
