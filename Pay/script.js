const plans = [
    {
        name: "Starter",
        price: 15,
        period: "month",
        features: ["Up to 10,000 data points per month", "Email support", "Community forum access", "Cancel anytime"],
    },
    {
        name: "Pro",
        price: 40,
        period: "quarter",
        featured: true,
        features: [
            "Advanced analytics dashboard",
            "Customizable reports and charts",
            "Real-time data tracking",
            "Integration with third-party tools",
            "Everything in Hobby Plan",
        ],
    },
    {
        name: "Premium",
        price: 120,
        period: "year",
        features: [
            "Unlimited data storage",
            "Customizable dashboards",
            "Advanced data segmentation",
            "Real-time data processing",
            "AI-powered insights and recommendations",
            "Everything in Hobby Plan",
            "Everything in Pro Plan",
        ],
    },
];

const paymentMethods = [
    {
        id: "paypal",
        name: "PayPal",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Pay with your PayPal account",
    },
    {
        id: "stripe",
        name: "Stripe",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Pay with credit card",
    },
    {
        id: "mollie",
        name: "Mollie",
        logo: "/placeholder.svg?height=40&width=120",
        description: "Pay with European payment methods",
    },
];

function createPricingCard(plan) {
    const card = document.createElement('div');
    card.className = 'pricing-card';
    
    if (plan.featured) {
        const featuredBadge = document.createElement('div');
        featuredBadge.className = 'featured';
        featuredBadge.textContent = 'Featured';
        card.appendChild(featuredBadge);
    }

    card.innerHTML = `
        <h3 class="plan-name">${plan.name}</h3>
        <div class="plan-price">€${plan.price}<span class="plan-period">/${plan.period}</span></div>
        <button class="button">Get ${plan.name}</button>
        <ul class="feature-list">
            ${plan.features.map(feature => `<li class="feature-item">${feature}</li>`).join('')}
        </ul>
    `;

    card.querySelector('.button').addEventListener('click', () => openPaymentModal(plan));

    return card;
}

function renderPricingCards() {
    const container = document.getElementById('pricing-cards');
    plans.forEach(plan => {
        container.appendChild(createPricingCard(plan));
    });
}

function openPaymentModal(plan) {
    const modal = document.getElementById('payment-modal');
    const selectedPlanDetails = document.getElementById('selected-plan-details');
    selectedPlanDetails.innerHTML = `
        <div class="plan-name">${plan.name}</div>
        <div class="plan-price">€${plan.price}<span class="plan-period">/${plan.period}</span></div>
    `;

    const paymentMethodsContainer = document.getElementById('payment-methods');
    paymentMethodsContainer.innerHTML = '';
    paymentMethods.forEach(method => {
        const methodElement = document.createElement('div');
        methodElement.className = 'payment-method';
        methodElement.innerHTML = `
            <div>
                <div>${method.name}</div>
                <div>${method.description}</div>
            </div>
            <img src="${method.logo}" alt="${method.name}" class="payment-method-logo">
        `;
        methodElement.addEventListener('click', () => selectPaymentMethod(methodElement));
        paymentMethodsContainer.appendChild(methodElement);
    });

    modal.style.display = 'block';
}

function selectPaymentMethod(element) {
    document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
}

function closePaymentModal() {
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderPricingCards();

    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closePaymentModal);

    const continuePaymentBtn = document.getElementById('continue-payment');
    continuePaymentBtn.addEventListener('click', () => {
        // Simulated payment processing
        continuePaymentBtn.textContent = 'Processing...';
        continuePaymentBtn.disabled = true;
        setTimeout(() => {
            closePaymentModal();
            alert('Your account will be activated once the payment has processed!');
            continuePaymentBtn.textContent = 'Continue to payment';
            continuePaymentBtn.disabled = false;
        }, 1500);
    });

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('payment-modal');
        if (event.target == modal) {
            closePaymentModal();
        }
    });
});