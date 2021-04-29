<template>
	<el-button type="primary" @click="addArticle()">新增</el-button>
	<el-table :data="tableData" stripe style="width: 100%">
		<el-table-column prop="id" label="ID" width="180">
		</el-table-column>
		<el-table-column prop="title" label="标题">
		</el-table-column>
		<el-table-column prop="category_id" label="分类">
		</el-table-column>
		<el-table-column prop="status" label="状态">
		</el-table-column>
		<el-table-column prop="admin_id" label="创建人">
		</el-table-column>
		<el-table-column prop="created_at" label="创建时间">
		</el-table-column>
		<el-table-column prop="updated_at" label="更新时间">
		</el-table-column>
		<el-table-column label="操作">
			<template #default="scope">
				<el-button type="primary" @click="edit(scope.row)">编辑</el-button>
				<el-button type="danger" @click="deleteArticle(scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>

</template>

<script>
	export default {
		data() {
			return {
				tableData: []
			}
		},
		methods:{
			//新增文章
			addArticle(){
				
				this.$router.push({name:'articleAdd'});
				
			},
			//获取文章列表
			getList(){
				
				this.$axios.post('/api/admin/article/list')
				.then(re => {
					this.tableData = re.data.data;
					console.log(re.data)
				});
				
			},
			//删除文章
			deleteArticle(row) {
			
				this.$confirm('确定删除该文章吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					// center: true
				}).then(() => {
			
					this.$axios.post('/api/admin/article/delete', {
			
							id: row.id
			
						})
						.then(res => {
			
							if (res.data.code == 1) {
			
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
			
								this.getList()
			
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
			
			},
			//编辑
			edit(row) {
			
				this.$router.push({
					name: "articleEdit",
					query: {
						id: row.id
					}
				});
			
			},
		},
		
		created() {
			this.getList();
		}
	}
</script>

<style>

</style>
