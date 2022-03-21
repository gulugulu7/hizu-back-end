<template>
  <div class="nav_side">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#f9f9f9"
      :router="true"
    >
     <el-menu-item index="1" :route="{name:'Index'}">
        <i class="el-icon-mouse"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-submenu index="2" :disabled=disabled>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>城市管理</span>
        </template>
        <el-menu-item
          index="2-1"
          :route="{name:'Areamgt',params:{city:this.$store.state.city,district:'a0'}}"
        >区域管理</el-menu-item>
        <el-menu-item
          index="2-3"
          :route="{name:'Subwaymgt',params:{city:this.$store.state.city,subwayLine:'a0'}}"
        >地铁管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" :route="{name:'Housemgt'}">
        <i class="el-icon-school"></i>
        <span slot="title">房源管理</span>
      </el-menu-item>
      <el-menu-item index="4" :route="{name:'Usermgt'}" :disabled=disabled>
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="5" :route="{name:'Promotionmgt'}" :disabled=disabled>
        <i class="el-icon-shopping-cart-1"></i>
        <span slot="title">推广管理</span>
      </el-menu-item>
      <el-menu-item index="6" :route="{name:'Appointmentmgt'}" :disabled=disabled>
        <i class="el-icon-thumb"></i>
        <span slot="title">预约管理</span>
      </el-menu-item>
        <el-menu-item index="7" :route="{name:'Reportmgt'}">
        <i class="el-icon-paperclip"></i>
        <span slot="title">举报管理</span>
      </el-menu-item>
    </el-menu>
    <div class="fold" :class="[isCollapse?'yesfold':'nofold']">
      <p></p>
      <i
        :class="[isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'] "
        @click="isCollapse=! isCollapse"
      ></i>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      disabled:false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    if(window.sessionStorage.getItem('role')==2){
      this.disabled=true
    }
  },
};
</script>

<style scoped>
.fold {
  border-bottom: solid 0.01rem #e0e0e0;
}
.fold i {
  color: #bbbbbb;
  font-size: 0.14rem;
  border-radius: 50%;
  background: white;
  border: solid 0.01rem #bbbbbb;
  margin: 0.1rem 0;
}
.nofold {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nofold p {
  width: 0.74rem;
  height: 0.01rem;
  background-color: #e0e0e0;
}
.nofold > p:first-child {
  margin-left: 0.18rem;
}
.nofold > p:last-child {
  margin-right: 0.18rem;
}
.yesfold {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.yesfold i {
  margin-left: 0.24rem;
}
</style>

<style>
.nav_side {
  background-color: #f2f2f2;
  border-right: solid #cccccc 0.01rem;
}
.nav_side > ul > li {
  border-bottom: solid 0.01rem #e5e5e5;
}
.nav_side > ul {
  border-right: none;
}
</style>