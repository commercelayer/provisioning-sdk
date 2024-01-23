# Commerce Layer Provisioning SDK

[![Version](https://img.shields.io/npm/v/@commercelayer/provisioning-sdk.svg)](https://npmjs.org/package/@commercelayer/provisioning-sdk)
[![Downloads/week](https://img.shields.io/npm/dw/@commercelayer/provisioning-sdk.svg)](https://npmjs.org/package/@commercelayer/provisioning-sdk)
[![License](https://img.shields.io/npm/l/@commercelayer/provisioning-sdk.svg)](https://github.com/commercelayer/commercelayer-sdk/blob/master/package.json)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Release](https://github.com/commercelayer/commercelayer-sdk/actions/workflows/semantic-release.yml/badge.svg)](https://github.com/commercelayer/commercelayer-sdk/actions/workflows/semantic-release.yml)
[![CodeQL](https://github.com/commercelayer/commercelayer-cli/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/commercelayer/commercelayer-cli/actions/workflows/codeql-analysis.yml)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript%205-%230074c1.svg)](https://www.typescriptlang.org/)

A JavaScript Library wrapper that makes it quick and easy to interact with the [Commerce Layer Provisioning API](https://docs.commercelayer.io/provisioning).

## Table of contents

- [Getting started](#getting-started)
- [Installation](#installation)
- [Authentication](#authentication)
- [Import](#import)
- [SDK usage](#sdk-usage)
- [Overriding credentials](#overriding-credentials)
- [Handling validation errors](#handling-validation-errors)
- [Contributors guide](#contributors-guide)
- [Need help?](#need-help)
- [License](#license)

---

## Getting started

To get started with Commerce Layer Provisioning SDK you need to install it, get the credentials that will allow you to perform your API calls, and import the SDK into your application's code. The sections below explain how to achieve this.

### Installation

Commerce Layer Provisioning SDK is available as an [npm](https://www.npmjs.com/package/@commercelayer/provisioning-sdk) and [yarn](https://yarnpkg.com/package/@commercelayer/provisioning-sdk) package that you can install with the command below:

```shell
npm install @commercelayer/provisioning-sdk

// or

yarn add @commercelayer/provisioning-sdk
```

### Authentication

All requests to Commerce Layer API must be authenticated with an [OAuth2](https://oauth.net/2) bearer token. Hence, before starting to use this SDK you need to get a valid access token. Kindly check [our documentation](https://docs.commercelayer.io/provisioning/authentication) for more information about the available authorization flows.

> Feel free to use [Commerce Layer Provisioning Auth](https://github.com/commercelayer/commercelayer-js-auth), a JavaScript library that helps you wrap our authentication API.

### Import

You can use the ES6 default import with the SDK like so:

```javascript
import CommerceLayerProvisioning from '@commercelayer/provisioning-sdk'

const clp = CommerceLayerProvisioning({
  accessToken: 'your-access-token'
})
```

## SDK usage

The JavaScript SDK is a wrapper around Commerce Layer Provisioning API which means you would still be making API requests but with a different syntax. For now, we don't have comprehensive SDK documentation for every single resource our API supports, hence you will need to rely on our comprehensive [Provisioning API Reference](https://docs.commercelayer.io/provisioning/v/api-reference-p) as you go about using this SDK. So for example, if you want to create a role, take a look at the [Role object](https://docs.commercelayer.io/provisioning/v/api-reference-p/role/object) or the [Create a role](https://docs.commercelayer.io/provisioning/v/api-reference-p/roles/create) documentation to see the required attributes and/or relationships. The same goes for every other supported resource.

The code snippets below show how to use the SDK when performing the standard CRUD operations provided by our REST API. Kindly check our [Provisioning API reference](https://docs.commercelayer.io/provisioning/v/api-reference-p) for the complete list of available **resources** and their **attributes**.

### Create

<details>
<summary>How to create a Role</summary>
<br />

```javascript
  // Select the organization (it's a required relationship for the SKU resource)
  const organizations = await clp.organizations.list({ filters: { name_eq: 'Test Org' } })

  const attributes = {
    name: 'Test Role',
    organization: clp.organizations.relationship(organizations.first().id), // assigns the relationship
  }

  const newRole = await clp.roles.create(attributes)
```

ℹ️ Check our API reference for more information on how to [create a Role](https://docs.commercelayer.io/provisioning/v/api-reference-p/roles/create).
</details>

### Retrieve / List

<details>
<summary>How to fetch a single organization</summary>
<br />

```javascript
  // Fetch the organization by ID
  const org = await clp.organizations.retrieve('BxAkSVqKEn')

  // Fetch all organizations and filter by name
  const orgs = await clp.organizations.list({ filters: { name_start: 'TestOrg_' } })

  // Fetch the first organization of the list
  const org = (await clp.organizations.list()).first()

  // Fetch the last organization of the list
  const org = (await clp.organizations.list()).last()
```

ℹ️ Check our API reference for more information on how to [retrieve an organization](https://docs.commercelayer.io/provisioning/v/api-reference-p/organizations/retrieve).
</details>

<details>
<summary>How to fetch a collection of organizations</summary>
<br />

```javascript
  // Fetch all the organizations
  const orgs = await clp.organizations.list()
```

When fetching a collection of resources you can leverage the `meta` attribute to get its `meta` information like so:

```javascript
  const orgs = await clp.organizations.list()
  const meta = orgs.meta
```

ℹ️ Check our API reference for more information on how to [list all SKUs](https://docs.commercelayer.io/provisioning/v/api-reference-p/organizations/list).
</details>

<details>
<summary>How to fetch a collection of organizations and sort the results</summary>
<br />

```javascript
  // Sort the results by creation date in ascending order (default)
  const orgs = await clp.organizations.list({ sort: { created_at: 'asc' } })

  // Sort the results by creation date in descending order
  const orgs = await clp.organizations.list({ sort: { created_at: 'desc' } })
  ```

ℹ️ Check our API reference for more information on how to [sort results](https://docs.commercelayer.io/provisioning/sorting-results).
</details>

<details>
<summary>How to fetch a collection of Memberships and include associations</summary>
<br />

```javascript
  // Include an association (organization)
  const mships = await clp.memberships.list({ include: [ 'organization' ] })

  // Include an association (stock role)
  const mships = await clp.memberships.list({ include: [ 'role' ] })
  ```

ℹ️ Check our API reference for more information on how to [include associations](https://docs.commercelayer.io/provisioning/including-associations).
</details>

<details>
<summary>How to fetch a collection of Permissions and return specific fields (sparse fieldsets)</summary>
<br />

```javascript
  // Request the API to return only specific fields
  const perms = await clp.permissions.list({ fields: { permissions: [ 'can_create', 'can_update' ] } })

  // Request the API to return only specific fields of the included resource
  const mships = await clp.memberships.list({ include: [ 'organization' ], fields: { organizations: [ 'name' ] } })
  ```

ℹ️ Check our API reference for more information on how to [use sparse fieldsets](https://docs.commercelayer.io/provisioning/sparse-fieldsets).
</details>

<details>
<summary>How to fetch a collection of organizations and filter data</summary>
<br />

```javascript
  // Filter all the organizations fetching only the ones whose name starts with the string "ORG"
  const orgs = await clp.organizations .list({ filters: { name_start: 'ORG' } })

  // Filter all the organizations fetching only the ones whose name ends with the string "Brand"
  const orgs = await clp.organizations.list({ filters: { name_end: 'Brand' } })

  // Filter all the organizations fetching only the ones whose name contains the string "Test"
  const orgs = await clp.organizations.list({ filters: { name_cont: 'Test' } })

  // Filter all the organizations fetching only the ones created between two specific dates
  // (filters combined according to the AND logic)
  const orgs = await clp.organizations.list({ filters: { created_at_gt: '2018-01-01', created_at_lt: '2018-01-31'} })

  // Filters all the organizations fetching only the ones created or updated after a specific date
  // (attributes combined according to the OR logic)
  const orgs = await clp.organizations.list({ filters: { updated_at_or_created_at_gt: '2019-10-10' } })

  // Filters all the Roles fetching only the ones whose name contains the string "Admin"
  // and whose organization name starts with the string "ORG"
  const roles = await clp.roles.list({ filters: { name_cont: 'Admin', organization_name_start: 'ORG'} })
  ```

ℹ️ Check our API reference for more information on how to [filter data](https://docs.commercelayer.io/provisioning/filtering-data).
</details>

<details>
<summary>How to paginate a collection of organizations</summary>
<br />

When you fetch a collection of resources, you get paginated results. You can request specific pages or items in a page like so:

```javascript
  // Fetch the organizations, setting the page number to 3 and the page size to 5
  const skorgsus = await clp.organizations.list({ pageNumber: 3, pageSize: 5 })

  // Get the total number of organizations in the collection
  const orgCount = orgs.meta.recordCount

  // Get the total number of pages
  const pageCount = orgs.meta.pageCount
```

> PS: the default page number is **1**, the default page size is **10**, and the maximum page size allowed is **25**.

ℹ️ Check our API reference for more information on how [pagination](https://docs.commercelayer.io/provisioning/pagination) works.
</details>

<details>
<summary>How to iterate through a collection of Organizations</summary>
<br />

To execute a function for every item of a collection, use the `map()` method like so:

```javascript
  // Fetch the whole list of organizations (1st page) and print their ids and names to console
  const orgs = await clp.organizations.list()
  orgs.map(o => console.log('ID: ' + o.id + ' - Name: ' + o.name))
```

</details>

<!-- <details>
<summary>How to build complex queries</summary>
<br />

Coming soon...
</details> -->

<details>
<summary>How to fetch resource relationships</summary>
<br />

Many resources have relationships with other resources and instead of including these associations as seen above, you can fetch them directly. This way, in the case of 1-to-N relationships, you can filter or sort the resulting collection as standard resources.

```javascript
// Fetch 1-to-1 related resource: billing address of an order
const org = clp.memberships.organization('xYZkjABcde')

// Fetch 1-to-N related resources: orders associated to a customer
const perms = clp.roles.permissions('XyzKjAbCDe', { fields: ['can_create', 'can_update'] })
```

In general:

- An API endpoint like `/api/organizations` or `/api/organization/<organizationId>` translates to `clp.organizations` or `clp.organizations('<organizationId>')` with the SDK.
- 1-to-1 relationship API endpoints like `/api/roles/<roleId>/organization` translates to `clp.roles('<roleId>', { include: ['organization'] }}` with the SDK.
- 1-to-N relationship API endpoints like  `/api/roles/<roleId>?include=versions` or `/api/roles/<roleId>/permissions` translates to `clp.roles.retrieve('<roleId>', { include: ['versions'] })` or `clp.roles.permissions('<roleId>')` with the SDK.

ℹ️ Check our API reference for more information on how to [fetch relationships](https://docs.commercelayer.io/provisioning/fetching-relationships).
</details>

<details>
<summary>How to count resources</summary>
<br />

Many times you simply need to count how many resources exist with
certain characteristics. You can then call the special `count`
function passing a filter to get as result the total number of
resources.

```javascript
// Get the total number of sales_channel credentials
const credentials = clp.api_credentials.count({ filters: { kind_eq: 'sales_channel' } })

```

</details>

### Update

<details>
<summary>How to update an existing organization</summary>
<br />

```javascript
  const org = {
    id: 'xYZkjABcde',
    reference: '<new-reference>',
    reference_origin: '<new-reference-origin>'
  }

  clp.organizations.update(org) // updates the SKU on the server
```

ℹ️ Check our API reference for more information on how to [update an organization](https://docs.commercelayer.io/provisioning/v/api-reference-p/organizations/update).
</details>

### Delete

<details>
<summary>How to delete an existing membership</summary>
<br />

```javascript
  clp.memberships.delete('xYZkjABcde') // persisted deletion
```

ℹ️ Check our API reference for more information on how to [delete a membership](https://docs.commercelayer.io/provisioning/v/api-reference-p/memberships/delete).
</details>

## Overriding credentials

If needed, Commerce Layer Provisioning SDK lets you change the client configuration and set it at a request level. To do that, just use the `config()` method or pass the `options` parameter and authenticate the API call with the desired credentials:

```javascript
  // Permanently change configuration at client level
  clp.config({ accessToken: 'your-access-token' })
  const roles = await clp.roles.list()

  or

  // Use configuration at request level
  clp.roles.list({}, { accessToken: 'your-access-token' })
```

## Handling validation errors

Commerce Layer Provisioning API returns specific errors (with extra information) on each attribute of a single resource. You can inspect them to properly handle validation errors (if any). To do that, use the `errors` attribute of the catched error:

```javascript
  // Log error messages to console:
  const attributes = { name: '' }

  const newRole = await clp.roles.create(attributes).catch(error => console.log(error.errors))

  // Logged errors
  /*
  [
    {
      title: "can't be blank",
      detail: "name - can't be blank",
      code: 'VALIDATION_ERROR',
      source: { pointer: '/data/attributes/name' },
      status: '422',
      meta: { error: 'blank' }
    },
    {
      title: "can't be blank",
      detail: "organization - can't be blank",
      code: 'VALIDATION_ERROR',
      source: { pointer: '/data/relationships/organization' },
      status: '422',
      meta: { error: 'blank' }
    }
  ]
  */

```

ℹ️ Check our API reference for more information about the [errors](https://docs.commercelayer.io/provisioning/handling-errors) returned by the API.

## Contributors guide

1. Fork [this repository](https://github.com/commercelayer/provisioning-sdk) (learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

    ```shell
    git clone https://github.com/<your username>/provisioning-sdk.git && cd provisioning-sdk
    ```

3. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

4. Someone will attend to your pull request and provide some feedback.

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/provisioning-sdk/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.
