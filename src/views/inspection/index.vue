<template>
  <div class="app-container">
    <div>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="批次号" prop="batchNo">
          <el-input v-model="formSearch.batchNo" placeholder="请输入批次号" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-search"
            @click="search"
            size="mini"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="hospital"
      style="width: 100%"
      :header-cell-style="headClass"
      v-loading="viewLoading"
    >
      <el-table-column label="序号">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column label="表名">
        <template slot-scope="scope">{{ scope.row.table_name }}</template>
      </el-table-column>
      <el-table-column label="表中文名">
        <template slot-scope="scope">{{ scope.row.table_cn }}</template>
      </el-table-column>
      <el-table-column label="批次号">
        <template slot-scope="scope">{{ scope.row.batch_no }}</template>
      </el-table-column>
      <el-table-column label="总数量">
        <template slot-scope="scope">{{ scope.row.total }}</template>
      </el-table-column>
      <el-table-column label="正确数量">
        <template slot-scope="scope">{{ scope.row.success }}</template>
      </el-table-column>
      <el-table-column label="异常数据数">
        <template slot-scope="scope">
          <span v-if="scope.row.error>0" style="color:red;border-bottom: 1px solid red;cursor: pointer" @click="abnormal(scope.row)">{{ scope.row.error }}</span>
          <span v-else>0</span>
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
    <!-- 弹窗管理 -->
    <div>
      <el-dialog title="异常信息" width="80%" :visible.sync="dialogVisible">
        <el-table
          :data="abnormalList"
          style="width: 100%"
          :header-cell-style="headClass"
          v-loading="viewLoading"
        >
          <el-table-column label="序号">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
          <el-table-column label="表名">
            <template slot-scope="scope">{{ scope.row.table_name }}</template>
          </el-table-column>
          <el-table-column label="表中文名">
            <template slot-scope="scope">{{ scope.row.table_cn }}</template>
          </el-table-column>
          <el-table-column label="批次号">
            <template slot-scope="scope">{{ scope.row.batch_no }}</template>
          </el-table-column>
          <el-table-column label="原始数据">
            <template slot-scope="scope">详细</template>
          </el-table-column>
          <el-table-column label="摘要信息" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" class="el-icon-info" @click="abnormalDetails(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination
          :current-page="pageVo.pageNumber"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageVo.pageSize"
          :total="totalSize1"
          layout="total, sizes, prev, pager, next, jumper"
          style="margin-top: 20px"
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
        />
      </el-dialog>
      <!-- 摘要详情 -->
      <el-dialog title="摘要信息" width="50%" :visible.sync="showAbstract">
        <div class="errey" v-for="(item,index) in abstractList" :key="item.id">
          <div>序号：{{index+1}}</div>
          <div>错误描述：{{item.error}}</div>
          <!-- <div class="atDetails">
            <div class="atDetails_content">
              <div>
                <i class="el-icon-key"></i>
                <span>记录主键：</span>
              </div>
              <div>112312</div>
            </div>
            <div class="atDetails_content">
              <div>
                <i class="el-icon-key"></i>
                <span>记录主键值：</span>
              </div>
              <div>112312</div>
            </div>
            <div class="atDetails_content">
              <div>
                <i class="el-icon-s-flag"></i>
                <span>修改标识：</span>
              </div>
              <div>112312</div>
            </div>
          </div>
          
          <div class="atDetails">
            <div class="atDetails_content">
              <div>
                <i class="el-icon-document-delete"></i>
                <span>出错原因：</span>
              </div>
              <div>112312</div>
            </div>
            <div class="atDetails_content">
              <div>
                <i class="el-icon-document-checked"></i>
                <span>处理结果：</span>
              </div>
              <div>112312</div>
            </div>
          </div> -->
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validateReport,errorTable,validateErrors} from "@/api/validate";
export default {
  data() {
    return {
      dialogVisible: false,
      showAbstract:false,
      pageVo: { pageNumber: 1, pageSize: 10 },
      totalSize: 0,
      totalSize1:0,
      formSearch: {
        batchNo:''
      },
      roleShow: false,
      hospital: [],
      viewLoading: false,
      abnormalList:[],
      abstractList:[],
      different:{}
    };
  },
  created() {},
  mounted() {
    this.getHospital()
  },
  methods: {
    //异常详情
    abnormalDetails(i){
      let data = {
        tableName:i.table_name,
        batchNo:i.batch_no
      }
      validateErrors(data).then(res => {
          if (res.code==500) {
            this.$message.error(res.msg);
          }else{
            console.log(res); 
            this.abstractList = res.result
            this.showAbstract = true
          }
      });
    },
    //异常列表
    abnormal(i){
      if (i) {
        this.different = i
      }
      let data = {
        tableName:this.different.table_name,
        batchNo:this.different.batch_no
      }
      data.pageNumber = this.pageVo.pageNumber;
      data.pageSize = this.pageVo.pageSize;
      errorTable(data).then(res => {
          if (res.code==500) {
            this.$message.error(res.msg);
          }else{
            console.log(res); 
            this.abnormalList = res.result.pageList
            this.totalSize1 = res.result.pageTotals
            this.dialogVisible = true
          }
      });
    },
    //新增医院
    hospitaladd() {
      this.$router.push({ path: "/hospitaladd" });
    },
    //设置表头颜色
    headClass() {
      return "background:#eef1f6;font-weight: 500;color:#262728";
    },
    //查询医院列表
    getHospital() {
      this.formSearch.pageNumber = this.pageVo.pageNumber;
      this.formSearch.pageSize = this.pageVo.pageSize;
      validateReport(this.formSearch).then(res => {
          if (res.code==500) {
            this.$message.error(res.msg);
          }else{
            console.log(res); 
            this.hospital = res.result.pagelist
            this.totalSize = res.result.pagetotals
          }
      });
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

    //异常列表分页
    handleSizeChange1(val) {
      this.pageVo.pageSize = val;
      this.abnormal();
    },
    //异常列表分页
    handleCurrentChange1(val) {
      this.pageVo.currPage = val;
      this.abnormal();
    },
  },
};
</script>

<style lang="scss" scoped>
.errey{
  margin-bottom: 15px;
  display: flex;
  div:nth-child(1){
    flex: 0.3;
  }
  div:nth-child(2){
    flex: 1;
  }
}
.atDetails {
  display: flex;
  margin-bottom: 10px;
  
  .atDetails_content {
    display: flex;
    align-items: center;
    div:nth-child(1) {
      background-color: #EAF2F9;
      padding: 5px 10px;
      border-radius: 50px;
    }
    margin-left: 10px;
  }
}
</style>
