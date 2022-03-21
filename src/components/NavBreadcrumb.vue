<template>
  <div>
    <div class="admin_breadcrumb">
      <i class="el-icon-s-promotion"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path">
          <span v-if="item.meta.nojump">{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="breadcrumb_title">{{pageTitle}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: this.$route.matched[this.$route.matched.length - 1].meta.title,
      levelList: null
    };
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta.title);
      const first = matched[0];
      if (first && first.meta.title !== "主页") {
        matched = [{ path: "/index", meta: { title: "主页" } }].concat(matched);
      }
      this.levelList = matched;
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
      this.pageTitle=this.$route.matched[this.$route.matched.length - 1].meta.title
    }
  }
};
</script>

<style>
.admin_breadcrumb {
  width: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: solid 0.01rem #e5e5e5;
}
.admin_breadcrumb > div {
  padding: 0.14rem 0;
}
.admin_breadcrumb > i {
  font-size: 0.2rem;
  color: #555555;
  padding: 0 0.12rem;
}
.admin_breadcrumb .el-breadcrumb__inner a {
  color: #438eb9;
}
</style>

<style scoped>
.breadcrumb_title{
  /* background: red; */
  margin:0 0.16rem;
  padding: 0.16rem 0;
  border-bottom :0.01rem #E2E2E2 dotted;
  color: #2679b5;
  font-size: 0.2rem;
}
</style>