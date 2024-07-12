---
title:  "Using GPU with Julia"
header:
  teaser: "https://farm5.staticflickr.com/4076/4940499208_b79b77fb0a_z.jpg"
categories: 
  - Doc
tags:
  - documentation
  - tutorial
---

I wanted to use Julia package [CUDA.jl](https://cuda.juliagpu.org/stable/installation/overview/) on computing clusters. But when I precompile the pkg, I got:
{% highlight julia %}
{%
┌ Error: CUDA.jl could not find an appropriate CUDA runtime to use.
│ 
│ This can have several reasons:
│ * you are using an unsupported platform: this version of CUDA.jl
│   only supports Linux (x86_64, aarch64, ppc64le) and Windows (x86_64),
│   while your platform was identified as 'something';
│ * you precompiled CUDA.jl in an environment where the CUDA driver
│   was not available (i.e., a container, or an HPC login node).
│   in that case, you need to specify which CUDA version to use
│   by calling `CUDA.set_runtime_version!`;
│ * you requested use of a local CUDA toolkit, but not all
│   required components were discovered. try running with
│   JULIA_DEBUG=all in your environment for more details.
│ 
│ For more details, refer to the CUDA.jl documentation at
│ https://cuda.juliagpu.org/stable/installation/overview/
└ @ CUDA /software/opt/el_9/x86_64/julia/1.10.0/local/share/julia/packages/CUDA/rXson/src/initialization.jl:82
%}
{% endhighlight %}
So I searched for this issue and got what I want from [here](https://discourse.julialang.org/t/cuda-could-not-find-an-appropiate-cuda-runtime-to-use/97201/3).[^ref1] 

For the same case as mine, one should first check the CUDA version number of your device by running nvidia-smi in BASH and/or using nvcc --version. For me, I used the latter and got
{% highlight shell %}
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2022 NVIDIA Corporation
Built on Tue_May__3_18:49:52_PDT_2022
Cuda compilation tools, release 11.7, V11.7.64
Build cuda_11.7.r11.7/compiler.31294372_0
{% endhighlight %}

Then I run:
{% highlight julia %}
julia> using CUDA; CUDA.set_runtime_version!(v"11.7")
{% endhighlight %}
I got the same error but with additional info at the end:
{% highlight julia %}
{% [ Info: Configure the active project to use CUDA 11.7; please re-start Julia for this to take effect. %}
{% endhighlight %}

At last, I restarted Julia and typed 'using CUDA' again. Then the pkg precompiled successfully.

[^ref1]: https://discourse.julialang.org/t/cuda-could-not-find-an-appropiate-cuda-runtime-to-use/97201/3