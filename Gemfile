source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
    gem "bundler"
    gem "jekyll-paginate"
    gem "jekyll-sitemap"
    gem 'jekyll-email-protect' # use when adding an email link
    gem 'jekyll-feed'
    #gem "jekyll-pdf-embed" use to embed resume
end

gem 'unf_ext', '= 0.0.8.2' # unf_ext 0.0.9 broke

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
    gem "tzinfo", "~> 1.2"
    gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

