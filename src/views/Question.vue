<template>
  <main class="question">
    <div class="inner">
      <div class="question_text">
        <div><span>{{currentQnum}}.</span><p v-html="currentQuestion.question"></p></div>
      </div>


        <div class="question_optionList">
          <div v-for="option in currentQuestion.options" :key="option.id" class="question_optionItem">
            <input
              type="radio"
              name="answer"
              :id="option.id"
              :value="option.value"
              v-model="answer"
            >
            <label :for="option.id" :class="{ active: labelShow}">
              <span v-html="option.option"></span>
            </label>
          </div>
        </div>


      <div class="question_btn">
        <button
          @click="clickBack"
          class="prev"
          :class="{ active: prevBtnPing }">
          前にもどる
        </button>
        <button
          @click="clickNext"
          class="next"
          :class="{ disabled: disabled(), active: nextBtnPing }"
          :disabled="disabled()">
          次にすすむ
        </button>
      </div>

    </div>
  </main>
</template>
<script>
export default {
  name: 'qustion',
  components: {

  },
  data: function(){
    return {
      questionList: [],
      resultList: [],
      answerList: [],
      currentQuestion: {},
      currentQnum: 0,
      answer: "",
      prevBtnPing: false,
      nextBtnPing: false
    }
  },
  beforeRouteEnter: function(to, from, next){
    next(function(vm){
      // 質問リストと結果リストの取得（mountedはおそい）
      vm.questionList = vm.$store.state.questionList;
      vm.resultList = vm.$store.state.resultList;
      vm.answerList = vm.$store.state.answerList;
      vm.currentQnum = vm.$store.state.currentQnum;
      vm.getCurrentQuestion();
      vm.setAnswer()
    });
  },
  mounted: function(){
    if (this.questionList.length === 0){
      this.$router.push('/');
    }
  },
  methods: {

    // 質問リストから現在の質問を取得
    getCurrentQuestion: function(){
      this.questionList.map((question) => {
        if (question.number === this.currentQnum) {
          this.currentQuestion = question
        }
      });
      this.prevBtnPing = false
      this.nextBtnPing = false
    },

    // 現在の質問の回答をセットする
    setAnswer: function(){
      const target = this.answerList.find((answer) => {
        return answer.questionNumber === this.currentQnum
      })
      this.answer = target.answer
    },

    // つぎに進むぼたんの制御
    disabled: function () {
      return (this.answer.length == 0 ? true : false);
    },

    // つぎに進むぼたん
    clickNext: function(){
      this.nextBtnPing = true
      this.answerList.map((answer)=> {
        if (answer.questionNumber === this.currentQnum ){
          answer.answer = this.answer
        }
      })
      setTimeout(()=>{
        this.answer = "";
        this.goNext();
      },500)
    },

    // 前にもどるぼたん
    clickBack: function(){
      this.prevBtnPing = true
      this.$store.commit('decrementCurrentQnum');
      this.currentQnum = this.$store.state.currentQnum;
      setTimeout(()=>{
        this.backBefore()
      },500)
    },

    // 次の質問に進む
    goNext: function(){
      this.$store.commit('incrementCurrentQnum');
      this.currentQnum = this.$store.state.currentQnum;
      this.$store.commit('uploadAnswerList', this.answerList);
      this.getCurrentQuestion();
      if (this.currentQnum === 7){
        this.calcPoint();
      }
    },

    // 前の質問に戻る
    backBefore: function(){
        if (this.currentQnum === 0){
          this.goHome();
        } else if (this.currentQnum < 7 ){
          this.getCurrentQuestion()
          this.setAnswer()
        }
    },

    // ホームに戻るときの処理
    goHome: function(){
      // アラート出す。
      this.$router.push('/', () => {})
    },

    // ポイントを計算する
    calcPoint: function(){
      let targetQuestion ={}
      let targetOption = {}
      this.answerList.map((answer)=>{
        // 1.質問NOが一致するquestionを取り出す
        targetQuestion = this.findTargetQuestion(answer.questionNumber);
        // 2.取り出したquestionからvalueが一致するoptionを取り出す
        targetOption = this.findTargetOption(targetQuestion, answer.answer);
        // 3.取り出したoptionのポイントを結果リストに追加していく
        this.addEachPoint(targetOption);
      })
      // 4.一番ポイントが多い結果を保存する
      this.finalResult = this.pickedFinalResult();
      // 5.結果画面に遷移
      this.$router.push('/result', () => {})
    },

    // 質問NOが一致するquestionを取り出す（引数：Array、返り値：Object）
    findTargetQuestion: function(questionNo){
      let target = {}
      this.questionList.map((question)=>{
        if (question.number === questionNo){
          target = question;
        }
      })
      return target;
    },

    // 取り出したquestionからanswerが一致するoptionを取り出す（引数：Array、返り値：Object）
    findTargetOption: function(question, answer){
      let target = {}
      question.options.map((option)=>{
        if (option.value === answer){
          target = option
        }
      })
      return target;
    },

    addEachPoint: function(option){
      this.resultList.map((result)=>{
        (result.id === option.pointThree) ? result.point = result.point + 3 :
        (result.id === option.pointTwo) ? result.point = result.point + 2 :
        (result.id === option.pointOne) ? result.point = result.point + 1 :
        result.point = result.point + 0;
      })
    },

    pickedFinalResult: function(){
      const allPoint = [];
      this.resultList.map((result)=>{
        allPoint.push(result.point);
      })
      const heighestPoint = Math.max(...allPoint);
      let finalResult = [];
      this.resultList.map((result)=>{
        if (result.point === heighestPoint){
          finalResult.push(result);
        }
      })
      this.$store.commit('setFinalResult', finalResult);
    }
  }
}
</script>
<style lang="scss">
.question{
  padding: 50px 0;
  text-align: center;
  @media screen and (max-width: 767px){
    padding: 20px 0;
  }
  .question_text{
    font-weight: 500;
    font-size: 2.6rem;
    @media screen and (max-width: 767px){
      font-size: 2rem;
    }
    p{
      display: inline-block;
    }
    span{
      font-weight: bold;
      padding-right: 10px;
    }
  }
  .question_optionList{
    margin-top: 100px;
    @media screen and (max-width: 767px){
      margin-top: 40px;
    }
    input[type="radio"]{
      display: none;
    }
    .question_optionItem{
      margin-top: 40px;
    }
    input[type="radio"]:checked + label{
      border-color: #FFD804;
      background-color: #93c8e9;
      box-shadow: 0px 0px 0px 10px #93c8e9;
      background-color: darken(#8FC8EB, 5%);
      span::before{
        background-color: darken(#8FC8EB, 5%);
      }
    }
    label{
      display: block;
      background-color: #8FC8EB;
      cursor: pointer;
      font-size: 2rem;
      font-weight: 500;
      padding: 20px 20px;
      border: 3px dashed $light-blue;
      box-shadow: 0px 0px 0px 10px #8FC8EB;
      transition: border-color,background-color 0.5s;

      // transform: translateX(-100%);
      @media screen and (max-width: 767px){
        font-size: 1.6rem;
        line-height: 1.8;
        padding: 10px;
      }
      &:hover{
        background-color: darken(#8FC8EB, 5%);
      }
      &.active{
        width: 100%;
      }
      span{
        display: inline-block;
        opacity: 0;
        animation: labelIn 0.7s ease-in 0s forwards;
      }
    }
  }
  .question_btn{
    display: flex;
    justify-content: space-between;
    margin-top: 120px;
    button{
      appearance: none;
      outline: none;
      padding-bottom: 5px;
      border: none;
      background-color: transparent;
      font-size: 1.8rem;
      font-weight: 500;
      transition-duration: 0.3s;
      position: relative;
      z-index: 1;
      @media screen and (max-width: 767px){
        font-size: 1.4rem;
      }
      &::before{
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        background-color: #FFd804;
        border-radius: 100%;
        box-shadow: 0 0 8px 8px #FFd804;
        opacity: 0.6;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        transition-duration: 0.3s;
      }
      &:not(:disabled){
        cursor: pointer;
        &:hover{
          opacity: 0.7;
        }
      }
      &:disabled{
        color: #a0a0a0;
        border-bottom-color: #a0a0a0;
        &::before{
          opacity: 0;
        }
      }
      &.active{
        &::before{
          animation: btnPing 0.7s ease 0s;
          transform-origin: center;
        }
      }
    }
  }
}

@keyframes labelIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes btnPing {
  from {
    width: 40px;
    height: 40px;
    opacity: 1;
  }
  to {
    width: 60px;
    height: 60px;
    opacity: 0;
  }
}
</style>