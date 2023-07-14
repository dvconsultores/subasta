<template>
  <section id="recomended" class="componentSpace">
    <aside class="space parent divcolmobile centermobile">
      <h2 class="h3">Recomended Creators</h2>
      <div class="contflechas divrow">
        <v-btn class="left marginrightmobile" icon @click="changeSlides('prev')">
          <v-icon medium style="color: #FFFFFF !important">mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn class="right marginleftmobile" icon @click="changeSlides('next')">
          <v-icon medium style="color: #FFFFFF !important">mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </aside>

    <aside class="contdown parent">
      <v-carousel
        v-model="carousel"
        hide-delimiters
        :show-arrows="false"
      >
        <template v-for="(item, index) in slider">
          <v-carousel-item
            v-if="(index + 1) % columns === 1 || columns === 1"
            :key="index"
          > 
            <v-row class="fill-height">
              <template v-for="(n,i) in columns">
                <template v-if="(+index + i) < slider.length">
                  <v-col :key="i" class="jcenter">
                    <v-card class="relative" color="var(--colorCartas3)">
                      <img :src="slider[+index + i].nft" alt="NFT">
                      <v-btn icon disabled>
                        <img :src="slider[+index + i].profile" alt="Profile Image">
                      </v-btn>
                    </v-card>

                    <aside class="divcol center tcenter align">
                      <span class="h6-em">{{ slider[+index + i].title }}</span>
                      <p class="h8-em">
                        {{ slider[+index + i].desc }}
                      </p>
                    </aside>
                  </v-col>
                </template> 
              </template> 
            </v-row> 
          </v-carousel-item> 
        </template> 
      </v-carousel>  
    </aside>
  </section>
</template>

<script>
export default {
  name: "Recomended",
  data() {
    return {
      carousel: 0,
      slider: [
        {
          nft: require("@/assets/recomended/r1.png"),
          profile: require("@/assets/logos/user.png"),
          title: "Artist Name",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure repellendus earum dolore quo officiis tenetur consequatur. consequatur.consequatur."
        },
        {
          nft: require("@/assets/recomended/r2.png"),
          profile: require("@/assets/logos/user.png"),
          title: "Artist Name",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure repellendus earum dolore quo officiis tenetur consequatur. consequatur.consequatur."
        },
        {
          nft: require("@/assets/recomended/r3.png"),
          profile: require("@/assets/logos/user.png"),
          title: "Artist Name",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure repellendus earum dolore quo officiis tenetur consequatur. consequatur.consequatur."
        },
        {
          nft: require("@/assets/recomended/r4.png"),
          profile: require("@/assets/logos/user.png"),
          title: "Artist Name",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure repellendus earum dolore quo officiis tenetur consequatur. consequatur.consequatur."
        },
        {
          nft: require("@/assets/recomended/r1.png"),
          profile: require("@/assets/logos/user.png"),
          title: "Artist Name",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure repellendus earum dolore quo officiis tenetur consequatur. consequatur.consequatur."
        },
        {
          nft: require("@/assets/recomended/r2.png"),
          profile: require("@/assets/logos/user.png"),
          title: "Artist Name",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure repellendus earum dolore quo officiis tenetur consequatur. consequatur.consequatur."
        },
        {
          nft: require("@/assets/recomended/r3.png"),
          profile: require("@/assets/logos/user.png"),
          title: "Artist Name",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure repellendus earum dolore quo officiis tenetur consequatur. consequatur.consequatur."
        },
        {
          nft: require("@/assets/recomended/r4.png"),
          profile: require("@/assets/logos/user.png"),
          title: "Artist Name",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure repellendus earum dolore quo officiis tenetur consequatur. consequatur.consequatur."
        },
      ]
		}
  },
  computed: {
    columns() {
      if (this.$vuetify.breakpoint.lg) {
        return 4;
      }

      if (this.$vuetify.breakpoint.md) {
        return 3;
      }

      if (this.$vuetify.breakpoint.sm) {
        return 2;
      }

      return 1;
    }
  },
  methods: {
    changeSlides(item) {
      if (item == "next") {
        this.carousel++
      }
      if (item == "prev") {
        this.carousel--
      }
    }
  }
};
</script>

<style src="../Pages.scss" lang="scss" />
