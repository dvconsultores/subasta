<template>
  <div id="staking" class="align">
    <section class="contup parent">
      <h1 class="h4-em tcenter">Shinto Staking</h1>

      <v-col v-for="(item, index) in dataStaking" :key="index"
        cols="11" md="6" lg="5" xl="4" class="carta relative divcol space align">
        <div class="space">
          <v-card class="divcol tstart" color="#ba2832">
            <span class="h7-em" style="line-height: 1.2ch">Total Staked</span>
            <span class="h5-em" style="color: #FFFFFF !important">{{ item.staked }}</span>
          </v-card>

          <v-card class="divcol tend" color="#ba2832">
            <span class="h7-em" style="line-height: 1.2ch">APR</span>
            <span class="h5-em" style="color: #FFFFFF !important">{{ item.apr }}</span>
          </v-card>
        </div>

        <div class="space">
          <span class="h7-em">Stard Date</span>
          <span class="h7-em">End Date</span>
        </div>

        <div class="space">
          <span class="date h7-em" style="color: #FFFFFF !important">{{ item.stardDate }}</span>
          <span class="date h7-em" style="color: #FFFFFF !important">{{ item.endDate }}</span>
        </div>

        <div class="space">
          <span class="h7-em">Reward per Day</span>
          <span class="h7-em">{{ item.shinto }} SHINTO
            <sup>
              <v-icon color="#FFFFFF !important" x-small>mdi-information-outline</v-icon>
            </sup>
          </span>
        </div>

        <div class="end">
          <span class="h7-em">{{ item.near }} NEAR
            <sup>
              <v-icon color="#FFFFFF !important" x-small>mdi-information-outline</v-icon>
            </sup>
          </span>
        </div>

        <v-btn class="b1 h7-em" color="#ba2832">Stake</v-btn>
        <v-btn class="b2 h7-em" color="#1d1c21">Unstake</v-btn>
      </v-col>

      <div class="contsort divrow center divwrap">
        <h2 class="h4-em center align">NFT Staking</h2>
        <v-select
          v-model="sort"
          :items="filterStaking"
          solo
          attach
          hide-details
          append-icon="mdi-chevron-down"
        />
      </div>
    </section>

    <section class="contdown">
      <aside v-for="(item, index) in dataNFTStaking" :key="index"
        class="contContenido divrow">
        <img :src="item.img" alt="NFT image">

        <v-card class="carta relative divcol space">
          <div class="space">
            <span class="tagup h6-em">{{ item.title }}</span>

            <v-card class="divcol tstart" color="#ba2832">
              <span class="h8-em" style="line-height: 1.2ch">Total Staked</span>
              <span class="h6-em" style="color: #FFFFFF !important">{{ item.staked }}</span>
            </v-card>

            <v-card class="divcol tend" color="#ba2832">
              <span class="h8-em" style="line-height: 1.2ch">APR</span>
              <span class="h6-em" style="color: #FFFFFF !important">{{ item.apr }}</span>
            </v-card>
          </div>

          <div class="space">
            <span class="h8-em">Stard Date</span>
            <span class="h8-em">End Date</span>
          </div>

          <div class="space">
            <span class="date h8-em" style="color: #FFFFFF !important">{{ item.stardDate }}</span>
            <span class="date h8-em" style="color: #FFFFFF !important">{{ item.endDate }}</span>
          </div>

          <div class="space">
            <span class="h8-em">Reward per Day</span>
            <span class="h8-em">{{ item.shinto }} SHINTO
              <sup>
                <v-icon color="#FFFFFF !important" x-small>mdi-information-outline</v-icon>
              </sup>
            </span>
          </div>

          <div class="end">
            <span class="h8-em">{{ item.near }} NEAR
              <sup>
                <v-icon color="#FFFFFF !important" x-small>mdi-information-outline</v-icon>
              </sup>
            </span>
          </div>

          <v-btn class="b1 h8-em" color="#ba2832">Stake</v-btn>
          <v-btn class="b2 h8-em" color="#1d1c21">Unstake</v-btn>
        </v-card>
      </aside>
    </section>
  </div>
</template>

<script>
// import Hero from './Hero.vue'

export default {
  name: "Staking",
  // components: {
  //   Hero,
  // },
  data() {
    return {
      dataStaking: [
        {
          staked: "$ 2.51M",
          apr: "204%",
          stardDate: "Mar 04, 2022",
          endDate: "Apr 26, 2022",
          shinto: "123,765",
          near: "13,845"
        },
      ],
      filterStaking: [
        'Active', 'Inactive'
      ],
      dataNFTStaking: [
        {
          title: "Fantasy Star Pool",
          img: require("@/assets/nft/nft1.png"),
          staked: "$ 2.51M",
          apr: "204%",
          stardDate: "Mar 04, 2022",
          endDate: "Apr 26, 2022",
          shinto: "123,765",
          near: "13,845"
        },
        {
          title: "Fantasy Star Pool",
          img: require("@/assets/nft/nft2.png"),
          staked: "$ 2.51M",
          apr: "204%",
          stardDate: "Mar 04, 2022",
          endDate: "Apr 26, 2022",
          shinto: "123,765",
          near: "13,845"
        },
        {
          title: "Fantasy Star Pool",
          img: require("@/assets/nft/nft3.png"),
          staked: "$ 2.51M",
          apr: "204%",
          stardDate: "Mar 04, 2022",
          endDate: "Apr 26, 2022",
          shinto: "123,765",
          near: "13,845"
        },
        {
          title: "Fantasy Star Pool",
          img: require("@/assets/nft/nft4.png"),
          staked: "$ 2.51M",
          apr: "204%",
          stardDate: "Mar 04, 2022",
          endDate: "Apr 26, 2022",
          shinto: "123,765",
          near: "13,845"
        },
        {
          title: "Fantasy Star Pool",
          img: require("@/assets/nft/nft5.png"),
          staked: "$ 2.51M",
          apr: "204%",
          stardDate: "Mar 04, 2022",
          endDate: "Apr 26, 2022",
          shinto: "123,765",
          near: "13,845"
        },
        {
          title: "Fantasy Star Pool",
          img: require("@/assets/nft/nft1.png"),
          staked: "$ 2.51M",
          apr: "204%",
          stardDate: "Mar 04, 2022",
          endDate: "Apr 26, 2022",
          shinto: "123,765",
          near: "13,845"
        },
        {
          title: "Fantasy Star Pool",
          img: require("@/assets/nft/nft2.png"),
          staked: "$ 2.51M",
          apr: "204%",
          stardDate: "Mar 04, 2022",
          endDate: "Apr 26, 2022",
          shinto: "123,765",
          near: "13,845"
        },
      ],
    }
  },
};
</script>

<style src="../Pages.scss" lang="scss" />
