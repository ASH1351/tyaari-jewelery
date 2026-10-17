/**
 * TYAARI JEWELLERY - Product Catalog & Brand Data Configuration
 * 
 * Edit this file to add, modify, or remove products, categories, 
 * testimonials, and lookbook images without touching the core HTML.
 */

const BRAND_CONFIG = {
  name: "Tyaari Jewellery",
  tagline: "Crafted to Shine. Made for You.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // No plus sign or spaces for direct wa.me link
  email: "concierge@tyaarijewellery.com",
  address: "Heritage Atelier, 14 Palace Road, Jaipur & MG Road, Bangalore",
  freeShippingThreshold: 5000, // In INR ₹
  currencySymbol: "₹",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  pinterestUrl: "https://pinterest.com"
};

const CATEGORIES = [
  {
    id: "rings",
    name: "Rings",
    tagline: "Statement Cocktails & Bands",
    image: "assets/images/ring-emerald-solitaire.jpg",
    itemCount: "6 Designs",
    description: "Handcrafted polki and carved emerald rings framed in 22K antique gold finish."
  },
  {
    id: "bracelets",
    name: "Bracelets",
    tagline: "Royal Kadas & Cuffs",
    image: "assets/images/bracelet-emerald-kada.jpg",
    itemCount: "5 Designs",
    description: "Opulent openable kadas, haathphools, and filigree cuffs with semi-precious emeralds."
  },
  {
    id: "earrings",
    name: "Earrings",
    tagline: "Heirloom Chandbalis & Jhumkas",
    image: "assets/images/earrings-chandbali-pair.jpg", // Featuring user's authentic piece
    itemCount: "8 Designs",
    description: "Exquisite kundan chandbalis and jhumkas adorned with emerald clusters and pearls."
  },
  {
    id: "mini-earrings",
    name: "Mini Earrings",
    tagline: "Delicate Daily Luxe Studs",
    image: "assets/images/mini-earrings-emerald-stud.jpg",
    itemCount: "6 Designs",
    description: "Subtle yet striking floral studs and mini polki tops designed for modern elegance."
  }
];

const PRODUCTS = [
  {
    id: "ty-ear-001",
    name: "The Royal Mayuri Emerald Kundan Chandbali",
    category: "earrings",
    price: 24500,
    originalPrice: 28900,
    badge: "Bestseller",
    badgeType: "gold",
    image: "assets/images/earrings-chandbali-pair.jpg",
    hoverImage: "assets/images/earring-chandbali-single.jpg",
    rating: 5.0,
    reviewsCount: 38,
    description: "An authentic masterpiece featuring carved geometric emerald centers embraced by kundan peacocks, crescent tiers, and suspended mint and blush teardrop bead drops.",
    specs: [
      "Authentic Carved Emerald Kundan stones",
      "22K Antique Gold Micro-Plating",
      "Clusters of mint jade beads & blush quartz pearls",
      "Hypoallergenic & skin-friendly lead-free alloy",
      "Includes Certificate of Authenticity & Royal Velvet Box"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "ty-ring-001",
    name: "Noor Emerald Polki Cocktail Ring",
    category: "rings",
    price: 14500,
    originalPrice: 17200,
    badge: "Bestseller",
    badgeType: "gold",
    image: "assets/images/ring-emerald-solitaire.jpg",
    hoverImage: "assets/images/ring-emerald-solitaire-hover.jpg",
    rating: 4.9,
    reviewsCount: 29,
    description: "Bold octagonal emerald-cut green crystal centerpiece surrounded by brilliant uncut polki stones set in antique gold foil work.",
    specs: [
      "Carved Emerald Green Crystal (14x12mm)",
      "Fine Uncut Polki Kundan setting",
      "Adjustable comfort band fits sizes 12 to 18",
      "Anti-tarnish protective micro-coating"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "ty-brac-001",
    name: "Devi Emerald & Polki Royal Kada",
    category: "bracelets",
    price: 28500,
    originalPrice: 33000,
    badge: "Exclusive",
    badgeType: "blush",
    image: "assets/images/bracelet-emerald-kada.jpg",
    hoverImage: "assets/images/bracelet-emerald-kada-hover.jpg",
    rating: 5.0,
    reviewsCount: 22,
    description: "Regal openable bangle kada detailed with intricate floral meenakari backing, rows of uncut polki stones, and cabochon emerald accents.",
    specs: [
      "Openable screw clasp for effortless wearing",
      "Hand-painted reverse Meenakari enamel art",
      "22K Antique Gold Matte Finish",
      "Standard wrist fit (Size 2.4 to 2.6)"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "ty-mini-001",
    name: "Gia Mini Emerald Floral Studs",
    category: "mini-earrings",
    price: 6500,
    originalPrice: 7800,
    badge: "New Arrival",
    badgeType: "blush",
    image: "assets/images/mini-earrings-emerald-stud.jpg",
    hoverImage: "assets/images/mini-earrings-emerald-stud-hover.jpg",
    rating: 4.8,
    reviewsCount: 45,
    description: "Understated luxury for daily wear. Six teardrop polki petals embrace a vibrant round emerald center with secure comfort screw backs.",
    specs: [
      "Diameter: 14mm lightweight silhouette",
      "Nickel-free and skin-safe for all-day comfort",
      "Authentic Push-back with rubber safety stopper",
      "Anti-tarnish sealed finish"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "ty-ear-002",
    name: "Nazaakat Emerald Jhumkas",
    category: "earrings",
    price: 16800,
    originalPrice: 19500,
    badge: "Popular",
    badgeType: "gold",
    image: "assets/images/earrings-emerald-jhumka.jpg",
    hoverImage: "assets/images/earrings-emerald-jhumka-hover.jpg",
    rating: 4.9,
    reviewsCount: 31,
    description: "Flowing tiered jhumkas featuring delicate floral tops, dome filigree work, and a cascade of tiny emerald beads that sway gently with every move.",
    specs: [
      "Length: 5.8cm, Total Weight: 26g per pair",
      "High-luster pearl and mint bead drops",
      "Traditional Rajasthani jaali carving",
      "Soft silicone back cushions included"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "ty-ring-002",
    name: "Meera Solitaire Emerald Band",
    category: "rings",
    price: 9800,
    originalPrice: 11500,
    badge: "New Arrival",
    badgeType: "blush",
    image: "assets/images/ring-polki-kundan.jpg",
    hoverImage: "assets/images/ring-polki-kundan-hover.jpg",
    rating: 4.9,
    reviewsCount: 19,
    description: "Sleek and contemporary, this eternity-style band alternates brilliant uncut polki stones with baguette-cut emerald gems in a brushed gold setting.",
    specs: [
      "Stackable design with low-profile setting",
      "Comfort-fit contoured inner curve",
      "22K Gold Vermeil over premium jeweler's brass",
      "Available in Sizes 12, 14, 16"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "ty-brac-002",
    name: "Jashn Polki Filigree Cuff",
    category: "bracelets",
    price: 19000,
    originalPrice: 22000,
    badge: "Limited Edition",
    badgeType: "gold",
    image: "assets/images/bracelet-polki-cuff.jpg",
    hoverImage: "assets/images/bracelet-polki-cuff-hover.jpg",
    rating: 5.0,
    reviewsCount: 17,
    description: "An architectural cuff inspired by Jaipur palaces. Open lattice metalwork cradles geometric polki stones flanked by emerald green highlights.",
    specs: [
      "Flexible spring hinge adjusts easily to wrist",
      "Architectural laser-pierced jaali openwork",
      "Dual tone antique gold polish",
      "Weight: 34g"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "ty-mini-002",
    name: "Tara Petite Polki Crescent Tops",
    category: "mini-earrings",
    price: 5800,
    originalPrice: 6900,
    badge: "Everyday Luxe",
    badgeType: "blush",
    image: "assets/images/mini-earrings-polki-floral.jpg",
    hoverImage: "assets/images/mini-earrings-polki-floral-hover.jpg",
    rating: 4.8,
    reviewsCount: 52,
    description: "Crescent moon silhouettes adorned with micro-polki stones and a hint of blush enamel. Effortless elegance from desk to dinner.",
    specs: [
      "Ultra-lightweight: 3.2g per pair",
      "Anti-allergenic surgical steel post",
      "Handcrafted kundan pavé finish",
      "Gift-ready signature velvet pouch"
    ],
    inStock: true,
    isFeatured: true
  },
  {
    id: "ty-ring-003",
    name: "Rajkumari Antique Gold Kundan Ring",
    category: "rings",
    price: 12200,
    originalPrice: 14500,
    badge: "Heirloom",
    badgeType: "gold",
    image: "assets/images/ring-antique-gold.jpg",
    hoverImage: "assets/images/ring-antique-gold-hover.jpg",
    rating: 4.9,
    reviewsCount: 24,
    description: "An oval signet-style kundan ring featuring floral engraving around a domed antique setting, exuding timeless royal court charm.",
    specs: [
      "22K Gold Micro-Plated Antique Finish",
      "Detailed side shank engraving",
      "Adjustable shank fits sizes 11 to 17",
      "Certified skin-friendly alloy"
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: "ty-brac-003",
    name: "Aaradhya Antique Gold Haathphool",
    category: "bracelets",
    price: 22400,
    originalPrice: 26000,
    badge: "Festive Pick",
    badgeType: "blush",
    image: "assets/images/bracelet-haathphool-gold.jpg",
    hoverImage: "assets/images/bracelet-haathphool-gold-hover.jpg",
    rating: 5.0,
    reviewsCount: 14,
    description: "Graceful bridal hand ornament connecting an emerald-studded floral ring to an ornate wrist kada via delicate pearl-strung chains.",
    specs: [
      "Adjustable finger ring and wrist clasp",
      "Real freshwater seed pearls",
      "Intricate floral medallion centerpiece",
      "Tarnish-resistant clear coat seal"
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: "ty-ear-003",
    name: "Sitara Pearl & Polki Drop Earrings",
    category: "earrings",
    price: 18200,
    originalPrice: 21000,
    badge: "Bestseller",
    badgeType: "gold",
    image: "assets/images/earrings-polki-chandbali.jpg",
    hoverImage: "assets/images/earrings-polki-chandbali-hover.jpg",
    rating: 4.9,
    reviewsCount: 40,
    description: "Slender shoulder-duster earrings framing luminous polki flowers with emerald teardrop stones and hand-strung natural pearl clusters.",
    specs: [
      "Length: 7.2cm, elegant elongated silhouette",
      "Weight: 19g per earring",
      "Hypoallergenic post with screw mechanism",
      "Lifetime polish warranty support"
    ],
    inStock: true,
    isFeatured: false
  },
  {
    id: "ty-mini-003",
    name: "Chhavi Daily Luxe Emerald Tops",
    category: "mini-earrings",
    price: 7200,
    originalPrice: 8500,
    badge: "Trending",
    badgeType: "blush",
    image: "assets/images/mini-earrings-emerald-stud-hover.jpg",
    hoverImage: "assets/images/mini-earrings-emerald-stud.jpg",
    rating: 4.7,
    reviewsCount: 27,
    description: "Geometric square emerald studs with micro-pearl halo borders. A pristine, versatile staple for workwear and evening dinners.",
    specs: [
      "Square profile: 11mm x 11mm",
      "Deep Columbian Emerald Green simulated gemstone",
      "Pearl micro-setting with zero snagging",
      "22K Yellow Gold vermeil"
    ],
    inStock: true,
    isFeatured: false
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Singhania",
    location: "Jaipur & Mumbai",
    rating: 5,
    title: "Surpassed all expectations for my wedding trousseau",
    comment: "I ordered the Mayuri Kundan Chandbalis and Devi Kada for my Sangeet. The weight, the emerald luster, and the anti-tarnish finish are identical to family heirloom pieces. The green velvet packaging felt like unboxing a royal treasure.",
    verified: true,
    date: "October 2026",
    productBought: "The Royal Mayuri Emerald Kundan Chandbali"
  },
  {
    id: 2,
    name: "Dr. Rohini Mehta",
    location: "Bangalore",
    rating: 5,
    title: "Flawless finish and truly skin-friendly",
    comment: "Having sensitive skin, I am usually very cautious with gold-plated jewellery. Tyaari's pieces gave me zero irritation even after 10 hours at a Diwali gala. The craftsmanship is pure poetry. Tyaari is now my go-to gift for friends.",
    verified: true,
    date: "September 2026",
    productBought: "Noor Emerald Polki Cocktail Ring"
  },
  {
    id: 3,
    name: "Pooja Vashisht",
    location: "New Delhi",
    rating: 5,
    title: "The WhatsApp concierge made ordering effortless",
    comment: "The team sent me high-resolution styling videos on WhatsApp before dispatch. The parcel arrived within 48 hours in discreet insured packaging with an authenticity card. Exceptional customer service!",
    verified: true,
    date: "August 2026",
    productBought: "Devi Emerald & Polki Royal Kada"
  },
  {
    id: 4,
    name: "Sneha Chawla",
    location: "Hyderabad",
    rating: 5,
    title: "Mini earrings are perfection for everyday luxury",
    comment: "The Gia mini emerald studs are so lightweight yet look strikingly expensive. I wear them to clinic and meetings daily. Will be ordering more as festive gifts!",
    verified: true,
    date: "July 2026",
    productBought: "Gia Mini Emerald Floral Studs"
  }
];

const LOOKBOOK = [
  {
    id: "lb-1",
    title: "The Royal Bridal Grandeur",
    caption: "The Royal Mayuri Kundan necklace and chandelier earrings styled with emerald organza and handwoven zardozi.",
    image: "assets/images/hero-kundan-set.jpg",
    category: "Heirloom Bridal",
    tags: ["Kundan", "Polki", "Emeralds"]
  },
  {
    id: "lb-2",
    title: "Midnight Cocktail Brilliance",
    caption: "Carved emerald solitaire ring paired with the Devi floral kada for an intimate evening soiree.",
    image: "assets/images/lookbook-1.jpg",
    category: "Festive Luxe",
    tags: ["Cocktail Ring", "Royal Kada"]
  },
  {
    id: "lb-3",
    title: "Sunlit Jaipur Courtyards",
    caption: "Lustrous polki drops dancing in golden afternoon light, crafted with antique foil settings.",
    image: "assets/images/lookbook-2.jpg",
    category: "Daytime Elegance",
    tags: ["Chandbalis", "Pearls"]
  },
  {
    id: "lb-4",
    title: "Intricate Filigree & Enamel",
    caption: "Close-up of traditional Rajasthani Meenakari enamel artistry adorning the inner shank of Tyaari bracelets.",
    image: "assets/images/lookbook-3.jpg",
    category: "Artisan Heritage",
    tags: ["Meenakari", "Craftsmanship"]
  },
  {
    id: "lb-5",
    title: "Modern Minimal Heirloom",
    caption: "Layered daily studs and delicate crescent polki tops paired with contemporary power dressing.",
    image: "assets/images/lookbook-4.jpg",
    category: "Contemporary",
    tags: ["Mini Earrings", "Minimalist"]
  },
  {
    id: "lb-6",
    title: "Heirloom Treasure Box",
    caption: "Each piece rests in our bespoke deep emerald velvet jewel box with brass clasp and care seal.",
    image: "assets/images/lookbook-5.jpg",
    category: "Packaging",
    tags: ["Royal Velvet", "Unboxing"]
  }
];
