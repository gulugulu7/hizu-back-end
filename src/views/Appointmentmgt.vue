<template>
  <div>
    <div class="dialog_check">
      <el-dialog title="查看评论看房" :visible.sync="dialogFormVisible1" width="40%">
        <div>
          <span>是否完成看房：</span>
          <span v-if="commentResult.arrive==true">已完成</span>
          <span v-if="commentResult.arrive==false">未完成</span>
        </div>
          <div v-if="commentResult.arrive==true">
            <span>评分：</span>
            <span>
              <el-rate disabled v-model="commentResult.appointment_score" :colors="colors" show-text></el-rate>
            </span>
          </div>
          <div v-if="commentResult.arrive==true">
            <span>评分理由：</span>
            <span>{{commentResult.true_reason}}</span>
          </div>
          <div v-if="commentResult.arrive==false">
            <span>违约人：</span>
            <span>{{commentResult.defaulter}}</span>
          </div>
          <div v-if="commentResult.arrive==false">
            <span>违约理由：</span>
            <span>{{commentResult.false_reason}}</span>
          </div>
      </el-dialog>
    </div>
    <div class="appointment_table">
      <el-table
        :data="appointmentList"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="房源信息" width="100">
          <template slot-scope="scope">
            <router-link
              :to="{name:'ViewHouse',params:{houseid:scope.row.house_id}}"
              class="check"
            >点击查看</router-link>
          </template>
        </el-table-column>
        <el-table-column label="房东信息" width="100">
          <template slot-scope="scope">
            <span class="check" @click="userCheck(scope.row.house_owner_id)">点击查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="appointment_user_confirm" label="房东确认" width="100"></el-table-column>
        <el-table-column label="预约人信息" width="100">
          <template slot-scope="scope">
            <span class="check" @click="userCheck(scope.row.appointment_user_id)">点击查看</span>
          </template>
        </el-table-column>
        <el-table-column prop="house_owner_confirm" label="预约人确认" width="100"></el-table-column>
        <el-table-column prop="appointment_date" label="预约时间" width="160" sortable></el-table-column>
        <el-table-column prop="appointment_place" label="约看地点" width="260"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope1">
            <el-button
              size="mini"
              type="primary"
              @click="handleCheck(scope1.$index, scope1.row)"
              v-if="scope1.row.comment==true"
            >查看结果</el-button>
             <el-button
              size="mini"
              type="primary"
              disabled
              v-if="scope1.row.comment==false"
            >尚未评论</el-button>
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
      appointmentList: [],
      dialogVisible: false,
      userInfo: "",
      dialogFormVisible1:false,
      commentResult:"",
        pageNumber:"1",
      pageSize:new Number,
      totalCount:new Number
    };
  },
  methods: {
    getAppointmentList() {
      this.$http.get("api/appointments/getAppointmentList",{
        params:{
          pageNumber:this.pageNumber
        }
      }).then(response => {
            this.totalCount=response.data.totalCount  //总数据条数
          this.pageSize=response.data.pageSize   //单页数据量
        this.appointmentList = response.data.appointmentList;
        for (var i = 0; i < this.appointmentList.length; i++) {
          this.appointmentList[i].appointment_date =
            this.$moment(this.appointmentList[i].appointment_date).format(
              "YYYY-MM-DD"
            ) +
            " " +
            this.appointmentList[i].appointment_time;
          this.appointmentList[i].appointment_user_confirm = this
            .appointmentList[i].appointment_user_confirm
            ? "已确认"
            : "未确认";
          this.appointmentList[i].house_owner_confirm = this.appointmentList[i]
            .house_owner_confirm
            ? "已确认"
            : "未确认";
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
    handleCheck(index, row) {
      console.log(row._id)
      this.dialogFormVisible1 = true;
      this.$http
        .get("api/appointments/checkComment", {
          params: {
            appointmentId: row._id
          }
        })
        .then(response => {
          this.commentResult = response.data.commentResult;         
        });
    },
    handleCurrentChange(value) {
      this.pageNumber=value;
      this.getAppointmentList()
    }
  },
  mounted() {
    this.getAppointmentList();
  }
};
</script>

<style scoped>
.width {
  width: 1.2rem;
}
.appointments_creen {
  padding: 0.2rem 0;
}
.appointments_creen > div {
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
.appointment_table {
  width: 96%;
  margin: 0 auto;
}
.dialog_check .el-dialog__body{
  padding-top: 0.2rem;
}
 .dialog_check .el-dialog__body>div{
  padding-bottom: 0.3rem;
}
.dialog_check .el-dialog__body>div>span{
  font-size: 0.16rem;
}
.dialog_check .el-dialog__body>div>span:nth-of-type(1){
  display: inline-block;
  width: 24%;
  text-align: right;
  padding-right: 0.22rem;
}
.dialog_check .el-rate{
  display: inline-block;
} 
.table-page{
  text-align: center;
  padding: 0.5rem 0;
}
</style>