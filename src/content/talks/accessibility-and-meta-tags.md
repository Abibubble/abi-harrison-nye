The slides for this talk aren’t available anymore. This transcript has everything that was said, but
not everything that was shown on screen.

### Introduction

Hi everyone, good to see you all. This is take two, because the first one didn’t record properly, so
here we go.

First, I’ve set up a public repository. It has all the examples I’m going to show you today in the
index file, with some comments to explain what they do. I’ve also added a longer list to the readme,
with all the links from this presentation, and some links to further research if you’d like to take a
look. Feel free to grab that uniform resource locator (URL) if you want to follow along.

### The basic meta tags

First, we’ve got our standard doctype, our html tag and our head tag. Inside our head is where we put
our meta tags.

First on the list is the charset meta tag. This tells the browser what characters to expect in your
website. We use UTF-8 here, which covers almost all characters and symbols from the entire world,
including emojis, which is pretty cool. The HTML5 specification actually encourages us to use UTF-8,
so I recommend you stick to that unless you absolutely need something else.

Next we have the http-equiv tag. This is very much an optional tag. Code Institute does require it in
your projects, but outside of Code Institute, you only need it if you have to support Internet
Explorer 8 or 9. Considering Internet Explorer is very dead in the real world, it’s often not
needed.

Now we’re into the real meat of meta tags. First, we’ve got the description meta tag. The description
is what shows up as a tagline when you share your site on social media, and sometimes when somebody
searches for your website on Google, but not always. Sometimes Google will show a snippet of text it
considers relevant from your website instead.

Every page of your website should have a unique description. Yes, every page. The description should
be at least 50 characters, and it can be up to 160 characters. It’s generally advised to stick to a
maximum of about 130 characters, though, as anything beyond that gets cut off on mobile.

Next, we’ve got keywords. These are a series of keywords that are relevant to your page. They should
be single words separated by a comma, and they should be the main words you expect people to search
for to find your site.

Then we have viewport, a nice and simple one. If your site is responsive, include this. If your site
isn’t responsive, don’t use it, or update the content. The width sets the page to match the screen’s
width, and the initial scale sets the CSS pixels and the device pixels to a one to one ratio. That
tells the browser that if you specify one pixel in the CSS, it should cover one pixel on the user’s
screen.

This can be incredibly useful for zooming on your site, for users with visual impairments. For
instance, if you set it to two, it becomes a ratio of one to two, so every one pixel in your CSS takes
up two pixels on the user’s screen.

Next is the canonical tag. This tells search engines like Google what the true source of your page
is. If you have two pages with very similar content, you can set the canonical tag to point to one
version of that page. This prevents issues caused by duplicate content appearing at more than one
address.

If you leave two pages that are almost identical, and don’t link them together like this, both pages
can do worse in search engine rankings, because search engines assume one has been copied from the
other. This tag tells the search engines which version you want to show up in search results.

Next, we have the robots tag. This tells search engines whether they can follow your website or not.
If you have a page full of images, or a privacy policy, for instance, that you don’t want to be
findable on search engines, you can set it to noindex, nofollow, and search engines won’t show that
page in their results.

Finally in the basics, we have the site title. This is what displays at the top of your site, in the
tab bar of your browser. It should match the h1 at the top of your page exactly, although it can be
changed temporarily to get the user’s attention, for instance when they’ve got a new notification.

### Social media tags

Now we’re on to the social media tags. These are what will really make your site pop on social media.

The first section is for Facebook, LinkedIn and Google based social media sites, with og at the front
of every property, standing for Open Graph. The second section is just for Twitter, because they
apparently like to be different.

The og:type describes what kind of site you’re sharing. You can choose from a wide variety of things,
and I’ve included a link in the example repository if you’re interested in looking into that more.
Generally, we’ll set ours to either website or article.

og:title and twitter:title do the same thing as the main title tag. They set the title for your
website, which shows up at the top when you share your site. It’s best to keep it short for social
media, to a maximum of 88 characters. Facebook will brutally cut it off in the middle of a word if
it’s any longer.

og:description and twitter:description are the same as the standard description we talked about
before. The only difference is that with og:description you can use up to 300 characters if you want
to. Sadly, Twitter is stuck with the same limit as the standard description, of just 130 characters.

og:image and twitter:image are the image that shows when you share your site on social media. Do be
careful with full stack projects, as these tags can be a little bit tricky with full stack sites, so
make sure you double check them before you submit your projects. I’ll show you where to check them in
a few minutes, on the next slide. Twitter has a size limit of 5 megabytes for the image, and it can
only be a JPEG, PNG, WebP or GIF.

og:image:alt and twitter:image:alt are the alt text for that image, for people who are visually
impaired. A massive accessibility win. We’ll chat about alt text a little later on.

og:url is the direct link to your site. Literally your website’s URL.

og:site_name takes the same information as the title, but sends it straight to social media, which
helps your shared link be seen by more people. twitter:site is very similar, but it takes the Twitter
handle of your site or company. This allows analytics on Twitter, so you can see how your post is
doing.

Finally, og:author is your name, as you’re the author of the site. Similarly, twitter:creator is your
Twitter handle, if you want to connect it up.

### Social debuggers

A nice quick slide here: social debuggers. Once you’ve added all your social media meta tags, head to
each of these links. From there, you can pop your website’s URL into the bar at the top, and it will
show you exactly how your site will look on each of these social media platforms.

This lets you check whether your image is working, for instance, or check your text reads correctly,
before you share it on social media for the world to see.

That’s a massively condensed version of meta tags. Not all of them are needed, but they all have their
own special features to help you out.

### Accessibility

Now, let’s move on to the wonderful world of accessibility. I’d like to start by saying I’m not an
expert at this. Accessibility is a massive topic, so if you know something I haven’t mentioned,
please do pop it in a message on this thread. I haven’t included everything, because there just isn’t
enough time in the day. Things like reduced motion and dark mode haven’t been included. If you want to
have a chat about them, please drop me a message on Slack. I’m always happy to talk about
accessibility.

So let’s take a look at what different accessibility needs can look like. 15% of all people in the
world have a disability at any one time, whether that’s permanent or temporary. That’s an awful lot of
users you’re losing out on if your website isn’t accessible.

Disabilities can be temporary, like a broken limb, or a cat sitting on your keyboard. Or they can be
permanent, like a motor skills impairment or a visual impairment.

Assistive technology is improving rapidly to help these users, but there’s work we need to do as
developers to make sure these technologies can access our sites easily. There are screen readers,
which can help people with visual impairments. There’s keyboard only navigation. And there are
switches, for people with motor skills impairments.

So how can we design our sites for these users? I’ve got a list here of important topics when
developing accessible websites, and we’re going to go through them.

First, I’d like to point out this quote from the man who literally created the World Wide Web: “The
power of the Web is in its universality. Access by everyone regardless of disability is an essential
aspect.”

When you build a website, you’re not building it for yourself. You’re not the intended user. You’re
building it for every user who comes to your page, whether they’re visually impaired, colour blind,
dyslexic, or just dealing with a small child who wants attention.

### Semantic HTML

So let’s go on to the first topic, which is semantic HTML. Semantic HTML forms the building blocks of
the web. It’s the right ingredients to make a cake. It’s the difference between putting four cups of
flour into a bowl, or putting flour, butter, sugar and eggs into a bowl. One of those makes a cake, or
in our case, a website. The other makes a bowl of flour, also known as a mess.

So how can we make sure our sites are lovely cakes, and not messes? Using semantic HTML gives everyone,
and everything, the ability to use the web, whatever their visual capacity.

The reason I say everything is that Google’s and Bing’s bots are blind. So using semantic HTML is a
massive search engine optimisation (SEO) win. They give importance to semantic HTML, like header,
footer and section, making your site easier to find on Google, which is directly linked to the number
of users, and the amount of profit.

Here I’ve got a list of the most common semantic HTML elements, the building blocks of any site.

- Title we’ve discussed already, when we were talking about meta tags.
- Header is the header of your page or section, containing your h1 and your nav.
- Footer is the footer, with things like copyright and contact information.
- Nav contains your main navigation. Not every link on your site, just the main chunk.
- The h1 to h6 tags I’m sure you’re familiar with. Those are your headings. They should be in order.
  Don’t jump from an h1 to an h4, and back to an h3. You’ll just confuse screen readers. If you need
  different sized headings, change the size with CSS, but keep the semantic HTML in the right order.
- Main is your main content.
- Button is a clickable button, not an external link.

Here are a few tricky elements that people often get wrong. b tags and strong tags aren’t for making
text bold, although that’s what they do visually. Their meanings are completely different. If you just
want bold text, use CSS for it. The same goes for em and i tags. They make your text italic visually,
but that’s not their purpose. If you want italic text, use CSS.

section and article are often confused with each other. article should be used where, if you took
that chunk from your website and viewed it somewhere else with no context, it would still make
sense. section is the semantic catch-all for sections. It’s better than using a div, but it gives
less meaning than other semantic HTML does. If you’re using a section or an article tag, you must
always have an h1 to h6 inside it.

Proper use of semantic HTML5 elements allows screen readers to communicate your content accurately,
by making the visual audible. It’s also faster for users of assistive technology to move around the
page. They can tab through and hear “header, Code Institute, heading level one”, and know straight
away that it’s a heading, rather than just hearing “Code Institute”, with nothing to tell them whether
it’s text, a button, a heading or a link.

### Alt text

Now we’re on to the next topic, which is alt text. I’m sure most of you know about alt text from the
course content, but we’ll do a little recap, and go into a bit more depth.

Alt text is the description of an image, used by people who are visually impaired, or who have bad
internet. So what do we need to include?

Bad alt text for this image of the Code Institute logo could be something like “logo”. That’s not
descriptive at all, yet there are developers out there who think the word “logo” fully describes this
image to someone who’s visually impaired.

Let’s look at the next step up. Acceptable alt text would be “the Code Institute logo”. At least we
have some information here. Someone may never have seen the Code Institute logo, but at least they’re
being told what the logo is for.

So how can we make this alt text amazing? “The Code Institute logo, made up of the words Code
Institute, with the o of the word code shown as an orange circle.” Even if you close your eyes and just
hear that, you can picture the logo from the description alone. That’s the level of detail you want
to achieve with your alt text.

You don’t need to say “picture of” or “image of” in your alt text, as the screen reader will say
“image”, followed by your alt text.

A person with bad internet will be able to see the outline of the box where the image should have
been, along with the alt text. Then they don’t lose out on content because their internet isn’t as
good as ours.

### Accessible Rich Internet Applications (ARIA)

Next, we have ARIA. Don’t worry, there’s no quiz. It adds to
HTML, to define ways to make web content more accessible to people who use assistive technologies.

Let’s start with aria-labelledby. This is for when a button has text, but without context, an
assistive technology user would need more information.

I’ve included screenshots of the accessibility tree in Google’s DevTools for that Continue button. If
you want to find this yourself, go into DevTools, select the settings button, go into Experiments,
and tick the box for “Enable full accessibility tree view”.

Here you can see what we’re showing our assistive technology users. We can see what a screen reader
would see: “button Continue, text Continue”. That’s not ideal. Something like “Continue with your
purchase” would be a much more descriptive aria-labelledby to have here.

To use it, as you can see in the first code snippet, it’s very similar to a label for an input element
in a form. We put another span inside the button, and give it a screen reader only class to hide it
from view. Then we give it an id with a meaningful name related to what the button is. In this case,
I’ve called it continue-button. We put our informative text inside that span, and give our button
aria-labelledby="continue-button".

aria-label, at the bottom of the slide, does the same as aria-labelledby, but for buttons that have no
text, whether that’s an icon inside a button, like this burger menu icon, or just a colourful button.
We want an aria-label for those.

There’s one downside to aria-label: it doesn’t get translated by Google Translate, so it can cause
problems for users who don’t speak English. But it’s much better than just having an icon. The ideal
would be your icon with the text displayed next to it or underneath it, but that isn’t always a good
choice design wise.

With that in mind, we do need to be careful with ARIA. If you use it badly, you can ruin someone’s
experience of your website, so make sure you only use it when it’s needed.

### Tap targets

Next, we have tap targets. Tap target means the size of an interactive object, like a button or a
link. If you can click it, it’s a tap target, and small tap targets are hard to use accurately.

We need to think about people who may struggle with motor skills: people in an older age group, and
users with cerebral palsy, Parkinson’s or other motor skills disabilities. These users can have hands
that shake, or poor eyesight, which makes clicking a tiny tap target really difficult and frustrating.

A few months ago, my boss and I spent a day using the Head Pointer feature on our Macs. If you’re not
aware, Head Pointer tracks your head movement with your computer’s camera, and uses it to move your
cursor. It also uses facial expressions to left click, right click or double click.

The most annoying thing was the tap targets. Trying to click a button by sticking your tongue out,
without moving your head too much, was really difficult. I kept closing my browser tabs instead of
clicking on them, and I ended up giving up after about three hours. I highly recommend giving it a go
if you have a Mac. It was great fun.

That’s just one example of the assistive technologies that benefit from large tap targets. People
use mouth sticks to operate touch screen devices, and people without the use of their hands can also
use their feet to access the web.

Even ignoring the accessibility side of things, I think everyone has had trouble on their phone trying
to press a tiny button or input box that’s just too small for your fingers. The phrase “fat fingers”
exists for a reason.

The minimum requirement for tap targets is 40 by 40 pixels. But the Web Content Accessibility
Guidelines (WCAG) recommend making your tap targets at least 48 pixels high and wide, with at least 8
pixels between them, to avoid tap targets overlapping.

I was a driving instructor before this, so I always think of it like a width restriction on the road.
If it’s too narrow, your car won’t get through, and you’ll end up with scratches and scrapes on your
car. It’s like that, but your fingers, your mouse, your head pointer, your mouth stick or even your
toes are the car, and the tap target is that tiny width restriction.

### Buttons and links

Now we have a nice, easy one: when to use a button tag, and when to use an a tag for a button.

In general, a tags should be used for links to other sites, or to content on the same site. Your nav
bar, for instance, should be made up of a tags, like the ones on the Code Institute site.

Button tags should be used for actions that don’t take you to another page, like the menu icon on
mobile, or for buttons inside clickable sections.

### Hover and focus

For anyone who doesn’t know, focus and hover are examples of pseudo classes. Pseudo classes are
keywords added to an element’s selector, to style a special state of that element. For instance, if
we want to style what happens when a user hovers their cursor over an element.

Hover and focus are really similar in what they do, but they’re completely different for users with
accessibility needs. Hover targets the user’s mouse hovering over the element. This can help the user
understand that they can interact with an element.

But how do you hover your cursor over an element if you’re not using a mouse? That’s where focus comes
in. Focus lets the element be interacted with while the user is using a keyboard or a switch. You can
see this in action by pressing the Tab key to move through a web page. It highlights the focused
items, so people not using a mouse can see where their focus is.

I’ve included two images of our cards component from my work here. The first one has no hover or
focus styles, giving the user no feedback that they’ve selected that item. The second one has hover
and focus styles applied, clearly showing all of our users which part of the page they’ve selected.

This is why we need to style both the hover and focus pseudo classes. It’s all well and good having a
gorgeous little animation when a mouse user hovers over an element, but you can’t let your keyboard
and switch users miss out on it.

Sadly, on quite a few sites, focus styles are being removed. By default, it’s a horrible shade of blue
with a little border radius, which doesn’t fit with most website styles. So outline on focus gets set
to none, or transparent, to avoid the clash. By doing this, you’re effectively blinding your keyboard
only users to your site. So always make sure that anything you do with hover, you also do with focus.

### Before and after

Next, ::before and ::after. These are pseudo elements, which let you put content on a page without it
needing to be in the HTML, or the Document Object Model (DOM).

These pseudo elements must be created with a content property. At the very least, it has to have an
empty string, as shown inside the red circle. Without the content property, these pseudo elements
won’t exist on your page.

This is actually what causes the problems with these pseudo elements. Because they’re not in the DOM,
screen readers can’t read them. You can put text, an image or even an emoji into the content property,
but nothing you include will be read out to screen reader users. So think of any content you add here
as completely invisible. Because of this, it’s best to use them for styling and design, not for
content.

### Readability

We also need to think about the readability of our site. Users often benefit from website text at a
lower reading level. This also helps users with cognitive impairments, users who don’t speak English
as their first language, and users who might be distracted. Remember the cat, or the small child, from
earlier.

This one is fairly nice and simple. There are readability checkers all over the internet. All you have
to do is copy and paste your text into one, and it will give you a score. You want to aim for a
reading age as close to nine years old as possible. Avoid complicated words and jargon, and avoid
massive, chunky paragraphs. Nobody wants to read a novel, unless your site actually is a novel.

### Colour contrast

On the screen here, I’ve got five different colours of text.

Can you read number one? No, of course not. It’s the same colour as the background. How about number
two, or number three? It takes quite a bit of effort, doesn’t it? It’s certainly not a comfortable
reading experience. Number four is a bit better. It’s still a little bit of a strain, but you can
read it. Number five, on the other hand, is a massive win: a bright, light colour against the black.
Fantastic.

So how can we measure this for our sites? Thanks to the WebAIM contrast checker, which I’ve linked at
the bottom there, we can see how our contrast looks.

Looking at number one, we’ve measured the foreground colour, which is our text colour, against the
background colour, which is, well, our background colour. Because they’re the same colour, we get a
contrast ratio of 1 to 1, and it tells us that for normal text, this fails both AA and AAA.

AA is the law. You have to meet it to have a legally accessible website. AAA is like the cherry on our
cake. It’s a massive win, and you always want to aim for AAA, but it’s quite difficult to achieve with
a varied colour palette. As long as you meet the AA requirements, your site will be legally
accessible, which is fantastic.

With that all explained, let’s look at number two. It’s a little bit better. We’re up to 1.22 to 1,
but it still fails. Number three has the same problem. It’s a little better, at 1.3 to 1, but it still
fails.

Number four is a lot better, with a ratio of 4.8 to 1. We’re now passing the AA requirements, and this
is perfectly acceptable for a nice, accessible website. It doesn’t pass AAA, but it would be an
acceptable colour contrast to use on your site.

Finally, let’s look at our win: the yellow on black, with a ratio of 14.45 to 1. This passes AA and
AAA with flying colours.

### Accessibility tools

Now we have a list of accessibility web tools. These can show you how somebody with a different
perspective on the world would experience your website.

First, we have the trusty Lighthouse. I’m sure many of you know Lighthouse, made by Google. It gives you
an immediate snapshot of the basic accessibility of your site. If you code with accessibility in mind,
considering all the things we’ve talked about today, you’ll easily find yourself in the high 80s to
90s without doing anything dramatic. Then it’s hardly any work at all to get a perfect score. What’s a
small amount of work to you is the key to a user with accessibility needs being able to use your
site.

Next, we can view the accessibility tree. I used this earlier to show you what a screen reader would
read out, and you can use it too. Sadly, it’s only available in Chrome’s DevTools at the moment, but
fingers crossed other browsers will take it on soon.

Next we have Spectrum. This Chrome extension lets you see your site the way someone with different
types of colour blindness would. This one is really close to my heart. My partner is colour blind, and
I had a rude awakening to the problems colour blind people have when I asked him to test a game I’d
helped build with my team for a hackathon. He couldn’t see the progress of the health bar. To us, they
were dramatically different colours, but to him, the foreground and background were the same colour.
He couldn’t play the game, because we hadn’t coded with colour blindness in mind.

Next, we have the Web Disability Simulator extension. This is probably my favourite extension ever. It
lets you see your site the way someone with accessibility needs might experience it. You can choose
from the dropdown. If you choose dyslexia, the letters move and the font changes. It’s really
disorienting. If you choose Parkinson’s, your mouse shakes as you try to click those tiny tap targets.
You can even choose concentration, which simulates the web for people with attention deficit
hyperactivity disorder (ADHD), or autism.

Next, we have WAVE. This works in the same way as the World Wide Web Consortium (W3C) HTML validator.
You give it your website’s URL, and it returns the accessibility errors and features, so you can see
where you’re doing well, and where you need to improve.

Finally, I’ve put the link to the colour contrast checker I used earlier. It’s a fantastic tool.

### Disabled buttons

Last, we have an added bonus: disabled buttons. A disabled button is when you use the disabled
attribute in a button’s code, similar to using required on a form input. It greys the button out, and
removes all hover, focus and pointer events. To a sighted user, this shows that the button isn’t
active. To someone who can’t see it, not so much.

Let’s quickly talk about what a switch is, so you can fully understand why I hate disabled buttons so
much. A switch is used by people with motor skills impairments, such as partial paralysis, or other
disabilities that limit the use of their limbs.

I’ve included an image of a fairly standard switch here. They’re large buttons, whose purpose is
controlled by the user. Normally, a user will set one switch to Tab, and one to Enter, and they’re
usually positioned on the user’s headrest or armrest, depending on where they have the most movement.
With more switches, they can get more functionality, but switches are incredibly expensive, often
around £100 or more for just one button.

So let’s dive into an example. Imagine you’re a switch user filling in an online form to buy a
subscriber identity module (SIM) card. The submit button is disabled until you enter your details. You
enter your full name and your email address, and you go to press submit. But oh no, you’ve missed the
@ from your email address. The form notices that you haven’t filled it in correctly, and it doesn’t
enable the button.

Your switch will skip straight past the disabled button, as if it didn’t exist, and you’ve got no idea
why. Frustrating, right? That’s the experience we give our users when we use disabled buttons. There’s
nothing to tell them why a button is disabled, or what they need to do to enable it.

There’s always a better way to show that a button can’t be used yet, whether that’s a little shake
when it’s clicked, some text that appears to help the user understand what needs to happen, or even a
countdown timer saying, “You’ve pressed this too soon, wait 30 seconds before pressing again.”

If you want a hand working out what to use instead of disabled buttons in your projects, feel free to
reach out to me. I’m always happy to remove one more disabled button from the web.

### Thank you

So thank you for listening to me ramble about accessibility and meta tags. If you have any questions,
you can find me on Slack. I’ll always reply as soon as I can, and I’m always up for a chat about
accessibility, or meta tags, so reach out and say hi.

I’m going to end on the list of references I used to create this presentation, and I’ll make sure the
repository I linked to earlier is attached when this is shared on Slack. Thanks very much for
watching, everyone, and hopefully I’ll talk to you about accessibility soon.
