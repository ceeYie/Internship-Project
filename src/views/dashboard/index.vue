<template>
  <div class="container">
    <!-- 左边 -->
    <div class="left">
      <!-- 数据覆盖情况 -->
      <div class="datacover">
        <div class="title">
          <span class="line" />
          数据覆盖情况
        </div>
        <div class="main clearfix">
          <div class="chart">
            <div class="chart-label">
              <div class="coverage-num">
                {{ this.percentageCompute(this.coverage.uploadCount, this.coverage.projectCount, this.coveragePecentage) }}
              </div>
              <div class="coverage">覆盖率</div>
            </div>
            <div ref="coverChart" class="coverChart" />
          </div>

          <div class="sidebar">
            <div class="spaner">
              <div class="icon" style="background-color: rgb(188, 235, 225)">
                <i
                  class="el-icon-s-operation"
                  style="color: rgb(33, 178, 149)"
                />
              </div>
              <div class="data">
                <div class="number">{{ coverage.projectCount }}</div>
                <div class="label">规划数</div>
              </div>
            </div>
            <div class="spaner">
              <div class="icon" style="background-color: rgb(33, 178, 149)">
                <i class="el-icon-upload2" style="color: #fff" />
              </div>
              <div class="data">
                <div class="number">{{ coverage.uploadCount }}</div>
                <div class="label">上传数</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 数据上传情况 -->
      <div class="dataupload">
        <div class="title">
          <span class="line" />
          数据上传情况
        </div>
        <div class="main clearfix">
          <div class="chart">
            <div class="chart-label">
              <div class="coverage-num">
                {{this.percentageCompute(this.upload.uploadSuccess, this.upload.uploadCount, this.uploadPecentage)}}
              </div>
              <div class="coverage">上传成功率</div>
            </div>
            <div ref="uploadChart" class="uploadChart" />
          </div>

          <div class="sidebar">
            <div class="spaner">
              <div class="icon" style="background-color: rgb(200, 218, 254)">
                <i class="el-icon-coin" style="color: rgb(75, 131, 254)" />
              </div>
              <div class="data">
                <div class="number">{{ upload.uploadCount }}</div>
                <div class="label">上传数据量</div>
              </div>
            </div>
            <div class="spaner">
              <div class="icon" style="background-color: rgb(75, 131, 254)">
                <i class="el-icon-s-data" style="color: #fff" />
              </div>
              <div class="data">
                <div class="number">{{ upload.uploadSuccess }}</div>
                <div class="label">上传成功数</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right">
      <!-- 右边环形图 -->
      <div class="datacheck-top">
        <div class="title">
          <span class="line" />
          数据质量校验情况
        </div>
        <div class="main clearfix">
          <div class="chart">
            <div class="chart-label">
              <div class="coverage-num">
                {{this.percentageCompute(this.overview[0].success, this.overview[0].total, this.overviewPecentage)}}
              </div>
              <div class="coverage">正确率</div>
            </div>
            <div ref="dataCheckChart1" class="dataCheckChart1" />
          </div>

          <div class="sidebar">
            <div class="spaner">
              <div class="icon" style="background-color: rgb(188, 235, 225)">
                <i
                  class="el-icon-edit-outline"
                  style="color: rgb(33, 178, 149)"
                />
              </div>
              <div class="data">
                <div class="number">{{ overview[0].total }}</div>
                <div class="label">总记录数</div>
              </div>
            </div>
            <div class="spaner">
              <div class="icon" style="background-color: rgb(33, 178, 149)">
                <i class="el-icon-document-checked" style="color: #fff" />
              </div>
              <div class="data">
                <div class="number">{{ overview[0].success }}</div>
                <div class="label">正确记录数</div>
              </div>
            </div>
            <div class="spaner">
              <div class="icon" style="background-color: rgb(75, 131, 254)">
                <i class="el-icon-document-delete" style="color: #fff" />
              </div>
              <div class="data">
                <div class="number">{{ overview[0].error }}</div>
                <div class="label">错误记录数</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边柱状图 -->
      <div ref="datacheckbottom" class="datacheck-bottom" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
.title {
  font-size: 18px;
  margin-top: 15px;
  margin-left: 15px;
  .line {
    display: inline-block;
    border: 2px solid rgb(33, 178, 149);
    margin-right: 10px;
    height: 20px;
    border-radius: 20%;
    margin-bottom: -2.5px;
  }
}
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  height: 400px;
  float: right;
  margin-right: 16%;
  .spaner {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .icon {
      background-color: rgb(188, 235, 225);
      color: rgb(33, 178, 149);
      border-radius: 20%;
      width: 50px;
      height: 50px;
      float: left;
      font-size: 45px;
      text-align: center;
      line-height: 50px;
    }
    .data {
      display: flex;
      flex-direction: column;
      width: 80px;
      float: right;
      text-align: center;
      .number {
        font-weight: bold;
        color: #333333;
        font-size: 28px;
        text-align: center;
      }
      .label {
        font-size: 14px;
        color: #696969;
      }
    }
  }
}
.container {
  background-color: #e4edea;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: -23.5px -5px;
  .left {
    float: left;
    width: 550px;
    height: 900px;
    display: flex;
    flex-direction: column;
    .datacover {
      margin-top: 25px;
      margin-bottom: 25px;
      width: 650px;
      height: 400px;
      background-color: #fff;
      .chart {
        float: left;
        width: 380px;
        height: 380px;
        position: relative;
        .chart-label {
          position: absolute;
          width: 100px;
          height: 100px;
          margin-top: -50px;
          margin-left: -50px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          top: 50%;
          left: 50%;
          .coverage-num {
            font-size: 40px;
            font-weight: bold;
            color: rgb(33, 178, 149);
            text-align: center;
            line-height: 40px;
          }
          .coverage {
            line-height: 20px;
            text-align: center;
            color: #696969;
          }
        }
        .coverChart {
          width: 380px;
          height: 380px;
        }
      }
    }
    .dataupload {
      width: 650px;
      height: 400px;
      background-color: #fff;
      .chart {
        float: left;
        width: 380px;
        height: 380px;
        position: relative;
        .chart-label {
          position: absolute;
          width: 100px;
          height: 100px;
          margin-top: -50px;
          margin-left: -50px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          top: 50%;
          left: 50%;
          .coverage-num {
            font-size: 40px;
            font-weight: bold;
            color: rgb(75, 131, 254);
            text-align: center;
            line-height: 40px;
          }
          .coverage {
            line-height: 20px;
            text-align: center;
            color: #696969;
          }
        }
        .uploadChart {
          width: 380px;
          height: 380px;
        }
      }
    }
  }
  .right {
    // float: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    height: 825px;
    margin-top: 25px;
    width: 900px;
    .datacheck-top {
      width: 900px;
      height: 400px;
      .sidebar {
        margin-right: 30%;
      }
      .chart {
        float: left;
        width: 380px;
        height: 380px;
        position: relative;
        .chart-label {
          position: absolute;
          width: 100px;
          height: 100px;
          margin-top: -50px;
          margin-left: -50px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          top: 50%;
          left: 50%;
          .coverage-num {
            font-size: 40px;
            font-weight: bold;
            color: rgb(33, 178, 149);
            text-align: center;
            line-height: 40px;
          }
          .coverage {
            line-height: 20px;
            text-align: center;
            color: #696969;
          }
        }
        .dataCheckChart1 {
          width: 380px;
          height: 380px;
        }
      }
    }
    .datacheck-bottom {
      width: 900px;
      height: 400px;
      margin-top: -60px;
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
      coverage: {
        projectCount: "",
        uploadCount: "",
      },
      overview: [
        {
          total: "",
          success: "",
          error: "",
        },
      ],
      upload: {
        uploadCount: "",
        uploadSuccess: "",
      },
      tableDetails: [],
      source: [],
      status: "",
      coveragePecentage:'',
      uploadPecentage:'',
      overviewPecentage:''
    };
  },
  created() {
    getData().then((res) => {
      this.coverage = res.result.coverage;
      this.overview = res.result.overview;
      this.upload = res.result.upload;
      this.tableDetails = res.result.tableDetails;
      this.status = res.status;
      this.coverChart();
      this.uploadChart();
      this.dataCheckChart1();
      this.dataCheckBottom();
    });
  },
  mounted() {},
  methods: {
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
                value: this.coverage.projectCount,
                name: "规划数",
                itemStyle: {
                  normal: { color: "rgb(188,235,225)" },
                  emphasis: { color: "rgb(188,235,225)" },
                },
              },
              {
                value: this.coverage.uploadCount,
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
                value: this.upload.uploadCount,
                name: "上传数据量",
                itemStyle: {
                  normal: { color: "rgb(200,218,254)" },
                  emphasis: { color: "rgb(200,218,254)" },
                },
              },
              {
                value: this.upload.uploadSuccess,
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
                value: this.overview[0].total,
                name: "总记录数",
                itemStyle: {
                  normal: { color: "rgb(33,178,149)" },
                  emphasis: { color: "rgb(33,178,149)" },
                },
              },
              {
                value: this.overview[0].success,
                name: "正确记录数",
                itemStyle: {
                  normal: { color: "rgb(75,131,254)" },
                  emphasis: { color: "rgb(75,131,254)" },
                },
              },
              {
                value: this.overview.error,
                name: "错误记录数",
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
      this.dataFilter(this.tableDetails);
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
    percentageCompute(numerator, denominator, outcome){
      let data = Math.round(numerator / denominator * 100)
      if(data){
        outcome = data + '%'
      } else {
        outcome = 0 + '%'
      }
      return outcome
    } 
  },
};
</script>
