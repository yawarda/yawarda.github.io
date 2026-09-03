/* ==========================================================================
   YA.WARDA PRODUCT CATALOG DATA (REAL FLORIST BOUQUETS)
   All 40 Authentic Bouquets with Stripped Pricing & High-Res Photography
   ========================================================================== */

const PRODUCTS_DATA = [
  {
    id: "prod-0318",
    name: "Blush Two-Tone Roses & Baby's Breath Bouquet",
    subtitle: "Soft Pastel Petals · Dreamy Cloud Gypsophila",
    category: "roses",
    subCategory: "mixed",
    price: 1600,
    originalPrice: 1950,
    badge: "Bestseller",
    image: [
      "images/IMG_0318_1600.jpg"
    ],
    rating: 4.9,
    reviewCount: 37,
    flowers: "Blush Pink & Cream Two-Tone Roses, Gypsophila",
    boxType: "Soft Petal Pink Wrap with Satin Ribbon",
    boxColors: ["Blush Pink", "Pearl White"],
    stemOptions: [
      { label: "Classic (30 Stems)", price: 1600, default: true },
      { label: "Deluxe (40 Stems)", price: 2000 }
    ],
    occasions: ["birthday", "anniversary", "proposals", "newbeginnings"],
    description: "Delicate blush tipped roses set against a fluffy cloud of baby's breath for a fairytale romance feel.",
    careInstructions: "Keep in a cool shaded area for long lasting blooms."
  },
  {
    id: "prod-0070",
    name: "Pink Two-Tone Roses & White Chrysanthemums",
    subtitle: "Blush Garden Mix · Soft Rose Wrap",
    category: "roses",
    subCategory: "mixed",
    price: 1600,
    originalPrice: 1850,
    badge: "Trending",
    image: [
      "images/IMG_0070_1500.jpg"
    ],
    rating: 4.9,
    reviewCount: 36,
    flowers: "Two-Tone Pink Petal Roses, White Spray Chrysanthemums & Baby's Breath",
    boxType: "Pastel Pink Pleated Wrap",
    boxColors: ["Blush Pink", "Soft Lavender", "Ivory Cream"],
    stemOptions: [
      { label: "Classic (30 Stems)", price: 1600, default: true },
      { label: "Deluxe (40 Stems)", price: 2000 }
    ],
    occasions: ["birthday", "romance", "gratitude"],
    description: "Charming two-tone pink blush roses paired with snow-white spray chrysanthemums for a radiant garden aesthetic.",
    careInstructions: "Change vase water every 48 hours for maximum blossom longevity."
  },
  {
    id: "prod-0091",
    name: "Artificial White Tulips Hand-Tied Bouquet",
    subtitle: "Artifical White Tulips · Minimalist Luxe",
    category: "tulips",
    subCategory: "tulips",
    price: 950,
    originalPrice: 1200,
    badge: "Artificial",
    image: [
      "images/IMG_0091_950.jpg"
    ],
    rating: 4.9,
    reviewCount: 28,
    flowers: "Artificial White Tulips Bridal Bouquet",
    boxType: "Wrap",
    boxColors: ["Pure White"],
    stemOptions: [
      { label: "10 Stems", price: 950, default: true },
      { label: "20 Stems", price: 1800 }
    ],
    occasions: ["Bridal", "newbeginnings"],
    description: "White tulips celebrating simplicity, pure affection, and refined European elegance.",
    careInstructions: "Keep in shallow cold water. Tulips continue to grow slightly in the vase."
  },
  {
    id: "prod-0130",
    name: "Red & Orange Roses with Mixed Chrysanthemums and Carnations Bouquet",
    subtitle: "Vibrant Crimson Blooms · Dual Tone Palette",
    category: "roses",
    subCategory: "mixed",
    price: 3000,
    originalPrice: 3600,
    badge: "Popular",
    image: [
      "images/IMG_0130_3000.jpg"
    ],
    rating: 4.9,
    reviewCount: 39,
    flowers: "Deep Red Dutch Roses, Orange Dutch Roses, White Chrysanthemums & White Carnations",
    boxType: "Dual Tone Kraft & Fabric Wrap",
    boxColors: ["Burgundy Crimson", "Charcoal Slate", "Kraft Paper"],
    stemOptions: [
      { label: "Deluxe Bouquet (60 Stems)", price: 3000, default: true },
      { label: "Grandeur Bouquet (80 Stems)", price: 4000 }
    ],
    occasions: ["anniversary", "romance", "congratulations"],
    description: "A rich, passionate contrast of deep crimson roses with coral hues and delicate carnations.",
    careInstructions: "Keep blooms away from ripening fruits and direct heating/sun."
  },
  {
    id: "prod-0169",
    name: "White Roses & Blue Hydrangeas Bouquet",
    subtitle: "French Riviera Palette · Cloud Blue Hydrangeas",
    category: "mixed",
    subCategory: "luxury",
    price: 4500,
    originalPrice: 5400,
    badge: "Haute Luxe",
    image: [
      "images/IMG_0169_4500.png"
    ],
    rating: 5.0,
    reviewCount: 47,
    flowers: "Baby Blue Hydrangeas, White Avalanche Roses.",
    boxType: "Royal Blue & Ivory Layered Wrap",
    boxColors: ["Azure Blue", "Snow White", "Midnight Navy"],
    stemOptions: [
      { label: "Signature Luxe", price: 4500, default: true },
      { label: "Imperial Grandeur", price: 6200 }
    ],
    occasions: ["celebration", "wedding", "anniversary", "birthday"],
    description: "Voluminous celestial blue hydrangeas paired with regal white roses evoke the breezy serenity of the Côte d'Azur.",
    careInstructions: "Hydrangeas love water! Submerge heads in water for 15 mins if they ever soften."
  },
  {
    id: "prod-0186",
    name: "Pink Lilies, Gerberas, Roses & Carnations Grand Fan Bouquet",
    subtitle: "Spectacular Fan Arrangement · Exotic Oriental Lilies",
    category: "lilies",
    subCategory: "fan",
    price: 3800,
    originalPrice: 4600,
    badge: "Grand Fan",
    image: [
      "images/IMG_0186_3800.jpg"
    ],
    rating: 5.0,
    reviewCount: 53,
    flowers: "Pink Oriental Lilies, Coral Gerberas, Roses, Carnations & Fillers",
    boxType: "Bespoke Fan Pleated Wrap",
    boxColors: ["Blush Mint", "Soft Peach", "Imperial Lilac"],
    stemOptions: [
      { label: "Grand Fan Display", price: 3800, default: true },
      { label: "Royal Fan Display", price: 5200 }
    ],
    occasions: ["wedding", "anniversary", "grandopening", "birthday"],
    description: "A showstopping tall fan bouquet of blooming pink oriental lilies, lively gerberas, and pastel roses designed to leave a lasting impression.",
    careInstructions: "Remove lily anthers gently as petals open to prevent pollen stains."
  },
  {
    id: "prod-0229",
    name: "Classic Red Roses & Baby's Breath Bouquet",
    subtitle: "Timeless Romance · Deep Crimson Velvet Roses",
    category: "roses",
    subCategory: "classic",
    price: 950,
    originalPrice: 1200,
    badge: "Bestseller",
    image: [
      "images/IMG_0229_950.jpg"
    ],
    rating: 4.8,
    reviewCount: 65,
    flowers: "Selected Long-Stem Red Roses, Gypsophila Baby's Breath",
    boxType: "Classic Black & Gold Silhouette Wrap",
    boxColors: ["Obsidian Black", "Ruby Red", "Parisian Kraft"],
    stemOptions: [
      { label: "Classic (10 Stems)", price: 950, default: true },
      { label: "Deluxe (20 Stems)", price: 1400 },
      { label: "Grand (30 Stems)", price: 1600 }
    ],
    occasions: ["romance", "anniversary", "proposals", "valentines"],
    description: "The timeless expression of true love: velvety deep red roses nestled in a starry halo of white baby's breath.",
    careInstructions: "Cut stem ends under running water before placing in your favorite vase."
  },
  {
    id: "prod-0231",
    name: "Grand Royale Mixed Roses & Gerberas Display",
    subtitle: "Multi-Tier Opulence · Exotic Blooms Extravaganza",
    category: "luxury",
    subCategory: "luxury",
    price: 6200,
    originalPrice: 7200,
    badge: "VIP Luxury",
    image: [
      "images/IMG_0231_5900.png"
    ],
    rating: 5.0,
    reviewCount: 31,
    flowers: "Roses in Multiple Hues, Vibrant Gerberas, Chrysanthemums & Golden Fillers",
    boxType: "Regal Layered Floor/Table Display Wrap",
    boxColors: ["Butter Yellow", "Jade Green", "Midnight Slate"],
    stemOptions: [
      { label: "Grand Display (Without Mini Bouquet)", price: 6200, default: true },
      { label: "Majestic Display (With Mini Bouquet)", price: 8500 }
    ],
    occasions: ["vip", "wedding", "milestone", "corporate"],
    description: "An imposing, luxurious floral architecture boasting dozens of prime blooms handcrafted for high-profile celebrations. Mini Bouquet Not Included!",
    careInstructions: "Replenish hydration daily into the arrangement base."
  },
  {
    id: "prod-0232",
    name: "Red & Pink Roses with White Daisies Kraft Bouquet",
    subtitle: "Artisanal Kraft Wrap · Sweet Garden Charm",
    category: "roses",
    subCategory: "mixed",
    price: 950,
    originalPrice: 1200,
    badge: "Value Pick",
    image: [
      "images/IMG_0232_950.jpg"
    ],
    rating: 4.8,
    reviewCount: 29,
    flowers: "Red Roses, Pink Spray Roses & White Daisies",
    boxType: "Natural Eco Kraft Paper with Twine/Ribbon",
    boxColors: ["Rustic Kraft", "Cream White", "Blush Pink"],
    stemOptions: [
      { label: "Hand-Tied Petite (10 Stems)", price: 950, default: true },
      { label: "Hand-Tied Deluxe (25 Stems)", price: 1500 }
    ],
    occasions: ["birthday", "thinkingofyou", "cheerup", "friendship"],
    description: "Rustic romance meets casual warmth in this lovely blend of colorful roses and jaunty white daisy chrysanthemums.",
    careInstructions: "Keep in a cool room with fresh water."
  },
  {
    id: "prod-0238",
    name: "Ultra Luxe White Lilies & Roses Trunk Basket Arrangement",
    subtitle: "Collector's Trunk Basket · Masterpiece Floristry",
    category: "luxury",
    subCategory: "luxury",
    price: 11000,
    originalPrice: 13500,
    badge: "Masterpiece",
    image: [
      "images/IMG_0238_11000.png"
    ],
    rating: 5.0,
    reviewCount: 19,
    flowers: "Massive White Asiatic Lilies, Premium Dutch Roses, Orchids & Exotic Greens",
    boxType: "Handmade Vintage Leather-Trimmed Woven Trunk",
    boxColors: ["Antique Tan Trunk", "Ivory White Velvet", "Midnight Trunk"],
    stemOptions: [
      { label: "Grandeur Trunk (200+ Stems)", price: 11000, default: true }
    ],
    occasions: ["wedding", "grandcelebration", "vip", "anniversary"],
    description: "The pinnacle of floral grandeur. An awe-inspiring luxury trunk overflowing with immaculate white lilies and rare roses.",
    careInstructions: "Hydrate internal oasis foam daily with 2 cups of clean water."
  },
  {
    id: "prod-0241",
    name: "Pink Oriental Lilies & White Rose Bouquet",
    subtitle: "Fragrant Lilies · Parisian Soft Palette",
    category: "lilies",
    subCategory: "mixed",
    price: 3000,
    originalPrice: 3700,
    badge: "Bestseller",
    image: [
      "images/IMG_0241_3000.jpg"
    ],
    rating: 4.9,
    reviewCount: 44,
    flowers: "Pink Oriental Lilies, Avalanche White Roses & Salal Greens",
    boxType: "Dual Blush & Snow Wrap with Lace",
    boxColors: ["Blush Pink", "Snow White", "Rose Quartz"],
    stemOptions: [
      { label: "Deluxe Bouquet", price: 3000, default: true },
      { label: "Grandeur Fan", price: 4400 }
    ],
    occasions: ["birthday", "anniversary", "mothersday", "congratulations"],
    description: "Exotic scented pink oriental lilies paired with velvety white roses create an unforgettable aura of grace.",
    careInstructions: "Trim stems at an angle every 2 days and remove faded blooms."
  },
  {
    id: "prod-0243",
    name: "Stitch Plushie & White Roses Gift Bouquet",
    subtitle: "Collectible Disney Plushie · Forever Gift Bouquet",
    category: "plushie",
    subCategory: "gift",
    price: 2200,
    originalPrice: 2800,
    badge: "Gift Special",
    image: [
      "images/IMG_0243_2200.jpg"
    ],
    rating: 5.0,
    reviewCount: 38,
    flowers: "Fresh White Roses, Baby's Breath & Authentic Stitch Plush Toy",
    boxType: "Sky Blue Frosted Wrap with Polka Accents",
    boxColors: ["Sky Blue", "Lilac Purple", "Pastel Pink"],
    stemOptions: [
      { label: "Gift Pack with Plushie", price: 2200, default: true }
    ],
    occasions: ["birthday", "graduation", "childbirth", "specialgift"],
    description: "An adorable collectible Stitch plush nestled amongst fragrant white roses and baby's breath. The perfect heartwarming surprise!",
    careInstructions: "Roses are fresh in water ampoules. The plushie lasts forever!"
  },
  {
    id: "prod-0244",
    name: "Grand Luxury Pink Lilies & Mixed Blooms Bouquet",
    subtitle: "Extraordinary Scale · Handcrafted Statement Piece",
    category: "luxury",
    subCategory: "fan",
    price: 6800,
    originalPrice: 7800,
    badge: "Haute Luxe",
    image: [
      "images/IMG_0244_6500.jpg"
    ],
    rating: 5.0,
    reviewCount: 26,
    flowers: "Pink Oriental Lilies, Chrysanthemums, Roses, Blue Daisies & Baby's Breath",
    boxType: "Multi-Tier Luxury Display Wrap",
    boxColors: ["Powder Pink", "Champagne Gold", "Mint Sage"],
    stemOptions: [
      { label: "Grand Bouquet", price: 6800, default: true },
      { label: "Imperial Bouquet", price: 8500 }
    ],
    occasions: ["wedding", "engagement", "anniversary", "festive"],
    description: "An exuberant presentation of blooming pink lilies and companion blossoms that command attention in any venue.",
    careInstructions: "Place in deep water vase away from direct sunlight."
  },
  {
    id: "prod-0245",
    name: "Luxury Red Roses & Eucalyptus Bouquet",
    subtitle: "Crimson Splendor · Matte Black Editorial Wrap",
    category: "roses",
    subCategory: "classic",
    price: 3000,
    originalPrice: 3700,
    badge: "Editorial Pick",
    image: [
      "images/IMG_0245_3000.jpg"
    ],
    rating: 4.9,
    reviewCount: 51,
    flowers: "Long-Stem Dutch Scarlet Roses, Spiral Eucalyptus & Gold Accents",
    boxType: "Matte Black Parisian Wrap with Burgundy Ribbon",
    boxColors: ["Midnight Black", "Gold Foil Kraft", "Burgundy Slate"],
    stemOptions: [
      { label: "Deluxe (25 Stems)", price: 3000, default: true },
      { label: "Grandeur (40 Stems)", price: 4500 }
    ],
    occasions: ["anniversary", "proposals", "romance", "valentines"],
    description: "Deep scarlet Dutch roses nestled in dramatic spiral eucalyptus, wrapped in sleek matte midnight paper.",
    careInstructions: "Trim 1-2 cm stems diagonally in water."
  },
  {
    id: "prod-0246",
    name: "Pink Plushie & Rosebud Gift Bouquet",
    subtitle: "Sweet Surprise · Plush Toy & Soft Roses",
    category: "plushie",
    subCategory: "gift",
    price: 2200,
    originalPrice: 2700,
    badge: "Gift Pick",
    image: [
      "images/IMG_0246_2200.jpg"
    ],
    rating: 4.9,
    reviewCount: 27,
    flowers: "Pastel Pink Roses, Baby's Breath & Plush Companion",
    boxType: "Scalloped Powder Pink Gift Wrap",
    boxColors: ["Powder Pink", "Cotton Candy", "Ivory Cream"],
    stemOptions: [
      { label: "Plushie Bouquet Pack", price: 2200, default: true }
    ],
    occasions: ["birthday", "anniversary", "cute", "romance"],
    description: "Sweet pink blossoms coupled with an adorable plush friend to bring immediate smiles and lasting memories.",
    careInstructions: "Display in a bright room avoiding direct sun."
  },
  {
    id: "prod-0248",
    name: "Pink Oriental Lilies Fan Bouquet",
    subtitle: "Dramatic Silhouette · Scented Pink Lily Crowns",
    category: "lilies",
    subCategory: "fan",
    price: 3000,
    originalPrice: 3600,
    badge: "Fragrant",
    image: [
      "images/IMG_0248_3000.jpg"
    ],
    rating: 4.9,
    reviewCount: 35,
    flowers: "Pink Oriental Lilies, Gypsophila & Fresh Broad Ferns",
    boxType: "Sculpted Fan Wrap with Satin Bow",
    boxColors: ["Dusty Rose", "Soft Lavender", "Opal White"],
    stemOptions: [
      { label: "Signature Fan", price: 3000, default: true },
      { label: "Grandeur Fan", price: 4200 }
    ],
    occasions: ["birthday", "wedding", "sympathy", "congratulations"],
    description: "Gracefully fanned pink oriental lilies that release an enchanting natural perfume into any room.",
    careInstructions: "Keep in a cool room with fresh water and remove lily pollen stamens."
  },
  {
    id: "prod-0249",
    name: "Orange Asiatic Lilies, Chrysanthemums & Statice Bouquet",
    subtitle: "Autumn Gold Palette · Saffron Lilies & Purple Statice",
    category: "mixed",
    subCategory: "lilies",
    price: 3600,
    originalPrice: 4300,
    badge: "Vibrant",
    image: [
      "images/IMG_0249_3600.jpg"
    ],
    rating: 4.9,
    reviewCount: 30,
    flowers: "Saffron Orange Asiatic Lilies, White Chrysanthemums, Purple Statice",
    boxType: "Artisan Dual-Layer Wrap",
    boxColors: ["Terracotta Orange", "Natural Kraft", "Charcoal"],
    stemOptions: [
      { label: "Deluxe Bouquet", price: 3600, default: true },
      { label: "Grandeur Bouquet", price: 4800 }
    ],
    occasions: ["celebration", "congratulations", "festive", "housewarming"],
    description: "Vivid orange lilies contrasted with rich purple statice and snowy chrysanthemums create an electrifying bouquet.",
    careInstructions: "Change water every 2 days to maintain bright petal vitality."
  },
  {
    id: "prod-0253",
    name: "Pink & Red Roses Duo Bouquet",
    subtitle: "Classic Harmony · Two-Tone Romance",
    category: "roses",
    subCategory: "classic",
    price: 1200,
    originalPrice: 1500,
    badge: "Popular",
    image: [
      "images/IMG_0253_1200.jpg"
    ],
    rating: 4.8,
    reviewCount: 46,
    flowers: "Scarlet Red Roses, Blush Pink Roses & Green Accents",
    boxType: "Layered Kraft & Blush Tissue Wrap",
    boxColors: ["Kraft Natural", "Rose Pink", "Jet Black"],
    stemOptions: [
      { label: "Classic (12 Stems)", price: 1200, default: true },
      { label: "Deluxe (22 Stems)", price: 1900 }
    ],
    occasions: ["anniversary", "birthday", "romance"],
    description: "A delightful duo of radiant crimson and tender pink roses signifying passion and sweet devotion.",
    careInstructions: "Trim stem ends and add floral food to vase water."
  },
  {
    id: "prod-0001",
    name: "Pure White Avalanche Roses Bouquet",
    subtitle: "Signature White Roses · Elegance Hand-Tied Wrap",
    category: "roses",
    subCategory: "classic",
    price: 1400,
    originalPrice: 1750,
    badge: "Bestseller",
    image: [
      "images/IMG_0001_1400.jpg"
    ],
    rating: 5.0,
    reviewCount: 42,
    flowers: "Pure White Avalanche Roses, Baby's Breath & Fresh Eucalyptus",
    boxType: "Hand-Tied Premium Kraft & Satin Ribbon",
    boxColors: ["Pure White", "Parisian Ivory", "Midnight Black"],
    stemOptions: [
      { label: "Classic (12 Stems)", price: 1400, default: true },
      { label: "Deluxe (20 Stems)", price: 2100 },
      { label: "Grandeur (30 Stems)", price: 2900 }
    ],
    occasions: ["anniversary", "wedding", "sympathy", "birthday"],
    description: "An ethereal bouquet of freshly harvested pure white Avalanche roses with whisper-soft baby's breath, tied with a delicate silk ribbon.",
    careInstructions: "Trim stems 1cm diagonally upon delivery. Place in cold water away from direct sun."
  },
  {
    id: "prod-0320",
    name: "White Lilies & Pink Two-Tone Roses Petite Bouquet",
    subtitle: "Petite Luxe · Fresh Oriental Lily & Blush Roses",
    category: "lilies",
    subCategory: "mixed",
    price: 1200,
    originalPrice: 1500,
    badge: "Value Pick",
    image: [
      "images/IMG_0320_1200.png"
    ],
    rating: 4.8,
    reviewCount: 31,
    flowers: "White Lilies, Blush Pink Roses & Green Foliage",
    boxType: "Artisan Hand-Tied Wrap",
    boxColors: ["Cream Alabaster", "Dusty Pink", "Sage Green"],
    stemOptions: [
      { label: "Petite Bouquet", price: 1200, default: true },
      { label: "Deluxe Bouquet", price: 1850 }
    ],
    occasions: ["gratitude", "thinkingofyou", "birthday"],
    description: "A compact yet lavish arrangement combining fragrant white lilies with soft pink roses.",
    careInstructions: "Keep stems hydrated with fresh clean water."
  },
  {
    id: "prod-0330",
    name: "White Lilies & Pink Chrysanthemums Grand Display",
    subtitle: "Regal Elegance · Scented White Lilies & Pastel Blooms",
    category: "lilies",
    subCategory: "fan",
    price: 3600,
    originalPrice: 4400,
    badge: "Signature",
    image: [
      "images/IMG_0330_3600.png"
    ],
    rating: 5.0,
    reviewCount: 40,
    flowers: "Pure White Oriental Lilies, Pink Chrysanthemums, Purple Statice",
    boxType: "Royal Fan Silhouette Wrap",
    boxColors: ["Lilac Purple", "Alabaster White", "Pale Mint"],
    stemOptions: [
      { label: "Grand Display", price: 3600, default: true },
      { label: "Majestic Display", price: 4900 }
    ],
    occasions: ["wedding", "anniversary", "housewarming", "vip"],
    description: "Grand white oriental lilies burst from a cradle of pastel pink chrysanthemums, exuding timeless royalty.",
    careInstructions: "Mist petals lightly in dry climates."
  },
  {
    id: "prod-0342",
    name: "White Roses & Purple Asters Bouquet",
    subtitle: "Crisp & Cheerful · Snowflake White Roses & Asters",
    category: "roses",
    subCategory: "mixed",
    price: 1100,
    originalPrice: 1400,
    badge: "Fresh Pluck",
    image: [
      "images/IMG_0342_1100.jpg"
    ],
    rating: 4.8,
    reviewCount: 29,
    flowers: "White Roses, Purple Aster Daisies & Eucalyptus",
    boxType: "Crisp Blue & White Wrap",
    boxColors: ["Cornflower Blue", "Snow White", "Kraft"],
    stemOptions: [
      { label: "Classic Bouquet", price: 1100, default: true },
      { label: "Deluxe Bouquet", price: 1700 }
    ],
    occasions: ["birthday", "getwellsoon", "thankyou"],
    description: "Bright purple asters playful mingle with snow-white roses for a refreshing and uplifting gift.",
    careInstructions: "Trim stems 1cm every other day."
  },
  {
    id: "prod-0363",
    name: "Pure White Holland Tulips Elegant Bouquet",
    subtitle: "Imported Dutch Tulips · Sculptural Modern Floristry",
    category: "tulips",
    subCategory: "tulips",
    price: 3500,
    originalPrice: 4200,
    badge: "Haute Luxe",
    image: [
      "images/IMG_0363_3500.jpg"
    ],
    rating: 5.0,
    reviewCount: 34,
    flowers: "Grade-A Dutch White Tulips & Minimalist Foliage",
    boxType: "Architectural Pleated Snow Wrap with Silk Ribbons",
    boxColors: ["Pure White", "Minimalist Slate", "Gold Kraft"],
    stemOptions: [
      { label: "Grand Bouquet (25 Stems)", price: 3500, default: true },
      { label: "Royal Bouquet (40 Stems)", price: 5200 }
    ],
    occasions: ["wedding", "corporate", "anniversary", "luxury"],
    description: "An expansive, sculpted bouquet of prime Dutch white tulips that embody pure luxury and modern architectural flair.",
    careInstructions: "Tulips thrive in ice-cold water. Avoid direct warm sunlight."
  },
  {
    id: "prod-0428",
    name: "Majestic Pink Spray Roses, White Tulips & Lilies Fan Bouquet",
    subtitle: "The Empress Fan · Multi-Flower Monumental Artistry",
    category: "luxury",
    subCategory: "fan",
    price: 9200,
    originalPrice: 11000,
    badge: "Royal Special",
    image: [
      "images/IMG_0428_9200.jpg"
    ],
    rating: 5.0,
    reviewCount: 22,
    flowers: "Pink Spray Roses, Dutch White Tulips, Stargazer Lilies, Purple Statice & Orchids",
    boxType: "Royal Giant Fan Presentation Wrap with Hand-Tied Rosette",
    boxColors: ["Emerald Green", "Royal Purple", "Gold Lustre"],
    stemOptions: [
      { label: "Empress Fan Arrangement", price: 9200, default: true }
    ],
    occasions: ["wedding", "grandcelebration", "milestone", "vip"],
    description: "A colossal, breathless floral creation featuring hundreds of select blooms in a dramatic peacock fan presentation.",
    careInstructions: "Keep in a cool room. Replenish hydration base every morning."
  },
  {
    id: "prod-0449",
    name: "Pink Lilies & Dual Chrysanthemums Bouquet",
    subtitle: "Harmonious Pastels · Scented Lilies & Daisy Blooms",
    category: "lilies",
    subCategory: "mixed",
    price: 3600,
    originalPrice: 4300,
    badge: "Trending",
    image: [
      "images/IMG_0449_3600.jpg"
    ],
    rating: 4.9,
    reviewCount: 38,
    flowers: "Pink Oriental Lilies, Maroon Chrysanthemums, White Spray Daisies",
    boxType: "Dual Tone Scalloped Wrap",
    boxColors: ["Pastel Lilac", "Soft Peach", "Ivory"],
    stemOptions: [
      { label: "Deluxe Bouquet", price: 3600, default: true },
      { label: "Grandeur Bouquet", price: 4700 }
    ],
    occasions: ["birthday", "anniversary", "family", "celebration"],
    description: "Lush pink oriental lilies accompanied by maroon and white daisy blooms in a stylish scalloped wrap.",
    careInstructions: "Place in fresh water with preservative."
  },
  {
    id: "prod-0476",
    name: "Vogue Red Roses Newspaper Wrap Bouquet",
    subtitle: "Parisian Street Style · Editorial Vintage Newspaper Wrap",
    category: "roses",
    subCategory: "classic",
    price: 1400,
    originalPrice: 1750,
    badge: "Trending",
    image: [
      "images/IMG_0476_1400.jpg"
    ],
    rating: 4.9,
    reviewCount: 56,
    flowers: "Long-Stem Scarlet Red Roses, Baby's Breath & Eucalyptus",
    boxType: "Authentic Parisian French Newsprint Wrap with Jute String",
    boxColors: ["Parisian Gazette Kraft", "Vintage Ivory", "Matte Noir"],
    stemOptions: [
      { label: "Classic (12 Stems)", price: 1400, default: true },
      { label: "Deluxe (20 Stems)", price: 2100 },
      { label: "Grandeur (35 Stems)", price: 3200 }
    ],
    occasions: ["romance", "anniversary", "birthday", "instagram"],
    description: "The viral Parisian aesthetic: fresh velvety red roses wrapped in authentic vintage French newsprint with natural twine.",
    careInstructions: "Cut stems 1cm diagonally and place in a glass vase."
  },
  {
    id: "prod-0479",
    name: "Romantic Roses & Chrysanthemums Petite Bouquet",
    subtitle: "Sweet Romance · Hand-Tied Fresh Kraft Wrap",
    category: "roses",
    subCategory: "mixed",
    price: 950,
    originalPrice: 1200,
    badge: "Value Pick",
    image: [
      "images/IMG_0479_950.jpg"
    ],
    rating: 4.8,
    reviewCount: 48,
    flowers: "Red Roses, Pink Spray Roses, White Chrysanthemums & Greenery",
    boxType: "Soft Kraft Wrap with Silk Ribbon",
    boxColors: ["Natural Kraft", "Dusty Pink", "Ruby Red"],
    stemOptions: [
      { label: "Petite Wrap", price: 950, default: true },
      { label: "Deluxe Wrap", price: 1550 }
    ],
    occasions: ["romance", "anniversary", "sorry", "love"],
    description: "A heartwarming gift bundle of fresh blooms paired with a customizable handwritten love card.",
    careInstructions: "Keep in water; card can be kept as a keepsake."
  },
  {
    id: "prod-0481",
    name: "Pink Lilies & Peach Roses Grand Bouquet",
    subtitle: "Grandeur Bloom · Royal Lilies & Delicate Peach Roses",
    category: "lilies",
    subCategory: "mixed",
    price: 3600,
    originalPrice: 4400,
    badge: "Popular",
    image: [
      "images/IMG_0481_3600.jpg"
    ],
    rating: 4.9,
    reviewCount: 41,
    flowers: "Pink Oriental Lilies, Peach Roses, White Chrysanthemums & Baby's Breath",
    boxType: "Pastel Layered Presentation Wrap",
    boxColors: ["Blush Pink", "Champagne Gold", "Snow White"],
    stemOptions: [
      { label: "Grand Bouquet", price: 3600, default: true },
      { label: "Royal Bouquet", price: 4900 }
    ],
    occasions: ["anniversary", "wedding", "birthday", "celebration"],
    description: "Sumptuous pink oriental lilies harmonized with delicate peach roses and sparkling baby's breath.",
    careInstructions: "Change vase water every 48 hours."
  },
  {
    id: "prod-0737",
    name: "Golden Sunflower & Chrysanthemums Kraft Bouquet",
    subtitle: "Radiant Sunshine · Golden Sunflower & Autumn Blooms",
    category: "mixed",
    subCategory: "classic",
    price: 1000,
    originalPrice: 1600,
    badge: "Sunshine",
    image: [
      "images/IMG_0737_1300.png"
    ],
    rating: 4.9,
    reviewCount: 33,
    flowers: "Golden Sunflower, Yellow & White Chrysanthemums, Purple Statice",
    boxType: "Natural Kraft & Burlap Wrap",
    boxColors: ["Natural Brown Kraft", "Sunflower Yellow", "Sage Green"],
    stemOptions: [
      { label: "Sunshine Classic (1 Stem)", price: 1000, default: true },
      { label: "Sunshine Deluxe (3 Stem)", price: 1500 },
      { label: "Sunshine Royal (5 Stem)", price: 2000 }
    ],
    occasions: ["birthday", "cheerup", "getwellsoon", "friendship"],
    description: "Brighten anyone's day instantly with a glowing golden sunflower nestled among sunny chrysanthemums and purple statice.",
    careInstructions: "Sunflowers adore plenty of water and bright ambient light."
  },
  {
    id: "prod-0740",
    name: "White Lilies & Champagne Roses Chic Bouquet",
    subtitle: "Monochrome Haute Couture · Pure White & Champagne Tones",
    category: "lilies",
    subCategory: "luxury",
    price: 2500,
    originalPrice: 4200,
    badge: "Editorial Pick",
    image: [
      "images/IMG_0740_3500.png"
    ],
    rating: 5.0,
    reviewCount: 39,
    flowers: "White Casablanca Lilies, Champagne Roses, White Asters & Salal",
    boxType: "Sleek Parisian White & Black Trim Wrap",
    boxColors: ["Pure Alabaster", "Ivory Gold", "Midnight Slate"],
    stemOptions: [
      { label: "Deluxe Bouquet", price: 2500, default: true },
      { label: "Grandeur Bouquet", price: 3500 }
    ],
    occasions: ["wedding", "anniversary", "corporate", "luxury"],
    description: "A pristine high-fashion bouquet combining regal Casablanca lilies and champagne roses wrapped in sleek monochrome.",
    careInstructions: "Keep in a cool room; trim stems every 2 days."
  },
  {
    id: "prod-0741",
    name: "Pretty Purple & Pink Mixed Blooms Bouquet",
    subtitle: "Vibrant Palette · Purple Chrysanthemums & Pink Roses",
    category: "mixed",
    subCategory: "classic",
    price: 1500,
    originalPrice: 1850,
    badge: "Popular",
    image: [
      "images/IMG_0741_1500.png"
    ],
    rating: 4.8,
    reviewCount: 32,
    flowers: "Purple Button Mums, Pink Spray Roses, White Asters & Gypsophila",
    boxType: "Lilac & Pink Layered Wrap",
    boxColors: ["Lilac Purple", "Rose Pink", "Opal White"],
    stemOptions: [
      { label: "Classic Bouquet", price: 1500, default: true },
      { label: "Deluxe Bouquet", price: 2150 }
    ],
    occasions: ["birthday", "thankyou", "celebration"],
    description: "A playful harmony of jewel-toned purple chrysanthemums and blush pink roses that brings immediate joy.",
    careInstructions: "Change water regularly to keep blooms fresh."
  },
  {
    id: "prod-0742",
    name: "Crimson Lilies & White Roses Bouquet",
    subtitle: "Dramatic Contrast · Scarlet Asiatic Lilies & Snow Roses",
    category: "lilies",
    subCategory: "mixed",
    price: 3500,
    originalPrice: 3800,
    badge: "Value Pick",
    image: [
      "images/IMG_1691_3500.png"
    ],
    rating: 4.8,
    reviewCount: 26,
    flowers: "Deep Crimson Lilies, White Roses, Chrysanthemums & Baby's Breath",
    // boxType: "Two-Tone Kraft Wrap",
    boxColors: ["Butter Yellow", "Snow White", "Charcoal Slate"],
    stemOptions: [
      { label: "Classic Bouquet (60 Flowers & 2 Oriental Lilies)", price: 3500, default: true },
      { label: "Deluxe Bouquet (100 Oriental Lilies & 2 Oriental Lilies)", price: 6000 },
    ],
    occasions: ["anniversary", "birthday", "romance"],
    description: "Bold Oriental lilies paired with delicate white roses create an energetic and stylish contrast.",
    careInstructions: "Trim stems diagonally and keep in fresh water."
  },
  {
    id: "prod-0743",
    name: "Pink Gerberas & Baby's Breath Bouquet",
    subtitle: "Sweet Cheerful Blooms · Vibrant Daisy Gerberas",
    category: "mixed",
    subCategory: "classic",
    price: 950,
    originalPrice: 1200,
    badge: "Value Pick",
    image: [
      "images/IMG_0743_950.png"
    ],
    rating: 4.8,
    reviewCount: 35,
    flowers: "Vibrant Pink Gerberas, Gypsophila & Fresh Greenery",
    boxType: "Pastel Pink Kraft Wrap",
    boxColors: ["Pastel Pink", "Natural Kraft", "White"],
    stemOptions: [
      { label: "Classic Bouquet", price: 950, default: true },
      { label: "Deluxe Bouquet", price: 1450 }
    ],
    occasions: ["birthday", "cheerup", "friendship", "getwellsoon"],
    description: "Radiant pink gerberas radiating joy and enthusiasm, wrapped with tender baby's breath.",
    careInstructions: "Gerberas prefer clean water in shallow vase to prevent stem softening."
  },
  {
    id: "prod-0755",
    name: "White Lisianthus & Pink Carnations Hand Bouquet",
    subtitle: "Gentle Romance · Lisianthus & Ruffled Carnations",
    category: "mixed",
    subCategory: "classic",
    price: 2900,
    originalPrice: 3500,
    badge: "Florist Choice",
    image: [
      "images/IMG_0755_2900.jpg"
    ],
    rating: 4.9,
    reviewCount: 30,
    flowers: "White Lisianthus, Pink Carnations, White Chrysanthemums & Greenery",
    boxType: "Alabaster Paper Wrap with Silk Ribbon",
    boxColors: ["Alabaster Cream", "Soft Blush", "Sage Grey"],
    stemOptions: [
      { label: "Deluxe Bouquet", price: 2900, default: true },
      { label: "Grandeur Bouquet", price: 3900 }
    ],
    occasions: ["anniversary", "gratitude", "wedding", "birthday"],
    description: "Ruffled pink carnations and delicate lisianthus blossoms wrapped in creamy European paper.",
    careInstructions: "Keep in cool indoor air; mist lightly daily."
  },
  {
    id: "prod-0759",
    name: "Purple & White Chrysanthemums Bouquet with Love Card",
    subtitle: "Romantic Gift Set · Two-Tone Scalloped Wrap & Card",
    category: "mixed",
    subCategory: "mixed",
    price: 1600,
    originalPrice: 1950,
    badge: "Gift Set",
    image: [
      "images/IMG_0759_1600.jpg"
    ],
    rating: 4.9,
    reviewCount: 34,
    flowers: "Purple Chrysanthemums, White Spray Daisies & Heart Message Card",
    boxType: "Scalloped Lavender & Pink Wrap with White Satin Bow",
    boxColors: ["Lavender Purple", "Powder Pink", "Snow White"],
    stemOptions: [
      { label: "Gift Set with Card", price: 1600, default: true },
      { label: "Deluxe Gift Set", price: 2250 }
    ],
    occasions: ["anniversary", "birthday", "romance", "specialmoment"],
    description: "Deep purple chrysanthemums and pristine white daisies wrapped in scalloped pink wrap, finished with a heart-shaped card.",
    careInstructions: "Change water every 2 days; chrysanthemums last exceptionally long."
  },
  {
    id: "prod-0930",
    name: "White Oriental Lilies, Pink Lisianthus & Roses Bouquet",
    subtitle: "Opulent Harmony · Scented Lilies & Garden Roses",
    category: "lilies",
    subCategory: "luxury",
    price: 3800,
    originalPrice: 4600,
    badge: "Haute Luxe",
    image: [
      "images/IMG_0930_3800.jpg"
    ],
    rating: 5.0,
    reviewCount: 43,
    flowers: "White Oriental Lilies, Pink Lisianthus, Avalanche Roses & Eucalyptus",
    boxType: "French Artisanal Pleated Wrap",
    boxColors: ["Pure White", "Slate Charcoal", "Champagne"],
    stemOptions: [
      { label: "Grand Bouquet", price: 3800, default: true },
      { label: "Imperial Bouquet", price: 5200 }
    ],
    occasions: ["wedding", "anniversary", "luxury", "vip"],
    description: "An aristocratic arrangement of grand scented white lilies, delicate pink lisianthus, and immaculate roses.",
    careInstructions: "Keep in a cool room and trim stems diagonally."
  },
  {
    id: "prod-0945",
    name: "Grand Luxe Stargazer Lilies, Roses & Mixed Blooms Arrangement",
    subtitle: "Monumental Exhibition · Multi-Bloom Grandeur",
    category: "luxury",
    subCategory: "fan",
    price: 7200,
    originalPrice: 8800,
    badge: "Masterpiece",
    image: [
      "images/IMG_0945_7200.png"
    ],
    rating: 5.0,
    reviewCount: 29,
    flowers: "Stargazer Lilies, Two-Tone Garden Roses, Purple Statice, Gerberas & Chrysanthemums",
    boxType: "Sage Green Sculpted Multi-Tier Presentation Display",
    boxColors: ["Sage Green", "Royal Lilac", "Champagne Gold"],
    stemOptions: [
      { label: "Grand Luxe Display (Over 50 Stems)", price: 7200, default: true }
    ],
    occasions: ["wedding", "engagement", "grandcelebration", "vip"],
    description: "A monumental floral architecture boasting dozens of prime blooms handcrafted for high-profile celebrations and milestone galas.",
    careInstructions: "Keep hydrated daily with cold clean water."
  },
  {
    id: "prod-0958",
    name: "Bridal Posy White Roses & Chrysanthemums Bouquet",
    subtitle: "Handcrafted Bridal Posy · Lace-Wrapped Stems",
    category: "roses",
    subCategory: "classic",
    price: 1700,
    originalPrice: 2100,
    badge: "Bridal Pick",
    image: [
      "images/IMG_0958_1700.jpg"
    ],
    rating: 5.0,
    reviewCount: 37,
    flowers: "White Roses, Pink & Purple Chrysanthemums, Carnations, Lace Wrap",
    boxType: "Hand-Held Posy with Vintage Lace Stem Wrap",
    boxColors: ["Vintage Lace & White", "Ivory Cream", "Pastel Blush"],
    stemOptions: [
      { label: "Bridal Posy Bouquet", price: 1700, default: true },
      { label: "Grand Bridal Posy", price: 2500 }
    ],
    occasions: ["wedding", "bridesmaid", "photoshoot", "anniversary"],
    description: "Exquisite hand-held bridal posy featuring dense white roses and delicate lace-trimmed stems.",
    careInstructions: "Place in shallow water before ceremony."
  },
  {
    id: "prod-1050",
    name: "Stargazer Lilies, Gerberas & Coral Roses Grand Bouquet",
    subtitle: "Vibrant Tropical Twilight · Lilies, Gerberas & Coral Blooms",
    category: "lilies",
    subCategory: "fan",
    price: 4000,
    originalPrice: 4900,
    badge: "Bestseller",
    image: [
      "images/IMG_1050_4000.jpg"
    ],
    rating: 4.9,
    reviewCount: 45,
    flowers: "Pink Stargazer Lilies, Coral Roses, Pink Gerberas, Chrysanthemums & Gypsophila",
    boxType: "Mint Green Pleated Fan Wrap with Greeting Card",
    boxColors: ["Mint Green", "Pastel Rose", "Opal Cream"],
    stemOptions: [
      { label: "Grand Bouquet", price: 4000, default: true },
      { label: "Royal Fan", price: 5400 }
    ],
    occasions: ["anniversary", "birthday", "celebration", "wedding"],
    description: "An exuberant fan bouquet overflowing with bright stargazer lilies, pink gerberas, coral roses, and starry gypsophila.",
    careInstructions: "Keep in a cool room and trim stems every 2 days."
  },
  {
    id: "prod-1100",
    name: "White Roses, Coral Spray Roses & Purple Statice Bouquet",
    subtitle: "Wildflower Elegance · Coral Rosebuds & Purple Statice",
    category: "roses",
    subCategory: "mixed",
    price: 2000,
    originalPrice: 2500,
    badge: "Trending",
    image: [
      "images/IMG_1100_2000.jpg"
    ],
    rating: 4.9,
    reviewCount: 31,
    flowers: "White Roses, Coral Spray Roses, Purple Statice & Button Mums",
    boxType: "Two-Tone Lavender & Cream Wrap",
    boxColors: ["Lavender Purple", "Cream White", "Slate"],
    stemOptions: [
      { label: "Classic Bouquet", price: 2000, default: true },
      { label: "Deluxe Bouquet", price: 2800 }
    ],
    occasions: ["birthday", "anniversary", "gratitude", "thinkingofyou"],
    description: "Delightful coral spray roses and snowy white roses surrounded by enduring purple statice blossoms.",
    careInstructions: "Statice dries beautifully if preserved after water is removed."
  },
  {
    id: "prod-0926",
    name: "Gerbera Daisy, Chrysanthemum, Roses & Mixed Greenery",
    subtitle: "Gerbera Daisy, Chrysanthemum, Roses & Mixed Greenery",
    category: "mixed",
    subCategory: "mixed",
    price: 1250,
    originalPrice: 1950,
    badge: "Bestseller",
    image: [
      "images/IMG_1610_1200.png"
    ],
    rating: 4.9,
    reviewCount: 37,
    flowers: "Gerbera Daisy, Chrysanthemum, Roses & Mixed Greenery",
    boxType: "Soft Petal Pink Wrap with Satin Ribbon",
    boxColors: ["Buttery Yellow", "Burgundy", "Blush Pink"],
    stemOptions: [
      { label: "Classic (20 Stems)", price: 1250, default: true },
      { label: "Deluxe (40 Stems)", price: 2000 }
    ],
    occasions: ["birthday", "proposals", "newbeginnings"],
    description: "A stunning and vibrant bouquet featuring a mix of Gerbera daisies, chrysanthemums, and roses, complemented by fresh greenery. Perfect for adding a pop of color to any occasion.",
    careInstructions: "Keep in a cool shaded area for long lasting blooms."
  },
];

/**
 * Calculates accurate delivery timeline based on flower composition:
 * - Tulips & Hydrangeas: 4 days
 * - Lilies: 3 days
 * - All other bouquets: 1 day
 */
function getProductDeliveryInfo(product) {
  if (!product) {
    return { days: 1, badgeText: "Delivery in 1 Day", badgeClass: "badge-green", detailText: "Delivery within 1 day" };
  }

  const name = (product.name || "").toLowerCase();
  const category = (product.category || "").toLowerCase();
  const flowers = (product.flowers || "").toLowerCase();

  // 1. Tulips & Hydrangeas (4 Days)
  if (
    category.includes("tulip") || name.includes("tulip") || flowers.includes("tulip") ||
    category.includes("hydrangea") || name.includes("hydrangea") || flowers.includes("hydrangea")
  ) {
    const isHydrangea = category.includes("hydrangea") || name.includes("hydrangea") || flowers.includes("hydrangea");
    return {
      days: 4,
      badgeText: "Delivery in 4 Days",
      badgeClass: "badge-blue",
      detailText: isHydrangea ? "Delivery within 4 days (Fresh Hydrangeas)" : "Delivery within 4 days (Holland Tulips)",
      timeline: "4 days"
    };
  }

  // 2. Lilies (3 Days)
  if (category.includes("lilies") || category.includes("lily") || name.includes("lilies") || name.includes("lily") || flowers.includes("lil") || flowers.includes("stargazer")) {
    return {
      days: 3,
      badgeText: "Delivery in 3 Days",
      badgeClass: "badge-amber",
      detailText: "Delivery within 3 days (Fresh Lilies)",
      timeline: "3 days"
    };
  }

  // 3. Standard bouquets (1 Day)
  return {
    days: 1,
    badgeText: "Delivery in 1 Day",
    badgeClass: "badge-green",
    detailText: "Delivery within 1 day",
    timeline: "1 day"
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS_DATA, getProductDeliveryInfo };
}
