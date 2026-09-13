# Neuaurelius Publications / Sanity setup

The frontend now has two content surfaces:

- `/` shows up to 3 publications where `featured == true`, newest first.
- `/blogs` shows every published publication, newest first.
- `/blogs/[slug]` renders the full Sanity Portable Text article.
- `/blogs/[slug]/opengraph-image` generates a 1200x630 OG image from the article title using Next.js `ImageResponse`.

## Environment

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Sanity schema

The publication schema is in `sanity/schemaTypes/publication.js`.
Add that schema to your existing Sanity Studio's schema registry.

Each publication has:

- title
- slug
- excerpt
- coverImage
- category
- publishedAt
- author
- featured
- body

Set **Show on Homepage** to `true` for the publications you want in the homepage Featured Publications section. The homepage takes the newest three featured entries.

## Install

Run:

```bash
npm install
npm run dev
```

The project intentionally keeps the Sanity Studio schema in this repository but does not embed the Studio itself. This keeps the existing frontend architecture intact and lets the Studio remain your editorial backend.

## Publication placement

- Set `featured` / **Show on Homepage** to true for publications that should appear in the homepage `PUBLICATIONS` section.
- The homepage displays the newest featured publications.
- `/blogs` is the full blog archive and displays all published publications.
- `/blogs/[slug]` is the expanded article view.
- `/blogs/[slug]/opengraph-image` provides the branded dynamic social preview used for sharing.
