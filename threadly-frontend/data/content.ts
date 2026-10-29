// All shared content for the "before" page lives here so the "after"
// page can reuse the exact same content later.

type NavItem = { label: string; href: string; hasDropdown?: boolean };

export const siteContent = {
  brand: "Threadly",

  // Main nav; the item flagged with hasDropdown opens the Categories panel.
  mainNav: [
    { label: "Home", href: "/" },
    { label: "Categories", href: "#", hasDropdown: true },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ] as NavItem[],

  // Small text links shown after the main nav.
  utilityNav: [
    { label: "Login", href: "#" },
    { label: "Cart", href: "#" },
  ] as NavItem[],

  // One size per role so every image keeps a consistent crop.
  imageSizes: {
    hero: { width: 1200, height: 800 },
    grid: { width: 800, height: 1000 },
    about: { width: 800, height: 600 },
  },

  categoriesHeading: "Shop by Category",
  categories: [
    {
      name: "Men",
      href: "#",
      image: "/images/before/cat-men.jpg",
      imageAlt: "Light blue button-up shirt on a white clothing rack",
    },
    {
      name: "Women",
      href: "#",
      image: "/images/before/cat-women.jpg",
      imageAlt: "Beige button-up dress on a white background",
    },
    {
      name: "Kids",
      href: "#",
      image: "/images/before/cat-kids.jpg",
      imageAlt: "Children's knit sweater and shorts on a wooden stand",
    },
    {
      name: "Shoes",
      href: "#",
      image: "/images/before/cat-shoes.jpg",
      imageAlt: "Brown leather lace-up shoes on a white background",
    },
    {
      name: "Accessories",
      href: "#",
      image: "/images/before/cat-accessories.jpg",
      imageAlt: "Brown leather card holder on a light wooden table",
    },
    {
      name: "Sale",
      href: "#",
      image: "/images/before/cat-sale.jpg",
      imageAlt: "Stack of folded knit sweaters in neutral tones",
    },
  ],

  hero: {
    heading: "Welcome to Threadly",
    text: "We offer a wide range of clothing for men, women and kids. Browse our collection and find something you like.",
    buttonText: "Learn More",
    image: "/images/before/hero.jpg",
    imageAlt: "Folded clothing in warm neutral tones",
  },

  productsHeading: "Our Products",
  products: [
    {
      name: "Cotton Shirt",
      price: "$19.99",
      image: "/images/before/prod-cotton-shirt.jpg",
      imageAlt: "Black cotton t-shirt on a hanger against a white wall",
    },
    {
      name: "Casual Pants",
      price: "$29.99",
      image: "/images/before/prod-casual-pants.jpg",
      imageAlt: "Close-up of a denim jeans pocket",
    },
    {
      name: "Basic Hoodie",
      price: "$39.99",
      image: "/images/before/prod-basic-hoodie.jpg",
      imageAlt: "Blush pink and sage green hoodies hanging on a rack",
    },
    {
      name: "Denim Jacket",
      price: "$49.99",
      image: "/images/before/prod-denim-jacket.jpg",
      imageAlt: "Denim jacket on a wooden hanger",
    },
    {
      name: "Summer Dress",
      price: "$34.99",
      image: "/images/before/prod-summer-dress.jpg",
      imageAlt: "Green floral summer dress hanging in a wardrobe",
    },
    {
      name: "Kids Set",
      price: "$24.99",
      image: "/images/before/prod-kids-set.jpg",
      imageAlt: "Children's neutral-toned clothes hanging on a wooden rack",
    },
    {
      name: "Wool Sweater",
      price: "$44.99",
      image: "/images/before/prod-sweater.jpg",
      imageAlt: "Striped navy and white knit sweater",
    },
    {
      name: "Denim Shorts",
      price: "$26.99",
      image: "/images/before/prod-denim-shorts.jpg",
      imageAlt: "Light-wash denim shorts on a white background",
    },
  ],

  about: {
    heading: "About Us",
    paragraphs: [
      "Threadly is a clothing company. We care about quality and customer satisfaction.",
      "We carry clothing for men, women and kids at prices that fit every budget.",
      "Visit our store or shop online — our team is always happy to help.",
    ],
    image: "/images/before/about.jpg",
    imageAlt: "Customers browsing clothes in a bright clothing store",
  },

  newsletter: {
    heading: "Newsletter",
    text: "Enter your email address below to receive news and updates from Threadly.",
    inputLabel: "Email address",
    inputPlaceholder: "Email address",
    buttonText: "Subscribe",
  },

  footer: {
    tagline: "Quality clothing, shoes and accessories for men, women and kids.",
    columns: [
      { title: "Shop", links: ["Men", "Women", "Kids", "Shoes"] },
      { title: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
      { title: "Support", links: ["FAQ", "Size Guide", "Track Order", "Contact Us"] },
    ],
    copyright: "Copyright 2024 Threadly. All rights reserved.",
    email: "info@threadly.com",
    phone: "(555) 123-4567",
    address: "123 Main Street, Springfield, IL 62704",
  },
};
