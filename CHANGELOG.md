# Changelog

# 1.0.0 - 2022-11-14

__Features:__

* Simplify API route structure. Condense more into the main `fetchWrapper()` function.
# 0.8.8 - 2022-10-06
* Fix: remove filtering of data before batch processing. Assumed to be in record
format.

# 0.8.6 - 2022-10-04
* Patch fix: only exclude records without 'id' for batch creation.

# 0.8.5 - 2022-08-30
* Patch fix: still include check for if `record === undefined`

# 0.8.4 - 2022-08-30
* Patch fix: filter out record updates by `record.id`, not just `record`

# 0.8.3 - 2022-08-30
* Remove blank query params from requests

# 0.8.2 - 2022-08-29
* Modify D2L content routes to use data from payload object.

# 0.8.1 - 2022-06-07
* Update helper imports.

# 0.8.0 - 2022-06-02
* Include helper functions used in multiple blocks
* Simplify 'Base' routes to a single `makeRequest` method

# 0.7.1 - 2022-05-25
* Update default template constants
* Move more Brightspace constants to this package

# 0.7.0 - 2022-05-19
* Add `createCourseTemplate` route
* Add generic `makeRequest` route
* Move `models` out of package into Airtable Manager block
  * Removes airtable depencency which allows this package to be used in a
  server setting.

# 0.6.7 - 2022-01-25
* Add offset parameter in `importCourse` API

# 0.6.6 - 2022-01-24
* Update packages
* Update GitHub workflow for new Node version
* Add LMS constants to reduce duplicate code

# 0.6.5 - 2021-06-14
* Add new `createDiscussionTopic` method to support more content types
* Fix: v0.6.1-0.6.4 included minor bug fixes for Model names, colors, and more

# 0.6.0 - 2021-05-27
* Update Airtable models to reflect changes to Workplan

# 0.5.2 - 2021-05-17
* Add POST support for creating individual D2L content objects
* Separate POST support for `/generate` routes to support individual pages
  and an entire course payload.

# 0.5.1 - 2021-03-24
* Add initial support for JSON errors during fetch requests.
* Update Dictionary model with new fields/modified formulas
* Add user-related API endpoints for D2L functions.
  * Fetch/create user
  * Create/delete user enrollment
  * Update user password

# 0.5.0 - 2021-03-01
* Expand `fetchWrapper` to support different Content-Type headers
  * Previously assumed response was always JSON; now accepts text and buffers

# 0.4.3 - 2021-02-23
* Fix query param bug that adds an extra '?' to the endpoint even when no query
params are given.

# 0.4.2 - 2021-02-22
* Fix pointers to Airtable base IDs; store in proper class.
* Add initial D2L route for fetching linked topic file.

# 0.4.1 - 2021-02-11
* Add route to create a course copy job
* Add route to check copy job status

# 0.4.0 - 2021-02-08
* Restructure API to call separate routers (d2l, runtime, generate, base)
* Initial expansion of query param support for all requests

# 0.3.2 - 2021-02-01
* Add GET /d2l/orgstructure route support

# 0.3.0 - 2021-01-21
* Add Airtable models that define base schema.
* Restructure file organization

# 0.2.0 - 2020-12-01
* Add changelog.
* Add endpoint to fetch video runtimes.

# 0.1.0 - 2020-11-26
* Initial release
* Set up package.json for publishing pacakge to npm.
* Copy over example endpoints for fetchWrapper class that frontend can
  import/call in React.
* Add README to explain development and initial commit state.
