import { groq } from 'next-sanity'

export const postCardFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  stage,
  format,
  coverImage,
  "primaryTheme": primaryTheme->{
    title,
    "slug": slug.current
  },
  "interests": interests[]->{
    title,
    "slug": slug.current
  },
  "authors": authors[]->{
    name,
    "slug": slug.current,
    role,
    image
  }
`

export const postsIndexQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
    | order(publishedAt desc) {
      ${postCardFields}
    }
`

export const latestPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
    | order(publishedAt desc) [0...$limit] {
      ${postCardFields}
    }
`

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]{
    _updatedAt,
    "slug": slug.current
  }
`

export const themeSlugsQuery = groq`
  *[_type == "theme" && defined(slug.current)]{
    _updatedAt,
    "slug": slug.current
  }
`

export const interestSlugsQuery = groq`
  *[_type == "interest" && defined(slug.current)]{
    _updatedAt,
    "slug": slug.current
  }
`

export const seriesSlugsQuery = groq`
  *[_type == "series" && defined(slug.current)]{
    _updatedAt,
    "slug": slug.current
  }
`

export const authorSlugsQuery = groq`
  *[_type == "author" && defined(slug.current)]{
    _updatedAt,
    "slug": slug.current
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    stage,
    format,
    coverImage,
    body,
    nextStep,
    seo,
    "primaryThemeId": primaryTheme._ref,
    "interestIds": interests[]._ref,
    "primaryTheme": primaryTheme->{
      title,
      "slug": slug.current,
      description
    },
    "themes": themes[]->{
      title,
      "slug": slug.current
    },
    "interests": interests[]->{
      title,
      "slug": slug.current
    },
    "authors": authors[]->{
      name,
      "slug": slug.current,
      role,
      image,
      bio,
      links
    },
    "series": *[_type == "series" && references(^._id)] | order(_createdAt desc) {
      title,
      "slug": slug.current
    }
  }
`

export const themesQuery = groq`
  *[_type == "theme" && defined(slug.current)] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`

export const interestsQuery = groq`
  *[_type == "interest" && defined(slug.current)] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`

export const themeBySlugQuery = groq`
  *[_type == "theme" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description
  }
`

export const interestBySlugQuery = groq`
  *[_type == "interest" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description
  }
`

export const postsByThemeQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && (primaryTheme->slug.current == $slug || $slug in themes[]->slug.current)]
    | order(publishedAt desc) {
      ${postCardFields}
    }
`

export const postsByInterestQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && $slug in interests[]->slug.current]
    | order(publishedAt desc) {
      ${postCardFields}
    }
`

export const postsByStageQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && stage == $stage]
    | order(publishedAt desc) {
      ${postCardFields}
    }
`

export const postsByPersonaQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && $persona in personas[]]
    | order(publishedAt desc) {
      ${postCardFields}
    }
`

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    role,
    image,
    bio,
    links
  }
`

export const postsByAuthorQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now() && $slug in authors[]->slug.current]
    | order(publishedAt desc) {
      ${postCardFields}
    }
`

export const seriesBySlugQuery = groq`
  *[_type == "series" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    heroImage,
    "posts": posts[]->{
      ${postCardFields}
    }
  }
`

export const relatedPostsQuery = groq`
  *[
    _type == "post"
    && defined(slug.current)
    && publishedAt <= now()
    && _id != $id
    && (
      primaryTheme._ref == $primaryThemeId
      || count(interests[]._ref[@ in $interestIds]) > 0
    )
  ]
  | order(publishedAt desc) [0...6]{
    ${postCardFields}
  }
`
