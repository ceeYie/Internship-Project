<template>
  <div class="containers">
    <!-- 左边 -->
    <div class="arts1">
      <!-- 数据覆盖情况 -->
      <!-- 标题 -->
      <div style="padding: 20px">
        <span style="color: #21b295">|</span> 数据覆盖情况
      </div>
      <!-- 统计图 -->
      <div class="content">
        <!-- 左边图片部分 -->
        <div style="position: relative">
          <!-- 环形图 -->
          <div ref="coverChart" style="width: 300px; height: 300px" />
          <!-- 覆盖率 -->
          <div class="cover">
            <div class="number" style="color: rgb(33, 178, 149)">
              {{
                this.percentageCompute(
                  this.result.coverage.uploadCount,
                  this.result.coverage.projectCount
                )
              }}
            </div>
            <div class="text">覆盖率</div>
          </div>
        </div>
        <!-- 右边栏 -->
        <div>
          <div class="content_planning">
            <div>
              <div class="icon" style="background-color: rgb(188, 235, 225)">
                <i
                  class="el-icon-s-operation"
                  style="color: rgb(33, 178, 149)"
                />
              </div>
            </div>
            <div class="sidebar">
              <div class="sidenum">
                {{ isEmpty(result.coverage.projectCount) }}
              </div>
              <div class="sidetext">规划数</div>
            </div>
          </div>

          <div class="content_planning">
            <div>
              <div class="icon" style="background-color: rgb(33, 178, 149)">
                <i class="el-icon-upload2" style="color: #fff" />
              </div>
            </div>
            <div class="sidebar">
              <div class="sidenum">
                {{ isEmpty(result.coverage.uploadCount) }}
              </div>
              <div class="sidetext">上传数</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据上传情况 -->
      <!-- 标题 -->
      <div style="padding: 20px">
        <span style="color: #21b295">|</span> 数据上传情况
      </div>
      <!-- 统计图 -->
      <div class="content">
        <!-- 左边图片部分 -->
        <div style="position: relative">
          <div ref="uploadChart" style="width: 300px; height: 300px" />
          <div class="cover">
            <div class="number" style="color: rgb(75, 131, 254)">
              {{
                this.percentageCompute(
                  this.result.upload.uploadSuccess,
                  this.result.upload.uploadCount
                )
              }}
            </div>
            <div class="text">上传成功率</div>
          </div>
        </div>
        <!-- 右边栏 -->
        <div>
          <div class="content_planning">
            <div>
              <div class="icon" style="background-color: rgb(200, 218, 254)">
                <i class="el-icon-coin" style="color: rgb(75, 131, 254)" />
              </div>
            </div>
            <div class="sidebar">
              <div class="sidenum">
                {{ isEmpty(result.upload.uploadCount) }}
              </div>
              <div class="sidetext">上传数量</div>
            </div>
          </div>

          <div class="content_planning">
            <div>
              <div class="icon" style="background-color: rgb(75, 131, 254)">
                <i class="el-icon-s-data" style="color: #fff" />
              </div>
            </div>
            <div class="sidebar">
              <div class="sidenum">
                {{ isEmpty(result.upload.uploadSuccess) }}
              </div>
              <div class="sidetext">上传成功数</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右边 -->
    <div class="arts2">
      <!-- 环形图部分 -->
      <div>
        <!-- 标题 -->
        <div style="padding: 20px">
          <span style="color: #21b295">|</span> 数据质量校验情况
        </div>
        <!-- 统计图部分 -->
        <div class="content">
          <div style="position: relative">
            <!-- 统计图 -->
            <div ref="dataCheckChart1" style="width: 300px; height: 300px" />
            <!-- 正确率 -->
            <div class="cover">
              <div class="number" style="color: rgb(33, 178, 149)">
                {{
                  this.percentageCompute(
                    this.result.overview[0].success,
                    this.result.overview[0].total
                  )
                }}
              </div>
              <div class="text">正确率</div>
            </div>
          </div>
          <div>
            <div class="content_planning">
              <div>
                <div class="icon" style="background-color: rgb(188, 235, 225)">
                  <i class="el-icon-coin" style="color: rgb(33, 178, 149)" />
                </div>
              </div>
              <div class="sidebar">
                <div class="sidenum">
                  {{ isEmpty(result.overview[0].total) }}
                </div>
                <div class="sidetext">总记录数</div>
              </div>
            </div>

            <div class="content_planning">
              <div>
                <div class="icon" style="background-color: rgb(33, 178, 149)">
                  <i class="el-icon-document-checked" style="color: #fff" />
                </div>
              </div>
              <div class="sidebar">
                <div class="sidenum">
                  {{ isEmpty(result.overview[0].success) }}
                </div>
                <div class="sidetext">正确记录数</div>
              </div>
            </div>

            <div class="content_planning">
              <div>
                <div class="icon" style="background-color: rgb(75, 131, 254)">
                  <i class="el-icon-document-delete" style="color: #fff" />
                </div>
              </div>
              <div class="sidebar">
                <div class="sidenum">
                  {{ isEmpty(result.overview[0].error) }}
                </div>
                <div class="sidetext">错误记录数</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 柱状图部分 -->
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
    position: absolute;
    text-align: center;
    width: 100px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .number {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      line-height: 40px;
    }
    .text {
      font-size: 14px;
      color: #808080;
    }
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
    font-size: 30px;
    border-radius: 7px;
    text-align: center;
    line-height: 40px;
  }
  .content_planning {
    padding: 30px;
    display: flex;
    text-align: center;
    .sidebar {
      margin-left: 20px;
      .sidenum {
        font-size: 20px;
        font-weight: 600;
        text-align: left;
        text-indent: 10px;
        margin-bottom: 5px;
      }
      .sidetext {
        font-size: 13px;
        color: #808080;
      }
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
          show: true,
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
            hoverAnimation: true,
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
                value: this.isEmpty(this.result.coverage.projectCount - this.result.coverage.uploadCount),
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
          show: true,
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
            show: true,
          },
        },
        series: [
          {
            name: "数据上传情况",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: true,
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
                value: this.isEmpty(this.result.upload.uploadCount - this.result.upload.uploadSuccess),
                name: "上传失败数",
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
          show: true,
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
            show: true,
          },
        },
        series: [
          {
            name: "数据检验情况1",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            hoverAnimation: true,
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
                value: this.isEmpty(this.result.overview[0].error),
                name: "错误记录数",
                itemStyle: {
                  normal: { color: "rgb(75,131,254)" },
                  emphasis: { color: "rgb(75,131,254)" },
                },
              },
              {
                value: this.isEmpty(this.result.overview[0].success),
                name: "正确记录数",
                itemStyle: {
                  normal: { color: "rgb(33,178,149)" },
                  emphasis: { color: "rgb(33,178,149)" },
                },
              },
            ],
          },
        ],
      });
    },
    // 数据质量校验情况柱状图
    dataCheckBottom() {
      const dataCheckBottom = this.$echarts.init(this.$refs.datacheckbottom);
      dataCheckBottom.setOption({
        legend: {
          show: false,
        },
        tooltip: {
          show: true,
        },
        dataset: {
          source: this.dataFilter(this.result.tableDetails),
        },
        xAxis: { 
          type: "category",
          axisLabel:{
            interval:0,
            rotate:-30
          }
          },
        yAxis: {
          min: "0",
          max: "dataMax",
          splitNumber: "9",
        },
        series: [
          {
            name:'成功',
            type: "bar",
            itemStyle: {
              normal: { color: "rgb(33,178,149)" },
              emphasis: { color: "rgb(33,178,149)" },
            },
          },
          {
            name:'失败',
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
      const source = [];
      for (let i = 0; i < len; i++) {
        // 把数据转换成number类型，不然会识别第一行为dimension!!
        source.push([
          Arr[i].table_name,
          parseInt(Arr[i].success),
          parseInt(Arr[i].error),
        ]);
      }
      console.log(source);
      return source;
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
