export type Event = {
  title: string;
  date: string;
  projectcard: string;  // project card image
  poster: string; // poster image on the project detail page
  brandLogo?: string; // brand logo image path for card overlay
  description: string;
  tags?: string[];
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
      date: "2025-06-19",
      projectcard: "/assets/projects/ace-hotel/5.jpg",
      poster: "/assets/projects/ace-hotel/poster.png",
      brandLogo: "/assets/brands/ace.png",
      description: "A great event in London.",
      tags: ["music", "live"],
      slug: "ace-hotel",
      imageFolder: "ace-hotel",
      gridSpan: "col-span-1 row-span-4",
      colStart: "col-start-1",
      rowStart: "row-start-1",
      ethos: "Celebrating creative collaboration.",
      location: "Toronto",
      services: "Live music, event production",
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
      date: "2025-05-17",
      projectcard: "/assets/projects/kops/4.jpg",
      poster: "/assets/projects/kops/poster.jpg",
      brandLogo: "/assets/projects/kops/kopslogo.webp",
      description: "May event with special guests.",
      tags: ["community"],
      slug: "kops-record-store",
      imageFolder: "kops",
      gridSpan: "col-span-1 row-span-2",
      colStart: "col-start-2",
      rowStart: "row-start-1",
      ethos: "Connecting vinyl lovers.",
      location: "Toronto, Canada",
      services: "DJ sets, community gathering",
      heroImage: "/assets/projects/kops/1.jpg",
      images: [
        { src: "/assets/projects/kops/2.jpg" },
        { src: "/assets/projects/kops/3.jpg" },
        { src: "/assets/projects/kops/4.jpg" }
      ]
    },
    {
      title: "U of T Event",
      date: "2025-05-17",
      projectcard: "/assets/projects/u-of-t/1.jpg",
      poster: "/assets/projects/u-of-t/1.jpg",
      brandLogo: "/assets/projects/u-of-t/uoftlogo.png",
      description: "May event with special guests.",
      tags: ["community"],
      slug: "u-of-t",
      imageFolder: "u-of-t",
      gridSpan: "col-span-1 row-span-2",
      colStart: "col-start-2",
      rowStart: "row-start-3",
      ethos: "Student music showcase.",
      location: "Toronto, Canada",
      services: "Live performances, workshops",
      heroImage: "/assets/projects/u-of-t/1.jpg",
      images: [
        { src: "/assets/projects/u-of-t/4.jpg" },
        { src: "/assets/projects/u-of-t/2.jpg" },
        { src: "/assets/projects/u-of-t/3.jpg" }
      ]
    },

    {
      title: "Sample Chief Social",
      date: "2025-05-17",
      projectcard: "/assets/projects/holt-renfrew/5.jpg",
      poster: "/assets/projects/holt-renfrew/poster.jpg",
      brandLogo: "/assets/brands/holts.png",
      description: "May event with special guests.",
      tags: ["community"],
      slug: "holt-renfrew",
      imageFolder: "holt-renfrew",
      gridSpan: "col-span-2 row-span-4",
      colStart: "col-start-3",
      rowStart: "row-start-1",
      ethos: "Fashion meets music.",
      location: "Holt Renfrew, Toronto",
      services: "Fashion show, music curation",
      heroImage: "/assets/projects/holt-renfrew/1.jpg",
      images: [
        { src: "/assets/projects/holt-renfrew/2.jpg" },
        { src: "/assets/projects/holt-renfrew/3.jpg" },
        { src: "/assets/projects/holt-renfrew/4.jpg" },
        { src: "/assets/projects/holt-renfrew/5.jpg" },
        { src: "/assets/projects/holt-renfrew/6.jpg" }
      ]
    },
    {
      title: "Village Boogie",
      date: "2025-05-17",
      projectcard: "/assets/projects/village-boogie/1.jpg",
      poster: "/assets/projects/village-boogie/poster.PNG",
      brandLogo: "/assets/brands/sway.png",
      description: "May event with special guests.",
      tags: ["community"],
      slug: "village-boogie",
      imageFolder: "village-boogie",
      gridSpan: "col-span-4 row-span-2",
      colStart: "col-start-1",
      rowStart: "row-start-5",
      ethos: "Boogie for all ages.",
      location: "Toronto, Canada",
      services: "Dance party, music curation",
      heroImage: "/assets/projects/village-boogie/1.jpg",
      images: [
        { src: "/assets/projects/village-boogie/2.jpg" },
        { src: "/assets/projects/village-boogie/3.jpg" }
      ]
    }
    // Add more events here. To change the folder, update the imageFolder property.
  ];
