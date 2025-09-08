---
title: "4. Bull Renderer"
excerpt: "A real-time 3D renderer built from scratch in C++ and OpenGL for a Master's course, featuring a dynamic scene graph, Blinn-Phong lighting, and reflections."
tech_stack: "C++, OpenGL, GLSL, Dear ImGui, GLM, Assimp, YAML-cpp"
repo_link: "https://github.com/mmigas/CGJ-IndividualProject"
layout: single
order: 4
classes:
  - wide
---

## **Project Overview**

This renderer was my final project for my Master's "Computer Graphics for Games" course, built from scratch in **C++ and OpenGL**. The assignment was to implement a set of advanced, credit-based features within a strict **three-week deadline**, moving from graphics theory to a fully interactive application.

> **Key Features Implemented:**
> * Dynamic Scene Graph with YAML Serialization
> * Blinn-Phong Lighting Model
> * Configurable Material System
> * Cube Map Reflections & Fresnel Refractions
> * Real-Time UI for Scene Debugging with Dear ImGui

---

## **Features Showcase**

#### **Materials & Blinn-Phong Lighting**

The engine's lighting is based on the classic **Blinn-Phong shading model**, which calculates the ambient, diffuse, and specular contributions of dynamic light sources.

Materials are highly configurable and data-driven, defined by a set of parameters including color, diffuse and specular intensities, and a `shininess` exponent to control the specular highlight. This allows for a wide range of surfaces, from matte plastics to highly polished, reflective materials.

<figure class="center-image medium-image">
    <img src="/assets/images/BullRenderer/Spheres.png" alt="Different material presets from matte to highly specular." style="max-width: 550px; display: block; margin-left: auto; margin-right: auto;">
    <figcaption>A showcase of various materials, from matte diffuse to highly specular and reflective.</figcaption>
</figure>

#### **Reflections, Refractions & Skybox**

The scene is illuminated by a cube-mapped skybox, providing realistic ambient light and a world to reflect. Transparent materials like glass accurately simulate light refraction, while the **Fresnel equations** are used to realistically blend between reflected and refracted light based on the viewing angle.

<figure class="center-image medium-image">
    <img src="/assets/images/BullRenderer/Reflec_Refrac.png" alt="A demonstration of reflective and refractive spheres." style="max-width: 550px; display: block; margin-left: auto; margin-right: auto;">
    <figcaption>Cube map-based reflections and glass-like refractions on simple primitives.</figcaption>
</figure>

#### **Model Loading & Scene Composition**

The engine uses the **Assimp (Open Asset Import Library)** to load complex, textured 3D models from a variety of standard formats. These models are then integrated into the engine as entities within the hierarchical scene graph, allowing for the composition of complex scenes with multiple objects, each with its own unique material properties.

<figure class="center-image medium-image">
    <img src="/assets/images/BullRenderer/Teapots.png" alt="Two teapots demonstrating a reflective metallic material and a transparent glass material." style="max-width: 550px; display: block; margin-left: auto; margin-right: auto;">
    <figcaption>Teapots demonstrating reflections and refractions. The left is a reflective metallic material, while the right is transparent glass.</figcaption>
</figure>

<figure class="center-image medium-image">
    <img src="/assets/images/BullRenderer/Bull.png" alt="A complex 3D model of a bull with a reflective material." style="max-width: 550px; display: block; margin-left: auto; margin-right: auto;">
    <figcaption>A complex model imported into the engine with a custom reflective material applied.</figcaption>
</figure>

---

## **Core Engine Architecture**

Beyond the visual features, the engine is built on a solid architectural foundation.

* **Scene Graph:** A full parent-child transformation hierarchy allows for complex object relationships and scene organization.
* **Serialization:** A robust system using **YAML-cpp** saves and loads the entire scene state—including the entity hierarchy and all component data—to and from human-readable files.
* **Debugging UI:** A real-time UI built with **Dear ImGui** was essential for development. It provides a visual representation of the scene hierarchy and allows for direct scene manipulation via an **interactive 3D gizmo**, which was invaluable for positioning objects and lights.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/BullRenderer/MovingBull.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Real-time demonstration of the engine, showcasing interactive object manipulation with the 3D gizmo.</figcaption>
</figure>

## **Challenges & Conclusion**

The three-week deadline was the biggest challenge, requiring rapid and efficient implementation. This project was an invaluable, hands-on lesson in building a complete rendering loop, managing engine state, and the importance of good debugging tools.

### **Explore the Source**

The entire project is open-source and available on GitHub.

**[View on GitHub]({{ page.repo_link }})**