export interface Property {
  id: string;
  name: string;
  location: string;
  description: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  heroImage: string;
  gallery: string[];
  coordinates: { lat: number; lng: number };
  status: 'COMING SOON' | 'IN DEVELOPMENT' | 'AVAILABLE';
  specs?: string[];
  formspreeEndpoint?: string;
}

export const properties: Property[] = [
  {
    id: "escarpa-boa-vista",
    name: "ESCARPA BOA VISTA",
    location: "Salema, Algarve",
    description: "A dramatic cliff-edge residence overlooking the Atlantic, where architecture meets the elements in perfect harmony. Engineered for longevity and sensory performance.",
    area: "400",
    bedrooms: "5",
    bathrooms: "5",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    coordinates: { lat: 37.0622, lng: -8.8236 },
    status: 'COMING SOON',
    specs: ["Cliff Edge", "Ocean View"],
    formspreeEndpoint: "https://formspree.io/f/mgornyyp"
  },
  {
    id: "panoramico",
    name: "PANORAMICO",
    location: "Boliqueime, Algarve",
    description: "Elevated living with 360-degree views of the Algarve coastline. A masterclass in thermal mass engineering and biophilic integration.",
    area: "320",
    bedrooms: "5",
    bathrooms: "4",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    coordinates: { lat: 37.1328, lng: -8.1581 },
    status: 'IN DEVELOPMENT',
    formspreeEndpoint: "https://formspree.io/f/mvzdwrry"
  },
  {
    id: "tavira-residences",
    name: "TAVIRA RESIDENCES",
    location: "Tavira, Algarve",
    description: "A collection of 15 premium apartments in the heart of Tavira, blending historical context with modern performance standards.",
    area: "80-110",
    bedrooms: "1-2-3",
    bathrooms: "1-2",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    coordinates: { lat: 37.1265, lng: -7.6499 },
    status: 'IN DEVELOPMENT',
    specs: ["15 Apartments"],
    formspreeEndpoint: "https://formspree.io/f/mrerykkw"
  },
  {
    id: "villa-quinta-do-lago",
    name: "VILLA QUINTA DO LAGO",
    location: "Quinta do Lago, Algarve",
    description: "Unrivaled luxury with private lake access. This estate represents the pinnacle of our Nordic-standard construction in the Algarve.",
    area: "650",
    bedrooms: "6",
    bathrooms: "6",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    coordinates: { lat: 37.0381, lng: -8.0181 },
    status: 'IN DEVELOPMENT',
    specs: ["Private Lake Access"],
    formspreeEndpoint: "https://formspree.io/f/mnjlgvza"
  },
  {
    id: "casa-da-natureza",
    name: "CASA DA NATUREZA",
    location: "Monchique, Algarve",
    description: "A secluded sanctuary embedded in the Monchique forest. Minimal form meets maximum acoustic isolation for absolute restorative silence.",
    area: "85",
    bedrooms: "2",
    bathrooms: "1",
    heroImage: "https://images.unsplash.com/photo-1500004443334-8951c41b1d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    coordinates: { lat: 37.3167, lng: -8.5500 },
    status: 'IN DEVELOPMENT',
    specs: ["Forest Setting"],
    formspreeEndpoint: "https://formspree.io/f/maqapjbq"
  },
  {
    id: "alma-luz",
    name: "ALMA LUZ",
    location: "Luz de Tavira, Algarve",
    description: "Three sculptural townhouses designed for seamless inside-outside living, featuring rooftop sanctuaries with private wellness facilities.",
    area: "150",
    bedrooms: "3",
    bathrooms: "3",
    heroImage: "https://images.unsplash.com/photo-1628744448840-55bab14d186c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    coordinates: { lat: 37.0910, lng: -7.7032 },
    status: 'AVAILABLE',
    specs: ["3 x Townhouse", "Rooftop BBQ", "Spa & Gym"],
    formspreeEndpoint: "https://formspree.io/f/mlgapnnb"
  },
  {
    id: "casa-raul-lino",
    name: "CASA RAUL LINO",
    location: "Azeitão, Setúbal",
    description: "A heritage masterpiece restored to modern performance standards. Exploring the Luso-Moorish influences through a contemporary lens.",
    area: "850",
    bedrooms: "12 Rooms",
    bathrooms: "14",
    heroImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
       "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    coordinates: { lat: 38.5194, lng: -8.9958 },
    status: 'AVAILABLE',
    formspreeEndpoint: "https://formspree.io/f/mzdyjggv"
  },
  {
    id: "casa-luz",
    name: "CASA LUZ",
    location: "Praia da Luz, Algarve",
    description: "A singular acquisition in one of Europe's most desirable coastal regions. Designed for longevity, health, and measurable performance.",
    area: "225",
    bedrooms: "4",
    bathrooms: "4",
    heroImage: "https://images.unsplash.com/photo-1602343168117-bb8917323948?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
    ],
    coordinates: { lat: 37.0864, lng: -8.7297 },
    status: 'AVAILABLE',
    specs: ["450 m² Plot", "Pool", "Spa & Gym"],
    formspreeEndpoint: "https://formspree.io/f/meevrkkl"
  }
];
