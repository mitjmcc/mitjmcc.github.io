---
layout: post
title:  Dunes Blender Displacement Material Breakdown
description: Breakdown for Harry Alisavakis's Tech Art Challenge Dunes Theme.
date:   2020-12-07 01:00:00 +0300
image:  31.jpg
tags:   blender cycles breakdown
---

Hello everyone!

This breakdown is on an entry I did for a challenge on [@HarryAlisavakis](https://twitter.com/HarryAlisavakis)'s *Technically Speaking* [discord](https://twitter.com/HarryAlisavakis/status/1191692720030584832).

The theme of the challenge was **Dunes**.

I accomplished this using Blender and the Blender Cycles renderer plus Shader Editor.
I'll break down the components of the overall node graph primarily using screenshots of what each step looks like to show how it all adds up.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/dunes_render_square.png"><img src="{{site.baseurl}}/img/31/dunes_render_square.png" style="display: block; margin-left: auto; margin-right: auto;"></a>
*Render of the final material.*
{: style="color:gray; font-size: 80%; text-align: center;"}

> **TIP:** Click on image to see it enlarged in a snazzy gallery view 👀

---

### A Tale of Two Wave Texture Nodes

A wave texture node set to triangle provides the bulk of the shape for the dunes.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/wave_texture_triangle.jpg"><img src="{{site.baseurl}}/img/31/wave_texture_triangle.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

The second wave texture node is set to saw to provide a sharper shape at the peaks of the dunes.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/wave_texture_saw.jpg"><img src="{{site.baseurl}}/img/31/wave_texture_saw.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

Then we mix them together to combine the values.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/wave_texture_nodes.jpg"><img src="{{site.baseurl}}/img/31/wave_texture_nodes.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/wave_texture_multiplied.jpg"><img src="{{site.baseurl}}/img/31/wave_texture_multiplied.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

---

### Make Some Noise

These uniform dunes are boring as straight lines.
Let's make some noise and add it to the distortion input of the both the Wave Texture nodes.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/noise_nodes.jpg"><img src="{{site.baseurl}}/img/31/noise_nodes.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

We are going to be only using a single component from these multi dimensional noise, but I'll show you the full dimensions of the noise to better illustrate what it looks like on the sphere.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/noise_node.jpg"><img src="{{site.baseurl}}/img/31/noise_node.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

The Voronoi noise provides the broader shapes while the Perlin noise gives us smaller secondary details.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/voronoi_node.jpg"><img src="{{site.baseurl}}/img/31/voronoi_node.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

Plugging this mixture of noise into the distortion of the wave texture will shift the wave. A white value will shift the wave one direction and a black value another. I scaled this noise by 5 which seemed to me like a good looking amount of distortion.

<video controls autoplay muted loop width="100%" height="auto">
    <source src="/img/31/noise_distortion.webm" type="video/webm">
    Sorry, your browser doesn't support embedded videos.
</video>

Now we have some more interesting shapes.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/wave_texture_triangle_viewport.jpg"><img src="{{site.baseurl}}/img/31/wave_texture_triangle_viewport.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/wave_texture_saw_viewport.jpg"><img src="{{site.baseurl}}/img/31/wave_texture_saw_viewport.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

---

### Make It Sand

For the last step, I ran the the mixed together wave textures through a `Color Ramp` node.
This maps the black to a dark brown and the white to a light sand color, taken from a reference image.

<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/color_ramp.jpg"><img src="{{site.baseurl}}/img/31/color_ramp.jpg" style="display: block; margin-left: auto; margin-right: auto;"></a>

---

### Send Nodes

At last here is the full graph of nodes.

<!-- <img src="{{ site.baseurl }}/img/31/nodes.png" style="display: block; margin-left: auto; margin-right: auto;"> -->
<a data-fancybox="gallery" href="{{site.baseurl}}/img/31/nodes.png"><img src="{{site.baseurl}}/img/31/nodes.png" style="display: block; margin-left: auto; margin-right: auto;"></a>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
<script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>

---

### Outro

Thank you for reading!

If you have any questions, do ask! Find me at [@MitchJMcClellan](https://twitter.com/MitchJMcClellan)

Catch you next time.


