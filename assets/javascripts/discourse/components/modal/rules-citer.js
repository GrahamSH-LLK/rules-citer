import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class PostSearch extends Component {
  @tracked searchInput = "";
  @tracked searchResults = [];
  @action
  async search() {
    const url = `https://frctools.com/api/search?year=${new Date().getFullYear()}&query=${this.searchInput}&semantic=true`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    this.searchResults = data.hits;
  }
  @action
  async select(result) {
    console.log(this.args);
    // update the post
    this.args.model.toolbarEvent.addText(`https://frctools.com/${new Date().getFullYear()}/rule/${result.name}`);
  }
}
