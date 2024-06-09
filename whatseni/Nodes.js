export default class Nodes {
  constructor($target, fileList) {
    this.onClick = onClick;
    this.$NodesTarget = $target;

    this.$NodesContainer = document.createElement('div');
    this.$NodesContainer.className = 'Nodes';

    // this.$Node = document.createElement('div');

    // this.$PrevNode = document.createElement('img');
    // this.$PrevNode.src = "./assets/prev.png";

    // this.$Node.appendChild(this.$PrevNode);
    // this.$NodesContainer.appendChild(this.$Node);

    $target.appendChild(this.$NodesContainer);
  }

}