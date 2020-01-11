<template>
  <div>
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <div>
          <img src="../assets/heima.png" alt />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle_button" @click="toggleCollpse">| | |</div>
          <el-menu
            :collapse-transition="false"
            :collapse="isCollapse"
            unique-opened
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#fff"
            router
            :default-active="activePath"
          >
            <!-- 一级 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in asideList"
              :key="item.id"
            >
              <template slot="title">
                <i :class="iconList[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>

              <!-- 二级 -->
              <el-menu-item
                :index="'/' + item2.path"
                v-for="item2 in item.children"
                :key="item2.id"
                @click="savaNavState('/' + item2.path)"
                ><template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ item2.authName }}</span>
                </template></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 主体 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 左侧菜单列表
      asideList: {},
      activePath: '',
      // 左侧字体图标
      iconList: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否折叠 不折叠
      isCollapse: false
    }
  },
  created() {
    this.getAsideList()
    this.activePath = window.sessionStorage.getItem('activepath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getAsideList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error('获取左侧菜单失败')
      }
      console.log(res)
      this.asideList = res.data
    },
    // 是否折叠
    toggleCollpse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活状态
    savaNavState(activepath) {
      window.sessionStorage.setItem('activepath', activepath)
      this.activePath = activepath
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #ec7a46;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #689a99;
  color: #fff;
  height: 600px;
  span {
    margin-left: 15px;
  }
  .el-menu {
    border-right: none;
    background-color: #fff !important;
  }
}

.el-main {
  background-color: #f0b200;
  color: red;
}
.toggle_button {
  text-align: center;
}

</style>
