export type GridSpan =
  | 'col-span-1'
  | 'col-span-2'
  | 'col-span-3'
  | 'col-span-4'
  | 'row-span-1'
  | 'row-span-2'
  | 'row-span-3'
  | 'row-span-4';
export type ColStart = 'col-start-1' | 'col-start-2' | 'col-start-3' | 'col-start-4';
export type RowStart = 'row-start-1' | 'row-start-2' | 'row-start-3' | 'row-start-4';

export type Event = {
  title: string;
  projectcard: string;
  brandLogo?: string;
  description: string;
  slug: string;
  imageFolder: string;
  featured?: { position: 1 | 2 | 3 | 4 | 5 };
  ethos?: string;
  location?: string;
  services?: string;
  heroImage?: string;
  images?: Array<{
    src: string;
    fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  }>;
  contentBlocks?: Array<
    | ({ type?: 'image' } & { src: string; alt?: string; gridSpan?: GridSpan | `${GridSpan} ${GridSpan}`; colStart?: ColStart; rowStart?: RowStart; fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'; position?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' })
  | ({ type: 'video' } & { src: string; alt?: string; gridSpan?: GridSpan | `${GridSpan} ${GridSpan}`; colStart?: ColStart; rowStart?: RowStart; fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'; position?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; controls?: boolean; controlType?: 'short' | 'long'; poster?: string })
    | ({ type: 'text' } & { html: string; gridSpan?: GridSpan | `${GridSpan} ${GridSpan}`; colStart?: ColStart; rowStart?: RowStart })
  >;
};

export const events: Event[] = [
    {
      title: "Ace Hotel",
      projectcard: "/assets/projects/ace-hotel/cover.jpg",
      brandLogo: "/assets/brands/ace.png",
      description: "Boutique hotel brand Ace Hotel partnered with Sample Chief to curate an unforgettable New Year’s Eve celebration. Designed to ring in the year with style and energy, the night featured electrifying music and performances, a packed dance floor, and a photobooth experience where guests could capture their best moments.",
      slug: "ace-hotel",
      imageFolder: "ace-hotel",
      featured: { position: 1 },
      ethos: "Not just another New Year’s Eve Party.",
      location: "Toronto, Canada",
      services: "Event Curation / Music Curation",
      heroImage: "/assets/projects/ace-hotel/5.jpg",
      contentBlocks: [
        { type: 'image', src: "/assets/projects/ace-hotel/1.jpg", gridSpan: "col-span-2 row-span-2", colStart: "col-start-1", rowStart: "row-start-1" },
        { type: 'image', src: "/assets/projects/ace-hotel/6.jpg", gridSpan: "col-span-1 row-span-1" },
        { type: 'image', src: "/assets/projects/ace-hotel/cover.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/ace-hotel/7.jpg", gridSpan: "col-span-1 row-span-1"  },
        { type: 'image', src: "/assets/projects/ace-hotel/3.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/ace-hotel/4.jpg", gridSpan: "col-span-2 row-span-2"}
      ]
    },
    {
      title: "Kops Records",
      projectcard: "/assets/projects/kops/cover.jpg",
      brandLogo: "/assets/projects/kops/kopslogo.webp",
      description: "Toronto’s oldest independent record store, Kops Records, partnered with Sample Chief to bring a fresh spin to Record Store Day with a pop-up at their Queen West location. The celebration featured vinyl DJ sets, exclusive Sample Chief x Kops merchandise, and a special 25% discount on all African records designed to spark curiosity, expand collections, and inspire more listeners to explore the richness of African vinyl culture.",
      slug: "kops-record-store",
      imageFolder: "kops",
      featured: { position: 2 },
      ethos: "Let’s congregate the African vinyl community.",
      location: "Toronto, Canada",
      services: "Event Curation / Music Curation / Merchandise",
      heroImage: "/assets/projects/kops/1.JPG",
      contentBlocks: [
        { type: 'image', src: "/assets/projects/kops/6.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/kops/poster.JPG", gridSpan: "col-span-1 row-span-2", fit: 'fill' },
        { type: 'video', src: "/assets/projects/kops/video.mp4", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/kops/2.JPG", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/kops/7.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/kops/cover.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/kops/3.JPG", gridSpan: "col-span-1 row-span-1"  },
        { type: 'image', src: "/assets/projects/kops/4.JPG", gridSpan: "col-span-1 row-span-1"  },
        { type: 'image', src: "/assets/projects/kops/5.jpg", gridSpan: "col-span-2 row-span-1" }
      ]
    },
    {
      title: "University of Toronto",
      projectcard: "/assets/projects/u-of-t/cover.jpg",
      brandLogo: "/assets/projects/u-of-t/uoftlogo.png",
      description: "The University of Toronto’s Black History Month Luncheon is a long-standing celebration of Black culture and achievement. For 2025’s edition, Sample Chief curated a powerful musical program featuring Juno Award-winning artist Töme and Kunle, an acclaimed singer, music director and composer, nominated for the Dora Award (2024) and Ontario Premier’s Award (2022), and recognized as a Stonebridge Furch Guitar artist. The performances were carefully selected to honor Black Canadian legacy and excellence, creating an atmosphere that was both vibrant and accessible, energizing the room while resonating with a diverse audience.",
      slug: "u-of-t",
      imageFolder: "u-of-t",
      featured: { position: 4 },
      ethos: "Celebrating a 23 year-old event with style.",
      location: "Toronto, Canada",
      services: "Music curation",
      heroImage: "/assets/projects/u-of-t/1.jpg",
      contentBlocks: [
          { type: 'image', src: "/assets/projects/u-of-t/4.jpg", gridSpan: "col-span-2 row-span-4" },
          { type: 'image', src: "/assets/projects/u-of-t/2.jpg", gridSpan: "col-span-2 row-span-2" },
          { type: 'image', src: "/assets/projects/u-of-t/3.JPG", gridSpan: "col-span-2 row-span-2" }
        ]
    },

    {
      title: "Holt Renfrew",
      projectcard: "/assets/projects/holt-renfrew/cover.jpg",
      brandLogo: "/assets/brands/holts.png",
      description: `In February 2025, luxury retailer Holt Renfrew partnered with Sample Chief to celebrate Black music history in Canada and its vibrant community. Together, we launched a multi-platform campaign that blended storytelling, performance, and cultural engagement.`,
      slug: "holt-renfrew",
      imageFolder: "holt-renfrew",
      featured: { position: 3 },
      ethos: "Connecting Continents.",
      location: "Toronto, Canada",
      services: "Editorial / Event Curation / Installation / Print Media / Music Curation / Social Media Campaign",
      heroImage: "/assets/projects/holt-renfrew/9.jpg",
      contentBlocks: [
        { type: 'image', src: "/assets/projects/holt-renfrew/7.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/8.jpg", gridSpan: "col-span-1 row-span-1" },
        { type: 'image', src: "/assets/projects/holt-renfrew/2.jpg", gridSpan: "col-span-1 row-span-1" },
        { type: 'image', src: "/assets/projects/holt-renfrew/4.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'text', html: `<p>Sample Chief curated an editorial feature on African music history in Canada, published on Holt Renfrew’s website, alongside a photo and video series spotlighting Toronto-based artists Ore, Deelo, and Töme as they shared their stories. At Holt Renfrew’s Yorkville location, we designed a listening booth, complete with a curated playlist and immersive visuals inspired by Sample Chief’s signature event posters, where guests could sit, reflect, and experience the music.</p>`, gridSpan: "col-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/3.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/poster.JPG", gridSpan: "col-span-1 row-span-2", fit: 'fill' },
        { type: 'image', src: "/assets/projects/holt-renfrew/5.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/12.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/6.jpg", gridSpan: "col-span-1 row-span-2", fit: 'fill' },
        { type: 'video', src: "/assets/videos/sample2.MP4", gridSpan: "col-span-2 row-span-3" },
        { type: 'text', html: `<p>The partnership extended beyond digital and in-store activations with a music trivia night and a live celebration featuring DJs and performances by No Tourists, Onii-Sama, Big Jacks, Savvv, and more. To tie it all together, we produced a collectible zine distributed nationwide across Holt Renfrew stores and at both events, further amplifying the stories and legacy of Black Canadian music.</p>`, gridSpan: "col-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/11.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/cover.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/14.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/1.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/holt-renfrew/13.jpg", gridSpan: "col-span-4 row-span-3" }
      ]
    },
    {
      title: "Village Boogie",
      projectcard: "/assets/projects/village-boogie/cover.jpg",
      brandLogo: "/assets/brands/sway.png",
      description: `Sample Chief’s flagship event, Village Boogie, is a high-energy journey through the heart of African dance music. From Angolan Kuduro to Ivorian Coupé-Décalé to South African Gqom, it transports audiences to the continent’s most electric dancefloors. Launched in London and now thriving in Toronto, Village Boogie unites communities through sound. Each edition features master DJs and unforgettable energy. With its vibrant campaigns and growing global following, Village Boogie has evolved into a cultural brand with impact both online and IRL.`,
      slug: "village-boogie",
      imageFolder: "village-boogie",
      featured: { position: 5 },
      ethos: "A celebration of African dance music.",
      location: "Toronto, Canada",
      services: "Event Curation / Music Curation",
      heroImage: "/assets/projects/village-boogie/cover.jpg",
      contentBlocks: [
        { type: 'video', src: "/assets/projects/village-boogie/video1.mp4", gridSpan: "col-span-1 row-span-2", fit: 'fill', controls: true, controlType: 'short' },
        { type: 'text', html: `<p>We’re seeking partners to help us scale this movement, whether through sponsorship, brand activations, or international collaborations. Together, we can bring Village Boogie’s unique energy to even wider audiences.</p>`, gridSpan: "col-span-2" },
        { type: 'image', src: "/assets/projects/village-boogie/2.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/village-boogie/7.JPG", gridSpan: "col-span-2 row-span-1" },
        { type: 'image', src: "/assets/projects/village-boogie/9.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'video', src: "/assets/videos/sample.mp4", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/village-boogie/6.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/village-boogie/4.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/village-boogie/3.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/village-boogie/8.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'video', src: "/assets/projects/village-boogie/10.mov", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/village-boogie/5.jpg", gridSpan: "col-span-2 row-span-2" }
      ]
    },
    {
      title: "Art Gallery of Ontario",
      projectcard: "/assets/projects/art-gallery-of-ontario/02-03-1W3A3764.jpg",
      description: "In February 2026, Sample Chief partnered with the AGO to bring their Walker Court to life with a multi-sensory experience. 3D projections, a 6-piece Highlife band, DJs, delicious drinks. You really just had to be there!",
      slug: "art-gallery-of-ontario",
      imageFolder: "art-gallery-of-ontario",
      ethos: "Transforming an art gallery with a multi-sensory takeover.",
      location: "Toronto, Canada",
      services: "Editorial / Event Curation / Creative Direction / Art Installation / Music Curation",
      heroImage: "/assets/projects/art-gallery-of-ontario/02-03-1W3A3764.jpg",
      contentBlocks: [
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/13.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'video', src: "/assets/projects/art-gallery-of-ontario/sample-chief-ago-2026-16x9.mp4", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/01-1W3A3938.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/09-XY-1W3A3820.jpg", gridSpan: "col-span-1 row-span-1" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/19.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/18.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/20.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/12.jpg", gridSpan: "col-span-1 row-span-1" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/10-11.jpg", gridSpan: "col-span-4 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/17.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/15-right-side-only.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/06-1W3A4124.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/16.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/04-1W3A3828-2.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/14.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/05-1W3A4001.jpg", gridSpan: "col-span-1 row-span-2" },
        { type: 'image', src: "/assets/projects/art-gallery-of-ontario/07-08-1W3A4034.jpg", gridSpan: "col-span-4 row-span-2" }
      ]
    },
    {
      title: "Pinterest",
      projectcard: "/assets/projects/pinterest/117452646_Unknown.jpg",
      description: "Pinterest invited Sample Chief during Black History Month to host a maker class in beaded Ankara jewelry. It was a wholesome and educational experience for the Pinterest staff, many of who got to learn about African art and get craftsy for the first time in a while.",
      slug: "pinterest",
      imageFolder: "pinterest",
      ethos: "Music meets crafts.",
      location: "Toronto, Canada",
      services: "Event Curation / Music Curation",
      heroImage: "/assets/projects/pinterest/117452656_Unknown.jpg",
      contentBlocks: [
        { type: 'image', src: "/assets/projects/pinterest/117452640_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/117452720_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/117452912_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/117453120_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/117454880_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/117455424_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/117455584_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/117453312_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/117453664_Unknown.jpg", gridSpan: "col-span-2 row-span-2" },
        { type: 'image', src: "/assets/projects/pinterest/Collage_Brightened.jpg", gridSpan: "col-span-2 row-span-2" }
      ]
    }
  ];
