const { Resend } = require('resend');
const ejs = require('ejs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'Joyvinco <noreply@notify.joyvinco.com.ng>';

/**
 * Sends the initial order confirmation email to the customer and a notification to all admins.
 * @param {object} order
 * @param {object} cartItems 
 * @param {number} totalAmount
 */
const sendNewOrderEmails = async (order, cartItems, totalAmount) => {
    try {
        const customer = await prisma.user.findUnique({ 
            where: { id: order.userId },
            include: { userDetails: true }
        });
        if (!customer) throw new Error('Customer not found for order email.');

        // Send confirmation to the Customer
        const customerTemplatePath = path.resolve(process.cwd(), 'src/views/customer-order-confirmation.ejs');
        const customerHtml = await ejs.renderFile(customerTemplatePath, { order, customer, cartItems, totalAmount });
        
 
        await resend.emails.send({
            from: FROM_EMAIL,
            to: customer.email,
            subject: `Your Joyvinco Order is Confirmed! #${order.id.slice(-6)}`,
            html: customerHtml,
        });
        console.log(`Order confirmation sent to ${customer.email}`);

        //Notify all Admins
        const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } });
        const adminEmails = admins.map(admin => admin.email);

        if (adminEmails.length > 0) {
            const adminTemplatePath = path.resolve(process.cwd(), 'src/views/admin-new-order.ejs');
            const adminHtml = await ejs.renderFile(adminTemplatePath, { order, customer, cartItems, totalAmount });

            await resend.emails.send({
                from: FROM_EMAIL,
                to: adminEmails,
                subject: `[ADMIN] New Order Received! #${order.id.slice(-6)}`,
                html: adminHtml,
            });
            console.log(`Admin notification sent to ${adminEmails.join(', ')}`);
        }
    } catch (error) {
        console.error("--- Failed to send new order notification emails ---", { message: error?.message, stack: error?.stack });
    }
};

/**
 * Sends a shipping confirmation email to the customer.
 * @param {object} order - The order object that has been updated to "SHIPPED".
 */
const sendShippingConfirmationEmail = async (order) => {
    try {
        const customer = await prisma.user.findUnique({ where: { id: order.userId } });
        if (!customer) throw new Error('Customer not found for shipping email.');

        const templatePath = path.resolve(process.cwd(), 'src/views/customer-shipped-notification.ejs');
        const emailHtml = await ejs.renderFile(templatePath, { order, customer });

        await resend.emails.send({
            from: FROM_EMAIL,
            to: customer.email,
            subject: `Your Joyvinco Order Has Shipped! #${order.id.slice(-6)}`,
            html: emailHtml,
        });
        console.log(`Shipping confirmation sent to ${customer.email}`);
    } catch (error) {
        console.error("--- Failed to send SHIPPED notification email ---", { message: error?.message, stack: error?.stack });
    }
};

/**
 * Sends a delivery confirmation email to the customer.
 * @param {object} order - The order object that has been updated to "DELIVERED".
 */
const sendDeliveryConfirmationEmail = async (order) => {
    try {
        const customer = await prisma.user.findUnique({ where: { id: order.userId } });
        if (!customer) throw new Error('Customer not found for delivery email.');

        const templatePath = path.resolve(process.cwd(), 'src/views/customer-delivered-notification.ejs');
        const emailHtml = await ejs.renderFile(templatePath, { order, customer });

        await resend.emails.send({
            from: FROM_EMAIL,
            to: customer.email,
            subject: `Your Joyvinco Order #${order.id.slice(-6)} Has Been Delivered!`,
            html: emailHtml,
        });
        console.log(`Delivery confirmation sent to ${customer.email}`);
    } catch (error) {
        console.error("--- Failed to send DELIVERED notification email ---", { message: error?.message, stack: error?.stack });
    }
};

/**
 * Sends an order cancellation email to the customer.
 * @param {object} order - The order object that has been updated to "CANCELLED".
 */
const sendCancellationEmail = async (order) => {
    try {
        const customer = await prisma.user.findUnique({ where: { id: order.userId } });
        if (!customer) throw new Error('Customer not found for cancellation email.');

        const templatePath = path.resolve(process.cwd(), 'src/views/customer-cancelled-notification.ejs');
        const emailHtml = await ejs.renderFile(templatePath, { order, customer });

        await resend.emails.send({
            from: FROM_EMAIL,
            to: customer.email,
            subject: `Your Joyvinco Order #${order.id.slice(-6)} Has Been Cancelled`,
            html: emailHtml,
        });
        console.log(`Cancellation notification sent to ${customer.email}`);
    } catch (error) {
        console.error("--- Failed to send CANCELLED notification email ---", { message: error?.message, stack: error?.stack });
    }
};

module.exports = {
    sendNewOrderEmails,
    sendShippingConfirmationEmail,
    sendDeliveryConfirmationEmail,
    sendCancellationEmail,
};