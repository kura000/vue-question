<template>
  <main class="result">
    <div class="inner">

      <h1 class="title">あなたへのご提案</h1>
      <p class="leading">こんな過ごし方はどう？<span>*</span></p>

      <div class="result_flex" v-show="showCard">
        <div
          v-for="(result,index) in finalResult"
          :key="result.id"
          :class="`card card-${index}`"
        >
          <div class="result_title" v-html="result.type"></div>
          <div class="result_text" v-html="result.text"></div>
          <picture class="result_img">
            <img :src="require(`@/assets/img${result.id}.png`)" alt="">
          </picture>
        </div>
      </div>

      <LinkBtn path="/" text="もういちどあそんでくれる？"></LinkBtn>

    </div>
  </main>
</template>
<script>
import LinkBtn from "@/components/LinkBtn.vue";

export default {
  name: 'result',
  components: {
    LinkBtn
  },
  data: function(){
    return {
      imgSrc: "",
      finalResult: [],
      showCard: false
    }
  },
  beforeRouteEnter: function(to, from, next){
    next(function(vm){
      vm.finalResult = vm.$store.state.finalResult
    })
  },
  mounted: async function(){
    if (this.finalResult.length === 0){
      this.$router.push('/')
    } else {
      await this.setImg()
      await this.setCard()
    }
  },
  beforeRouteLeave: function(to, from, next){
    if (to.name === 'Question'){
      // questionに戻る場合、Qnumを１減らす
      this.$store.commit('decrementCurrentQnum');
      // resultListの初期化
      this.$store.dispatch('getResultList').then(() => next());
    } else {
      // homeに進む場合
      next();
    }

  },
  methods: {
    setImg: function(){
      this.imgSrc = `../assets/img${this.finalResult.id}.png`
    },
    setCard: function(){
      this.showCard = true
    },
  }
}
</script>
<style lang="scss">
.result{
  text-align: center;
  .title{
    font-size: 2.6rem;
    font-weight: 500;
    text-align: center;
  }
  .leading{
    display: inline-block;
    font-size: 1.6rem;
    font-weight: 300;
    margin-top: 20px;
    position: relative;
    @media screen and (max-width: 767px) {
      margin-top: 0px;
    }
    span{
      display: inline-block;
      font-weight: 500;
      font-size: 1.8rem;
      color: $orange;
    }
  }
  .inner{
    max-width: none;
  }
  .result_flex{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & > *{
      width: 400px;
      margin-top: 30px;
      padding: 30px 20px 0;
      background-color: #F9E3E1;
      border: 3px dashed #84A59D;
      box-shadow: 0px 0px 0px 10px #F9E3E1;
      & + div{
        margin-left: 40px;
        @media screen and (max-width: 767px) {
          margin-left: 0px;
        }
      }
    }
  }
  .result_title{
    font-size: 3rem;
    font-weight: 500;
    text-align: center;
    line-height: 1.3;
    span{
      color: $orange;
    }
  }
  .result_img{
    display: block;
    max-width: 500px;
    margin: -10px auto 0;
    img{
      max-width: 100%;
    }
  }
  .result_text{
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    line-height: 2;
    margin-top: 20px;
  }
  .card{
    opacity: 0;
    transform: translateY(30px);
    animation: fadein 0.3s linear forwards;
    &.card-0{
      animation-delay: 1.2s;
    }
    &.card-1{
      animation-delay: 1.5s;
    }
    &.card-3{
      animation-delay: 1.8s;
    }
  }
  .linkBtn{
    opacity: 0;
    position: fixed;
    bottom: 40px;
    right: 20px;
    animation: fadein 0.3s linear 2s forwards;
    transition-property: box-shadow bottom right;
    &:hover{
      bottom: 44px;
      right: 24px;
    }
  }
}
@keyframes fadein {
  0%{
    opacity: 0;
    transform: translateY(-30px);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
