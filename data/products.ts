import type { Product } from '../types/domain';

export const PRODUCT_CATEGORIES = [
  "All",
  "Roti Making Machine",
  "Atta Dough Mixer",
  "Gravy Machine",
  "2-in-1 Pulverizer",
  "Flour Mill",
  "Vegetable Cutting Machine",
  "Chapati Bhatti",
  "Commercial Stove",
  "Flour Mixing Machine",
  "Wet Grinder",
  "Juice Machine",
  "Potato Peeler Machine",
  "Dryer Machine",
  "Deep Fryer",
  "Garlic Peeler Machine",
  "Oil Making Machine",
  "Other Machines",
];

export const PRODUCTS: Product[] = [
  // ROTI MAKING MACHINES
  { id: 1, name: "V3 Roti Making Machine", category: "Roti Making Machine", priceExcl: 33898, gst: 18, hsn: "84438000", desc: "Ideal for home & small commercial use. 0.5HP motor, compact design. 270×1600mm belt.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Home Use", featured: false },
  { id: 2, name: "VR-200 Roti Making Machine", category: "Roti Making Machine", priceExcl: 42373, gst: 18, hsn: "84438000", desc: "Perfect for small restaurants & dhabas. Belt size 340×1700mm. Speed control included.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Popular", featured: true },
  { id: 3, name: "VR-200 (+) Roti Making Machine", category: "Roti Making Machine", priceExcl: 50847, gst: 18, hsn: "84438000", desc: "Enhanced version with advanced speed control. Ideal for medium commercial kitchens.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Bestseller", featured: true },
  { id: 4, name: "VR-300 Roti Making Machine", category: "Roti Making Machine", priceExcl: 76271, gst: 18, hsn: "84438000", desc: "High-capacity commercial machine. Belt 400×2290mm, heavy duty for large kitchens.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Commercial", featured: true },
  { id: 5, name: "VR-300 (TG) Roti Making Machine", category: "Roti Making Machine", priceExcl: 89000, gst: 18, hsn: "84438000", desc: "TG model with top-grade components for large-scale roti production.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Heavy Duty", featured: false },
  { id: 6, name: "VR-600 Roti Making Machine", category: "Roti Making Machine", priceExcl: 101695, gst: 18, hsn: "84438000", desc: "Industrial grade. Belt 400×3500mm. Ideal for canteens, temples & large catering.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Industrial", featured: true },
  { id: 7, name: "VR-600 (L) Roti Making Machine", category: "Roti Making Machine", priceExcl: 93220, gst: 18, hsn: "84438000", desc: "Lite version of VR-600 — same high output, lighter frame for easier mobility.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Value", featured: false },
  { id: 8, name: "VR-600 (TG) Roti Making Machine", category: "Roti Making Machine", priceExcl: 122881, gst: 18, hsn: "84438000", desc: "Top-grade premium model with TG mechanism for perfect uniform roti output.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Premium", featured: true },
  { id: 9, name: "VR-600 (L+TG) Roti Making Machine", category: "Roti Making Machine", priceExcl: 116102, gst: 18, hsn: "84438000", desc: "Combined L and TG features — lightweight frame with TG precision.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Premium", featured: false },
  { id: 10, name: "VR-1000 Roti Making Machine (1HP)", category: "Roti Making Machine", priceExcl: 131356, gst: 18, hsn: "84438000", desc: "Heavy industrial 1HP roti making machine for bakeries & large institutions.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Industrial", featured: true },
  { id: 11, name: "VRT-200 (Double Gear & Motor)", category: "Roti Making Machine", priceExcl: 155932, gst: 18, hsn: "84438000", desc: "Double gear & motor for ultra-high production output. Super heavy duty.", warranty: "1 Year Motor · 5 Year Gear Box", tag: "Super Duty", featured: false },

  // ATTA DOUGH MIXER
  { id: 12, name: "Dough Mixer 5 KG (Indian Gear Box)", category: "Atta Dough Mixer", priceExcl: 16949, gst: 18, hsn: "84382000", desc: "5KG capacity with reliable Indian gear box. Ideal for small dhabas & restaurants.", warranty: "1 Year", tag: "Popular", featured: true },
  { id: 13, name: "Dough Mixer 5 KG (Italian Gear Box)", category: "Atta Dough Mixer", priceExcl: 20000, gst: 18, hsn: "84382000", desc: "5KG with premium Italian gear box — smoother operation & longer life.", warranty: "1 Year", tag: "Premium", featured: false },
  { id: 14, name: "Dough Mixer 10 KG (Indian Gear Box)", category: "Atta Dough Mixer", priceExcl: 27119, gst: 18, hsn: "84382000", desc: "10KG heavy-duty dough mixing for medium restaurants and catering.", warranty: "1 Year", tag: "Bestseller", featured: true },
  { id: 15, name: "Dough Mixer 10 KG (Italian Gear Box)", category: "Atta Dough Mixer", priceExcl: 29661, gst: 18, hsn: "84382000", desc: "10KG Italian gear box for smooth consistent dough every time.", warranty: "1 Year", tag: "Commercial", featured: false },
  { id: 16, name: "Dough Mixer 15 KG (Indian Gear Box)", category: "Atta Dough Mixer", priceExcl: 29661, gst: 18, hsn: "84382000", desc: "15KG for large kitchens, canteens and high-volume catering businesses.", warranty: "1 Year", tag: "Heavy Duty", featured: false },
  { id: 17, name: "Dough Mixer 15 KG (Italian Gear Box)", category: "Atta Dough Mixer", priceExcl: 32203, gst: 18, hsn: "84382000", desc: "15KG premium Italian gear box version for heavy-duty commercial use.", warranty: "1 Year", tag: "Premium", featured: false },
  { id: 18, name: "Dough Mixer 25 KG (Indian Gear Box)", category: "Atta Dough Mixer", priceExcl: 35593, gst: 18, hsn: "84382000", desc: "25KG industrial capacity for large bakeries and bulk dough production.", warranty: "1 Year", tag: "Industrial", featured: false },
  { id: 19, name: "Dough Mixer 25 KG (Italian Gear Box)", category: "Atta Dough Mixer", priceExcl: 40678, gst: 18, hsn: "84382000", desc: "25KG Italian gear box — top performance for high-volume industrial use.", warranty: "1 Year", tag: "Super Duty", featured: false },

  // GRAVY MACHINES
  { id: 20, name: "1 HP Gravy Machine", category: "Gravy Machine", priceExcl: 18644, gst: 18, hsn: "84382000", desc: "1HP gravy machine for restaurants. SS body, easy to clean, consistent grinding.", warranty: "1 Year", tag: "Popular", featured: true },
  { id: 21, name: "2 HP Gravy Machine (Deluxe)", category: "Gravy Machine", priceExcl: 24576, gst: 18, hsn: "84382000", desc: "2HP deluxe model for high-volume gravy and masala grinding.", warranty: "1 Year", tag: "Bestseller", featured: false },
  { id: 22, name: "2 HP Gravy Machine with Hammer", category: "Gravy Machine", priceExcl: 27119, gst: 18, hsn: "84382000", desc: "2HP with hammer — handles dry & wet grinding in one versatile machine.", warranty: "1 Year", tag: "Versatile", featured: false },
  { id: 23, name: "3 HP Gravy Machine", category: "Gravy Machine", priceExcl: 35593, gst: 18, hsn: "84382000", desc: "3HP heavy duty for large hotels, restaurants and institutional catering.", warranty: "1 Year", tag: "Commercial", featured: false },
  { id: 24, name: "5 HP Gravy Machine (Three Phase)", category: "Gravy Machine", priceExcl: 55932, gst: 18, hsn: "84382000", desc: "5HP 3-phase industrial gravy machine for bulk food processing units.", warranty: "1 Year", tag: "Industrial", featured: false },

  // PULVERIZER
  { id: 25, name: "2 HP Pulverizer (Semi Auto)", category: "2-in-1 Pulverizer", priceExcl: 18220, gst: 18, hsn: "84382000", desc: "2HP semi-auto 2-in-1 flour mill + pulverizer combo for restaurants.", warranty: "1 Year", tag: "Popular", featured: true },
  { id: 26, name: "2 HP Pulverizer (Fully Auto)", category: "2-in-1 Pulverizer", priceExcl: 21186, gst: 18, hsn: "84382000", desc: "2HP fully automatic — ideal for mid-size restaurants and flour mills.", warranty: "1 Year", tag: "Bestseller", featured: false },
  { id: 27, name: "3 HP Pulverizer (Semi Auto)", category: "2-in-1 Pulverizer", priceExcl: 21186, gst: 18, hsn: "84382000", desc: "3HP semi-auto 2-in-1 pulverizer for commercial kitchens & catering.", warranty: "1 Year", tag: "Commercial", featured: false },
  { id: 28, name: "3 HP Pulverizer (Fully Auto)", category: "2-in-1 Pulverizer", priceExcl: 28814, gst: 18, hsn: "84382000", desc: "3HP fully auto — most popular model for restaurants, caterers & mills.", warranty: "1 Year", tag: "Bestseller", featured: true },
  { id: 29, name: "5 HP Pulverizer (Semi) 2-in-1", category: "2-in-1 Pulverizer", priceExcl: 45763, gst: 18, hsn: "84382000", desc: "5HP semi-auto for large flour mills and industrial food processing.", warranty: "1 Year", tag: "Industrial", featured: false },
  { id: 30, name: "5 HP Pulverizer (Fully Auto) Double Chamber", category: "2-in-1 Pulverizer", priceExcl: 59322, gst: 18, hsn: "84382000", desc: "5HP double chamber — ultra-high capacity for large operations.", warranty: "1 Year", tag: "Super Duty", featured: false },

  // FLOUR MILL
  { id: 31, name: "1 HP Flour Mill", category: "Flour Mill", priceExcl: 14407, gst: 18, hsn: "84382000", desc: "1HP flour mill for small shops and home flour grinding.", warranty: "1 Year", tag: "Small", featured: false },
  { id: 32, name: "2 HP Flour Mill (2-in-1 SS)", category: "Flour Mill", priceExcl: 20339, gst: 18, hsn: "84382000", desc: "2HP SS 2-in-1 commercial flour mill for shops and medium grinding units.", warranty: "1 Year", tag: "Commercial", featured: true },

  // VEGETABLE CUTTING
  { id: 33, name: "1 HP Veg. Cutting Machine (Regular)", category: "Vegetable Cutting Machine", priceExcl: 10169, gst: 18, hsn: "84382000", desc: "1HP regular vegetable cutter with multiple cutting disc attachments.", warranty: "1 Year", tag: "Popular", featured: false },
  { id: 34, name: "1 HP Veg. Cutting Machine (Deluxe)", category: "Vegetable Cutting Machine", priceExcl: 13559, gst: 18, hsn: "84382000", desc: "1HP deluxe model with full SS body and heavy-duty precision blades.", warranty: "1 Year", tag: "Deluxe", featured: false },
  { id: 35, name: "2 HP Veg. Cutting Machine", category: "Vegetable Cutting Machine", priceExcl: 16949, gst: 18, hsn: "84382000", desc: "2HP heavy-duty vegetable cutter for large restaurants and hotels.", warranty: "1 Year", tag: "Heavy Duty", featured: false },

  // CHAPATI BHATTI
  { id: 36, name: "Chapati Bhatti 23×26 (Regular)", category: "Chapati Bhatti", priceExcl: 5085, gst: 18, hsn: "73211100", desc: "Standard chapati bhatti with efficient gas burner for small kitchens.", warranty: "1 Year", tag: "Popular", featured: true },
  { id: 37, name: "Chapati Bhatti 24×48 (Commercial)", category: "Chapati Bhatti", priceExcl: 20500, gst: 18, hsn: "73211100", desc: "Medium-large bhatti for restaurants, dhabas and catering businesses.", warranty: "1 Year", tag: "Commercial", featured: false },
  { id: 38, name: "Chapati Bhatti 8MM Sheet (Heavy Duty)", category: "Chapati Bhatti", priceExcl: 22195, gst: 18, hsn: "73211100", desc: "Heavy-duty 8mm sheet bhatti for high-volume chapati production.", warranty: "1 Year", tag: "Heavy Duty", featured: false },
  { id: 39, name: "Dosa Bhatti 24×50 (Gas)", category: "Chapati Bhatti", priceExcl: 28941, gst: 18, hsn: "73211100", desc: "Special dosa bhatti for making crispy dosas in large quantities.", warranty: "1 Year", tag: "Specialty", featured: false },

  // COMMERCIAL STOVES
  { id: 40, name: "SS 2 Burner Commercial Stove", category: "Commercial Stove", priceExcl: 3814, gst: 18, hsn: "73211100", desc: "Heavy-duty stainless steel 2-burner stove for all commercial kitchens.", warranty: "1 Year", tag: "Popular", featured: true },
  { id: 41, name: "SS 4 Burner Commercial Stove", category: "Commercial Stove", priceExcl: 8051, gst: 18, hsn: "73211100", desc: "4-burner SS stove for large kitchens, hotels and catering events.", warranty: "1 Year", tag: "Commercial", featured: false },

  // FLOUR MIXING
  { id: 42, name: "5 KG Flour Mixing Machine (L-Type)", category: "Flour Mixing Machine", priceExcl: 10169, gst: 18, hsn: "84382000", desc: "5KG L-Type spiral mixer for soft dough mixing in small bakeries.", warranty: "1 Year", tag: "Small", featured: false },
  { id: 43, name: "10 KG Flour Mixing Machine (L-Type)", category: "Flour Mixing Machine", priceExcl: 15254, gst: 18, hsn: "84382000", desc: "10KG commercial dough kneader for medium bakeries and restaurants.", warranty: "1 Year", tag: "Popular", featured: false },
  { id: 44, name: "25 KG Flour Mixing Machine (U-Type)", category: "Flour Mixing Machine", priceExcl: 28814, gst: 18, hsn: "84382000", desc: "25KG U-Type industrial flour mixer for large-scale production.", warranty: "1 Year", tag: "Industrial", featured: false },

  // WET GRINDER
  { id: 45, name: "5 Ltr. Wet Grinder (Table Top)", category: "Wet Grinder", priceExcl: 11864, gst: 18, hsn: "84382000", desc: "5L tabletop wet grinder for idli, dosa batter and chutney grinding.", warranty: "1 Year", tag: "Small", featured: false },
  { id: 46, name: "10 Ltr. Wet Grinder", category: "Wet Grinder", priceExcl: 16949, gst: 18, hsn: "84382000", desc: "10L for medium restaurants — smooth batter output every time.", warranty: "1 Year", tag: "Popular", featured: false },
  { id: 47, name: "20 Ltr. Tilting Wet Grinder", category: "Wet Grinder", priceExcl: 28814, gst: 18, hsn: "84382000", desc: "20L tilting model for large-scale idli dosa batter production.", warranty: "1 Year", tag: "Commercial", featured: false },

  // JUICE MACHINE
  { id: 48, name: "Sugarcane Juice Machine (Compact)", category: "Juice Machine", priceExcl: 20339, gst: 18, hsn: "84382000", desc: "Compact sugarcane juice extractor for juice shops and stalls.", warranty: "1 Year", tag: "Popular", featured: false },
  { id: 49, name: "Super Sugarcane Juice Machine", category: "Juice Machine", priceExcl: 33898, gst: 18, hsn: "84382000", desc: "Heavy-duty SS sugarcane crusher for high-volume juice operations.", warranty: "1 Year", tag: "Heavy Duty", featured: false },
  { id: 50, name: "Carrot / Fruit Juice Machine", category: "Juice Machine", priceExcl: 11864, gst: 18, hsn: "84382000", desc: "Multipurpose fruit and vegetable juice extractor for juice shops.", warranty: "1 Year", tag: "Versatile", featured: false },

  // GARLIC PEELER
  { id: 51, name: "Garlic Peeler Machine (1HP)", category: "Garlic Peeler Machine", priceExcl: 10169, gst: 18, hsn: "84382000", desc: "1HP efficient garlic peeling machine for restaurants and food processing.", warranty: "1 Year", tag: "Popular", featured: false },

  // OIL MAKING
  { id: 52, name: "Oil Making Machine (400 Watt)", category: "Oil Making Machine", priceExcl: 16949, gst: 18, hsn: "84382000", desc: "400W cold press oil extractor for groundnut, coconut and sesame.", warranty: "1 Year", tag: "Small", featured: false },
  { id: 53, name: "Oil Making Machine (1200 Watt)", category: "Oil Making Machine", priceExcl: 35847, gst: 18, hsn: "84382000", desc: "1200W commercial oil press for medium-scale oil extraction businesses.", warranty: "1 Year", tag: "Commercial", featured: false },

  // ACCESSORIES / SPARE PARTS / DIES
  { id: 54, name: "5 Inch Papad Cutting Die", category: "Other Machines", priceExcl: 7119, gst: 18, hsn: "84382000", desc: "SS 5-inch papad cutter die — works with all VR-series roti machines.", warranty: "6 Months", tag: "Accessory", featured: false },
  { id: 55, name: "3 Inch Papad Cutting Die", category: "Other Machines", priceExcl: 5508, gst: 18, hsn: "84382000", desc: "3-inch SS papad cutter die for VR-series machines.", warranty: "6 Months", tag: "Accessory", featured: false },
  { id: 56, name: "2 Inch Pani Puri Cutter Die", category: "Other Machines", priceExcl: 2542, gst: 18, hsn: "84382000", desc: "2-inch pani puri cutter die — perfect round puri every time.", warranty: "6 Months", tag: "Accessory", featured: false },
  { id: 57, name: "Nylon Roti Cutter 11 Inch", category: "Other Machines", priceExcl: 492, gst: 18, hsn: "84382000", desc: "Food-grade nylon roti cutter fits all standard VR-series machines.", warranty: "6 Months", tag: "Spare Part", featured: false },
  { id: 58, name: "8 Inch Roti Die Cutter (SS)", category: "Other Machines", priceExcl: 583, gst: 18, hsn: "84382000", desc: "SS 8-inch roti die cutter for VR-200/300/600 series machines.", warranty: "6 Months", tag: "Spare Part", featured: false },
  { id: 59, name: "Onion Slicer Machine", category: "Other Machines", priceExcl: 2966, gst: 18, hsn: "84382000", desc: "Fast onion slicing machine for restaurants and large kitchens.", warranty: "1 Year", tag: "Popular", featured: false },
  { id: 60, name: "Potato Peeler Machine 15 KG", category: "Potato Peeler Machine", priceExcl: 18644, gst: 18, hsn: "84382000", desc: "15KG capacity SS potato peeler for hotels, restaurants and caterers.", warranty: "1 Year", tag: "Commercial", featured: false },
  { id: 61, name: "Dryer Machine 10 KG", category: "Dryer Machine", priceExcl: 20339, gst: 18, hsn: "84382000", desc: "10KG food dryer for papads, vegetables and spices dehydration.", warranty: "1 Year", tag: "Small", featured: false },
  { id: 62, name: "Deep Fryer 5 Ltr. (SS)", category: "Deep Fryer", priceExcl: 8475, gst: 18, hsn: "73211100", desc: "5L SS deep fryer for small snack shops, cafes and restaurants.", warranty: "1 Year", tag: "Popular", featured: false },
];

export default PRODUCTS;
