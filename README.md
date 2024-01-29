# HashiCorp Web Presence Engineering Challenge

### Getting started

Run `npm install` then `npm start`, and visit `http://localhost:3000` for instructions.

### Introduction

Hi! Thanks so much for interviewing with us 💖. If you are reading this, it means that we like you, and I hope you like us too! In this next step, you get an opportunity to see how we work, and we get the same opportunity for you. Let's get right to it.

The task is to build a "people directory" page. This page should allow visitors to search by name for a person. If this were a real page, we'd want to search all 317 records in our CMS, but for the purposes of this exercise, limit your results to 100. This is the maximum number of results that our CMS API will return in a single page.

Use [this Figma file](https://www.figma.com/file/xGicP4qkXbMhte4LAYxC4X/Untitled?node-id=0%3A1) as your source of truth for design and behavior:

_**Note:** If you are unable to inspect elements in the design to get exact values for colors and font styles, make sure you're signed in with a Figma account, as we will expect your submission to match the design as closely as possible._

There are definitely some parts of this that are a little ambiguous, which is how real world projects always work. Treat this the same way you would if you started working with us and this was your first day — this is quite similar to the type of task we would assign a new hire on their first day. We will set up a Discord channel for you to ask questions, get clarification, and collaborate with us in general, and we strongly encourage you to take advantage of this.

We expect this to be done within a day or two's worth of full-time work - about 8 - 14 hours. We know that you likely have other commitments, and so we generally look at about week for candidates to complete the challenge. If you're approaching 14 hours of total time spent, just stop where you are and we'll complete the evaluation based on what you have done.

### Using the Discord channel

You will have been added to a private discord channel with a few members of our team. The purpose of this channel is to give a space for us to collaborate together, again, to simulate us working together. Use the channel to ask questions, get clarity on anything ambiguous and share your approach to the work. Asking questions and being active in the channel are positive things, not negative. We don't expect you to have all the answers! There aren't any tricks in this challenge, but just like in real work, there are areas of ambiguity. So if you're completing the challenge without any questions, you should reconsider your assumptions and collaborate with the team to ensure the best possible outcome.

### Fetching Data

This project uses [Next.js](https://nextjs.org), a react-based framework that generates performant websites that blur the lines between static and dynamic rendering. We have a set of internal tools under the banner of `@hashicorp/platform-*` layered into the config that provides several utilities, and is especially helpful for loading remote data.

The data for this project can be fetched from our CMS, [DatoCMS](https://www.datocms.com/), `@hashicorp/platform-cms` exports a function that allows you to easily fetch the data. An example might look something like this:

```jsx
// this is called rivet because it wraps a library called "rivet-graphql"
import rivetQuery from '@hashicorp/platform-cms'
// @hashicorp/platform-nextjs-plugin configures ".graphql" files to be imported as plain text
import query from './query.graphql'

rivetQuery({ query }).then(console.log)
```

Next.js [conventions](https://nextjs.org/learn/basics/fetching-data-for-pages) dictate that an async function called `getStaticProps` can be exported along with any component within the `pages` directory. This function will be executed before the component mounts, passing the returned object into the component as props. So, within this project, your initial data fetch might look something like this:

```js
import rivetQuery from '@hashicorp/platform-cms'
import query from './query.graphql'

export default function SomePage({ data }) {
	return <p>{JSON.stringify(data)}</p>
}

export async function getStaticProps() {
	const data = await rivetQuery({ query })
	return { props: { data } }
}
```

You'll see a similar template provided in the `pages/people` folder, which is working out of the box.

Our CMS, [DatoCMS](https://www.datocms.com/), exposes a public GraphQL API to our data which [you can explore here using GraphiQL](https://cda-explorer.datocms.com/?apitoken=dc45ff8c8b27dd22a7c24aaaf8aa75&query=query%20%7B%0A%20%20allDepartments%28first%3A%20100%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20parent%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%0A%20%20allPeople%28first%3A%20100%29%20%7B%0A%20%20%20%20name%0A%20%20%20%20avatar%20%7B%0A%20%20%20%20%20%20url%0A%20%20%20%20%7D%0A%20%20%20%20department%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D). We loaded up the same query as you have in the `people` folder by default. Use this interface to explore our schema and put together a query that fetches the data you need for the page.

### Building The Page

Once you have the data, the next step is to build out the page! We expect the markup to be clear and semantic, and the styling to be clear, well-structured, and good-looking (we use [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)). Do your best to visually match the styling in the Figma design. Feel free to build out components as part of the page to reduce repetition and break out reasonable chunks of code. The `components` folder can be a home to them.

Matching person results should update in real-time while typing. Checking the "Hide people missing a profile image" should filter out results that don't have an image. Use the placeholder image from the Figma file for those without an image.

If no results match the search, show the "No results found" result.

In addition, you'll see that each `person` has a `department` - the designs show a nested sidebar of department names, which can be toggled open and closed to show the department tree. Selecting a department name shows an active state in the sidebar and filters the `people` results to only that department.

Because department structures can change (as the business grows and evolves), it's required that this directory support an _arbitrarily deep tree of departments_. Please implement it in a way that would not require code changes if the way departments are organized were to change.

You may have also discovered that we have a library of components under the `@hashicorp` scope on npm. We do not want or expect you to use these components, and attempting to do so will only slow you down in this instance, as they are built for a different situation. You should build all the components you need for this page on your own, within this project. In general, we don't expect you to use external packages, but do welcome discussions on where an external package might be a better fit.

All images on the page can be retrieved from the CMS via URLs from the graphql query. We expect the page to be styled responsively so it looks great on both mobile and desktop.

### Submitting Your Work

Please **do not submit a pull request to, or open any issues in this repo**. This is a template repository only. All your work should be done on your copy of the repo only. To begin your challenge:

- Create a new private repository using this one as a template. This can be done in two ways:
  - Clicking the "Use this template" button on the GitHub home page
  - Visiting the generate page: [mktg-webdev-challenge/generate](https://github.com/hashicorp/mktg-webdev-challenge/generate)
- In your new repository, go to Settings > Collaborators
- Add the following usernames as collaborators: `mwickett`, `dstaley`, `kaitlynnefuery`, `zchsh`, and `rubensandwich`.

To submit your work, create a branch within your copy of the repo, and make a pull request against your copy of the repo's `main` branch. We encourage posting work-in-progress pull requests early on this team, but you are welcome to put up your PR whenever you feel comfortable. When you feel the work is complete and ready for review, let us know in the Discord channel and/or tag us as reviewers. You will be evaluated on the quality and attention to detail that you give the pull request in all aspects, so please take your time and be thorough before requesting a review.

We'll review your PR and leave comments and questions. You're not expected to write any additional code after review, but we'd love to see you reply to review questions to share your thinking.
