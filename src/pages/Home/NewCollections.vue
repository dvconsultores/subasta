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
        <v-card>
          <v-card-title>
            <span class="text-h5">Place a Bid</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="9" md="7">
                  <v-img
                    class="bg-grey-lighten-2"
                    width="500"
                    :aspect-ratio="1"
                    :src="img"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <span class="text-h6">
                    <div style="text-align: justify">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Congue quisque egestas diam in arcu cursus
                      euismod. Felis donec et odio pellentesque diam volutpat
                      commodo. Ultrices in iaculis nunc sed augue lacus viverra
                      vitae. Sed vulputate odio ut enim blandit volutpat
                      maecenas volutpat blandit.
                    </div>
                  </span>
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
                        class="mt-3"
                      >
                        <v-text-field
                          v-model="bid"
                          :label="'Mininum bid ($' + price + ')'"
                          :rules="[
                            rules.required,
                            rules.loanMin
                          ]"
                          type="number"
                        ></v-text-field>

                        <v-btn
                          :disabled="!valid"
                          @click="saveForm"
                          block
                          class="b1 h8-em mt-2"
                          color="#D8D8D8"
                          >Place a Bid</v-btn
                        >
                      </v-form>
                    </div>
                  </span>
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
        <b>{{ text }}</b>

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
      valid: true,
      text: "Bid placed successfully",
      bid: "",
      color: "success",
      rules: {
        required: (value) => !!value || "Required.",
        loanMin: (value) => value >= this.price || "Bid should be above $" + this.price,
      },
      img: null,
      price: 0,
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
        this.dialog = false;
        this.snackbar = true;
        // Text for bid reult, success or error, Bid placed successfully for succes, An error ocurred for error
        this.text = "Bid placed successfully";
        // Success or error dependeing on result
        this.color = "success";
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
