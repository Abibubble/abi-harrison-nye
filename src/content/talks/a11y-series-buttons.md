### Introduction

On screen: the title slide. A drawing of a phone on a blue background, with the word “Buttons” on its screen, above a grey button reading “Oh no!”.

Cool. Hi. So, we’re here to talk about buttons. Like Eve, I’d like to start by saying I’m not an expert, so if you know something buttony that I haven’t mentioned, please do let me know.

### How easy are buttons?

On screen: “How easy are buttons?”, with two giffgaff buttons, “Order your free SIM” and “Activate your SIM”. Below them: “If you have no accessibility needs, a standard button is pretty easy. Just a simple read and a click and you’re on your way! How about if you’re visually impaired? What about if you have a motor skills disability? What if you’ve broken your mouse or touchpad? What if your cat is sat on your keyboard AGAIN?! We design our buttons with these users in mind.”

How easy are buttons? If you haven’t got any accessibility requirements, they’re pretty easy. But not all website interactions are clicks. Pseudo-elements and pseudo-classes exist for a reason, and we’ll discuss those a little bit later on.

So what about if you’re visually impaired, or you have a motor skills disability? What if you’ve broken your mouse or your touchpad? What if your cat is sat on your keyboard again? We design our buttons with these users in mind.

### Accessibility

On screen: “Accessibility (A11y)”, in two lists. Temporary: broken limb, broken mouse or equipment, distractions (children, pets, partners), screen glare, slow internet, under the influence. Permanent: cognitive impairments, blindness, quadriplegia, deafness, motor skill impairment (tremors).

Let’s quickly remind ourselves what different accessibility requirements can look like, although I’m sure most of you have seen this screen before.

Disabilities can be temporary, like a broken limb, or permanent, like a motor skills impairment. While assistive technologies are rapidly progressing to aid these users, there’s still work we need to do to make sure these technologies can use our site easily.

There’s things like screen readers, which help people with visual impairments. And there’s keyboard only navigation, switches, mouth sticks and things like that for people with motor skills impairments. So how can we design our buttons for these users?

### Basic buttons

On screen: “Basic Buttons”, with a list of topics, two of which are Accessible Rich Internet Applications (ARIA) attributes: button content, aria-labelledby, aria-label and icons, tap target size (48px by 48px), button versus a, focus and hover, before and after. Beside it, a picture of a plain button labelled “Regular Buttons”. The following slides keep this list down the side, with the current topic in bold.

We’ll start by looking at our basic buttons. We’ve got a little list here of important things when dealing with buttons, so let’s go through those.

### Button content

On screen: “Button Content”. A plain button reading “Button”, crossed out with a red cross. Below it, giffgaff buttons reading “Order your free SIM”, “Activate your SIM”, “See all phones” and “Continue”.

We’ll start with button content. This refers to the text that’s visible inside the button.

In the first case, “Button”. It’s not great content. We can see it’s a button, but what does it do? Our buttons need to describe what they’re for on the face of them.

So, “See all phones”. Awesome, great, descriptive. Or “Order your free SIM”. I know exactly what that does, just from reading the button.

We also need to consider context. This “Continue” button by itself isn’t very descriptive. But once you know I took it from the iPhone 11 page, suddenly it has a lot more meaning. The context gave it that meaning.

Sadly, “Continue” by itself won’t help a screen reader user. While a sighted user can see the full page at a glance and know what “Continue” refers to, a screen reader user doesn’t have that luxury. This is where our next important thing comes in.

### aria-labelledby

On screen: “Aria-labelledby”. The “Continue” button, next to a screenshot of Chrome’s accessibility tree, showing “button ‘Continue’” with the text “Continue”. Below, the code for the button. Inside the button is a span with the id “continue-btn” and the class “gg-u-screen-reader-only”, holding the text “Continue with your purchase”. Then a span with the class “gg-c-btn__switch”, aria-hidden set to true, and aria-labelledby set to “continue-btn”, holding the text “Continue”.

ARIA stands for Accessible Rich Internet Applications. It supplements your HTML, to determine ways to make web content more accessible for those who use assistive technologies.

We’re going to start with aria-labelledby. This is for when the button has text, but without context, an assistive technology user would need more information.

I’ve included a screenshot on the right hand side of the accessibility tree on Chrome’s developer tools, for the “Continue” button we were discussing. If you want to find this yourself, go into developer tools, then Settings, then Experiments, and tick the box that says “Enable full accessibility tree view”. It’s just there.

With this, you can see what we’re showing our assistive technology users. We can see what a screen reader will see: “button, Continue, text, Continue”. That’s not ideal. Something like “Continue with your purchase” would be a much more descriptive aria-labelledby to have here.

To use this, as you can see at the bottom of the screen, it’s very similar to a label for an input element. We put another span inside the button. We give it a class of gg-u-screen-reader-only, and an id with a meaningful name relating to what the button is. In this case, I’ve given it “continue-btn”.

We then put our informative text inside the previous span, and give our button an aria-labelledby with the id of that span. This has actually been updated on the design system website, so all the buttons now come with this.

### aria-label

On screen: “Aria-label”. The giffgaff header on mobile, with the logo and a menu icon made of three lines. Next to it, the accessibility tree, showing the menu as “button ‘Menu’”. Below, the code: a button with the class “gg-c-btn” and aria-label set to “menu icon”, holding a span with aria-hidden set to true and an SVG icon inside.

Next one is aria-label. It does exactly the same as aria-labelledby, but it’s only for buttons with no text. Whether that’s an icon in a button, like our menu burger bar on mobile, or just a colourful button, you’d want an aria-label for it.

The good news is, we do this already. All our buttons in the design system have an aria-label attached to them. All you have to do is fill in the descriptive content for our assistive technology users.

There is just one downside to aria-label. It doesn’t get translated by Google Translate, so for any non-English-speaking users, this can cause issues. But it’s a lot better than just having an icon. The ideal would be to have an icon with the text displayed next to it or under it, but obviously that’s not always the best choice, design-wise.

### Tap target size

On screen: “Tap-target size”. A tiny button, crossed out with a red cross, next to a bigger yellow square. Below, three yellow squares in a row, labelled 48px wide and 48px high, with an 8px gap between them.

Our next little thing is tap targets. A tap target refers to the size of an interactive object, such as a button. If you can click it, it’s a tap target. Small tap targets are really hard to use accurately.

Due to their clickable nature, we need to consider those who struggle with motor skills: users in an older demographic, users with cerebral palsy or Parkinson’s, or other motor skills disabilities. These users can have hands that shake, or bad eyesight, which makes clicking on teeny tiny tap targets really difficult and frustrating for them.

I don’t know how many of you tried Eve’s accessibility challenge a while back. She and I spent an entire day using Head Pointer on our Macs. The most annoying thing was the tiny tap targets. Trying to click on a button by pointing your head at it, and sticking your tongue out without moving your head too much. Yeah, it was bad. I kept closing my browser tabs rather than clicking on them, which is really frustrating when you’re researching.

But that’s just one example of the assistive technologies that benefit from larger tap targets. Some people use mouth sticks to operate touchscreen devices, which is literally a stick you have in your mouth to operate it. And some users, without the use of their hands, can also use their feet to access the web.

Even ignoring the accessibility side of things, I think everyone’s had trouble on their phone, trying to click a tiny button or input box that’s just too small for your fingers to press.

So we make our tap targets a minimum of 48 pixels in height and width, with a minimum gap between them of 8 pixels. This is to avoid any overlap of tap targets.

I was a driving instructor before this, so I think of it like a width restriction in the road. If it’s too small, your car’s not going to get through. You’ll just end up with scratches and scrapes and a frustrating day. It’s just like that, but with your finger, mouse, head pointer or mouth stick being the car, and the tap target being that tiny width restriction.

Oh, I’ve just seen there’s some chat.

### button versus a

On screen: “button vs. a”. A giffgaff link styled as a button, reading “Have a proper chat”. Below it, the menu icon, and a “Share on Twitter” button on a card.

The next one is when to use a button, versus when to use an a tag. Nice and easy.

We tend to use a button when… We use a button for actions that don’t affect the page itself. So the menu icon on mobile devices, or buttons within clickable sections, such as the “Share on Twitter” button here.

A tags should be used for links to external sites, or links to content on the same site, such as the “Have a proper chat” button from the Hub.

### Focus and hover

On screen: “:focus & :hover”. Two copies of a giffgaff card, showing a pink picture of two hands holding a heart, a card title and some text. The first has no focus style. The second has a blue outline around it. Beside them, the code “@include focus-hover;”.

Now we’re coming to the slightly chunkier one: focus and hover.

For those who don’t know, focus and hover are examples of pseudo-classes. Pseudo-classes are basically just keywords added to an element to specify a special state of that element. For instance, if you want to style what happens when a user hovers their mouse over an element.

Hover and focus are incredibly similar in their action, but completely different for users with accessibility needs.

Hover targets the action of a user’s mouse being hovered over an element. This can help the user understand that they can actually interact with this element. But how do you hover your cursor over an element if you’re not using a mouse? That’s where focus comes in.

Focus allows an element to be interacted with while the user is using a keyboard, a switch, or something like that. You can actually see this action for yourself just by pressing the tab key on your keyboard to scroll through a web page. It’ll highlight or emphasise the focused-on items, allowing non-mouse users to see where their focus is.

I’ve included two images of our card component here. The first one’s got no hover or focus set, giving no feedback to the user that they’ve actually selected that card. The second one has our lovely giffgaffy hover and focus styling on it, which clearly shows our users which element of the page they’ve selected.

So this is why we need to style the hover and focus pseudo-classes. It’s all well and good having a gorgeous little animation when a mouse user hovers over the element, but you can’t let keyboard users miss out on that.

On screen: the focus-hover mixin’s code, which sets a solid 2 pixel light blue outline on focus, hover and active, with no offset.

Sadly, on quite a few giffgaff pages, the focus styling is being removed. This is because by default, it’s a really horrible colour of blue, with a silly little border radius around it, that really doesn’t fit the giffgaff styling. So people are setting the outline on focus to none, or transparent, to avoid the really horrible styling clash.

By doing this, we’re effectively blinding our keyboard users to the use of our site. So we’ve got a helpful little focus-hover mixin, that will set your focus, hover, and active styling to a lovely giffgaffy light blue. All you need to do is include it, and you’re set.

### Before and after

On screen: “:before & :after”. The developer tools, showing a button with before and after pseudo-elements inside it. Below, the CSS for them, with the line “content: "";” circled in red.

Next one: before and after. These are pseudo-elements, which allow you to insert content on a page without it being in the HTML code.

These pseudo-elements have to be created with a content attribute, as I’ve circled in red there, but we want to start it with an empty string. Without the content attribute, these pseudo-elements will not exist on your page.

This is actually the cause of our issues with these pseudo-elements. Because they’re not in the HTML, screen readers can’t read them. So consider any content you add to these as completely invisible. Because of this, it’s best to use these for design and styling only, not for content.

### Our buttons

On screen: “Our buttons”. A red destructive button and a yellow coloured button, both reading “Button”. A loading button with a spinning circle, and a version for people who prefer reduced motion, reading “Loading…”. A grey disabled button, crossed out with a red cross.

Okay, here are some of our buttons.

First, let’s talk about the primary, or coloured, buttons, and the destructive buttons. These are pretty good, with one caveat. Colours cannot be the only distinguishing factor to provide information to a user. Otherwise, all our colour blind users will be having a really hard time with our site.

While the call to action (CTA) primary button generally doesn’t need the colour, it just makes it a bit more eye-catching. If you’re using a destructive button, please ensure the text on the button is descriptive as to why it’s destructive, so you’re not only using colour to give it meaning.

Next ones along are our loading buttons. These have had a recent revamp, so there’s now an option for if the user prefers reduced motion, as you can see underneath. I know Eve spoke about animations in the last workshop, so I’m not going to talk too much about it now. But basically, the new loading button is now fully accessible. If you want to use a loading button, please double check the design system site to make sure you’re using the right syntax, because it’s changed quite a bit.

### Disabled buttons

On screen: “Disabled buttons”, with a photo of a switch: a black box with two large buttons on top, one white and one orange.

And then the final one is disabled buttons. Some of you may know, these are my nemesis.

So, to show you how awful these are, let’s quickly discuss what a switch is, so you can understand why the web in general hates disabled buttons so much.

This is a switch. A switch is used by users with motor skills impairments, such as those with paralysis, or other disabilities that reduce the use of their limbs. This is a fairly standard switch. So, there’s large buttons, with the purpose for the button set by the user. Often, a user will set one button to be the Tab key, effectively, on your keyboard, and the other button would be Enter.

Generally, they’d be positioned either on your headrest, or on your armrest, depending on where the user has the most motion. A user can get more switches, and it then would give them more functionality, more buttons, but they’re really expensive. I think the cheapest I found was about £50 for one button. Just think, if you want one button for everything you might possibly do, that can get quite expensive quite quickly.

So with that in mind, we’ll dive into an example scenario.

On screen: a short video of a form with “Full Name” and “Email Address” fields, and a grey “Submit” button. The name “abi harrison” is typed in, then an email address with the @ missing. The Submit button stays grey.

You’re a switch user, you’re filling in an online form to buy a SIM card. The submit button is disabled until you enter your details. You’re going to enter your full name and your email address, then we’re going to go to press submit.

But, oh no. It looks like you’ve missed the @ from your email address. The form notices you haven’t filled in the form correctly, and it doesn’t enable the button. Your switch will just skip straight past the disabled button, as if it doesn’t exist, and you’ve got no idea why it’s done that. Frustrating, right?

That’s the experience we’re giving to our users with disabled buttons. There’s nothing to tell them why a button is disabled, or what they need to do to enable the button.

There’s pretty much always a better way for us to convey that a button isn’t usable. Whether that’s a little shake on click, or some text that appears to tell a user what needs to happen to make the button usable. Or even a little countdown timer.

Because of this, from today, I’m very happy to say, disabled buttons will no longer be part of the giffgaff design system. If you want to use one and you can’t think of an alternative, please drop me a message. We’ll chat through what you could use instead, and we’ll find a really nice alternative.

### Thanks

On screen: “Thanks for listening to me ramble about buttons…”, with a meme of Boromir from The Lord of the Rings, reading “One does not simply ignore accessibility”.

So, with disabled buttons gone, that’s it. Thanks for listening to me ramble about buttons, and have a lovely day.

### Questions

**Colleague 1:** That was amazing, Abi. Thank you so much for taking us through that.

No worries.

**Colleague 2:** Thanks again for taking us through that, it was amazing. Whose responsibility is it to make sure we’re updating all the ARIA labels, and making sure everything’s in line with what we’re saying here? Is it frontend developers, or is it experience, like, whose responsibility would that be?

**Host:** That is a fantastic question. Abi, do you want to take that, or do you want me to take it?

I think you can take that one.

**Host:** Cool. It’s really the responsibility of anyone who is coding in the buttons. So, be that a frontend developer, or be it a user experience designer (UXer) who’s maybe spotting something, and then they can be like, “Actually, this doesn’t quite match. Frontend developers, could you please update this?”

One of the things we’re doing as a follow-on to these workshops is just, kind of, doing checks every so often on the accessibility standards of our pages. Then we’re liaising with the product teams to, sort of, just give them a nudge to bring those things up to speed. So in answer to your question, the responsibility sort of lies with all of us. But in terms of the application of those improvements, that is with the frontend developers. They’ll be sad to hear.

**Colleague 2:** Thank you.

**Host:** Cool. All right, anyone else have any questions? Nope. Amazing. I’m going to hit the stop record button.
