---
title: 'How unusual is this prorogation'
date: 2019/09/16
---

The latest prorogation of parliament has come under a [fair amount of criticism](https://www.bbc.co.uk/news/uk-politics-49645338), with some people saying it's a [cynical attempt to force brexit to occur](https://www.bbc.co.uk/news/uk-politics-48541352) on October 31st 2019, and others saying it's business as usual.

So, other than the timing coinciding with the crucial build up to the day the UK is set to leave the EU, how unusual is this compared to historical prorogations? Conveniently, the House of Lords recently released [this](https://researchbriefings.parliament.uk/ResearchBriefing/Summary/LLN-2019-0111#fullreport) dataset which should make it pretty easy to work out.

# Prorogation Lengths since 1950

The plot below shows the parliamentary session end date on the x axis, and the length it was prorogued for, in days, on the y axis. I've gone with since 1950 as the data looks quite different before then and the politics of over 6 decades ago doesn't feel particularly relevant today. I've also excluded prorogations that were to allow for a general election. When there's a general election, parliament is typically prorogued for a fair bit longer, but there isn't an election this time so it seems reasonable to leave them out.

<iframe width="100%" height="650em" src="/iframes/prorogation_not_election.html" frameborder="0"></iframe>

The far right bar is the current prorogation. OK, it's a pretty big bar and certainly the biggest one on there. Here's another way to compare: the average prorogation lengths since 1950, next to this prorogations length:

<iframe width="100%" height="650em" src="/iframes/prorogation_barchart.html" frameborder="0"></iframe>

So, that plot shows the current prorogation is a fair chunk bigger than you're average. A bit more than 6 times bigger.

# Outliers

In statistics we often talk about outliers. Outliers are data that lie outside our normal range, and there a bit tricky to define but there are a [few ways](https://en.wikipedia.org/wiki/Outlier#Definitions_and_detection). One I use a fair bit at work is IQR outlier detection, AKA [Tukey's Fences](https://en.wikipedia.org/wiki/Outlier#Tukey's_fences). If we take this definition, the current prorogation is 'far out' as it's more than 3x the IQR from the upper quartile (it's 13.5x away). However, it's a bit tricky and in fairness, there have been other prorogations before this one that were also 'far out', if not this far.

Another way to think about it is the previous longest prorogation was 20 days, and this one is 33 - making it 65% longer than the longest prorogation since 1950.

# Conclusion

This progation is unusually long _as well as_ unusually timed.

🤔

Fishy.

### Sources

You can see how this was calculated and a couple more plots [here](https://github.com/dgmp88/dgmp88.github.io/tree/master/notebook/Prorogation.ipynb).
