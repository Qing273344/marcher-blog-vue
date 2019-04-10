<!-- 文章列表 -->
<template>
	<div class="article-list">

		<div class="article-list-content" v-for="site in articleListBeanList">
			<div class="article-details-link" @click="handleDetails(site.articleId)">
				<div class="article-title-info">
					<span>发布时间：</span>
					<i class="el-icon-date"></i> {{ site.timeStr }}
				</div>
				<div class="article-title">
					<span>
	          {{ site.title }}
	        </span>
				</div>
				<div class="_article-action">
					<ul class="_action-list">
						<li class="item">
							<a href="javascript:void(0)" class="title-box">
								<img data-v-276cc20d="" src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg" class="icon">
								<span data-v-276cc20d="" class="count">34</span>
							</a>
						</li>
						<li data-v-276cc20d="" st:name="commentBtn" class="item comment clickable">
							<a href="javascript:void(0)" class="title-box">
								<img  src="https://b-gold-cdn.xitu.io/v3/static/img/comment.4d5744f.svg" class="icon">
								<span  class="count">11</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
	import { ArticleListBean } from '@/bean/ArticleListBean';
	import QueryPage from '@/utils/queryPage';
	import QueryData from '@/utils/queryData';
	import PageUtil from '@/utils/pageUtil';
	import Query from '@/utils/query';
	import ArticleApi from '@/api/article';
	import { ResponseBean } from '@/bean/common/ResponseBean';
	import { Getter, State } from 'vuex-class';
	import { IMainQueryState, MainQueryModule } from '@/store/modules/mainQuery';

	@Component({
		components: {
			MainQueryModule,
		}
	})
	export default class ArticleList extends Vue {
		@State private mainQuery!: IMainQueryState;
		@Getter private GET_KEYWORD: any;

		private pageUtil: PageUtil = new PageUtil;
		private queryPage: QueryPage = new QueryPage(this.pageUtil.curPage, this.pageUtil.pageSize);
		private queryData: QueryData = new QueryData();
		private queryArgs: Query < QueryData > = new Query(this.queryData, this.queryPage);
		private responseBean: ResponseBean = new ResponseBean();

		private articleListBeanList: ArticleListBean[] = new Array < ArticleListBean > ();

		@Watch("GET_KEYWORD")
		queryByKeyword() {
			this.queryData.keyword = this.mainQuery.keyword;
			this.query();
		}

		created() {
			this.query();
		}

		query() {
			// 更新query参数
			this.queryArgs = new Query(this.queryData, this.queryPage);

			ArticleApi.query(this.queryArgs).then((response: any) => {
				this.responseBean = response.data;
				this.articleListBeanList = this.responseBean.data.list;
			})
		}

		handleDetails(articleId: string) {
			let routeUrl = this.$router.resolve({
				name: 'articleContentMainLink',
				query: {
					articleId: articleId
				}
			});
			window.open(routeUrl.href, '_blank');
		}

	}
</script>

<style lang="scss" scoped>
	.article-list {
		/*width: 790px;*/
		flex: 1;
		height: 100%;
	}
	
	.article-list-content {
		width: 100%;
		/*height: 100px;*/
		border-bottom: 1px solid rgba(178, 186, 194, .15);
		box-sizing: border-box;
		background-color: #fff;
		text-align: left;
		cursor: pointer;
		/*box-sizing: border-box;*/
		padding: 18px 24px;
		/*.article-details-link {
      padding: 18px 24px;
    }*/
		.article-title {
			height: 22px;
			margin: 12px 0;
			font-size: 18px;
			font-weight: 600;
			overflow: hidden;
			text-overflow: ellipsis;
			color: #2e3135;
			
		}
		.article-title-info {
			/*height: 26px;*/
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