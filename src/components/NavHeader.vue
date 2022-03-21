<template>
  <header class="header">
    <div class="logo">
      <i class="el-icon-s-home"></i>
      <p>嗨租后台管理系统</p>
    </div>
    <div class="header_right" @click="logout">注销</div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [],
      noticeList1: []
    };
  },
  methods: {
    modifyPromotion() {
      this.$http.get("api/promotions/modifyPromotion").then(response => {
        for (var i = 0; i < response.data.truePromotionList.length; i++) {
          this.util.newMessage(
            "收到推广上线提醒",
            "您的房源，房屋编号为" +
              response.data.truePromotionList[i].house_id.house_number +
              "，以开始推广，点击查看推广",
            response.data.truePromotionList[i].user_id,
            "mypromotion",
            1
          );
        }
        for (var i = 0; i < response.data.falsePromotionList.length; i++) {
          this.util.newMessage(
            "收到推广到期提醒",
            "您的房源，房屋编号为" +
              response.data.falsePromotionList[i].house_id.house_number +
              "，已到期，点击再去推广",
            response.data.falsePromotionList[i].user_id,
            "promotionhouse",
            1
          );
        }
      });
    },
    noticeAppointment() {
      this.$http.get("api/appointments/noticeAppointment").then(response => {
        this.noticeList = response.data.noticeList;
        for (var i = 0; i < this.noticeList.length; i++) {
          this.util.newMessage(
            "收到预约提醒",
            "您的房源预约，房屋编号为" +
              this.noticeList[i].house_id.house_number +
              "，时间为明天" +
              this.noticeList[i].appointment_time +
              "，地点为" +
              this.noticeList[i].appointment_place,
            this.noticeList[i].house_owner_id,
            "receiveappointment",
            2
          );
          this.util.newMessage(
            "收到预约提醒",
            "您的房源预约，房屋编号为" +
              this.noticeList[i].house_id.house_number +
              "，时间为明天" +
              this.noticeList[i].appointment_time +
              "，地点为" +
              this.noticeList[i].appointment_place,
            this.noticeList[i].appointment_user_id,
            "makeappointment",
            2
          );
        }
      });
    },
    noticeComment() {
      this.$http.get("api/appointments/noticeComment").then(response => {
        this.noticeList1 = response.data.noticeList;
        for (var i = 0; i < this.noticeList1.length; i++) {
          this.util.newMessage(
            "收到预约评论提醒",
            "您的房源预约已完成，房屋编号为" +
              this.noticeList1[i].house_id.house_number +
              "，前往评论",
            this.noticeList1[i].appointment_user_id,
            "makeappointment",
            2
          );
        }
      });
    },
    logout() {
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("role");
      clearInterval(this.interval1);
      clearInterval(this.interval2);
      this.$router.push({ name: "Login" });
    },
    trigger() {
      var refreshHours = new Date().getHours();
      var refreshMin = new Date().getMinutes();
      var refreshSec = new Date().getSeconds();
      if (refreshHours == "0" && refreshMin == "0" && refreshSec == "0") {
        this.modifyPromotion();
        this.noticeAppointment();
        this.noticeComment();
      }
    },
    systemCount() {
      this.$http.get("api/houses/systemCount").then();
    }
  },
  mounted() {
    this.interval1 = setInterval(this.trigger, 1000);
    this.interval2 = setInterval(this.systemCount, 1000);

    // this.modifyPromotion();
    // this.noticeAppointment();
    // this.noticeComment();    
  }
};
</script>



<style scoped>
.header {
  background-color: #438eb9;
}
.logo {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.1rem 0.2rem;
  font-weight: 100;
  display: inline-block;
}
.logo i {
  font-size: 0.26rem;
  display: inline-block;
}
.logo p {
  padding-left: 0.04rem;
  font-size: 0.19rem;
  font-weight: 500;
  display: inline-block;
}
.header_right {
  color: white;
  display: inline-block;
  margin-left: 10.5rem;
  cursor: pointer;
}
</style>