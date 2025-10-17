import type { EventDto } from "@/app/model/event.model";

export const recentEvents: EventDto[] = [
  {
    id: 1,
    title: "Conférence sur la technologie",
    date: "2024-07-15",
    organizer: "Tech Innovators",
    category: "Technologie",
    status: "published"
  },
  {
    id: 2,
    title: "Festival de musique d'été",
    date: "2024-08-20",
    organizer: "Music Events Inc.",
    category: "Musique",
    status: "published"
  },
  {
    id: 3,
    title: "Atelier de cuisine",
    date: "2024-09-10",
    organizer: "Culinary Arts Academy",
    category: "Cuisine",
    status: "draft"
  },
  {
    id: 4,
    title: "Salon de l'art",
    date: "2024-10-05",
    organizer: "Artistic Expressions",
    category: "Art",
    status: "published"
  },
  {
    id: 5,
    title: "Séminaire sur le marketing",
    date: "2024-11-12",
    organizer: "Marketing Solutions Ltd.",
    category: "Marketing",
    status: "published"
  }
];


// Données d'exemple
export const SAMPLE_EVENTS = [
  {
    id: '1',
    name: 'WebDev Conference 2024',
    date: '28-30 Août 2024',
    location: 'Paris Convention Center',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVAEQiUaU1ld3FX7okKkeLfrd7o2YD6zfFi33GLhhVcjoyaftdpt3X41Go4VB0JQwpxfLPxP0OGtbPFge2w8i51-eHjzHdmR2vktNkTi1iPuwvQJ6_YEq20jdNtKICpyZgAIyj0MG6wOzJ9LkQZKvE37Wdvqhh7ad9bXOEV5G8qgTqSX1duvDmhBSjsyOWOdQ08Upq0Q0CEAcykvLPWd6uYfqQBhz-52_Fw-Nx1s0tjYURSgZiIu4JzmTUv2NbmZJ26A-2q_xQnmw',
    organizer: 'Tech Events Inc.'
  },
  {
    id: '2',
    name: 'Summer Music Festival',
    date: '15-17 Juillet 2024',
    location: 'Nice, Promenade des Anglais',
    logoUrl: 'https://via.placeholder.com/160x40/0fa985/ffffff?text=MUSIC+FEST',
    organizer: 'Music Productions'
  }
];

export const SAMPLE_PARTICIPANTS = [
  {
    id: '1234-5678-9012',
    name: 'Alexandre Dubois',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn3gmTjbNADFTViPctmD2vCvMeJnj8VRPpDwWDrIpZ3zyoxS0U-kLm4kQDCS-R95JQIrikBaqJjELyGMuyYWVXyLnHFYgJlerbPdm11Ksa_lEJnKlJ4GkNwSNYe_WiIsg_agP4csKmSzn33Z8JrcbagjqBcwKOuiHPqt78V7hLxoeaqtkm550a5FNSIp8WATX3V_USdhLAa0JewGMMwoRlDH2I_wB3joQ2j-OVOiU2d6YaiQIM0Nw8c4TEkoDGUgj0iIKykXwQjp8',
    role: 'Frontend Developer',
    company: 'TechCorp'
  },
  {
    id: '9876-5432-1098',
    name: 'Marie Lambert',
    photoUrl: 'https://ui-avatars.com/api/?name=Marie+Lambert&background=0fa985&color=fff&size=128',
    role: 'UX Designer',
    company: 'DesignStudio'
  }
];




export const favoriteEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    description: "Vibrez au son de vos artistes préférés.",
    date: "5-7 Août",
    location: "Los Angeles, CA",
    isFavorite: true,
    price: 89,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWZQVYMleShA9WIYc_886hVb1SBdb9pMLpKhk7I-yAdkHfICIFBA0nt6AuNNKuZAVehNDT30lux__oSJT60hJAqaOzuWzselCOtJ9bJ-waCnTa7Lc9CpkYmseslqDafWkZdp3-i2me_SZgvsJz5Fr3j0dVT9nQvtF3VtdFiqABFfSzB0yhcSH94c23n9wqzfxd2p20Sj1tX3kLEgKnRKwWtksBWgrD_em42_Kn0k4TDCyGVLlxdMdNpMHIRcqxv6EeUyG9x9gGIQU",
    organizer: "Live Nation",
    category: "Musique",
    status: "published",
    sales: 12500,
    capacity: 20000
  },
  {
    id: 2,
    title: "Festival des Arts Culinaires",
    description: "Une célébration de la gastronomie mondiale.",
    date: "12-14 Oct",
    location: "Paris, FR",
    isFavorite: true,
    price: 65,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZU3MZtP2OVGPK5aNMpL-6hEH_zEXz6br_Bx41SSGXbdhYK9umY8-nC-xS_94OFqVh8AF-hrXFEuwyZSxt134frOEmWNdIFYcyhGnZmavZqXd8_Tux9GqZaGYto-QsPz2GVYRg_Iplu0Ya7jinfHkJJw8v7cz7TxDl27eHdew1ORlaqyxfyOVpmbh4-bE9PQLsMzvKI_bW5oHZnf3mZGk-UKENcXF1J9ZDRBrnRH0fNFtB_gEO7EfMBPxJwV2FLaIRE6E4jxp6yI4",
    organizer: "Food Events France",
    category: "Culinaire",
    status: "published",
    sales: 8500,
    capacity: 12000
  }
] as EventDto[];


export const allEvents: EventDto[] = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Plongez dans les dernières innovations tech.",
    date: "15-17 Juil",
    location: "San Francisco, CA",
    isFavorite: false,
    price: 299,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBm67QkD1o24bJ6oe4iyEnwdu3yQ-bjihcpPt3IENFro6ttXw7G2FdBSKqRDM_ziSHtuwbOaYeVb_21SUB4VXyvALymtUUWnRzbPlt2MG8dKbaxGfNcxxjGNclrPTCKRPJYQsPzk5eWNscYNc53kdlVasv2fsDNqnjOWGCpNaPnEsl-FxslvfiS5ILcx63UQUG7xiP4kPxRMswimDBNO7BznWcw95SMXDybVU1g9T1b84PyN3PAh-0em5gPz6TiqWIAcTm_0g-qnekk",
    organizer: "Tech Summit Inc.",
    category: "Technologie",
    status: "published",
    sales: 3200,
    capacity: 5000
  },
  {
    id: 2,
    title: "Summer Music Festival",
    description: "Vibrez au son de vos artistes préférés.",
    date: "5-7 Août",
    location: "Los Angeles, CA",
    isFavorite: true,
    price: 89,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWZQVYMleShA9WIYc_886hVb1SBdb9pMLpKhk7I-yAdkHfICIFBA0nt6AuNNKuZAVehNDT30lux__oSJT60hJAqaOzuWzselCOtJ9bJ-waCnTa7Lc9CpkYmseslqDafWkZdp3-i2me_SZgvsJz5Fr3j0dVT9nQvtF3VtdFiqABFfSzB0yhcSH94c23n9wqzfxd2p20Sj1tX3kLEgKnRKwWtksBWgrD_em42_Kn0k4TDCyGVLlxdMdNpMHIRcqxv6EeUyG9x9gGIQU",
    organizer: "Live Nation",
    category: "Musique",
    status: "published",
    sales: 12500,
    capacity: 20000
  },
  {
    id: 3,
    title: "Sports Expo",
    description: "Rencontrez des légendes du sport et découvrez les nouveautés.",
    date: "20-22 Sept",
    location: "New York, NY",
    isFavorite: false,
    price: 45,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9P9dPja-TOVklxmzHFMmXMKHv1TN1pNMkvBVbaGeOJVHiP-uNXkx2Bu76SJIdwSMFL2iTudn3q-rtp0cfZamcOSQja19Wb_TB5-mCBIYZN-OGAJD0DU82Af3bwflzi04DxL-Vu2CDhXcOQpt0eNUMKyS5pdqWRt8y8_LgMbytosqZs8hvsn2turwt7oWpOMHJE323lFXJMwimDBURB5Mm3uBFH3F8kJ-EHInwXg8mHuVF3f_BefBNWYNREEmDV4uPQ3dYXQlvXEk",
    organizer: "Sports World",
    category: "Sports",
    status: "published",
    sales: 7800,
    capacity: 15000
  },
  {
    id: 4,
    title: "Festival des Arts Culinaires",
    description: "Une célébration de la gastronomie mondiale.",
    date: "12-14 Oct",
    location: "Paris, FR",
    isFavorite: true,
    price: 65,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZU3MZtP2OVGPK5aNMpL-6hEH_zEXz6br_Bx41SSGXbdhYK9umY8-nC-xS_94OFqVh8AF-hrXFEuwyZSxt134frOEmWNdIFYcyhGnZmavZqXd8_Tux9GqZaGYto-QsPz2GVYRg_Iplu0Ya7jinfHkJJw8v7cz7TxDl27eHdew1ORlaqyxfyOVpmbh4-bE9PQLsMzvKI_bW5oHZnf3mZGk-UKENcXF1J9ZDRBrnRH0fNFtB_gEO7EfMBPxJwV2FLaIRE6E4jxp6yI4",
    organizer: "Food Events France",
    category: "Culinaire",
    status: "published",
    sales: 8500,
    capacity: 12000
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    description: "Découvrez les startups les plus prometteuses de l'année.",
    date: "25 Juin",
    location: "Londres, UK",
    isFavorite: false,
    price: 0,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
    organizer: "Venture Capital Forum",
    category: "Technologie",
    status: "active",
    sales: 450,
    capacity: 800
  },
  {
    id: 6,
    title: "Marathon International",
    description: "Course à pied pour tous les niveaux dans les rues de la ville.",
    date: "10 Nov",
    location: "Berlin, DE",
    isFavorite: false,
    price: 35,
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b",
    organizer: "Berlin Running Club",
    category: "Sports",
    status: "draft",
    sales: 0,
    capacity: 10000
  },
  {
    id: 7,
    title: "Jazz Night Under the Stars",
    description: "Soirée jazz en plein air avec des artistes internationaux.",
    date: "18 Août",
    location: "Montréal, CA",
    isFavorite: false,
    price: 55,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    organizer: "Montreal Jazz Festival",
    category: "Musique",
    status: "published",
    sales: 3200,
    capacity: 5000
  },
  {
    id: 8,
    title: "Atelier de Pâtisserie Française",
    description: "Apprenez les secrets de la pâtisserie française avec des chefs étoilés.",
    date: "30 Sept",
    location: "Lyon, FR",
    isFavorite: false,
    price: 120,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
    organizer: "École de Cuisine Lyonnaise",
    category: "Culinaire",
    status: "published",
    sales: 25,
    capacity: 30
  }
];