<!-- 文章列表 -->
<template>
	<div class="article-list">

		<div class="article-list-content" v-for="article in articleListBeanList">
			<span class="cool-span left"></span>
			<span class="cool-span top"></span>
			<span class="cool-span right"></span>
			<span class="cool-span bottom"></span>

			<div class="article-details-link" @click="handleDetails(article.articleId)">
				<div class="article-title">
					<span>{{ article.title }}</span>
				</div>
				<div class="article-info">
					<span>发布于：</span>
					<i>{{ article.timeStr }}</i>
				</div>
				<!--<div class="_article-action">-->
					<!--<ul class="_action-list">-->
						<!--&lt;!&ndash; 点赞 &ndash;&gt;-->
						<!--<li class="item title-box" @click.stop="handleLiked(article)">-->
							<!--<div class="title-box">-->
								<!--<img src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg" class="icon">-->
								<!--<span class="count">{{ article.likedCount }}</span>-->
							<!--</div>-->
						<!--</li>-->
						<!--&lt;!&ndash; 评论 &ndash;&gt;-->
						<!--<li class="item comment clickable">-->
							<!--<div class="title-box" @click.stop="handleComment()">-->
								<!--<img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" class="icon">-->
								<!--<span class="count">11</span>-->
							<!--</div>-->
						<!--</li>-->
					<!--</ul>-->
				<!--</div>-->
			</div>
		</div>

		<div v-if="isPaging" class="blog-admin-table-footer">
			<Pagination :pageUtil="pageUtil" @changePage="changePage"></Pagination>
		</div>

	</div>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from "vue-property-decorator";
	import { ArticleListBean } from "@/bean/ArticleListBean";
	import QueryPage from "@/utils/queryPage";
	import QueryData from "@/utils/queryData";
	import PageUtil from "@/utils/pageUtil";
	import Query from "@/utils/query";
	import ArticleApi from "@/api/article";
	import { ResponseBean } from "@/bean/common/ResponseBean";
	import { Getter, State } from "vuex-class";
	import { IMainQueryState, MainQueryModule } from "@/store/modules/mainQuery";
	import Pagination from "@/components/pagination/pagination.vue";
	import { PageStyleEnum } from "@/commons/enums/PageStyleEnum";

	@Component({
		components: {
			MainQueryModule, Pagination,
		},
	})
	export default class ArticleList extends Vue {
		@State private mainQuery!: IMainQueryState;
		@Getter private GET_KEYWORD: any;

		private pageUtil: PageUtil = new PageUtil(PageStyleEnum.SIMPL_LAYOUT);
		private queryPage: QueryPage = new QueryPage();
		private queryData: QueryData = new QueryData();
		private queryArgs: Query < QueryData > = new Query(this.queryData, this.queryPage);
		private responseBean: ResponseBean = new ResponseBean();

		private articleListBeanList: ArticleListBean[] = new Array < ArticleListBean > ();

		/**
		 * 是否需要分页
		 */
		get isPaging() {
			return 1 < this.pageUtil.totalRow / this.pageUtil.pageSize;

		}

		@Watch("GET_KEYWORD")
		private queryByKeyword() {
			this.queryData.keyword = this.mainQuery.keyword;
			this.query();
		}

		private created() {
			this.query();
		}

		/**
		 * 点赞
		 */
		private handleLiked(article: ArticleListBean) {
			const articleId = article.articleId;
			ArticleApi.liked({id: articleId}).then((response: any) => {
				article.likedCount = response.likedCount;
			});
		}

		/**
		 * query
		 */
		private query() {
			// 更新query参数
			this.queryArgs = new Query(this.queryData, this.queryPage);

			ArticleApi.query(this.queryArgs).then((response: any) => {
				this.responseBean = response.data;
				this.articleListBeanList = this.responseBean.data.list;
				this.pageUtil = this.responseBean.page;
				this.pageUtil.pageStyle = PageStyleEnum.SIMPL_LAYOUT;
			})
		}

		/**
		 * 文章详情
		 * @param articleId		文章id
		 */
		private handleDetails(articleId: string) {
			const routeUrl = this.$router.resolve({
				name: 'articleContentMainLink',
				query: {
					articleId: articleId
				}
			});
			window.open(routeUrl.href, '_blank');
		}

		private changePage(pageUtil: PageUtil) {
			this.pageUtil = pageUtil;
			this.queryPage = QueryPage.change(this.pageUtil);
			this.query();
			(document as any).body.querySelector('.blog-home section').scrollTop = 0;
		}

	}
</script>

<style lang="scss" scoped>

	.article-list {
		flex: 1;
		height: 100%;
	}
	
	.article-list-content {
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		text-align: left;
		cursor: pointer;
		padding: 18px 24px;
		margin-bottom: 15px;

		.article-title {
			margin: 8px 0;
			font-size: 26px;
			font-weight: 900;
			overflow: hidden;
			text-overflow: ellipsis;
			color: #2ca6cb;
		}
		.article-info {
			color: #B2BAC2;
			font-size: 14px;
			font-style: italic;
			font-family: Lora,'Times New Roman',serif;
		}
		._article-action {
			height: 26px;
			width: 100%;
			._action-list {
				padding: 0;
				margin: 0;
				display: inline-flex;
				white-space: nowrap;
				.item {
					display: flex;
					align-items: center;
					justify-content: center;
					position: relative;
					padding: 0 8px;
					height: 24px;
					font-size: 12px;
					line-height: 1;
					white-space: nowrap;
					color: #b2bac2;
					border-radius: 1px;
					border: 1px solid #edeeef;
					.title-box {
						display: flex;
						align-items: center;
						padding: 0 8px;
						height: 100%;
						text-decoration: none;
						img {
							width: auto;
							height: auto;
						}
						.count {
							color: #b2bac2;
							margin-left: 2px;
							font-weight: 700;
						}
					}
				}
			}
		}
	}


	/* div 边宽动画效果 */
	.article-list-content {
		width: 820px;
		height: 114px;
		position: relative;
		border: 2px solid #7EBADF;
	}

	.cool-span {
		position: absolute;
		z-index: 111;
		background: #fff;
	}

	.article-list-content .left{
		left: -2px;
		top: -2px;
		width: 2px;
		height: 114px;
	}

	.article-list-content .top{
		right: 0;
		top: -2px;
		width: 818px;
		height: 2px;
	}
	.article-list-content .right{
		right: -2px;
		bottom: -2px;
		width: 2px;
		height: 114px;
	}
	.article-list-content .bottom{
		left: 0;
		top: 110px;
		width: 818px;
		height: 2px;
	}

	.article-list-content:hover .bottom{
		animation:animateBottom 0.5s linear 0s;
		animation-fill-mode:forwards;
	}
	.article-list-content:hover .left{
		animation:animateLeft 0.5s linear 0s;
		animation-fill-mode:forwards;
	}
	.article-list-content:hover .top{
		animation:animateTop 0.5s linear 0s;
		animation-fill-mode:forwards;
	}
	.article-list-content:hover .right{
		animation:animateRight 0.5s linear 0s;
		animation-fill-mode:forwards;
	}

	@keyframes animateLeft{
		form{
			height:114px;
		}
		to{
			height:0;
		}
	}
	@keyframes animateTop{
		form{
			width:820px;
		}
		to{
			width:0;
		}
	}
	@keyframes animateRight{
		form{
			height:114px;
		}
		to{
			height:0;
		}
	}
	@keyframes animateBottom{
		form{
			width:820px;
		}
		to{
			width:0;
		}
	}
</style>
