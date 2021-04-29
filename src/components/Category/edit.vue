<template>
	<el-form ref="form" :model="form" label-width="auto">

		<el-form-item label="栏目ID">
			<el-col :span="8">
				<el-input v-model="form.id" disabled></el-input>
			</el-col>
		</el-form-item>

		<el-form-item label="栏目名称">
			<el-col :span="8">
				<el-input v-model="form.name"></el-input>
			</el-col>
		</el-form-item>

		<el-form-item>

			<el-button>取消</el-button>
			<el-button type="primary" @click="onSubmit">更新</el-button>

		</el-form-item>

	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					id: '',
					name: '',
				}
			}
		},
		methods: {

			getEditInfo() {

				let item = this.$route.query;

				this.form.id = item.id;
				this.form.name = item.name;

			},
			onSubmit() {

				this.$axios.post('/api/admin/category/update', {
						id: this.form.id,
						name: this.form.name
					})
					.then((re) => {

						if (re.data.code == 1) {

							this.$router.push({
								name: "categoryList"
							});

						}

					})
					.catch(() => {

					});
			}
		},
		created() {
			this.getEditInfo();
		}
	}
</script>

<style scoped>
	form{box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 50px;}
</style>
