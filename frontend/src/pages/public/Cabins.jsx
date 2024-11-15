import React from 'react';
import { Card, CardContent } from "../../components/card";
import { Button } from "../../components/Button";

const PineTreeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    className="text-green-500"
  >
    <path d="M12,2L4,12H7L4,18H10V22H14V18H20L17,12H20L12,2Z" />
  </svg>
);

export default function Component() {
  const cabins = [
    {
      id: 1,
      name: "Nombre Cabaña",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit et dignissimos con dolores",
      rating: 5,
      price: 2464,
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </div>
  );
}

function CabinCard({ cabin }) {
  return (
    <Card className="overflow-hidden border-0 bg-white shadow-lg rounded-2xl">
      <CardContent className="p-0">
        <div className="relative">
          <img
            alt={cabin.name}
            className="h-[200px] w-full object-cover"
            src={cabin.image}
          />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{cabin.name}</h3>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: cabin.rating }).map((_, i) => (
                  <PineTreeIcon key={i} />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{cabin.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900">
                ${cabin.price.toLocaleString()}
                <span className="text-sm font-normal text-gray-600 ml-1">MXN</span>
              </div>
              <a
                href={`/cabins/${cabin.id}`}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 text-sm"
              >
                Reservar Ahora
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
