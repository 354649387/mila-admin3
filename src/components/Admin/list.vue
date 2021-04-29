<template>
	<el-button type="primary" @click="addAdmin">新增管理员</el-button>
	<el-table :data="tableData" stripe style="width: 100%">
		<el-table-column prop="id" label="ID" width="120">
		</el-table-column>
		<el-table-column prop="username" label="用户名" width="120">
		</el-table-column>
		<el-table-column prop="status" label="状态" width="120">
			
			<template #default="scope">
				<el-tag v-if="scope.row.status == 0" effect="success">
					正常
				</el-tag>
				<el-tag v-if="scope.row.status == 2" effect="danger">
					禁用
				</el-tag>
			</template>
			
		</el-table-column>

		
		<el-table-column prop="role" label="角色" width="120">
		</el-table-column>
		<el-table-column prop="nickname" label="昵称" width="120">
		</el-table-column>
		<el-table-column prop="created_at" label="创建时间" width="200">
		</el-table-column>
		<el-table-column prop="last_login_time" label="上次登陆时间" width="200">
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
				<el-button v-if="scope.row.status == 0" size="small" type="warning" @click="disable(scope.row)">禁用
				</el-button>
				<el-button v-if="scope.row.status == 2" size="small" type="warning" @click="enable(scope.row)">启用
				</el-button>
				<el-button size="small" type="danger" @click="deleteAdmin(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>

</template>

<script>
	// import {ElMessage} from 'element-plus';
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		methods: {
			addAdmin() {
				this.$router.push({
					name: "adminAdd"
				});
			},
			getAdmin() {

				this.$axios.post('/api/admin/admin/lists')
					.then(re => {
						this.tableData = re.data.data;
						console.log(re.data)

					});

			},
			//编辑
			edit(row) {

				this.$router.push({
					name: "adminEdit",
					query: {
						id: row.id
					}
				});

			},
			//禁用
			disable(row) {



				this.$axios.post('/api/admin/admin/disable', {
						id: row.id
					})
					.then(re => {

						if (re.data.code == 1) {

							this.getAdmin();

						}

					});


			},
			//启用
			enable(row) {



				this.$axios.post('/api/admin/admin/enable', {
						id: row.id
					})
					.then(re => {

						if (re.data.code == 1) {

							this.getAdmin();

						}

					});


			},
			//删除管理员
			deleteAdmin(row) {

				this.$confirm('确定删除该管理员吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					// center: true
				}).then(() => {

					this.$axios.post('/api/admin/admin/delete', {

							id: row.id

						})
						.then(res => {

							if (res.data.code == 1) {

								this.$message({
									type: 'success',
									message: '删除成功!'
								});

								this.getAdmin()

							}

						})
						.catch(() => {

							// ElMessage.error('删除失败')

						})



				}).catch(() => {
					this.$message({
						type: 'warning',
						message: '已取消删除'
					});
				});

			}
		},
		created() {
			this.getAdmin();
		}
	}
</script>

<style>

</style>
