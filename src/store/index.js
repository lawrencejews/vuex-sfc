import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// fake API call //
let inventory = {
  chips: {
    stock: 40
  }
};

var pingInventory = function(item) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(inventory[item]);
    }, 3000);
  });
};

export default new Vuex.Store({
  state: {
    supply: 40,
    isRestocking: false,
    isDispensing: false
  },
  actions: {
    fetchFromInventory({ commit }) {
      commit("isRestocking", true);
      pingInventory("chips")
        .then(inventory => {
          commit("stockItems", inventory.stock);
        })
        .finally(() => commit("isRestocking", false));
    },
    dispense(context) {
      context.commit("dispense");
    }
  },
  getters: {},
  mutations: {
    isRestocking(state, payload) {
      state.isRestocking = payload;
    },
    dispense(state) {
      state.supply--;
    },
    stockItems(state) {
      state.supply = 40;
    }
  }
});
