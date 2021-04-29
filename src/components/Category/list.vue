<template>
	<el-button type="primary" @click="dialogFormVisible = true">新增</el-button>

	<el-dialog title="新增顶级栏目" v-model="dialogFormVisible" @close="resetFrom()">
		<el-form :model="form">
			<el-form-item label="栏目名称" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addTopCategory()">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	
	<el-dialog title="新增子栏目" v-model="dialogFormVisible1" @close="resetFrom()">
		<el-form :model="form1">
			<el-form-item label="栏目名称" :label-width="formLabelWidth">
				<el-input v-model="form1.name" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="addSonCategory()">确 定</el-button>
			</span>
		</template>
	</el-dialog>

	<el-table :data="tableData" stripe row-key="id" :tree-props="{children:'children'}" style="width: 100%">
		<el-table-column prop="id" label="id" width="180" type="">
		</el-table-column>
		<el-table-column prop="name" label="名称" width="180">
		</el-table-column>

		<el-table-column label="操作" width="280">
			<template #default="scope">
				<el-button type="primary" size="mini" @click="getPid(scope.row)">添加子分类</el-button>
				<el-button type="warning" size="mini" @click="updateCategory(scope.row)">编辑</el-button>
				<el-button type="danger" size="mini" @click="deleteCategory(scope.$index, scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>


</template>

<script>
	import {
		ElMessage
	} from 'element-plus';
	export default {
		data() {
			return {
				tableData: [],
				dialogFormVisible: false,
				dialogFormVisible1: false,
				form: {
					name: '',
				},
				form1: {
					pid:'',
					name: '',
				},
				formLabelWidth: '120px'
			}
		},
		methods: {

			getCategory() {
				const that = this
				//弄明白前端如何设置跨域
				this.$axios.get('http://tests.com/admin/category/lists')
					.then(function(response) {
						//then方法里面不能使用this 函数里面使用this代表的是函数本身，所以无法访问外部的变量
						//函数外部定义const that = this来代替this 或者将then这种函数改成箭头函数例如getCategory1

						that.tableData = response.data

					})
					.catch(function(error) {
						
						console.log(error)
						
					});

			},
			// getCategory1(){

			// 	this.$axios.get('http://tests.com/category')
			//箭头函数不会创建自己的this，只会继承上层的this
			// 	.then(response => {

			// 		console.log(response)

			// 		this.tableData = response.data

			// 	})
			// 	.catch(error => {

			// 		console.log(error)

			// 	})

			// },
			resetFrom() {
				//关闭和取消弹窗将name字段重置为空
				this.form.name = '',
				this.form1.name = ''

			},
			//新增顶级栏目
			addTopCategory() {

				this.$axios.post('/api/admin/category/addTopCategory', {
						name: this.form.name
					})
					.then(() => {
						//关闭弹窗，重新请求数据填充
						this.dialogFormVisible = false
						this.getCategory()

					})
					.catch(error => {
						console.log(error)
					})

			},
			//删除栏目
			//如何将当前条的id传递过来
			deleteCategory(index, row) {

				console.log(index, row);

				this.$confirm('确定删除该栏目吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					// center: true
				}).then(() => {

					this.$axios.post('/api/admin/category/deleteCategory', {

							id: row.id

						})
						.then(res => {

							if (res.data.code == 1) {

								this.$message({
									type: 'success',
									message: '删除成功!'
								});

								this.getCategory()

							}

						})
						.catch(() => {

							ElMessage.error('删除失败')

						})



				}).catch(() => {
					this.$message({
						type: 'warning',
						message: '已取消删除'
					});
				});
				
			},
			//得到当前栏目的父类栏目id
			getPid(row){
				
				
				this.form1.pid = row.id;
				
				this.dialogFormVisible1 = true;
				
				
			},
			//添加子类栏目
			addSonCategory(){
						
				this.$axios.post('/api/admin/category/addSonCategory',{
					
					pid:this.form1.pid,
					name:this.form1.name
					
				})
				.then(() => {
					
					//关闭弹窗，重新请求数据填充
					this.dialogFormVisible1 = false
					this.getCategory()
					
				})
				.catch(() => {
					
				});
				
				
			},
			//跳转编辑栏目并传参
			updateCategory(row){
				
				this.$router.push({name:"categoryEdit",query:{id:row.id,name:row.name}});
				
			}
				


		},
		created() {
			this.getCategory()
		}
	}
</script>

<style>
	.demo-form-inline {
		float: right;
	}

	.el-table__expand-icon .el-icon-arrow-right:before {
		content: "\e723";
	}
</style>
