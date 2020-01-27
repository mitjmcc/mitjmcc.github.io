---
layout: post
title:  Four Color Gradient
date:   2020-01-12 11:00:00 +0300
image:  27.jpg
tags:   shaders unity
glsl:   true
---

### Intro
Welcome to my first shader tutorial!
One of my favorite effects in After Effects is the [4-Color Gradient](https://helpx.adobe.com/in/after-effects/using/generate-effects.html#4_color_gradient_effect).
I like it so much I wanted to recreate in a shader.

> The gradient is composed of four solid-color circles blended together, each with an effect point as its center.

The implementation I will show you is slightly different. The colors are centered at the four corners of a box and can't be moved, something to revisit in a future post!

Let's get to it then!

---

### GLSL Example
Here is a live example of the shader written in GLSL.

<canvas class="glslCanvas" data-fragment-url="{{ site.baseurl }}/frags/helloworld.frag" width="690" height="518"></canvas>
{% include gl-canvas.html %}

---

### Code
This shader uses UV coordinates to interpolate between the four colors we can choose.
Here is the shader written in Unity3D's HLSL:

{% highlight c %}
Shader "Custom/Gradient"
{
    Properties
    {
        _Color1 ("Color1", Color) = (1,1,1,1)
        _Color2 ("Color2", Color) = (1,1,1,1)
        _Color3 ("Color3", Color) = (1,1,1,1)
        _Color4 ("Color4", Color) = (1,1,1,1)
        _MainTex ("Albedo (RGB)", 2D) = "white" {}
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 200

        CGPROGRAM
        #pragma surface surf Standard fullforwardshadows

        #pragma target 3.0

        #include "FourColorGradient.cginc"

        sampler2D _MainTex;

        struct Input
        {
            float2 uv_MainTex;
        };

        fixed4 _Color1;
        fixed4 _Color2;
        fixed4 _Color3;
        fixed4 _Color4;

        float3 FourColorGradient(float3 color1, float3 color2, float3 color3, float3 color4, float2 uv)
        {
            return lerp(lerp(color1, color2, uv.y),  lerp(color3, color4, uv.y), uv.x);
        }

        void surf (Input IN, inout SurfaceOutputStandard o)
        {
            fixed3 gradient = FourColorGradient(_Color1.rgb, _Color2.rgb, _Color3.rgb, _Color4.rgb, IN.uv_MainTex);
            o.Albedo = gradient;
        }
        ENDCG
    }
    FallBack "Diffuse"
}
{% endhighlight %}

---

### Breakdown
If all or some of this looks alien to you, I'd recommend checking out [Ronja's Shader Tutorials Basics](https://www.ronja-tutorials.com/basics.html), especially [Textures](https://www.ronja-tutorials.com/2018/03/23/textures.html).
Also look at the HLSL documentation of [lerp](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-lerp).

In `FourColorGradient()`, we can take advantage of the fact that UV coordinates give us an easy way to go from 0.0 to 1.0.

So we can lerp between Color1 and Color2:
![]({{site.baseurl}}/img/27/gradient_color1_color2.png)

and between Color3 and Color4:
![]({{site.baseurl}}/img/27/gradient_color3_color4.png)

These colors go from one to the other vertically because we used the y component of the UV coordinate.

Next, we mix the two gradients together by lerping between them in the same way, but horizontally this time using the x component.
![]({{site.baseurl}}/img/27/shader_gradient.png)

---

### Alternative
We can mix it up a bit by changing the way the two sides are mixed together.
If we want three colors on the right and one on the left, we can do in `FourColorGradient()`:

{% highlight c %}
lerp(lerp(color1, color2, uv.x),  lerp(color3, color4, uv.y), uv.x * uv.y);
{% endhighlight %}

and get something that looks like:
![]({{site.baseurl}}/img/27/gradient_two_to_one.png)

---

### Outro
Thank you for reading! Hopefully this shader and explanation were straight forward enough to understand easily.

If you have any questions, do ask! Find me at [@MitchJMcClellan](https://twitter.com/MitchJMcClellan)
