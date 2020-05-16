<template>
  <div class=right>
    <card1></card1>
    <card2 class='card2'></card2>
    <card3 class='card3'></card3>
    <card4></card4>
  </div>
</template>
<script>
import card1 from '@/components/card/card1'
import card2 from '@/components/card/card2'
import card3 from '@/components/card/card3'
import card4 from '@/components/card/card4'
export default {
  components: {
    card1,
    card2, card3, card4
  }
}
</script>
<style scoped>
.card1 {
  margin-bottom: 20px;
}
.card2 {
  margin-bottom: 20px;
}
.card3 {
  margin-bottom: 20px;
}
</style>