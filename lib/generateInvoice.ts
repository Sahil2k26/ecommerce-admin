// utils/generateInvoice.ts
import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";

export interface OrderInvoiceProps {
    id: string;
    customerName: string;
    phone: string;
    createdAt: Date;
    total: number;
    orderItems: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
}

export async function generateInvoicePDF(order: OrderInvoiceProps) {
    const htmlPath = path.join(process.cwd(), "templates", "invoice-template.html");
    let html = await fs.readFile(htmlPath, "utf8");

    // Simple placeholder replacement
    html = html
        .replace("{{orderId}}", order.id)
        .replace("{{customerName}}", order.customerName)
        .replace("{{phone}}", order.phone)
        .replace("{{date}}", new Date(order.createdAt).toLocaleDateString())
        .replace("{{total}}", order.total.toString());

    const itemsHtml = order.orderItems
        .map(item => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>₹${item.price}</td></tr>`)
        .join("");

    html = html.replace("{{#each items}}", "").replace("{{/each}}", "").replace(/{{name}}|{{quantity}}|{{price}}/g, "").replace("</tbody>", `${itemsHtml}</tbody>`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);
    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();
    return pdfBuffer;
}
