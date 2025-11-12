---
title: "1. Tech Engine"
date: 2024-05-01
excerpt: "A modular C++ game engine built from scratch, featuring an ECS architecture, a native C++ scripting system with hot-reloading, and an integrated editor."
layout: single
order: 1
classes:
  - wide
  - no-header
---

# **Project Overview: The Vision for Tech Engine**

Tech Engine is a custom game engine built entirely from scratch in **C++**. At its heart, this project is an educational journey to deconstruct and master the complex systems that bring interactive experiences to life. While the core purpose is learning, the ultimate ambition is to build a robust and performant framework for developing complete games, from indie projects to
multiplayer experiences.

<!-- This highlight box is for skimmers (like recruiters) to instantly see your key achievements. -->
> **Key Features:**
> * Custom-built OpenGL Renderer
> * Modern C++ Architecture (ECS)
> * Native C++ Scripting with Live Hot-Reloading
> * Jolt Physics Integration
> * 3D Spatialized Audio with miniaudio
> * Integrated Editor with Real-Time Viewport

## **Engine Architecture**

The engine is built on a modular, decoupled architecture where each major component operates independently. This design philosophy makes the codebase cleaner, easier to maintain, and highly extensible.

### **Core & Application Layer**

The foundation of the engine, the Core module abstracts the underlying operating system and provides a stable platform for all other systems, including window and input management, and a high-performance, fixed-timestep game loop for deterministic updates.

### **ECS Architecture**

The engine's core architecture was re-designed and built around a modern, data-oriented Entity-Component System (ECS). This approach focuses on optimizing memory layout to ensure high cache efficiency, which is critical for performance when managing a large number of objects.
By organizing component data in contiguous memory blocks, the engine can efficiently iterate, process, and update over 1 million active entities in real-time, as demonstrated here, while maintaining high framerates. This design is fundamental to the engine's ability to scale and handle complex scenes.

# **System Deep Dive**

## **Rendering System**

The rendering pipeline is built on the **OpenGL** API. Its primary job is to translate scene data into the final rendered image. Im in the process of rewriting it to support more modern techniques that improve tremendously the visual quality and performance.

### **Multi-Draw Indirect Rendering**

To achieve maximum performance, the engine uses Multi-Draw Indirect (MDI).
This modern OpenGL technique allows the engine to render a vast number of objects using a single, highly efficient draw call.
By batching rendering commands for the GPU, it dramatically reduces CPU overhead, making it possible to render scenes with thousands of instances while maintaining high framerates.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/TechEngine/ecs/1millionEntities.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Showcasing the performance of Multi-Draw Indirect rendering.</figcaption>
</figure>

### Cluster Forward Rendering

The engine employs a **Cluster Forward Rendering**, based on _Ola Olsson et al._ paper, approach to efficiently handle scenes with numerous dynamic lights.
This technique divides the 3D scene into a grid of clusters, allowing the engine to determine which lights affect which clusters.
By limiting lighting calculations to only the relevant lights for each cluster, the engine optimizes performance while still delivering high-quality lighting effects.
In the demo below, you can see the engine rendering a scene with over 400 dynamic lights while maintaining a smooth framerate.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/TechEngine/clusterForwardRendering/MultipleLightsActive.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Showcasing the performance of Multi-Draw Indirect rendering.</figcaption>
</figure>

and a visualization of the clustered grid used for light culling.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/TechEngine/clusterForwardRendering/ClusterHeatMap.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Visualization of the clustered grid used for light culling.</figcaption>
</figure>

### **PBR Pipeline**

To achieve realistic material rendering, the engine features a Physically Based Rendering (PBR) pipeline.
This approach simulates how light interacts with surfaces using physical properties like albedo, metallic, and roughness, ensuring materials look correct under different lighting conditions.
<figure class="center-image">
  <img src="/assets/images/TechEngine/PBR/PBR_Textures.png" alt="Backpack Model loaded in the TechEngine editor">
  <figcaption>PBR materials rendered with direct lighting only.</figcaption>
</figure>

While direct lighting works for basic illumination, it can leave materials looking flat, as they don't reflect the surrounding environment.
A simple ambient term can help, but for true realism, the next section is needed.

### **Image-Based Lighting (IBL)**

The engine implements Image-Based Lighting (IBL) to generate realistic ambient light from an HDR environment map. This technique grounds objects in the scene by allowing them to be lit by and reflect their surroundings.
First, the HDR environment map is rendered as a dynamic skybox.

<figure class="center-image">
    <img src="/assets/images/TechEngine/PBR/TextureSkyBox.png" alt="PBR materials with an HDR skybox in the background.">
    <figcaption>The scene with the environment map rendered as a skybox.</figcaption>
</figure>

The engine then pre-computes an irradiance map for realistic diffuse ambient light and a pre-filtered cubemap for accurate specular reflections across different material roughness levels.
By sampling these pre-calculated maps, materials can reflect the environment convincingly.
The final result is a cohesive scene where all materials, from rough plastics to shiny metals, are naturally lit and grounded in the world.

<figure class="center-image">
    <img src="/assets/images/TechEngine/PBR/TextureIBL.png" alt="The final scene with full IBL rendering.">
    <figcaption>The final render with Image-Based Lighting accurately illuminating all materials.</figcaption>
</figure>

<!--
### **Lights & Shadows**

-->

## **Resource Management**

A dedicated resource management system handles the loading, caching, and lifetime of assets like models (`.obj`, `.fbx`), textures (`.png`, `.jpg`), and shaders to ensure efficient memory usage.

<figure class="center-image">
  <img src="/assets/images/TechEngine/ModelLoading.png" alt="Backpack Model loaded in the TechEngine editor">
  <figcaption>A 3D model with textures loaded and rendered within the editor.</figcaption>
</figure>

## **Physics System**

To manage complex physics simulations efficiently, Tech Engine integrates the battle-tested **Jolt Physics** library. This provides a robust, high-performance solution for collision detection and rigid body dynamics, allowing objects to be affected by forces, gravity, and collisions in a stable and predictable manner.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/TechEngine/PhysicsGameplayShowcase.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Gameplay demonstrating the Jolt Physics integration and C++ scripting system.</figcaption>
</figure>

## **Native C++ Scripting System**

The scripting system is a core feature, designed to provide the raw performance of C++ with a modern, high-iteration workflow. Game logic is written in C++ and compiled into dynamic libraries (`.dll`), which the engine can load, manage, and even reload at runtime.

### **Live Hot-Reloading**

Developers can change game logic, recompile, and the engine will **hot-reload** the changes *without restarting*. This creates an incredibly rapid iteration loop, as seen in the demo where a script's behavior is modified and updated live in the running engine.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/TechEngine/scripts/HotReload.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
    <figcaption>A script is recompiled externally and its behavior is updated live in the engine.</figcaption>
</figure>

### **Integrated Crash Handling**

Stability during development is critical. If a script encounters a critical error, the engine's crash handler safely pauses the simulation and provides a detailed error message and function stack trace, allowing the developer to pinpoint the bug's origin instantly.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/TechEngine/scripts/CrashHandler.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
    <figcaption>The crash handler safely stops the simulation and provides a stack trace for debugging.</figcaption>
</figure>

## **Audio System**

The audio system is powered by the lightweight **miniaudio** library. It supports 3D spatialized audio, allowing sounds to be positioned in the game world for a more immersive experience using a standard Listener/Source component system.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/TechEngine/audio/3DAudio.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
    <figcaption>A 3D spatialized sound demonstrating the miniaudio integration.</figcaption>
</figure>

## **Scene Management & Live Simulation**

The engine's scene management is built upon a robust serialization system using the human-readable **YAML** format. This allows for the complete state of a scene—including all entities and their component data—to be saved to and loaded from disk, which is fundamental for creating, editing, and sharing levels.

More powerfully, this system underpins the engine's ability to manipulate scenes at runtime. Entities can be dynamically spawned or destroyed, a feature demonstrated in the physics demo above and in the video below.

This capability is showcased most effectively in the editor's **Live Simulation** (Play/Stop) mode. When entering 'Play Mode,' the editor serializes and saves the current state of the scene. The developer can then freely test gameplay, spawn objects, and make any number of changes. Upon stopping the simulation, the engine simply reloads the original saved state, instantly
reverting the scene to how it was before testing began. This creates a non-destructive and highly efficient development workflow.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/TechEngine/sceneManagement/SceneManagement.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Entities being dynamically destroyed at runtime via the scripting system.</figcaption>
</figure>

## **The Editor**

A powerful, integrated editor is a core part of the Tech Engine vision, built using the industry-standard **Dear ImGui** library to provide a seamless and intuitive workflow. The interface is composed of a full suite of essential tools, including a real-time 3D viewport with manipulation gizmos, a scene hierarchy, a content browser for assets, and a detailed inspector for
modifying component properties on the fly.

To aid in development and debugging, a built-in logger panel captures all engine messages, warnings, and errors in real-time. Furthermore, the editor features a dedicated UI editor, empowering developers to visually construct and edit in-game interfaces directly within the engine.

<figure class="center-image">
    <img src="/assets/images/TechEngine/editor/Editor.png" alt="A screenshot of the Tech Engine editor interface.">
    <figcaption>The Tech Engine editor, showcasing the game viewport, scene hierarchy, inspector, assets browser, logger, and UI editor panels.</figcaption>
</figure>

---

## **The Road Ahead**

Development is ongoing, with a clear vision for the features that will transform Tech Engine into an even more capable framework. Future goals include implementing a modern PBR rendering pipeline, adding a full skeletal animation system, and building a foundational networking layer for multiplayer games.

### **Explore the Source**

The entire project is open-source and available on GitHub. Feel free to explore the code, track progress, and see how the engine is built.

**[View on GitHub](https://github.com/techattackteam/TechEngine/tree/TechEngineV2)**