<template>
	<div class="card-input">
		<div v-if="!this.payment_method" class="card-input form-group">
			<div class="form-group mt-3">
				<label for="name" class="text-white ml-2">Name on Card</label>
				<input
					type="text"
					id="name"
					class="w-100 py-2 px-4 bg-white form-control input-round fs-14"
					v-model="name"
					placeholder="Your name on card"
				/>
			</div>
			<div class="form-group mt-3">
				<label for="billingAddress" class="text-white ml-2">Country </label>
				<!-- <input
					type="text"
					id="billingAddress"
					class="w-100 p-2"
					v-model="country"
					placeholder="Example: US, CA, BD"
				/> -->
				<select class="custom-select px-4 form-control input-round fs-14" v-model="country">
					<option value="" disabled>Select Country</option>
					<option
						v-for="c in $store.state.candidateInfo.countries"
						:value="c.iso2"
						:key="c.id"
					>
						{{ c.name }} 
						
						</option>
				</select>
			</div>
			<div class="form-row mt-3">
				<div class="form-group col-md-6">
					<label for="postCode" class="text-white ml-2">Post Code </label>
					<input
						type="text"
						id="postCode"
						class="w-100 py-2 px-4 bg-white form-control input-round fs-14"
						v-model="postCode"
						placeholder="Example: 1234"
					/>
				</div>
				<div class="form-group col-md-6">
					<label for="country" class="text-white ml-2">City </label>
					<input
						type="text"
						id="country"
						class="w-100 py-2 px-4 bg-white form-control input-round"
						v-model="city"
						placeholder="New York"
					/>
				</div>
			</div>
			<label class="text-white ml-2 mt-3">Card Number</label>
			<div ref="card" class="form-control rounded-pill px-4 cspt-9"></div>
			<div class="mt-5 mb-3 text-right">
				<button class="btn btn-success btn-block validate-button br-30 py-2" @click.prevent="submitPayment">
          <a-icon type="loading" class="" v-if="loading" /> Check Card Validity
				</button>
			</div>
		</div>
		<div v-else class="text-center mt-5">
			<h4 class="text-white">
				Your card has been validated successfully, click "Agree and Subscribe"
				to complete the payment.
			</h4>
		</div>
	</div>
</template>

<script>
let stripe = Stripe(
	"pk_test_51IsaaMBGUmvLHtCrCZvd5unlKMW6StKdBGOZQi5nwmF1PMZgcVuNKLFlZtawZwhaMbNch0B3fFIYzWdR0jB8UX6I00OBk9xw8o"
);
let elements = stripe.elements();
const style = {
	base: {
		border: "2px solid #aaa",
		borderRaidus: "20px",
		color: "#000",
	},
	invalid: {
		//All of the error styles go inside of here.
	},
};

export default {
	props: ["clientSecret"],
	data() {
		return {
			card: "",
			intentToken:
				"seti_1IvfrFKl6A9Ix8PFbygQZcoX_secret_JYnSwJqG881f5NsiL6gRfspMY4NIqjS",
			fullName: "Shadman Ahmed",
			name: "",
			country: "",
			city: "",
			postCode: "",
			payment_method: null,
      loading: false
		};
	},
  created() {
    // setTimeout(() => {
    //   let cardElement = elements.getElement('card');
    //   if(cardElement) {
    //     self.card = "";
    //     self.card = elements.getElement('card');
    //     self.card.mount(self.$refs.card);
    //   } else {
    //     self.card = elements.create("card", style);
    //     self.card.mount(self.$refs.card);
    //   }
    // }, 500);
  },
  mounted() {
	this.card = elements.create("card", style);
		this.card.mount(this.$refs.card);
	//location.reload();
    // this.card = elements?.create("card", style);
    // this.card.mount(this.$refs.card);
	},
	// beforeDestroy() {
	// 	// this.card.destroy(this.$refs.card);
	// },
	methods: {
    setValidationFalse() {
      this.payment_method = false;
      const self = this;
      setTimeout(() => {
        self.card = "";
        self.card = elements.getElement('card');
        self.card.mount(self.$refs.card);
      }, 1000);
    },
		submitPayment() {
      this.loading = true;
			stripe
				.confirmCardSetup(this.clientSecret, {
					payment_method: {
						card: this.card,
						billing_details: {
							name: this.name,
							address: {
								city: this.city,
								country: this.country,
								postal_code: this.postCode,
							},
						},
					},
				})
				.then(
					function (result) {
            this.loading = false;
						if (result.error) {
							console.log(result.error);
							//alert(result.error.message);
							this.$error({
								title: "Card Validation Error",
								content: result.error.message,
								centered: true,
							});
						} else {
							console.log(result);
							console.log(result.setupIntent.payment_method);
							this.payment_method = result.setupIntent.payment_method;
							console.log(this.payment_method);
							this.$emit("get-payment-method", this.payment_method);
							this.$store.state.user.payment_method = this.payment_method;
							this.card.clear();
              // this.card.destroy(this.$refs.card);
						}
					}.bind(this)
				);
		},
	},
};
</script>

<style scoped lang="scss">
.card-input {
	.form-group {
		margin-bottom: 5px;
	}
	.custom-select {
		border-radius: 25px;
		font-size: 12px;
    height: 38px;
    border: none !important;
    &:focus {
      box-shadow: none !important;
      outline: none !important;
      border: none !important;
    }
	}
}

.validate-button {
	padding: 1px 60px;
	font-size: 16px;
	margin-top: 30px;
  height: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid #747373;
  outline-style: solid;
  outline-color: #cfcece;
  @media (min-width: 768px) {
    font-size: 20px;
  }
}
.br-30 {
  border-radius: 30px;
}
.cspt-9 {
  padding-top: 9px;
}
input {
  border: none !important;
}
input:focus{
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: none !important;
}
input:active{
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: none !important;
}
.input-round {
  border-radius: 40px;
}
</style>
