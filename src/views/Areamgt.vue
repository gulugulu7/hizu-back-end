<template>
  <div>
    <div class="dialog_add">
      <el-dialog
        :title="this.isa==='a0'?'添加区域':'添加商圈'"
        :visible.sync="dialogAddFormVisible"
        center
        width="30%"
        @close="closeadd()"
      >
        <el-form :model="addDistrictForm" v-if="this.isa==='a0'">
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-select v-model="addDistrictForm.cityvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in cityoptions"
                :key="item.city_number"
                :label="item.city_name+'市'"
                :value="item.city_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label="行政区" :label-width="formLabelWidth">
              <el-input
                v-model="addDistrictForm.districtName"
                autocomplete="off"
                style="width:2.2rem"
                @keyup.enter.native="submitDistrictForm(addDistrictForm)"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <el-form :model="addSqForm" v-else>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-select v-model="addSqForm.cityvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in cityoptions"
                :key="item.city_number"
                :label="item.city_name+'市'"
                :value="item.city_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label="行政区" :label-width="formLabelWidth">
              <el-select v-model="addSqForm.districtvalue" placeholder="请选择" disabled>
                <el-option
                  v-for="item in districtoptions"
                  :key="item.district_number"
                  :label="item.district_name+'区'"
                  :value="item.district_number"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商圈" :label-width="formLabelWidth">
              <el-input
                v-model="addSqForm.sqName"
                autocomplete="off"
                style="width:2.2rem"
                @keyup.enter.native="submitSqForm(addSqForm)"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submitDistrictForm(addDistrictForm)"
            v-if="this.isa==='a0'"
          >添 加</el-button>
          <el-button type="primary" @click="submitSqForm(addSqForm)" v-else>添 加</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="dialog_edit">
      <el-dialog
        :title="this.isa==='a0'?'编辑区域':'编辑商圈'"
        :visible.sync="dialogEditFormVisible"
        center
        width="30%"
        @close="closeedit()"
      >
        <el-form :model="editDistrictForm" v-if="this.isa==='a0'">
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-select v-model="editDistrictForm.cityvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in cityoptions"
                :key="item.city_number"
                :label="item.city_name+'市'"
                :value="item.city_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行政区" :label-width="formLabelWidth">
            <el-input
              v-model="editDistrictForm.districtName"
              autocomplete="off"
              style="width:2.2rem"
              @keyup.enter.native="submiteditDistrictForm(editDistrictForm)"
            ></el-input>
          </el-form-item>
          <el-form-item label="_id" :label-width="formLabelWidth" v-show="false">
            <el-input v-model="editDistrictForm._id" autocomplete="off" style="width:2.2rem"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="editSqForm" v-else>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-select v-model="editSqForm.cityvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in cityoptions"
                :key="item.city_number"
                :label="item.city_name+'市'"
                :value="item.city_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行政区" :label-width="formLabelWidth">
            <el-select v-model="editSqForm.districtvalue" placeholder="请选择" disabled>
              <el-option
                v-for="item in districtoptions"
                :key="item.district_number"
                :label="item.district_name+'区'"
                :value="item.district_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商圈" :label-width="formLabelWidth">
            <el-input
              v-model="editSqForm.sqName"
              autocomplete="off"
              style="width:2.2rem"
              @keyup.enter.native="submiteditSqForm(editSqForm)"
            ></el-input>
          </el-form-item>
          <el-form-item label="_id" :label-width="formLabelWidth" v-show="false">
            <el-input v-model="editSqForm._id" autocomplete="off" style="width:2.2rem"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="submiteditDistrictForm(editDistrictForm)"
            v-if="this.isa==='a0'"
          >确 定</el-button>
          <el-button type="primary" @click="submiteditSqForm(editSqForm)" v-else>确 定</el-button>
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
      <div class="district_select">
        <el-select v-model="districtvalue" placeholder="请选择" @change="changeDistrict">
          <el-option
            v-for="item in districtoptions"
            :key="item.district_number"
            :label="item.district_name+'区'"
            :value="item.district_number"
          ></el-option>
        </el-select>
      </div>
      <div class="add_button">
        <el-button
          type="primary"
          size="small"
          @click="dialogAddFormVisible=true"
          v-if="this.isa==='a0'"
        >添加行政区</el-button>
        <el-button type="primary" size="small" @click="dialogAddFormVisible=true" v-else>添加商圈</el-button>
      </div>
    </div>
    <div class="district_table" v-if="this.isa==='a0'">
      <el-table :data="districtList" border style="width: 100%">
        <el-table-column prop="_id" label="_id" width="240"></el-table-column>
        <el-table-column prop="district_name" label="行政区" width="140"></el-table-column>
        <el-table-column prop="district_number" label="行政区编号" width="140"></el-table-column>
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
              @click="handleEditDistrict(scope1.$index, scope1.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteDistrict(scope1.$index, scope1.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page">
        <el-pagination
          layout="prev, pager, next"
          :total=totalCountDistrict
          background
          @current-change="handleDistrictCurrentChange"
          :page-size=pageSizeDistrict
        ></el-pagination>
      </div>
    </div>
    <div class="sq_table" v-else>
      <el-table :data="sqoptions" border style="width: 100%">
        <el-table-column prop="_id" label="_id"></el-table-column>
        <el-table-column prop="sq_name" label="商圈" width="120"></el-table-column>
        <el-table-column prop="sq_number" label="商圈编号" width="100"></el-table-column>
        <el-table-column prop="district_id.district_name" label="行政区" width="100"></el-table-column>
        <el-table-column prop="district_id.district_number" label="行政区编号" width="100"></el-table-column>
        <el-table-column prop="district_id.city_id.city_name" label="城市" width="100"></el-table-column>
        <el-table-column prop="district_id.city_id.city_number" label="城市编号" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope2">
            <el-button
              size="mini"
              type="primary"
              @click="handleEditSq(scope2.$index, scope2.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteSq(scope2.$index, scope2.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-page">
        <el-pagination
          layout="prev, pager, next"
          :total=totalCountSq
          background
          @current-change="handleSqCurrentChange"
          :page-size=pageSizeSq
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
      districtoptions: [],
      districtList:[],
      sqoptions: [],
      cityvalue: this.$route.params.city,
      districtvalue: "",
      sqvalue: "",
      isa: this.$route.params.district,
      totalCountDistrict:new Number(),
      pageNumberDistrict:"1",
      pageSizeDistrict:new Number(),
      totalCountSq:new Number(),
      pageNumberSq:"1",
      pageSizeSq:new Number(),
      addDistrictForm: {
        cityvalue: "",
        districtName: ""
      },
      editDistrictForm: {
        cityvalue: "",
        districtName: "",
        _id: ""
      },
      addSqForm: {
        cityvalue: "",
        districtvalue: "",
        sqName: ""
      },
      editSqForm: {
        cityvalue: "",
        districtvalue: "",
        sqName: "",
        _id: ""
      },
      formLabelWidth: "0.9rem"
    };
  },
  methods: {
    changeCity(value) {
      this.$router.push({
        name: "Areamgt",
        params: { city: value, district: "a0" }
      });
      this.addDistrictForm.cityvalue = value;
      this.addSqForm.cityvalue = value;
      this.districtvalue = "";
      this.getDistrict();
      this.$store.dispatch("CITY",value)
    },
    changeDistrict(value) {
      this.$router.push({
        name: "Areamgt",
        params: { district: value }
      });
      this.addSqForm.districtvalue = value;
      this.getSq();
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
      this.addDistrictForm.cityvalue = this.cityvalue;
      this.addSqForm.cityvalue = this.cityvalue;
    },
    getDistrict() {
      this.$http
        .get("api/citys/getDistrict", {
          params: {
            city: this.$route.params.city,
            pageNumberDistrict:this.pageNumberDistrict
          }
        })
        .then(response => {
          this.districtoptions = response.data.districtListAll;
          this.districtList = response.data.districtList;
          this.totalCountDistrict=response.data.totalCountDistrict   //总数据条数
          this.pageSizeDistrict=response.data.pageSizeDistrict   //单页数据量
        })
        .catch(error => {
          console.log(error);
        });
      this.addSqForm.districtvalue = this.districtvalue;
    },
    getSq() {
      this.$http
        .get("api/citys/getSq", {
          params: {
            district: this.$route.params.district,
            pageNumberSq:this.pageNumberSq
          }
        })
        .then(response => {
          this.sqoptions = response.data.sqList;
          this.totalCountSq=response.data.totalCountSq   //总数据条数
          this.pageSizeSq=response.data.pageSizeSq   //单页数据量
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitDistrictForm(formName) {
      this.$http
        .post("/api/citys/addDistrict", this.addDistrictForm)
        .then(response => {
          if (!response.data.success) {
            this.$message({
              type: "info",
              message: "该行政区已存在"
            });
          } else {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.dialogAddFormVisible = false;
            this.addDistrictForm.districtName = "";
            this.getDistrict();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitSqForm(formName) {
      this.$http
        .post("/api/citys/addSq", this.addSqForm)
        .then(response => {
          if (!response.data.success) {
            this.$message({
              type: "info",
              message: "该商圈已存在"
            });
          } else {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.dialogAddFormVisible = false;
            this.addSqForm.sqName = "";
            this.getSq();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submiteditDistrictForm(formName) {
      this.$http
        .post("/api/citys/editDistrict", this.editDistrictForm)
        .then(response => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.dialogEditFormVisible = false;
            this.getDistrict();
          } else {
            this.$message({
              type: "info",
              message: "行政区已存在"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submiteditSqForm(formName) {
      this.$http
        .post("/api/citys/editSq", this.editSqForm)
        .then(response => {
          if (response.data.success) {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.dialogEditFormVisible = false;
            this.getSq();
          } else {
            this.$message({
              type: "info",
              message: "行政区已存在"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleEditDistrict(index, row) {
      this.dialogEditFormVisible = true;
      this.editDistrictForm.cityvalue = row.city_id.city_number;
      this.editDistrictForm.districtName = row.district_name;
      this.editDistrictForm._id = row._id;
    },
    handleEditSq(index, row) {
      this.dialogEditFormVisible = true;
      this.editSqForm.cityvalue = row.district_id.city_id.city_number;
      this.editSqForm.districtvalue = row.district_id.district_number;
      this.editSqForm.sqName = row.sq_name;
      this.editSqForm._id = row._id;
    },
    handleDeleteDistrict(index, row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("/api/citys/deleteDistrict", {
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
                this.getDistrict();
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
    handleDeleteSq(index, row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete("/api/citys/deleteSq", {
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
                this.getSq();
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
      this.addDistrictForm.districtName = "";
      this.addSqForm.sqName = "";
    },
    closeedit() {
      (this.editDistrictForm.districtName = ""), (this.editSqForm.sqName = "");
    },
    handleDistrictCurrentChange(value) {
      this.pageNumberDistrict=value;
      this.getDistrict()
    },
    handleSqCurrentChange(value) {
      this.pageNumberSq=value;
      this.getSq()
    }
  },
  mounted() {
    this.getCity();
    this.getDistrict();
    this.getSq();
    if (this.$route.params.district != "a0") {
      this.districtvalue = this.$route.params.district;
      this.editSqForm.districtvalue = this.$route.params.district;
      this.addSqForm.districtvalue = this.$route.params.district;
    }
  },
  watch: {
    $route(to, from) {
      this.isa = to.params.district;
      // this.city=to.params.city
      this.addDistrictForm.cityvalue=to.params.city
      this.getDistrict();
    }
  }
};
</script>

<style>
.city_select {
  width: 1.2rem;
}
.district_select {
  width: 1.2rem;
}
.district_table {
  width: 96%;
  margin: 0 auto;
}
.sq_table {
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