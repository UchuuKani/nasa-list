# README

For this project, beyond the base functionality requested in the prompt, I chose to add a loading state while data fetching occurs, as well as a way to persist likes in the case of a page refresh or navigation. I tried to be mindful of the states the app could be in as a result of failed api requests as well.

I created a `Next.js` project using `create-next-app` to quickly stand up a React application, as well as for ease of deployment, and for styling used `sass` and `font-awesome` for some icons and basic animations. State management is handled by basic React hooks, with a custom hook for saving to `localStorage`.

---

## Features

The user may:

- Load ten random images
- Like images
- View liked images (saved to `localStorage`)
- Refetch images in case of api failure

---

## API Testing

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

- An example of one such response is: `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2012-05-23`

There are also responses with a `media_type` of `video` where the url points to an html file, and with these I encountered CORS errors while trying to render them. These types of responses are not handled.

- An example of this response is: `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2018-03-05`, which has a `url` of `https://apod.nasa.gov/apod/image/1803/AstroSoM/hudf.html`

---

## Saving Likes

Every time an image is liked, I store the `date` attribute in an array in `localStorage` to be fetched at a later time. When fetching likes, a request for each date is made in parallel with others, and any data that fails to fetch is listed out. In order to view likes (as otherwise random images are fetched on the main page), I added a `/likes` page that can be visited for ease of testing the `localStorage` functionality. While on this page, I decided against removing the image from list being displayed in case the user changes their mind (mainly because I did not implement a way to find a specific image on the main page).

The two main decisions I had in mind here were: 1.) the data that gets saved in `localStorage` and 2.) the data structure the data is stored in. Regarding the former, I chose to only save the date, rather than the entire response in order to have the most up to date url whenever fetching occurs - I don't know how often the url might update, or other data such as copyright info or the explanation.

A more scalable approach might be to save the whole response in `localStorage` to avoid unneeded api calls, along with some timestamp indicating when the data was last fetched, and then periodically re-fetching the data whenever the data is deemed to be "stale" (maybe after a month? Two months?).

---

## Adding a Loading State

The other extra feature I added was a loading state so that an animation could play while data is being fetched from the api using an `isLoading` boolean state variable. Whenever data fetching occurs, the app is in a loading state during which a spinner is displayed, and after which it can either enter a success (data returned by api) state, or error state (api call errored out in `/` page). On the `Likes` page, the loading state still exists, but since all api calls are separate some may succeed and some may fail leading to a more ambiguous state than just success or failure.

---

## Accessibility

When applicable, I tried to use semantic html elements rather than a generic container like a `div`. Other accessibility measures include adding alt text to images when appropriate, adding an `aria-label` to icon buttons, and checking for acceptable color contrast using the [Wave Evaluation Tool](https://wave.webaim.org/)

---

## Running the Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
