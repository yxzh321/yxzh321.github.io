---
title:  "Solve 'git push Permission denied (publickey)'"
header:
  teaser: "https://farm5.staticflickr.com/4076/4940499208_b79b77fb0a_z.jpg"
categories: 
  - Doc
tags:
  - documentation
  - tutorial
---

It has been more than a year since I last updated GitHub. When I pushed changes to remote repo, I got error:
{% highlight console %}
git push -u origin master
Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
{% endhighlight %}
and after some time, I found that it was because the SSH key had expired.

The solution is as follows if you already set SSH key in your device.[^sol1] Run in command line(git bash window):
{% highlight console %}
ls -al ~/.ssh # check if you set SSH key
{% endhighlight %}
which should shows several files including _id\_rsa_ and _id\_rsa.pub_. Then run:
{% highlight console %}
cat ~/.ssh/id_rsa.pub
{% endhighlight %}
copy the contents starting from _ssh-rsa_ and paste it into your GitHub SSH keys setting.

If both your device and GitHub account have the SSH key but your permissioin was denied, then try the solution below:
{% highlight console %}
ssh-agent bash
ssh-add ~/.ssh/id_rsa
{% endhighlight %}
which might work.[^sol2]

[^sol1]: https://www.sysadm.cc/index.php/webxuexi/978-github-ssh-key-expired-dont-worry-you-can-do-like-this (in Chinese)
[^sol2]: https://blog.csdn.net/Leo_Franklin/article/details/108858285 (in Chinese)

