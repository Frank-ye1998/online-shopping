<template>
	<view>
		<div class="top">
			<div class="sub" @tap="changeType(item)" v-for="(item,index) in top">
				{{item.name}}
			</div>
		</div>
		<div class="main">
			{{select}}
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				select: null,
				top: [{
						name: 'top1',
						id: 111
					},
					{
						name: 'top2',
						id: 222
					},
					{
						name: 'top3',
						id: 333
					},
					{
						name: 'top4',
						id: 444
					}
				],
				main: [{
					content: "内容1",
					topId: 111
				}, {
					content: "内容2",
					topId: 222
				}, {
					content: "内容3",
					topId: 333
				}, {
					content: "内容4",
					topId: 444
				}]
			};
		},
		methods: {
			changeType: function(data) {
				console.log(data);
				this.main.forEach(item => {
					if (item.topId === data.id) {
						this.select = item;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.top {
		display: flex;
		width: 100%;
		height: 60rpx;
		justify-content: space-between;

		.sub {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			border: 1px solid #333;
		}
	}
</style>
