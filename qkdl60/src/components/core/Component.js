export default class Component {
  $target;
  state;
  props;
  constructor({$target, props}) {
    this.$target = $target;
    this.props = props;
    this.state = this.initState();
    this.render();
    this.setup();
  }
  initState() {
    return {};
  }
  setState(nextValue) {
    this.state = nextValue;
    this.render();
  }
  render() {
    //기본적으로 innerHTML으로
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  mounted() {
    //렌더링 후 필요한 작업들
  }
  setup() {
    //처음 렌디링시 실행되는 것들, 이벤트 리스너 등
  }
  template() {
    //렌더링 할 내용
    return ``;
  }
}
