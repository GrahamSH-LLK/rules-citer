export function setup(helper) {
  if (!helper.markdownIt) {
    return;
  }

  helper.registerOptions((opts, siteSettings) => {
    opts.features["rules-citer"] =
      !!siteSettings.discourse_rules_enabled;
  });

  helper.allowList(["a"]);

  helper.registerPlugin((md) => {
    const ruleRegex = /(([a-zA-Z])(\d{3}))|(\d+\.\d(\.\d)?)/;
    md.inline.bbcode.ruler.push("rule", {
      tag: "rule",
      wrap: function (startToken, endToken, tagInfo, content, state) {
        const year = tagInfo.attrs["year"] || new Date().getFullYear();

        if (ruleRegex.test(content)) {
          startToken.type = "link_open";
          startToken.tag = "a";

          startToken.attrs = [
            ["href", `https://frctools.com/${year}/rule/${content}`],
            ["data-bbcode", "true"],
          ];
          
          let startTokenIdx = state.tokens.findIndex((t) => t == startToken);
          if (startTokenIdx > 0) {
            let prevToken = state.tokens[startTokenIdx - 1];
            if (prevToken.type == "softbreak") {
              startToken.attrs.push(["class", "onebox"]);
            }
          } else {
            // check no tokens after endToken
            let endTokenIdx = state.tokens.findIndex((t) => t == endToken);
            let nextToken = state.tokens[endTokenIdx + 1];
            if (!nextToken) {
              startToken.attrs.push(["class", "onebox"]);
            }
          }

          startToken.content = "";
          startToken.nesting = 1;

          endToken.type = "link_close";
          endToken.tag = "a";
          endToken.content = "";
          endToken.nesting = -1;
        } else {
          // just strip the bbcode tag
          endToken.content = "";
          startToken.content = "";

          // edge case, we don't want this detected as a onebox if auto linked
          // this ensures it is not stripped
          startToken.type = "html_inline";
        }

        return false;
      },
    });
  });
}
