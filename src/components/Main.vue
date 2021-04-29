<template>
	<el-container style="border: 1px solid #eee">

		<el-aside style="background-color: rgb(238, 241, 246);height: 100vh;width: 12vw;">
			
			<div class="admin_logo">
				<h1>后台管理系统</h1>
			</div>

			<el-menu style="border-right: none;background-color: rgb(238, 241, 246);">

				<el-submenu index="1">
					<template #title><i class="el-icon-message"></i>管理员管理</template>
					<el-menu-item-group>
						<el-menu-item index="1-1">
							<router-link to="/main/adminList">管理员列表</router-link>
						</el-menu-item>
						<el-menu-item index="1-2">
							<router-link to="/main/ruleList">路由列表</router-link>
						</el-menu-item>
						<el-menu-item index="1-3">
							<router-link to="/main/roleList">角色列表</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template #title><i class="el-icon-menu"></i>栏目管理</template>
					<el-menu-item-group>
						<el-menu-item index="2-1">
							<router-link to="/main/categoryList">栏目列表</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template #title><i class="el-icon-menu"></i>文章管理</template>
					<el-menu-item-group>
						<el-menu-item index="3-1">
							<router-link to="/main/articleList">文章列表</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>


			</el-menu>
		</el-aside>

		<el-container>
			<el-header style="text-align: right; font-size: 12px">
				<el-dropdown>
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>查看</el-dropdown-item>
							<el-dropdown-item>新增</el-dropdown-item>
							<el-dropdown-item>删除</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<span>mila</span>
			</el-header>

			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	};
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
		
		
		
	.el-menu-item a {
		color: #303133;
		text-decoration: none;
	}
	.admin_logo{
		height: 60px;
		text-align: center;
		line-height: 60px;
		background-color: #606266;
	}
	.admin_logo h1{
		margin: 0 auto;
	}
</style>
