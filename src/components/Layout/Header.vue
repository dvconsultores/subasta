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
            <v-dialog v-model="dialog_login" persistent max-width="600px">
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
                  <v-btn class="b1 h8-em" color="green" @click="SignUp">
                    Sign Up
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <v-row justify="center">
            <v-dialog v-model="dialog_register" persistent max-width="600px">
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
                            v-model="user.first_name"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            label="Last name*"
                            v-model="user.last_name"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>
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
                        <v-col cols="12">
                          <v-text-field
                            label="Phone Number*"
                            v-model="user.number"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-btn
                          :disabled="!valid"
                          @click="postRegister"
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
                    @click="closeDialogs"
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
          <aside class="contright" v-if="username">
            <span>
              {{username}}
            </span>
          </aside>
          <aside class="contright" v-else>
            <v-btn class="walletButton" color="#656565" @click="dialog_login = true">
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
        username: null,
        themeButton: false,
        dataHeader: [],
        dialog_login: false,
        dialog_register: false,
        valid: true,
        loading: false,
        text: "",
        color: "success",
        user: {
          passwd: "",
          first_name: "",
          last_name: "",
          email: "",
          number: "",
        },
        snackbar: false,
        overlay: false,
        passwdRules: [
          (v) => !!v || "Required",
        ],
        emailRules: [
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
      };
    },
    mounted() {
      this.addToken(localStorage.getItem('Authorization'));
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
      addToken(value) {
        if (value) {
          this.username = localStorage.getItem('Username');
          this.axios.defaults.headers.common.Authorization = 'token ' + value;
        }
      },
      finalizePost(message, color) {
        // Text for bid reult, success or error, Bid placed successfully for succes, An error ocurred for error
        this.text = message;
        // Success or error dependeing on result
        this.color = color;
        // Timeout
        this.dialog_login = false;
        this.snackbar = true;
        this.overlay = false;
        this.closeDialogs();
        this.$refs.form.reset();
      },
      postLogin() {
        if (this.$refs.form.validate()) {
          this.overlay = true;
          this.axios.post("api/login/", {"email": this.user.email, "password": this.user.passwd}).then((res) => {
            localStorage.setItem('Authorization', res.data.token)
            localStorage.setItem('Username', res.data.username)
            this.addToken(localStorage.getItem('Authorization'));
            this.finalizePost("Welcome :" + this.user.email, "success")
          }).catch((error) => {
            this.finalizePost(error.response.data, "error")
          })
        }
      },
      postRegister() {
        if (this.$refs.form1.validate()) {
          this.overlay = true;
          this.axios.post("api/user/", this.user).then((res) => {
            localStorage.setItem('Authorization', res.data.token)
            localStorage.setItem('Username', res.data.username)
            this.addToken(localStorage.getItem('Authorization'));
            this.finalizePost("Welcome, successfully registered: " + this.user.email, "success")
          }).catch((error) => {
            this.finalizePost(error.response.data, "error")
          })
        }
      },
      SignUp() {
        this.dialog_login = false;
        this.dialog_register = true;
      },
      closeDialogs() {
        this.dialog_login = false;
        this.dialog_register = false;
      },
    },
  };
</script>

<style src="./Layout.scss" lang="scss" />
