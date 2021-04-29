<template>

	<div style="margin-bottom: 25px;">
		<el-button type="primary" @click="addRole()">新增</el-button>
	</div>

	<el-table :data="tableData" border style="width: 100%">
		
		
		<el-table-column prop="id" label="ID" width="80">
		</el-table-column>
		<el-table-column prop="name" label="角色名称" width="250">
		</el-table-column>
		<el-table-column prop="rules" label="路由id" width="250">
		</el-table-column>


		<el-table-column label="操作">
			<template #default="scope">
				<el-button type="primary" @click="edit(scope.row)">编辑</el-button>
				<el-button type="warning" @click="deleteRole(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>

</template>

<script>
	// import { ElMessage } from 'element-plus';
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		methods: {
			//新增角色
			addRole() {

				this.$router.push({
					name: "roleAdd"
				});

			},
			//获取路由
			getRole() {

				this.$axios.post('/api/admin/role/getRole')
					.then(re => {

						this.tableData = re.data.data;

					});

			},
			//编辑
			edit(row) {

				this.$router.push({
					name: "roleEdit",
					query: {
						id:row.id,
						name: row.name,
						rules: row.rules
					}
				})

			},
			//删除
			deleteRole(row){
				
			
				
				this.$confirm('确定删除该路由吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					// center: true
				}).then(() => {
				
					this.$axios.post('/api/admin/role/delete', {
				
							id: row.id
				
						})
						.then(res => {
				
							if (res.data.code == 1) {
				
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
				
								this.getRole();
				
							}else{
								
								this.$message({
									type: 'error',
									message: '删除失败!'
								});
								
							}
				
						})
						.catch(() => {
				
							
				
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
			this.getRole();
		}
	}
</script>

<style>

</style>
