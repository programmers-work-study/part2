export default class Component {
  $target;
  state;
  props;
  constructor({$target, props}) {
    this.$target = $target;
    this.props = props;

    this.render();
    this.setup();
  }
  setState(nextValue) {
    this.state = nextValue;
    this.render();
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  mounted() {}
  setup() {}
  template() {
    return ``;
  }
}
