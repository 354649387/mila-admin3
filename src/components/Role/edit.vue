<template>
	<el-form ref="form" :model="form" label-width="80px">
		<div style="width:20%">
			<el-form-item label="角色名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
		</div>

		<el-form-item label="路由权限">
			<el-checkbox-group v-model="checkList">

				<el-checkbox v-for="(rule,index) in rules" :label="rule.desc" name="checkList" :key="index">{{ rule.desc }}
				</el-checkbox>

			</el-checkbox-group>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="onSubmit">立即提交</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					id:'',
					name: '',
				},
				rules:[],
				checkList: [],				
			}
		},
		methods: {
			onSubmit() {
				
				
				console.log(this.checkList)
				
				let roleId = this.form.id;
				let name = this.form.name;
				//转成字符串
				let ruleId = this.checkList.toString();
				
				
							
				this.$axios.post('/api/admin/role/edit',{
					roleId:roleId,
					name:name,
					ruleId:ruleId
					
				}).then(res => {
					
					if(res.data.code == 1){
						
						this.$router.push({name:"roleList"});
						
					}
					
				});


			},
			//通过角色id获取所属的路由描述
			getRuleDescByRoleId(){
				
				this.$axios.post('/api/admin/role/getRuleDescByRoleId',{
					
					roleId:this.form.id
					
				}).then(res => {
					
					console.log(res.data.data);
					
					this.checkList = res.data.data;
					
				});
				
			},
			//获取所有路由信息
			getRule() {
			
				this.$axios.post('/api/admin/role/getRule')
					.then(re => {
			
						this.rules = re.data.data;
			
					})
			
			}


		},
		created() {

			let role = this.$route.query;
			
			this.form.id = role.id;
			this.form.name = role.name;

			this.getRule();

			this.getRuleDescByRoleId();
		}
	}
</script>

<style>

</style>
