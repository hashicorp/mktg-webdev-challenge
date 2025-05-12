# HashiCorp Web Presence Engineering Challenge

### Getting started

Run `npm install` then `npm start`, and visit `http://localhost:3000` for instructions.

### Introduction

Hi! Thanks so much for interviewing with us 💖. If you are reading this, it means that we like you, and we hope you like us too! In this next step, you get an opportunity to see how we work, and we get the same opportunity for you. Let's get right to it.

The task is to build a "people directory" page. This page should allow visitors to search by name for a person. If this were a real page, we'd want to search all 317 records in our CMS, but for the purposes of this exercise, limit your results to 100. This is the maximum number of results that our CMS API will return in a single page.

[Here's the "people directory" page! 👉](/people)

_**Note:** The above link will only work when opened inside the project running locally._

Use [this Figma file](https://www.figma.com/design/0c70HmKc0rkWCNdP9UYErO) as your source of truth for design and behavior:

_**Note:** If you are unable to inspect elements in the design to get exact values for colors and font styles, make sure you're signed in with a Figma account, as we will expect your submission to match the design as closely as possible._

There are definitely some parts of this that are a little ambiguous, which is how real world projects always work. Treat this the same way you would if you started working with us and this was your first day — this is quite similar to the type of task we would assign a new hire on their first day. We will set up a Discord channel for you to ask questions, get clarification, and collaborate with us in general, and we strongly encourage you to take advantage of this.

We expect this to be done within 4-6 hours. We know that you likely have other commitments, and so we generally look at about 3-4 business days for candidates to complete the challenge. If you're approaching 6 hours of total time spent, just stop where you are, and we'll complete the evaluation based on what you have done.

### Using the Discord channel

You will have been added to a private discord channel with a few members of our team. The purpose of this channel is to give a space for us to collaborate together, again, to simulate us working together. Use the channel to ask questions, get clarity on anything ambiguous and share your approach to the work. Asking questions and being active in the channel are positive things, not negative. We don't expect you to have all the answers! There aren't any tricks in this challenge, but just like in real work, there are areas of ambiguity. So if you're completing the challenge without any questions, you should reconsider your assumptions and collaborate with the team to ensure the best possible outcome.

### Fetching Data

This project uses [Next.js](https://nextjs.org), a react-based framework that generates performant websites that blur the lines between static and dynamic rendering. We have a set of internal tools under the banner of `@hashicorp/platform-*` layered into the config that provides several utilities, and is especially helpful for loading remote data.

Next.js [conventions](https://nextjs.org/learn/basics/fetching-data-for-pages) dictate that an async function called `getStaticProps` can be exported along with any component within the `pages` directory. This function will be executed before the component mounts, passing the returned object into the component as props.

We will provide you with a `DATO_API_TOKEN` to add to your `.env` file. For Sr. candidates, you will need to add it in `createDB.ts` in order to load data from a DatoCMS.

The cda-explorer.datocms.com tool referenced below should have `<ADD_DATO_API_TOKEN_HERE>` replaced with the `DATO_API_TOKEN` value for it to work.

Our CMS, [DatoCMS](https://www.datocms.com/), exposes a public GraphQL API to our data which you can explore [here](https://cda-explorer.datocms.com/?apitoken=<ADD_DATO_API_TOKEN_HERE>&query=query%20%7B%0A%20%20allDepartments%28first%3A%20100%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20parent%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%0A%20%20allPeople%28first%3A%20100%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20avatar%20%7B%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%20%20department%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) using GraphiQL. We loaded up the same query as you have in the `people` folder by default. Use this interface to explore our schema and put together a query that fetches the data you need for the page.

### Building The Page

Once you have the data, the next step is to build out the page! We expect the markup to be clear and semantic, and the styling to be clear, well-structured, and good-looking (we use [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)). Do your best to visually match the styling in the Figma design. Feel free to build out components as part of the page to reduce repetition and break out reasonable chunks of code. The `components` folder can be a home to them.

Matching person results should update in real-time while typing. Clicking the "Hide people missing a profile image" should filter out results that don't have an image.

If no results match the search, show the "No results found" result.

In addition, you'll see that each `person` has a `department` - the designs show a nested sidebar of department names, which can be toggled open and closed to show the department tree. Selecting a department name shows an active state in the sidebar and filters the `people` results to only that department.

Department structures can change as the business grows and evolves. It's required that this directory supports an arbitrary depth of departments. Please implement it in a way that would not require code changes if the department structure were to change.

### Submitting Your Work

Please **do not submit a pull request to, or open any issues in this repo**. This is a template repository only. All your work should be done on your copy of the repo only. To begin your challenge:

- Create a new private repository using this one as a template. This can be done in two ways:
  - Clicking the "Use this template" button on the GitHub home page
  - Visiting the generate page: [mktg-webdev-challenge/generate](https://github.com/hashicorp/mktg-webdev-challenge/generate)
- In your new repository, go to Settings > Collaborators
- Add the following usernames as collaborators: `kaitlynnefuery`, `rubensandwich`, `mikegolus`, `EnMod`, and `gstewart-hashi`

To submit your work, create a branch within your copy of the repo, and make a pull request against your copy of the repo's `main` branch. We encourage posting work-in-progress pull requests on this team to get feedback early on in the project, but you are welcome to put up your PR whenever you feel comfortable. When you feel the work is complete and ready for review, let us know in the Discord channel and/or tag us as reviewers. You will be evaluated on the quality and attention to detail that you give the pull request in all aspects, so please take your time and be thorough before requesting a review. Regardless of whether or not you complete all the tasks within the allotted time, please include information about the trade-offs you made, and any areas for improvement. The code in your PR(s) should be the same quality as any code you would deploy to production.

Use of AI will not be penalized. If you choose to use AI for this project, please include comments about the relevant code as well as your reasoning in your PR. For example, you could write a brief description in the PR comment and/or leave comments on the code generated or modified by AI.

We'll review your PR and leave comments and questions. You're not expected to write any additional code after review, but we'd love to see you reply to review questions to share your thinking. We will review your final submission within 3-4 business days.

## Acceptance Criteria / TL;DR:

- [ ] The department tree creation function does not work. You will need to troubleshoot and fix it for the filtering to work as expected.
- [ ] You should build all the components you need for this project on your own, within this project. While you should not use external packages, we do welcome discussions on where an external package might be a better fit.
- [ ] A simple [Profile component](components/profile/index.tsx) for the people cards has already been created. You may modify this and any other components as needed.
  - [ ] All images on the page can be retrieved from the CMS via URLs from the graphql query.
- [ ] We expect the page to be styled responsively so it looks great on both mobile and desktop.
- [ ] Matching person results should update in real-time while typing.
- [ ] Clicking the "Hide people missing a profile image" should filter users without an image.
- [ ] If no results match the search, show "No results found" UI from the Figma design
- [ ] Selecting a department in the sidebar should filter the results to only that department.
- [ ] Match [Figma designs](https://www.figma.com/design/0c70HmKc0rkWCNdP9UYErO) using modern CSS
- [ ] For Web Engineer I and Web Engineer II candidates: Limit search results to 100 people
- [ ] Include information in your PR about any use of AI

### Additional Requirements for Senior Web Engineer Candidates

For Senior Web Engineer candidates, we have a few additional requirements that are designed to allow you to demonstrate your full-stack knowledge.

- [ ] Filtering should be performed via a [Next.js API route](https://nextjs.org/docs/pages/building-your-application/routing/api-routes). This API route should accept parameters for name, avatar, and department, and return the matching search results. The initial page load can rely on data from `getStaticProps`, but all subsequent filtering should invoke the API route.

- [ ] The [hashicorp API route](pages/api/hashicorp.ts) should query a SQLite database containing a copy of the data from our GraphQL endpoint stored in tabular format. Please refrain from using an object relational mapper (ORM); we want to see that you understand how to write SQL queries. We provided you with the start of a script to create that DB in [createDB.ts](scripts/createDB.ts).

- [ ] Filtering state should be persisted to the URL via [`useRouter`](https://nextjs.org/docs/pages/api-reference/functions/use-router). Please ensure that refreshing the page results in the same search results.

![excited bun](https://media.giphy.com/media/cMnt7i2RykmpW/giphy.gif)
