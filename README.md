## Project goal
Produce a static website to show off my projects to potential employers which had:
- Personality, but not so much as to come across as unprofessional (i.e. keep the beam of magic, but make it quieter and lose the [red-eyed shadow monsters being disintegrated by it](https://alex-symonds.github.io/monsters/))
- CSS which blended in with the mood, rather than [drawing too much attention to itself](https://alex-symonds.github.io/doodles/)

## How to navigate this project
- Used Gulp to minify and clean the CSS and JS: [code](https://github.com/Alex-Symonds/portfolio-02-magic/blob/main/gulpfile.js)
- My first proper hamburger menu: [code](https://github.com/Alex-Symonds/portfolio-02-magic/blob/main/dev/scripts/hamburger_menu.js)
- InkScape didn't have a 3D rotation tool for the arcane rune, so I used CSS: [code](https://github.com/Alex-Symonds/portfolio-02-magic/blob/77a7d3a488c232f1e20bd36908b22ab9268358ac/dev/scss/hero.scss#L115)


## Why I made it this way
#### Code
- Given that it's a one-page website, I felt comfortable tucking the nav away in a hamburger menu, even on desktop
- I'm interested in accessibility and wanted to start giving it greater consideration in my work, so I:
   - Made the hamburger menu operable via keyboard
   - Ensured there was a visually-hidden text alternative to the programming icons
- Used JavaScript to set each section to a minimum height of "a full page", rather than using 100vh, in order to fix responsiveness issues on mobile (with the dynamic address/menu bars) to my satisfaction


#### Design and Content
- More subdued, more professional design
- The gentle glowy-sparkles made a nice background for my LinkedIn profile (my current test for "do I feel comfortable with how professional this looks?")
- Decided that since my content will be limited to some project cards and a short About section, it'd make sense to have a single page where you scroll down, rather than separate pages
- Included JavaScript to switch between icons and text for the language/framework/tools used for each project. This covers the demographic of "people who can see the icons, but don't know what they mean"
- Made my own icons for HTML and CSS because there weren't any official ones and the unofficial ones with the shield shapes appear to come from an alternative universe where people abbreviate HTML5 and CSS3 to "5 and 3", rather than "HTML and CSS"
- Edited my "About" section down to a single sentence and a list of programming languages/technologies/frameworks




