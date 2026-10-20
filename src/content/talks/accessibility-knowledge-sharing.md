### Introduction

On screen: the title slide, “Accessibility”.

Okay, nothing’s complained. Fantastic. I think we’ve got about the right number of people, so I’m
going to get started.

So, I’m here to talk to you about accessibility, because of course I am.

### Why should we care?

On screen: “Why should we care?”, with four reasons. It’s the right thing to do. Being accessible
supports our core mission of being up to good. It saves us time. It helps in our B Corp journey. It
helps us tap into the Purple Pound.

So, why should we as giffgaffers care about accessibility?

To start with, it’s just the right thing to do. We’re all people, we’re all humans. We should be
looking out for other humans.

Secondly, being accessible really supports our giffgaff core mission of being up to good.

In slightly more selfish terms, it does save us time, as developers and suchlike.

It also helps in our B Corp journey. There are points within the B Corp accreditation that are
directly related to how accessible our website is, how accessible our app is, things like that.
[check: the recording says “giffgaff accreditation”]

And the final thing is the monetary value. It helps us tap into the Purple Pound.

The Purple Pound is a study that’s done once every 6 years, and it looks at the value that what’s
known as a disabled household has on the market. A disabled household is a household in which one or
more people are considered to have some form of disability.

In the UK, that’s one in five. So 20% of households, and therefore 20% of potential members, are part
of this Purple Pound.

To give you information about the actual value of this, the last study was done in 2020. The value
within telecoms and broadband that’s being missed by companies not being accessible was £49 million
per month. So it’s a lot of money we’re talking about.

### Types of disabilities

On screen: “Types of disabilities”, in two lists. Temporary: broken limb, broken mouse, broken
glasses, sun glare on a screen, slow internet, cat on keyboard, under the influence. Permanent:
blindness, cognitive impairment, colour vision deficiency, quadriplegia, deafness, motor skills
impairments.

There are many types of disabilities. I haven’t listed all of them here. I’ve just listed a few, to
give you an example of what we’re talking about.

Some disabilities are permanent, such as blindness, cognitive impairments, and colour vision
deficiency, which is also known as colour blindness. Quadriplegia, deafness and motor skills
impairments are all examples of a permanent disability.

Others are temporary or situational. If you break your wrist, you might struggle to use a mouse. It’s
only temporary, because it lasts until your wrist is healed, but it is a disability while it’s
happening.

Then there are situational things. Your mouse might be broken. You might have broken your glasses, so
you can’t see quite as well as you normally would. Maybe there’s sun glaring on your screen through
an open window. We’ve had quite bright sunshine, and I’ve actually had to move out of my office for
this very reason.

Maybe you’ve got slow internet. Not everybody is as lucky as us, to live in places where the internet
is as strong as it is, so that’s always something to bear in mind.

I’ll be completely honest, I stole this one from my own life. Maybe your cat has decided to have a nap
on your keyboard. Mine is very slowly being trained that keyboards are not for napping on, but it’s
slow progress.

Or maybe you’re under the influence. Things are a little bit more difficult to do if you are.

So those are the kinds of people that we’re thinking about here. Let’s go into some of the things we
can do to improve the web for those people.

On each of these slides, I’ve got a little “What is”, giving you a very brief description of what the
thing is. Then in the top right, there’s a small description of who it helps.

### Semantics

On screen: “Semantics”. What are semantics? What code actually means. Who does this help? Absolutely
everyone.

Starting with semantics. These are commonly known as the building blocks of the web. They’re the
things you put in before you’ve added any CSS to make it look nice, or any JavaScript to make it
work. These are the basics.

Using correct semantics really adds so much information to your page, which can then be used by
screen readers, web scrapers, everybody like that.

For instance, if you use a section element or an article element instead of a div, it gives so much
more meaning to your code. [check: a few words about app development weren’t clear here]

A web scraper, like Google, can then read our site better. It can go through and say, okay, this
heading relates to this chunk of text. So if somebody’s searching for this heading, it knows that the
text below it is linked, and it will show up better in search engines. That improves our search
engine optimisation (SEO), and gives us a happy Helen. [check: “Helen”]

It also saves us work in the long run. We’re using the extra features that are built into each
element, instead of having to shoehorn them in and try to build them ourselves. We can just use
what’s there already.

### Alt text

On screen: “Alt text”. What is alt text? Short, descriptive text to describe an image. Who does this
help? Anyone with visual impairments, and those with slow internet.

Next is alt text. Alt text is text that describes an image. It’s used by anyone with visual
impairments, and by those with slow internet.

I’m thinking back probably 15 or 20 years now, to the times when you’d have to wait for an image to
load when you were trying to view a web page. Sometimes it wouldn’t load, and you’d just get that
grey box with a bit of text in it. That text comes from the alt text.

When you’re writing alt text, it shouldn’t start with “an image of” or “a picture of”. For instance,
an image with the alt text “A black cat sat on a brown sofa” would be read by a screen reader as
“Image. A black cat sat on a brown sofa.” It fills in the “image” for you, so you don’t need to
repeat it.

Alt text should be used when an image is actually important to the meaning of the page. What are
called decorative images don’t need alt text. A good example of this is the doodles that we have in
quite a few places. I’m aware they’ve been deprecated now, but they’re still up on the web.

If you do have a decorative image, you should still have an alt attribute, but it should be set as
blank. So you’d still write alt equals, then an empty string. That tells the screen reader, “I know
this is an image, but it’s not important”, and the screen reader will skip past it as if it wasn’t
there.

**Question from a colleague:** Just a really quick question. If you didn’t have the alt text at all,
what would happen? Would it skip past it, or would it be confused?

It will say “image”. Depending on which screen reader you have, it might try to read the image’s web
address. If it’s a direct link, you might get “image, https, www, AWS”, things like that. Other
screen readers might just ignore it.

**Colleague:** Got you. Okay, thanks.

But if it’s an image that matters, for instance, if our banner on the homepage has no alt text, then
somebody with a visual impairment isn’t going to have a clue what fantastic new promotion we’ve got
going on. So that’s the importance of alt text.

**Question from a colleague:** Abi, can I just ask? I think a lot of our banners don’t have alt text.
Is that right?

Many of them don’t, unfortunately. I think the big ones that get brought in through the content
management system are the ones lacking alt text. That’s definitely something we can improve on.

### Tap targets

On screen: “Tap Targets”. What are tap targets? Areas of a page that can be interacted with. Who does
this help? Anyone with motor skills impairments, including the elderly.

Next up is tap targets. I know this has already been mentioned in a previous knowledge sharing, but it
ties in really nicely.

Tap targets are areas of a page that can be interacted with, so a button, a link, a carousel, things
like that.

The important thing here is that each tap target, in line with the web accessibility standards,
should be a minimum of 44 by 44 pixels. However, at giffgaff, we try to do a little better than that.
We aim for 48 by 48. That’s not saying you always have to do 48 by 48, but aim for it, and if it
needs to be, it can go as low as 44.

The other important thing is when you have 2 tap targets next to each other, for instance, 2 buttons
side by side. Again, the web accessibility guidelines say there should be an 8 pixel gap between
them. At giffgaff, we aim for 16 pixels. It just gives a little more space.

This helps anybody with a motor skills impairment. If you’re somebody who’s potentially shaky, and
might struggle to keep your hands steady for long enough to click on a button that’s really close to
another, it avoids misclicks, which reduces frustration on the page.

### Colour contrast

On screen: “Colour Contrast”. What is colour contrast? Ensuring that text colour and background
colour are different enough that the text is readable. Who does this help? Everyone, but specifically
anyone with colour vision deficiency, and those with sun glare on their screens. In the bottom right
is a sample of the giffgaff colour palette, each colour showing the text colour to use on it.

Next we have colour contrast. This is a way of making sure that text and background colours are
different enough that the text can be read by everyone. This is especially important for those with
colour vision deficiency, and also those with sun glare on their screens.

How well one colour stands out from another really decides whether people will be able to read the
information or not.

The giffgaff colour palette has been designed by our wonderful designers to have enough colour
contrast across the board. If you look in the bottom right, where I’ve got a little snapshot of a few
of our colours, you’ll see the red colour has white text on top of it, whereas olive has black text.
That tells you which text colours should be used on top of each background colour. If you used black
text on the red background, it wouldn’t have enough colour contrast.

An easy way of checking this is to search for “colour contrast checker” online. There are at least 10
really good colour contrast checkers where you can pop in your background colour and your foreground
colour, and it will tell you if they contrast enough.

An even easier way is just to use the giffgaff colour palette, with the text colours as shown.

### Link text

On screen: “Link text”. What is link text? The text that is clickable for links and buttons. Who does
this help? Anyone with visual impairments, including the elderly.

Next up is link text. This is the text that’s actually clickable within links, or the text that’s
visible on buttons. All of this text should describe where the link or button is going to take you,
within that visible text.

The reason for this is that screen readers can jump from one link to the next. So if you’re a
visually impaired user, and you’re skipping through the page because you know there’s a link in
there somewhere that you want, and all of the links say “click here” or “read more”, that doesn’t
tell you what the link is going to do. You’d have to go into each link just to find out what it does.

So instead of “click here for a blog article”, with “click here” being the clickable text, put it into
a sentence. You might find more information in a blog article on whatever the blog article is about.
That gives more information within the link.

### Reading age

On screen: “Reading Age”. What is reading age? The reading level of the average person. Who does this
help? Everyone, especially those with cognitive impairments.

Next up is reading age. This is the reading level of the average person. It helps everybody, but
especially those with cognitive impairments.

In the UK, the average reading age is 9 to 11 years old. This means that the average person reads at
the same level as a 9 to 11 year old. This isn’t limited to the UK. In the USA, the average reading
age is 9, and I believe Australia is at 11.

At giffgaff, we aim to write for a reading age of 9. That’s basically avoiding long and complicated
words, breaking up sentences, and making sure we don’t have huge chunks of text in paragraphs.
Instead, we have a few lines in each, with a bit of white space, so it’s easier to read.

### Pseudo-classes

On screen: “Pseudo-classes”. What are pseudo-classes? They define a special state of an element. Who
does this help? Everyone, especially those who use keyboards.

And then pseudo-classes. These define a special state of an element. They’re particularly important
for keyboard only users, so people who don’t use a mouse.

For instance, using a hover pseudo-class shows what a user is currently hovering their mouse over.
Keyboard only users can’t benefit from hover states, because they’re not using a mouse. Instead,
focus can be used, with the same styling as hover, to give the same information. It says “this is
where your cursor is”, even when they’re not using a cursor.

This isn’t just relevant for the web, as was pointed out to me very recently. Thank you. The app can
be used on a tablet, and tablets these days can have keyboards and mice attached. So it’s important
for the web and the app.

### Demo: a screen reader on the giffgaff app

On screen: “Demo. Using a screen reader on the app (Android, TalkBack)”, then a screen recording of
the giffgaff app on an Android phone. [check: describe what the recording shows]

Excuse the non-live demo here. I couldn’t work out how to get my phone to show up, and I couldn’t
work out how to get the screen reader software onto the simulator. So this is a very quick example of
using a screen reader on our giffgaff app. This was done on an Android device, so it’s using the
TalkBack screen reader. Fingers crossed you can all hear the audio.

The recording plays. TalkBack reads out the login screen, including “Unlock giffgaff”, “Tap to cancel
authentication” and “Password”, then “Authenticated”. It then reads the plan card: “My plan”, “More
info”, “Close modal”, “Your current plan, unlimited”, “Unlimited UK data”, “Fair usage policy
applies”, and “Your plan comes with unlimited standard calls and texts in the UK and while EU
roaming”, then how much data is left. [check: the speech recognition caught only parts of this]

Okay, so just to quickly talk through what happened there. Once I’d opened the giffgaff app, it took
me to the login screen, which is the screen that’s blanked out. That’s very good security-wise. It’s
not going to screen record me logging into my app.

However, the thing you couldn’t see is that it was asking me for biometrics, and there was no sign of
that for a visually impaired person. I wouldn’t have known it was looking for biometrics at that
point. Then there were quite a few swipes I had to do to get to the next section, before it
eventually said “password”, which let me log in.

Once I’d logged in, I couldn’t find out how much my goodybag was. Let me mute it and see if I can show
you. It would not read out any of this information here, about having unlimited data, or how many
days are left.

This is me trying to find out that it’s £35. We get this nice little green highlight, which tells you
what it’s reading. But as you can see, it skips from “current plan” to “unlimited”. At no point does
it tell me it costs £35.

This was just a very quick dive in. I didn’t do much in-depth testing, so this was just the first
thing I came across. But it shows you why it’s so important to consider accessibility while we’re
doing app development. This is one of the major pieces of information I’d look at in an app, and then
suddenly I find out that I can’t see it, as such.

### Demo: the giffgaff website with a keyboard only

On screen: “Demo. Using keyboard only on the web (no mouse)”, then the giffgaff website in a browser.
[check: describe what’s on screen during the demo]

Okay, final demo, if it lets me click. There we are. I’m going to show you the website using a
keyboard only, so not using my mouse at all. This is probably where things will go wrong, because
things always go wrong in the live demo.

I’ve just clicked up here into the address bar, to give me an anchor point to start from. I’m then
going to press tab, which pops up this nice little link. If I chose this, it would skip past the
header and the navigation bar, and start me in the main content of the page. But I don’t want to do
that. I want to have a look at the navigation.

So I’ve tabbed again, which gets me to the logo. This is where the focus and hover states come in.
This blue around the giffgaff icon is a really good example of a focus state. It tells me where my
imaginary cursor is.

If I tab again, we have some nice designs on the header, which show the focus while still being on
brand. I can tab through. If I want to go back, I can hold shift and press tab, which takes me back.

I can then press enter. Oh, that took me into it. I did not mean to do that, my apologies. Let’s get
back to where we were.

I can press enter once, which opens that drop-down menu, then press shift and tab to close it. Or I
can press the space bar to open the drop-down. If I tab through all of these options and get to the
bottom, pressing tab again takes me on to the next section. This works all the way through.

Next we get to our main banner. Masthead, that’s the word. If I press tab now, we get the button,
with a nice little focus style on it, looking very nice. I tab again and get to the terms, also very
nice. Another tab, and we’ve got this little card, which is super cute.

Then if I tab into the button, we get the boings, which again show me where I am. [check: “boings”]
This is an example of tap targets that are too close together, because if I press tab once more,
you’ll see the top left boing is covering the first button a bit. Those could do with a bit more space
between them.

If I tab again, it’s a little difficult to see, but there’s a blue focus border around this iPhone 14
banner. But if I press tab again, we’re focused on nothing. As a developer, I’m thinking, okay, that’s
probably where they’ve put the link, and they’ve hidden it because they want the whole thing to be
clickable. But as a keyboard only user, that’s quite strange.

If I tab again… where’s my cursor gone? One more tab. Still no cursor. And one more. Okay, now we’re
on a phone card. So that tells me the popular phones and refurbished phones don’t have any kind of
focus state, and you can end up getting lost there as a keyboard only user.

I’ll leave it there. The rest of it is pretty good.

### Questions

On screen: “Any questions?”

So, any questions is the next thing. I know I’ve missed some things in the chat, so I’m just going to
stop sharing and have a look at those.

**Question from a colleague:** That was really good, actually. It’s quite eye-opening when you go
through it. Have we ever had a full accessibility audit across our website and app? Or is it the
responsibility of each team to make sure we’re meeting accessibility requirements?

A bit of both. We’ve had at least one that I have the documentation for, which I can send through if
you’d like it. I believe we’ve had 2 full accessibility audits from another company. Some of the
things have been fixed, which is fantastic. Some of them, unfortunately, haven’t.

It does rest with individual teams to make sure their products, services and pages are as accessible
as they can be. That means finding time within a sprint, and making sure we’re prioritising
accessibility.

**Colleague:** Have we ever been able to measure how many people are affected by it currently?

I have a few ideas of how to do it, but there’s a lot more investigation that needs to be done. For
instance, I know that Google Tag Manager and Google Analytics don’t offer those kinds of analytics.
That’s because there’s a chance a company might look at them and say, “None of our members use screen
readers, so we’re not going to bother developing for screen reader users.” So there isn’t a lot of
analytics we can get on that. But there are a few things I want to look into for future analytics.

**Colleague:** Oh, okay. I look forward to you sharing that in the future, then.

Fingers crossed.

**Colleague:** Thanks, Abi. That was really helpful and really clear. I guess we probably need to focus
more within each team on making sure those rules are followed. And as part of testing, maybe we
should be checking, like you did, to see if anything’s going quite wrong.

Yes, definitely. Start the conversation about accessibility at the very start, when you’re starting a
new feature or anything like that. Honestly, it saves so much time.

Then, when you’re just about to put it live, do those checks. Run through it with a screen reader,
test it by tabbing through, and make sure all your colour contrasts are correct. If you’ve done
everything right from the start, that kind of testing takes 5 to 10 minutes. It’s if you haven’t done
it from the beginning that it takes a bit longer.

**Colleague:** Thanks for championing it, Abi.

**Question from a colleague:** YouTube has an accessibility mode and things like that. Is that
something we should do? Or is it frowned upon? Should everything be accessible natively, as the first
step?

You’ve actually hit the nail on the head with a really hotly debated accessibility topic at the
moment. A lot of companies are bringing out what’s called an overlay. It’s a button you click to say
“I have accessibility requirements”, then you say which accessibility needs you have, and it updates
the website based on those.

**Colleague:** I think that’s useful for YouTube and things like that, where you’re watching a video
and you want things bigger. Do you think it applies to us, in the app, or for our use case?

I think for us, where we are currently, it would be a lot more expensive to start with. It would also
take a lot more time if we built one ourselves, instead of fixing what we already have, or making sure
everything in the future is built accessibly from the start. That said, it’s definitely not a bad
thing to consider, but it might be more difficult to get buy-in from the business for something like
that.

**Colleague:** It seems you need to be in a position where you’re fully accessible first. If the
foundations are there, these tools rely on the code underneath to change and modify things. But if we
don’t have the basics in there, these tools probably won’t be able to change much either. It gets very
messy and confusing for the user, because the tool starts changing font sizes or colours on elements
that don’t support it, because they’ve not been coded properly. And with things like what Abi’s been
showing, if we don’t have designs for the focus state, these tools might help, but the experience
will be a bit weird, because they’re putting a solution on top of your solution. It’s going to clash.

It’s interesting, yes.

**Colleague:** If I can very quickly add, we’re redoing all the components in our design system from
scratch, and we’ve been working with some of you on that already. One of the rules for the
documentation for each component is that it needs to include the accessibility details, especially
the hover and focus states. Those need to be documented for every interactive element. There’s lots
of other things Abi has covered here that we’ll try to include in that documentation as well, so at
least we can help from that side. But some of these things need to be tested as they’re being
developed. That’s the only way.

**Question from a colleague:** Abi, this is a bit random, but how much of the responsibility has moved
to browsers over the years? Is it expected that browsers take on a lot of users’ accessibility needs,
so that website owners don’t have to?

Oh, this is a difficult one to word. From the browser’s side, they’ve done everything they can
already, by providing semantic elements. There’s nothing the browser can do if, for instance, we’re
not putting first level headings in. There’s nothing the browser can do to fix that. It’s just our
coding.

**Colleague:** Okay. A specific example I was thinking of: I’m talking 20 years ago here, but every
website I used to build, we’d always put little buttons on to change the size of the text on the page.
Browsers handle that now, as far as I’m aware, which is why you don’t see anyone do it on their own
site any more. Browsers offer zoom, and I believe text size changes. So I was wondering if there are
other things like that, where browsers could take on the responsibility with a tool that’s accessible
to everyone, whether or not the site’s owner bothers. Is there anything like that which hasn’t been
done yet, but could be?

I guess the one thing that comes to mind is colour contrast. If you’re using Chrome, for instance,
there are so many Chrome extensions where you click a button, it scans your page, and it highlights
the parts that don’t have enough colour contrast. It feels like that would be quite an easy thing for
browsers to do natively, but they haven’t done it yet.

**Colleague:** Okay, cool. So there might be other things they could do in theory, but it’s unlikely
they’ll happen, or at least it would be a long time.

Yes, I wouldn’t want to rely on waiting for that to happen.

**Colleague:** Okay, cool, thanks.

Any other questions?

**Question from a colleague:** Are there any tools that can help with the testing, so it doesn’t have
to be done manually all the time? I know Google has a tool for Android, but I’m not sure about the web
and iOS.

For the web, there definitely are. There are quite a few options. In frontend at giffgaff, we use a
tool called Pa11y, which I think is in all the pipelines for the new micro frontends, if I’m right.

**Colleague:** It’s in there, but it’s not switched on at the moment.

Okay. So from my experience, and the things I’ve worked on, we do have Pa11y, and we should definitely
turn it back on. I’m sure there are tools for other areas that could be put in, I just haven’t looked
into them. So yes, a really good point, worth looking into.

Any other questions? I’ll take the silence as a no.
