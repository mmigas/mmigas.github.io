---
title: "Liver Rendering (Master Thesis)"
date: 2024-05-01
excerpt: "Accelerating biophysically-based liver rendering towards real-time interaction by combining path tracing, subsurface scattering, and GPU acceleration."
layout: single
classes:
  - wide
---

## Introduction

This project was the centerpiece of my Master Thesis, where I set out to address one of the core challenges in biomedical visualization: achieving **realistic and interactive rendering of human organs**, specifically the liver.

Accurate liver visualization is critical in **medical training simulators** and **pre-operative planning tools**, where both realism and responsiveness are essential. Traditional biophysical models simulate light transport at a very high accuracy but require minutes per frame on a CPU, making them impractical for interactive use. Conversely, simplified real-time models often compromise on visual fidelity, losing the characteristic translucent look of real tissue.

My research aimed to **bridge this fidelity-performance gap** by designing a hybrid rendering pipeline:
- On one side, a **biophysically-accurate reference model** using volumetric path tracing in **Mitsuba 3**, used to validate realism.
- On the other, a **GPU-accelerated real-time implementation**, using CUDA, OpenGL interoperability, and AI-driven denoising to achieve interactive frame rates while preserving visual detail.

This thesis showed that it is possible to bring **subsurface scattering and volumetric light transport**—phenomena typically reserved for offline rendering—into real-time pipelines suitable for medical visualization.

---

## Liver and Light Interaction

The realism of liver visualization comes primarily from the way light interacts with its layered tissue structure:

- **Glisson’s Capsule** – the thin, fibrous outer membrane of the liver, composed largely of collagen and elastin. These fibers cause **surface scattering** and subtle specular reflections.
- **Hepatic Parenchyma** – the inner bulk tissue of the liver, which exhibits **strong volumetric scattering** due to cells and blood vessels, combined with **wavelength-dependent absorption** from hemoglobin. This gives the liver its characteristic reddish-brown appearance.
- **Optical Properties** – absorption and scattering coefficients vary across wavelengths, meaning red light penetrates deeper than blue or green. This results in the soft reddish glow visible when the liver is illuminated.
- **Subsurface Scattering (SSS)** – light entering the surface can travel through the tissue, scatter multiple times, and exit at a different point, producing the distinctive translucent effect crucial for realism.

By combining these physical principles in a rendering model, the project was able to simulate **true tissue optics**, rather than relying on approximate textures or shading tricks.

---

## Features

- **Biophysically-Inspired Modeling:** Layered structure (Glisson Capsule + Hepatic Parenchyma) with measured optical parameters from biomedical literature.
- **Photographic Reconstruction:** Liver mesh generated with multi-view photogrammetry and marching cubes, ensuring geometric accuracy.
- **Subsurface Scattering Simulation:** Implemented both reference volumetric path tracing and a learned BSSRDF approximation for faster evaluation.
- **Path Tracing & GPU Acceleration:** Realistic light transport solved via CUDA and RTX hardware, achieving >50x speedup compared to CPU.
- **AI-Accelerated Denoising:** Integrated NVIDIA OptiX denoiser and temporal accumulation for real-time reconstruction of noisy 1-spp renders.
- **Validation with Mitsuba 3:** Ensured consistency against a physically accurate offline renderer.
- **Custom Real-Time Renderer:** Built from scratch in C++ with OpenGL display integration for interactive visualization.

---

## Challenges & Learning

- **Performance Bottleneck:** Volumetric path tracing is computationally heavy. Achieving 24–31 FPS required a combination of GPU acceleration, single-sample rendering, and AI denoising.
- **Optical Parameter Adaptation:** Translating biomedical optical data (scattering and absorption coefficients) into rendering parameters required extensive calibration.
- **Noise and Artifacts:** Real-time rendering with low sample counts introduced noise, ghosting (in temporal accumulation), and over-smoothing (in AI denoising). Each technique had distinct trade-offs.
- **Balancing Fidelity and Speed:** Learned BSSRDF models provided faster approximations but sometimes lacked fine tissue detail compared to full volumetric scattering.
- **System Integration:** Building a consistent pipeline between Mitsuba 3 (reference) and the custom renderer required careful synchronization of material models and sampling strategies.

---

## Results

- **High-Fidelity Model:** Achieved offline results closely matching state-of-the-art liver renderings, with over 50x speedup on GPU compared to CPU implementations.
- **Real-Time Pipeline:** Achieved interactive frame rates (24–31 FPS) while maintaining recognizable biophysical tissue effects.
- **Comparisons:** Quantitative metrics (RMSE, SSIM) showed trade-offs between learned models, AI denoising, and temporal accumulation, with clear visual demonstrations of strengths and weaknesses.
- **Applications:** Demonstrated potential for **medical visualization, surgical planning, and educational simulators** where both realism and interactivity are critical.

---
### Media

#### Mesh Reconstruction
<!-- #![Liver Mesh Reconstruction](/assets/images/liver_mesh.png) -->

#### High-Fidelity Rendering
<!-- ![High-Fidelity Render](/assets/images/liver_render_high.png) -->

#### Real-Time Rendering Pipeline
<!-- ![Real-Time Pipeline](/assets/images/liver_realtime_pipeline.png) -->

#### Rendering Comparison (Video)
<!-- [![Rendering Comparison Video](/assets/images/video_thumbnail.png)](https://www.youtube.com/watch?v=YOUR_VIDEO_LINK) -->

## Conclusion

This project demonstrated that *real-time, biophysically-based rendering of complex biological tissue is feasible*. By accelerating subsurface scattering and path tracing on the GPU, the work opens opportunities for **interactive biomedical visualization**.

The contributions were threefold:
1. An optimized **GPU-accelerated reference model** for high-fidelity volumetric path tracing.
2. An adapted **learned BSSRDF model** to approximate scattering more efficiently.
3. A **dedicated real-time rendering pipeline** with AI denoising and OpenGL interoperability.

The full thesis document detailing the methodology, experiments, and results can be found [here](https://your-thesis-link.com).