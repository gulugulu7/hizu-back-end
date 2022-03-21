<template>
  <div>
    <div class="main">
      <div class="chart1" id="myChart1" style="width: 11rem;height:5rem;"></div>
      <div class="chart2">
        <el-select
          v-model="cityvalue"
          placeholder="请选择"
          @change="changeCity"
          style="width:1.5rem;padding:0 0 0.2rem 0.5rem"
        >
          <el-option
            v-for="item in cityoptions"
            :key="item.city_number"
            :label="item.city_name+'市'"
            :value="item.city_number"
          ></el-option>
        </el-select>
        <div id="myChart2" style="width: 4rem;height:3rem;}"></div>
      </div>
      <div class="select_date">
        <el-date-picker
          v-model="date"
          :picker-options="pickerOptions"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="changeDate"
        ></el-date-picker>
        <div>
          {{today==date?'今日':date}}新增
          <span style="color:#438eb9;">{{houseAdd}}</span>条审核房源
        </div>
        <div>
          {{today==date?'今日':date}}新增
          <span style="color:#438eb9;">{{promotionAdd}}</span>条推广订单
        </div>
        <div>
          {{today==date?'今日':date}}新增
          <span style="color:#438eb9;">{{userAdd}}</span>名注册用户
        </div>
      </div>
      <div class="pending">
        <h3>待处理信息</h3>
        <router-link :to="{name:'Housemgt'}">
          还有
          <span style="color:#438eb9;"> {{pendingHouse}} </span>条房源审核待处理
        </router-link>
        <router-link :to="{name:'Promotionmgt'}">
          还有
          <span style="color:#438eb9;"> {{pendingPromotion}} </span>条推广申请退款待处理
        </router-link>
        <router-link :to="{name:'Reportmgt'}">
          还有
          <span style="color:#438eb9;"> {{pendingReport}} </span>条房源举报待处理
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      date: this.$moment().format("YYYY-MM-DD"),
      today: this.$moment().format("YYYY-MM-DD"),
      cityvalue: "beijing",
      cityoptions: [],
      userAdd: new Number(),
      houseAdd: new Number(),
      promotionAdd: new Number(),
      pendingHouse: new Number(),
      pendingPromotion: new Number(),
      pendingReport: new Number()
    };
  },
  methods: {
    getCity() {
      this.$http
        .get("api/citys/getCity")
        .then(response => {
          this.cityoptions = response.data.cityList;
        })
        .catch(error => {
          console.log(error);
        });
      this.cityvalue = this.cityvalue;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      this.$http.get("api/houses/cityHouseNumber").then(response => {
        // 指定图表的配置项和数据
        var option = {
          legend: {},
          tooltip: {},
          dataset: {
            // 提供一份数据。
            source: [
              ["product", "显示中", "审核中", "审核不通过", "已删除"],
              response.data.bjnumberlist,
              response.data.shnumberlist,
              response.data.gznumberlist,
              response.data.sznumberlist,
              response.data.hznumberlist,
              response.data.njnumberlist,
              response.data.whnumberlist,
              response.data.cdnumberlist,
              response.data.tjnumberlist
            ]
          },
          // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
          xAxis: { type: "category" },
          // 声明一个 Y 轴，数值轴。
          yAxis: {},
          // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
          series: [
            { type: "bar" },
            { type: "bar" },
            { type: "bar" },
            { type: "bar" }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
      });
    },
    changeCity(value) {
      this.districtCount();
    },
    districtCount() {
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      this.$http
        .get("api/houses/districtHouseNumber", {
          params: {
            city: this.cityvalue
          }
        })
        .then(response => {
          myChart2.setOption({
            title: {
              text: "行政区显示中房源数量",
              left: "center",
              top: "bottom"
            },
            tooltip: {
              trigger: "item"
            },
            series: [
              {
                type: "pie", // 设置图表类型为饼图
                radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                data: response.data.districtHouseNumber
              }
            ]
          });
        });
    },
    selectDate() {
      this.$http
        .get("api/houses/selectDate", {
          params: {
            date: this.date
          }
        })
        .then(response => {
          this.userAdd = new Number()
          this.houseAdd = new Number()
          this.promotionAdd = new Number()
          var array = response.data.docs;
          for (var i = 0; i < array.length; i++) {
            if (array[i].classification == "userAdd") {
              this.userAdd = array[i].number;
            } else if (array[i].classification == "houseAdd") {
              this.houseAdd = array[i].number;
            } else if (array[i].classification == "promotionAdd") {
              this.promotionAdd = array[i].number;
            }
          }
        });
    },
    changeDate() {
      this.selectDate();
    },
    pendingNumber(){
      this.$http.get('api/houses/pendingNumber').then(response=>{
        this.pendingHouse=response.data.pendingHouse
        this.pendingPromotion=response.data.pendingPromotion
        this.pendingReport=response.data.pendingReport
      })
    }
  },
  mounted() {
    this.getCity();
    this.drawLine();
    this.districtCount();
    this.selectDate();
    this.pendingNumber()
  }
};
</script>

<style scoped>
.main {
  width: 100%;
}

.select_date > .el-input {
  width: 2rem;
}
.select_date > div {
  padding: 0.1rem 0;
}
.pending {
  display: inline-block;
  vertical-align: top;
    padding:1rem 0.7rem;
}
.pending > a {
  display: block;
  color: black;
  text-decoration: none;
  margin: 0.2rem 0;
}
.pending > a:hover {
  text-decoration: underline;
}
</style>

<style>
.chart2 {
  display: inline-block;
  padding-bottom: 0.8rem;
}
.select_date {
  display: inline-block;
  vertical-align: top;
  padding:0.8rem 0.6rem;
}
</style>
