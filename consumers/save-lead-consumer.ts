import { eventBus, type LeadSubmittedV1Event } from '../events/event-bus';
import { storage } from '../storage';

/**
 * Consumer function responsible for saving lead data to PostgreSQL database
 * This function is decoupled from the API response for better resilience
 */
async function saveLeadToDatabase(event: LeadSubmittedV1Event): Promise<void> {
  try {
    console.log(`Processing save-lead event for lead ID: ${event.data.leadId}`);
    
    // Prepare lead data for database insertion
    const leadData = {
      name: event.data.name,
      email: event.data.email,
      company: event.data.company,
      phone: event.data.phone,
      project_location: event.data.project_location,
      query_text: event.data.query_text,
      matched_products: event.data.matched_products,
    };
    
    // Save lead to PostgreSQL database
    const savedLead = await storage.createLead(leadData);
    
    console.log(`Lead ${savedLead.id} successfully saved to database (event ID: ${event.data.leadId})`);
    
    // In a production system, this could also:
    // 1. Validate data integrity
    // 2. Enrich lead data with external sources
    // 3. Update CRM systems
    // 4. Generate unique lead reference numbers
    
  } catch (error) {
    console.error(`Failed to save lead to database for event ${event.data.leadId}:`, error);
    
    // In production, implement retry logic or send to dead letter queue
    throw error;
  }
}

// Subscribe to LeadSubmittedV1 events
eventBus.subscribe('LeadSubmittedV1', saveLeadToDatabase);

export { saveLeadToDatabase };