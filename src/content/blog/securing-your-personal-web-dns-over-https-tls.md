---
title: 'Securing Your Personal Web: Unveiling the Power of DNS over HTTPS/TLS'
description: 'Your ISP may be proxying your DNS lookups no matter what your router says. Enable DoT/DoH to encrypt them.'
pubDate: 2024-01-25
tags: ['dns', 'security', 'privacy', 'networking']
---

> TLDR; Boost your online security – enable DoT/DoH on your router!

A few days ago, I stumbled upon a special DNS tool, `whoami.akamai.net`, which returns the IP address of the DNS resolver used for the query. Intrigued, I decided to do some digging with `dig`. 😜

```sh
❯ dig whoami.akamai.net +short
# 222.2xx.2x.2 -> IP of my ISP's DNS provider
```

I quickly jumped over to my router's settings to recheck my DNS settings. To my surprise, nowhere did I find my ISP's DNS provider mentioned 😱. Instead, the primary DNS was set to Google's and the secondary to Cloudflare's.

![Default DNS](/blog/default-dns.png)

---
If you're using an open DNS service like Google's thinking your DNS traffic avoids your ISP's server, you might be surprised—it could still be subject to Transparent DNS proxying.

With this technology, they intercept all DNS lookup requests (TCP/UDP port 53) and seamlessly proxy the results. Consequently, you are compelled to use the ISP's DNS service for all of your DNS lookups.

![Transparent DNS Proxies](/blog/transparent-dns-proxies.png)

## The Challenge

While the majority of websites now use HTTPS, securing the actual content of your visits, the DNS query remains susceptible to inspection by the ISP, even with a VPN. This query discloses the domain name of the website and can be logged by the ISP, generating a comprehensive record of your online activities.

ISPs may or may not employ Transparent DNS proxying, but they can still log your DNS queries, especially if the query is happening via port 53, which is the default for many routers.

## There Must Be a Solution to This

Over the week, I delved into the issue and discovered solutions like DNS over TLS (DoT) and DNS over HTTPS (DoH).

[DoT](https://en.wikipedia.org/wiki/DNS_over_TLS) made its debut in a public recursive resolver through [Quad9](https://en.wikipedia.org/wiki/Quad9) in 2017. Following suit, major recursive resolver operators like Google and Cloudflare adopted DoT in subsequent years, making it a widely-supported feature available in most large recursive resolvers.

Nowadays, many routers come equipped with either DoT or DoH, but you need to enable it in the router's DNS settings. You can typically find it under Internet/WAN settings, although the location may vary based on the router's manufacturer.

![DNS Over HTTPS](/blog/dns-over-https.png)

## Hold On! Is This the Right Fix for Me?

If you trust your ISP with your DNS data, you **may not need** a public recursive DNS resolver. But do check with your ISP and obtain their DoT/DoH server, as it provides encryption between you and the ISP's DNS node.

When using providers like Google, Quad9, OpenDNS, or Cloudflare, keep in mind that **you are trusting them** with your DNS log. So, weigh your options carefully before choosing a DoT/DoH server.

DoT does provide encryption for DNS requests, but it comes with some trade-offs:

- It can obstruct the analysis and monitoring of DNS traffic for cybersecurity purposes and has been used to bypass standard DNS-level **parental controls**. Some parental control routers even block DoT by default for this reason. However, there are DNS providers that strike a balance, offering both DoT and DoH support along with filtering and parental controls.
- It **doesn't guarantee the privacy of your data** once it's decrypted at its destination. Moreover, clients may not directly query authoritative name servers, affecting the end-to-end encryption aspect. It's hop-to-hop encryption, dependent on consistent use of DNS over TLS.

## Knowledge Nuggets

- [Introducing the new whoami tool (Akamai)](https://www.akamai.com/blog/developers/introducing-new-whoami-tool-dns-resolver-information)
- [DNS over TLS (Wikipedia)](https://en.wikipedia.org/wiki/DNS_over_TLS)
- [Quad9 (Wikipedia)](https://en.wikipedia.org/wiki/Quad9)
- [DNS Leak Test](https://www.dnsleaktest.com)
