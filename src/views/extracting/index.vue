<template>
  <div class="app-container">
    <div>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="上传时间" prop="startTime">
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
      <el-table-column label="时间">
        <template slot-scope="scope">{{ scope.row.orgcode }}</template>
      </el-table-column>
      <el-table-column label="批次号">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
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

</style>
