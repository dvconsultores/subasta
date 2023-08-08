<template>
  <v-footer id="footer" color="var(--colorFooter)"
    height="auto" absolute>
    <v-row no-gutters class="divcol align" style="max-width: 90%">
      <!-- content -->
      <section class="space" style="width: 100%">
        <aside class="contright divrow">
          <div class="divcol">
            <div class="divrow" style="cursor: pointer;">
              <a v-for="(item, index) in dataIconos" v-bind:key="index"
                class="divpadd paddleftdel marginright" :href="item.link" target="_blank">
                <v-icon large color="#FFFFFF !important">{{ item.icon }}</v-icon>
              </a>
            </div>
          </div>
        </aside>
      </section>

      <span class="tcenter h7-em colorFooter">
        &copy;2023 LARA ALCANTARA, All Rights Reserved.
      </span>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      dataFooter : [
        {
          title: "Contact",
          footerLink: [
            {
              link: "Telegram"
            },
            {
              link: "Whatsapp"
            }
          ]
        },
      ],
      dataIconos: [
        {
          icon: "mdi-instagram",
          link: "https://www.instagram.com/laraalcantara/"
        },
        {
          icon: "mdi-mail",
          link: "https://www.instagram.com/laraalcantara/"
        },
        {
          icon: "mdi-telegram",
          link: "https://www.instagram.com/laraalcantara/"
        }
      ]
    }
  }
}
</script>

<style src="./Layout.scss" lang="scss" />
