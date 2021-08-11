<template>
  <div class="app-container">
    <div>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="上传时间" prop="beginTime">
          <el-date-picker
            v-model="formSearch.beginTime"
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
      style="width: 100%"
      :header-cell-style="headClass"
      v-loading="viewLoading"
    >
      <el-table-column label="序号">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column label="批次号">
        <template slot-scope="scope">{{ scope.row.etlOdsBatchNo }}</template>
      </el-table-column>
      <el-table-column label="入参">
        <template slot-scope="scope">{{ scope.row.params }}</template>
      </el-table-column>
      <el-table-column label="抽取条数">
        <template slot-scope="scope">{{ scope.row.dataNum }}</template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
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
  </div>
</template>

<script>
import { extracts,} from "@/api/log";
export default {
  data() {
    return {
      pageVo: { pageNumber: 1, pageSize: 10 },
      totalSize: 0,
      formSearch: {
        beginTime: "",
        endTime: "",
      },
      roleShow: false,
      hospital: [1],
      viewLoading: false,
    };
  },
  created() {},
  mounted() {
    this.logList()
  },
  methods: {
    //设置表头颜色
    headClass() {
      return "background:#eef1f6;font-weight: 500;color:#262728";
    },
    //查询日志列表
    logList() {
      this.formSearch.pageNumber = this.pageVo.pageNumber;
      this.formSearch.pageSize = this.pageVo.pageSize;
      this.viewLoading = true
      extracts(this.formSearch).then(res => {
          if (res.code==500) {
            this.$message.error(res.msg);
            this.viewLoading = false
          }else{
            console.log(res); 
            this.hospital = res.result.content
            this.totalSize = Number(res.result.total)
            this.viewLoading = false
          }
      });
    },
    //搜索
    search() {
      this.logList();
    },
    //分页
    handleSizeChange(val) {
      this.pageVo.pageSize = val;
      this.logList();
    },
    //分页
    handleCurrentChange(val) {
      this.pageVo.currPage = val;
      this.logList();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
