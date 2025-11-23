import { useLocation } from "react-router-dom";

function ReceiptPage() {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  console.log(cartItems);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white p-10">
        <div className="bg-white max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
            <h1 className="text-2xl font-bold mb-6 text-gray-600 text-center">Receipt</h1>

            <table className="w-full border-collapse text-black">
                <thead>
                <tr className="border-b text-left">
                    <th className="pb-2">Product</th>
                    <th className="pb-2">Quantity</th>
                    <th className="pb-2">Unit Price</th>
                    <th className="pb-2">Total</th>
                </tr>
                </thead>

                <tbody>
                {cartItems.map((item, index) => (
                    <tr key={index} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.quantity}</td>
                    {/* <td className="py-2">${item.price.toFixed(2)}</td>
                    <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td> */}
                    <td className="py-2">${Number(item.price).toFixed(2)}</td>
                    <td className="py-2">${(Number(item.price) * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="text-right mt-6 text-xl font-semibold">
                Total Amount: <span className="text-black">${totalAmount.toFixed(2)}</span>
            </div>
        </div>
    </div>
  );
}

export default ReceiptPage;
