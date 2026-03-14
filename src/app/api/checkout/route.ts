import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { customer_details, order_amount, order_note } = data;

    // Use environment variables for Cashfree App ID and Secret Key
    const appId = process.env.CASHFREE_APP_ID || "";
    const secretKey = process.env.CASHFREE_SECRET_KEY || "";
    
    // In Sandbox mode url is sandbox.cashfree.com. In Production url is api.cashfree.com
    const cashfreeEndpoint = "https://api.cashfree.com/pg/orders";

    const fetchRes = await fetch(cashfreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey
      },
      body: JSON.stringify({
        order_amount: order_amount,
        order_currency: "INR", // Cashfree typically uses INR for Indian merchants, adjust if using USD
        order_id: `ord_${Date.now()}`,
        customer_details: {
          customer_id: customer_details.customer_id,
          customer_phone: customer_details.customer_phone,
          customer_name: customer_details.customer_name,
          customer_email: customer_details.customer_email
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000'}/checkout/success?order_id={order_id}`,
          notify_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000'}/api/checkout/webhook`,
        },
        order_note: order_note
      })
    });

    const responseData = await fetchRes.json();

    if (!fetchRes.ok) {
        console.error("Cashfree Error Response:", responseData);
        return NextResponse.json({ success: false, message: responseData.message || "Failed to create order on Cashfree" }, { status: 400 });
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error in Cashfree Order Creation:', error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
