<template>
  <section>
    <!-- mobile -->

    <!-- desktop -->
    <v-app-bar id="headerApp" color="var(--fondo)" height="100px" fixed>
      <v-row>
        <v-col cols="12" md="11" class="divrow space align paddbottomdel">
          <aside class="contleft divrow acenter">
            <!-- toggle -->
            <!-- logo -->
            <router-link to="/">
              <span class="contmiddle h6-em center padd">LARA ALCANTARA</span>
            </router-link>
          </aside>

          <v-col class="divrow jend padd eliminarmobile">
            <!-- content -->
            <v-col class="contmiddle center padd">
              <a
                v-for="(item, index) in dataHeader"
                :key="index"
                :href="item.link"
                class="h9-em openMenuCollections"
              >
                {{ item.title }}
              </a>
            </v-col>
          </v-col>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-overlay z-index="5" color="black" :value="overlay">
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
                            v-model="email"
                            :rules="emailRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Password*"
                            type="password"
                            v-model="passwd"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    <v-btn
                      :disabled="!valid"
                      @click="saveForm"
                      :loading="loading"
                      block
                      class="b1 h8-em mt-2"
                      color="#D8D8D8"
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
                    @click="close1"
                  >
                    Close
                  </v-btn>
                  <v-btn class="b1 h8-em" color="green" @click="SignUp">
                    Sign Up
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <v-row justify="center">
            <v-dialog v-model="dialog1" persistent max-width="600px">
              <v-overlay z-index="5" color="black" :value="overlay">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
                Loading...
              </v-overlay>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Sign Up Form</span>
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="form1"
                    v-model="valid"
                    lazy-validation
                    class="mt-8"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            label="First name*"
                            v-model="name"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            label="Last name*"
                            v-model="lastname"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Email*"
                            v-model="email"
                            :rules="emailRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Password*"
                            type="password"
                            v-model="passwd"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Phone Number*"
                            v-model="number"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-btn
                          :disabled="!valid"
                          @click="saveForm1"
                          :loading="loading"
                          block
                          class="b1 h8-em mt-2"
                          color="#D8D8D8"
                          >Register
                          <template v-slot:loader>
                            <span class="custom-loader">
                              <v-icon light>mdi-cached</v-icon>
                            </span>
                          </template>
                        </v-btn>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="b1 h8-em"
                    color="#D8D8D8"
                    @click="close2"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <!-- snackbar -->
          <v-snackbar v-model="snackbar" :color="color" :top="true">
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
          <aside class="contright">
            <!--
          <v-btn v-if="themeButton" icon width="2.8em" height="2.8em"
            @click="CambiarTheme('dark'), CambiarTheme2('dark')">
            <v-icon size="clamp(2em, 2vw, 3em)">mdi-weather-night</v-icon>
          </v-btn>
          <v-btn v-if="themeButton" icon width="2.8em" height="2.8em"
            @click="CambiarTheme('light'), CambiarTheme2('light')">
            <img src="@/assets/icons/icon-theme-dark.png" style="width: clamp(2em, 2vw, 3em)">
          </v-btn>
          -->

            <v-btn class="walletButton" color="#656565" @click="dialog = true">
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
import MenuHeader from "./MenuHeader.vue";

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
    MenuHeader,
  },
  i18n: require("./i18n"),
  created() {
    this.element = document.getElementById("theme");
    const theme = "light"; //localStorage.getItem("theme");
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
      themeButton: false,
      dataHeader: [],
      dialog: false,
      dialog1: false,
      valid: true,
      loading: false,
      text: "",
      color: "success",
      passwd: "",
      name: "",
      lastname: "",
      number: "",
      snackbar: false,
      overlay: false,
      passwdRules: [
        (v) => !!v || "Required",
      ],
      email: "",
      emailRules: [
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
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
    saveForm() {
      if (this.$refs.form.validate()) {
        this.overlay = true;
        // Text for bid reult, success or error, Bid placed successfully for succes, An error ocurred for error
        this.text = "Welcome :" + this.email;
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
    saveForm1() {
      if (this.$refs.form1.validate()) {
        this.overlay = true;
        // Text for bid reult, success or error, Bid placed successfully for succes, An error ocurred for error
        this.text = "Welcome, successfully registered :" + this.email;
        // Success or error dependeing on result
        this.color = "success";
        setTimeout(() => {
          this.dialog1 = false;
          this.snackbar = true;
          this.overlay = false;
          this.$refs.form1.reset();
        }, 1500);
      }
    },
    SignUp() {
      this.dialog = false;
      this.dialog1 = true;
    },
    close1() {
      this.dialog = false;
      this.$refs.form.reset();
    },
    close2() {
      this.dialog1 = false;
      this.$refs.form1.reset();
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
