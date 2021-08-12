<template>
  <div class="containers">
    <!-- 左边 -->
    <div class="arts1">
      <div>
        <div style="padding: 20px">
          <span style="color: #21b295">|</span> 数据覆盖情况
        </div>
        <div class="content">
          <div>
            <div ref="coverChart" style="width: 300px; height: 300px" />
            <div class="cover">
              <div>
                {{
                  this.percentageCompute(
                    this.result.coverage.uploadCount,
                    this.result.coverage.projectCount
                  )
                }}
              </div>
              <div>覆盖率</div>
            </div>
          </div>
          <div>
            <div class="content_planning">
              <div>
                <div class="icon">
                  <i class="el-icon-s-operation" style="color: #39b99c" />
                </div>
              </div>
              <div>
                <div style="font-weight: 600">
                  {{ isEmpty(result.coverage.projectCount) }}
                </div>
                <div style="font-size: 13px; color: #bbbbbb">规划数</div>
              </div>
            </div>

            <div class="content_planning">
              <div>
                <div class="icon">
                  <i class="el-icon-upload2" style="color: #39b99c" />
                </div>
              </div>
              <div class="shangChuan">
                <div style="font-weight: 600">
                  {{ isEmpty(result.coverage.uploadCount) }}
                </div>
                <div style="font-size: 13px; color: #bbbbbb">上传数</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style="padding: 20px">
          <span style="color: #21b295">|</span> 数据上传情况
        </div>
        <div class="content">
          <div>
            <div ref="dataCheckChart1" style="width: 300px; height: 300px" />
            <div class="cover">
              <div>
                {{
                  this.percentageCompute(
                    this.result.upload.uploadSuccess,
                    this.result.upload.uploadCount
                  )
                }}
              </div>
              <div>上传成功率</div>
            </div>
          </div>
          <div>
            <div class="content_planning">
              <div>
                <div class="icon">
                  <i class="el-icon-coin" style="color: #39b99c" />
                </div>
              </div>
              <div>
                <div style="font-weight: 600">
                  {{ isEmpty(result.upload.uploadCount) }}
                </div>
                <div style="font-size: 13px; color: #bbbbbb">上传数量</div>
              </div>
            </div>

            <div class="content_planning">
              <div>
                <div class="icon">
                  <i class="el-icon-s-data" style="color: #39b99c" />
                </div>
              </div>
              <div class="shangChuan">
                <div style="font-weight: 600">
                  {{ isEmpty(result.upload.uploadSuccess) }}
                </div>
                <div style="font-size: 13px; color: #bbbbbb">上传成功数</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="arts2">
      <div>
        <div style="padding: 20px">
          <span style="color: #21b295">|</span> 数据质量校验情况
        </div>
        <div class="content">
          <div>
            <div ref="uploadChart" style="width: 300px; height: 300px" />
            <div class="cover">
              <div>
                {{
                  this.percentageCompute(
                    this.result.overview[0].success,
                    this.result.overview[0].total
                  )
                }}
              </div>
              <div>正确率</div>
            </div>
          </div>
          <div>
            <div class="content_planning">
              <div>
                <div class="icon">
                  <i class="el-icon-coin" style="color: #39b99c" />
                </div>
              </div>
              <div>
                <div style="font-weight: 600">
                  {{ isEmpty(result.overview[0].total) }}
                </div>
                <div style="font-size: 13px; color: #bbbbbb">总记录数</div>
              </div>
            </div>

            <div class="content_planning">
              <div>
                <div class="icon">
                  <i class="el-icon-document-checked" style="color: #39b99c" />
                </div>
              </div>
              <div class="shangChuan">
                <div style="font-weight: 600">
                  {{ isEmpty(result.overview[0].success) }}
                </div>
                <div style="font-size: 13px; color: #bbbbbb">正确记录数</div>
              </div>
            </div>

            <div class="content_planning">
              <div>
                <div class="icon">
                  <i class="el-icon-document-delete" style="color: #39b99c" />
                </div>
              </div>
              <div class="shangChuan">
                <div style="font-weight: 600">
                  {{ isEmpty(result.overview[0].error) }}
                </div>
                <div style="font-size: 13px; color: #bbbbbb">错误记录数</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div ref="datacheckbottom" style="width: 100%; height: 500px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.containers {
  padding: 10px;
  background-color: #e4edea;
  display: flex;
  justify-content: space-between;
  .cover {
    position: relative;
    left: 111px;
    top: -165px;
    text-align: center;
    width: 86px;
  }
  .arts1 {
    background-color: white;
    flex: 4;
  }
  .arts2 {
    background-color: white;
    flex: 6;
    margin-left: 10px;
  }
  .content {
    display: flex;
    align-items: center;
  }
  .icon {
    background-color: #bcebe1;
    width: 40px;
    height: 40px;
    border-radius: 7px;
    text-align: center;
    line-height: 40px;
  }
  .content_planning {
    padding: 30px;
    display: flex;
    text-align: center;
    div:nth-child(2) {
      padding-left: 10px;
    }
  }
}
</style>

<script>
import { getData } from "@/api/dashboard";
export default {
  name: "Dashboard",
  data() {
    return {
      result: {
        coverage: {
          projectCount: "0",
          uploadCount: "0",
        },
        overview: [
          {
            total: "0",
            success: "0",
            error: "0",
          },
        ],
        upload: {
          uploadCount: "0",
          uploadSuccess: "0",
        },
        tableDetails: [],
      },
      source: [],
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {
    this.getTable();
  },
  methods: {
    // 获取统计图
    getTable() {
      this.coverChart();
      this.uploadChart();
      this.dataCheckChart1();
      this.dataCheckBottom();
    },
    // 获取数据质量统计数据
    getTableData() {
      getData().then((res) => {
        this.result = res.result;
        this.getTable();
      });
    },
    // 数据覆盖情况环形图
    coverChart() {
      // 基于准备好的dom，初始化echarts实例
      const coverChart = this.$echarts.init(this.$refs.coverChart);
      // 绘制图表
      coverChart.setOption({
        tooltip: {
          show: false,
          trigger: "item",
          axisPointer: {
            label: {
              normal: {
                show: false,
              },
              emphasis: {},
            },
          },
        },
        legend: {
          show: false,
          selectorLabel: {
            show: false,
          },
        },
        series: [
          {
            name: "数据覆盖情况",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            legendHoverLink: false,
            left: "auto",
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.isEmpty(this.result.upload.uploadSuccess),
                name: "规划数",
                itemStyle: {
                  normal: { color: "rgb(188,235,225)" },
                  emphasis: { color: "rgb(188,235,225)" },
                },
              },
              {
                value: this.isEmpty(this.result.coverage.uploadCount),
                name: "上传数",
                itemStyle: {
                  normal: { color: "rgb(33,178,149)" },
                  emphasis: { color: "rgb(33,178,149)" },
                },
              },
            ],
            // color: ["rgb(188,235,225)", "rgb(33,178,149)"],
          },
        ],
      });
    },
    // 数据上传情况环形图
    uploadChart() {
      const uploadChart = this.$echarts.init(this.$refs.uploadChart);
      uploadChart.setOption({
        tooltip: {
          show: false,
          trigger: "item",
          axisPointer: {
            label: {
              normal: {
                show: false,
              },
              emphasis: {},
            },
          },
        },
        legend: {
          show: false,
          selectorLabel: {
            show: false,
          },
        },
        series: [
          {
            name: "数据上传情况",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            legendHoverLink: false,
            left: "auto",
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.isEmpty(this.result.upload.uploadCount),
                name: "上传数据量",
                itemStyle: {
                  normal: { color: "rgb(200,218,254)" },
                  emphasis: { color: "rgb(200,218,254)" },
                },
              },
              {
                value: this.isEmpty(this.result.upload.uploadSuccess),
                name: "上传成功数",
                itemStyle: {
                  normal: { color: "rgb(75,131,254)" },
                  emphasis: { color: "rgb(75,131,254)" },
                },
              },
            ],
          },
        ],
      });
    },
    // 数据质量校验情况环形图
    dataCheckChart1() {
      const dataCheckChart1 = this.$echarts.init(this.$refs.dataCheckChart1);
      dataCheckChart1.setOption({
        tooltip: {
          show: false,
          trigger: "item",
          axisPointer: {
            label: {
              normal: {
                show: false,
              },
              emphasis: {},
            },
          },
        },
        legend: {
          show: false,
          selectorLabel: {
            show: false,
          },
        },
        series: [
          {
            name: "数据检验情况1",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            legendHoverLink: false,
            left: "auto",
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.isEmpty(this.result.overview[0].total),
                name: "总记录数",
                itemStyle: {
                  normal: { color: "rgb(33,178,149)" },
                  emphasis: { color: "rgb(33,178,149)" },
                },
              },
              {
                value: this.isEmpty(this.result.overview[0].success),
                name: "正确记录数",
                itemStyle: {
                  normal: { color: "rgb(75,131,254)" },
                  emphasis: { color: "rgb(75,131,254)" },
                },
              },
            ],
          },
        ],
      });
    },
    // 数据质量校验情况柱状图
    dataCheckBottom() {
      this.dataFilter(this.result.tableDetails);
      const dataCheckBottom = this.$echarts.init(this.$refs.datacheckbottom);
      dataCheckBottom.setOption({
        legend: {
          show: false,
        },
        tooltip: {
          show: false,
        },
        dataset: {
          source: this.source,
        },
        xAxis: { type: "category" },
        yAxis: {
          min: "0",
          max: "45000",
          splitNumber: "9",
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: { color: "rgb(33,178,149)" },
              emphasis: { color: "rgb(33,178,149)" },
            },
          },
          {
            type: "bar",
            itemStyle: {
              normal: { color: "rgb(75,131,254)" },
              emphasis: { color: "rgb(75,131,254)" },
            },
          },
        ],
      });
    },
    // 数据质量校验情况柱状图数据过滤
    dataFilter(Arr) {
      let len = Arr.length;
      for (let i = 0; i < len; i++) {
        this.source.push([Arr[i].table_name, Arr[i].success, Arr[i].error]);
      }
      this.source.unshift(["check", "right", "wrong"]);
    },
    // 计算百分比
    percentageCompute(numerator, denominator) {
      let data = Math.round((numerator / denominator) * 100);

      if (data) {
        return data + "%";
      } else {
        return 0 + "%";
      }
    },
    // 判断数值是否为空
    isEmpty(data) {
      return data === "" ? 0 : data;
    },
  },
};
</script>
