module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Roman Numbers Quiz | by Valerio Sillari",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      // added bootstrap as default styles boilerplate just for prototyping.
      {
        rel: "stylesheet",
        href:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        integrity:
          "sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh",
        crossorigin: "anonymous"
      }
    ]
  },

  /*
   ** Plugins
   */
  plugins: ["~/plugins/vue-js-modal"],

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#3B8070"
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      config.module.rules.forEach(rule => {
        // add to ALL vue modules the sass file 'global'
        if (rule.test.toString() === "/\\.vue$/") {
          rule.options.loaders.sass[2].options.data =
            '@import "./assets/stylesheets/global"';
        }
      });

      if (isDev && process.client) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },

  router: {
    base: '/roman-quiz-nuxt/'
  },

};
