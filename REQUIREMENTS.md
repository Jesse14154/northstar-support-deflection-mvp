# NORTHSTAR MVP REQUIREMENTS

## 1. Project Overview

Northstar is a customer self-service support prototype designed to
help customers obtain answers to common support questions.

The MVP provides three support journeys:

1. Order Status
2. Returns & Refunds
3. Stock Availability

---

# 2. ORDER STATUS

## Customer Goal

The customer wants to know what is happening with an order.

## Customer Steps

1. Open Northstar Support Hub.
2. Select Order Status.
3. Enter the order number.
4. Click Check Order.
5. The system searches the sample order data.
6. The system displays the order status.
7. The system displays delivery information where available.

## Example

Input:

NS1001

Expected answer:

Status: Shipped

Delivery: 18 August 2026

## Invalid Order

If the customer enters an unknown order number:

NS9999

The system should display:

Order not found.

---

# 3. RETURNS & REFUNDS

## Customer Goal

The customer wants guidance about returning an item or receiving a
refund.

## Customer Steps

1. Open Northstar Support Hub.
2. Select Returns & Refunds.
3. Select a common return/refund question.
4. The system displays the appropriate guidance.

## Example Questions

- How do I return an item?
- When will I receive my refund?

## Prototype Limitation

The prototype provides information only.

It does not process a real return.

It does not process a real refund.

---

# 4. STOCK AVAILABILITY

## Customer Goal

The customer wants to know whether a product and size are available.

## Customer Steps

1. Open Northstar Support Hub.
2. Select Stock Availability.
3. Select a product.
4. Select a size.
5. Click Check Stock.
6. The system searches sample stock data.
7. The system displays the available quantity.

## Available Example

Product:

Black Runner Shoes

Size:

42

Expected:

8 units available.

## Unavailable Example

Product:

Black Runner Shoes

Size:

43

Expected:

Currently unavailable.

---

# 5. ERROR HANDLING

The prototype should provide useful messages when:

- Order number is missing.
- Order number does not exist.
- Product does not exist.
- Size is not available.
- Required information is missing.

---

# 6. DATA LIMITATION

The prototype uses sample data.

The displayed order information is not connected to a real order system.

The displayed stock information is not live inventory.

The returns/refunds information does not process real transactions.

---

# 7. MVP SUCCESS CONDITION

The MVP is successful if a customer can use the Support Hub to obtain
useful self-service answers for all three support journeys without
needing to open a support ticket for the basic question.
