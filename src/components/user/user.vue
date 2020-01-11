<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
          >
            <el-button
              @click="getUserData()"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-button @click="adduser" type="primary">添加用户</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table border stripe :data="userData" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              @change="changestatus(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#409EFF"
              inactive-color="#dcdfe6"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="edituser(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              @click="deleteUser(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
            ></el-button>
            <el-button
              @click="settingUser(scope.row)"
              type="warning"
              icon="el-icon-setting"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- dialog -->
    <el-dialog
      title="添加用户信息"
      :visible.sync="adddialogVisible"
      width="50%"
    >
      <el-form
        :model="addForm"
        :rules="addrules"
        ref="addruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adddialoguser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改dialog -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editdialogVisible"
      width="50%"
    >
      <el-form
        :model="editForm"
        :rules="editrules"
        ref="editruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editdialog">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配 -->
    <!-- 修改dialog -->
    <el-dialog
      title="分配用户信息"
      :visible.sync="settingdialogVisible"
      width="50%"
    >
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
      </div>
      <div>
        <p>当前的角色：{{ userInfo.role_name }}</p>
      </div>
      <div>
        <p>分配新角色</p>
        <el-select v-model="selectId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="settingdialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userData: [],
      total: 0,
      adddialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }]
      },
      editForm: {},
      editrules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }]
      },
      editdialogVisible: false,
      settingdialogVisible: false,
      options: [],
      selectId: '',
      userInfo: {}
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('用户列表错误')
      }
      console.log(res)
      this.userData = res.data.users
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserData()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserData()
    },
    adduser() {
      this.adddialogVisible = true
    },
    async adddialoguser() {
      const { data: res } = await this.$http.post('users', this.addForm)
      if (res.meta.status !== 201) {
        return this.$message.error('添加用户失败')
      }
      this.$message.success('添加用户成功')
      console.log(res)
      this.getUserData()
      this.adddialogVisible = false
    },
    async edituser(id) {
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户错误')
      }
      this.$message.success('查询用户成功')
      console.log(res)
      this.editForm = res.data
      this.editdialogVisible = true
    },
    editdialog() {
      this.$refs.editruleFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error('更新错误')
        }
        this.$message.success('更新成功')
        console.log(res)
        this.editdialogVisible = false
        this.getUserData()
      })
    },
    deleteUser(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          const { data: res } = await this.$http.delete('users/' + id)
          if (res.meta.status !== 200) {
            return this.$message.error('删除失败')
          }
          console.log(res)
          this.getUserData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async settingUser(role) {
      this.userInfo = role
      console.log(this.userInfo)
      const { data: res } = await this.$http.get('roles')
      this.options = res.data
      console.log(res)
      this.settingdialogVisible = true
    },
    async settingdialog() {
      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectId
        }
      )
      this.$message.success('设置角色成功')
      console.log(res)
      this.settingdialogVisible = false
      this.getUserData()
    },
    async changestatus(role) {
      console.log(role)
      const { data: res } = await this.$http.put(
        `users/${role.id}/state/${role.mg_state}`
      )
      if (res.meta.status !== 200) {
        return this.$message.error('修改状态错误')
      }
      this.$message.success('修改状态成功')
    }
  }
}
</script>
<style lang="less" scoped></style>
