# README

For this project, beyond the base functionality requested in the prompt, `functional and adaptable to different types of conditions. To this end, in addition to the base functionality that was asked for,` I chose to add a loading state while data fetching occurs, as well as a way to persist likes in the case of a page refresh or navigation. I tried to be mindful of the states the app could be in as a result of failed api requests as well.

I created a `Next.js` project using`create-next-app` to quickly stand up a React application, as well as for ease of deployment, and for styling used `sass` and `font-awesome` for some icons and basic animations. State management is handled by basic React hooks, with a custom hook for saving to `localStorage`.

## General Approach Starting Out

### API Testing

To determine the type of response that would be received in case of an error, I misspelled the `api_key` portion of the url. If it's safe to assume that responses have a consistent shape, and that errors will not be given a 200 status code, it is probably ok to check `response.ok` after fetching to determine if the response was successful, or if it errored.

Example failed response below:

```json
{
  "error": {
    "code": "API_KEY_MISSING",
    "message": "No api_key was supplied. Get one at https://api.nasa.gov:443"
  }
}
```

I also tested api calls using invalid dates, as well as invalid query params and verified that non-200 responses were being returned for errors.

After testing the `APOD` api out some more, I also saw that a third value for the `media_type` field could be returned - `other`. This data (from what I was able to test) did not have an associated `url` or `hdurl`, so in these cases I render a placeholder image. The fact that the url, which I assumed would be unique for each data item returned, could be missing from the response also guided my decision to use the `date` as a unique key when implementing saved likes.

An example of one such response is: `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2012-05-23`


You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Error Testing

To determine the type of response that would be received in case of an error, I misspelled the `api_key` portion of the url. If it's safe to assume that responses have a consistent shape, and that errors will not be given a 200 status code, it is probably ok to check `response.ok` to determine if the response was successful, or if it errored.

Example failed response below:

```json
{
  "error": {
    "code": "API_KEY_MISSING",
    "message": "No api_key was supplied. Get one at https://api.nasa.gov:443"
  }
}
```
