/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        deliveryClientConfig: {
          projectId: `29bcad08-6beb-0038-21d9-da1fa09b5f34`,
        },
        languageCodenames: [
          `en`,
          `de`,
        ]
      }
    }
  ]
}
