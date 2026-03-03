"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const validateCard = () => {
    if (cardNumber.length < 16) {
      alert("Invalid Card Number");
      return false;
    }
    if (expiry.length < 4) {
      alert("Invalid Expiry Date");
      return false;
    }
    if (cvv.length < 3) {
      alert("Invalid CVV");
      return false;
    }
    return true;
  };

  const handleOrder = () => {
    if (paymentMethod === "cod") {
      alert("Order placed with Cash on Delivery!");
      localStorage.removeItem("cart");
      setCart([]);
    }

    if (paymentMethod === "card") {
      if (!validateCard()) return;

      setProcessing(true);

      setTimeout(() => {
        alert("Payment Successful! 🎉");
        localStorage.removeItem("cart");
        setCart([]);
        setProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-32 px-8 pb-20">
        <h1 className="text-5xl font-black italic mb-10">
          YOUR CART
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-400 font-bold">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[2rem] flex justify-between items-center shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold">
                        {item.title}
                      </h3>
                      <p className="text-blue-600 font-black">
                        Rs. {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-10 p-8 bg-black rounded-[2.5rem] text-white">
              <p className="text-gray-400 text-xs font-bold uppercase">
                Total Amount
              </p>
              <h2 className="text-3xl font-black">
                Rs. {totalPrice}
              </h2>
            </div>

            {/* PAYMENT OPTIONS */}
            <div className="mt-10 bg-white p-8 rounded-[2rem] shadow-sm">
              <h3 className="text-xl font-black mb-6">
                Select Payment Method
              </h3>

              {/* COD */}
              <label className="flex gap-3 items-center cursor-pointer mb-4">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>

              {/* CARD */}
              <label className="flex gap-3 items-center cursor-pointer mb-4">
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Credit / Debit Card
              </label>

              {paymentMethod === "card" && (
                <div className="bg-gray-100 p-6 rounded-xl space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-3 rounded-lg border"
                  />

                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-1/2 p-3 rounded-lg border"
                    />

                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-1/2 p-3 rounded-lg border"
                    />
                  </div>
                </div>
              )}

              {/* ORDER BUTTON */}
              <button
                onClick={handleOrder}
                disabled={processing}
                className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-black uppercase transition active:scale-95 disabled:opacity-50"
              >
                {processing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}