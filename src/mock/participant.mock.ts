import type { Participant } from "@/app/model/participant.model";

export const PARTICIPANTS_SAMPLE: Participant[] = [
  {
    id: "part-001",
    event_id: "event-001",
    event_name: "Conférence Tech 2024",
    user_id: "user-001",
    fullname: "Marie Dubois",
    phoneNumber: "+33 6 12 34 56 78",
    email: "marie.dubois@email.com",
    paidAt: new Date("2024-01-15T10:30:00Z"),
    tickets: [
      { type: "Standard", price: 50, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-02-20T09:15:00Z"),
    createdAt: new Date("2024-01-10T08:00:00Z"),
    updatedAt: new Date("2024-02-20T09:15:00Z"),
    validatedBy: "admin-001"
  },
  {
    id: "part-002",
    event_id: "event-001",
    event_name: "Conférence Tech 2024",
    fullname: "Jean Martin",
    phoneNumber: "+33 6 23 45 67 89",
    email: "jean.martin@email.com",
    paidAt: new Date("2024-01-20T14:20:00Z"),
    tickets: [
      { type: "VIP", price: 100, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-02-20T10:30:00Z"),
    createdAt: new Date("2024-01-12T11:30:00Z"),
    updatedAt: new Date("2024-02-20T10:30:00Z")
  },
  {
    id: "part-003",
    event_id: "event-001",
    event_name: "Conférence Tech 2024",
    user_id: "user-003",
    fullname: "Sophie Lambert",
    phoneNumber: "+33 6 34 56 78 90",
    email: "sophie.lambert@email.com",
    paidAt: new Date("2024-01-25T16:45:00Z"),
    tickets: [
      { type: "Standard", price: 50, quantity: 2 }
    ],
    status: "BUYED",
    createdAt: new Date("2024-01-18T09:15:00Z"),
    updatedAt: new Date("2024-01-25T16:45:00Z"),
  },
  {
    id: "part-004",
    event_id: "event-002",
    event_name: "Festival de Musique",
    fullname: "Pierre Moreau",
    phoneNumber: "+33 6 45 67 89 01",
    email: "pierre.moreau@email.com",
    paidAt: new Date("2024-02-01T11:00:00Z"),
    tickets: [
      { type: "Pass Journée", price: 35, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-03-10T14:20:00Z"),
    createdAt: new Date("2024-01-28T13:45:00Z"),
    updatedAt: new Date("2024-03-10T14:20:00Z"),
    validatedBy: "admin-001"
  },
  {
    id: "part-005",
    event_id: "event-002",
    event_name: "Festival de Musique",
    user_id: "user-005",
    fullname: "Alice Bernard",
    phoneNumber: "+33 6 56 78 90 12",
    email: "alice.bernard@email.com",
    paidAt: new Date("2024-02-05T15:30:00Z"),
    tickets: [
      { type: "Pass Weekend", price: 60, quantity: 1 }
    ],
    status: "BUYED",
    createdAt: new Date("2024-02-01T10:20:00Z"),
    updatedAt: new Date("2024-02-05T15:30:00Z"),
  },
  {
    id: "part-006",
    event_id: "event-003",
    event_name: "Atelier Cuisine",
    user_id: "user-006",
    fullname: "Thomas Petit",
    phoneNumber: "+33 6 67 89 01 23",
    email: "thomas.petit@email.com",
    paidAt: new Date("2024-02-10T09:45:00Z"),
    tickets: [
      { type: "Participant", price: 75, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-03-05T18:30:00Z"),
    createdAt: new Date("2024-02-08T14:10:00Z"),
    updatedAt: new Date("2024-03-05T18:30:00Z"),
    validatedBy: "admin-003"
  },
  {
    id: "part-007",
    event_id: "event-001",
    event_name: "Conférence Tech 2024",
    user_id: "user-007",
    fullname: "Camille Rousseau",
    phoneNumber: "+33 6 78 90 12 34",
    email: "camille.rousseau@email.com",
    tickets: [
      { type: "Étudiant", price: 25, quantity: 1 }
    ],
    status: "PENDING",
    createdAt: new Date("2024-01-30T16:25:00Z"),
    updatedAt: new Date("2024-01-30T16:25:00Z"),
  },
  {
    id: "part-008",
    event_id: "event-003",
    event_name: "Atelier Cuisine",
    fullname: "Lucie Fournier",
    phoneNumber: "+33 6 89 01 23 45",
    email: "lucie.fournier@email.com",
    paidAt: new Date("2024-02-12T13:15:00Z"),
    tickets: [
      { type: "Participant", price: 75, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-03-05T19:00:00Z"),
    createdAt: new Date("2024-02-10T11:40:00Z"),
    updatedAt: new Date("2024-03-05T19:00:00Z"),
    validatedBy: "admin-002"
  },
  {
    id: "part-009",
    event_id: "event-002",
    event_name: "Festival de Musique",
    user_id: "user-009",
    fullname: "Nicolas Leroy",
    phoneNumber: "+33 6 90 12 34 56",
    email: "nicolas.leroy@email.com",
    paidAt: new Date("2024-02-08T17:50:00Z"),
    tickets: [
      { type: "Pass VIP", price: 120, quantity: 2 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-03-10T16:45:00Z"),
    createdAt: new Date("2024-02-05T12:30:00Z"),
    updatedAt: new Date("2024-03-10T16:45:00Z"),
    validatedBy: "admin-001"
  },
  {
    id: "part-010",
    event_id: "event-001",
    event_name: "Conférence Tech 2024",
    user_id: "user-010",
    fullname: "Émilie Garcia",
    phoneNumber: "+33 6 01 23 45 67",
    email: "emilie.garcia@email.com",
    paidAt: new Date("2024-01-28T12:00:00Z"),
    tickets: [
      { type: "Standard", price: 50, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-02-20T08:45:00Z"),
    createdAt: new Date("2024-01-25T15:20:00Z"),
    updatedAt: new Date("2024-02-20T08:45:00Z"),
    validatedBy: "admin-003"
  },
  {
    id: "part-011",
    event_id: "event-004",
    event_name: "Marathon Urbain",
    user_id: "user-011",
    fullname: "David Morel",
    phoneNumber: "+33 6 12 45 67 89",
    email: "david.morel@email.com",
    paidAt: new Date("2024-03-01T10:15:00Z"),
    tickets: [
      { type: "Coureur", price: 30, quantity: 1 }
    ],
    status: "BUYED",
    createdAt: new Date("2024-02-25T09:30:00Z"),
    updatedAt: new Date("2024-03-01T10:15:00Z"),
  },
  {
    id: "part-012",
    event_id: "event-004",
    event_name: "Marathon Urbain",
    fullname: "Sarah Lefebvre",
    phoneNumber: "+33 6 23 56 78 90",
    email: "sarah.lefebvre@email.com",
    paidAt: new Date("2024-03-03T14:40:00Z"),
    tickets: [
      { type: "Coureur", price: 30, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-04-15T07:30:00Z"),
    createdAt: new Date("2024-02-28T16:55:00Z"),
    updatedAt: new Date("2024-04-15T07:30:00Z"),
    validatedBy: "admin-002"
  },
  {
    id: "part-013",
    event_id: "event-003",
    event_name: "Atelier Cuisine",
    user_id: "user-013",
    fullname: "Antoine Blanc",
    phoneNumber: "+33 6 34 67 89 01",
    email: "antoine.blanc@email.com",
    tickets: [
      { type: "Observateur", price: 20, quantity: 1 }
    ],
    status: "PENDING",
    createdAt: new Date("2024-02-15T13:20:00Z"),
    updatedAt: new Date("2024-02-15T13:20:00Z"),
  },
  {
    id: "part-014",
    event_id: "event-002",
    event_name: "Festival de Musique",
    user_id: "user-014",
    fullname: "Céline Mercier",
    phoneNumber: "+33 6 45 78 90 12",
    email: "celine.mercier@email.com",
    paidAt: new Date("2024-02-18T11:25:00Z"),
    tickets: [
      { type: "Pass Journée", price: 35, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-03-10T15:10:00Z"),
    createdAt: new Date("2024-02-14T10:45:00Z"),
    updatedAt: new Date("2024-03-10T15:10:00Z"),
    validatedBy: "admin-003"
  },
  {
    id: "part-015",
    event_id: "event-001",
    event_name: "Conférence Tech 2024",
    user_id: "user-015",
    fullname: "Marc Chevalier",
    phoneNumber: "+33 6 56 89 01 23",
    email: "marc.chevalier@email.com",
    paidAt: new Date("2024-01-22T15:50:00Z"),
    tickets: [
      { type: "VIP", price: 100, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-02-20T11:20:00Z"),
    createdAt: new Date("2024-01-20T12:35:00Z"),
    updatedAt: new Date("2024-02-20T11:20:00Z"),
    validatedBy: "admin-001"
  },
  {
    id: "part-016",
    event_id: "event-004",
    event_name: "Marathon Urbain",
    user_id: "user-016",
    fullname: "Julie Lemoine",
    phoneNumber: "+33 6 67 90 12 34",
    email: "julie.lemoine@email.com",
    paidAt: new Date("2024-03-05T08:30:00Z"),
    tickets: [
      { type: "Bénévole", price: 0, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-04-15T06:00:00Z"),
    createdAt: new Date("2024-03-01T14:15:00Z"),
    updatedAt: new Date("2024-04-15T06:00:00Z"),
    validatedBy: "admin-002"
  },
  {
    id: "part-017",
    event_id: "event-003",
    event_name: "Atelier Cuisine",
    fullname: "Patrick Gauthier",
    phoneNumber: "+33 6 78 01 23 45",
    email: "patrick.gauthier@email.com",
    paidAt: new Date("2024-02-20T16:40:00Z"),
    tickets: [
      { type: "Participant", price: 75, quantity: 1 }
    ],
    status: "BUYED",
    createdAt: new Date("2024-02-18T17:25:00Z"),
    updatedAt: new Date("2024-02-20T16:40:00Z"),
  },
  {
    id: "part-018",
    event_id: "event-001",
    event_name: "Conférence Tech 2024",
    user_id: "user-018",
    fullname: "Isabelle Roy",
    phoneNumber: "+33 6 89 12 34 56",
    email: "isabelle.roy@email.com",
    paidAt: new Date("2024-01-30T13:10:00Z"),
    tickets: [
      { type: "Standard", price: 50, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-02-20T10:00:00Z"),
    createdAt: new Date("2024-01-28T11:50:00Z"),
    updatedAt: new Date("2024-02-20T10:00:00Z"),
    validatedBy: "admin-002"
  },
  {
    id: "part-019",
    event_id: "event-002",
    event_name: "Festival de Musique",
    user_id: "user-019",
    fullname: "Michelle Durand",
    phoneNumber: "+33 6 90 23 45 67",
    email: "michelle.durand@email.com",
    tickets: [
      { type: "Pass Weekend", price: 60, quantity: 1 }
    ],
    status: "PENDING",
    createdAt: new Date("2024-02-22T09:40:00Z"),
    updatedAt: new Date("2024-02-22T09:40:00Z"),
  },
  {
    id: "part-020",
    event_id: "event-004",
    event_name: "Marathon Urbain",
    user_id: "user-020",
    fullname: "François Barbier",
    phoneNumber: "+33 6 01 34 56 78",
    email: "francois.barbier@email.com",
    paidAt: new Date("2024-03-08T12:55:00Z"),
    tickets: [
      { type: "Coureur Elite", price: 50, quantity: 1 }
    ],
    status: "BUYED",
    arrivedAt: new Date("2024-04-15T07:45:00Z"),
    createdAt: new Date("2024-03-05T15:30:00Z"),
    updatedAt: new Date("2024-04-15T07:45:00Z"),
    validatedBy: "admin-003"
  }
];