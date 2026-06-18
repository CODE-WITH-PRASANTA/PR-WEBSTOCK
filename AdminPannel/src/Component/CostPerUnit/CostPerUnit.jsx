import React from "react";
import "./CostPerUnit.css";

import {
  FiShoppingBag,
  FiDollarSign,
  FiEye,
} from "react-icons/fi";

import { PiBankLight } from "react-icons/pi";

const CostPerUnit = () => {
  const cards = [
    {
      title: "COST PER UNIT",
      value: "$85.50",
      icon: <FiShoppingBag />,
      cardClass: "purple",
    },
    {
      title: "MARKET REVENUE",
      value: "$12,548.25",
      icon: <FiDollarSign />,
      cardClass: "blue",
    },
    {
      title: "EXPENSES",
      value: "$8,451.28",
      icon: <FiEye />,
      cardClass: "yellow",
    },
    {
      title: "DAILY VISIT",
      value: "1,12,584",
      icon: <PiBankLight />,
      cardClass: "red",
    },
  ];

  return (
    <div className="CostPerUnit">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`CostPerUnit_Card ${card.cardClass}`}
        >
          <div className="CostPerUnit_Top">
            <div>
              <h4>{card.title}</h4>
              <h2>{card.value}</h2>
            </div>

            <div className="CostPerUnit_Icon">
              {card.icon}
            </div>
          </div>

          <div className="CostPerUnit_Graph">
            <svg
              viewBox="0 0 350 90"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id={`gradient-${index}`}
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity="0.30"
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                d="M0,78
                   C25,78 35,68 50,66
                   C70,62 78,42 95,40
                   C115,38 125,58 145,62
                   C165,66 180,38 200,40
                   C220,42 235,52 255,50
                   C275,48 290,10 310,12
                   C325,14 340,42 350,45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />

              <path
                d="M0,78
                   C25,78 35,68 50,66
                   C70,62 78,42 95,40
                   C115,38 125,58 145,62
                   C165,66 180,38 200,40
                   C220,42 235,52 255,50
                   C275,48 290,10 310,12
                   C325,14 340,42 350,45
                   L350,90
                   L0,90 Z"
                fill={`url(#gradient-${index})`}
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CostPerUnit;