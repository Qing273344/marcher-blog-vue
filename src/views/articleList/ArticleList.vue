<!-- 文章列表 -->
<template>
	<div class="article-list">

		<div class="article-list-content" v-for="article in articleListBeanList">
			<div class="article-details-link" @click="handleDetails(article.articleId)">
				<div class="article-title-info">
					<span>发布于：</span>
					<i>{{ article.timeStr }}</i>
				</div>
				<div class="article-title">
					<span>{{ article.title }}</span>
				</div>
				<div class="_article-action">
					<ul class="_action-list">
						<!-- 点赞 -->
						<li class="item title-box" @click.stop="handleLiked(article)">
							<div class="title-box">
								<img src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg" class="icon">
								<span class="count">{{ article.likedCount }}</span>
							</div>
						</li>
						<!-- 评论 -->
						<!--<li class="item comment clickable">-->
							<!--<div class="title-box" @click.stop="handleComment()">-->
								<!--<img src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" class="icon">-->
								<!--<span class="count">11</span>-->
							<!--</div>-->
						<!--</li>-->
					</ul>
				</div>
			</div>
		</div>

		<div class="blog-admin-table-footer">
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
	import Pagination from '@/components/pagination/pagination.vue';
	import { PageStyleEnum } from '@/commons/enums/PageStyleEnum';

	@Component({
		components: {
			MainQueryModule, Pagination,
		}
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


		@Watch("GET_KEYWORD")
		queryByKeyword() {
			console.log(this.pageUtil);
			this.queryData.keyword = this.mainQuery.keyword;
			this.query();
		}

		created() {
			this.query();
		}

		/**
		 * 点赞
		 */
		handleLiked(article: ArticleListBean) {
			const articleId = article.articleId;
			ArticleApi.liked({id: articleId}).then((response: any) => {
				article.likedCount = response.likedCount;
			});
		}

		/**
		 * query
		 */
		query() {
			// 更新query参数
			this.queryArgs = new Query(this.queryData, this.queryPage);

			ArticleApi.query(this.queryArgs).then((response: any) => {
				this.responseBean = response.data;
				this.articleListBeanList = this.responseBean.data.list;
				this.pageUtil = this.responseBean.page;
			})
		}

		/**
		 * 文章详情
		 * @param articleId		文章id
		 */
		handleDetails(articleId: string) {
			let routeUrl = this.$router.resolve({
				name: 'articleContentMainLink',
				query: {
					articleId: articleId
				}
			});
			window.open(routeUrl.href, '_blank');
		}

		changePage(pageUtil: PageUtil) {
			this.pageUtil = pageUtil;
			this.queryPage = QueryPage.change(this.pageUtil);
			this.query();
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
		border-bottom: 1px solid rgba(178, 186, 194, .15);
		box-sizing: border-box;
		background-color: #fff;
		text-align: left;
		cursor: pointer;
		padding: 18px 24px;
		margin-bottom: 15px;
		.article-title {
			/*height: 27px;*/
			margin: 8px 0;
			font-size: 22px;
			font-weight: 900;
			overflow: hidden;
			text-overflow: ellipsis;
			color: #2ca6cb;
		}
		.article-title-info {
			color: #B2BAC2;
			font-size: 12px;
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
</style>
