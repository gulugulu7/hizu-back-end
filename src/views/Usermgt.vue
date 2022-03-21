<template>
  <div>
    <div>
      <el-dialog
        title="该用户发布的房源"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <div v-for="(item,index) in userPublishList" :key="index" class="publish_house">
          <router-link :to="{name:'ViewHouse',params:{houseid:item._id}}">
            <span>{{item.house_number}}</span>
          <span>{{item.community_name}}</span>
          </router-link>
        </div>
      </el-dialog>
    </div>
    <div class="user_table">
      <el-table
        :data="userList"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column label="头像" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" width="80" height="80" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="80"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="165" sortable></el-table-column>
        <el-table-column prop="login_time" label="上次登录时间" width="165" sortable></el-table-column>
        <el-table-column prop="password_grade" label="密码等级" width="110" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope1">
            <el-button
              size="mini"
              type="primary"
              @click="checkPublish(scope1.$index, scope1.row)"
            >查看该用户发布的房源</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      pageNumber: "1",
      pageSize: new Number(),
      totalCount: new Number(),
      dialogVisible: false,
      userPublishList:[]
    };
  },
  methods: {
    getUserList() {
      this.$http
        .get("api/users/getUserList", {
          params: {
            pageNumber: this.pageNumber
          }
        })
        .then(response => {
          this.userList = response.data.userList;
          this.totalCount = response.data.totalCount; //总数据条数
          this.pageSize = response.data.pageSize; //单页数据量
          for (var i = 0; i < this.userList.length; i++) {
            this.userList[i].create_time = this.$moment(
              this.userList[i].create_time
            ).format("YYYY-MM-DD HH:mm:ss");
            this.userList[i].login_time = this.$moment(
              this.userList[i].login_time
            ).format("YYYY-MM-DD HH:mm:ss");
            if (this.userList[i].password_grade == 1) {
              this.userList[i].password_grade = "低";
            } else if (this.userList[i].password_grade == 2) {
              this.userList[i].password_grade = "中";
            } else if (this.userList[i].password_grade == 3) {
              this.userList[i].password_grade = "高";
            }
          }
        });
    },
    handleCurrentChange(value) {
      this.pageNumber = value;
      this.getUserList();
    },
    checkPublish(index, row) {
      this.dialogVisible=true
      this.$http.get('api/users/checkPublish',{
        params:{
          userId:row._id
        }
      }).then(response=>{
        this.userPublishList=response.data.userPublishList
        console.log(this.userPublishList)
      })
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>

<style scoped>
.width {
  width: 1.2rem;
}
.users_creen {
  padding: 0.2rem 0;
}
.users_creen > div {
  display: inline-block;
  padding-left: 0.2rem;
}
.empty_screening {
  cursor: pointer;
  font-size: 0.14rem;
  color: #438eb9;
}
.publish_house{
  padding: 0 0 0.1rem 0.2rem ;
}
.publish_house a{
  text-decoration: none;
}
.publish_house a>span:nth-of-type(1){
  color: #438eb9;
}
.publish_house a>span:nth-of-type(2){
  color:rgb(80, 80, 80);
}
</style>

<style>
.user_table {
  width: 96%;
  margin: 0 auto;
}
.table-page {
  text-align: center;
  padding: 0.5rem 0;
}
</style>