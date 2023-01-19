<template>
  <div class="lesson-card">
    <div class="lesson-card__header">
      <div class="lesson-card__lang-btns">
        <UIButton
          style="border-radius: 10px 10px 0 0"
          class="lesson-card__btn"
          @click="changeLanguage">
          {{changeLangBtnText}}
        </UIButton>
        <UIButton
          :active="isShowVocabulary"
          :style="{ flex: 1, 'border-radius': '0 0 0 10px' }"
          class="lesson-card__btn"
          @click="changeToVocabulary">
          Словарь
        </UIButton>
        <UIButton
          :active="!isShowVocabulary"
          :style="{ flex: 1, 'border-radius': '0 0 10px 0' }"
          class="lesson-card__btn"
          @click="changeToGrammar">
          {{grammarBtnText}}
        </UIButton>
      </div>

      <div class="lesson-card__progress-container">
        <UIButton
          style="height: 100%"
          class="lesson-card__btn"
          @click="resetProgress">
          Сбросить прохождение
        </UIButton>
      </div>
    </div>

    <div class="lesson-card__wrapper">
      <div>
        <h3 class="lesson-card__title">{{ cardTitle }}</h3>
        <div> Осталось повторить: {{wordsCounter}} из {{vocabulary.length}}</div>
      </div>

      <div class="lesson-card__pair" >
        <div v-if="!isShowEmptyMsg">
          <div>{{ cardWord.word }}</div>
          <div v-if="isShowTranslate" class="lesson-card__translate">{{ cardWord.translate }}</div>
        </div>
        <div v-else> Все пройдено! </div>
      </div>
      <div class="lesson-card__footer">
        <UIButton
          style="margin-right: 10px"
          @click="isShowTranslate=true">
          Показать перевод
        </UIButton>
        <UIButton @click="showNextWord">Следующее слово</UIButton>
      </div>
    </div>
  </div>
</template>

<script>
import spanishWords from '@/store/spanishWords.json';
import englishWords from '@/store/englishWords.json';
import spanishConjugation from '@/store/spanishConjugation.json';
import englishTensesPositive from '@/store/englishTensesActivePositive.json';
import englishTensesNegative from '@/store/englishTensesActiveNegative.json';
import englishTensesQuestion from '@/store/englishTensesActiveQuestion.json';

const LANGUAGES = {
  english: 'Английский',
  spanish: 'Испанский',
};

const LANG_DATA = {
  grammar: {
    english: [
      ...englishTensesPositive,
      ...englishTensesNegative,
      ...englishTensesQuestion,
    ],
    spanish: spanishConjugation,
  },
  vocabulary: {
    english: englishWords,
    spanish: spanishWords,
  },
};

export default {
  name: 'LessonCard',
  components: {},
  data() {
    return {
      vocabulary: [],
      restWords: [],
      isShowTranslate: false,
      isFromForeignToRussian: false,
      currentPair: {},
      currentLanguage: 'english',
      isShowEmptyMsg: false,
      isShowVocabulary: true,
      wordsCounter: null,
    };
  },
  computed: {
    cardWord() {
      const word = this.isFromForeignToRussian
        ? this.currentPair[this.currentLanguage]
        : this.currentPair.russian;
      const translate = this.isFromForeignToRussian
        ? this.currentPair.russian
        : this.currentPair[this.currentLanguage];

      return {
        word,
        translate,
      };
    },
    cardTitle() {
      return this.isFromForeignToRussian
        ? `C ${LANGUAGES[this.currentLanguage]} На Русский`
        : `C Русского на ${LANGUAGES[this.currentLanguage]}`;
    },
    changeLangBtnText() {
      return `Поменять язык на ${LANGUAGES[this.getOppositeLanguage(this.currentLanguage)]}`;
    },
    grammarBtnText() {
      return this.currentLanguage === 'english' ? 'Времена' : 'Спряжения';
    },
  },
  methods: {
    getOppositeLanguage(lang) {
      return Object.keys(LANGUAGES).filter((i) => i !== lang)[0];
    },
    showNextWord() {
      if (this.restWords.length) {
        this.getWord();
        this.wordsCounter = this.restWords.length + 1;
        this.isShowTranslate = false;
      } else {
        this.isShowEmptyMsg = true;
        this.wordsCounter = 0;
      }
    },
    getWord() {
      const min = 0;
      const max = this.restWords.length - 1;
      const randomNum = Math.round(min - 0.5 + Math.random() * (max - min + 1));

      this.currentPair = this.restWords[randomNum];
      this.restWords.splice(randomNum, 1);
    },
    getLanguageData(lang) {
      const type = this.isShowVocabulary ? 'vocabulary' : 'grammar';
      this.vocabulary = LANG_DATA[type][lang];
    },
    initCard(lang) {
      this.getLanguageData(lang);
      this.createWords();
    },
    createWords() {
      this.restWords = [...this.vocabulary];
      this.getWord();
      this.wordsCounter = this.restWords.length + 1;
      this.isShowEmptyMsg = false;
      this.isShowTranslate = false;
    },
    changeLanguage() {
      const oppositeLang = this.getOppositeLanguage(this.currentLanguage);
      this.initCard(oppositeLang);
      this.currentLanguage = oppositeLang;
    },
    changeToVocabulary() {
      this.isShowVocabulary = true;
      this.initCard(this.currentLanguage);
    },
    changeToGrammar() {
      this.isShowVocabulary = false;
      this.initCard(this.currentLanguage);
    },
    resetProgress() {
      this.createWords();
    },
  },
  mounted() {
    this.initCard(this.currentLanguage);
  },
};
</script>

<style lang="scss">
.lesson-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #426072;
  background: #f9e6b9;
  border-radius: 12px;
  max-width: 600px;
  min-height: 300px;
  margin: 0 auto;
  box-shadow: 6px 10px 25px #426072;
  color: #372802;

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px 20px 20px;
    flex: 1;
  }

  &__footer {
     display: flex;
     justify-content: center;
   }

  &__pair {
    margin: 20px 0;
    text-align: center;
    font-size: 30px;
  }

  &__translate {
    color: #426072;
  }

  &__title{
    margin-bottom: 5px;
  }

  &__header {
    display: flex;
  }

  &__lang-btns {
    display: flex;
    flex: 3;
    flex-wrap: wrap;
  }

  &__btn {
    width: 100%;
  }

  &__progress-containe {
    flex: 1;
  }

  &__progress-btn.button {
    height: 100%;
  }
}
</style>
