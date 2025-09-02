---
title: "2. DirectX 12 Renderer"
excerpt: "A real-time rendering engine built from the ground up in C++, focused on mastering the DirectX 12 API and exploring modern rendering techniques like DXR ray tracing."
tech_stack: "C++, DirectX 12, HLSL, Dear ImGui"
repo_link: "https://github.com/mmigas/DirectX12Learning"
layout: single
order: 2
classes:
  - wide
---

## **Project Overview**

This project represents my ongoing journey into the world of modern, low-level graphics programming. The primary goal is to build a robust rendering engine from scratch using **C++ and DirectX 12**, starting with a solid rasterization-based foundation and expanding into the cutting-edge realm of real-time ray tracing with **DirectX Raytracing (DXR)**.

This is a learning adventure, designed to deconstruct and master the intricate details of a modern graphics API. Every system, from memory management to the rendering pipeline itself, is being built from the ground up.

> **Why DirectX 12?**
> Unlike older APIs like DirectX 11 or OpenGL, DirectX 12 is an explicit, "close-to-metal" API. It provides developers with unprecedented control over the GPU, including memory management, command submission, and state synchronization. While this enables maximum performance, it also comes with a notoriously steep learning curve, requiring a deep understanding of how the
> hardware actually works.

> **Key Features & Achievements:**
> * **DirectX 12 Abstraction Layer:** A clean, reusable framework that simplifies core API complexities.
> * **Rasterization Pipeline:** A complete pipeline featuring PBR materials and shadow mapping.
> * **DXR Ray Tracing Foundation:** A functional pipeline for real-time ray tracing, including acceleration structure management and custom hit shaders.
> * **Custom Resource Management:** Foundational systems for descriptor heaps and GPU memory allocation.

---

## **The Rendering Pipelines**

The engine is architected to support two distinct rendering paradigms: traditional rasterization and modern real-time ray tracing.

### **The Rasterization Pipeline**

This is the foundational, "traditional" rendering path, responsible for efficiently drawing triangles to the screen. It forms the backbone of the engine and was the first major development milestone.

* **Physically-Based Rendering (PBR):** A complete PBR pipeline has been implemented, using a metallic-roughness workflow. This allows for the creation of realistic materials by more accurately simulating how light interacts with surfaces.
* **Shadow Mapping:** The engine supports dynamic shadows using standard shadow mapping techniques, adding crucial depth and realism to scenes.
* **HLSL Shaders:** All shading is handled through custom-written HLSL shaders, including vertex, pixel, and compute shaders.

<!---

<figure class="center-image medium-image">
    <img src="/assets/images/DirectX12Renderer/PBR-Showcase.png" alt="A showcase of PBR materials rendered in the engine.">
    <figcaption>A scene demonstrating the PBR rasterization pipeline with various materials.</figcaption>
</figure>
-->

### **The Ray Tracing (RTX) Pipeline**

This is the forward-looking part of the engine, built to leverage modern GPU hardware for advanced lighting effects. It uses the DirectX Raytracing (DXR) API to trace rays directly on the GPU.

* **Acceleration Structures:** The engine manages the creation and updating of Bottom-Level (BLAS) and Top-Level (TLAS) Acceleration Structures, which are the core data structures that enable efficient ray traversal through the scene.
* **DXR Shaders:** The pipeline utilizes a full set of DXR-specific shaders, including Ray Generation, Closest Hit, and Miss shaders to control how rays are cast and what happens when they intersect with scene geometry.
* **Basic Reflections:** The initial implementation focuses on producing simple, ray-traced reflections to validate the DXR pipeline.

<!---
<figure class="center-image medium-image">
    <img src="/assets/images/DirectX12Renderer/Raytracing-Showcase.png" alt="A simple scene with ray-traced reflections.">
    <figcaption>Early results from the DXR pipeline, showcasing real-time ray-traced reflections.</figcaption>
</figure>
-->

---

## **Challenges & Key Learnings**

The learning curve for DirectX 12 is famously steep. The API's explicit nature means the developer is responsible for tasks the driver used to handle automatically.

One of the biggest challenges was mastering **resource state transitions and synchronization**. Correctly managing resource barriers, command lists, and fence signals to prevent race conditions on the GPU was a difficult but invaluable lesson. Debugging the graphics pipeline using the DX12 Debug Layer and tools like PIX taught me more about the inner workings of the GPU than
any book could. Building the descriptor heap abstraction was a crucial first step in taming the API's complexity.

## **Future Roadmap**

As an ongoing project, the engine has a clear roadmap for future development:

* **Advanced Ray Tracing:** Implementing ray-traced soft shadows, ambient occlusion, and eventually, global illumination.
* **Compute Shader Integration:** Leveraging compute shaders for tasks like particle systems or post-processing effects.
* **Improved Material System:** Expanding the PBR system to support a wider variety of material properties.
* **Basic Scene/Component System:** Building a simple entity-component system to better manage scene objects and their logic.

### **Explore the Source**

The entire project is open-source and available on GitHub. Follow along with my learning adventure!

**[View on GitHub]({{ page.repo_link }})**