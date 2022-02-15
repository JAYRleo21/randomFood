console.log('Proyect init');
//vueapp
const App = {
  data() {
    return {
      dishes: [],
      maxCost: 0,
      minCost: 0,
      cost: 0,
      dish: undefined,
      totalOptions: undefined
    };
  },
  beforeMount() {
    this.getJson();
  },
  methods: {
    getJson() {
      fetch('./assets/data.json')
      .then(response => response.json())
      .then(data => {
        console.log("dishes", data);
        this.dishes = data;
        this.maxCost = data.reduce((prev, current) => (prev.cost > current.cost) ? prev : current).cost;
        this.minCost = data.reduce((prev, current) => (prev.cost < current.cost) ? prev : current).cost;
        this.cost = parseInt(this.maxCost / 2);
      })
      .catch(error => console.log(error));
    },
    getDish(){
      let items = this.dishes.map(item => item.cost <= this.cost && item).filter(item => item);
      this.totalOptions = items;
      this.dish = items[Math.floor(Math.random()*items.length)];
    }
  }
}

Vue.createApp(App).mount('#vueapp')
