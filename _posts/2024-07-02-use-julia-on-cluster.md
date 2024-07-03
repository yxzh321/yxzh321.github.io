---
title:  "Using Julia on computing clusters"
header:
  teaser: "https://farm5.staticflickr.com/4076/4940499208_b79b77fb0a_z.jpg"
categories: 
  - Doc
tags:
  - documentation
  - tutorial
---

I wanted to use Julia on computing clusters with Jupyterhub at LMU. So I first checked if Julia is installed using:
{% highlight shell %}
pip show julia
{% endhighlight %}
which gave me the info about the installed Julia. But when I run:
{% highlight julia %}
julia
{% endhighlight %}
This returned: 
{% highlight console %}
-bash: julia: command not found
{% endhighlight %}

and didn't activate Julia. So I searched for this issue and got what I want from the website [`https://researchcomputing.princeton.edu/support/knowledge-base/julia`](https://researchcomputing.princeton.edu/support/knowledge-base/julia). 

One should use the commands below:
{% highlight console %}
module avail julia
{% endhighlight %}
which will show available Julia versions with their path. Then run:
{% highlight console %}
module load julia/1.x.x # version you want
{% endhighlight %}
will start the Julia interactive session.

## Install Julia kernel for JupyterNotebook

{% highlight julia %}
julia> # start package manager by pressing ] key
(@v1.10) pkg> add IJulia
(@v1.10) pkg> # leave package manager by pressing backspace/delete
julia> using IJulia
julia> installkernel("Julia")
{% endhighlight %}

## Work with Environment[^ref1]

This is similar to creating python virtualenv which is necessary for working with your own projects and environments on clusters.

When you first creat a project/env:
{% highlight julia %}
(@v1.10) pkg> activate <YourProject>
(YourProject) pkg> st
    Status `~/YourProject/Project.toml` (empty project)
(YourProject) pkg> add Plots # add pkgs you want
(YourProject) pkg> activate  # leave the environment, then you go back to the default environment
(@v1.10) pkg>
{% endhighlight %}

When you already have the project/env:
{% highlight julia %}
cd <YourPathToYourProject>/<YourProject>
julia --project=.
julia> # press ]
(YourProject) pkg>
{% endhighlight %}
or:
{% highlight julia %}
julia
julia> # press ;
shell> cd <YourPathToYourProject>/<YourProject>
shell> # press backspace and then press ]
(@v1.10) pkg> activate .
(YourProject) pkg>
{% endhighlight %}

## Add a additional Julia kernel[^ref2]

{% highlight julia %}
(YourProject) pkg>
julia> IJulia.installkernel("Julia YourProjectEnv", "--project=$(Base.active_project())")
{% endhighlight %}
The Launcher now has a new icon for starting a new jupyter notebook with "Julia YourProjectEnv".

[^ref1]: https://pkgdocs.julialang.org/v1/environments/
[^ref2]: https://julialang.github.io/IJulia.jl/stable/manual/usage/