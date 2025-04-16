import CheckoutForm from './CheckoutForm';

export const metadata = {
  title: 'Checkout - Luxury Watch Store',
  description: 'Enter your details to complete your purchase.',
};

export default function CheckoutPage() {
  return (
    <div>
      <CheckoutForm />
    </div>
  );
}
