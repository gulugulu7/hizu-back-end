<template>
  <div>
    <nav-header></nav-header>
    <div style="width:100%;display:flex">
      <nav-side></nav-side>
        <div style="flex:1">
           <nav-breadcrumb></nav-breadcrumb>
           <router-view />
        </div>
        
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavSide from "@/components/NavSide";
import NavBreadcrumb from '@/components/NavBreadcrumb'
export default {
  components: {
    NavHeader,
    NavSide,
    NavBreadcrumb
  },
  mounted() {
    // console.log(this.$route.matched)
  },
};
</script>

<style>
</style>
