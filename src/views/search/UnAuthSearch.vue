<template>
	<div class="search-page main-container">
		<Loader v-if="isLoading" :isLoading="isLoading" />
		<header class="header-container">
			<div class="container desktop-view">
				<a href="/"><img src="@/assets/logo.png" alt="logo" class="" /></a>
				<div class="float-right auth-btn" id="logRegisterBtn">
					<a
							href="/login"
							class="btn btn-sm btn-secondary mr-2 signin-btn"
							id="signInButton"
					>
						Sign In
					</a>
					<a
							href="/signup"
							class="btn btn-sm btn-secondary btn-brand ml-2 signup-btn"
							id="joinNowButton"
					>
						Join Now
					</a>
				</div>
			</div>
			<div class="container mobile-view">
				<div class="header text-center">
					<a href="/"><img src="@/assets/logo.png" alt="logo" class="text-center mat-logo" /></a>
				</div>
				<div class="flex justify-content-center mt-2">
					<router-link to="/login" role="button" class="btn btn-sm signinbtn">Sign In</router-link>
					<router-link to="/signup" role="button" class="ml-3 btn btn-sm signupbtn">Join Now</router-link>
				</div>
			</div>
		</header>

		<div class="container body-container">
			<!--			<div class="d-flex justify-content-between my-4">-->
			<!--				<h4>Search Results</h4>-->
			<!--				<button-->
			<!--					@click="setSearchModalVisible"-->
			<!--					class="btn btn-sm btn-primary advanced-search-button"-->
			<!--				>-->
			<!--					<img-->
			<!--						src="@/assets/icon/Search Your Match.svg"-->
			<!--						alt="Icon"-->
			<!--						height="20px"-->
			<!--						class="advanceIcon"-->
			<!--						style="margin-bottom: 3px; margin-right: 3px"-->
			<!--					/>-->
			<!--					Advanced Search-->
			<!--				</button>-->
			<!--			</div>-->
			<div class="flex justify-content-between align-items-center my-4">
				<h5 class="search-text">Search Results</h5>
				<button
						@click="setSearchModalVisible"
						class="btn btn-primary py-2 px-4 advance-btn"
				>
					<img
							src="@/assets/icon/Search Your Match.svg"
							alt="Icon"
							height="20px"
							class="advanceIcon"
					/>
					Advanced Search
				</button>
			</div>

			<!-- TODO Advanced Search Button -->
			<div>
				<div
						class="search-result"
						style="margin-bottom: 100px"
				>
					<div v-if="updatedResult.length == 0 && !isLoading" class="text-center mt-150"  >
						<span
						><a-icon
								type="warning"
								:style="{ fontSize: '50px', color: 'red'}"
						/></span>
						<span class="fs-28 px-5" >Sorry! We did not seem to find matches according to your search criteria. </span>
						<span class="fs-28 px-5" >You may wish to modify your search criteria and try again.</span>

					</div>

					<div class="row mt-2" v-else>
						<div class="col-sm-12 col-md-6 col-lg-4" v-if="landingLoading">
							<v-sheet
									color="lighten-4"
									class="pa-3"
							>
								<v-skeleton-loader
										class="mx-auto skeleton-width"
										type="card"
								></v-skeleton-loader>
							</v-sheet>
						</div>
						<div v-for="(candidate, n) in  updatedResult" :key="n" class="col-sm-12 col-md-6 col-lg-4" v-else>
							<candidate-grid
									:candidate="candidate"
							></candidate-grid>
						</div>
					</div>
				</div>
				<!--				<div v-else class="search-result">-->
				<!--					<div v-if="result.length == 0" class="text-center">-->
				<!--						<span-->
				<!--							><a-icon-->
				<!--								type="warning"-->
				<!--								:style="{ fontSize: '50px', color: 'red' }"-->
				<!--						/></span>-->

				<!--						<span class="fs-28 px-5"-->
				<!--							>Sorry! There are no matching candidates matching your search-->
				<!--							criteria.</span-->
				<!--						>-->
				<!--					</div>-->

				<!--          <div class="row mt-2">-->
				<!--            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">-->
				<!--              <div class="row">-->
				<!--                <div v-for="(candidate, n) in  result" :key="n" class="col-sm-12 col-md-6 col-lg-4">-->
				<!--                  <candidate-grid-->
				<!--                      :candidate="candidate"-->
				<!--                  ></candidate-grid>-->
				<!--                </div>-->
				<!--              </div>-->
				<!--            </div>-->
				<!--          </div>-->
				<!--				</div>-->
			</div>

			<Observer @intersect="onIntersect"/>
		</div>
		<un-auth-search-modal
				v-model="searchModalVisible"
				@handleSearch="handleSearch"
		></un-auth-search-modal>
		<div class="footer-container">
			<Footer style="margin-top: 50px" />
		</div>
	</div>
</template>

<script>
// import CandidateGrid from "@/components/search/CandidateGrid.vue";
import UnAuthSearchModal from "@/components/search/UnAuthSearchModal.vue";
import ApiService from "../../services/api.service";
import Footer from "@/components/auth/Footer.vue";
import CandidateGrid from '@/components/search/UnauthCard.vue';
import Observer from "@/components/atom/Observer";

export default {
	props: ["url"],
	data() {
		return {
			searchModalVisible: false,
			updatedResult: [],
			landingLoading: false,
			searchResult: false,
			isLoading: false,
			pagination: {}
		};
	},
	created() {
		let pagination = {
			page: 1,
			per_page: 10
		};
		this.landingLoading = true;
		this.handleSearch(this.url, pagination);
	},
	components: {
		Footer,
		CandidateGrid,
		UnAuthSearchModal,
		Observer,
	},
	methods: {
		setSearchModalVisible() {
			this.searchModalVisible = true;
		},
		async handleSearch(payload, pagination) {
			this.isLoading = true;
			let fromModal = false;
			if(this.searchModalVisible) {
				fromModal = true;
				// this.searchModalVisible = false;
			}
			if(!pagination) {
				pagination = {
					page: 1,
					per_page: 10
				};
			}
			payload = `?page=${pagination.page}&parpage=${pagination.per_page}&` + payload;
			let _payload = `v1/home-searches${payload}`;
			await ApiService.get(_payload)
					.then((data) => {
						this.landingLoading = false;
						if(fromModal) {
							this.updatedResult = data.data.data.data;
							this.searchModalVisible = false;
						} else {
							this.updatedResult = [...this.updatedResult, ...data.data.data.data];
							this.searchModalVisible = false;
						}
						this.pagination = data.data.data.pagination;
						this.searchResult = true;
						this.searchModalVisible = false;
						this.isLoading = false;
					})
					.catch((error) => {
						console.log(error);
						console.log(error.response);
						// this.$message.error("Something went wrong");
						this.searchModalVisible = false;
						this.isLoading = false;
						// this.updatedResult = [];
					});
		},
		onIntersect() {
			let payload = {
				page: this.pagination && this.pagination.current_page ? this.pagination.current_page + 1 : 1,
				per_page: 10
			}
			if(!this.isLoading) {
				this.handleSearch(this.url, payload);
			}
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/base/_variables.scss";
.search-page {
	header {
		//height: 100px;
		background-color: $bg-secondary;
		img {
			height: 60px;
			@media (min-width: 768px) {
				height: 80px;
			}
		}

		.auth-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 30px;
			.btn-brand {
				background-color: $bg-brand;
			}
		}
	}
	.container {
		width: 100%;
		@media (min-width: 768px) {
			width: 80%;
		}
		@media (max-width: 768px) {
			width: 100%;
			margin: 0px;
		}
		.search-result {
			//display: grid;
			//grid-template-columns: auto auto;
			//margin: 0 auto;
			//grid-gap: 20px;
			//@media (max-width: 1020px) {
			//	grid-template-columns: none;
			//}
			//
			//@media (max-width: 1243px) {
			//	grid-template-columns: none;
			//}
			//
			//@media (max-width: 767px) {
			//	grid-template-columns: none;
			//}
		}
	}

	.advanced-search-button {
		padding: 5px 20px;
		margin-left: 17%;
		font-size: 15px;
		border-radius: 150px;

		@media (max-width: 769px) {
			margin-left: 10%;
		}

		@media (max-width: 518px) {
			margin-left: 3%;
		}

		@media (max-width: 445px) {
			margin-top: 105px;
			margin-bottom: -50px;
			margin-right: 100px;
			width: 100%;
			font-size: 11px;
			margin-left: -60px;
		}
	}
}

.advanceIcon {
	@media (max-width: 520px) {
		height: 15px;
	}
}
#logRegisterBtn {
	@media (max-width: 445px) {
		margin-top: 150px;
		margin-left: -170px;
	}

	@media (max-width: 359px) {
		margin-top: 100px;
		margin-left: 0px;
	}
}

#signInButton {
	@media (max-width: 445px) {
		margin-left: -300px;
		margin-bottom: 40px;
		margin-top: 40px;
	}

	@media (max-width: 359px) {
		margin-top: 80px;
		margin-bottom: 20px;
	}
}

#joinNowButton {
	@media (max-width: 359px) {
		margin-top: 50px;
		margin-bottom: 0px;
	}
	@media (max-width: 359px) {
		margin-top: 80px;
		margin-bottom: 20px;
	}
}
.signin-btn {
	&:hover {
		color: #3A3092 !important;
		background: #FFFFFF !important;
		box-shadow: none !important;
	}
}
.signup-btn {
	&:hover {
		color: $bg-brand !important;
		background: #FFFFFF !important;
		box-shadow: none !important;
	}
}
.main-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
.header-container {
	flex-shrink: 0;
}
.body-container{
	flex-grow: 1;
	overflow: auto;
	min-height: 2em;
}
.footer-container{
	flex-shrink: 0;
}
.skeleton-width {
	width: 300px;
}
.search-header-div {
	align-items: center;
	justify-content: space-between;
}
.desktop-view {
	display: none;
	@media (min-width: 768px) {
		display: block;
	}
}
.mobile-view {
	@media (min-width: 768px) {
		display: none;
	}
}
.signinbtn {
	border: 1px solid #FFFFFF;
	color: #FFFFFF;
	border-radius: 20px;
	&:hover {
		color: $color-primary;
		background: $bg-primary;
	}
}
.signupbtn {
	border: 1px solid #FFFFFF;
	color: #FFFFFF;
	background: $bg-brand;
	border-radius: 20px;
	&:hover {
		color: $color-brand;
		background: #FFFFFF;
		border: 1px solid $color-brand;
	}
}
.search-text {
	font-size: 14px;
	@media (min-width: 768px) {
		font-size: 24px;
	}
}
.advance-btn {
	font-size: 14px;
}

.mt-150 {
	margin-top: 150px;
}
</style>