import { withPluginApi } from "discourse/lib/plugin-api";
import showModal from "discourse/lib/show-modal";
import PostSearch from "../components/modal/rules-citer";
export default {
  name: "rules-citer",
  initialize() {
    withPluginApi("0.0.1", (api) => {
      const modal = api.container.lookup("service:modal");

      // add option to toolbar
      api.addComposerToolbarPopupMenuOption({
        action: (toolbarEvent) => {
          modal.show(PostSearch, { model: { toolbarEvent } });
        },
        icon: "balance-scale",
        label: "rule_search_title",
      });

      api.onToolbarCreate((toolbar) => {
        toolbar.addButton({
          id: "rule_button",
          group: "fontStyles",
          icon: "balance-scale",
          perform: (e) => {
            e.applySurround(
              `[rule year="${new Date().getFullYear()}"]`,
              "[/rule]",
              "rule_text"
            );
          },
        });
      });
      let translations = I18n.translations[I18n.currentLocale()].js;
      if (!translations) {
        translations = {};
      }
      if (!translations.composer) {
        translations.composer = {};
      }
      translations.composer.rule_button_title = "Cite Rule";

      translations.composer.rule_text = "Rule Number";
    });
  },
};
