# Security

This is the code for [AbiHarrisonNye.dev](https://abiharrisonnye.dev), my personal site. It's a
static site hosted on GitHub Pages, with no logins, accounts or database.

## What this covers

- the site itself, including its pages and the contact form
- the files people can download, such as talk slides
- the code and CI workflows in this repository

## Reporting a problem

Please don't open a public issue for a security problem, as everyone can see issues.

Instead, report it privately in one of these ways:

- [report a vulnerability on GitHub](https://github.com/Abibubble/abi-harrison-nye/security/advisories/new),
  which only I can see
- or use the [contact form](https://abiharrisonnye.dev/contact), and I'll reply by email

It helps to know what the problem is, where it is, and how to make it happen.

## What happens to a report

I'll reply to say I've seen it, and tell you what I'm going to do about it. If you'd like, I'll
credit you once it's fixed.

This is a personal site that I run on my own, so I can't promise how quickly I'll fix things.

## Things that aren't problems

- **The EmailJS settings in the site's code.** The contact form sends messages through EmailJS, and
  its service ID, template ID and public key are public by design, as every visitor's browser needs
  them. They can only send messages to me. The [README](README.md#contact-form-emailjs) explains
  more.
- **Missing security headers.** GitHub Pages can't send custom headers. Instead, every page has its
  own Content Security Policy and referrer policy as meta tags.
