# Schema definition issues with solution

## Issues

* Mainly https://github.com/Kentico/gatsby-source-kontent/issues/106
* Might fix https://github.com/Kentico/gatsby-source-kontent/issues/107 as well

## Solution

Queries with complicated filter:

```gql
  query BeltIdentifierTypeQuery(
    $url_slug: String!
    $language: String!
  ) {
    pitches: allKontentItemBeltPitch(
      filter: {
        usedByContentItems: {
          elemMatch: {
            system: { type: { eq: "belt_series" } }
            elements: {
              belt_type: {
                linked_items: {
                  elemMatch: {
                    elements: { url_slug: { value: { eq: $url_slug } } }
                  }
                }
              }
            }
          }
        }
      }
      ...
```

Could be extracted to `isUsedInBeltSeries` and `beltTypeUrlSlug` fields precalculated in [gatsby-node.js](gatsby-node.js) and then use in the filter: 

### Example

```gql
query getPitchesInBeltSeriesByUrlSlug($url_slug: String!) {
  allKontentItemBeltPitch(filter: {fields: {beltTypeUrlSlug: {eq: $url_slug}, isUsedInBeltSeries: {eq: true}}}) {
    nodes {
      internal {
        type
      }
      system {
        name
        codename
      }
      ...
    }
  }
}
```

i.e. with query variables:

```json
{
  "url_slug": "belt-type-1"
}
```

## How to run

```sh
git clone --recurse-submodules github.com/Simply007/schema-definition-changes
# this automatically clones the plugin sub module to /plugins/@kentico/gatsby-source-kontent
cd schema-definition-changes
cd plugins/@kentico/gatsby-source-kontent
# (optional) checkout proper version
# git checkout tags/4.3.0
npm install
npm run build
cd ../../..
npm install
npm run develop
```

## How to connect to own project

1. Perform steps from [How to run](#how-to-run) (except of the `gatsby develop`)
1. [Register on Kentico Kontent](http://app.kontent.ai)
1. [Create an empty project](https://docs.kontent.ai/tutorials/set-up-projects/manage-projects/creating-and-archiving-projects)
1. [Enable Content Management API](https://docs.kontent.ai/tutorials/set-up-projects/migrate-content/importing-to-kentico-kontent#a-enabling-the-api-for-your-project)
1. Import [content.zip](/content.zip) data using [Template manager](https://kentico.github.io/kontent-template-manager/import-from-file)
    * Use `Project Id` and `Content Management API key` from previously generated project.
1. Place the `ProjectId` to the  [`/gatsby-config.js`](/gatsby-config.js#L13) configuration file.
1. run `npm run develop`
