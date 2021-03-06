<template lang="pug">
  .main-page

    //- random number to guess
    .number-to-guess
      span.number
        client-only
          | {{ this.randomNumber }}

    //- form area
    form(
      @submit.prevent='checkUserInput',
    )
      .form-group
        label
          | Could you write the number above as Roman Number?

        input.form-control.form-control-lg(
          type='text'
          placeholder='Enter here your answer'
          v-model="userNumber"
        )

      button.btn.btn-primary(
        type='submit'
      )
        | Check


      //- feedback messages when no input set
      p.alert.alert-info.mt-3(
        v-if='isInputEmpty'
        role='alert'
      )
        | Please insert some values in the input field

    modal(
      name='modal-feedback'
      :class='feedbackClassname'
      :adaptive='true'
      :clickToClose='false'
      @before-open='overlayBeforeOpen'
      @before-close='overlayBeforeClose'
    )
      h1.feedback-title(
        v-html='feedbackTitle'
      )
      p(
        v-html='feedbackText'
      )

      button.btn.btn-outline-secondary(
        type='button'
        @click.prevent='removeModal',
        v-if='isLayerFeedback'
      )
        | Next number

      button.btn.btn-outline-light(
        type='button'
        @click.prevent='restartGame',
        v-if='isLayerRestart'
      )
        | Restart
</template>

<script>
const RANDOM_NUMBER_START = 1
const MAX_ERRORS_ALOUD = 3
const MAX_ANSWERS = 5
// TODO: here max value. 10 set for easy develoing mode
const RANDOM_NUMBER_END = 10

export default {
  data() {
    return {
      randomNumber: this.getRandomNumber(
        RANDOM_NUMBER_START,
        RANDOM_NUMBER_END
      ),
      isInputEmpty: false,
      isInputWrong: false,
      isInputCorrect: false,
      userNumber: null,
      isLayerFeedback: false,
      isLayerRestart: false,
      feedbackClassname: false,
      feedbackTitle: false,
      feedbackText: 'mon',
    }
  },

  methods: {
    removeModal() {
      this.isLayerFeedback = false
      this.isLayerRestart = false
      this.$modal.hide('modal-feedback')
    },

    restartGame() {
      this.resetCounter()
      this.removeModal()
      console.log('RESTART Game')
    },

    overlayBeforeOpen(event) {
      this.feedbackClassname = event.params.feedbackClassname
      this.feedbackTitle = event.params.feedbackTitle
      this.feedbackText = event.params.feedbackText
    },

    overlayBeforeClose() {
      // set new random value and move on
      this.updateGuessNumber()
    },

    resetCounter() {
      this.$store.commit('answerCorrect/reset')
      this.$store.commit('answerWrong/reset')
      console.log('RESET counter')
    },

    updateGuessNumber() {
      // clean input field
      this.userNumber = null
      // new number to guess
      this.randomNumber = this.getRandomNumber(
        RANDOM_NUMBER_START,
        RANDOM_NUMBER_END
      )
    },

    getRandomNumber: (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },

    // inspired by
    // http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
    converter: userString => {
      var str = userString.toUpperCase(),
        validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
        token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
        key = {
          M: 1000,
          CM: 900,
          D: 500,
          CD: 400,
          C: 100,
          XC: 90,
          L: 50,
          XL: 40,
          X: 10,
          IX: 9,
          V: 5,
          IV: 4,
          I: 1,
        },
        num = 0,
        m

      if (!validator.test(str)) {
        // no digit in the input filed. return a feedback message to the user
        // not counted as error
        return false
      }

      while ((m = token.exec(str))) num += key[m[0]]
      return num
    },

    showModalCorrectAnswer() {
      this.isLayerFeedback = true
      this.$modal.show('modal-feedback', {
        feedbackClassname: 'is-modal-correct',
        feedbackTitle: 'Yes !!!',
        feedbackText: `You have answered correctly <b>${this.$store.state.answerCorrect.counter}</b> questions.`,
      })
    },

    showModalError() {
      this.isLayerFeedback = true
      this.$modal.show('modal-feedback', {
        feedbackClassname: 'is-modal-error',
        feedbackTitle: 'Ops !!!',
        feedbackText: `You have done  <b>${this.$store.state.answerWrong.counter}</b> errors.`,
      })
    },

    showModalGameOver() {
      this.isLayerRestart = true
      this.$modal.show('modal-feedback', {
        feedbackClassname: 'is-modal-game-over',
        feedbackTitle: `Ouch! <b>${MAX_ERRORS_ALOUD}</b> errors.`,
        feedbackText: 'You have done  too many errors. Game Over.',
      })
      // reset game counter
      this.resetCounter()
    },

    showModalEndGame() {
      this.isLayerRestart = true
      this.$modal.show('modal-feedback', {
        feedbackClassname: 'is-modal-end-game',
        feedbackTitle: 'Good try!',
        feedbackText: `You have answered correctly <b>${this.$store.state.answerCorrect.counter}</b> of <b>${MAX_ANSWERS}</b> questions!`,
      })
      // reset game counter
      this.resetCounter()
    },

    checkUserInput() {
      // reset feedback messages status
      this.isInputEmpty = false
      this.isInputWrong = false
      this.isInputCorrect = false

      // no input digit >> no start, feedback messagge
      // user has to write something ...
      if (!this.userNumber) {
        this.isInputEmpty = true
        return false
      }

      if (this.converter(this.userNumber) === this.randomNumber) {
        this.isInputCorrect = true
        this.$store.commit('answerCorrect/increment')
      } else {
        this.isInputWrong = true
        this.$store.commit('answerWrong/increment')
      }

      console.log('==============')
      console.log(`good are: ${this.$store.state.answerCorrect.counter}`)
      console.log(`wrong are: ${this.$store.state.answerWrong.counter}`)

      if (this.$store.state.answerWrong.counter === MAX_ERRORS_ALOUD) {
        this.showModalGameOver()
      } else if (
        this.$store.state.answerCorrect.counter +
          this.$store.state.answerWrong.counter ===
        MAX_ANSWERS
      ) {
        this.showModalEndGame()
      } else if (this.isInputWrong) {
        this.showModalError()
      } else {
        this.showModalCorrectAnswer()
      }
    },
  },
}
</script>

<style lang="sass">
.number-to-guess
  text-align: center
  margin: 20px 0 40px

.number
  display: block
  margin: 30px auto
  font-size: 64px
  font-weight: bold
  // for no-ssr
  min-height: 96px

.form-control
  text-transform: uppercase


.v--modal-overlay
  background: #efefef

  .v--modal-box
    padding: 15px
    text-align: center
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  &.is-modal-error
    .feedback-title
      color: red

  &.is-modal-correct
    .feedback-title
      color: green

  &.is-modal-game-over,
  &.is-modal-end-game
    .v--modal-box
      color: white
      background: transparent
      box-shadow: none

  &.is-modal-game-over
    background-color: red

  &.is-modal-end-game
    background-color: green
</style>
