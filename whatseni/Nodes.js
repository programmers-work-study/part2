export default class Nodes {
  constructor({ $target, state, onClick }) {
    this.$NodesContainer = document.createElement('div');
    this.$NodesContainer.className = 'Nodes';

    this.state = state;
    this.onClick = onClick;

    $target.appendChild(this.$NodesContainer);
    this.render();
  }

  setState(nextData) {
    this.state = nextData;
    this.render();
  }

  render() {
    this.$NodesContainer.innerHTML = ``;
    const DIR = "DIRECTORY";
    const FILE = "FILE";
    if (!this.state.isRoot) {
      const prevNode = document.createElement('div');
      prevNode.className = 'Node';
      prevNode.innerHTML = '<img src="./assets/prev.png" />';
      prevNode.addEventListener('click', () => {
        this.onClick({ type: 'PREV' });
      });
      this.$NodesContainer.appendChild(prevNode);
    }
    this.state.fileList.forEach((node) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'Node';
      nodeEl.innerHTML = `
        <img src="${node.type === DIR ? './assets/directory.png' : './assets/file.png'}">
        <div>${node.name}</div>
      `;
      nodeEl.addEventListener('click', () => this.onClick(node));
      this.$NodesContainer.appendChild(nodeEl);
    })
  }
}