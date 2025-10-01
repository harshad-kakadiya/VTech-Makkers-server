import { eventBus, type LeadSubmittedV1Event } from '../events/event-bus';
import { storage } from '../storage';

/**
 * Consumer function responsible for notifying the sales team in Ahmedabad
 * This function is completely independent of the database save operation
 */
async function notifySalesTeam(event: LeadSubmittedV1Event): Promise<void> {
  try {
    console.log(`Processing sales notification for lead ID: ${event.data.leadId}`);
    
    const { data } = event;
    
    // Get product details for the matched products
    const productDetails = await Promise.all(
      data.matched_products.map(async (productId) => {
        try {
          const products = await storage.getAllProducts();
          return products.find(p => p.id === productId);
        } catch {
          return null;
        }
      })
    );
    
    // Format email content
    const emailContent = formatSalesNotificationEmail(data, productDetails.filter(Boolean));
    
    // In production, this would send to actual email service
    await sendSalesNotificationEmail(emailContent);
    
    console.log(`Sales notification sent successfully for lead ${event.data.leadId}`);
  } catch (error) {
    console.error(`Failed to send sales notification for lead ${event.data.leadId}:`, error);
    
    // In production, implement retry logic or alert system
    throw error;
  }
}

function formatSalesNotificationEmail(leadData: any, products: any[]): string {
  return `
🔔 NEW TECHNICAL INQUIRY - Industrial Equipment

Lead Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Contact: ${leadData.name}
🏢 Company: ${leadData.company}
📧 Email: ${leadData.email}
📱 Phone: ${leadData.phone || 'Not provided'}
📍 Project Location: ${leadData.project_location}

Products of Interest:
${products.map(p => `• ${p?.name} (${p?.capacity_min}-${p?.capacity_max} TPH)`).join('\n')}

Requirements:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${leadData.message}

Original Query: ${leadData.query_text}

⚡ Action Required: Contact within 24 hours
🎯 Priority: ${products.length > 1 ? 'HIGH (Multiple Products)' : 'STANDARD'}
  `;
}

async function sendSalesNotificationEmail(content: string): Promise<void> {
  // Mock email sending - in production would use AWS SES, SendGrid, etc.
  console.log('=== SALES TEAM NOTIFICATION ===');
  console.log('To: sales-team@industrialmax.com');
  console.log('CC: technical-support@industrialmax.com');
  console.log('Subject: 🔥 New Technical Inquiry - Immediate Response Required');
  console.log('\n' + content);
  console.log('=== END NOTIFICATION ===');
  
  // Simulate email service delay
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Subscribe to LeadSubmittedV1 events
eventBus.subscribe('LeadSubmittedV1', notifySalesTeam);

export { notifySalesTeam };