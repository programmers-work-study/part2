export default class Loading {
  constructor({ $target }) {
    this.$target = $target;

    this.$loading = document.createElement("div");
    this.$loading.className = "LoadingContainer";
    this.$loading.style.display = "none";

    this.$loadingCircle = document.createElement("div");
    this.$loadingCircle.className = "Loading";
    this.$loadingText = document.createElement("span");
    this.$loadingText.className = "LoadingText"
    this.$loadingText.innerText = "Loading...";

    this.$loading.appendChild(this.$loadingCircle);
    this.$loading.appendChild(this.$loadingText);
    $target.appendChild(this.$loading);
  }

  show() {
    this.$loading.style.display = "block";
  }

  hide() {
    this.$loading.style.display = "none";
  }
}
