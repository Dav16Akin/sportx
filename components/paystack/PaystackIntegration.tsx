import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {
  amount: number;
  email: string;
}

const PaystackIntegration = ({ amount, email }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY;
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    const amountInKobo = amount * 100; // Convert amount to kobo

    try {
      const response = await axios.post('https://api.paystack.co/transaction/initialize', {
        email,
        amount: amountInKobo,
        public_key: publicKey,
      }, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      if (response.data.status === 'success') {
        const authorizationUrl = response.data.data.authorization_url;
        window.location.href = authorizationUrl; // Redirect the user to Paystack
      } else {
        console.error('Payment initialization failed:', response.data.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // Cleanup function to handle any necessary actions when the component unmounts
    return () => {
      // Example: Clean up any lingering HTTP requests or events
      // If there were timers, we would clear them here
      console.log('Component unmounted or rerendered, cleaning up...');
    };
  }, []);

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? 'Processing...' : 'Confirm Payment'}
    </button>
  );
};

export default PaystackIntegration;
