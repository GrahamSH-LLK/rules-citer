import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class PostSearch extends Component {
  @tracked searchInput = "";
  @tracked searchResults = [];
  @action
  async search() {
    const url = `https://search.grahamsh.com/search`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        query: this.searchInput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    this.searchResults = data.data;
  }
  @action
  async select(result) {
    console.log(this.args);
    // update the post
    this.args.model.toolbarEvent.addText(`[rule year=${new Date().getFullYear()}]${result.text}[/rule]`);
  }
}
