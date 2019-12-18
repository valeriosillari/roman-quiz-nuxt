# Roman Number Quiz | NuxtJS

by Valerio Sillari


## Info

A Roman Numerals Quiz.

The user load a page where check his knowledge of the roman numbers.

The page shows a number (a decimal number), and the user has to guess the equivalent of the roman number, filling the form with its answer.

The application check if the answer is correct.

The user has a max of 5 attempts.

After 3 mistakes the game is over.


## General

Set application with VueJS, especially with [Nuxt.js](https://github.com/nuxt/nuxt.js)

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).


## Tech Stacks

- [NuxtJS](https://nuxtjs.org/)

- [Pug Lang](https://pugjs.org/)

- [Sass Lang](https://sass-lang.com//)


## Build Setup

```
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate

# deploy on Github pages
# set branch "gh-page" on github deploy options (in settings)
$ yarn deploy
```


## Notes

I set some constant for setting the range for the random numbers to guess.

The system is set for arriving until 1000, but because is a game and should be funny for the user I set until 10.

You can change the range just changing one constant.


## TODOs

- set prettier

- set a button for restarting on gameOver and EndGame for better UX
