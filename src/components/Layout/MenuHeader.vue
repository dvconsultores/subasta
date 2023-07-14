<template>
  <section id="menuHeader">
    <!-- drawer mobile -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      height="100%"
      temporary
      right
      :overlay-opacity="overlay_opacity"
      :overlay-color="overlay_color"
      color="#656565"
    >
      <!-- list 1 (without submenu)-->
      <v-list>
        <v-list-item
          v-for="(item, index) in dataDrawerA"
          :key="item.title"
          :href="item.to"
          link
        >
          <v-list-item-content>
            <div v-bind:key="index" class="center">
              <a :href="item.to" class="h8-em" style="color:#FFFFFF !important">{{ item.title }}</a>
            </div>
          </v-list-item-content>
        </v-list-item>
        <!-- list 2 (with submenu)-->
        <v-list-item v-for="(item, index) in dataDrawerB" :key="index"
          @mousedown="changeArrow(item)"
          @mouseleave="changeArrowFocusOut(item)"
          :class="{
            openSubmenuADrawer: item.openA,
            openSubmenuBDrawer: item.openB,
          }"
        >
          <v-list-item-content>
            <div class="center">
              <a class="h8-em" style="color:#FFFFFF !important">{{ item.title }}</a>
              <v-icon small color="#FFFFFF !important" v-if="item.open">mdi-chevron-down</v-icon>
              <v-icon small color="#FFFFFF !important" v-else>mdi-chevron-up</v-icon>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- submenuA drawer -->
    <v-menu
      bottom
      transition="scroll-y-transition"
      offset-y
      z-index="10"
      max-width="244px"
      activator=".openSubmenuADrawer"
    >
      <v-list color="#656565">
        <v-list-item
          v-for="(item, i) in dataSubmenuA"
          :key="i"
          :href="item.to"
        >
          <v-list-item-title class="center">
            <a :href="item.to" class="h8-em" style="color:#FFFFFF !important">
              {{ item.title }}
            </a>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
export default {
  name: "HeaderMenu",
  i18n: require("./i18n"),
  created() {
    const theme = localStorage.getItem("theme");
    this.OverlayMethod(theme);
  },
  data() {
    return {
      dialog: false,
      overlay_opacity: "0.2",
      overlay_color: "white",
      drawer: false,
      dataDrawerA: [
        {
          title: "Home",
          to: "#/",
        },
        {
          title: "Staking",
          to: "#/staking"
        },
        {
          title: "Community",
          to: "#",
        },
        {
          title: "About",
          to: "#",
        },
        {
          title: "Contact",
          to: "#",
        },
      ],
      dataDrawerB: [
        {
          title: "Languaje",
          open: true,
          openA: true,
        }
      ],
      dataSubmenuA: [
        {
          title: "English",
          to: "#",
        },
        {
          title: "Spanish",
          to: "#",
        }
      ],
    };
  },
  methods: {
    OverlayMethod(theme) {
      if (theme == "dark") {
        this.overlay_opacity = "0.5";
        this.overlay_color = "black"
      }
      if (theme == "light") {
        this.overlay_opacity = "0.2";
        this.overlay_color = "white"
      }
    },
    ShowDrawer() {
      this.drawer = !this.drawer
    },
    changeArrow(item) {
      item.open = !item.open;
    },
    changeArrowFocusOut(item) {
      if (item.open === false) {
        item.open = !item.open;
      }
    },
  },
};
</script>

<style src="./Layout.scss" lang="scss"></style>
