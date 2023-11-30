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



<!-- https://www.youtube.com/embed/jsoeWHOqb3kwhat -->

<!-- http://fancyapps.com/fancybox/3/ -->
<!-- <a data-fancybox="gallery" href="{{site.baseurl}}/img/28/lowResScarf.png"><img src="{{site.baseurl}}/img/28/lowResScarf.png"></a> -->

# HypGames Shader Demo Reel
<div class="videoWrapper">
    <iframe controls="2" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="788.54" height="443" type="text/html" src="{{ page.video }}?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"></iframe>
</div>

<!-- <div class="image-col-right">
    <div class="image-box">
        <video controls autoplay muted loop width="100%" height="auto">
            <source src="/img/portfolio/Prawn.webm" type="video/webm">
            Sorry, your browser doesn't support embedded videos.
        </video>
    </div>
</div> -->

<!-- First Piece -->
<!-- <div class="image-col-right">
    <div class="image-box">
        <video controls autoplay muted loop width="100%" height="auto">
            <source src="/img/17/reliqua_forest.mp4" type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
        </video>
    </div>
</div> -->

<!-- Fourth Piece -->
<!-- <div class="image-col-right">
    <div class="image-box">
        <video controls autoplay muted loop width="100%" height="auto">
            <source src="/img/portfolio/Card Foil Maha Vailo.m4v" type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
        </video>
    </div>
</div> -->

<!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script> -->
