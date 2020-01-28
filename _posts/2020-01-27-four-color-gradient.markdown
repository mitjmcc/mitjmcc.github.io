---
layout: post
title:  Four Color Gradient
date:   2020-01-27 21:00:00 +0300
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

### Confused?
If all or some of this looks alien to you, I'd recommend checking out [Ronja's Shader Tutorials Basics](https://www.ronja-tutorials.com/basics.html), especially [Textures](https://www.ronja-tutorials.com/2018/03/23/textures.html).

But what about that funny looking `lerp` word? That stands for **Linear Interpolation**.

Unity has a straightforward article that you can read [here!](https://connect.unity.com/p/interpolation-part1)

The part that pertains to us is this definition:

>What Is Interpolation?
>
>At its core, Interpolation is the act of creating new data between two values. In other words, allowing you to smoothly move from one number to another. In the animated examples you can see those values can be anything from Position, Visibility or ***Color***.

![](https://connect-prd-cdn.unity.com/p/images/061e8f8f-bea5-43ce-951d-2f0f7338e355_Lerp.gif)


Also, look at the HLSL documentation of [lerp](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-lerp) for the actual specifics of the version of lerp we use here.

---

### Breakdown
UV coordinates are normalized, so the u-axis and v-axis both go from `0.0` to `1.0`.

On a quad like the one I use in the following screens, the top left corner maps to the UV coords `(0.0, 1.0)`, as the bottom right corner maps to `(1.0, 0.0)`.

In `FourColorGradient()`, we can take advantage of the `0.0` to `1.0` range and use one of the components as the interpolator parameter of the `lerp` function.


#### The First Gradient

We can go from Color1 and Color2 along the v-axis vertically by lerping like this:

{% highlight c %}
lerp(color1, color2, uv.y)
{% endhighlight %}

#### Result

![]({{site.baseurl}}/img/27/gradient_color1_color2.png)


#### The Second Gradient

We are also going to go from Color3 to Color4 in the same way:

{% highlight c %}
lerp(color3, color4, uv.y)
{% endhighlight %}

#### Result

![]({{site.baseurl}}/img/27/gradient_color3_color4.png)


#### Brining it all together

Time to bring it all together!

The two previous lerp function calls we made are outputting two new colors. So there is nothing stopping from lerping between these lerped colors like we did with Color1 and Color2, for example.

Next, we mix the two lerped colors together by going between them in the same way, but horizontally this time using the x component of the UV's:

{% highlight c %}
lerp(lerp(color1, color2, uv.y),  lerp(color3, color4, uv.y), uv.x)
{% endhighlight %}

#### Result

![]({{site.baseurl}}/img/27/shader_gradient.png)

And that's it!

---

### Outro
Thank you for reading! Hopefully this shader and explanation were straight forward enough to understand easily.

If you have any questions, do ask! Find me at [@MitchJMcClellan](https://twitter.com/MitchJMcClellan)
