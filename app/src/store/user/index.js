export default {
  namespaced: true, // faz com que o Vue reconheça que esse arquivo é um módulo de user
  state: () => ({
    user: {},
  }),
  mutations: {
    STORE_USER(state, user) {
      state.user = user;
    },
  },
  actions: {},
};
