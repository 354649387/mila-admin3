<template>

	<div style="margin-bottom: 25px;">
		<el-button type="primary" @click="addRule()">新增</el-button>
	</div>

	<el-table :data="tableData" border style="width: 100%">
		<el-table-column prop="id" label="ID" width="80">
		</el-table-column>
		<el-table-column prop="path" label="路由规则" width="250">
		</el-table-column>
		<el-table-column prop="desc" label="路由描述" width="250">
		</el-table-column>
		<el-table-column prop="created_at" label="创建时间" width="250">
		</el-table-column>
		<el-table-column prop="updated_at" label="更新时间" width="250">
		</el-table-column>

		<el-table-column label="操作">
			<template #default="scope">
				<el-button type="primary" @click="edit(scope.row)">编辑</el-button>
				<el-button type="warning" @click="deleteRule(scope.row)">删除</el-button>
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
			//新增路由规则
			addRule() {

				this.$router.push({
					name: "ruleAdd"
				});

			},
			//获取路由
			getRule() {

				this.$axios.post('/api/admin/rule/getRule')
					.then(re => {

						this.tableData = re.data.data;

					});

			},
			//编辑
			edit(row) {

				this.$router.push({
					name: "ruleEdit",
					query: {
						id:row.id,
						path: row.path,
						desc: row.desc
					}
				})

			},
			//删除
			deleteRule(row){
				
			
				
				this.$confirm('确定删除该路由吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					// center: true
				}).then(() => {
				
					this.$axios.post('/api/admin/rule/delete', {
				
							id: row.id
				
						})
						.then(res => {
				
							if (res.data.code == 1) {
				
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
				
								this.getRule();
				
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
			this.getRule();
		}
	}
</script>

<style>

</style>
