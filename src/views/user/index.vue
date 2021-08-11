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
          <el-input v-model="formSearch.keyWord" placeholder="请输入用户名" clearable/>
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
      <el-table-column label="用户名">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="医生编码">
        <template slot-scope="scope">{{ scope.row.userCode }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1">启用</span>
          <span v-if="scope.row.status==0">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="180" align="center">
          <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.showStatus"
                  active-text="启用"
                  inactive-text="禁用"
                  @change="whether(scope.row)">
              </el-switch>
          </template>
        </el-table-column>
      <el-table-column label="操作" width="290" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="pawRow(scope.row)">修改密码</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-pagination
      :current-page="pageVo.pageNumber"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageVo.pageSize"
      :total="totalSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
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

    <el-dialog title="修改密码" width="30%" :visible.sync="upPw">
        <el-form ref="pdUp" v-loading="addLoading" :rules="rules" :model="pdUp"  label-width="100px">
        <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="pdUp.oldPwd" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pdUp.newPwd" />
        </el-form-item>
        <template>
          <span class="dialog-footer">
            <el-button @click="upPw = false"  size="mini">取 消</el-button>
            <el-button type="primary" @click="pwSubmit()"  size="mini">确 定</el-button>
          </span>
        </template>
      </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { userList,userSave,updatePwd ,userDelete,updateStatus} from "@/api/user";
export default {
  data() {
    return {
      pdUp:{
        userName:'',
        oldPwd:'',
        newPwd:''
      },
      upPw:false,
        addLoading:false,
        rules:{
          userName: [
            { required: true, message: "帐号不能为空", trigger: "blur" }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" }
          ],
          oldPwd: [
            { required: true, message: "密码不能为空", trigger: "blur" }
          ],
          newPwd: [
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
      },
      hospital: [],
      viewLoading: false,
      addUser:false
    };
  },
  created() {},
  mounted() {
    this.getUser()
  },
  methods: {
    //启用禁用
    whether(i){
      console.log(i)
      let data ={
        userName:i.userName,
        status:i.showStatus==true?1:0
      }
      updateStatus(data).then(res => {
        if (res.code==500) {
          this.$message.error(res.msg);
        }else{
          this.getUser()
        }
      })
    },
    //删除用户
    del(i){
      console.log(i)
      let data = {
        userName:i.userName
      }
      console.log(data)
       this.$confirm('删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userDelete(data).then(res => {
            if (res.code==500) {
              this.$message.error(res.msg);
            }else{
              this.getUser()
              this.$message.success("删除成功");
            }
          })
        }).catch(() => {});
    },
    pawRow(i){
      this.pdUp.oldPwd = ''
      this.pdUp.newPwd = ''
      this.pdUp.userName = i.userName
      this.upPw = true
    },
    //修改密码
    pwSubmit(){
      this.$refs["pdUp"].validate(valid => {
        if (valid) {
          updatePwd(this.pdUp).then(res => {
            if (res.code==500) {
              this.$message.error(res.msg);
            }else{
              this.upPw = false
              this.$message.success("修改成功");
            }
          });
        }
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
      this.formSearch.pageNumber = this.pageVo.pageNumber;
      this.formSearch.pageSize = this.pageVo.pageSize;
      this.viewLoading = true
      userList(this.formSearch).then(res => {
          if (res.code==500) {
            this.$message.error(res.msg);
            this.viewLoading = false
          }else{
            console.log(res); 
            res.result.content.forEach(element => {
              if (element.status==1) {
                element.showStatus = true
              }else{
                element.showStatus = false
              }
            });
            this.hospital = res.result.content
            this.totalSize = Number(res.result.total)
            this.viewLoading = false
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
