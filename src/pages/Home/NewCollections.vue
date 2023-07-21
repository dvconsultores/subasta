<template>
  <section id="newCollections" class="componentSpace">
    <aside class="divrow acenter divwrapmobile jendmobile parent">
      <h2 class="h3 align center p">Collections</h2>
    </aside>

    <aside
      class="contdown"
      v-for="(item, index) in dataNewCollections"
      :key="index"
    >
      <v-card
        v-for="(object, index) in item.collection"
        :key="index"
        color="var(--colorCartas3)"
      >
        <img class="images" :src="object.url_object  " alt="collections images" />
        <a href="#" class="tl h6">{{ object.title }}</a>
        <aside class="sectdown divcol">
          <div class="space">
            <span class="h7 weight">Bid</span>
            <div class="divrow acenter">
              <span class="price h7">$ {{ object.last_bid }} Dollars</span>
            </div>
          </div>
          <span class="h7 weight tend"> Minimun Bid $ {{ object.init_price }} </span>
          <v-btn
            class="b1 h8-em mt-8"
            @click="openBid(object)"
            color="#D8D8D8"
            >Place a Bid</v-btn
          >
        </aside>
      </v-card>
    </aside>
    <!-- dialog -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="auto">
        <v-overlay z-index="5" color="black" :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
          Loading...
        </v-overlay>
        <v-card>
          <v-card-title>
            <span class="text-h5">Place a Bid</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-img
                    class="bg-grey-lighten-2"
                    width="550"
                    :aspect-ratio="1"
                    :src="selected.url_object"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="pl-10">
                  <v-card color="basil">
                    <v-tabs
                      v-model="tab"
                      background-color="transparent"
                      color="basil"
                      grow
                    >
                      <v-tab v-for="item in items" :key="item">
                        {{ item }}
                      </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                      <v-tab-item>
                        <v-card color="basil" flat>
                          <v-card-text
                            class="text-h6"
                            style="text-align: justify"
                          >
                            {{selected.details}}
                          </v-card-text
                          >
                          <v-divider class="mt-3"></v-divider>
                          <span class="text-h6">
                            <div style="text-align: justify" class="mt-3">
                              <v-icon size="large">mdi-clock</v-icon>
                              <span class="text-h7 ml-2">Auction ends in</span>
                              <p class="text-h6 mt-2 mb-2">{{selected.ends_in}}</p>

                              <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                                class="mt-8"
                              >
                                <v-text-field
                                  v-model="bid.value"
                                  :label="'Minimun bid ($' + selected.last_bid + ')'"
                                  :rules="[rules.required, rules.loanMin]"
                                  type="number"
                                ></v-text-field>

                                <v-btn
                                  :disabled="!valid"
                                  @click="saveForm"
                                  :loading="loading"
                                  block
                                  class="b1 h8-em mt-2"
                                  color="#D8D8D8"
                                  >Place a Bid
                                  <template v-slot:loader>
                                    <span class="custom-loader">
                                      <v-icon light>mdi-cached</v-icon>
                                    </span>
                                  </template>
                                </v-btn>
                              </v-form>
                            </div>
                          </span>
                        </v-card>
                      </v-tab-item>
                      <v-tab-item>
                        <v-card color="basil" flat>
                          <v-card-text style="text-align: justify">
                            <v-list three-line>
                              <template v-for="item in bids">
                                <v-list-item :key="item.id">
                                  <v-list-item-avatar>
                                    <v-img :src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeoxz_Y3zQGazrjq06VFS37K5y8Ls-tXK1ROWFM_DRQ&s'"></v-img>
                                  </v-list-item-avatar>

                                  <v-list-item-content>
                                    <v-list-item-title>
                                      {{item.user}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                      <span class="text--primary">Offered</span> &mdash; $ {{item.value}}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                            </v-list>
                          </v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="b1 h8-em" color="#D8D8D8" @click="close">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- snackbar -->
      <v-snackbar v-model="snackbar" :timeout="-1" :color="color" :top="true">
        <b class="text-h6">{{ text }}</b>

        <template v-slot:action="{ attrs }">
          <v-btn
            class="b1 h8-em"
            color="#D8D8D8"
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </section>
</template>
<script>
  export default {
    name: "NewCollections",
    data() {
      return {
        loading: true,
        dialog: false,
        snackbar: false,
        overlay: false,
        valid: true,
        text: "Bid placed successfully",
        bid: {value: 0},
        color: "success",
        rules: {
          required: (value) => !!value || "Required.",
          loanMin: (value) =>
            value > this.selected.last_bid || "Bid should be above $" + this.selected.last_bid,
        },
        img: null,
        price: 0,
        tab: null,
        items: ["Details", "Bids"],
        bids: [
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
            title: "adominguez@gmail.com",
            subtitle: ``,
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
            title: "adominguez1@gmail.com",
            subtitle: `<span class="text--primary">Offered</span> &mdash; $ 348`,
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
            title: "adominguez21@gmail.com",
            subtitle: `<span class="text--primary">Offered</span> &mdash; $ 346`,
          },
          { divider: true, inset: true },
          {
            avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
            title: "adominguez21@gmail.com",
            subtitle: `<span class="text--primary">Offered</span> &mdash; $ 345`,
          },
        ],
        text1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        selected: {},
        dataNewCollections: [{},],
        interval_auction: null,
      };
    },
    mounted() {
      this.loading = true;
      this.interval_auction = setInterval(() => {this.fetchAuctions()}, 3000);
    },
    methods: {
      fetchAuctions() {
        this.axios.get("api/auction").then((res) => {
          this.dataNewCollections[0].collection = res.data;
          this.loading = false;
        })
      },
      fetchBids() {
        this.axios.get("api/bid/?auction_id="+this.selected.id).then((res) => {
          this.bids = res.data;
        })
      },
      saveForm() {
        if (this.$refs.form.validate()) {
          this.overlay = true;
          this.axios.post("api/bid/", this.bid).then((res) => {
            this.bid = res.data
            this.finalizePost("Bid placed successfully", "success");
          }).catch((error) => {
            this.finalizePost(error.response.data, "error");
          })
        }
      },
      finalizePost(message, color) {
        // Text for bid reult, success or error, Bid placed successfully for succes, An error ocurred for error
        this.text = message
        // Success or error dependeing on result
        this.color = color;
        this.dialog = false;
        this.snackbar = true;
        this.overlay = false;
        this.$refs.form.reset();
      },
      openBid(auction) {
        this.dialog = true;
        this.selected = auction;
        this.interval_bid = setInterval(() => {this.fetchBids()}, 3000);
        this.bid = {value: auction.last_bid + 1, email: '', auction: auction.id};
      },
      close() {
        this.dialog = false;
        this.$refs.form.reset();
      },
    },
  };
</script>

<style src="../Pages.scss" lang="scss" />
