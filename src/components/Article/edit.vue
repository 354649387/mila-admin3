<template>
	<div>
		<el-form ref="form" :model="article" label-width="80px">
			<div style="width: 60%;float: left;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
				<el-form-item label="所属栏目">
					<el-select v-model="article.categorys" placeholder="选择文章所属栏目">
						<el-option v-for="art in category" :key="art.id" :label="art.name" :value="art.id" v-html="art.name">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="标题">
					<el-input v-model="article.title"></el-input>
				</el-form-item>

				<el-form-item label="关键词">
					<el-input v-model="article.keywords"></el-input>
				</el-form-item>

				<el-form-item label="描述">
					<el-input v-model="article.desc"></el-input>
				</el-form-item>

				<el-form-item label="内容">
					<vue-ueditor-wrap v-model="content" :config="myConfig" editor-id="editor-id"></vue-ueditor-wrap>
				</el-form-item>


			</div>
			<div
				style="width: 38%;float: right;margin-left:2%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">


				<el-form-item label="缩略图">
					<el-upload class="avatar-uploader" action="/api/admin/upload/elementUploadImg"
						:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="article.img" :src="article.img" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item>

					<!-- <el-button>取消</el-button> -->

					<el-button type="primary" @click="onSubmit">立即提交</el-button>

				</el-form-item>
			</div>
		</el-form>


	</div>

</template>

<script>
	import {ElMessage} from 'element-plus';
	export default {
		data() {
			return {
				article: {
					id:'',
					title: '',
					img: '',
					keywords: '',
					desc: '',
					categorys: '',

				},
				category: [],
				content: '',
				myConfig: {
					// 编辑器不自动被内容撑高
					autoHeightEnabled: false,
					// 初始容器高度
					initialFrameHeight: 340,
					// 初始容器宽度
					initialFrameWidth: '100%',
					UEDITOR_HOME_URL: '/UEditor/',
					serverUrl: '/api/admin/upload/ueditorUpload'
				},
				imgUrl:''
			}
		},
		methods: {
			onSubmit() {
				
				this.$axios.post('/api/admin/article/edit',{
					id:this.article.id,
					title:this.article.title,
					img:this.article.img,
					keyword:this.article.keywords,
					desc:this.article.desc,
					category_id:this.article.categorys,
					content:this.content,
				}).then(re => {
					
					if(re.data.code == 1){
						
						ElMessage.success('修改文章成功');
						
						this.$router.push({name:"articleList"});
						
					}
					
				});


			},
			handleAvatarSuccess(res) {
				
				this.imgUrl = res.data.img_url;
				
				this.article.img = this.imgUrl;
				
				// this.article.img = URL.createObjectURL(file.raw);
				
			},
			beforeAvatarUpload(file) {
				const isType1 = file.type === 'image/png' || 'image/jpg' || 'image/jif' || 'image/pjpeg' || 'image/bmp' || 'image/x-png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isType1) {
					this.$message.error('图片格式不正确!');
				}
				if (!isLt2M) {
					this.$message.error('图片大小不能超过 2MB!');
				}
				return isType1 && isLt2M;
			},
			//获取栏目列表
			getCategory(){
				
				this.$axios.post('/api/admin/category/categorys')
				.then(re => {
					
					if(re.data.code === 1){
						
						this.category = re.data.data;
						
					}
					
				});
				
			},
			//根据id获取详情
			getDefaultById(){
				
				let id = this.$route.query.id;
				
				this.$axios.post('/api/admin/article/getDefaultById',{
					id:id
				}).then(re => {
					this.article.id = re.data.data.id,
					this.article.title = re.data.data.title;
					this.article.desc = re.data.data.desc;
					this.article.keywords = re.data.data.keyword;
					this.article.img = re.data.data.img;
					this.content = re.data.data.content;
					this.article.categorys = re.data.data.category_id;
				});
			}
		},
		created() {
			
			this.getCategory();
			this.getDefaultById();
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	#editor-id {

		line-height: 1;

	}
</style>
