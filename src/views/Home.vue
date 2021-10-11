<template>
  <main class="home">
    <div class="inner">
      <h1>きょう、なにする？</h1>
      <p>いつもしごとに<br>家事に、追われがちなあなたへ。<br>
      ちょっと息ぬき<br>時間を気にしない<br class="sp">贅沢な過ごし方をご提案します。</p>
      <LinkBtn
        path="/question"
        text="あそんでみる？"
        @mouseenter="showMeow()"
        @mouseleave="hideMeow()">
      </LinkBtn>
      <img alt="" src="../assets/cover.png">

      <span
        class="meow"
        v-if="isShow"
        :style="`
          transform: rotate(${this.rotateDeg}deg);
          top: ${this.posX}%;
          left: ${this.posY}%
        `">
        にゃー
      </span>

    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import LinkBtn from "@/components/LinkBtn.vue";

export default {
  name: 'Home',
  components: {
    LinkBtn
  },
  data: function(){
    return {
      isShow: false,
      posX: 30,
      posY: 60,
      rotateDeg: 30
    }
  },
  mounted: function(){
    this.$store.dispatch('getQuestionList');
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Question'){
      // questionに進む場合、storeの初期化とresutlListの取得
      this.$store.commit('clearAnswerList')
      this.$store.commit('clearCurrentQnum')
      this.$store.dispatch('getResultList').then(() => next());
    } else {
      // resultまたはerrorにブラウザバックされた場合
      next();
    }
  },
  methods: {
    getRandomInt: function(max) {
      return Math.floor(Math.random() * max);
    },
    showMeow: function(){
      this.isShow = true;
      this.posX = this.getRandomInt(100)
      this.posY = this.getRandomInt(100)
      this.rotateDeg = this.getRandomInt(180)
    },
    hideMeow: function(){
      this.isShow = false;
    }
  }
}
</script>
<style lang="scss">
.home{
  .inner{
    position: relative;
  }
  h1{
    color: $orange;
    font-size: 2.4rem;
    font-weight: 500;
  }
  img{
    max-width: 100%;
    @media screen and (max-width: 767px) {
      margin-top: 20px;
    }
  }
  p{
    font-size: 1.8rem;
    font-weight: 300;
    line-height: 2;
    text-align: left;
  }
  .meow{
    font-size: 1.8rem;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
  }
  .linkBtn{
    @media screen and (max-width: 767px) {
      margin-top: 20px;
    }
  }
}
</style>