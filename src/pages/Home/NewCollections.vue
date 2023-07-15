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
        v-for="(item2, index) in item.collection"
        :key="index"
        color="var(--colorCartas3)"
      >
        <img class="images" :src="item2.img" alt="collections images" />
        <a href="#" class="tl h6">{{ item2.title }}</a>
        <aside class="sectdown divcol">
          <div class="space">
            <span class="h7 weight">Bid</span>
            <div class="divrow acenter">
              <span class="price h7">$ {{ item2.dollar }} Dollars</span>
            </div>
          </div>
          <span class="h7 weight tend"> Minimun Bid $ {{ item2.dollar }} </span>
          <v-btn
            class="b1 h8-em mt-8"
            @click="openBid(item2.img, item2.dollar)"
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
                    :src="img"
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
                            >{{ text1 }}</v-card-text
                          >
                          <v-divider class="mt-3"></v-divider>
                          <span class="text-h6">
                            <div style="text-align: justify" class="mt-3">
                              <v-icon size="large">mdi-clock</v-icon>
                              <span class="text-h7 ml-2">Auction ends in</span>
                              <p class="text-h6 mt-2 mb-2">00 days 00:00:00</p>

                              <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                                class="mt-8"
                              >
                                <v-text-field
                                  v-model="bid"
                                  :label="'Mininum bid ($' + price + ')'"
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
                              <template v-for="(item, index) in itemslist">
                                <v-subheader
                                  v-if="item.header"
                                  :key="item.header"
                                  v-text="item.header"
                                ></v-subheader>

                                <v-divider
                                  v-else-if="item.divider"
                                  :key="index"
                                  :inset="item.inset"
                                ></v-divider>

                                <v-list-item v-else :key="item.title">
                                  <v-list-item-avatar>
                                    <v-img :src="item.avatar"></v-img>
                                  </v-list-item-avatar>

                                  <v-list-item-content>
                                    <v-list-item-title
                                      v-html="item.title"
                                    ></v-list-item-title>
                                    <v-list-item-subtitle
                                      v-html="item.subtitle"
                                    ></v-list-item-subtitle>
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
      dialog: false,
      snackbar: false,
      overlay: false,
      valid: true,
      text: "Bid placed successfully",
      bid: "",
      color: "success",
      rules: {
        required: (value) => !!value || "Required.",
        loanMin: (value) =>
          value >= this.price || "Bid should be above $" + this.price,
      },
      img: null,
      price: 0,
      tab: null,
      items: ["Details", "Bids"],
      itemslist: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "adominguez@gmail.com",
          subtitle: `<span class="text--primary">Offered</span> &mdash; $ 350`,
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
      text1:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      dataNewCollections: [
        {
          collection: [
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c1.png"),
              near: "14",
              dollar: "350",
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c2.png"),
              near: "14",
              dollar: "220",
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c3.png"),
              near: "14",
              dollar: "150",
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c4.png"),
              near: "14",
              dollar: "80",
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c5.png"),
              near: "14",
              dollar: "550",
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c6.png"),
              near: "14",
              dollar: "321",
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c7.png"),
              near: "14",
              dollar: "160",
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c8.png"),
              near: "14",
              dollar: "543",
            },
          ],
        },
      ],
    };
  },
  methods: {
    saveForm() {
      if (this.$refs.form.validate()) {
        this.overlay = true;
        // Text for bid reult, success or error, Bid placed successfully for succes, An error ocurred for error
        this.text = "Bid placed successfully";
        // Success or error dependeing on result
        this.color = "success";
        setTimeout(() => {
          this.dialog = false;
          this.snackbar = true;
          this.overlay = false;
          this.$refs.form.reset();
        }, 1500);
      }
    },
    openBid(img, price) {
      this.dialog = true;
      this.img = img;
      this.price = price;
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
    },
  },
};
</script>

<style src="../Pages.scss" lang="scss" />
