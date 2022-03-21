<template>
  <div>
    <div class="houses_creen">
      <div class="width">
        <el-select v-model="cityvalue" placeholder="城市" @change="changeCity">
          <el-option
            v-for="item in cityoptions"
            :key="item.city_number"
            :label="item.city_name+'市'"
            :value="item.city_number"
          ></el-option>
        </el-select>
      </div>
      <div class="width">
        <el-select v-model="aindex" placeholder="行政区" @change="changeGet">
          <el-option
            v-for="item in districtoptions"
            :key="item.district_number"
            :label="item.district_name+'区'"
            :value="item.district_number"
          ></el-option>
        </el-select>
      </div> 
      <div class="width">
        <el-select v-model="bindex" placeholder="出租方式" @change="changeGet">
          <el-option label="整租" value='整租'></el-option>
          <el-option label="合租" value='合租'></el-option>
        </el-select>
      </div>
       <div class="width">
        <el-select v-model="cindex" placeholder="房源类型" @change="changeGet">
          <el-option label="小区" value='小区'></el-option>
          <el-option label="公寓" value='公寓'></el-option>
          <el-option label="别墅" value='别墅'></el-option>
        </el-select>
      </div>
      <div class="width">
        <el-select v-model="dindex" placeholder="房屋朝向" @change="changeGet">
          <el-option label="朝东" value='朝东'></el-option>
          <el-option label="朝南" value='朝南'></el-option>
          <el-option label="朝西" value='朝西'></el-option>
          <el-option label="朝北" value='朝北'></el-option>
          <el-option label="朝东" value='朝东'></el-option>
          <el-option label="南北" value='南北'></el-option>
          <el-option label="东南" value='东南'></el-option>
          <el-option label="东北" value='东北'></el-option>
          <el-option label="西南" value='西南'></el-option>
          <el-option label="西北" value='西北'></el-option>
          <el-option label="东西" value='东西'></el-option>
        </el-select>
      </div>
      <div class="width">
        <el-select v-model="eindex" placeholder="付款方式" @change="changeGet">
          <el-option label="押一付一" value="押一付一"></el-option>
          <el-option label="押一付三" value="押一付三"></el-option>
          <el-option label="半年付" value="半年付"></el-option>
          <el-option label="年付" value="年付"></el-option>
        </el-select>
      </div>
      <div class="width">
        <el-select v-model="findex" placeholder="房源状态" @change="changeGet">
          <el-option label="显示中" value="1"></el-option>
          <el-option label="审核中" value="2"></el-option>
          <el-option label="审核未通过" value="3"></el-option>
          <el-option label="已删除" value="4"></el-option>
        </el-select>
      </div>
      <div class="empty_screening" @click="emptyScreening">清空筛选</div>
    </div>
    <div class="house_table">
      <el-table
        :data="houseList"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="update_time" label="发布时间" width="140" sortable></el-table-column>
        <el-table-column prop="house_number" label="房源编号" width="200" sortable></el-table-column>
        <el-table-column prop="community_name" label="小区名称" width="140" sortable></el-table-column>
        <el-table-column prop="price" label="租金" width="140" sortable></el-table-column>
        <el-table-column prop="house_state" label="房源状态" width="140" sortable></el-table-column>
        <el-table-column prop="promotion" label="推广情况" width="140" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope1">
            <el-button
              size="mini"
              type="primary"
              @click="handleCheck(scope1.$index, scope1.row)"
            >查看和操作</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page">
        <el-pagination
          layout="prev, pager, next"
          :total=totalCount
          background
          @current-change="handleCurrentChange"
          :page-size=pageSize
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityoptions: "",
      cityvalue: "",
      districtoptions: "",
      aindex: "",
      bindex: "",
      cindex: "",
      dindex: "",
      eindex: "",
      findex: "",
      houseList: [],
      pageNumber:"1",
      pageSize:new Number,
      totalCount:new Number
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
    },
    getHouseList() {
      this.$http.get("api/houses/getHouseList",{
        params:{
          city:this.cityvalue,
          aindex:this.aindex,
          bindex:this.bindex,
          cindex:this.cindex,
          dindex:this.dindex,
          eindex:this.eindex,
          findex:this.findex,
          pageNumber:this.pageNumber
        }
      }).then(response => {
        this.houseList = response.data.houseListAll;
          this.totalCount=response.data.totalCount  //总数据条数
          this.pageSize=response.data.pageSize   //单页数据量
        for (var i = 0; i < this.houseList.length; i++) {
          this.houseList[i].update_time = this.$moment(
            this.houseList[i].update_time
          ).format("YYYY-MM-DD");
          if (this.houseList[i].house_state == 1) {
            this.houseList[i].house_state = "显示中";
          } else if (this.houseList[i].house_state == 2) {
            this.houseList[i].house_state = "审核中";
          } else if (this.houseList[i].house_state == 3) {
            this.houseList[i].house_state = "审核未通过";
          } else if (this.houseList[i].house_state == 4) {
            this.houseList[i].house_state = "已删除";
          }
          if(this.houseList[i].promotion=='true'){
            this.houseList[i].promotion="有推广"
          }else if(this.houseList[i].promotion=='false'){
            this.houseList[i].promotion="无推广"
          }else if(this.houseList[i].promotion=='wait'){
            this.houseList[i].promotion="等待推广"
          }
        }
        
      });
    },
    getDistrict() {
      this.$http
        .get("api/citys/getDistrict", {
          params: {
            city: this.cityvalue
          }
        })
        .then(response => {
          this.districtoptions = response.data.districtListAll;
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeGet() {
      this.getHouseList();
    },
    changeCity(){
      this.getDistrict();
      this.getHouseList()
    },
    emptyScreening(){
      this.cityvalue=this.aindex=this.bindex=this.cindex=this.dindex=this.eindex=this.findex=""
      this.getHouseList();
    },
    handleCheck(index, row) {
      this.$router.push({ name: "ViewHouse", params: { houseid: row._id } });
    },
     handleCurrentChange(value) {
      this.pageNumber=value;
      this.getHouseList()
    }
  },
  mounted() {
    this.getHouseList();
    this.getCity();
  }
};
</script>

<style scoped>
.width {
  width: 1.2rem;
}
.houses_creen{
   padding: 0.2rem 0;
}
.houses_creen > div {
  display: inline-block;
  padding-left: 0.2rem
}
.empty_screening{
  cursor: pointer;
  font-size: 0.14rem;
  color: #438EB9;
}
</style>

<style>
.house_table {
  width: 96%;
  margin: 0 auto;
}
.table-page{
  text-align: center;
  padding: 0.5rem 0;
}
</style>