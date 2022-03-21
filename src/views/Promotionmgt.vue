<template>
  <div>
    <div class="promotion_table">
      <el-table
        :data="promotionList"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="房源信息">
          <template slot-scope="scope">
            <router-link
              :to="{name:'ViewHouse',params:{houseid:scope.row.house_id}}"
              class="check"
            >点击查看</router-link>
          </template>
        </el-table-column>
        <el-table-column label="用户信息">
          <template slot-scope="scope">
            <span class="check" @click="userCheck(scope.row.user_id)">点击查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="start_time" label="开始时间" sortable></el-table-column>
        <el-table-column prop="end_time" label="结束时间" sortable></el-table-column>
        <el-table-column prop="promotion_price" label="推广费"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope1">
            <el-button
              v-if="scope1.row.status=='申请退款'"
              size="mini"
              type="primary"
              @click="handleRefund(scope1.$index, scope1.row)"
            >{{scope1.row.status}}</el-button>
            <span v-else>{{scope1.row.status}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page">
        <el-pagination
          layout="prev, pager, next"
          :total="totalCount"
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
        ></el-pagination>
      </div>
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
      promotionList: [],
      dialogVisible: false,
      userInfo: "",
      pageNumber: "1",
      pageSize: new Number(),
      totalCount: new Number()
    };
  },
  methods: {
    getPromotionList() {
      this.$http
        .get("api/promotions/getPromotionList", {
          params: {
            pageNumber: this.pageNumber
          }
        })
        .then(response => {
          this.totalCount = response.data.totalCount; //总数据条数
          this.pageSize = response.data.pageSize; //单页数据量
          this.promotionList = response.data.promotionList;
          for (var i = 0; i < this.promotionList.length; i++) {
            this.promotionList[i].start_time = this.$moment(
              this.promotionList[i].start_time
            ).format("YYYY-MM-DD");
            this.promotionList[i].end_time = this.$moment(
              this.promotionList[i].end_time
            ).format("YYYY-MM-DD");
            if (this.promotionList[i].refund == "false") {
              if (this.$moment().isAfter(this.promotionList[i].end_time)) {
                this.promotionList[i].status = "已过期";
              } else {
                if (this.$moment().isBefore(this.promotionList[i].start_time)) {
                  this.promotionList[i].status = "等待推广";
                } else {
                  this.promotionList[i].status = "推广中";
                }
              }
            } else if (this.promotionList[i].refund == "apply") {
              this.promotionList[i].status = "申请退款";
            } else if (this.promotionList[i].refund == "true") {
              this.promotionList[i].status = "已退款";
            }
          }
        });
    },
    userCheck(userId) {
      this.dialogVisible = true;
      this.$http
        .get("api/users/userCheck", {
          params: {
            userId: userId
          }
        })
        .then(response => {
          this.userInfo = response.data.userInfo;
        });
    },
    handleCurrentChange(value) {
      this.pageNumber = value;
      this.getPromotionList();
    },
    handleRefund(index, row) {
      console.log(row)
      var refundAmount = "";
      this.$http
        .get("api/houses/getRefundAmount", {
          params: {
            promotionId: row._id
          }
        })
        .then(response => {
          refundAmount = response.data.refundAmount;
          this.$confirm(
            "是否同意用户退款，金额为" + refundAmount + "元",
            "确认申请退款",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              callback: action => {
                if (action === "confirm") {
                  this.$http
                    .get("api/houses/toRefund", {
                      params: {
                        promotionId: row._id
                      }
                    })
                    .then(response => {
                      this.getPromotionList();
                      this.util.newMessage(
                        "收到退款成功消息",
                        "申请退款成功，退款金额为" + refundAmount + "元",
                        row.user_id,
                        "mypromotion",
                        1
                      );
                      this.$message.success("退款成功");
                    });
                } else {
                  this.$message.info("已取消");
                }
              }
            }
          );
        });
    }
  },
  mounted() {
    this.getPromotionList();
  }
};
</script>

<style scoped>
.width {
  width: 1.2rem;
}
.promotions_creen {
  padding: 0.2rem 0;
}
.promotions_creen > div {
  display: inline-block;
  padding-left: 0.2rem;
}
.empty_screening {
  cursor: pointer;
  font-size: 0.14rem;
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
.check {
  cursor: pointer;
  color: #438eb9;
  text-decoration: none;
}
</style>

<style>
.promotion_table {
  width: 96%;
  margin: 0 auto;
}
.table-page {
  text-align: center;
  padding: 0.5rem 0;
}
</style>