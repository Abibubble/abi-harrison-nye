### Introduction

On screen: the title slide, on pink. “We do the hard work: Accessibility”, with a black circle reading “Abi H-N”.

Hello, everyone. Can you all hear me?

**Audience:** Yes.

Okay, amazing. So, the important thing to remember here is, if we’re creating the future, it’s really important that that future is up to good, and fully inclusive. That’s why we’ve done the hard work to improve accessibility in our new experiences for members.

Approximately 1 in 4 people in the United Kingdom (UK) have a disability, and approximately 1 in 7 people are neurodivergent. That’s a lot of people. And good accessibility doesn’t just help them, it helps everyone. One of my favourite phrases is “accessible UX is good UX”, where UX means user experience.

### The challenge

On screen: “Challenge. Find the phone (colours), Accessibility Edition”, over a photo of a countdown timer.

If we can head over to the next slide, I have a challenge for you all.

In the next couple of screens, we’re going to hear the screen reader version of our current experience, the original range page. Then a bit later on, we’ll go through our new range page.

My challenge for you is, using only the screen reader experience of our current range page, find out which colours the iPhone 16 is available in. In my slide, I’ve visually hidden the colours, for the purpose of this challenge.

### The current range page

On screen: “Today”. Two phone screenshots of the current mobile phones page, labelled “Looks like”, and an audio player labelled “Sounds like”. The page shows the heading “Mobile phones”, three benefits with icons, a “hold the phone… save £400” banner, tabs for New and Refurbished, filters, and the iPhone 16 with a “lowest ever price” label. The colour options are covered up.

We’ve got some screenshots here of our current range page. We’re going to listen to the screen reader experience of it, and when it’s finished, I’d like you to shout out if you know what colours are available. If somebody could click the audio button for me.

**Screen reader:** Mobile phones, heading level 2. Pair your shiny new phone with a good contract or flexible pay monthly deal. Image. All our phones are unlocked. Image. Free next business day delivery star. Image. Spread the cost with interest-free payments. Visited link. Hold the phone, save £400 on the Google Pixel 9 Pro. Link. Comma. Promotions, list, 2 items. Visited link. New. Link. Refurbished. Hide out of stock, unticked tick box, hide out of stock. Image. 42 phones. Filter by. Image. Sort by. Image. All phones, ticked tick box, all phones. Image. Apple, unticked tick box, Apple. Visited link. Heading level 2. iPhone 16. iPhone 16. iPhone 16. Phone plus data from £28.87 a month, plus £20 up front, for 36 months. Now in stock. Details.

Okay. I know that was a little bit quick, and I already saw some little giggles there. Did anyone catch what colours are available?

**Colleague:** I think it’s a no, Abi.

No, absolute silence. So that’s a really good example of what our screen reader users are currently missing out on. Did anyone notice any other issues? Ooh, we’ve got a mic.

**Colleague:** Hello. It was out of order. It was read out in a different order from how it appears on screen.

Yep, good shout. Anyone else?

**Colleague:** There were lots of images, and I didn’t know what any of them were.

Very good spot. I enjoyed the “comma” for one of the images.

So what about the “free next business day delivery” star? What does the star relate to? Oh, somebody’s going for a mic.

**Colleague:** I just found it total information overload within about the first 5 seconds. My brain switched off completely, and after that I didn’t really follow any of it. It was just too much.

A very good spot. It’s not super clear, and a lot of that is semantic HTML. I know, boring.

So, with the “next business day delivery” star, what does the star relate to? Well, it actually relates to a little bit of text right at the bottom of the page. For our sighted members, all they have to do is scroll down and read it. Not too difficult. But a screen reader user would have to listen to the entire page, hearing every phone we’ve got listed, before finally hearing what the star relates to. By which point, they’ve probably forgotten there was a star in the first place.

### What did we do?

On screen: “What did we do?”, with 12 boxes: semantic HTML; alt text; accessible tap targets; descriptive link text; focus and hover states; screen reader only text; using accessible components from fe-toolkit; using aria-describedby to explain what the star refers to; correct roles added to aid screen reader use; Pa11y tests, run on all pages; accessibility snapshot tests in every test file; manual testing with a screen reader and keyboard only.

So what did we do to fix it? If we can go to the next slide, please. Awesome. Here’s some of the wonderful stuff we did.

We started with some really lovely semantic HTML. With all the basics, HTML gives us some wonderful accessibility from the start. We put in proper alt text for all images. We made sure our tap targets were big enough, and spaced apart. We made sure all our links are fully descriptive, so none of that “read more” or “click here” stuff. We made sure our focus and hover states are all super clear. Anything that wasn’t easy for screen reader users, we added some screen reader only text to make it clearer.

We started with lovely accessible components from fe-toolkit, with accessibility already baked in. We focused on the star a little bit, and used aria-describedby to explain to screen reader users what it actually refers to. We added some good roles too, to help our screen reader users, so telling them that buttons are actually buttons.

Then, when we built everything, we tested. We ran Pa11y tests, which is an automated accessibility checker. We did snapshot testing in every single test file, so every component and every page was tested. We then followed up with some manual testing, with screen reader and keyboard only as a big focus, as well as cognition.

### The new range page

On screen: “Impact, even on a page spun up in days”. Two phone screenshots of the new mobile phones page, labelled “Looks like”, and an audio player labelled “Sounds like”. The page shows the heading “Mobile phones”, two benefits with icons, a New tab, filters, and phones including the iPhone 16 from £749, the Samsung Galaxy S24 from £549 with £200 off, and the Google Pixel 9 Pro. The colour options are covered up.

If we can go to the next slide, we’ll take a look at our range page. This is the brand new one. It’s important to note that the pay monthly and refurbished phones are a future piece of work, so we only have pay in full prices for new phones at the moment. There’s also a little bit of an order difference, because I had to record it on a desktop computer, so apologies for that. So, let’s listen.

**Screen reader:** Mobile phones. Unlocked padlock, image. All our phones are unlocked. Free delivery, image. Free next working day delivery, star. If you’re outside mainland UK, deliveries could take up to 4 working days. Orders made Friday to Sunday arrive by Tuesday. Group. Star. New. Hide out of stock, unticked tick box, hide out of stock. 39 phones. Filter by. Sort by. Ticked, all. Image. All. Apple, unticked tick box, Apple. Heading level 2. iPhone 16. Image. List, available colours, 5 items. Black. Ultramarine. White. Pink. Teal. Phone from £749. Image. Out of stock. View details, button.

Okay, did anyone catch what colours are available?

**Colleague:** I think there was teal, black, ultramarine and white. I can’t remember the other one.

Well done, yeah. Does anybody know what the final colour was?

**Colleague:** Yellow?

Not quite.

**Colleague:** Pink.

Perfect. And whoever’s controlling the screen, if you can click once more. There you go, there are your answers.

On screen: the colour options on the new page are uncovered.

So you see how much easier it was to get the information, straight up front and really clearly. Did you also notice the difference with the “free next working day delivery” star? Now our screen reader users know exactly what it relates to.

### How we did it

On screen: “How we did it”, with a list: included accessibility from the planning stage; had wonderful conversations with our designers; used the Accessibility Production Readiness Checklist (PRC); included accessibility in our pull request template; used the Accessibility Confluence documentation.

So how did we do it? Let’s go on to the next slide. This one’s a bit of a fun one.

We included accessibility from day one. From the planning stage, we had our Lucid board up, with all the things we need to think about, and we just had a little sticky note that said “accessibility”. We had some lovely chats, and it got baked in.

We had some fantastic conversations with our designers. A special shout-out to Nigel, for hearing, understanding and making improvements.

We used our accessibility production readiness checklist, which is super handy. It’s little tick boxes, to make sure you’ve checked everything.

We also included accessibility in our pull request template. So every pull request that was put through for this was tested on a screen reader, tested with keyboard only, and had the automated tests added. Anything we weren’t sure of, we checked against the accessibility documentation on Confluence.

### The secret

On screen: a green box reading “Want to know a secret?”. Then: “It didn’t take any longer to build it with accessibility in mind from the start. In fact, the entire Range page was built, fully functioning, in 4 days. How long would it have taken to fix the accessibility issues? At least 4 days. A lot of the code would have needed to be rebuilt.”

Okay, I know you all want to know the secret. So if we can click once more.

It didn’t actually take us any longer to build it with accessibility in mind from day one. In fact, the entire range page was built, fully functioning and fully accessible, in just 4 days.

And how long would it have taken to fix those accessibility issues, if we hadn’t thought about it? A minimum of 4 days. A lot of the code would have had to be rebuilt from the ground up, so we’d effectively be doubling the work time.

### You can do it too

On screen: “You can do it too! But how?”, with a list: include accessibility from the planning stage; find documentation in the Accessibility Confluence space; ask for support and assistance in the #accessibility Slack channel; support your team; use the Accessibility PRC; add automated accessibility tests (such as Pa11y, Axe, Cypress RealEvents); include manual accessibility testing (such as screen reader, keyboard only).

Okay, next slide, please. Some of you might be thinking, “Abi, I can’t do all that.” You can. You definitely can. So how are you going to do it?

You can include accessibility from the planning stage. All it takes is one sticky note.

You can use the documentation on Confluence, and chat to us in the accessibility Slack channel, for any support, assistance, or just chats.

Make sure you’re supporting your team. Accessibility can be quite a lonely thing to focus on, so support each other, and be each other’s sounding boards.

Use the accessibility production readiness checklist. If you haven’t seen it before, you can find it in fe-multi-product.

You can add some automated accessibility tests. I’ve put some examples here, but the big win with all of these is that you build it once, and it just tests forever. It’s great.

Finally, do your own manual accessibility testing as your final step: screen reader, keyboard only, cognition, things like that.

Okay. I’ll stop talking now, and pass you on to our amazing, amazing Nigel.
