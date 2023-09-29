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
      <div class="contdown__wrapper">
        <v-card
          v-for="(object, index) in item.collection"
          :key="index"
          color="var(--colorCartas3)"
        >
          <img class="images" :src="object.image" :alt="'Collection Image #' + index"/>
          <a href="#" class="tl h6" :title="object.title">{{ object.title }}</a>
          <aside class="sectdown divcol">
            <div class="space">
              <span class="h7 weight">Bid</span>
              <div class="divrow acenter">
              </div>
            </div>
            <span class="h7 weight tend"> Minimun Bid $ 
              <span v-if="object.last_bid.user">{{ parseFloat(object.last_bid.value) +100 }} </span>
              <span v-else>{{ object.last_bid.value }} </span>
            </span>
            <v-btn
              class="b1 h8-em mt-8"
              @click="openBid(object)"
              color="#D8D8D8"
              >Place a Bid/More info</v-btn
            >
          </aside>
        </v-card>  
      </div>
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
                    :src="selected.image"
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
                              <span v-if="selected.ends_in">
                                <span class="text-h7 ml-2">Auction ends in:</span>
                                <p class="text-h6 mt-2 mb-2">{{selected.ends_in}}</p>
                              </span>
                              <span v-else>
                                <span class="text-h7 ml-2">Auction starts on {{selected.datetime.init_date}} at {{selected.datetime.init_time}} EST and ends on {{selected.datetime.ends_date}} at {{selected.datetime.ends_time}} EST </span>
                              </span>
                              <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                                class="mt-8"
                              >
                                <v-text-field
                                  v-if="selected.last_bid.user"
                                  v-model="bid.value"
                                  :label="'Minimun bid ($' + (selected.last_bid.value+100) + ')' "
                                  :rules="[rules.required, rules.loanMinLast]"
                                  type="number"
                                ></v-text-field>
                                <v-text-field
                                  v-else
                                  v-model="bid.value"
                                  :label="'Minimun bid ($' + (selected.last_bid.value) + ')' "
                                  :rules="[rules.required, rules.loanMinInit]"
                                  type="number"
                                ></v-text-field>
                                <v-btn
                                  v-if="autorized"
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
                                <v-btn
                                  v-else
                                  block
                                  class="b1 h8-em mt-2"
                                  color="#D8D8D8"
                                  @click="dialog_login = true, overlay = true"
                                  >First login
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
                              <template v-for="(item, index) in bids">
                                <v-list-item :key="index">
                                  <v-list-item-avatar>
                                    <v-img v-if="item.id" :src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqeZqt2CDVJaTxi_7N4q8SGxsLieLZ6QbcwolAREkfjdQS5QtVpU6N9zsL09WA8TV4ZwU&usqp=CAU'"></v-img>
                                  </v-list-item-avatar>

                                  <v-list-item-content>
                                    <v-list-item-title>
                                      <span>{{ item.user }}</span>
                                    </v-list-item-title>
                                    <v-list-item-subtitle v-if="item.id">
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
      <v-dialog v-model="dialog_login" persistent max-width="600px">
        <v-overlay z-index="5" color="black" :value="overlay_login">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
          Loading...
        </v-overlay>
        <v-card>
          <v-card-title>
            <span class="text-h5">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="mt-8"
            >
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      v-model="user.email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      type="password"
                      v-model="user.passwd"
                      :rules="passwdRules"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
              <v-btn
                :disabled="!valid"
                @click="postLogin"
                :loading="loading"
                block
                class="b1 h8-em mt-2"
                color="#D8D8D8"
                type="submit"
                >Login
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="b1 h8-em"
              color="#D8D8D8"
              @click="closeDialogs"
            >
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
      <v-snackbar v-model="snackbar_b" :timeout="-1" :color="error" :top="true">
        <b class="text-h6">This auction has not started yet.</b>

        <template v-slot:action="{ attrs }">
          <v-btn
            class="b1 h8-em"
            color="#D8D8D8"
            v-bind="attrs"
            @click="snackbar_b = false"
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
        dialog_login: false,
        user: {
          passwd: "",
          first_name: "",
          last_name: "",
          email: "",
          number: "",
        },
        passwdRules: [
          (v) => !!v || "Required",
        ],
        emailRules: [
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
        snackbar: false,
        overlay: false,
        overlay_login: false,
        valid: true,
        text: "Bid placed successfully",
        bid: {value: 0},
        color: "success",
        rules: {
          required: (value) => !!value || "Required.",
          loanMinLast: (value) => (value >= this.selected.last_bid.value+100) || "Bid should be above $" + (this.selected.last_bid.value+100),
          loanMinInit: (value) => (value >= this.selected.last_bid.value) || "Bid should be above $" + (this.selected.last_bid.value),
        },
        img: null,
        price: 0,
        tab: null,
        items: ["Details", "Bids"],
        bids: [{user: "Please Login to view the bids.", id: null, value: null}],
        selected: {last_bid: {value: 0, user: null}, datetime: {}},
        dataNewCollections: [{}],
        interval_auction: null,
        interval_bid: null,
        autorized: false,
        message_if_login: "",
      };
    },
    mounted() {
      this.loading = true;
      this.fetchAuctions();
      this.interval_auction = setInterval(() => {this.fetchAuctions()}, 3000);
    },
    methods: {
      fetchAuctions() {
        this.autorized = localStorage.getItem('Authorization') ? true : false;
        this.axios.get("api/auction").then((res) => {
          this.dataNewCollections[0].collection = res.data;
          this.loading = false;
        })
      },
      fetchBids() {
        if (localStorage.getItem('Authorization')) {
          this.axios.get("api/bid/?auction_id="+this.selected.id).then((res) => {
            if (res.data[0]) {this.bids = res.data[0];}
            this.bids = [{user: "No bids...", id: null, value: null}];
          })
        }
      },
      saveForm() {
        this.overlay = true;
        this.axios.post("api/bid/", this.bid).then((res) => {
          this.bid = res.data
          this.finalizePost(this.message_if_login+"Bid placed successfully", "success");
        }).catch((error) => {
          if (error.response.data.detail) {
            this.finalizePost(error.response.data.detail, "error");
          } else {
            this.finalizePost(error.response.data, "error");
          }
        })
      },
      finalizePost(message, color) {
        // Text for bid reult, success or error, Bid placed successfully for succes, An error ocurred for error
        this.text = message
        // Success or error dependeing on result
        this.color = color;
        this.dialog = false;
        this.dialog_login = false;
        this.snackbar = true;
        this.overlay = false;
        this.$refs.form.reset();
        this.message_if_login = "";
      },
      openBid(auction) {
        this.dialog = true;
        this.selected = auction;
        this.interval_bid = setInterval(() => {this.fetchBids()}, 3000);
        if (auction.last_bid.user) {
          this.bid = {value: auction.last_bid.value+100, email: '', auction: auction.id};
        } else {
          this.bid = {value: auction.last_bid.value, email: '', auction: auction.id};
        }
      },
      close() {
        this.bids = [{user: "Loading...", id: null, value: null}];
        this.dialog = false;
        this.$refs.form.reset();
        clearInterval(this.interval_bid);
      },
      addToken(value) {
        if (value) {
          this.axios.defaults.headers.common.Authorization = 'token ' + value;
        }
      },
      postLogin() {
        if (this.user.email && this.user.passwd) {
          this.dialog_login = true;
          this.axios.post("api/login/", {"email": this.user.email, "password": this.user.passwd}).then((res) => {
            localStorage.setItem('Authorization', res.data.token);
            localStorage.setItem('Username', res.data.username);
            this.addToken(localStorage.getItem('Authorization'));
            this.message_if_login = "Login and ";
            this.saveForm();
            location.reload();
          }).catch((error) => {
            this.finalizePost(error.response.data, "error")
          })
        }
      },
      closeDialogs() {
        this.dialog_login = false;
        this.overlay = false;
      },
    },
  };
</script>

<style src="../Pages.scss" lang="scss">
  .cancelar:hover {
    cursor: pointer
  }
</style>
