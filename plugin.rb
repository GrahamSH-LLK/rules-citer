# name: rules-citer
# about: A plugin to add a rules tag and linking to posts
# version: 0.0.2
# authors: GrahamSH
# url: https://github.com/grahamsh-llk/rules-citer
enabled_site_setting :discourse_rules_enabled

register_svg_icon "scale-balanced"
register_asset "stylesheets/rules.scss"


require_relative "../../lib/onebox"

Onebox = Onebox

class Onebox::Engine::FRCToolsOnebox
  include Onebox::Engine

  matches_regexp(/^https?:\/\/?frctools\.com\/([0-9]+)\/rule\/([a-zA-Z0-9]+)\/?/)
  always_https
  requires_iframe_origins "https://frctools.com"



  def to_html
    <<-HTML
      <iframe 
        src='https://frctools.com#{uri.path}/embed' 
        class='rules-iframe'
        scrolling="no" 
        border="0" 
        frameborder="no" 
        framespacing="0" 
        width='640' 
        height='320' 
        allowfullscreen='true'></iframe>
    HTML
  end

  def placeholder_html
    to_html
  end
end