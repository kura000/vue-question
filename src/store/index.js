import axios from 'axios';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// 初期化用
const getDefaultState = () => {
  return {
    questionList : [],
    resultList : [],
    answerList : [
      { "questionNumber": 1, "answer": ""},
      { "questionNumber": 2, "answer": ""},
      { "questionNumber": 3, "answer": ""},
      { "questionNumber": 4, "answer": ""},
      { "questionNumber": 5, "answer": ""},
      { "questionNumber": 6, "answer": ""},
    ],
    currentQuestion: {},
    currentQnum: 0,
    finalResult: []
  }
}
const getDefaultAnswerList = () => {
  return {
    answerList : [
      { "questionNumber": 1, "answer": ""},
      { "questionNumber": 2, "answer": ""},
      { "questionNumber": 3, "answer": ""},
      { "questionNumber": 4, "answer": ""},
      { "questionNumber": 5, "answer": ""},
      { "questionNumber": 6, "answer": ""},
    ]
  }
}

export default createStore({
  state: {
    questionList : [],
    resultList : [],
    answerList : [
      { "questionNumber": 1, "answer": ""},
      { "questionNumber": 2, "answer": ""},
      { "questionNumber": 3, "answer": ""},
      { "questionNumber": 4, "answer": ""},
      { "questionNumber": 5, "answer": ""},
      { "questionNumber": 6, "answer": ""},
    ],
    currentQuestion: {},
    currentQnum: 1,
    finalResult: []
  },

  mutations: {
    // 質問リストのセット
    setQuestionList (state, response) {
      state.questionList = response
    },
    // 結果リストのセット
    setResultList (state, response) {
      state.resultList = response
    },
    // 現在の質問番号
    setCurrentQuestionNo (state, response) {
      state.currentQuestionNo = response
    },
    // 質問番号を一つ次に進める
    incrementCurrentQnum (state, response) {
      state.currentQnum++
    },
    // 質問番号を一つ前に戻す
    decrementCurrentQnum (state, response) {
      state.currentQnum--
    },
    // 回答リストの更新
    uploadAnswerList (state, response) {
      state.answerList = response
    },
    // 最終結果のセット
    setFinalResult (state, response) {
      state.finalResult = response
    },
    // データの初期化
    clearData (state) {
      Object.assign(state, getDefaultState())
    },
    // 回答リストのクリア
    clearAnswerList (state) {
      Object.assign(state, getDefaultAnswerList())
    },
    // 質問番号のクリア
    clearCurrentQnum (state) {
      state.currentQnum = 1
    }
  },

  actions: {
    async getQuestionList (context) {
      const response = await axios.get('/question/json/question.json');
      context.commit('setQuestionList', response.data);
    },
    async getResultList (context) {
      const response = await axios.get('/question/json/result.json');
      context.commit('setResultList', response.data);
    }
  },

  modules: {

  },

  plugins: [
    createPersistedState({storage: window.sessionStorage})
  ]
})
