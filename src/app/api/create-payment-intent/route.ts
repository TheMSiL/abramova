import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
	throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2026-03-25.dahlia',
});

export async function POST(request: NextRequest) {
	try {
		const { amount, currency = 'czk' } = await request.json();

		console.log('Creating payment intent:', { amount, currency });

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(amount * 100),
			currency: currency.toLowerCase(),
			automatic_payment_methods: {
				enabled: true,
			},
		});

		console.log('Payment intent created:', paymentIntent.id);

		return NextResponse.json({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		console.error('Payment intent creation error:', error);
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
