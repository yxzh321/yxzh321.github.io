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
{% highlight console %}
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