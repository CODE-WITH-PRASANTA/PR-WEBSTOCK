import React from "react";
import "./RecentCoustomer.css";

const RecentCoustomer = () => {
  const customers = [
    {
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Paul J. Friend",
      phone: "937-330-1634",
      email: "pauljfrnd@jourrapide.com",
      location: "New York",
      date: "07/07/2024",
    },
    {
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Bryan J. Luellen",
      phone: "215-302-3376",
      email: "bryuellen@dayrep.com",
      location: "New York",
      date: "09/12/2024",
    },
    {
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      name: "Kathryn S. Collier",
      phone: "828-216-2190",
      email: "collier@jourrapide.com",
      location: "Canada",
      date: "06/30/2024",
    },
    {
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      name: "Timothy Kauper",
      phone: "(216) 75 612 706",
      email: "thykauper@rhyta.com",
      location: "Denmark",
      date: "09/08/2024",
    },
  ];

  const transactions = [
    {
      card: "4257 **** **** 7852",
      date: "11 April 2019",
      amount: "$79.49",
      type: "Card",
      user: "Helen Warren",
    },
    {
      card: "4265 **** **** 0025",
      date: "28 Jan 2019",
      amount: "$1254.00",
      type: "Card",
      user: "Kayla Lambie",
    },
    {
      card: "5570 **** **** 8547",
      date: "08 Dec 2024",
      amount: "$784.25",
      type: "Card",
      user: "Hugo Lavarack",
    },
    {
      card: "7845 **** **** 5214",
      date: "03 Dec 2024",
      amount: "$485.24",
      type: "Card",
      user: "Amber Scurry",
    },
    {
      card: "4257 **** **** 7852",
      date: "12 Nov 2024",
      amount: "$8964.04",
      type: "Card",
      user: "Caitlyn Gibney",
    },
  ];

  return (
    <div className="RecentCoustomer">
      {/* LEFT CARD */}

      <div className="RecentCoustomer_CustomerCard">
        <div className="RecentCoustomer_Header">
          <h2>Recent Customers</h2>
        </div>

        <div className="RecentCoustomer_TableWrap">
          <table className="RecentCoustomer_Table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Location</th>
                <th>Create Date</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>
                    <div className="RecentCoustomer_User">
                      <img
                        src={customer.image}
                        alt=""
                      />
                      <span>{customer.name}</span>
                    </div>
                  </td>

                  <td>{customer.phone}</td>
                  <td>{customer.email}</td>
                  <td>{customer.location}</td>
                  <td>{customer.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT CARD */}

      <div className="RecentCoustomer_TransactionCard">
        <div className="RecentCoustomer_Header">
          <h2>Account Transactions</h2>
        </div>

        <div className="RecentCoustomer_TableWrap">
          <table className="RecentCoustomer_Table">
            <thead>
              <tr>
                <th>Card Number</th>
                <th>Amount</th>
                <th>Card Type</th>
                <th>User Name</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="RecentCoustomer_CardInfo">
                      <span>{item.card}</span>
                      <small>{item.date}</small>
                    </div>
                  </td>

                  <td>
                    <div className="RecentCoustomer_Amount">
                      <span>{item.amount}</span>
                      <small>Amount</small>
                    </div>
                  </td>

                  <td>{item.type}</td>

                  <td>
                    <div className="RecentCoustomer_CardInfo">
                      <span>{item.user}</span>
                      <small>Pay</small>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentCoustomer;