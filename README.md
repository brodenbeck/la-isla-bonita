# Base CSS Setup

## Project Methodology
The primary goal of this base is to create projects that will be easily maintained. Secondarily, it is meant to provide a good base to work off of with future projects to cut down on start-up development time. Project managers, clients, maintainers, and collaborators should all love you for building off of this base.

### Prerequisites
* For the love of cheese, leave IDs out of your CSS.
* Work towards component-based architectural thinking -- do not look at a page as a whole, but instead as a series of components.
* Your HTML is going to have a lot of classes in it (not quite as many as a utility-based CSS architecture, but still a good number).
* Always use a preprocessor. Without a preprocessor, there will need to be modifications made to the layout (for example, you will need to omit the settings and tools layers).

### Atomic Design
Atomic design, coined by [Brad Frost](http://bradfrost.com/blog/post/atomic-web-design/), lends itself to creating reusable components in web design and development rather than designing web pages. Atomic design increases in specificity.

#### Atoms
Atoms include HTML tags (such as form labels, inputs, or buttons), color palettes, fonts, or animations.

#### Molecules
Molecules are groups of atoms bonded together, such as a form, which combines the label, input, and button atom building blocks.

#### Organisms
Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface, whether the molecule is simply repeated several times, as in a product grid, or is made up of several different molecules, as in a page header.

#### Templates
Templates consist of groups of organisms stitched together to form pages. Templates typically begin as wireframes and increase to a higher fidelity to become a deliverable.

#### Pages
Pages become even more specific by adding in the highest level of fidelity. They allow for variations on templates and account for final deliverables to the client.

### Inverted Triangle CSS (ITCSS)
Like the Atomic Design methodology, the Inverted Triangle methodology moves from least specific, settings, to most specific, utilities. The primary goal of ITCSS is to avoid getting entangled in the specificity wars.

#### Settings
Color definitions, font definitions, etc. Contains no actual CSS.

Example:
```scss
$color-ui: #bada55;
$spacing-unit: 10px;
```

#### Tools
Globally used mixins (e.g., gradients, font sizing) and functions. Contains no actual CSS.

Example:
```scss
@mixin font-brand() {
  font-family: 'UI Font', sans-serif;
  font-weight: 400;
}
```

#### Generic
Reset or normalizing styles. First layer that generates actual CSS. These files can typically be shared between projects and they can always be shared without modification.

Example:
```scss
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

#### Elements
Styles for bare HTML elements (h1, p, a, etc.).

Example:
```scss
ul {
  list-style: square outside;
}
```

#### Objects
This is the first layer in which classes may be introduced. Classes must be used in every layer from here on out (no element-based selectors). Contains undecorated design patterns, like wrappers, animations, or grids.

Example:
```scss
.wrapper {
  width: 90%;
  margin: 0 auto;
}
```

#### Components
Specific UI components. This is where a majority of work will take place.

Example:
```scss
.products-list {
  @include font-brand();
  border-top: 1px solid $color-ui;
}
.products-list__item {
  border-bottom: 1px solid $color-ui;
}
```

#### Utilities (or Trumps, but that's a nasty word now)
Utility and helper classes to override anything in the previous layers. The rules in this layer will typically include a lot of `!important` modifiers.

Example:
```scss
.text-center {
  text-align: center !important;
}
```

### Block-Element-Modifier (BEM)

Both Atomic Design and ITCSS dictate how to architect your CSS, but BEM is a naming convention for the classes used when creating your styles. BEM attempts to add clarity to your markup, allowing developers to easily jump into a project and know how classes relate to one another. It is highly component-driven. However, the BEM methodology only applies to a subset of the ITCSS layers (objects and components). The following descriptions are taken directly from [BEM](https://en.bem.info).

#### Block
A functionally independent page component that can be reused.

Rules:
* The block name describes its purpose, or is _semantically meaningful_.
* The block should not influence its environment, meaning you should not set the external geometry or positioning for the block.
* You should **never** use an element tag or ID selector as a block.

Examples:
```html
<!-- `header` block -->
<header class="header">
  <!-- Nested `logo` block -->
  <div class="logo"></div>

  <!-- Nested `search-form` block -->
  <form class="search-form"></form>
</header>
```

#### Element
A composite part of a block that can't be used separately from it. An element is always part of a block.

Rules:
* The block name describes its purpose, or is _semantically meaningful_.
* The format of an element's full name is `block-name__element-name`. Double underscores always precede an element.

Example:
```html
<form class="search-form">
  <div class="search-form__content">
    <input class="search-form__input">
    <button class="search-form__button">Search</button>
  </div>
</form>
```

A block can have a nested structure of elements in the DOM tree:
```html
<div class="block">
  <div class="block__elem1">
    <div class="block__elem2">
      <div class="block__elem3"></div>
    </div>
  </div>
</div>
```
...however, this block structure is always represented as a flat list of elements in BEM methodology:
```scss
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```
This allows you to change a block's DOM structure without making changes in the code for each separate element.

#### Modifier
An entity that defines the appearance, state, or behavior of a block or element.

Rules:
* The modifier name describes the appearance (e.g., small, disabled, centered).
* The format of an element's full name is `block-name[__<element-name>]--modifier-name`. Double hyphens always precede a modifier.

Example:
```html
<form class="search-form">
    <input class="search-form__input">
    <!-- The `button` element on the `search-form` block has a `large` modifier -->
    <button class="search-form__button search-form__button--large">Search</button>
</form>
```

### Namespacing

In addition to utilizing BEM namespacing, we are using individual namespaces within the project and structure. Adding these namespaces allows the developer to look purely at the HTMl to know where to make changes to styles (and, perhaps more importantly, where _not_ to make those changes). This documentation is modified from [CSS Wizardry](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/). For more information on _why_ this is beneficial and why we have adopted this structure, visit the blog post. A nice, fancy buzz word to describe this is [_immutability_](https://csswizardry.com/2015/03/immutable-css/).

* **o-** - signifies that something is an object
```scss
/* Format*/
.o-object-name[<element>|<modifier>] {}

/* Example */
.o-layout {}
.o-layout__item {}
.o-layout--fixed {}
```

* **c-** - signifies that something is a component
```scss
/* Format*/
.c-object-name[<element>|<modifier>] {}

/* Example */
.c-modal {}
.c-modal__title {}
.c-modal--gallery {}
```

* **u-** - signifies that something is a utility class
```scss
/* Format*/
.u-utility-name {}

/* Example */
.u-text-center {}
```

* **s-** - signifies scope, or that the class creates a new styling context
```scss
/* Format*/
.s-scope-name {}

/* Example */
.s-cms-content {}
```

* **-@** - signifies scope, or that the class creates a new styling context (note: the @ symbol must be escaped in your CSS files)
```scss
/* Format*/
.class-name\@[<breakpoint>] {}

/* Example */
@media screen and (min-width: $large) {
  .u-text-center\@lg {}
}
```

### Stylelint
Stylelint is a CSS linter that strives for consistency in CSS conventions and errorless CSS code. It is configurable, and this project contains personal preferences for CSS conventions. These can be overwritten.
