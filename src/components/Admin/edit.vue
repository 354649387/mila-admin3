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
					<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password"></el-input>
			</el-form-item>


			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<!-- <el-button>取消</el-button> -->
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus';
	export default {
		data() {
			return {
				form: {
					id: '',
					name: '',
					nickname: '',
					role: '',
					password: '',
				},
				options: [],
			}
		},
		methods: {

			onSubmit() {
				
				
				let id = this.form.id;
				let name = this.form.name;
				let nickname = this.form.name;
				let role = this.form.role;
				let password = this.form.password;

				console.log(role);

				this.$axios.post('/api/admin/admin/update', {
						id: id,
						name: name,
						nickname: nickname,
						role: role,
						password: password
					})
					.then(re => {

						if (re.data.code == 1) {

							ElMessage.success('修改成功');

							this.$router.push({
								name: "adminList"
							});

						}

					})


				
			},
			//获取角色列表
			getRole() {

				this.$axios.post('/api/admin/admin/getRole')
					.then(re => {
						this.options = re.data.data;
					})

			},
			//通过id获取管理员
			getAdminById() {
				let id = this.$route.query.id;

				this.$axios.post('/api/admin/admin/getAdminById', {
					id: id
				}).then(re => {
					// console.log(re.data.data.role);
					let admin = re.data.data;

					this.form.id = admin.id;
					this.form.name = admin.username;
					this.form.nickname = admin.nickname;
					this.form.password = admin.password;
					this.form.role = admin.role;


				});

			}
		},
		created() {
			this.getRole();
			this.getAdminById();

		}
	}
</script>

<style>

</style>
