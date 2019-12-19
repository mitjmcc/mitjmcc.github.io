---
layout: page
title:  An Evolving Character Controller
date:   2019-12-18 11:00:00 +0300
image:  05.jpg
tags:   gamedev unity csharp
---

Some of the most common type of games I work on involve the player moving the character around the scene with a third person camera perspective.

This style of game requires a script that lets the player control where the character moves and where the camera is looking. The character controller is the first thing I make when developing one of these games. Let's explore some excerpts from the first one I ever made to the last one I worked on, and how my approach has evolved.


## Beginnings in *Deep in Sheep!*

![*Deep in Sheep!*](https://vgdev.gtorg.gatech.edu/wp-content/uploads/games/spring2016/deepinsheep/screenshot1.jpg)

I was pretty heavily involved in [VGDev](http://vgdev.org), the video game development club, at Georgia Tech. As a whole, the club makes around five to seven games a semester, each lead by a different Project Lead.

[*Deep in Sheep!*](http://vgdev.gtorg.gatech.edu/game/deep-in-sheep/) was the second game that I lead and developed at VGDev. In short, its a sheep soccer game about herding the most sheep. The main fun of the game is catching and rolling the sheep around before your opponent does.

Here is what the main update function of the Character Controller looks like, broken up:

{% highlight c# %}
// Get move inputs and scale the move speed by the axis values
dx = InputManager.GetAxis("Vertical", player1);
dz = InputManager.GetAxis("Horizontal", player1);
{% endhighlight %}
We get the inputs and cache them.

I want the player to move in the direction the camera is facing when the player presses the forward key, which would give the variable `dx` a positive value.

{% highlight c# %}
// Project camera direction onto xz-plane
camForward = Vector3.Scale(cam.transform.forward, new Vector3(1, 0, 1)).normalized;
{% endhighlight %}

The camera can be anywhere around the player, but I only want the direction the camera is facing to affect the character's horizontal motion. To accomplish this, I had to zero out the vertical component of the camera's forward vector. 

Since Unity3D's coordinate system uses the y-axis as the vertical axis, this is the component I zero. Using some linear algebra, we get x and z components of the camera's direction vector.

Here is one of the areas that has gone through the most change over the different iterations.
{% highlight c# %}
// Calculate the motion direction vector and scale it by the moveForce
spd = Vector3.Normalize(dx * camForward + dz * cam.transform.right) * moveForce;
// Create velocity vector and scale it by the speed
desiredVelocity = spd + new Vector3(0, body.velocity.y, 0);
// Set the velocity to the new velocity
addVec = desiredVelocity - body.velocity;
{% endhighlight %}
Essentially, all these over complicated statements boil down to scaling the input from the player in the direction the camera is facing. We can see attempts at trying to get this code to play nice with Unity3D's physics from all the references to the rigidbody's current velocity. 

The final section of the function sloppily applies the over engineered velocity to the Character's current velocity. 
{% highlight c# %}
float mag = addVec.magnitude;
mag = Mathf.Min(mag, moveForce);

// Ground checks
// ...

addVec = addVec.normalized * mag;
body.velocity += addVec;

transform.forward = Vector3.Lerp(transform.forward,
                                 (dx * camForward + dz * cam.transform.right).normalized,
                                 0.4f);
{% endhighlight %}
The very final step is to modify the direction that the character is facing to make it consistent with the direction of motion.

The main feature of this controller is that I tried to achieve is that the character will move in the direction the camera is pointed as discussed earlier. The nice side effect is the player can hold forward on the movement axis and control the direction of the character by turning the camera.

In general, this character controller is over complicated. It did get the job done and got players to where they wanted to go. Probably best that they could not see what was going on under the hood.

## "Refinement" in ThirdPersonNetworkedController
![ThirdPersonNetworkedController](https://image.ibb.co/mYphBK/networkedmultiplater.png)

The original plan for *Deep in Sheep!* included networked multiplayer. My teammates and I quickly discovered that adding multiplayer would be too much work with too little time left before our deadline. A few months after we were done, I decided to prototype a multiplayer player controller.

In many ways, my approach in this project was a few steps forward, a couple steps back. 
I did eventually get networking working, but I started to get stuck on simplifying and enhancing my previous character controller. 

What resulted will look confusing, especially if you are unfamiliar with Unity3D's UNET, their networking high level API. The movement code is split between the update function and the client input dequeue function. The player controller's update needed to be split into two functions to accommodate multiple player controllers running at once. 

The inputs are taken during the update function and then are sent to the server. The server enqueues these messages and as the server gets to them, it applies the inputs to the character.

### FixedUpdate()
{% highlight c# %}
if (isLocalPlayer) {
    // Get move inputs
    animation.SetBool("jump", (InputManager.GetButtonDown("Jump", player) && isGrounded));

    x = (isGrounded) ? InputManager.GetAxis("Vertical", player) : 0;
    y = animation.GetBool("jump") ? jumpForce : 0;
    z = (isGrounded) ? InputManager.GetAxis("Horizontal", player) : 0;

    // Store the move
    // Pass inputs to server
    // ... 
}
// Apply the player's state
SyncState ();
{% endhighlight %}

We still have mostly the same input caching from *Deep in Sheep!*. Now, there is a third movement input for jumping. Also, there are ternaries to prevent moving while in the air, which is a stylistic choice. The last parts of the update function transfer the player's inputs to the networking logic.

### SyncState()
{% highlight c# %}
// Decide whether to use server or predicted stateToUse
// ...

// Project camera direction into the XZ plane
Vector3 camForward = Vector3.Scale(cam.transform.forward,
        PCUtil.XZPlane).normalized;
forward = isGrounded ? camForward : body.transform.forward;
{% endhighlight %}

The second function begins with selecting a `stateToUse`, a struct with the inputs from earlier or extrapolated inputs. The desired forward direction of the camera is calculated next, same as previously, but now with a reference to a static Vector3 representing the xz-plane. 

Following this, the forward direction of the character is determined based on whether the character is jumping.

{% highlight c# %} 
// Calculate the motion direction vector and scale it by the moveForce
speed = (stateToUse.x * forward + stateToUse.z * cam.transform.right) * moveForce * Time.deltaTime;
// Add Jump force
body.AddForce(stateToUse.y * body.transform.up
    + stateToUse.y / 4 * body.transform.forward, ForceMode.Impulse);
// Add the player's state to the rigidbody velocity
body.velocity += speed;
{% endhighlight %}



{% highlight c# %}
if (isGrounded) {
    // Face rigidbody in direction of movement
    PCUtil.AdjustRigidbodyForward(body, speed, cam.transform.forward, 5f);
    // Drag
    PCUtil.HorizontalDrag(body, body.velocity, drag);
}
{% endhighlight %}

The final component is similar to the previous controller. Here I moved the character direction modification to a separate function. 

I put in my own drag function that reduces the velocity overtime. From what I remember, Unity's rigidbody drag was not achieving the effect I wanted.

 
## Manic Meerkat
The Manic Meerkat controller, the weird offspring of the two.

Getting the input.
{% highlight c# %}
isJumping = Input.GetButton("Jump") && isGrounded;

x = (isGrounded) ? Input.GetAxisRaw("Vertical") : Input.GetAxisRaw("Vertical") / airControlFactor;
z = (isGrounded) ? Input.GetAxisRaw("Horizontal") : Input.GetAxisRaw("Horizontal") / airControlFactor;
{% endhighlight %}

Determining direction of movement and speed of movement in that direction.
{% highlight c# %}
Vector3 direction = cam.transform.TransformVector(new Vector3(z, 0, x));

if (direction.magnitude > 0) {
    speed = direction.normalized * moveSpeed;
} else {
    speed = Vector3.zero;
}
{% endhighlight %}

Using the speed and jump to determine how the character will move next and in which direction he will face.
{% highlight c# %}
// Calculating velocity
if (!isGrounded) {
    body.velocity = new Vector3(speed.x, body.velocity.y, speed.z);
}

// Same old helper function
AdjustRigidbodyForward(direction, cam.transform.forward, 20f);

// Only jump while the jump timer is active
if (isJumping) {
    if (Time.time > jumpTime + 0.2f) {
        body.velocity = new Vector3(body.velocity.x, jumpHeight, body.velocity.y);
        jumpTime = Time.time;
    }
}
{% endhighlight %}

Time to actually apply the velocity to change the character's position.
{% highlight c# %}
if (isGrounded) {
    transform.position = transform.position + body.velocity * Time.deltaTime;
}
{% endhighlight %}
Finally, we'll kill the player character if they have fallen off the map.
{% highlight c# %}
if (transform.position.y < groundPlane.position.y) {
    Death();
}
{% endhighlight %}

Root motion sucks, unless you really, really need it.