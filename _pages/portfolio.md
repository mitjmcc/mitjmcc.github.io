---
layout: portfolio
title: Portfolio
role: Technical Artist
location: United States
email: mitche<!-- abc@def -->lljmcclellan@g<!-- @abc.com -->mail.com
image:
video: https://www.youtube.com/embed/Zdb68Pk4PjQ
permalink: /portfolio/
---

# Projects

{% assign projects = site.tags.portfolio-piece | sort: 'date' | reverse %}
{% for post in projects %}

  <article class="project">

    <a href="{{ site.url }}{{ post.url }}">

      <div class="project-left">
        <img src="{{"/img/" | prepend: site.baseurl | append : post.image}}" alt="{{ post.title }}" />
      </div>

      <div class="project-right">
        <p><strong>{{ post.title }}</strong></p>
        <p>{{ post.description }}</p>
      </div>
    </a>
  </article>
{% endfor %}

# HypGames Shader Demo Reel

<div class="videoWrapper">
    <iframe controls="2" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="788.54" height="443" type="text/html" src="{{ page.video }}?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"></iframe>
</div>


# Productions

{% assign productions = site.data.productions | sort: 'year' | reverse %}
<ul class="production-list">
{% for production in productions %}
  <li class="production-item">
    <div class="production-image">
      <img src="{{site.baseurl}}/img/portfolio/{{production.image}}" />
    </div>
    <ul class="production-info">
      <li class="production-info-line">
        <div class="production-info-label color-darker">Game</div>
        <div class="production-info-value">{{production.title}}</div>
      </li>
      <li class="production-info-line">
        <div class="production-info-label color-darker">Year</div>
        <div class="production-info-value">{{production.year}}</div>
      </li>
      <li class="production-info-line">
        <div class="production-info-label color-darker">Role</div>
        <div class="production-info-value">{{production.role}}</div>
      </li>
      <li class="production-info-line">
        <div class="production-info-label color-darker">Company</div>
        <div class="production-info-value">{{production.company}}</div>
      </li>
    </ul>
  </li>
{% endfor %}
</ul>
