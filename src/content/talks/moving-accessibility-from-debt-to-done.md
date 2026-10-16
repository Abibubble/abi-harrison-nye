### Introduction

On screen: the title slide, on giffgaff’s bright green. It reads “Moving accessibility from debt to
done at giffgaff”, with the giffgaff logo and my name, Abi Harrison-Nye.

Hello. I’m Abi, and I’m a software engineer at giffgaff. While many of you are the ones managing the
roadmaps, I’m one of the people looking at the code day in, day out.

I know the pressures we’re under. On the one hand, there’s the pressure to ship new features. We need
velocity in tech. We need those features out the door, ideally yesterday.

On the other hand, there’s the pressure of quality, and under that umbrella sits accessibility. It
can be seen as a velocity killer, or a compliance checkbox.

Surely it’s a trade-off. We can launch on time, or we can launch accessibly. We can’t do both, right?

### The Purple Pound

On screen: “£446 Billion. The Purple Pound (UK). November 2025.”

But here’s the reality that’s missed. As of late 2025, the Purple Pound is worth an estimated £446
billion. For anyone who isn’t aware, that’s the spending power of disabled people and their
households in the UK.

On screen: “$8 Trillion. The Purple Pound (global). November 2025.”

I know we’re not all from the UK here, so let’s take a look globally. That’s $8 trillion. Trillion
with a T.

That’s massive economic potential, and yet many businesses overlook accessibility. If it’s not
accessible, you’re not just failing a compliance audit. You’re actively blocking revenue from
entering your funnel. You’re leaving money on the table.

### Members, not customers

On screen: the word “Customers”, crossed out, with “Members” below it.

At giffgaff, we don’t use the C word. We say members instead, and that distinction is at the heart of
everything we do. We’re not just processing transactions, we’re building a community.

So the thought that our code was excluding people wasn’t just a technical failure for us. It was a
betrayal of our values.

### Our legacy monolith

On screen: the words “Messy monolith”, with the letters of “messy” jumbled, and the last letter of
“monolith” falling off the slide.

But we faced a hard reality with our legacy monolith. Despite our member first ethos, our code was
old, outdated and exclusionary. We were locking the doors on the very members we claimed to serve.

We had a backlog so daunting that people were afraid to touch it. It was feared that fixing those
issues would derail our roadmap, possibly for months.

On screen: the title slide again, “Moving accessibility from debt to done at giffgaff”.

So I’m here today to share how we proved that fear wrong. I’m here to show you how we took a legacy
journey with 43 critical accessibility issues, and rebuilt it with zero.

The controversial part is that we proved that doing it right, making it inclusive for everyone,
didn’t cost us any extra time. This is how giffgaff moved accessibility from debt to done.

On screen: the word “monolith”, with the final “h” dropped onto the line below.

Like many companies, we had a monolith. We still do. It’s chaos. It’s the kind of legacy codebase
engineers speak about in hushed tones. It’s tightly coupled, it’s brittle, and it’s largely
undocumented, although that’s being worked on.

Working on the monolith was a surefire way to add days or weeks to the roadmap. We knew it wasn’t
realistic to tackle the whole thing in one go, so we focused on one critical, high traffic, high
revenue pathway: our phone purchase journey.

### The audit

On screen: screenshots from the audit. A Lighthouse accessibility score of 83 is circled in red,
alongside counts of issues by severity, an automated scan showing 16 issues, and an empty heading and
an unlabelled “Buy now” button, both circled. A table shows the totals: critical, 43 issues; serious,
16 issues; moderate, 21 issues. Next to it, a key explains each level. Critical is a blocker, which
stops people accessing content or completing a task, such as buying a phone. Serious is a significant
barrier, which makes the site difficult or confusing to use. Moderate is a nuisance or a technical
failure, which causes frustration but doesn’t completely prevent access.

We ran an accessibility audit on that journey, which was humbling: 43 critical issues, and 80 issues
overall, across just four pages.

They weren’t minor nitpicks. These were fundamental blockers: input fields with no labels, buttons
that weren’t actually buttons, just divs with click handlers, and missing focus styles. Not good.

So the logical reaction is that we’ll just fix it. Put in the semantic HTML, and patch the CSS. But
I’m sure many of you know that with a legacy monolith, it’s never that simple. Changing a div to a
button might break a JavaScript listener that was written 12 years ago, by an engineer who left nine
years ago.

On screen: the words “Velocity vs Risk”, with “Risk” circled in red.

So we were paralysed. Accessibility was seen as a high risk activity, and it was feared that paying
down that debt would destroy our velocity, and maybe take the site down.

### Accessibility debt

On screen: a set of scales. On one side are code comments: “# DEFERRED”, “/// PLACEHOLDER”,
“TODO: IMPLEMENT” and “PASS”. On the other side are a clock and coins.

It’s important to note a distinction here. I keep talking about debt, and accessibility debt is
different to technical debt.

Tech debt is the shortcuts we take now that slow us down later on. We pay interest in slower
releases.

Accessibility debt is the shortcuts we take now that lock our members out immediately. We pay
interest in lost revenue and broken trust. Every single day that code is live, we’re telling a
portion of our members, “This wasn’t built for you.”

On screen: two shops side by side. The first has a locked door, marked with a red cross. The second
has an open door, with a ramp up to it.

The harsh reality is that people won’t give us another chance. If you go shopping and the shop door
is locked for no reason, you’re not going to wait around to see if it opens for you. You’ll go to the
open shop next door.

If a user with access needs meets a digital barrier, they’re not going to bookmark us for later, on
the off chance that we fix the issue. They leave, and we’ve lost that member forever.

### A clean break

On screen: a sticking plaster, and a whack-a-mole game.

So we had two choices. We could patch the monolith, spending months fighting legacy code and playing
whack-a-mole with bugs, maybe breaking a few things along the way. Or we could make a clean break:
stop trying to fix the old world, and build a new one instead.

We realised that we couldn’t patch our way to inclusion. We had to architect for it. So we rebuilt,
with React and TypeScript micro frontends (MFEs).

On screen: a pause symbol.

I’ll pause here. I know not all of you will be lucky enough to have the business case to rewrite. The
good news is that even if you can’t rewrite, you can still apply the principles I talk about today.
The shift to semantic HTML and automated testing works just as well in a monolith. It just takes a
little more time to put in place.

On screen: a golden key.

Here’s the strategic key for all the leaders in the room. We didn’t pitch it as an accessibility
project. It was a modernisation project. Accessibility was a non-negotiable standard of the new
architecture, like type safety and test coverage.

### The component library

On screen: code importing components from giffgaff’s component library, including Box, Button,
Checkbox, Link, Modal, OptionRadio, Separator, TabItem, Tabs and Typography.

We didn’t start from scratch. We already had a React based component library that was, for the most
part, accessible. But in the monolith, we were completely cut off from it. The tech stacks weren’t
compatible with each other, so we couldn’t just import our way out of the problem.

The move to MFEs unblocked the library for us. By importing a component from the library, we get the
heavy lifting done for free. We don’t have to worry about the accessibility basics on those core
components, because it’s all baked in. We effectively automated huge chunks of accessibility at the
architectural level.

### Accessible code costs no extra time

On screen: two lines of code. One is a button: `<button onClick={() => console.log('Clicked button')}>Button</button>`.
The other is a div with the same click handler: `<div onClick={() => console.log('Clicked div')}>Div</div>`.

As we scaled this, we discovered a truth that destroys the velocity killer myth. There’s a belief that
writing accessible code takes 20 to 30% longer than writing inaccessible code. It’s a complete myth.

On the screens either side of me are two lines of code. One is a very basic semantic HTML button. The
other is a div pretending to be a button. It takes almost the same amount of time to type “button” as
it does to type “div”.

On screen: the div version again, now around 50 lines long, adding a label, a role, a tab index, and
handlers for focus, blur, key presses, clicks and the mouse, to make it behave like a button. Next to
it, the single line button.

Actually, it takes less time. If you use a div, you have to wire everything up yourself: hover, focus
and role. If you use a semantic HTML button, the browser gives you all of that for free.

So we proved that inclusive code costs zero extra time. The cost isn’t in the typing, it’s in
unlearning bad habits.

### Shifting left

On screen: “1x: Concept. 10x: Dev. 100x: Production.”

Next, we worked on shifting left. By moving accessibility into our definition of done, we stopped
working at 100 times the cost, and moved to one times the cost. We stopped paying interest on that
debt, because we stopped borrowing it.

### Two passionate people

On screen: an illustration of two women smiling, one with brown hair and glasses, one with red hair.

None of this started as a top down mandate. It didn’t come from leadership, and a huge part of this
journey was getting the business involved.

It started with just two people: my colleague Eve, and me. We were deeply passionate about inclusion.
We started making noise, and we were fortunate enough to be in a company that listens, and is willing
to change. It really shows the impact that just two passionate people can have on a company.

On screen: a bottle, with an arrow pointing at its neck.

That passion got things moving. But then, unfortunately, Eve left, which created a major risk: me. I
was the accessibility person, and that’s a dangerous pattern. What if I went on holiday, or I was
ill? Did the accessibility work stop? If I was the only one pushing for accessibility, I wasn’t an
enabler. I was a bottleneck.

So I knew we had to stop relying on subject matter experts, and start empowering our engineers.

### Sharing knowledge

On screen: the contents of giffgaff’s accessibility space in Confluence, with sections for
technology, webinars, design, content, meetings and the office. Next to it, a weekly accessibility
highlight posted in Slack, about focus states. It explains what they’re for, how to use them,
whether they’re supported, and where to learn more.

We started with knowledge sharing. We didn’t just drop a link to the Web Content Accessibility
Guidelines (WCAG) and say good luck. We started by creating an accessibility Confluence space.

Sorry, Atlassian, but I know nobody wakes up in the morning excited to read Confluence pages. So we
started posting weekly highlights in Slack. They were short, punchy and practical, on things like how
to write good alt text, and using prefers reduced motion. We pushed the knowledge to the engineers in
Slack, and archived it in Confluence.

I’ll pause here again. It takes a lot of time to create all of that content. I’ve already done the
hard work for giffgaff, so I’ve packaged it up for you. All of the weekly Slack posts, some
infographics and a couple of guides are in an inclusion toolkit, and I’ll share the link at the end.

On screen: a list of recorded webinars and knowledge sharing sessions in Confluence. Next to it, a
Slack conversation with Marvin, an AI assistant, answering a question about accessibility in the
office.

We also used video. For instance, we ran an accessibility takeover to educate the entire business, not
just technology. It wasn’t a one-off. Everything that was recorded was added to our library of
webinars, workshops and knowledge sharing sessions, dating back to 2021.

We’ve kept years of self-service accessibility knowledge, and we even have a handy AI chatbot in
Slack, called Marvin, that fetches information for you, which is great.

### Tooling

On screen: three things. A unit test, “renders with no a11y violations”, which checks a component with
axe. An accessibility test summary from Pa11y: 9 tests run, 6 passed, 3 failed. And a pull request
checklist, which asks whether new pages have been added to the Pa11y config, whether the code is
accessible, and whether it’s been tested in all supported browsers, with a screen reader, and with
only the keyboard.

Next, we looked at tooling. I know many teams put accessibility testing in their pipelines. But if
you find a bug in the pipeline, you’ve already pushed the code. So we put automated accessibility
checks in our pre-commit stage.

We introduced jest-axe for unit testing, which catches basic accessibility issues in the Jest test
runner our engineers were already using. We added Pa11y tests too, running on all environments, which
also give warnings for the things you need to check by hand.

The last thing on this slide is that we added accessibility to our pull request (PR) templates, so
it’s front of mind at every stage.

On screen: a bar split into “Automated 30%” and “Manual 70%”.

But here’s a hard truth for anyone looking for a magic tool. Automated tools can only catch about 30%
of accessibility issues. I’m sure that’s rising a little with new AI tools, but it’s the figure we
have for now.

Automated tools can tell you whether an image has alt text, but they can’t tell you whether that text
makes any sense. We can’t automate our way to empathy. We need people.

### Training

On screen: three people.

We had to invest in training, and I knew I couldn’t, and shouldn’t, do it all myself. So we asked for
volunteers: people who were already experts in specific areas, like Portable Document Format (PDF)
accessibility, or inclusive content writing. We gave them the platform, and they delivered the
webinars, ran workshops and wrote posts.

On screen: one person, with an arrow pointing to a group of three.

The goal wasn’t to turn everyone into an accessibility expert. The goal was to give everyone
accessibility literacy, and that changed the dynamic completely.

I used to joke that people were sick of hearing my voice. I was the one always saying no when people
put up inaccessible pull requests. But as the training sank in, the mindset shifted. People stopped
asking, “Is Abi going to let us ship this?”, and started asking, “Is this good enough for our
members?”

I didn’t have to be the guardian of quality anymore, because the culture itself became that guardian.
When you scale the knowledge, you stop the bottleneck. Suddenly, accessibility isn’t my job anymore.
It’s just the norm.

### Building empathy

On screen: two hands holding a globe.

So we had the tech stack, we had the training, and our engineers were taking ownership. We then needed
to anchor that ownership in empathy. You can force an engineer to write a unit test, but you can’t
force them to care about a user. In the long run, if they don’t care, quality will drop. We needed to
close the empathy gap.

On screen: a diagram of giffgaff’s diversity, equity and inclusion groups, including the Home of
Accessibility and NeuroDiversity (HAND). Next to it, a photo of members of the groups on stage at an
awards ceremony.

In March 2025, giffgaff launched our affinity groups, which is what we call our employee network
groups. I was lucky enough to become the Lead for the accessibility and neurodiversity affinity
group, which we named HAND, short for the Home of Accessibility and NeuroDiversity.

This signalled to the whole company that accessibility isn’t just a passion project. It’s a core part
of our company identity. As the Lead, my job was to create a space where we could talk about why it
all matters.

On screen: photos from the accessibility takeover. People sit in groups around laptops, and one
laptop shows giffgaff’s website.

We used this platform to host our accessibility takeover. We didn’t just lecture people on WCAG
compliance. We focused on empathy and education. We had giffgaffers trying to use our site with only a
keyboard, and using simulation glasses to experience different visual impairments.

### The keyboard trap

On screen: a photo of a team celebrating in front of a screen reading “Hackathon 2025 Winners, The
Hacker’s Favourite award”, holding a trophy.

I also supported a team in our annual hackathon who were rebuilding an inaccessible page on our site.
That led to probably the most powerful moment in our accessibility journey. I’ve asked for approval,
so I can tell this story.

We asked our Chief Technology Officer (CTO), Steve, to order a free subscriber identity module (SIM)
card from our website. Our core product. The rule was no mouse, keyboard only.

He got halfway there, hit a keyboard trap, and he was stuck. He couldn’t go forwards, and he couldn’t
go back. All he could do was refresh the page, and that didn’t change the fact that he couldn’t order
a free SIM card. Watching our CTO realise that he couldn’t order our own product was worth a thousand
Jira tickets.

On screen: a Jira ticket from the audit, “Broken page anchor (Link target missing)”. It explains that
a promotion banner links to part of a page that doesn’t exist, and how to fix it.

There’s a huge difference between reading a ticket that says “broken page anchor”, and being
frustrated yourself because clicking a link doesn’t do anything. When an engineer experiences that
frustration first hand, the mindset shifts instantly. They stop asking, “Is this compliant?”, and
start asking, “Is it even usable?”

On screen: a handshake.

We started treating accessibility as a promise to our members. You stop doing it because you have to,
and start doing it because you want to.

### Neurodiversity

On screen: three people, labelled “Temporary: holding a baby”, “Situational: broken leg”, and
“Permanent: one arm”.

Because our affinity group includes neurodiversity, we broadened the conversation. We talked about
cognitive load. We realised that walls of text and complex layouts aren’t just bad for neurodivergent
members, they’re bad for everyone. Accessible design is just good design. It benefits the stressed
parent holding a baby just as much as it benefits a user with one arm.

That mindset spread into how we communicate as a team. We created inclusive meeting invite templates,
and email signature additions, which I’ve also included in the inclusion toolkit.

So the affinity group gave us the authority, the takeover day gave us the empathy, and the
neurodiversity focus gave us the breadth. We didn’t just fix the code. We built a culture where
excluding people feels wrong. Once you have that culture, you don’t need to police the code anymore.
The team polices it for you.

### The results

On screen: “Results”.

Remember the phone purchase journey I told you about at the start? The one with the legacy code that
kept us up at night? I know you all want the results.

On screen: “Monolith” and “New”, side by side. The monolith had 43 critical, 16 serious and 21
moderate issues. The new journey has 0 critical, 0 serious and 1 moderate issue.

When we first audited the journey, we had 43 critical issues. After rebuilding it with our modern
stack, our accessible component library and our newfound empathy, we ran the final audit on the new
journey, and the number of critical issues was zero. It’s a huge change.

On screen: a rubber stamp reading “SHIP IT”.

Here’s the stat that matters most to businesses. We went from 43 issues to zero, and we didn’t miss
our deadline. We didn’t add time to the roadmap. We proved the hypothesis.

We moved a fraction of the time we used to spend fixing bugs to preventing them at the start. We now
get to tap into that £446 billion market, and we didn’t sacrifice a single extra day of velocity to
do it.

### Takeaways

On screen: “Takeaways. 1: Bake accessibility into your architecture, don’t just bury it in your
backlog. 2: Shift left to stop paying interest. Catch bugs in design, not in production. 3: Culture is
your safety net. Empathy catches what your linters miss.”

If you take three things away from our journey at giffgaff, let them be these.

First, stop treating accessibility as a list of bugs you have to fight for time to fix. Bake it in at
the start.

Second, shift left, whichever direction left is. Stop paying interest on accessibility debt by
stopping it at the source.

Finally, culture is your safety net. Tools break, and code becomes legacy. But if you build a culture
of empathy, your team will catch what the linters miss.

### Up to good

On screen: the giffgaff logo, with the tagline “we’re up to good”.

At giffgaff, our tagline is “we’re up to good”. It’s not just a marketing slogan. It’s an engineering
standard for us, and code that excludes people isn’t good.

Accessibility isn’t a burden, and accessible code isn’t special. It’s just code that works for
everyone. It’s code that respects your members. You don’t have to choose between speed and inclusion.
Stop accepting the debt, and start demanding the standard.

On screen: the title slide again, with a Quick Response (QR) code and the web address
www.giffgaff.com/inclusion-toolkit.

To get to the inclusion toolkit I mentioned, you can scan the QR code, or go to the web address below
it: www.giffgaff.com/inclusion-toolkit.

If every leader in this room does just one thing when you go back to work, unplug your mouse, and try
to buy your own core product using just your keyboard. Because when we build for everyone, we aren’t
just up to code. We’re up to good. Thank you.
