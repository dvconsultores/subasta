<template>
  <section id="ranking" class="componentSpace parent">
    <aside class="space divwrapmobile">
      <h2 class="h3">Ranking</h2>
      <aside class="contright divrow">
        <div v-for="(item, index) in dataFilter" :key="index"
          class="divrow acenter divwrapmobile">
          <label :for="item.for" class="h7">{{ item.label }}</label>
          <v-select
            :id="item.id"
            v-model="item.sort"
            :items="item.filter"
            solo
            attach
            hide-details
            append-icon="mdi-chevron-down"
          />
        </div>
      </aside>
    </aside>

    <aside class="contdown">
      <section v-for="(item, index) in dataCards" :key="index"
        class="relative">
        <div class="number h7">
          {{ item.number }}
        </div>

        <v-card color="var(--colorCartas)" class="divrow">
          <img :src="item.img" alt="images">
          <aside class="divcol jcenter">
            <div class="divrow jspace">
              <span class="tl h7">{{ item.title }}</span>
              <span class="h7" :class="{ greenPercent: item.activeG, redPercent: item.activeR }">
                {{ item.percent }}
              </span>
            </div>
            <div class="jspace">
              <span class="h7">Floor Price:  {{ item.price}}</span>
              <span class="h7">{{ item.amount }}</span>
            </div>
          </aside>
        </v-card>
      </section>
    </aside>
  </section>
</template>

<script>
export default {
  name: "Ranking",
  data() {
    return {
      dataFilter: [
        {
          id: "sortA",
          for: "sortA",
          label: "Sort:",
          sort: "",
          filter: ['Volume', 'Volume', 'Volume', 'Volume']
        },
        {
          id: "sortB",
          for: "sortB",
          label: "Over:",
          sort: "",
          filter: ['Last 1 day', 'Last week', 'Last month']
        },
      ],
      dataCards: [
        {
          number: "1",
          img: require("@/assets/ranking/r1.png"),
          title: "Fantasy star",
          percent: "0%",
          activeG: true,
          activeR: false,
          price: "0",
          amount: "0"
        },
        {
          number: "2",
          img: require("@/assets/ranking/r2.png"),
          title: "Fantasy star",
          percent: "0%",
          activeG: true,
          activeR: false,
          price: "0",
          amount: "0"
        },
        {
          number: "3",
          img: require("@/assets/ranking/r3.png"),
          title: "Fantasy star",
          percent: "0%",
          activeG: true,
          activeR: false,
          price: "0",
          amount: "0"
        },
        {
          number: "4",
          img: require("@/assets/ranking/r4.png"),
          title: "Fantasy star",
          percent: "0%",
          activeG: true,
          activeR: false,
          price: "0",
          amount: "0"
        },
        {
          number: "5",
          img: require("@/assets/ranking/r5.png"),
          title: "Fantasy star",
          percent: "0%",
          activeG: true,
          activeR: false,
          price: "0",
          amount: "0"
        },
        {
          number: "6",
          img: require("@/assets/ranking/r6.png"),
          title: "Fantasy star",
          percent: "0%",
          activeG: true,
          activeR: false,
          price: "0",
          amount: "0"
        },
        {
          number: "7",
          img: require("@/assets/ranking/r7.png"),
          title: "Fantasy star",
          percent: "0%",
          activeG: true,
          activeR: false,
          price: "0",
          amount: "0"
        },
        {
          number: "8",
          img: require("@/assets/ranking/r8.png"),
          title: "Fantasy star",
          percent: "0%",
          activeG: true,
          activeR: false,
          price: "0",
          amount: "0"
        }
      ]
    }
  },
};
</script>

<style src="../Pages.scss" lang="scss" />
