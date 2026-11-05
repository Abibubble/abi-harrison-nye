### What is it for?

You should ensure that interactive elements like buttons or links are large enough and have enough space around them, to make them easy to press without accidentally overlapping onto other elements.

Rage clicks can be a nightmare. This is where the user has to attempt to click on an interactive element more than once. This can remove barriers for a number of users, including (but not limited to):

- Users who use a mobile device where a touchscreen is the primary mode of interaction
- Users with mobility impairments, such as hand tremors
- Users who use a mobile device in environments where they are exposed to shaking, such as public transportation
- Users who find fine motor movements difficult
- Users who access a device using one hand
- Users with large fingers, or who are operating the device with only a part of their finger or knuckle
- Users who have low vision may better see the target

Fully supported, you just need to ensure that your tap targets are large enough and with enough of a gap between them.

### How to support it

WCAG 2.1 states that all tap targets must be a minimum of 44px x 44px, with a minimum gap of 8px between tap targets. This is so that a user's finger pressing on one tap target does not inadvertently touch another tap target.

_Note:_ `px` _means_ `pixels`

A minimum tap target size of 48px x 48px is recommended. This is slightly larger than the minimum required by WCAG. Keep the minimum gap of 8px between tap targets too.

The 48px x 48px area corresponds to around 9mm, which is about the size of a person's finger pad area.

Any interactive element (unless it's text links within a paragraph) should be designed and built to be a minimum size of 48px x 48px, with a gap of 8px between any tap targets.

`button {`

`width: 48px;`

`height: 48px;`

`margin: 8px;`

`}`

While an icon contained by a link may only have a width and height of 24px, you can use additional padding to bring the tap target size up to 48px.

`a .icon {`

`width: 24px;`

`height: 24px;`

`margin: 8px;`

`padding: 12px;`

`}`

### Useful links

- [WCAG 2.1 Target size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [How to use typography, touch targets, and spacing for better accessibility](https://www.brightec.co.uk/blog/how-to-use-typography-touch-targets-and-spacing-for-better-accessibility#:~:text=Touch%20targets%20and%20spacing%20considerations)
- [Accessible tap targets cheat sheet](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/)
