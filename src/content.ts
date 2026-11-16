// ─────────────────────────────────────────────────────────────────────────────
// Everything the page says lives in this file. Edit here, never in the layout.
// Anything in [BRACKETS] is a placeholder you still need to personalise.
// ─────────────────────────────────────────────────────────────────────────────

export const creator = {
  name: 'Anisong',
  handle: 'songnotfoundd',
  title: 'Creative Strategist & UGC Creator',
  location: 'Chicago, IL',
  email: 'anisongchan@gmail.com',
  instagram: 'https://www.instagram.com/songnotfoundd/',
}

export const hero = {
  headline: 'I help tech & lifestyle brands sell with short-form content that stops the scroll.',
  // Keep this to two or three short lines. This is the whole "about me".
  lines: [
    'I’m Anisong. I look at what your content is missing, then I film it.',
    'Short vertical video, hook first, made to move product. Tech and lifestyle mostly, open to other categories.',
  ],
  primary: 'See my work',
  secondary: 'Let’s chat',
}

// ── Portfolio ────────────────────────────────────────────────────────────────
// One entry per video. Aim for your 8 to 12 best. The grid is built around 9.
// To add a video, copy an entry. To remove one, delete it. Order here = order on the page.
//
//   video   path to an .mp4 in public/media. It plays on hover or tap. Leave '' if you have none yet.
//   poster  still image shown before the video plays.
//   link    live post to open instead. Only used when there is no video file.
//   metric  optional result line, e.g. '41k views in 7 days'. Leave '' to hide it.
//   spec    true = unpaid concept piece. It gets a "spec" tag. Keep this honest.
//
// An entry with no video, no poster and no link shows as an empty "coming soon" slot.
// Set showEmptySlots to false to hide those slots before you send the link to brands.

export const showEmptySlots = true

export type Video = {
  product: string
  brand: string
  format: string
  platform: string
  why: string
  metric: string
  spec: boolean
  video: string
  poster: string
  posterAlt: string
  link: string
}

const emptySlot: Video = {
  product: '[Product]',
  brand: '[Brand]',
  format: '[Format]',
  platform: '[Platform]',
  why: '[Why it works: the hook or the production choice you made.]',
  metric: '',
  spec: true,
  video: '',
  poster: '',
  posterAlt: '',
  link: '',
}

export const videos: Video[] = [
  {
    product: 'Pocket 3',
    brand: 'DJI',
    format: 'Unboxing',
    platform: 'Organic Reels',
    why: '[Confirm] Opens with the camera pushed straight into the lens, so you know what the video is about in the first second.',
    metric: '',
    spec: true,
    video: '',
    poster: '/media/dji-pocket-3-cover.jpg',
    posterAlt: 'A hand holding a DJI Pocket 3 camera up to the lens',
    link: 'https://www.instagram.com/reel/C14kjqfONqs/',
  },
  {
    product: 'Gear oil',
    brand: 'Liqui Moly',
    format: 'Demo',
    platform: 'Organic Reels',
    why: '[Confirm] Product and face in the first frame, filmed in the garage where it actually gets used.',
    metric: '',
    spec: true,
    video: '',
    poster: '/media/liqui-moly-cover.jpg',
    posterAlt: 'Anisong holding a bottle of Liqui Moly gear oil close to the camera',
    link: 'https://www.instagram.com/reel/DXTZlSYODg3/',
  },
  {
    ...emptySlot,
    brand: 'Anker',
    format: '[Problem/solution]',
    platform: '[TikTok/Reels ads]',
    why: '[Why it works. Example: Opens with a callout hook, “If your desk cables are a mess, stop scrolling.”]',
  },
  { ...emptySlot, brand: 'Owala', format: '[Demo]', platform: '[Organic TikTok]' },
  { ...emptySlot, brand: 'Govee', format: '[Unboxing]', platform: '[Amazon listing]' },
  { ...emptySlot },
  { ...emptySlot },
  { ...emptySlot },
  { ...emptySlot },
]

// ── What I help brands with ──────────────────────────────────────────────────

export const services = [
  {
    title: 'Scroll-stopping ad creatives',
    body: 'The hook lands in the first 2 to 3 seconds, so people stop before they swipe past your ad.',
  },
  {
    title: 'Product demos and unboxings',
    body: 'Your product in real hands, working. Buyers stop wondering what they’ll actually get.',
  },
  {
    title: 'Problem/solution videos',
    body: 'Name the annoyance, show your product fixing it. The oldest sales pitch there is, in 20 seconds.',
  },
  {
    title: 'Amazon listing and product page video',
    body: 'Content that sits right where the buying decision happens and pushes it over the line.',
  },
  {
    title: 'Hook variations for ad testing',
    body: 'One shoot, several openings. You test them and put your spend behind the winner.',
  },
  {
    title: 'Raw footage for your team',
    body: 'Clean, well-lit clips your editors can cut into whatever the campaign needs next.',
  },
]

// ── How I work ───────────────────────────────────────────────────────────────

export const steps = [
  {
    title: 'I study your brand',
    body: 'I go through your feed, your ads and your listings and find what’s missing.',
  },
  {
    title: 'I pitch angles and hooks',
    body: 'You get a short list of video ideas, each with its opening line. You pick.',
  },
  {
    title: 'I shoot and deliver',
    body: 'Filmed, edited and sent over. You tell me what to tweak.',
  },
  {
    title: 'You get ready-to-use assets',
    body: 'Sized and cut for ads, socials and product listings.',
  },
]

export const partnership =
  'Need content every month? I also take on monthly partnerships, so you always have fresh creative to test.'

// ── What brands say ──────────────────────────────────────────────────────────
// This section stays hidden while the list is empty. Only add real quotes from real clients.
// Example entry:
//   { name: 'Jane Doe', brand: 'Brand name', stars: 5, quote: 'What they actually said.' },

export const testimonials: { name: string; brand: string; stars: number; quote: string }[] = []

// ── Brands I've created for ──────────────────────────────────────────────────
// Also hidden while empty. Put logo files in public/logos.
// Be honest: set spec to true for any brand you made unpaid concept work for.
// Example entry:
//   { name: 'Brand name', logo: '/logos/brand.svg', spec: false },

export const brands: { name: string; logo: string; spec: boolean }[] = []

// ── Contact ──────────────────────────────────────────────────────────────────

export const contact = {
  headline: 'Let’s hop on a quick chat about rates and deliverables.',
  line: 'Tell me the product and what you need. I reply fast.',
}
