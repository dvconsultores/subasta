<template>
  <section id="hero" class="parent">
    <aside class="contup divwrap acenter">
      <img src="@/assets/images/hero.png" alt="Background image about NFT">
      <div class="conthero divcol jstart aend centermobile">
        <h1 class="bold tcentermobile">
          Earn our native token for buying and selling NFTs on our marketplace
        </h1>
        <span class="tcentermobile">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet doloremque 
          obcaecati quam impedit cum sit, autem laboriosam. Obcaecati asperiores aspernatur, 
          itaque eius mollitia natus quia dignissimos sequi id quaerat. Nihil?
        </span>
        <v-btn class="h6 marginbottommobile" width="max-content" color="#656565">
          Explore Collections
        </v-btn>
      </div>
      
      <div class="contsearch align">
        <v-text-field
          v-model="search"
          solo
          hide-details="true"
          maxlength="20"
        >
          <template v-slot:append>
            <div class="conticon relative end">
              <v-icon medium>mdi-magnify</v-icon>
            </div>
          </template>

          <template v-slot:label>
            <span class="label h8">
              Search for NFTs and collections
            </span>
          </template>
        </v-text-field>
      </div>
    </aside>
  </section>
</template>

<script>
export default {
  name: "Hero",
  data() {
    return {
      search: ""
    }
  },
};
</script>

<style src="../Pages.scss" lang="scss" />
