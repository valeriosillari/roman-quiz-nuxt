export const state = () => ({
  counter: 0
});

export const mutations = {
  reset(state) {
    state.counter = 0;
  },

  increment(state) {
    state.counter++;
  }
};
