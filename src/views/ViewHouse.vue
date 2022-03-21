<template>
  <div v-if="!loading">
    <div class="view_house">
      <ul>
        <li>
          <span>房源编号：</span>
          <span>{{houseDetail.house_number}}</span>
        </li>
        <li>
          <span>房源类型：</span>
          <span>{{houseDetail.housing_type}}</span>
        </li>
        <li>
          <span>出租方式：</span>
          <span>{{houseDetail.rental_mode}}</span>
        </li>
        <li>
          <span>小区名称：</span>
          <span>{{houseDetail.community_name}}</span>
        </li>
        <li>
          <span>房屋地址：</span>
          <span>{{houseDetail.sq_value.district_id.district_name}}-{{houseDetail.sq_value.sq_name}}-{{houseDetail.cell_address}}</span>
        </li>
        <li>
          <span>房屋户型：</span>
          <span>{{houseDetail.room}}室{{houseDetail.hall}}厅{{houseDetail.toilet}}卫</span>
        </li>
        <li>
          <span>建筑面积：</span>
          <span>{{houseDetail.floorage}}平方米</span>
        </li>
        <li>
          <span>楼层信息：</span>
          <span>
            {{houseDetail.floor}}层，共{{houseDetail.floor_all}}，
            <span
              v-if="houseDetail.elevator==true"
            >有电梯</span>
            <span v-else>无电梯</span>
          </span>
        </li>
        <li>
          <span>房屋朝向：</span>
          <span>{{houseDetail.house_orientation}}</span>
        </li>
        <li>
          <span>附近地铁：</span>
          <span>
            <span
              v-if="houseDetail.subway_checked==true"
            >附近有地铁，{{houseDetail.subway_station_value.subwayLine_id.subwayLine_name}}-{{houseDetail.subway_station_value.subwayStation_name}}</span>
            <span v-else>附近无地铁</span>
          </span>
        </li>
        <li>
          <span>月租金：</span>
          <span>{{houseDetail.price}}元/月，{{houseDetail.payment_method}}</span>
        </li>
        <li>
          <span>租金包含：</span>
          <span>
            <span v-for="(item,index) in houseDetail.rent_includes" :key="index">{{item}}、</span>
          </span>
        </li>
        <li>
          <span>最早住入：</span>
          <span>{{this.$moment(houseDetail.check_in_time).format("YYYY-MM-DD")}}</span>
        </li>
        <li>
          <span>宜住人数：</span>
          <span>{{houseDetail.number}}人</span>
        </li>
        <li>
          <span>装修情况：</span>
          <span>{{houseDetail.renovation}}</span>
        </li>
        <li>
          <span>房屋配置：</span>
          <span>
            <span v-for="(item,index) in houseDetail.configuration_includes" :key="index">{{item}}、</span>
          </span>
        </li>
        <li>
          <span>出租要求：</span>
          <span>{{houseDetail.rental_requirements}}</span>
        </li>
        <li>
          <span>房屋描述：</span>
          <span>{{houseDetail.housing_description}}</span>
        </li>
        <li>
          <span>房源图片：</span>
          <span>
            <span v-for="(item,index) in houseImgUrl" :key="index">
              <img style="padding-left:0.1rem" :src="item" alt />
            </span>
          </span>
        </li>
        <li>
          <span>联系人：</span>
          <span>{{houseDetail.contacts}}{{houseDetail.contactssex}}</span>
        </li>
        <li>
          <span>联系电话：</span>
          <span>{{houseDetail.contact_number}}</span>
        </li>
        <li>
          <span>创建时间：</span>
          <span>{{this.$moment(houseDetail.create_time).format("YYYY-MM-DD")}}</span>
        </li>
        <li>
          <span>更新时间：</span>
          <span>{{this.$moment(houseDetail.update_time).format("YYYY-MM-DD")}}</span>
        </li>
        <li>
          <span>房源状态：</span>
          <span v-if="houseDetail.house_state==1">显示中</span>
          <span v-else-if="houseDetail.house_state==2">审核中</span>
          <span v-else-if="houseDetail.house_state==3">审核未通过</span>
          <span v-else-if="houseDetail.house_state==4">已删除</span>
        </li>
        <li>
          <span>目前推广：</span>
          <span>
            <span v-if="houseDetail.promotion!='false'">
              <span style="padding-right:0.3rem" v-if="houseDetail.promotion=='true'">推广中</span>
              <span style="padding-right:0.3rem" v-if="houseDetail.promotion=='wait'">等待推广</span>
              <span
                style="padding-right:0.3rem"
              >开始日期：{{this.$moment(nowPromotion.start_time).format("YYYY-MM-DD")}}</span>
              <span>结束日期：{{this.$moment(nowPromotion.end_time).format("YYYY-MM-DD")}}</span>
            </span>
            <span v-else>无推广</span>
          </span>
        </li>
        <li>
          <span>用户信息：</span>
          <span class="user_check" @click="userCheck()">点击查看</span>
        </li>
        <li v-if="reason">
          <span>不通过理由</span>
          <span>{{reason.reason}}</span>
        </li>
        <li style="margin-bottom:0.2rem">
          <div class="house_buttom" v-if="houseDetail.house_state==1">
            <el-button type="primary" @click="openViolation()">违规下架</el-button>
          </div>
          <div class="house_buttom" v-if="houseDetail.house_state==2">
            <el-button type="primary" @click="auditPass()">审核通过</el-button>
          </div>
          <div class="house_buttom" v-if="houseDetail.house_state==2">
            <el-button type="primary" @click="auditFailed()">审核不通过</el-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="user_info">
      <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
        <ul>
          <li>
            头像：
            <img :src="userInfo.avatar" />
          </li>
          <li>用户名：{{userInfo.username}}</li>
          <li>手机号：{{userInfo.phone}}</li>
          <li>邮箱：{{userInfo.email}}</li>
          <li>
            密码等级：
            <span v-if="userInfo.password_grade==1">低</span>
            <span v-else-if="userInfo.password_grade==2">中</span>
            <span v-else-if="userInfo.password_grade==3">高</span>
          </li>
          <li>注册时间：{{this.$moment(userInfo.create_time).format("YYYY-MM-DD HH:mm:ss")}}</li>
          <li>上次登录时间：{{this.$moment(userInfo.login_time).format("YYYY-MM-DD HH:mm:ss")}}</li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      houseDetail: [],
      loading: false,
      nowPromotion: "",
      dialogVisible: false,
      userInfo: "",
      reason: ""
    };
  },
  methods: {
    getHouseDetail() {
      this.loading = true;
      this.$http
        .get("api/houses/getHouseDetail", {
          params: {
            house_id: this.$route.params.houseid
          }
        })
        .then(response => {
          this.houseDetail = response.data.houseDetail[0];
          this.houseDetail.house_img = JSON.parse(this.houseDetail.house_img);
          this.houseImgUrl = Object.keys(this.houseDetail.house_img);
          this.title_img = this.houseImgUrl[0];
          if (this.houseDetail.promotion == 'true'||this.houseDetail.promotion == 'wait') {
            this.getPromotion();
            this.loading = false;
          } else {
            this.loading = false;
          }
          if (this.houseDetail.house_state == 3) {
            this.$http
              .get("api/houses/checkFailedReason", {
                params: {
                  houseId: this.houseDetail._id
                }
              })
              .then(response => {
                this.reason = response.data.reason;
              });
          }
        });
    },
    getPromotion() {
      this.$http
        .get("api/houses/getPromotion", {
          params: {
            house_id: this.$route.params.houseid
          }
        })
        .then(response => {
          this.nowPromotion = response.data.nowPromotion;
        });
    },
    openViolation() {
      let that = this;
      that.$prompt("请输入违规理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: (action, instance) => {
          if (action === "confirm") {
            that.$http
              .get("api/audits/violation", {
                params: {
                  houseId: this.$route.params.houseid,
                  reason: instance.inputValue
                }
              })
              .then(response => {
                if (response.data.success == "true") {
                  that.$message.success("下架成功");
                  that.util.newMessage(
                    "收到违规下架消息",
                    "您的房源，房屋编号为" +
                      that.houseDetail.house_number +
                      "，违规理由为：" +
                      response.data.reason,
                    that.houseDetail.user_id,
                    "manageauditfailed",
                    3
                  );
                }
                that.getHouseDetail();
              });
          }
        }
      });
    },
    userCheck() {
      this.dialogVisible = true;
      this.$http
        .get("api/users/userCheck", {
          params: {
            userId: this.houseDetail.user_id
          }
        })
        .then(response => {
          this.userInfo = response.data.userInfo;
        });
    },
    auditPass() {
      this.$http
        .get("api/audits/auditPass", {
          params: {
            houseId: this.houseDetail._id
          }
        })
        .then(response => {
          if (response.data.success == "true") {
            this.$message.success("通过成功");
            this.util.newMessage(
              "收到审核通过消息",
              "您的房源，房屋编号为" +
                this.houseDetail.house_number +
                "，已经上架",
              this.houseDetail.user_id,
              "managedisplay",
              3
            );
            this.getHouseDetail();
          }
        });
    },
    auditFailed() {
      let that = this;
      that.$prompt("请输入不通过理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: (action, instance) => {
          if (action === "confirm") {
            that.$http
              .get("api/audits/violation", {
                params: {
                  houseId: this.$route.params.houseid,
                  reason: instance.inputValue
                }
              })
              .then(response => {
                if (response.data.success == "true") {
                  that.$message.success("操作成功");
                  that.util.newMessage(
                    "收到审核不通过消息",
                    "您的房源，房屋编号为" +
                      that.houseDetail.house_number +
                      "，不通过理由为：" +
                      response.data.reason,
                    that.houseDetail.user_id,
                    "manageauditfailed",
                    3
                  );
                }
                that.getHouseDetail();
              });
          }
        }
      });
    }
  },
  mounted() {
    this.getHouseDetail();
  }
};
</script>

<style scoped>
.view_house ul {
  list-style-type: none;
}
.view_house ul {
  padding-top: 0.2rem;
}
.view_house ul li {
  padding: 0.2rem 0 0.2rem 0.4rem;
}

.view_house > ul > li > span:nth-of-type(1) {
  color: rgb(131, 131, 131);
  display: inline-block;
  width: 9%;
}
.view_house > ul > li > span:nth-of-type(2) {
  display: inline-block;
  width: 88%;
  vertical-align: top;
}
.view_house img {
  width: 1.6rem;
  height: 1.6rem;
}
.page_effects {
  margin: 0 0 0.3rem 0;
}
.user_check {
  cursor: pointer;
  color: #438eb9;
}
.user_info ul {
  list-style-type: none;
}
.user_info li {
  margin-bottom: 0.2rem;
}
.user_info li img {
  width: 1rem;
  height: 1rem;
}
</style>

<style>
.house_buttom {
  display: inline-block;
}
</style>