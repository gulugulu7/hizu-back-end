<template>
  <div>
    <div class="report_table">
      <el-table
        :data="reportList"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="房源信息" width="120">
          <template slot-scope="scope">
            <router-link
              :to="{name:'ViewHouse',params:{houseid:scope.row.house_id}}"
              class="check"
            >点击查看</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="举报原因" width="200"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope1">
            <div n v-if="scope1.row.handle==1">
            <el-button
              size="mini"
              type="primary"
              @click="openViolation(scope1.$index, scope1.row),reportResult=2"
            >违规下架</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleUntrue(scope1.$index, scope1.row)"
            >举报不实</el-button>
            </div>
            <div v-else>已处理：
              <span v-if="scope1.row.handle==2">违规下架</span>
              <span v-if="scope1.row.handle==3">举报不实</span>
            </div>
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
      reportList: [],
      dialogVisible: false,
      userInfo: "",
      pageNumber: "1",
      pageSize: new Number(),
      totalCount: new Number(),
      reportResult: new Number()
    };
  },
  methods: {
    getReportList() {
      this.$http
        .get("api/houses/getReportList", {
          params: {
            pageNumber: this.pageNumber
          }
        })
        .then(response => {
          this.totalCount = response.data.totalCount; //总数据条数
          this.pageSize = response.data.pageSize; //单页数据量
          this.reportList = response.data.reportList;
          for (var i = 0; i < this.reportList.length; i++) {
            if (this.reportList[i].reason == 1) {
              this.reportList[i].reason = "房屋已出租";
            } else if (this.reportList[i].reason == 2) {
              this.reportList[i].reason = "价格虚假";
            } else if (this.reportList[i].reason == 3) {
              this.reportList[i].reason = "电话无法接通 / 号码错误;";
            } else if (this.reportList[i].reason == 4) {
              this.reportList[i].reason = "房源不存在 / 地址虚假";
            }
          }
        });
    },
    openViolation(index, row) {
      let that = this;
      that.$prompt("请输入违规理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: (action, instance) => {
          if (action === "confirm") {
            that.$http
              .get("api/audits/violation", {
                params: {
                  houseId: row.house_id,
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
                that.getReportList();
              });
            that.$http.get("api/houses/handleReport", {
              params: {
                reportResult: this.reportResult,
                reportId: row._id
              }
            }).then(response=>{
              that.getReportList();
            });
          }
        }
      });
    },
    handleUntrue(index, row) {
      this.reportResult = 3;
      this.$http.get("api/houses/handleReport", {
        params: {
          reportResult: this.reportResult,
          reportId: row._id
        }
      }).then(response=>{
        this.getReportList()
      });
    },
    handleCurrentChange(value) {
      this.pageNumber = value;
      this.getReportList();
    }
  },
  mounted() {
    this.getReportList();
  }
};
</script>

<style scoped>
.width {
  width: 1.2rem;
}
.reports_creen {
  padding: 0.2rem 0;
}
.reports_creen > div {
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
.report_table {
  width: 96%;
  margin: 0 auto;
}
.table-page {
  text-align: center;
  padding: 0.5rem 0;
}
</style>