<template>
  <section id="home" class="align">
    <NewCollections ref="newcollections" />
  </section>
</template>

<script>
import Hero from './Hero.vue'
import NewCollections from './NewCollections.vue'
import Ranking from './Ranking.vue'
import Recomended from './Recomended.vue'

export default {
  name: "Home",
  components: {
    Hero,
    Recomended,
    Ranking,
    NewCollections
  },
  data() {
    return {
    }
  },
  // mounted() {
  //   // window.addEventListener('resize', this.getDimensions);
  //   this.responsive();
  // },
  // // unmounted() {
  // //   window.removeEventListener('resize', this.getDimensions)
  // // },
  // methods: {
  //   // getDimensions() {
  //   //   this.responsive();
  //   // },
  //   responsive() {
  //     if (window.innerWidth <= 880) {
  //       this.leftCard = false;
  //       this.centerCard = true;
  //       this.rightCard = false;
  //     } else {
  //       this.leftCard = true;
  //       this.centerCard = true;
  //       this.rightCard = true;
  //     }
  //   }
  // },
};
</script>

<style src="../Pages.scss" lang="scss" />
