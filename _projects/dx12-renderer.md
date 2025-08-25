---
title: "DirectX 12 Renderer"
excerpt: "A feature-rich rendering engine built from scratch using C++ and the DirectX 12 API."

tech_stack: "C++, DirectX 12, HLSL, ImGui"
repo_link: "https://github.com/mmigas/your-renderer-repo"

layout: single
classes:
  - wide
  - no-header
#header:
#  image: /assets/images/UnityTestImage.png   # Adjust to your path
 
---

<style>
  body.hide-header .masthead {
    display: none !important;
  }
</style>

This project was my deep dive into modern graphics programming. The goal was to build a robust rendering framework that could be extended with advanced graphical features.

### Core Features
- **Descriptor Heap Management:** Abstracted system for handling CBV/SRV/UAV descriptors.
- **Memory Management:** Custom allocators for GPU resources.
- **PBR Shading:** Implemented a physically-based rendering pipeline for realistic materials.
- **Shadow Mapping:** Basic shadow implementation.

### Challenges & Learning
One of the biggest challenges was understanding resource state transitions and barriers in DX12. Debugging the graphics pipeline taught me invaluable lessons about the GPU command flow.

![Screenshot of the renderer in action](/assets/images/renderer-screenshot1.png)

You can view the source code on my GitHub.
[View on GitHub]({{ page.repo_link }})