# UGC portfolio

One-page portfolio for Anisong (@songnotfoundd), Creative Strategist & UGC Creator.
Built with Vite and React. ASCII koi in the background come from
[ascii-animals](https://github.com/DesignerStephen1/ascii-animals) (MIT), vendored in `src/ascii-animals`.

## Editing content

Everything the page says lives in `src/content.ts`: the hero copy, the video grid, services,
process steps, testimonials, brand logos and contact details. Anything in `[BRACKETS]` is a placeholder.

To add a video, put the `.mp4` and a cover image in `public/media/`, then set that entry's
`video` and `poster` paths in `src/content.ts`.

## Running it

```sh
npm install
npm run dev      # local development
npm run build    # production build into dist/
npm run preview  # serve the production build
```
