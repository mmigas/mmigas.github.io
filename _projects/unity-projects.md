---
title: "3. Unity Projects"
date: 2024-05-01
excerpt: "A showcase of gameplay programming in Unity, featuring a survival horror side-scroller and a mobile physics puzzle game."
tech_stack: "Unity, C#, HLSL, Aseprite"
repo_link: "https://github.com/mmigas/"
layout: single
order: 3
classes:
  - wide
---

This section highlights my work in **Gameplay Programming** and **System Design** using Unity. Below are two distinct projects: a complex 2D survival game built for PC, and a precision-based physics game optimized for mobile devices.

---

## **Project 1: Dead Frost Express**

**Dead Frost Express** is a 2D survival horror game set on a train barreling through a frozen, post-apocalyptic wasteland. The goal was to translate the claustrophobic tension of the TV show *Snowpiercer* into an interactive experience where the environment is the primary antagonist.

> **Key Technical Contributions:**
> * **Thermodynamic Health System:** A custom "Freezing" mechanic that depletes health based on proximity to heat sources.
> * **Finite State Machine AI:** Three distinct zombie archetypes with unique behaviors.
> * **Economy Loop:** A risk/reward currency system for weapon and armor upgrades.
> * **Visual FX:** Dynamic 2D lighting and screen-space shaders for freezing effects.

### **Core Mechanics & Systems**

The gameplay loop is built around the tension between moving forward (progress) and staying warm (survival).

#### **The Thermal Survival System**

Standard health points were insufficient to capture the game's atmosphere. We implemented a dynamic **Temperature System** where the player's body heat depletes continuously over time. To provide visual feedback without relying solely on UI, a frost vignette shader creeps in from the edges of the screen as the temperature drops. If the thermal bar hits zero, the player begins
taking rapid hypothermia damage.

<figure class="center-image medium-image">
    <img src="/assets/images/UnityProjects/DeadFrostExpress/Images/FrostHealth.png" alt="The frost vignette restricting vision as the player freezes.">
    <figcaption>As the player's temperature drops, a frost vignette restricts vision, signaling imminent danger.</figcaption>
</figure>

#### **Heat Sources & Havens**

To survive, players must navigate between "Safe Zones" created by lanterns and fire barrels. These were implemented using Unity's trigger colliders to detect the player and regenerate their temperature value. This design creates a "push-forward" rhythm: players cannot camp indefinitely; they must fight their way to the next light source to reset their survival timer.

### **AI & Combat**

To keep the combat engaging within the narrow confines of the train, We designed distinct enemy behaviors and environmental hazards using a **Finite State Machine (FSM)**.

* **The Walker:** Standard speed and damage; dangerous in groups.
* **The Runner:** Closes the gap quickly, forcing reaction shots.
* **The Jumper:** Leaps over obstacles, requiring players to adapt their positioning.

<figure class="center-image medium-image">
    <img src="/assets/images/UnityProjects/DeadFrostExpress/Images/Zombies2.png" alt="The in-game shop interface allowing players to buy upgrades.">
    <figcaption>Showcase Walker and Runner zombies.</figcaption>
</figure>

<figure class="center-image medium-image">
    <img src="/assets/images/UnityProjects/DeadFrostExpress/Images/Jumping.png" alt="The in-game shop interface allowing players to buy upgrades.">
    <figcaption>Showcase Walker and Jumping zombies.</figcaption>
</figure>

### **Economy & Shop System**

To add strategic depth between levels, We implemented a persistent economy system. Players earn currency by defeating enemies, which introduces a risk/reward element: do you rush to safety, or stay in the cold to farm coins?

The **Shop Interface** allows players to spend these coins on crucial upgrades:

* **Weapon Upgrades:** Increasing fire rate and damage output to handle "Tank" enemies.
* **Thermal Armor:** Reduces the rate of freezing, allowing for longer excursions away from heat sources.
* **Ammunition:** Since resources are scarce, buying ammo is often a necessary survival cost.

<figure class="center-image medium-image">
    <img src="/assets/images/UnityProjects/DeadFrostExpress/Images/ShopUI.png" alt="The in-game shop interface allowing players to buy upgrades.">
    <figcaption>The modular shop UI where players manage resources and upgrade stats between levels.</figcaption>
</figure>

### **Gameplay Showcase**

<video width="100%" controls>
  <source src="/assets/images/UnityProjects/DeadFrostExpress/Video/Showcase.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
<figcaption><i>Video: First level playthrough demonstrating the freezing mechanic and combat.</i></figcaption>

---
<br>

## **Project 2: Ball Flicker (Mobile)**

**Ball Flicker** is a physics-based puzzle game designed specifically for mobile devices. The core challenge involves dragging a ball to launch it through gaps and moving obstacles, requiring precise timing and vector calculation.

> **Key Technical Contributions:**
> * **Object Pooling:** Custom system to recycle level obstacles for zero-allocation performance.
> * **Input System:** Robust touch handling for drag-and-shoot mechanics.
> * **Mobile Architecture:** Scalable UI and scene management for various resolutions.

### **Input Logic**

The game relies entirely on a "Drag-to-Shoot" mechanic. Instead of using default Unity input events, I wrote a custom input manager to handle touch phases (`Began`, `Moved`, `Ended`).

* **Vector Math:** When the player drags, I calculate the vector between the initial touch point and the current finger position.
* **Force Calculation:** This vector is clamped to a maximum magnitude to ensure consistent launch power regardless of screen size or pixel density (DPI), ensuring the game feels the same on a tablet as it does on a phone.

### **Optimization: Object Pooling & Bars Controller**

To ensure smooth performance on mobile devices, preventing Garbage Collection (GC) spikes was a priority. Since the level is infinite, instantiating and destroying obstacle bars constantly would cause frame drops.

I implemented a custom **Object Pooling System** within the "Bars Controller":

1. **Initialization:** A fixed pool of bar objects is created at the start of the game.
2. **Reutilization:** As the player moves up and bars exit the bottom of the camera view, they are not destroyed. Instead, they are deactivated, reset with new parameters (gap size, speed, position), and moved to the top of the stack.
3. **Result:** This allows for an infinite level generation with **zero runtime memory allocation**.

### **UI & Menu Architecture**

The game features a polished menu system with seamless scene transitions. I utilized the Unity Canvas Scaler to ensure buttons and text anchor correctly across different aspect ratios.

<figure style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 20px 0; width: 100%;">

<img src="/assets/images/UnityProjects/BallFlicker/Images/MainMenu.jpg"
alt="Main menu"
style="width: 240px; height: auto; max-width: 100%;">

  <!-- Removed max-width here so text stays on one line -->
  <figcaption style="font-size:0.875rem; line-height:1.2; color:#666; text-align:center; font-style:italic; margin-top:10px;">
    The main menu system, designed with a responsive layout for portrait mode.
  </figcaption>

</figure>


### **Gameplay Showcase**

<figure style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 20px 0; width: 100%;">

  <video width="100%" controls style="max-width: 100%; display: block;">
    <source src="/assets/images/UnityProjects/BallFlicker/Video/GameplayShowcase.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

  <figcaption style="font-size:0.875rem; line-height:1.2; color:#666; text-align:center; font-style:italic; margin-top:10px;">
    Video: Mobile gameplay showing the drag-to-shoot mechanic and infinite level generation.
  </figcaption>
</figure>

---
