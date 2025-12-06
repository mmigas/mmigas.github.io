---
title: "2. Liver Rendering (Master Thesis)"
date: 2024-05-01
excerpt: "My Master Thesis project, which achieved real-time, biophysically-based liver rendering by accelerating volumetric path tracing with a custom CUDA pipeline and AI denoising."
layout: single
order: 2
classes:
  - wide
---

## **Project Overview**

This project was the centerpiece of my Master Thesis, addressing a critical challenge in biomedical visualization: **the trade-off between realism and interactivity in rendering the human liver**. While physically-based models can produce stunningly accurate images for surgical planning and training, their computational cost is immense.
The original reference model by Nunes et
al., for example, required **over 21 minutes on a CPU** to render a single frame, making it unusable for interactive applications that demand feedback in milliseconds.

My research aimed to **bridge this fidelity-performance gap**. I designed and implemented a complete rendering pipeline from the ground up, demonstrating that it is possible to accelerate complex volumetric light transport to real-time speeds through a combination of modern frameworks, custom CUDA implementation, and AI-driven denoising.

> **Key Achievements:**
> * **Massive Performance Gain:** Achieved a **>50x speedup** for the high-fidelity offline model by porting it to a modern GPU framework (Mitsuba 3/Dr.Jit).
> * **Real-Time Volumetric Path Tracing:** Developed a dedicated real-time pipeline capable of rendering the complex biophysical model at **24-31 FPS**.
> * **Custom CUDA/C++ Implementation:** Built a custom "Bio-Volumetric Integrator" and real-time application in C++ to manage the unique optical properties of liver tissue.
> * **Advanced Denoising Analysis:** Implemented and quantitatively compared two different real-time denoising solutions: NVIDIA's OptiX AI Denoiser and Temporal Accumulation.

---

## **The Technology & Approach**

The visual realism of the liver is dominated by **subsurface scattering (SSS)**—the phenomenon where light penetrates the tissue, scatters multiple times internally, and exits at a different point. To capture this, my model was grounded in two core principles: geometric accuracy and biophysical accuracy.

#### **Geometric & Optical Modeling**

First, a geometrically precise liver mesh was reconstructed from photographs using multi-view photogrammetry. Then, a layered material model was developed based on biomedical literature, assigning distinct optical properties (absorption and scattering coefficients) to the outer **Glisson's Capsule** and the inner **Hepatic Parenchyma**, ensuring the simulation was grounded in
real-world tissue optics.

<figure class="center-image medium-image">
    <img src="/assets/images/LiverRenderer/mesh/LiverMeshes.png" alt="A 3D mesh of the human liver reconstructed using photogrammetry."
         alt="A 3D mesh of the human liver reconstructed using photogrammetry."
         style="max-width: 550px; display: block; margin-left: auto; margin-right: auto;">
    <figcaption>The geometrically accurate liver mesh generated via photographic reconstruction.</figcaption>
</figure>

#### **High-Fidelity offline Renderer**

To establish a "ground truth" for visual quality, a high-fidelity offline renderer was built in **Mitsuba 3** using **volumetric path tracing**. This physically-based technique produces photorealistic results by simulating the complex journey of light within the tissue. Two configurations were implemented: a complex two-mesh model with distinct layers for the capsule and
parenchyma, and a simplified single-mesh model that proved to be more performant while maintaining high visual fidelity.

<figure class="center-image medium-image">
    <img src="/assets/images/LiverRenderer/highFidelity/liver-singlemesh.png"
    alt="A high-fidelity rendering of the liver showing realistic subsurface scattering."
    style="max-width: 550px; display: block; margin-left: auto; margin-right: auto;">
    <figcaption>The final high-fidelity offline render, produced using the optimized single-mesh model.</figcaption>
</figure>

<figure class="center-image medium-image">
    <img src="/assets/images/LiverRenderer/highFidelity/LiverComparisons.png"
    alt="Comparison with the Nunes et al. model with the multi mesh and single mesh model.">
    <figcaption>Comparison with the Nunes et al. model with the multi mesh and single mesh model.</figcaption>
</figure>

---

## **The Real-Time Pipeline**

The project's core innovation was designing a dedicated real-time pipeline to accelerate the simulation. This was not a simple port, but a ground-up implementation combining several key technologies:

1. **GPU Acceleration:** The entire path tracing algorithm was implemented in **C++ and CUDA**, leveraging modern RTX hardware.
2. **Low Sample Rendering:** To meet a strict millisecond budget, only one light path (sample) was calculated per pixel, per frame, resulting in a mathematically correct but extremely noisy image.
3. **Advanced Denoising:** The noisy output was reconstructed into a clean, stable image using one of two advanced denoising techniques, which were implemented and analyzed.

This pipeline allows for the interactive exploration of a visual phenomenon that was previously restricted to offline rendering.

<figure class="center-image medium-image">
    <img src="/assets/images/LiverRenderer/realtime/RenderingPipeline.png" alt="A diagram showing the real-time rendering pipeline from noisy render to denoised output.">
    <figcaption>The real-time pipeline: a 1-SPP render is reconstructed into a clean image via advanced denoising.</figcaption>
</figure>

---

## **Results & Demonstration**

The final system successfully achieved its goal of interactive, high-fidelity rendering. Quantitative analysis using metrics like Root Mean Squared Error (RMSE) and Structural Similarity Index (SSIM) confirmed the effectiveness of the pipeline and provided deep insights into the trade-offs of different real-time denoising methods.

<figure class="center-image medium-image">
    <img src="/assets/images/LiverRenderer/results/RSMEMaps.png" alt="RMSE maps comparing the denoising techniques to the ground truth.">
    <figcaption>Quantitative error maps (RMSE) comparing the real-time outputs to the high-fidelity offline.</figcaption>
</figure>

The videos below showcase the two primary real-time configurations:

#### **OptiX AI Denoising**

This approach uses the NVIDIA OptiX AI Denoiser, which provides a **temporally stable and clean image** that is well-suited for fast camera movement and interaction. While effective, it introduces a noticeable performance overhead (~9ms per frame) and can sometimes produce slight blurring or visual artifacts, as reflected in its quantitative scores.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/LiverRenderer/results/Optix.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Real-time rendering at ~24 FPS using the OptiX AI Denoiser.</figcaption>
</figure>

#### **Temporal Accumulation**

This technique amortizes noise by blending the current frame with a history of past frames. For static scenes, it produces **visually superior results with sharper details**. Crucially, its computational cost is negligible, allowing the pipeline to run much faster (~31 FPS). However, its major limitation is the introduction of severe **ghosting artifacts** during camera
movement, as no history invalidation was implemented.

<figure class="center-image">
  <video width="100%" controls autoplay loop muted playsinline>
    <source src="/assets/images/LiverRenderer/results/Temporal.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Real-time rendering at ~31 FPS using Temporal Accumulation, showing high quality when static.</figcaption>
</figure>

---

## **Challenges & Key Learnings**

* **Performance Engineering:** Achieving real-time frame rates with volumetric path tracing was a significant challenge requiring a deep dive into GPU architecture, CUDA optimization, and profiling the trade-offs between different denoising techniques.
* **Parameter Calibration:** Translating optical data from dense biomedical literature into parameters usable by a renderer was a complex process of research, calibration, and validation.
* **System Integration:** Building a consistent pipeline between the Mitsuba 3 reference renderer and the custom real-time application required careful synchronization of material models, sampling strategies, and color spaces.

## **Conclusion & Contributions**

This thesis successfully demonstrated that *real-time, biophysically-based rendering of complex biological tissue is feasible*. By combining GPU acceleration, modern rendering algorithms, and AI, the work opens new opportunities for interactive biomedical visualization.

The full thesis document, which details the methodology, experiments, and results, is available for review.

**[Read the Full Thesis (Link to PDF)](/assets/pdf/Thesis.pdf)**