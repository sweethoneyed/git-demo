<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table :data="rolesList" border stripe style="width: 100%">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <!-- <pre>
              {{ scope.row }}
            </pre> -->
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editUsers(scope.row)"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              @click="showSetDialog(scope.row)"
              size="mini"
              type="warning"
              icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 点击编辑按钮弹出框 -->
    <el-dialog title="编辑" :visible.sync="editRolesdialogVisible" width="50%">
      <!-- 内容主体 -->
      <el-form
        :model="editruleForm"
        :rules="editrules"
        ref="editruleFormRef"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRolesdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRolesDialog">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配按钮 -->
    <el-dialog title="分配权限" :visible.sync="showdialogVisible" width="50%">
      <el-tree
        :data="showTreeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="showdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取数据
      rolesList: [],
      showSetDialogVisible: false,
      // 添加角色框
      AddRolesdialogVisible: false,
      // 添加角色属性
      AddruleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 添加角色验证规则
      Addrules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      // 编辑角色和验证
      editRolesdialogVisible: false,
      editruleForm: {},
      editrules: {
        editroleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        editroleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      showdialogVisible: false,
      showTreeData: [
        {
          label: '一级 1',
          children: 'children'
        }
      ],
      defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 通过axios获取数据
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      }
      this.rolesList = res.data
    },
    async editUsers(role) {
      const { data: res } = await this.$http.get('roles/' + role.id)
      console.log(res)
      this.editruleForm = res.data
      this.editRolesdialogVisible = true
    },
    async editRolesDialog() {
      const { data: res } = await this.$http.put(
        'roles/' + this.editruleForm.roleId,
        {
          roleName: this.editruleForm.roleName,
          roleDesc: this.editruleForm.roleDesc
        }
      )
      console.log(res)
      this.$message.success('更新成功')
      this.editRolesdialogVisible = false
      this.getRolesList()
    },
    async showSetDialog(role) {
      const { data: res } = await this.$http.get('roles/')
      console.log(res)
      this.showTreeData = res.data
      this.showdialogVisible = true
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped></style>
