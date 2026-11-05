### Introduction

On screen: the title slide, on pink. “We do the hard work: Accessibility”, with a black circle reading “Abi H-N”.

Gosh, the next person is me. Hello.

Cool, accessibility. Obviously, I’m going to be talking about this. Some of these slides you guys probably will have seen before, so we will speed through, because it’s all good work.

If we can go to the next slide, please.

### The current range page

On screen: “Today”. Two phone screenshots of the current mobile phones page, labelled “Looks like”, and an audio player labelled “Sounds like”. The page shows the heading “Mobile phones”, three benefits with icons, a “hold the phone… save £400” banner, tabs for New and Refurbished, filters, and the iPhone 16 with a “lowest ever price” label. The colour options are covered up.

Here we have an example of what our current phones range page is. You’ve got a visual on the left, and then on the right, if we click that audio button, we have a screen reader version of what it sounds like.

**Screen reader:** Mobile phones, heading level 2. Pair your shiny new phone with a good contract or flexible pay monthly deal. Image. All our phones are unlocked. Image. Free next business day delivery star. Image. Spread the cost with interest-free payments. Visited link. Hold the phone, save £400 on the Google Pixel 9 Pro. Link. Comma. Promotions, list, 2 items. Visited link. New. Link. Refurbished. Hide out of stock, unticked tick box, hide out of stock. Image. 42 phones. Filter by. Image. Sort by. Image. All phones, ticked tick box, all phones. Image. Apple, unticked tick box, Apple. Visited link. Heading level 2. iPhone 16. iPhone 16. iPhone 16. Phone plus data from £28.87 slash mo, plus £20 up front, for 36 months. Now in stock. View details.

Okay. I’ve seen some of your faces during that.

So, a very quick run-through of the major issues. We’ve got “free next business day delivery star”, but the star means nothing. We’ve got “image, link, comma”, instead of our lovely “hold the phone, save £400”. And of course, the everlasting “iPhone 16, iPhone 16, iPhone 16”, which is clearly how we should be announcing our phones.

So we then took this, and decided we were going to make it better.

### What did we do?

On screen: “What did we do?”, with 12 boxes: semantic HTML; alt text; accessible tap targets; descriptive link text; focus and hover states; screen reader only text; using accessible components from fe-toolkit; using aria-describedby to explain what the star refers to; correct roles added to aid screen reader use; Pa11y tests, run on all pages; accessibility snapshot tests in every test file; manual testing with a screen reader and keyboard only.

If we can go to the next slide, please. Here are all the things we did. Well, I say all. These are a little snapshot of the things we did.

We started with semantic HTML. We put in alt text for all the images. We’ve got lovely accessible tap targets. Our link text is all descriptive, focus and hover states. We’ve got screen reader only text where things just weren’t descriptive enough.

We’ve got pre-built accessible components in fe-toolkit, so those are just plug and play. Everything is amazing. We used aria-describedby to explain that pesky star, so now it actually tells you what the star means.

And then we did some accessibility testing. We made sure we weren’t just doing it manually, but we were also covering the automated as well, so once things are in, we’re not going to introduce issues later on down the line.

### The new range page

On screen: “Impact, even on a page spun up in days”. Two phone screenshots of the new mobile phones page, labelled “Looks like”, and an audio player labelled “Sounds like”. The page shows the heading “Mobile phones”, two benefits with icons, a New tab, filters, and phones including the iPhone 16 from £749, the Samsung Galaxy S24 from £549 with £200 off, and the Google Pixel 9 Pro. The colour options are covered up.

If we go to the next slide, here we have what we’ve been building. This is the brand new range page. Same again, if we click the button, you can hear it on a screen reader.

**Screen reader:** Heading level 1. Mobile phones. Unlocked padlock, image. All our phones are unlocked. Free delivery, image. Free next working day delivery, star. If you’re outside mainland UK, deliveries could take up to 4 working days. Orders made on Friday to Sunday arrive by Tuesday. Group. Star. New. Hide out of stock, unticked tick box, hide out of stock. 39 phones. Filter by. Sort by. Ticked, all. Ticked, all. Ticked tick box. Ticked, image. All. Apple, Apple, unticked tick box, Apple. Heading level 2. iPhone 16. iPhone 16. Image. List, available colours, 5 items. Black. Ultramarine. White. Pink. Teal. Phone from £749. Image. Out of stock. View details, button.

Cool. So, as you can hear, we’ve fixed up a lot of those issues. We do still have “iPhone 16, iPhone 16”. However, that’s because we’ve got “iPhone 16” text, followed by an image of an iPhone 16.

### How we did it

On screen: “How we did it”, with a list: included accessibility from the planning stage; had wonderful conversations with our designers; used the Accessibility Production Readiness Checklist (PRC); included accessibility in our pull request template; used the Accessibility Confluence documentation.

Okay, if we move on to the next one, this is how we did it.

We started with accessibility from the very first step, in planning. We had a little Lucid board, where we were talking about all the things we need to think about, and we just put in a sticky note that said “accessibility”. It meant that from day one, we were talking about it. It was one of our top priorities.

We had some lovely conversations with our designers. Massive props to Nigel for dealing with my constant “Is this going to be accessible?”

We also have the accessibility production readiness checklist, which just means that every frontend repo we put out there has little tick boxes, so you can check everything off and feel sure it’s accessible.

We’ve also got accessibility in our pull request template, making sure you’ve tested it with a screen reader, tested it with keyboard only, and run accessibility automated tests.

We also used the documentation from the accessibility Confluence, and the accessibility Slack channel as and when we needed it. And then we’ve already talked about the manual and automated testing in there.

### The secret

On screen: a green box reading “Want to know a secret?”. Then: “It didn’t take any longer to build it with accessibility in mind from the start. In fact, the entire Range page was built, fully functioning, in 4 days. How long would it have taken to fix the accessibility issues? At least 4 days. A lot of the code would have needed to be rebuilt.”

If we go to the next slide. Do you guys want to know a secret? If we click once more.

It didn’t take any longer to build it with accessibility in mind from the start. In fact, that entire range page was built, fully functioning, in just 4 days. That’s what I call a win.

And just for comparison, there, it would have taken us at least a week if we’d built it with accessibility issues, then had to go back and fix them. So by building it with accessibility in mind from the start, we’ve actually saved ourselves about a week’s worth of developer time and money. So, big win.
