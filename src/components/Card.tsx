import React from "react";
import { Person } from "@/types/people"; // Adjust the path if necessary

type CardProps = {
  person: Person;
};

export default function Card({ person }: CardProps) {
  return (
    <div className="card border rounded shadow p-4 max-w-sm">
      <h2 className="card__name font-bold text-xl mb-2">{person.name}</h2>
      <p className="card__info text-gray-700">Email: {person.email}</p>
      <p className="card__info text-gray-700">Birthday: {person.birthday}</p>
      <p className="card__info text-gray-700">Address: {person.address}</p>
      <p className="card__info text-gray-700">Phone: {person.phone}</p>
    </div>
  );
}
