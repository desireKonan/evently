import type { Event } from "@/stores/eventStore";

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