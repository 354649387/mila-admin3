<template>
	<el-form ref="form" :model="form" label-width="80px">
		<div style="width:20%">
			<el-form-item label="角色名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		</div>

		<el-form-item label="路由权限">
			<el-checkbox-group v-model="form.type">

				<el-checkbox v-for="(rule,index) in rules" :label="rule.id" name="type" :key="index">{{ rule.desc }}
				</el-checkbox>

			</el-checkbox-group>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					type: [],
				},
				rules: []
			}
		},
		methods: {
			onSubmit() {
				
				let name = this.form.name;
				//转成字符串
				let ruleId = this.form.type.toString();
							
				this.$axios.post('/api/admin/role/add',{
				
					name:name,
					ruleId:ruleId
					
				}).then(res => {
	
					if(res.data.code == 1){
						
						this.$router.push({name:"roleList"});
						
					}
					
				});

			},
			getRule() {

				this.$axios.post('/api/admin/role/getRule')
					.then(re => {

						this.rules = re.data.data;

					})

			}
		},
		created() {
			this.getRule();
		}
	}
</script>

<style>

</style>
