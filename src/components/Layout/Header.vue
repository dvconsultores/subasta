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
              <span class="contmiddle h6-em center padd" style="color: rgb(77, 75, 75)">LARA ALCANTARA</span>
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
                        <v-col cols="12"><a @click="openDialogRecoveryPasswd" style="color: aqua;"><div style="text-align: center;">Forgot my Password</div></a></v-col>                      
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
                  <v-btn class="b1 h8-em" color="green" @click="signUp">
                    Sign Up
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <v-row justify="center">
            <v-dialog v-model="dialog_recovery" persistent max-width="600px">
              <v-overlay z-index="5" color="black" :value="overlay">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
                Loading...
              </v-overlay>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Recovery Password</span>
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="formRecovery"
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
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    <v-btn
                      :disabled="!valid"
                      @click="postSendCode(user.email)"
                      :loading="loading"
                      block
                      class="b1 h8-em mt-2"
                      color="#D8D8D8"
                      type="submit"
                      >Send Code
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
          </v-row>

          <v-row justify="center">
            <v-dialog v-model="dialog_sendcode" persistent max-width="600px">
              <v-overlay z-index="5" color="black" :value="overlay">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
                Loading...
              </v-overlay>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Verify code</span>
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="formVerifyCode"
                    v-model="valid"
                    lazy-validation
                    class="mt-8"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Code*"
                            v-model="user.code"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>                  
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    <v-btn
                      :disabled="!valid"
                      @click="postVerifyCode"
                      :loading="loading"
                      block
                      class="b1 h8-em mt-2"
                      color="#D8D8D8"
                      type="submit"
                      >Verify Code
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
                  <v-btn class="b1 h8-em" color="green" @click="openDialogRecoveryPasswd">
                    Resend Code
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <v-row justify="center">
            <v-dialog v-model="dialog_changePasswd" persistent max-width="600px">
              <v-overlay z-index="5" color="black" :value="overlay">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
                Loading...
              </v-overlay>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Reset Password</span>
                </v-card-title>
                <v-card-text>
                  <v-form
                    ref="formChangePasswd"
                    v-model="valid"
                    lazy-validation
                    class="mt-8"
                  >
                    <v-container>
                      <v-row>
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
                            label="Verify Password*"
                            type="password"
                            v-model="user.passwdconfirm"
                            :rules="passwdRules"
                            required
                          ></v-text-field>
                        </v-col>              
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    <v-btn
                      :disabled="!valid && user.passwd === user.passwdconfirm"
                      @click="postChangePasswd"
                      :loading="loading"
                      block
                      class="b1 h8-em mt-2"
                      color="#D8D8D8"
                      type="submit"
                      >Submit
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
                  <v-btn class="b1 h8-em" color="green" @click="openDialogRecoveryPasswd">
                    Resend Code
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
          <aside class="contright" v-if="token">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">
                  {{username}}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="item in [{id: 0, action: 'Logout'}]"
                  :key="item.id"
                  @click="logOut()"
                >
                  <v-list-item-title>{{item.action}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
        dialog_recovery: false,
        dialog_sendcode: false,
        dialog_changePasswd: false,
        valid: true,
        loading: false,
        text: "",
        color: "success",
        recover_email: null,
        user: {
          passwd: "",
          first_name: "",
          last_name: "",
          email: "",
          number: "",
          code: "",
          passwdconfirm: "",
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
        interval: null,
        token: null,
      };
    },
    mounted() {
      this.addToken(localStorage.getItem('Authorization'));
      this.verifyStatus();
      this.interval = setInterval(() => {this.verifyStatus()}, 10000); 
    },
    methods: {
      verifyStatus() {
        this.username = localStorage.getItem('Username');
        this.token = localStorage.getItem('Authorization');
      },
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
        this.verifyStatus();
      },
      postLogin() {
        if (this.$refs.form.validate()) {
          this.overlay = true;
          this.axios.post("api/login/", {"email": this.user.email, "password": this.user.passwd}).then((res) => {
            localStorage.setItem('Authorization', res.data.token)
            localStorage.setItem('Username', res.data.username)
            this.addToken(localStorage.getItem('Authorization'));
            this.finalizePost("Welcome: " + this.user.email, "success")
          }).catch((error) => {
            this.finalizePost(error.response.data, "error")
          })
        }
      },
      postSendCode(email) {
        this.overlay = true;
        if (email) {
          this.axios.post("api/recovery-password/", {email: email}).then((res) => {
            this.recover_email = email;
            this.overlay = true;
            this.closeDialogs();
            this.overlay = false;
            this.dialog_sendcode = true;
            this.snackbar = true;
            this.text = "We have sent a recovery message to your email.";
            this.color = "success";
            this.$refs.formRecovery.reset();
          }).catch((error) => {
            this.snackbar = true;
            this.text = error.response.data;
            this.color = "error";
            this.overlay = false;
          })
        }
      },
      postVerifyCode() {
        this.overlay = true;
        if (this.$refs.formVerifyCode.validate()) {
          this.axios.post("api/verify-tk-recover/", {email: this.recover_email, token: this.user.code}).then((res) => {
            this.overlay = true;
            this.closeDialogs();
            this.overlay = false;
            this.dialog_changePasswd = true;
            this.$refs.formVerifyCode.reset();
          }).catch((error) => {
            this.user.code = null;
            this.snackbar = true;
            this.text = error.response.data;
            this.color = "error";
            this.overlay = false;
          })
        }
      },
      postChangePasswd() {
        this.overlay = true;
        if (this.$refs.formChangePasswd.validate()) {
          this.axios.post("api/change-password/", {email: this.recover_email, password: this.user.passwd}).then((res) => {
            this.overlay = true;
            this.closeDialogs();
            this.overlay = false;
            this.snackbar = true;
            this.text = "Password changed successfully.";
            this.color = "success";
            this.$refs.formChangePasswd.reset();
          }).catch((error) => {
            this.user.passwd = null;
            this.user.passwdconfirm = null;
            this.snackbar = true;
            this.text = error.response.data;
            this.color = "error";
            this.overlay = false;
          })
        }
      },
      postRegister() {
        this.overlay = true;
        if (this.$refs.form1.validate()) {
          this.overlay = true;
          this.axios.post("api/user/", this.user).then((res) => {
            localStorage.setItem('Authorization', res.data.token)
            localStorage.setItem('Username', res.data.username)
            this.addToken(localStorage.getItem('Authorization'));
            this.finalizePost("Welcome, successfully registered: " + this.user.email, "success")
          }).catch((error) => {
            this.finalizePost(error.response.data, "error")
            this.overlay = false;
          })
        }
      },
      signUp() {
        this.dialog_login = false;
        this.dialog_register = true;
      },
      logOut() {
        clearInterval(this.interval);
        localStorage.removeItem('Authorization');
        localStorage.removeItem('Username');
        this.axios.defaults.headers.common.Authorization = null;
        this.verifyStatus();
        location.reload();
      },
      closeDialogs() { // CLOSE ALL DIALOGS
        this.dialog_login = false;
        this.dialog_register = false;
        this.dialog_recovery = false;
        this.dialog_sendcode = false;
        this.dialog_changePasswd = false;
      },
      openDialogRecoveryPasswd() {
        if (this.recover_email) {
          this.dialog_login = false;
          this.dialog_register = false;
          this.dialog_recovery = false; // THIS MODAL IS THE MAIN OF THE FUNCTION
          this.dialog_sendcode = true;
          this.dialog_changePasswd = false;
          this.postSendCode(this.recover_email);
        } else {
          this.dialog_login = false;
          this.dialog_register = false;
          this.dialog_recovery = true; // THIS MODAL IS THE MAIN OF THE FUNCTION
          this.dialog_sendcode = false;
          this.dialog_changePasswd = false;
        }
      },
      requestRecovery() {
        this.axios.post("api/recovery-email/", this.user.email).then(() => {
          this.snackbar = true;
          this.text = "We have sent a recovery message to your email.";
          this.color = "success";
        }).catch(() => {
          this.finalizePost("An error has occured.", "error")
        })
      }
    },
  };
</script>

<style src="./Layout.scss" lang="scss" />
