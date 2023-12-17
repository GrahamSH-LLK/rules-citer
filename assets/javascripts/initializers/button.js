import { withPluginApi } from "discourse/lib/plugin-api";
export default {
  name: "rules-citer",
  initialize() {
    withPluginApi("0.0.1", (api) => {

      api.onToolbarCreate((toolbar) => {
        toolbar.addButton({
          id: "rule_button",
          group: "fontStyles",
          icon: "balance-scale",
          perform: (e) =>
            e.applySurround(
              `[rule year="${new Date().getFullYear()}"]`,
              "[/rule]",
              "rule_text"
            ),
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
