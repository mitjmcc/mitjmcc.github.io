---
layout: post
title:  Astromender VFX Breakdown
description: Highlights of VFX made for a Global Game Jam 2020 game.
date:   2020-02-04 01:00:00 +0300
image:  18.gif
tags:   unity vfx breakdown
---

<a data-fancybox="gallery" href="{{site.baseurl}}/img/18/astromenderlogo.jpg"><img src="{{site.baseurl}}/img/18/astromenderlogo.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

[AstroMender](https://globalgamejam.org/2020/games/astromancer-8) was a game I worked on during the Global Game Jam in January 2020.

This thruster effect was the biggest piece of VFX I completed during the 48 hour jam. Let's go through the pieces to show how I did it.


## The Vertex Offset

Most of the this thruster VFX is in the shape of the vertex displacement.

Composed of scrolling noise and a streaky mask texture to create a wavy fire motion with lines of intensity.

<a data-fancybox href="/img/18/streaksOFF.mp4">
    <video id="myVideo" autoplay muted loop width="100%" height="auto">
        <source src="/img/18/streaksOFF.mp4" type="video/mp4">
        Sorry, your browser doesn't support embedded videos.
    </video>
</a>

<a data-fancybox href="/img/18/vertexOFF.mp4">
    <video id="myVideo" autoplay muted loop width="100%" height="auto">
        <source src="/img/18/vertexOFF.mp4" type="video/mp4">
        Sorry, your browser doesn't support embedded videos.
    </video>
</a>

<a data-fancybox href="/img/18/vertexON.mp4">
    <video id="myVideo" autoplay muted loop width="100%" height="auto">
        <source src="/img/18/vertexON.mp4" type="video/mp4">
        Sorry, your browser doesn't support embedded videos.
    </video>
</a>

The noise gives that underlying fiery feel and when applied to the vertices it give it an even more explosive feel.

## The Textures

I used these three specific textures:

The noise texture responsible for the fiery scrolling.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/18/noise3.png"><img src="{{site.baseurl}}/img/18/noise3.png" style="display: block; margin-left: auto; margin-right: auto;"></a>

The "teethy" streak texture I made with triangular shapes. The black parts of the texture control which areas are not affected by the noise vertex offset.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/18/streaks.png"><img src="{{site.baseurl}}/img/18/streaks.png" style="display: block; margin-left: auto; margin-right: auto;"></a>

This gradient keeps the intensity of the color bright towards the origin of the thruster and less intense and therefore transparent towards the end.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/18/gradient.png"><img src="{{site.baseurl}}/img/18/gradient.png" style="display: block; margin-left: auto; margin-right: auto;"></a>


<script src="{{site.baseurl}}/js/jquery-3.3.1.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
