<template>
	<el-form ref="form" :model="form" label-width="80px" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 20px;">
		<div style="width: 30%;">
			<el-form-item label="路由描述">
				<el-input v-model="form.desc"></el-input>
			</el-form-item>
			
			<el-form-item label="路由规则">
				<el-input v-model="form.path"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
			</el-form-item>
		</div>
	</el-form>
</template>

<script>
	
	import {
		ElMessage
	} from 'element-plus';
	
	export default {
		data() {
			return {
				form: {
					desc:'',
					path:''
				}
			}
		},
		methods: {
			onSubmit() {
				let path = this.form.path;
				let desc = this.form.desc;
			
				this.$axios.post('/api/admin/rule/add',{
				
					path:path,
					desc:desc
					
				})
				.then(res => {
					
					if(res.data.code === 2){
						
						ElMessage.error('新增失败');
						
					}else{
						
						this.$router.push({name:"ruleList"});
						
					}
					
				});
				
			}
		}
	}
</script>

<style>

</style>
