<template>
  <div class="app-container">
    <div>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="校验时间" prop="startTime">
          <el-date-picker
            v-model="formSearch.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
          />
        </el-form-item>
        <el-form-item label="—" prop="endTime">
          <el-date-picker
            v-model="formSearch.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间"
          />
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
      @selection-change="handleSelectionChange"
      style="width: 100%"
      :header-cell-style="headClass"
      v-loading="viewLoading"
    >
      <el-table-column label="序号">
        <template slot-scope="scope">{{ scope.row.orgname }}</template>
      </el-table-column>
      <el-table-column label="表名">
        <template slot-scope="scope">{{ scope.row.orgcode }}</template>
      </el-table-column>
      <el-table-column label="表中文名">
        <template slot-scope="scope">{{ scope.row.creater }}</template>
      </el-table-column>
      <el-table-column label="批次号">
        <template slot-scope="scope">{{ scope.row.create_time }}</template>
      </el-table-column>
      <el-table-column label="总数量">
        <template slot-scope="scope">{{ scope.row.expiry_time }}</template>
      </el-table-column>
      <el-table-column label="正确数量">
        <template slot-scope="scope">{{ scope.row.expiry_time }}</template>
      </el-table-column>
      <el-table-column label="异常数据数">
        <template slot-scope="scope">{{ scope.row.expiry_time }}</template>
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
    <!-- 弹窗管理 -->
    <div>
      <el-dialog title="异常信息" width="80%" :visible.sync="dialogVisible">
        <el-table
          :data="hospital"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          :header-cell-style="headClass"
          v-loading="viewLoading"
        >
          <el-table-column label="序号">
            <template slot-scope="scope">{{ scope.row.orgname }}</template>
          </el-table-column>
          <el-table-column label="表名">
            <template slot-scope="scope">{{ scope.row.orgcode }}</template>
          </el-table-column>
          <el-table-column label="表字段1">
            <template slot-scope="scope">{{ scope.row.creater }}</template>
          </el-table-column>
          <el-table-column label="上传成功标识">
            <template slot-scope="scope">{{ scope.row.create_time }}</template>
          </el-table-column>
          <el-table-column label="批次号">
            <template slot-scope="scope">{{ scope.row.expiry_time }}</template>
          </el-table-column>
          <el-table-column label="原始数据">
            <template slot-scope="scope">{{ scope.row.expiry_time }}</template>
          </el-table-column>
          <el-table-column label="摘要信息" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" class="el-icon-info">详情</el-button>
            </template>
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
      </el-dialog>
      <!-- 摘要详情 -->
      <el-dialog title="摘要信息" width="50%" :visible.sync="dialogVisible">
        <div style="  background-color: #f8f8f8;margin-bottom: 15px;">
          <div class="atDetails">
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
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
      pageVo: { currPage: 1, pageSize: 10 },
      totalSize: 0,
      formSearch: {
        startTime: "",
        endTime: "",
      },
      roleShow: false,
      hospital: [1],
      viewLoading: false,
    };
  },
  created() {},
  mounted() {
    //this.getHospital()
  },
  methods: {
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
      this.viewLoading = true;
      hospitalList(this.formSearch).then((res) => {
        this.viewLoading = false;
        if (res.code == 0) {
          this.hospital = res.result;
        } else {
          this.$message.error(res.msg);
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
    //获取批量数据
    handleSelectionChange(val) {
      console.log("val", val);
      this.checkList = val;
    },
  },
};
</script>

<style lang="scss" scoped>
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
