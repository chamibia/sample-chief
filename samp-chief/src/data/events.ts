export type Event = {
  title: string;
  projectcard: string;  // project card image
  brandLogo?: string; // brand logo image path for card overlay
  description: string;
  slug: string;
  imageFolder: string;
  gridSpan?: string; // Tailwind grid span classes, e.g. "col-span-2 row-span-2"
  colStart?: string; // Tailwind col-start-* class
  rowStart?: string; // Tailwind row-start-* class
  ethos?: string;
  location?: string;
  services?: string;
  heroImage?: string; // New property for hero image
  images?: Array<{
    src: string;
    gridSpan?: string;
    colStart?: string;
    rowStart?: string;
  }>;
};

export const events: Event[] = [


    {
      title: "Ace Hotel",
      projectcard: "/assets/projects/ace-hotel/5.jpg",
      brandLogo: "/assets/brands/ace.png",
      description: "Boutique hotel brand Ace Hotel partnered with Sample Chief to curate an unforgettable New Year’s Eve celebration. Designed to ring in the year with style and energy, the night featured electrifying music and performances, a packed dance floor, and a photobooth experience where guests could capture their best moments.",
      slug: "ace-hotel",
      imageFolder: "ace-hotel",
      gridSpan: "col-span-1 row-span-2",
      colStart: "col-start-1",
      rowStart: "row-start-1",
      ethos: "Not just another New Year’s Eve Party.",
      location: "Toronto, Canada",
      services: "Event Curation / Music Curation",
      heroImage: "/assets/projects/ace-hotel/5.jpg",
      images: [
        { src: "/assets/projects/ace-hotel/1.jpg", gridSpan: "col-span-2", colStart: "col-start-1", rowStart: "row-start-1" },
        { src: "/assets/projects/ace-hotel/2.jpg" },
        { src: "/assets/projects/ace-hotel/3.jpg" },
        { src: "/assets/projects/ace-hotel/4.jpg" },
        { src: "/assets/projects/ace-hotel/6.jpg" },
        { src: "/assets/projects/ace-hotel/7.jpg" }
      ]
    },
    {
      title: "Kops Record Store",
      projectcard: "/assets/projects/kops/4.jpg",
      brandLogo: "/assets/projects/kops/kopslogo.webp",
      description: "Toronto’s oldest independent record store, Kops Records, partnered with Sample Chief to bring a fresh spin to Record Store Day with a pop-up at their Queen West location. The celebration featured vinyl DJ sets, exclusive Sample Chief x Kops merchandise, and a special 25% discount on all African records designed to spark curiosity, expand collections, and inspire more listeners to explore the richness of African vinyl culture.",
      slug: "kops-record-store",
      imageFolder: "kops",
      gridSpan: "col-span-1 row-span-1",
      colStart: "col-start-2",
      rowStart: "row-start-1",
      ethos: "Let’s congregate the African vinyl community.",
      location: "Toronto, Canada",
      services: "Event Curation / Music Curation / Merchandise",
        heroImage: "/assets/projects/kops/1.jpg",
        images: [
          { src: "/assets/projects/kops/2.jpg" },
          { src: "/assets/projects/kops/3.jpg" },
          { src: "/assets/projects/kops/4.jpg" }
        ]
    },
    {
      title: "U of T Event",
      projectcard: "/assets/projects/u-of-t/1.jpg",
      brandLogo: "/assets/projects/u-of-t/uoftlogo.png",
      description: "The University of Toronto’s Black History Month Luncheon is a long-standing celebration of Black culture and achievement. For 2025’s edition, Sample Chief curated a powerful musical program featuring Juno Award-winning artist Töme and Kunle, an acclaimed singer, music director and composer, nominated for the Dora Award (2024) and Ontario Premier’s Award (2022), and recognized as a Stonebridge Furch Guitar artist. The performances were carefully selected to honor Black Canadian legacy and excellence, creating an atmosphere that was both vibrant and accessible, energizing the room while resonating with a diverse audience.",
      slug: "u-of-t",
      imageFolder: "u-of-t",
      gridSpan: "col-span-1 row-span-1",
      colStart: "col-start-2",
      rowStart: "row-start-2",
      ethos: "Celebrating a 23 year-old event with style.",
      location: "Toronto, Canada",
      services: "Music curation",
      heroImage: "/assets/projects/u-of-t/1.jpg",
        images: [
          { src: "/assets/projects/u-of-t/4.jpg" },
          { src: "/assets/projects/u-of-t/2.jpg" },
          { src: "/assets/projects/u-of-t/3.jpg" }
        ]
    },

    {
      title: "Sample Chief Social",
      projectcard: "/assets/projects/holt-renfrew/5.jpg",
      brandLogo: "/assets/brands/holts.png",
      description: `In February 2025, luxury retailer Holt Renfrew partnered with Sample Chief to celebrate Black music history in Canada and its vibrant community. Together, we launched a multi-platform campaign that blended storytelling, performance, and cultural engagement.
                    
                    Sample Chief curated an editorial feature on African music history in Canada, published on Holt Renfrew’s website, alongside a photo and video series spotlighting Toronto-based artists Ore, Deelo, and Töme as they shared their stories. At Holt Renfrew’s Yorkville location, we designed a listening booth, complete with a curated playlist and immersive visuals inspired by Sample Chief’s signature event posters, where guests could sit, reflect, and experience the music.
                    
                    The partnership extended beyond digital and in-store activations with a music trivia night and a live celebration featuring DJs and performances by No Tourists, Onii-Sama, Big Jacks, Savvv, and more. To tie it all together, we produced a collectible zine distributed nationwide across Holt Renfrew stores and at both events, further amplifying the stories and legacy of Black Canadian music.`,
      slug: "holt-renfrew",
      imageFolder: "holt-renfrew",
      gridSpan: "col-span-2 row-span-2",
      colStart: "col-start-3",
      rowStart: "row-start-1",
      ethos: "Connecting Continents.",
      location: "Toronto, Canada",
      services: "Editorial / Event Curation / Installation / Print Media / Music Curation / Social Media Campaign",
      heroImage: "/assets/projects/holt-renfrew/1.jpg",
      images: [
        { src: "/assets/projects/holt-renfrew/2.jpeg" },
        { src: "/assets/projects/holt-renfrew/3.jpeg" },
        { src: "/assets/projects/holt-renfrew/4.jpg" },
        { src: "/assets/projects/holt-renfrew/5.jpg" },
        { src: "/assets/projects/holt-renfrew/6.jpg" }
      ]
    },
    {
      title: "Village Boogie",
      projectcard: "/assets/projects/village-boogie/1.jpg",
      brandLogo: "/assets/brands/sway.png",
      description:`Sample Chief’s flagship event, <strong>Village Boogie</strong>, is a high-energy journey through the heart of African dance music. Designed as a sonic expedition, it transports audiences onto the continent’s most exhilarating dancefloors, from the raw pulse of Angolan Kuduro to the infectious rhythms of Ivorian Coupé-Décalé to the heavy beats of South African Gqom.

                  Since its launch in London, Village Boogie has cultivated communities united by rhythm, expression, and shared cultural experience. The movement has since expanded to Toronto, with plans to cross even more borders. Each edition features DJs who are masters of their craft, creating unforgettable nights that blend authenticity with unrelenting energy.

                  With its bold visual identity, vibrant poster campaigns, and growing global following, Village Boogie has become a cultural brand with impact both online and offline.

                  <strong>We’re seeking partners to help us scale this movement, whether through sponsorship, brand activations, or international collaborations. Together, we can bring Village Boogie’s unique energy to even wider audiences.</strong>`,
      slug: "village-boogie",
      imageFolder: "village-boogie",
      gridSpan: "col-span-4 row-span-2",
      colStart: "col-start-1",
      rowStart: "row-start-3",
      ethos: "Boogie for all ages.",
      location: "Toronto, Canada",
      services: "Event Curation / Music Curation",
      heroImage: "/assets/projects/village-boogie/1.jpg",
      images: [
        { src: "/assets/projects/village-boogie/2.jpg" },
        { src: "/assets/projects/village-boogie/3.jpg" }
      ]
    }
    // Add more events here. To change the folder, update the imageFolder property.
  ];
