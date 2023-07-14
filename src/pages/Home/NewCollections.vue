<template>
  <section id="newCollections" class="componentSpace">
    <aside class="divrow acenter divwrapmobile jendmobile parent">
      <h2 class="h3 align center p">Collections</h2>
    </aside>

    <aside class="contdown" v-for="(item, index) in dataNewCollections" :key="index">
      <v-card v-for="(item2, index) in item.collection" :key="index"
        color="var(--colorCartas3)">
        <img class="images" :src="item2.img" alt="collections images">
        <a href="#" class="tl h6">{{ item2.title }}</a>
        <aside class="sectdown divcol">
          <div class="space">
            <span class="h7 weight">Bid</span>
            <div class="divrow acenter">
              <span class="price h7">$ {{ item2.dollar }} Dollars</span>
            </div>
          </div>
          <v-btn class="b1 h8-em mt-8" color="#D8D8D8">Place a Bid</v-btn>
        </aside>
      </v-card>
    </aside>
  </section>
</template>

<script>
export default {
  name: "NewCollections",
  data() {
    return {
      dataNewCollections: [
        {
          collection: [
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c1.png"),
              near: "14",
              dollar: "350"
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c2.png"),
              near: "14",
              dollar: "220"
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c3.png"),
              near: "14",
              dollar: "150"
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c4.png"),
              near: "14",
              dollar: "80"
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c5.png"),
              near: "14",
              dollar: "550"
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c6.png"),
              near: "14",
              dollar: "321"
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c7.png"),
              near: "14",
              dollar: "160"
            },
            {
              title: "Lorem Ipsum",
              img: require("@/assets/collections/c8.png"),
              near: "14",
              dollar: "543"
            },
          ]
        }
      ]
    }
  },
};
</script>

<style src="../Pages.scss" lang="scss" />
