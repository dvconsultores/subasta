<template>
  <section>
    <!-- mobile -->

    <!-- desktop -->
    <v-app-bar
    id="headerApp"
    color="var(--fondo)"
    height="100px"
    fixed
  >
    <v-row>
      <v-col cols="12" md="11" class="divrow space align paddbottomdel">
        <aside class="contleft divrow acenter">
          <!-- toggle -->
          <!-- logo -->
          <router-link to="/" >
            <span class="contmiddle h6-em center padd">LARA ALCANTARA</span>
          </router-link>
        </aside>

        <v-col class="divrow jend padd eliminarmobile">
          <!-- content -->
          <v-col class="contmiddle center padd">
            <a v-for="(item, index) in dataHeader" :key="index"
              :href="item.link" class="h9-em openMenuCollections">
              {{ item.title }}
            </a>
          </v-col>
        </v-col>

        <aside class="contright">
          <v-btn v-if="themeButton" icon width="2.8em" height="2.8em"
            @click="CambiarTheme('dark'), CambiarTheme2('dark')">
            <v-icon size="clamp(2em, 2vw, 3em)">mdi-weather-night</v-icon>
          </v-btn>
          <v-btn v-else icon width="2.8em" height="2.8em"
            @click="CambiarTheme('light'), CambiarTheme2('light')">
            <img src="@/assets/icons/icon-theme-dark.png" style="width: clamp(2em, 2vw, 3em)">
          </v-btn>

          <v-btn class="walletButton" color="#656565">
            Login
          </v-btn>
        </aside>
      </v-col>
    </v-row>
  </v-app-bar>

  <MenuHeader ref="menu"></MenuHeader>
  </section>
</template>

<script>
import MenuHeader from "./MenuHeader.vue"

// let ubicacionPrincipal = window.pageYOffset;
// let resizeTimeout;
// function resizeThrottler(actualResizeHandler) {
//   // ignore resize events as long as an actualResizeHandler execution is in the queue
//   if (!resizeTimeout) {
//     resizeTimeout = setTimeout(() => {
//       resizeTimeout = null;
//       actualResizeHandler();

//       // The actualResizeHandler will execute at a rate of 15fps
//     }, 80);
//   }
// }
export default {
  name: "Header",
  components: {
    MenuHeader
  },
  i18n: require("./i18n"),
  created() {
    this.element = document.getElementById("theme");
    const theme = localStorage.getItem("theme");
    if (theme) {
      this.CambiarTheme(theme);
    }
    if (theme == "light") {
      this.themeButton = true;
    }
    if (theme == "dark") {
      this.themeButton = false;
    }
  },
  data() {
    return {
      themeButton: true,
      dataHeader: [
      ]
    };
  },
  methods: {
    ShowDrawer() {
      this.$refs.menu.ShowDrawer();
    },
    CambiarTheme(theme) {
      this.$store.dispatch("CambiarTheme", { theme, element: this.element });
      this.themeButton = !this.themeButton;
    },
    CambiarTheme2(theme) {
      this.$refs.menu.OverlayMethod(theme);
    },
    // OcultarNavbar() {
    //   let Desplazamiento_Actual = window.pageYOffset;
    //   if (ubicacionPrincipal >= Desplazamiento_Actual) {
    //     document.getElementById("headerApp").style.top = "0";
    //   } else {
    //     document.getElementById("headerApp").style.top = "-100px";
    //   }
    //   ubicacionPrincipal = Desplazamiento_Actual;
    // },
    // scrollListener() {
    //   resizeThrottler(this.OcultarNavbar);
    // }
  },
  // mounted() {
  //   document.addEventListener('scroll', this.scrollListener);
  // },
  // beforeDestroy() {
  //   document.removeEventListener('scroll', this.scrollListener);
  // }
};
</script>

<style src="./Layout.scss" lang="scss" />
