<template>
	<div style="width: 40%;">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="昵称">
				<el-input v-model="form.nickname"></el-input>
			</el-form-item>
			<el-form-item label="角色">
				<!-- <el-input v-model="form.role"></el-input> -->
				<el-select v-model="form.role" placeholder="请选择">
					<!-- 将id传递过去 -->
					<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码">
				<el-input v-model="form.repassword"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<!-- <el-button>取消</el-button> -->
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { ElMessage } from 'element-plus';
	export default {
		data() {
			return {
				form: {
					name: '',
					nickname: '',
					role: '',
					password: '',
					repassword: ''

				},
				options: []
			}
		},
		methods: {
			
			onSubmit() {
				
				let name = this.form.name;
				let nickname = this.form.name;
				let role = this.form.role;
				let password = this.form.password;
				let repassword = this.form.repassword;
				
				if (password == repassword) {

					this.$axios.post('/api/admin/admin/add', {
							name:name,
							nickname:nickname,
							role:role,
							password:password
						})
						.then(re => {
								
							if(re.data.code == 1){
								
								ElMessage.success('新增管理员成功');
								
								this.$router.push({name:"adminList"});
								
							}	
								
						})

				}

				console.log(this.form.role);
			},
			//获取角色列表
			getRole() {

				this.$axios.post('/api/admin/admin/getRole')
					.then(re => {
						this.options = re.data.data;
					})

			}
		},
		created() {
			this.getRole();
		}
	}
</script>

<style>

</style>
