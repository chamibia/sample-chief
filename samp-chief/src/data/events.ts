export type Event = {
  title: string;
  date: string;
  image: string;
  description: string;
  tags?: string[];
  slug: string;
  imageFolder: string;
  gridSpan?: string; // Tailwind grid span classes, e.g. "col-span-2 row-span-2"
  colStart?: string; // Tailwind col-start-* class
  rowStart?: string; // Tailwind row-start-* class
};

export const events: Event[] = [


    {
      title: "Ace Hotel",
      date: "2025-06-19",
      image: "/assets/projects/ace-hotel/3.jpg",
      description: "A great event in London.",
      tags: ["music", "live"],
      slug: "ace-hotel",
      imageFolder: "ace-hotel",
      gridSpan: "col-span-1 row-span-4",
      colStart: "col-start-1",
      rowStart: "row-start-1"
    },
    {
      title: "Kops Record Store",
      date: "2025-05-17",
      image: "/assets/projects/kops/2.jpg",
      description: "May event with special guests.",
      tags: ["community"],
      slug: "kops-record-store",
      imageFolder: "kops",
      gridSpan: "col-span-1 row-span-2",
      colStart: "col-start-2",
      rowStart: "row-start-1"
    },
    {
      title: "U of T Event",
      date: "2025-05-17",
      image: "/assets/projects/u-of-t/1.jpg",
      description: "May event with special guests.",
      tags: ["community"],
      slug: "u-of-t",
      imageFolder: "u-of-t",
      gridSpan: "col-span-1 row-span-2",
      colStart: "col-start-2",
      rowStart: "row-start-3"
    },

    {
      title: "Holt Renfrew",
      date: "2025-05-17",
      image: "/assets/projects/holt-renfrew/6.jpg",
      description: "May event with special guests.",
      tags: ["community"],
      slug: "holt-renfrew",
      imageFolder: "holt-renfrew",
      gridSpan: "col-span-2 row-span-4",
      colStart: "col-start-3",
      rowStart: "row-start-1"
    },
    {
      title: "Village Boogie",
      date: "2025-05-17",
      image: "/assets/projects/village-boogie/1.jpg",
      description: "May event with special guests.",
      tags: ["community"],
      slug: "village-boogie",
      imageFolder: "village-boogie",
      gridSpan: "col-span-4 row-span-2",
      colStart: "col-start-1",
      rowStart: "row-start-5"
    }
    // Add more events here. To change the folder, update the imageFolder property.
  ];
