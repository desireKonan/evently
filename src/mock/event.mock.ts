import type { Event } from "@/app/model/event.model";

export const recentEvents: Event[] = [
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
