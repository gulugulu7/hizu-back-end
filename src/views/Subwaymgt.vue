<template>
  <div>
    <div class="dialog_add">
      <el-dialog
        :title="this.isa==='a0'?'添加地铁线':'添加地铁站'"
        :visible.sync="dialogAddFormVisible"
        center
        width="30%"
        @close="closeadd()"
      >
        <el-form :model="addSubwayLineForm" v-if="this.isa==='a0'">
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-select v-model="addSubwayLineForm.cityvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in cityoptions"
                :key="item.city_number"
                :label="item.city_name+'市'"
                :value="item.city_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label="地铁线" :label-width="formLabelWidth">
              <el-input
                v-model="addSubwayLineForm.subwayLineName"
                autocomplete="off"
                style="width:2.2rem"
                @keyup.enter.native="submitSubwayLineForm(addSubwayLineForm)"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <el-form :model="addSubwayStationForm" v-else>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-select v-model="addSubwayStationForm.cityvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in cityoptions"
                :key="item.city_number"
                :label="item.city_name+'市'"
                :value="item.city_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label="地铁线" :label-width="formLabelWidth">
              <el-select v-model="addSubwayStationForm.subwayLinevalue" placeholder="请选择" disabled>
                <el-option
                  v-for="item in subwayLineoptions"
                  :key="item.subwayLine_number"
                  :label="item.subwayLine_name"
                  :value="item.subwayLine_number"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地铁站" :label-width="formLabelWidth">
              <el-input
                v-model="addSubwayStationForm.subwayStationName"
                autocomplete="off"
                style="width:2.2rem"
                @keyup.enter.native="submitSubwayStationForm(addSubwayStationForm)"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitSubwayLineForm(addSubwayLineForm)"
            v-if="this.isa==='a0'"
          >添 加</el-button>
          <el-button type="primary" @click="submitSubwayStationForm(addSubwayStationForm)" v-else>添 加</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="dialog_edit">
      <el-dialog
        :title="this.isa==='a0'?'编辑地铁线':'编辑地铁站'"
        :visible.sync="dialogEditFormVisible"
        center
        width="30%"
        @close="closeedit()"
      >
        <el-form :model="editSubwayLineForm" v-if="this.isa==='a0'">
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-select v-model="editSubwayLineForm.cityvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in cityoptions"
                :key="item.city_number"
                :label="item.city_name+'市'"
                :value="item.city_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地铁线" :label-width="formLabelWidth">
            <el-input
              v-model="editSubwayLineForm.subwayLineName"
              autocomplete="off"
              style="width:2.2rem"
              @keyup.enter.native="submiteditSubwayLineForm(editSubwayLineForm)"
            ></el-input>
          </el-form-item>
          <el-form-item label="_id" :label-width="formLabelWidth" v-show="false">
            <el-input v-model="editSubwayLineForm._id" autocomplete="off" style="width:2.2rem"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="editSubwayStationForm" v-else>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-select v-model="editSubwayStationForm.cityvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in cityoptions"
                :key="item.city_number"
                :label="item.city_name+'市'"
                :value="item.city_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地铁线" :label-width="formLabelWidth">
            <el-select v-model="editSubwayStationForm.subwayLinevalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in subwayLineoptions"
                :key="item.subwayLine_number"
                :label="item.subwayLine_name"
                :value="item.subwayLine_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地铁站" :label-width="formLabelWidth">
            <el-input
              v-model="editSubwayStationForm.subwayStationName"
              autocomplete="off"
              style="width:2.2rem"
              @keyup.enter.native="submiteditSubwayStationForm(editSubwayStationForm)"
            ></el-input>
          </el-form-item>
          <el-form-item label="_id" :label-width="formLabelWidth" v-show="false">
            <el-input v-model="editSubwayStationForm._id" autocomplete="off" style="width:2.2rem"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submiteditSubwayLineForm(editSubwayLineForm)"
            v-if="this.isa==='a0'"
          >确 定</el-button>
          <el-button type="primary" @click="submiteditSubwayStationForm(editSubwayStationForm)" v-else>确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="select_add">
      <div class="city_select">
        <el-select v-model="cityvalue" placeholder="请选择" @change="changeCity">
          <el-option
            v-for="item in cityoptions"
            :key="item.city_number"
            :label="item.city_name+'市'"
            :value="item.city_number"
          ></el-option>
        </el-select>
      </div>
      <div class="subwayLine_select">
        <el-select v-model="subwayLinevalue" placeholder="请选择" @change="changeSubwayLine">
          <el-option
            v-for="item in subwayLineoptions"
            :key="item.subwayLine_number"
            :label="item.subwayLine_name"
            :value="item.subwayLine_number"
          ></el-option>
        </el-select>
      </div>
      <div class="add_button">
        <el-button
          type="primary"
          size="small"
          @click="dialogAddFormVisible=true"
          v-if="this.isa==='a0'"
        >添加地铁线</el-button>
        <el-button type="primary" size="small" @click="dialogAddFormVisible=true" v-else>添加地铁站</el-button>
      </div>
    </div>
    <div class="subwayLine_table" v-if="this.isa==='a0'">
      <el-table :data="subwayLineList" border style="width: 100%">
        <el-table-column prop="_id" label="_id" width="240"></el-table-column>
        <el-table-column prop="subwayLine_name" label="地铁线" width="140"></el-table-column>
        <el-table-column prop="subwayLine_number" label="地铁线编号" width="140"></el-table-column>
        <el-table-column prop="city_id.city_name" label="城市" width="140"></el-table-column>
        <el-table-column prop="city_id.city_number" label="城市编号" width="140"></el-table-column>
        <div v-if="aa==1">
          <el-table-column prop label></el-table-column>
          <el-table-column prop label></el-table-column>
        </div>
        <el-table-column label="操作">
          <template slot-scope="scope1">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSubwayLine(scope1.$index, scope1.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteSubwayLine(scope1.$index, scope1.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page">
        <el-pagination
          layout="prev, pager, next"
          :total=totalCountSubwayLine
          background
          @current-change="handleSubwayLineCurrentChange"
          :page-size=pageSizeSubwayLine
        ></el-pagination>
      </div>
    </div>
    <div class="subwayStation_table" v-else>
      <el-table :data="subwayStationoptions" border style="width: 100%">
        <el-table-column prop="_id" label="_id"></el-table-column>
        <el-table-column prop="subwayStation_name" label="地铁站" width="120"></el-table-column>
        <el-table-column prop="subwayStation_number" label="地铁站编号" width="100"></el-table-column>
        <el-table-column prop="subwayLine_id.subwayLine_name" label="地铁线" width="100"></el-table-column>
        <el-table-column prop="subwayLine_id.subwayLine_number" label="地铁线编号" width="100"></el-table-column>
        <el-table-column prop="subwayLine_id.city_id.city_name" label="城市" width="100"></el-table-column>
        <el-table-column prop="subwayLine_id.city_id.city_number" label="城市编号" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope2">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSubwayStation(scope2.$index, scope2.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteSubwayStation(scope2.$index, scope2.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page">
        <el-pagination
          layout="prev, pager, next"
          :total=totalCountSubwayStation
          background
          @current-change="handleSubwayStationCurrentChange"
          :page-size=pageSizeSubwayStation
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aa: "",
      dialogAddFormVisible: false,
      dialogEditFormVisible: false,
      cityoptions: [],
      subwayLineoptions: [],
      subwayLineList:[],
      subwayStationoptions: [],
      cityvalue: this.$route.params.city,
      subwayLinevalue: "",
      subwayStationvalue: "",
      isa: this.$route.params.subwayLine,
      totalCountSubwayLine:new Number(),
      pageNumberSubwayLine:"1",
      pageSizeSubwayLine:new Number(),
      totalCountSubwayStation:new Number(),
      pageNumberSubwayStation:"1",
      pageSizeSubwayStation:new Number(),
      addSubwayLineForm: {
        cityvalue: "",
        subwayLineName: ""
      },
      editSubwayLineForm: {
        cityvalue: "",
        subwayLineName: "",
        _id: ""
      },
      addSubwayStationForm: {
        cityvalue: "",
        subwayLinevalue: "",
        subwayStationName: ""
      },
      editSubwayStationForm: {
        cityvalue: "",
        subwayLinevalue: "",
        subwayStationName: "",
        _id: ""
      },
      formLabelWidth: "0.9rem"
    };
  },
  methods: {
    changeCity(value) {
      this.$router.push({
        name: "Subwaymgt",
        params: { city: value, subwayLine: "a0" }
      });
      this.addSubwayLineForm.cityvalue = value;
      this.addSubwayStationForm.cityvalue = value;
      this.subwayLinevalue = "";
      this.getSubwayLine();
      this.$store.dispatch("CITY",value)
    },
    changeSubwayLine(value) {
      this.$router.push({
        name: "Subwaymgt",
        params: { subwayLine: value }
      });
      this.addSubwayStationForm.subwayLinevalue = value;
      this.getSubwayStation();
    },

    getCity() {
      this.$http
        .get("api/citys/getCity")
        .then(response => {
          this.cityoptions = response.data.cityList;
        })
        .catch(error => {
          console.log(error);
        });
      this.addSubwayLineForm.cityvalue = this.cityvalue;
      this.addSubwayStationForm.cityvalue = this.cityvalue;
    },
    getSubwayLine() {
      this.$http
        .get("api/citys/getSubwayLine", {
          params: {
            city: this.$route.params.city,
            pageNumberSubwayLine:this.pageNumberSubwayLine
          }
        })
        .then(response => {
          this.subwayLineoptions = response.data.subwayLineListAll;
          this.subwayLineList = response.data.subwayLineList;
          this.totalCountSubwayLine=response.data.totalCountSubwayLine   //总数据条数
          this.pageSizeSubwayLine=response.data.pageSizeSubwayLine   //单页数据量
        })
        .catch(error => {
          console.log(error);
        });
      this.addSubwayStationForm.subwayLinevalue = this.subwayLinevalue;
    },
    getSubwayStation() {
      this.$http
        .get("api/citys/getSubwayStation", {
          params: {
            subwayLine: this.$route.params.subwayLine,
            pageNumberSubwayStation:this.pageNumberSubwayStation
          }
        })
        .then(response => {
          this.subwayStationoptions = response.data.subwayStationList;
          this.totalCountSubwayStation=response.data.totalCountSubwayStation   //总数据条数
          this.pageSizeSubwayStation=response.data.pageSizeSubwayStation   //单页数据量
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitSubwayLineForm(formName) {
      this.$http
        .post("/api/citys/addSubwayLine", this.addSubwayLineForm)
        .then(response => {
          if (!response.data.success) {
            this.$message({
              type: "info",
              message: "该地铁线已存在"
            });
          } else {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.dialogAddFormVisible = false;
            this.addSubwayLineForm.subwayLineName = "";
            this.getSubwayLine();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitSubwayStationForm(formName) {
      this.$http
        .post("/api/citys/addSubwayStation", this.addSubwayStationForm)
        .then(response => {
          if (!response.data.success) {
            this.$message({
              type: "info",
              message: "该地铁站已存在"
            });
          } else {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.dialogAddFormVisible = false;
            this.addSubwayStationForm.subwayStationName = "";
            this.getSubwayStation();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submiteditSubwayLineForm(formName) {
      this.$http
        .post("/api/citys/editSubwayLine", this.editSubwayLineForm)
        .then(response => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.dialogEditFormVisible = false;
            this.getSubwayLine();
          } else {
            this.$message({
              type: "info",
              message: "地铁线已存在"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submiteditSubwayStationForm(formName) {
      this.$http
        .post("/api/citys/editSubwayStation", this.editSubwayStationForm)
        .then(response => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.dialogEditFormVisible = false;
            this.getSubwayStation();
          } else {
            this.$message({
              type: "info",
              message: "地铁线已存在"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleEditSubwayLine(index, row) {
      this.dialogEditFormVisible = true;
      this.editSubwayLineForm.cityvalue = row.city_id.city_number;
      this.editSubwayLineForm.subwayLineName = row.subwayLine_name;
      this.editSubwayLineForm._id = row._id;
    },
    handleEditSubwayStation(index, row) {
      this.dialogEditFormVisible = true;
      this.editSubwayStationForm.cityvalue = row.subwayLine_id.city_id.city_number;
      this.editSubwayStationForm.subwayLinevalue = row.subwayLine_id.subwayLine_number;
      this.editSubwayStationForm.subwayStationName = row.subwayStation_name;
      this.editSubwayStationForm._id = row._id;
    },
    handleDeleteSubwayLine(index, row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("/api/citys/deleteSubwayLine", {
              params: {
                deleteId: row._id
              }
            })
            .then(response => {
              if (response.data.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getSubwayLine();
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDeleteSubwayStation(index, row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("/api/citys/deleteSubwayStation", {
              params: {
                deleteId: row._id
              }
            })
            .then(response => {
              if (response.data.success) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getSubwayStation();
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    closeadd() {
      this.addSubwayLineForm.subwayLineName = "";
      this.addSubwayStationForm.subwayStationName = "";
    },
    closeedit() {
      (this.editSubwayLineForm.subwayLineName = ""), (this.editSubwayStationForm.subwayStationName = "");
    },
    handleSubwayLineCurrentChange(value) {
      this.pageNumberSubwayLine=value;
      this.getSubwayLine()
    },
    handleSubwayStationCurrentChange(value) {
      this.pageNumberSubwayStation=value;
      this.getSubwayStation()
    }
  },
  mounted() {
    this.getCity();
    this.getSubwayLine();
    this.getSubwayStation();
    if (this.$route.params.subwayLine != "a0") {
      this.subwayLinevalue = this.$route.params.subwayLine;
      this.editSubwayStationForm.subwayLinevalue = this.$route.params.subwayLine;
      this.addSubwayStationForm.subwayLinevalue = this.$route.params.subwayLine;
    }
  },
  watch: {
    $route(to, from) {
      this.isa = to.params.subwayLine;
      // this.city=to.params.city
      this.addSubwayLineForm.cityvalue=to.params.city
      this.getSubwayLine();
    }
  }
};
</script>

<style>
.city_select {
  width: 1.2rem;
}
.subwayLine_select {
  width: 1.2rem;
}
.subwayLine_table {
  width: 96%;
  margin: 0 auto;
}
.subwayStation_table {
  width: 96%;
  margin: 0 auto;
}
.select_add {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 0;
}

</style>

<style scoped>
.city_select {
  padding: 0 0.4rem;
}
.add_button {
  padding-left: 60%;
}
.table-page{
  text-align: center;
  padding: 0.5rem 0;
}
</style>